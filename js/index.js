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
    list.innerHTML += `<li><p>${characters[i].name}</p></li>`;
  }
  paginator.innerHTML = `${currentPage}/${pageNr}`;
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

nextPageBtn.addEventListener("click", (e) => {
  getNextPage();
});

lastPageBtn.addEventListener("click", (e) => {
  getLastPage();
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
