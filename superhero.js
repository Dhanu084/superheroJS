let favourites = []; //array to store favourite heroes

searchs = (e) => {
  let searchResults = document.getElementById("search-results");
  if (e == null || e.length == 0) {
    //if length of the element is 0 make the element invisible
    searchResults.style.visibility = "hidden";
    return;
  }

  searchResults.style.visibility = "visible";

  //const proxyurl = "https://cors-anywhere.herokuapp.com/";
  fetch(`https://superheroapi.com/api.php/290534865526502/search/${e}`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      for (let i = 0; i < 5; i++) {
        let newDiv = document.createElement("div"); //create new container for each superhero
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
            //onbutton click add it to the favourites list
            favourites.push(name.innerText);
            console.log(favourites);
            //localStorage.setItem("favourites", JSON.stringify(favourites)); //store the favourites array in local storage

            document.cookie = `favourites=${favourites},path=/,domain=https://dhanu084.github.io/superheroJS/favourites.html`;
            // document.cookie = "HttpOnly=false";
            console.log(document.cookie);
            btn.style.visibility = "hidden";
          });
          heroInfo.appendChild(heroContainer); //appending selected superhero to the heroInfo div element
        });
        searchResults.prepend(newDiv);
      }
    });
};
