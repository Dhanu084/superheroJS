let favourites = localStorage.getItem("favourites"); //get favourites list from localstorage

favourites = favourites.split(","); //split it with comma and converting it to array
//console.log(favourites);

dofavourite = () => {
  //function to fetch details about each hero in the favourites list
  if (favourites.length === 0 || favourites[0] === "") return;
  favourites.forEach((element) => {
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    fetch(
      proxyurl +
        `https://superheroapi.com/api/290534865526502/search/${element}`
    )
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
          localStorage.setItem("favourites", favourites);
          heroInfo.removeChild(heroContainer);
        });
        heroInfo.appendChild(heroContainer);
      });
  });
};

dofavourite();
