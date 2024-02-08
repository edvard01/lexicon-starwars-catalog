async function getAllCharacters() {
  try {
    const response = await fetch("https://swapi.dev/api/people");
    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error:", error);
  }
}

async function characterCount() {
  const data = await getAllCharacters();
  return data.count;
}

characterCount().then((count) => {
  console.log(count);
});

async function getRandomCharacters(value, total) {
  const characterArray = [];
  const rndArr = [];
  let rnd = 0;
  for (let i = 0; i < value; i++) {
    rnd = getRndNumber(total);
    while (rndArr.indexOf(rnd) === -1) {
      rnd = getRndNumber(total);
    }
    rndArr.push(rnd);
  }

  console.log(rndArr);
}

function getRndNumber(max) {
  return Math.floor(Math.random() * max);
}

getRandomCharacters(8, 82);
