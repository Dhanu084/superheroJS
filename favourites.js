console.log("loading");
let favourites = document.cookie.split(";"); //get favourites list from localstorage
console.log(favourites);
//favourites = favourites.split(","); //split it with comma and converting it to array
favourites = favourites[1].substring(12).split(",");
console.log(favourites);

favourites.forEach((element) => {
  //const proxyurl = "https://cors-anywhere.herokuapp.com/";
  fetch(`https://superheroapi.com/api.php/290534865526502/search/${element}`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      const results = data.results;
      console.log(results);
      let heroInfo = document.getElementById("hero-info");
      let name = document.createElement("div");
      name.innerText = element;
      name.classList.add("name");
      let img = document.createElement("img");
      img.setAttribute("src", results[0].image.url);

      let dp = document.createElement("div");
      dp.appendChild(img);
      dp.appendChild(name);
      dp.classList.add("dp");
      let powerstats = document.createElement("div");
      let combat = document.createElement("p");

      combat.innerText = "combat : " + results[0].powerstats.combat;
      let power = document.createElement("p");
      power.innerText = "power : " + results[0].powerstats.power;

      let speed = document.createElement("p");
      speed.innerText = "speed : " + results[0].powerstats.speed;

      let intelligence = document.createElement("p");
      intelligence.innerText =
        "intelligence : " + results[0].powerstats.intelligence;

      powerstats.appendChild(combat);
      powerstats.appendChild(power);
      powerstats.appendChild(speed);
      powerstats.appendChild(intelligence);

      let heroContainer = document.createElement("div");
      let btn = document.createElement("button");
      btn.innerText = "Unfavourite";

      heroContainer.prepend(btn);
      heroContainer.prepend(powerstats);
      heroContainer.prepend(dp);
      heroContainer.id = element + Date.now();
      heroContainer.classList.add("hero-container");
      btn.addEventListener("click", (e) => {
        let index = favourites.indexOf(element);
        if (index !== -1) {
          favourites.splice(index, 1);
        }
        console.log(favourites);
        //browser.storage.local.setItem("favourites", favourites);
        document.cookie = "favourites=" + favourites;
        heroInfo.removeChild(heroContainer);
      });
      heroInfo.appendChild(heroContainer);
    });
});
