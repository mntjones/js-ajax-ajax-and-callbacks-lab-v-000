$(document).ready(function () {

});

function searchRepositories(){
  // grabs the search terms entered from the html page
    const searchTerms = document.getElementById("searchTerms").value;
    
    $.get(`https://api.github.com/search/repositories?q=${searchTerms}`, showResults).fail(displayError());
}

function showResults(repos) {
  // for id = "results"
  
   $("#results").html(repos.items.map(repo => {
        return (
            `<h3>Name: ${repo.full_name}</h3>
            <p>URL: ${repo.html_url}</p>
            <p>Owner: ${repo.owner.login}</p>
            <p><a href="#" data-repository="${repo.name}" data-owner="${repo.owner.login}" onclick="showCommits(this)">Show Commits</a></p>`
        );
    }).join(""));
}

function showCommits(coms) {
  $.get(`https://api.github.com/repos/${coms.dataset.owner}/${coms.dataset.repository}/commits`,
  getCommits).fail(displayError);
}

function getCommits(display_com) {
  // for id = "details"
  
  $("#details").html(display_com.map(commit => {
    return (
      `<h4>${commit.sha}</h4>
      <p>${commit.commit.message}</p>`
      );
  }).join(""));
}

function displayError() {
  $('#errors').html("I'm sorry, there's been an error. Please try again.");
}
