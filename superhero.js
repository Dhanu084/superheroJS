let search = true;
var favourites = [];
searchs = (e) => {
  let searchResults = document.getElementById("search-results");
  if (e == null || e.length == 0) {
    searchResults.style.visibility = "hidden";
    return;
  }

  searchResults.style.visibility = "visible";

  const proxyurl = "https://cors-anywhere.herokuapp.com/";
  fetch(proxyurl + `https://superheroapi.com/api/290534865526502/search/${e}`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      for (let i = 0; i < 5; i++) {
        let newDiv = document.createElement("div");
        newDiv.innerText = data.results[i].name;
        newDiv.addEventListener("click", () => {
          let heroInfo = document.getElementById("hero-info");
          let name = document.createElement("div");
          name.innerText = data.results[i].name;
          name.classList.add("name");
          let img = document.createElement("img");
          img.setAttribute("src", data.results[i].image.url);

          let dp = document.createElement("div");
          dp.appendChild(img);
          dp.appendChild(name);
          dp.classList.add("dp");
          let powerstats = document.createElement("div");
          let combat = document.createElement("p");

          combat.innerText = "combat : " + data.results[i].powerstats.combat;
          let power = document.createElement("p");
          power.innerText = "power : " + data.results[i].powerstats.power;

          let speed = document.createElement("p");
          speed.innerText = "speed : " + data.results[i].powerstats.speed;

          let intelligence = document.createElement("p");
          intelligence.innerText =
            "intelligence : " + data.results[i].powerstats.intelligence;

          powerstats.appendChild(combat);
          powerstats.appendChild(power);
          powerstats.appendChild(speed);
          powerstats.appendChild(intelligence);

          let heroContainer = document.createElement("div");
          let btn = document.createElement("button");
          btn.innerText = "favourite";

          heroContainer.prepend(btn);
          heroContainer.prepend(powerstats);
          heroContainer.prepend(dp);
          heroContainer.classList.add("hero-container");

          btn.addEventListener("click", (e) => {
            favourites.push(name.innerText);
            console.log(favourites);
            localStorage.setItem("favourites", favourites);
            btn.style.visibility = "hidden";
          });
          heroInfo.appendChild(heroContainer);
        });
        searchResults.prepend(newDiv);
      }
    });
};

clear = () => {
  console.log("clearing");
  let searchResults = document.getElementById("search-results");
  let child = searchResults.lastElementChild;
  while (child) {
    searchResults.removeChild(child);
    child = searchResults.lastElementChild;
  }
};
