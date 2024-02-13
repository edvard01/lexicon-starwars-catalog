let currentPage = 1;
let url = "https://swapi.dev/api/people";
let nextPageUrl = null;
let lastPageUrl = null;
let lastClickedItem = "";
const characterLoader = document.getElementById("character-loader");
const detailsLoader = document.getElementById("details-loader");
const planetLoader = document.getElementById("planet-loader");
const list = document.getElementById("character-list");

async function getAllCharacters(url) {
  list.innerHTML = "";
  try {
    characterLoader.style.display = "block";
    const response = await fetch(url);
    const data = await response.json();

    let pageNr = getPageAmount(data.count);
    displayCharacterCard(data, pageNr);
    characterLoader.style.display = "none";
    nextPageUrl = data.next;
    lastPageUrl = data.previous;
  } catch (error) {
    console.error("Error:", error);
  }
}

async function getDetails(url) {
  clearDisplay();
  try {
    detailsLoader.style.display = "block";
    const response = await fetch(url);
    const data = await response.json();

    displayDetailsCard(data);
    detailsLoader.style.display = "none";
    getPlanet(data.homeworld);
  } catch (error) {
    console.error("Error:", error);
  }
}

async function getPlanet(url) {
  try {
    planetLoader.style.display = "block";
    const response = await fetch(url);
    const data = await response.json();

    displayPlanet(data);
    planetLoader.style.display = "none";
  } catch (error) {
    console.error("Error:", error);
  }
}

async function displayCharacterCard(data, pageNr) {
  const list = document.getElementById("character-list");
  const paginator = document.getElementById("nav-text");
  const characters = await data.results;
  list.innerHTML = "";
  for (let i = 0; i < characters.length; i++) {
    list.innerHTML += `<li id="${characters[i].url}"><p>${characters[i].name}</p></li>`;
  }
  paginator.innerHTML = `${currentPage}/${pageNr}`;
}

function displayDetailsCard(data) {
  const name = document.getElementById("name");
  const detailsList = document.getElementById("character-details");

  name.innerHTML = data.name;
  detailsList.innerHTML += `<p>Height: ${data.height}cm</p>`;
  detailsList.innerHTML += `<p>Mass: ${data.mass}kg</p>`;
  detailsList.innerHTML += `<p>Hair color: ${data.hair_color}</p>`;
  detailsList.innerHTML += `<p>Skin color: ${data.skin_color}</p>`;
  detailsList.innerHTML += `<p>Eye color: ${data.eye_color}</p>`;
  detailsList.innerHTML += `<p>Birth year: ${data.birth_year}</p>`;
  detailsList.innerHTML += `<p>Gender: ${data.gender}</p>`;
}

function clearDisplay() {
  const detailsList = document.getElementById("character-details");
  const planetList = document.getElementById("planet-details");
  const name = document.getElementById("name");
  const planetName = document.getElementById("planet-name");
  detailsList.innerHTML = "";
  planetList.innerHTML = "";
  planetName.innerHTML = "";
  name.innerHTML = "";
}

function displayPlanet(data) {
  const name = document.getElementById("planet-name");
  const planetList = document.getElementById("planet-details");

  name.innerHTML = data.name;
  planetList.innerHTML += `<p>Rotation period: ${data.rotation_period}h</p>`;
  planetList.innerHTML += `<p>Orbital period: ${data.orbital_period} days</p>`;
  planetList.innerHTML += `<p>Diameter: ${data.diameter}km</p>`;
  planetList.innerHTML += `<p>Climate: ${data.climate}</p>`;
  planetList.innerHTML += `<p>Gravity: ${data.gravity}</p>`;
  planetList.innerHTML += `<p>Terrain: ${data.terrain}</p>`;
}

function getPageAmount(total) {
  let charCount = total;
  let leftover = total % 10;
  console.log(leftover);
  let temp = 0;
  if (leftover !== 0) {
    temp = 10 - leftover;
    charCount += temp;
  }

  return charCount / 10;
}

getAllCharacters(url);

const nextPageBtn = document.querySelector("#fwd");
const lastPageBtn = document.querySelector("#back");
const characterList = document.querySelector("#character-list");

nextPageBtn.addEventListener("click", (e) => {
  getNextPage();
});

lastPageBtn.addEventListener("click", (e) => {
  getLastPage();
});

characterList.addEventListener("click", (e) => {
  let target;
  if (e.target.tagName === "P") {
    target = e.target.parentNode;
  } else {
    target = e.target;
  }
  let url = target.id;
  target.style.backgroundColor = "#444444";
  if (lastClickedItem !== "") {
    lastClickedItem.style.backgroundColor = "";
  }
  getDetails(url);
  lastClickedItem = target;
});

function getNextPage() {
  if (nextPageUrl !== null) {
    getAllCharacters(nextPageUrl);
    currentPage++;
  }
}

function getLastPage() {
  if (lastPageUrl !== null) {
    getAllCharacters(lastPageUrl);
    currentPage--;
  }
}
