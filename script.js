

//You can edit ALL of the code here
function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
}
// this is get episode number and season function
function getEpisodeCode(episode) {
  let episodeVar = episode.number;
  if (episodeVar < 10) {
    episodeVar = `0${episodeVar}`;
  }
  let seasonVar = episode.season;
  if (seasonVar < 10) {
    seasonVar = `0${seasonVar}`;
  }
  let episodeId = `S${seasonVar}E${episodeVar}`;
  return episodeId;
}
// this is the cards function
function buildCard(episodeList) {
  let topContainer = document.querySelector(".top-container");
  topContainer.innerHTML = "";
  for (let i = 0; i < episodeList.length; i++) {
    // this is the movie card of episodes
    let movieCard = document.createElement("div");
    movieCard.classList.add("movie-card");
    topContainer.appendChild(movieCard);
    let episodeId = getEpisodeCode(episodeList[i]);
    movieCard.id = episodeId;
    // this is the name of episodes
    let episodeName = document.createElement("p");
    episodeName.classList.add("episode-name-p");
    movieCard.appendChild(episodeName);
    episodeName.innerText = `${episodeList[i].name}-${episodeId}`;
    // this is the img of episodes
    let imgContainer = document.createElement("div");
    imgContainer.classList.add("img-container");
    movieCard.appendChild(imgContainer);
    let episodeImg = document.createElement("img");
    imgContainer.appendChild(episodeImg);
    episodeImg.src = episodeList[i].image.medium;
    // this is the summary of episodes
    let summaryOfEpisode = document.createElement("p");
    summaryOfEpisode.classList.add("summary-of-episode-p");
    movieCard.appendChild(summaryOfEpisode);
    summaryOfEpisode.innerText = episodeList[i].summary
      .replaceAll("<p>", "")
      .replaceAll("</p>", "")
      .replaceAll("<br>", "");
  }
}
// this is make pages filter function
function makePagesFilter(episodeList) {
  const rootElem = document.getElementById("root");
  buildCard(episodeList);
}
// this is the page for all episode
function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root");
  // this is the dropdown
  let dropdownSelect = document.createElement("select");
  dropdownSelect.classList.add("dropdown-select");
  rootElem.appendChild(dropdownSelect);
  episodeList.forEach((episode) => {
    let dropdownOption = document.createElement("option");
    dropdownOption.textContent = episode.name;
    dropdownOption.value = getEpisodeCode(episode);
    dropdownSelect.appendChild(dropdownOption);
  });
  dropdownSelect.onchange = function () {
    window.location.hash = `#${dropdownSelect.value}`;
  };
  //this is the search bar
  let searchInput = document.createElement("input");
  searchInput.type = `text`;
  searchInput.id = `search-input`;
  searchInput.placeholder = `your search item ...`;
  rootElem.appendChild(searchInput);
  searchInput.addEventListener("input", () => {
    let typedInput = searchInput.value;
    let lowerCaseSearchInput = typedInput.toLowerCase();
    let smallList = episodeList.filter((oneEpisode) => {
      return (
        oneEpisode.name.toLowerCase().includes(lowerCaseSearchInput) ||
        oneEpisode.summary.toLowerCase().includes(lowerCaseSearchInput)
      );
    });
    makePagesFilter(smallList);
    episodeCount.textContent = `Displaying ${smallList.length}/${episodeList.length} episodes`;
  });
  // this is episode length description
  let episodeCount = document.createElement("span");
  episodeCount.classList.add("episode-count");
  rootElem.appendChild(episodeCount);
  episodeCount.textContent = `Displaying ${episodeList.length}/${episodeList.length} episodes`;
  // this is the top container
  let topContainer = document.createElement("div");
  topContainer.classList.add("top-container");
  rootElem.appendChild(topContainer);
  buildCard(episodeList);
  // this is the source of episodes
  let webLinkSrc = "https://www.tvmaze.com/";
  let webLink = document.createElement("a");
  webLink.classList.add("web-link");
  webLink.href = webLinkSrc;
  webLink.textContent = "The data come from TVMaze.com";
  rootElem.appendChild(webLink);
}
window.onload = setup;