// #region progress par
let progressPar = document.querySelector(".progress-par");
let progressButton = document.querySelector(".circle");
window.addEventListener("scroll", () => {
  let precision =
    (window.scrollY * 100) /
    (document.documentElement.scrollHeight - window.innerHeight);
  progressPar.style.width = `${precision}%`;
  progressButton.style.strokeDashoffset = `${158 * (1 - precision / 100)}`;
});
// #endregion

// #region button up
let button = document.querySelector(".btn-up");
button.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});
// #endregion

// #region home
let mode = document.querySelector(".mode");
mode.addEventListener("click", () => {
  if (mode.classList.contains("not-active")) {
    mode.classList.remove("not-active");
    document.body.style.backgroundColor = "white";
    document.documentElement.style.setProperty("--c3d", "#ddd");
  } else {
    mode.classList.add("not-active");
    document.body.style.backgroundColor = "#333333";
    document.documentElement.style.setProperty("--c3d", "#292929");
  }
});
// #endregion home

// #region validation form pop section
let validationFormPop = document.querySelector(".validation-form-pop");
let userNamePop = document.querySelector(".user-name-pop");
let passwordPop = document.querySelector(".password-pop");
let validSubmit = document.querySelector(".validation-submit");

validationFormPop.addEventListener("submit", (event) => {
  let validUN = false;
  let validP = false;
  if (
    userNamePop.value.trim().length > 5 &&
    userNamePop.value.trim().length < 10
  ) {
    validUN = true;
  }
  if (passwordPop.value.trim().length > 5) {
    validP = true;
  }
  if (validUN === false || validP === false) {
    event.preventDefault();
    let divOverLay = document.createElement("div");
    divOverLay.classList.add("overlay");
    let divPopUp = document.createElement("div");
    divPopUp.classList.add("popup-validation");
    let button = document.createElement("button");
    button.classList.add("btn-popup-validation");
    button.textContent = "OK";
    if (validUN === false && validP === false) {
      let pUseName = document.createElement("p");
      pUseName.textContent = "User name length must be > 5 and < 10 char";
      let pPassword = document.createElement("p");
      pPassword.textContent = "Password length must be > 5";
      divPopUp.append(pUseName, pPassword, button);
    } else if (validUN === false) {
      let pUseName = document.createElement("p");
      pUseName.textContent = "User name length must be > 5 and < 10 char";
      divPopUp.append(pUseName, button);
    } else {
      let pPassword = document.createElement("p");
      pPassword.textContent = "Password length must be > 5";
      divPopUp.append(pPassword, button);
    }

    document.body.append(divOverLay, divPopUp);
  }
});

document.addEventListener("click", (event) => {
  let buttonPopup = event.target;
  if (buttonPopup.classList.contains("btn-popup-validation")) {
    buttonPopup.parentElement.previousElementSibling.remove();
    buttonPopup.parentElement.remove();
  }
});
// #endregion validation form section

// #region validation form reg section
let validationFormReg = document.querySelector(".validation-form-reg");
let userNameReg = document.querySelector(".user-name-reg");
let passwordReg = document.querySelector(".password-reg");
let inputReg = document.querySelectorAll(".input-reg");

validationFormReg.addEventListener("submit", (event) => {
  let validUN = false;
  let validP = false;
  if (userNameReg.value.match(/(a)/)) {
    validUN = true;
  }
  if (passwordReg.value.match(/a/)) {
    validP = true;
  }
  if (validUN === false || validP === false) {
    event.preventDefault();
    if (validUN === false && validP === false) {
      let pUseName = document.createElement("p");
      let pPassword = document.createElement("p");
      pUseName.textContent = "*example@gmail.com";
      pPassword.textContent = "A/Z,a/z,0/9,!@#$";
      pUseName.classList.add("hint-reg");
      pPassword.classList.add("hint-reg");
      inputReg[0].append(pUseName);
      inputReg[1].append(pPassword);
      setTimeout(() => {
        pUseName.style.opacity = 0;
        pPassword.style.opacity = 0;
      }, 3000);
    } else if (validUN === false) {
      let pUseName = document.createElement("p");
      pUseName.textContent = "*example@gmail.com";
      pUseName.classList.add("hint-reg");
      inputReg[0].append(pUseName);
      setTimeout(() => {
        pUseName.style.opacity = 0;
      }, 3000);
    } else {
      let pPassword = document.createElement("p");
      pPassword.textContent = "A/Z,a/z,0/9,!@#$";
      pPassword.classList.add("hint-reg");
      inputReg[1].append(pPassword);
      setTimeout(() => {
        pPassword.style.opacity = 0;
      }, 3000);
    }
  }
});
// #endregion validation form reg section

// #region themes
let themes = document.querySelector(".themes");
let btnThemes = document.querySelectorAll(".themes button");
let clear = document.querySelector(".clear-local-storage");

clear.addEventListener("click", () => {
  localStorage.clear();
  location.reload();
});

if (localStorage.getItem("color") !== null) {
  btnThemes.forEach((e) => {
    e.classList.remove("active");
  });
  document
    .querySelector(`[data-color=${localStorage.getItem("color")}]`)
    .classList.add("active");
  document.documentElement.style.setProperty(
    "--main-color",
    `${localStorage.getItem("color")}`,
  );
}
btnThemes.forEach((e) => {
  e.addEventListener("click", function (event) {
    btnThemes.forEach((e) => {
      e.classList.remove("active");
    });
    this.classList.add("active");
    localStorage.setItem("color", event.target.dataset.color);
    document.documentElement.style.setProperty(
      "--main-color",
      `${localStorage.getItem("color")}`,
    );
  });
});

// #endregion themes

// #region slider glary opacity
let imagesOpacity = document.querySelectorAll(".images-opacity img");
let prevuesOpacity = document.querySelector(".buttons-opacity .prevues-slider");
let nextOpacity = document.querySelector(".buttons-opacity .next-slider");
let bulletsOpacity = document.querySelectorAll(
  ".buttons-opacity .bullet-slider",
);

bulletsOpacity.forEach((el) => {
  el.addEventListener("click", function () {
    document
      .querySelector(".buttons-opacity .active")
      .classList.remove("active");
    document
      .querySelector(".images-opacity .active")
      .classList.remove("active");

    this.classList.add("active");
    imagesOpacity[this.dataset.index].classList.add("active");
  });
});
prevuesOpacity.addEventListener("click", () => {
  let current = document.querySelector(".buttons-opacity .active");
  current.classList.remove("active");
  imagesOpacity[current.dataset.index].classList.remove("active");
  if (current.previousElementSibling !== null) {
    current.previousElementSibling.classList.add("active");
    imagesOpacity[current.previousElementSibling.dataset.index].classList.add(
      "active",
    );
  } else {
    bulletsOpacity[bulletsOpacity.length - 1].classList.add("active");
    imagesOpacity[imagesOpacity.length - 1].classList.add("active");
  }
});
nextOpacity.addEventListener("click", () => {
  let current = document.querySelector(".buttons-opacity .active");
  current.classList.remove("active");
  imagesOpacity[current.dataset.index].classList.remove("active");
  if (current.nextElementSibling !== null) {
    current.nextElementSibling.classList.add("active");
    imagesOpacity[current.nextElementSibling.dataset.index].classList.add(
      "active",
    );
  } else {
    bulletsOpacity[0].classList.add("active");
    imagesOpacity[0].classList.add("active");
  }
});
// #endregion slider glary opacity

// #region slider glary scroll
let imagesScroll = document.querySelector(".images-scroll");
let prevuesScroll = document.querySelector(".buttons-scroll .prevues-slider");
let nextScroll = document.querySelector(".buttons-scroll .next-slider");
let bulletsScroll = document.querySelectorAll(".buttons-scroll .bullet-slider");
let imageWidth = "280";
bulletsScroll.forEach((el) => {
  el.addEventListener("click", function () {
    document
      .querySelector(".buttons-scroll .active")
      .classList.remove("active");
    this.classList.add("active");
    imagesScroll.style.transform = `translateX(${-(this.dataset.index * imageWidth)}px)`;
  });
});
prevuesScroll.addEventListener("click", () => {
  let current = document.querySelector(".buttons-scroll .active");
  current.classList.remove("active");
  if (current.previousElementSibling !== null) {
    current.previousElementSibling.classList.add("active");
    imagesScroll.style.transform = `translateX(${-(current.previousElementSibling.dataset.index * imageWidth)}px)`;
  } else {
    bulletsScroll[bulletsScroll.length - 1].classList.add("active");
    imagesScroll.style.transform = `translateX(${-(bulletsScroll[bulletsScroll.length - 1].dataset.index * imageWidth)}px)`;
  }
});
nextScroll.addEventListener("click", () => {
  let current = document.querySelector(".buttons-scroll .active");
  current.classList.remove("active");
  if (current.nextElementSibling !== null) {
    current.nextElementSibling.classList.add("active");
    imagesScroll.style.transform = `translateX(${-(current.nextElementSibling.dataset.index * imageWidth)}px)`;
  } else {
    bulletsScroll[0].classList.add("active");
    imagesScroll.style.transform = `translateX(${-bulletsScroll[0].dataset.index * imageWidth}px)`;
  }
});
// #endregion slider glary scroll

// #region slider glary update
let imagesUpdate = document.querySelector(".images-update");
let imgUpdate = document.querySelectorAll(".images-update img");

let imgCount = imgUpdate.length;

let prevuesUpdate = document.querySelector(".buttons-update .prevues-slider");
let nextUpdate = document.querySelector(".buttons-update .next-slider");
let bulletsUpdate = document.querySelectorAll(".buttons-update .bullet-slider");

let lastImage = imgUpdate[imgCount - 1].cloneNode(true);
let firstImage = imgUpdate[0].cloneNode(true);
imagesUpdate.prepend(lastImage);
imagesUpdate.append(firstImage);

let currentMove = 1;
imagesUpdate.style.transform = `translateX(${-(currentMove * imageWidth)}px)`;

function moveSlid() {
  imagesUpdate.classList.add("duration");
  imagesUpdate.style.transform = `translateX(${-currentMove * imageWidth}px)`;
}

bulletsUpdate.forEach((el) => {
  el.addEventListener("click", function () {
    bulletsUpdate[currentMove - 1].classList.remove("active");
    currentMove = +this.dataset.index + 1;
    this.classList.add("active");
    imagesUpdate.classList.add("duration");
    imagesUpdate.style.transform = `translateX(${-(currentMove * imageWidth)}px)`;
  });
});
prevuesUpdate.addEventListener("click", () => {
  bulletsUpdate[currentMove - 1].classList.remove("active");
  if (currentMove === 1) {
    bulletsUpdate[imgCount - 1].classList.add("active");
  } else {
    bulletsUpdate[currentMove - 2].classList.add("active");
  }
  currentMove--;
  moveSlid();
});
nextUpdate.addEventListener("click", () => {
  bulletsUpdate[currentMove - 1].classList.remove("active");
  if (currentMove === imgCount) {
    bulletsUpdate[0].classList.add("active");
  } else {
    bulletsUpdate[currentMove].classList.add("active");
  }
  currentMove++;
  moveSlid();
});
imagesUpdate.addEventListener("transitionend", () => {
  if (currentMove === 0 || currentMove === imgCount + 1) {
    imagesUpdate.classList.remove("duration");
    if (currentMove === 0) {
      currentMove = imgCount;
    } else if (currentMove === imgCount + 1) {
      currentMove = 1;
    }
    imagesUpdate.style.transform = `translateX(${-currentMove * imageWidth}px)`;
  }
});
// #endregion slider glary update

// #region add item
let formCourse = document.querySelector(".form__course");
let input = document.querySelector(".input");
let submitCourse = document.querySelector(".submit-course");
let courses = document.querySelector(".courses");

showOldData();

formCourse.addEventListener("submit", (event) => {
  event.preventDefault();
  let oldData = localStorage.getItem("oldData");
  if (oldData === null) {
    localStorage.setItem("oldData", input.value);
  } else {
    courses.innerHTML = "";
    localStorage.setItem("oldData", `${oldData},${input.value}`);
  }
  showOldData();
  input.value = "";
});

document.addEventListener("click", function (event) {
  let dlt = event.target;
  if (dlt.classList.contains("delete-course")) {
    let updatedData = localStorage
      .getItem("oldData")
      .split(",")
      .filter((e) => {
        return e !== dlt.previousElementSibling.textContent;
      })
      .join(",");
    localStorage.setItem("oldData", updatedData);
    if (dlt.classList.contains("delete-course")) {
      dlt.parentElement.remove();
      if (localStorage.getItem("oldData") === "") {
        localStorage.removeItem("oldData");
      }
    }
  }
});

function showOldData() {
  if (localStorage.getItem("oldData") !== null) {
    let oldData = localStorage.getItem("oldData");
    oldData.split(",").forEach((e) => {
      let div = document.createElement("div");
      div.classList.add("course");
      let p = document.createElement("p");
      p.classList.add("title-course");
      p.textContent = e;
      let button = document.createElement("button");
      button.classList.add("delete-course");
      button.textContent = "Delete";
      div.append(p, button);
      courses.append(div);
    });
  }
}
// #endregion

// #region generation text
let itemsGeneration = document.querySelector(".items-generation");
let buttonGenerationText = document.querySelector(".button-generation.text");
let nxtElement = generationItems();
buttonGenerationText.addEventListener("click", () => {
  newElement = nxtElement.next();
  let p = document.createElement("p");
  p.textContent = newElement.value;
  p.classList.add("item-generation");
  itemsGeneration.append(p);
  if (newElement.value === "six") {
    buttonGenerationText.disabled = true;
    buttonGenerationText.style.opacity = 0.5;
  }
});
function* generationItems() {
  yield "three";
  yield "four";
  yield "fife";
  yield "six";
}
// #endregion generation text

// #region generation images
let imagesGeneration = document.querySelector(".images-generation");
let buttonGenerationImages = document.querySelector(
  ".button-generation.btn-images",
);
let nxtImage = generationImages();
buttonGenerationImages.addEventListener("click", () => {
  newImage = nxtImage.next();
  let img = document.createElement("img");
  img.src = newImage.value;
  img.classList.add("image-generation");
  let div = document.createElement("div");
  div.classList.add("over");
  div.append(img);
  imagesGeneration.append(div);
  if (newImage.value === "img/img-4.jpg") {
    buttonGenerationImages.disabled = true;
    buttonGenerationImages.style.opacity = 0.5;
  }
});
function* generationImages() {
  yield "img/img-3.jpg";
  yield "img/img-4.jpg";
}
document.addEventListener("click", (event) => {
  if (event.target.firstElementChild !== null) {
    let img = event.target.firstElementChild;
    if (img.classList.contains("image-generation")) {
      let imag = document.createElement("img");
      imag.classList.add("image-large");
      imag.src = img.src;
      let divOverLay = document.createElement("div");
      divOverLay.classList.add("overlay");
      divOverLay.style.cursor = "pointer";
      document.body.append(imag, divOverLay);
    }
  }
});
document.addEventListener("click", (event) => {
  let deleteImg = event.target;
  if (deleteImg.classList.contains("overlay")) {
    if (document.body.lastElementChild.classList.contains("overlay")) {
      document.body.lastElementChild.previousElementSibling.remove();
      document.body.lastElementChild.remove();
    }
  }
});
// #endregion generation images

// #region card flip
let cards = document.querySelectorAll(".card");
let deg = "180";
cards.forEach((card) => {
  card.addEventListener("click", function (e) {
    this.firstElementChild.style.transform = `rotateY(${e.target.dataset.index * deg}deg)`;
  });
});
// #endregion card flip

// #region progress skills
let skillFill = document.querySelectorAll(".skill-fill");
window.addEventListener("scroll", () => {
  if (scrollY >= 3900) {
    skillFill.forEach((e) => {
      e.style.width = e.dataset.progress;
      let counter = parseInt(e.firstElementChild.textContent);
      let goalProgress = parseInt(e.dataset.progress);
      setInterval(() => {
        if (counter < goalProgress) {
          e.firstElementChild.textContent = `${++counter}%`;
        }
      }, 2000 / goalProgress);
    });
  }
});
// #endregion progress skills
