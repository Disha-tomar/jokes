"use strict";

const jokeDescription = document.querySelector(".joke");
const subText = document.querySelector(".added-text");
let jokesBody = document.querySelector(".jokes-body");
const checksContainer = document.querySelector(".checks");

// const otherCategories = ["Spooky", "Christmas"];

// category buttons

const anyBtn = document.querySelector("#Any");
const programmingBtn = document.querySelector("#Programming");
const darkBtn = document.querySelector("#Dark");
const punBtn = document.querySelector("#Pun");
const miscellaneousBtn = document.querySelector("#Miscellaneous");

const categoryBtn = document.querySelectorAll(".btn-category");

// Red Flag Buttons

const nsfwBtn = document.querySelector("#NSFW");
const religiousBtn = document.querySelector("#Religious");
const politicalBtn = document.querySelector("#Political");
const racistBtn = document.querySelector("#Racist");
const sexistBtn = document.querySelector("#Sexist");

const redFlagsBtn = document.querySelectorAll(".btn-red-flag");

const clearFilterBtn = document.querySelector(".btn-clear-filter");

// const redFlags = [
//   "nsfw",
//   "religious",
//   "political",
//   "racist",
//   "sexist",
//   "explicit",
// ];

let html;

const getJoke = async function (id, flag) {
  if (!id.length) {
    id.push("Any");
  }

  // console.log(flag);
  // console.log(id);
  const arrCategory = id.join(",");
  const arrFlag = flag.join(",");
  // console.log(arrFlag);

  let res;

  if (!flag.length) {
    res = await fetch(`https://v2.jokeapi.dev/joke/${arrCategory}?amount=6`);
  }

  if (flag.length) {
    res = await fetch(
      `https://v2.jokeapi.dev/joke/${arrCategory}?amount=6&blacklistFlags=${arrFlag}`
    );
  }
  //   console.log(res);
  const data = await res.json();
  // console.log(data);

  let jokeflag;

  let joke;
  let jokePart;
  let category;
  //   console.log(data.jokes.length);

  jokesBody.innerHTML = "";

  for (let i = 0; i < data.jokes.length; i++) {
    // flags

    // console.log(Object.values(data.jokes[i].flags));

    // for (let j = 0; j < 6; j++) {
    //   console.log(Object.values(data.jokes[i].flags[j]));
    //   if (Object.values((data.jokes[i].flags[j] = true))) {
    //     console.log(Object.keys(data.jokes[i].flags));
    //   }
    // }

    // other elements

    joke = data.jokes[i].setup || data.jokes[i].joke;
    // console.log(joke);
    jokePart = data.jokes[i].delivery || "";
    category = data.jokes[i].category;
    displayJoke(joke, jokePart, category);
  }
  //   if (data.setup) {
  //     jokePart = data.setup;
  //     console.log(jokePart);
  //   }
  //   category = data.category;
  //   console.log(category);

  //   displayJoke(joke, jokePart, category);
};

// function getKeyByValue(object, value) {
//   for (var prop in object) {
//       if (object.hasOwnProperty(prop)) {
//           if (object[prop] === value)
//           return prop;
//       }
//   }
// }

// var exampleObject = {
//   key1: 'Geeks',
//   key2: 100,
//   key3: 'Javascript'
// };

// ans = getKeyByValue(exampleObject, 100);

const displayJoke = function (joke, jokePart, category) {
  html = `<div class="joke-container">
    <h2 class="joke">${joke}</h2>
    <p class="added-text">${jokePart}</p>
    <br />
    <hr />
    <h4 class="${category}">${category}</h4>
   
  </div>`;

  jokesBody.insertAdjacentHTML("beforeend", html);
  //   document.querySelector(".category").classList.add(category);
};

// getJoke();

// // console.log(allBtn);
// allBtn.addEventListener("click", function () {
//   getJoke();
// });

// let categories = new Set();

// checksContainer.addEventListener("click", function (e) {
//   //   e.preventDefault();
//   //   console.log(e.target.checked);
//   if (e.target != allBtn) {
//     allBtn.checked = false;
//   }

//   if (e.target.checked) {
//     // console.log(e.target.id);
//     categories.add(e.target.id);
//   } else if (e.target.checked === false) {
//     categories.delete(e.target.id);
//   }
//   console.log([...categories]);
//   getJoke([...categories]);

//   //   console.log(categories);

//   //   if ((e.target.checked = false)) {
//   //     categories = categories.filter(function (cat) {
//   //       cat.checked = true;
//   //     });
//   //   }
// });

//   if(e.target.contains(""))
//   document.getElementById("red").checked = true;
// });

let categories = new Set();
categories.add("Any");
// getJoke([...categories]);

// Selecting categories
categoryBtn.forEach((cat) =>
  cat.addEventListener("click", function (e) {
    if (!cat.checked) {
      categories.delete(cat.id);
      // console.log(categories);
    }

    // console.log(e.target);

    if (e.target.id === "Any") {
      if (
        programmingBtn.checked ||
        darkBtn.checked ||
        punBtn.checked ||
        miscellaneousBtn.checked
      ) {
        programmingBtn.checked =
          darkBtn.checked =
          punBtn.checked =
          miscellaneousBtn.checked =
            false;

        e.target.checked = true;
        categories.clear();
      }
    }
    if (
      programmingBtn.checked ||
      darkBtn.checked ||
      punBtn.checked ||
      miscellaneousBtn.checked
    ) {
      anyBtn.checked = false;
      categories.delete(anyBtn.id);
    } else {
      anyBtn.checked = true;
    }

    if (cat.checked) {
      categories.add(cat.id);
    }
    getJoke([...categories], [...flags]);
    // getJoke([...categories]);
  })
);

// Selecting filters

let flags = new Set();
flags.add("NSFW");
flags.add("Religious");
flags.add("Political");
flags.add("Racist");
flags.add("Sexist");

// console.log(flags);

nsfwBtn.checked = true;
religiousBtn.checked = true;
politicalBtn.checked = true;
racistBtn.checked = true;
sexistBtn.checked = true;

redFlagsBtn.forEach((flag) =>
  flag.addEventListener("click", function () {
    if (!flag.checked) {
      flags.delete(flag.id);
    } else {
      flags.add(flag.id);
    }
    console.log(flags);
    getJoke([...categories], [...flags]);
  })
);

clearFilterBtn.addEventListener("click", function () {
  nsfwBtn.checked = false;
  religiousBtn.checked = false;
  politicalBtn.checked = false;
  racistBtn.checked = false;
  sexistBtn.checked = false;

  programmingBtn.checked =
    darkBtn.checked =
    punBtn.checked =
    miscellaneousBtn.checked =
      false;

  anyBtn.checked = true;

  categories.clear();
  categories.add("Any");
  flags.clear();
  getJoke([...categories], [...flags]);
});

getJoke([...categories], [...flags]);
