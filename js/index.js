let currentPage = 1;
let url = "https://swapi.dev/api/people";
let nextPageUrl = null;
let lastPageUrl = null;

async function getAllCharacters(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();

    let pageNr = getPageAmount(data.count);
    displayCharacterCard(data, pageNr);
    nextPageUrl = data.next;
    lastPageUrl = data.previous;
    console.log(lastPageUrl);
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

  detailsList.innerHTML = "";

  name.innerHTML = data.name;
  detailsList.innerHTML += `<p>Height: ${data.height}cm</p>`;
  detailsList.innerHTML += `<p>Mass: ${data.mass}kg</p>`;
  detailsList.innerHTML += `<p>Hair color: ${data.hair_color}</p>`;
  detailsList.innerHTML += `<p>Skin color: ${data.skin_color}</p>`;
  detailsList.innerHTML += `<p>Eye color: ${data.eye_color}</p>`;
  detailsList.innerHTML += `<p>Birth year: ${data.birth_year}</p>`;
  detailsList.innerHTML += `<p>Gender: ${data.gender}</p>`;
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
  getDetails(url);
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

async function getDetails(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();

    displayDetailsCard(data);
  } catch (error) {
    console.error("Error:", error);
  }
}
