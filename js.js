// #region progress par

let progressPar = document.querySelector(".progress-par");
let progressButton = document.querySelector(".circle");

function getMaxScroll() {
  return document.documentElement.scrollHeight - window.innerHeight;
}

progressButton.style.strokeDasharray =
  progressButton.getAttribute("r") * 2 * Math.PI;
let dashArray = progressButton.style.strokeDasharray;
updateProgress();

function updateProgress() {
  let precision = window.scrollY / getMaxScroll();
  progressPar.style.width = `${precision * 100}%`;
  progressButton.style.strokeDashoffset = `${dashArray * (1 - precision)}`;
}

let ticking = false;
window.addEventListener("scroll", () => {
  if (!ticking) {
    requestAnimationFrame(() => {
      updateProgress();
      ticking = false;
    });
    ticking = true;
  }
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

// #region themes

let btnThemes = document.querySelectorAll(".themes button");
let clear = document.querySelector(".clear-local-storage");
let colorTheme = localStorage.getItem("color");

function clearActiveTheme() {
  btnThemes.forEach((e) => {
    e.classList.remove("active");
  });
}

btnThemes.forEach((e) => {
  e.style.backgroundColor = `#${e.dataset.color}`;
});

if (colorTheme !== null) {
  clearActiveTheme(btnThemes);
  activeBtn = document.querySelector(`[data-color='${colorTheme}']`);
  if (activeBtn) {
    activeBtn.classList.add("active");
    document.documentElement.style.setProperty(
      "--main-color",
      `#${colorTheme}`,
    );
  } else {
    localStorage.removeItem("color");
  }
} else {
  document.documentElement.style.setProperty(
    "--main-color",
    `#${document.querySelector(".themes .active").dataset.color}`,
  );
}

clear.addEventListener("click", () => {
  localStorage.clear();
  location.reload();
});

btnThemes.forEach((e) => {
  e.addEventListener("click", function (event) {
    clearActiveTheme(btnThemes);
    this.classList.add("active");
    colorTheme = event.target.dataset.color;
    localStorage.setItem("color", colorTheme);
    document.documentElement.style.setProperty(
      "--main-color",
      `#${colorTheme}`,
    );
  });
});

// #endregion themes

// #region generate sections
let sections = document.querySelectorAll("section");
const observeSection = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("active-section");
      observeSection.unobserve(entry.target);
    }
  });
});
sections.forEach((section) => {
  observeSection.observe(section);
});
// #endregion generate sections

// #region home
let mode = document.querySelector(".mode");
if (localStorage.getItem("dark") === "true") {
  document.documentElement.classList.add("dark-mode");
  mode.classList.add("dark");
}
mode.addEventListener("click", () => {
  mode.classList.toggle("dark");
  document.documentElement.classList.toggle("dark-mode");
  localStorage.getItem("dark") === "true"
    ? localStorage.setItem("dark", "false")
    : localStorage.setItem("dark", "true");
});
// #endregion home

// #region validation form pop section
let validationFormPop = document.querySelector(".validation-form-pop");
let userNamePop = document.querySelector(".user-name-pop");
let passwordPop = document.querySelector(".password-pop");

function createElementPopUp(tag, classPop = "", textElement = "") {
  let elementPop = document.createElement(tag);
  if (classPop) {
    elementPop.classList.add(classPop);
  }
  if (textElement) {
    elementPop.textContent = textElement;
  }
  return elementPop;
}

function createError(message) {
  return createElementPopUp("p", "", message);
}

validationFormPop.addEventListener("submit", (event) => {
  const errors = [];
  let validUN =
    userNamePop.value.trim().length > 5 && userNamePop.value.trim().length < 10;
  let validP = passwordPop.value.trim().length > 5;
  if (!validUN) {
    errors.push("User name length must be > 5 and < 10 char");
  }
  if (!validP) {
    errors.push("Password length must be > 5");
  }
  if (errors.length) {
    event.preventDefault();
    let divOverLay = createElementPopUp("div", "overlay");
    let divPopUp = createElementPopUp("div", "popup-validation");
    let button = createElementPopUp("button", "btn-popup-validation", "OK");
    errors.forEach((error) => {
      divPopUp.append(createError(error));
    });
    divPopUp.append(button);
    divPopUp.overlay = divOverLay;
    document.body.append(divOverLay, divPopUp);
    button.focus();
  }
});

document.addEventListener("click", (event) => {
  if (event.target.classList.contains("btn-popup-validation")) {
    const popup = event.target.parentElement;
    popup.overlay.remove();
    popup.remove();
  }
});
// #endregion validation form section

// #region validation form reg section
let validationFormReg = document.querySelector(".validation-form-reg");
let userNameReg = document.querySelector(".user-name-reg");
let passwordReg = document.querySelector(".password-reg");
let hintUser = document.querySelector(".hint-user");
let hintPass = document.querySelector(".hint-pass");

function showHint(hint) {
  hint.style.opacity = 1;
  setTimeout(() => {
    hint.style.opacity = 0;
  }, 3000);
}

function validationUserName() {
  return /^\w+@gmail\.com$/.test(userNameReg.value.trim());
}
function validationPassword(passwordValue = passwordReg.value.trim()) {
  return (
    /(!|@|#|\$)/.test(passwordValue) &&
    /[A-Z]/.test(passwordValue) &&
    /[0-9]/.test(passwordValue) &&
    /[a-z]/.test(passwordValue)
  );
}

validationFormReg.addEventListener("submit", (event) => {
  let validUN = validationUserName();
  let validP = validationPassword();

  if (validUN === false || validP === false) {
    event.preventDefault();
    if (validUN === false && validP === false) {
      showHint(hintUser);
      showHint(hintPass);
    } else if (validUN === false) {
      showHint(hintUser);
    } else {
      showHint(hintPass);
    }
  }
});
// #endregion validation form reg section

// #region slider glary opacity
let imagesOpacity = document.querySelectorAll(".images-opacity img");
let prevuesOpacity = document.querySelector(".buttons-opacity .prevues-slider");
let nextOpacity = document.querySelector(".buttons-opacity .next-slider");
let bulletsOpacity = document.querySelectorAll(
  ".buttons-opacity .bullet-slider",
);
let activeIndex = 0;
function moveOpacity(newIndex) {
  newIndex = (newIndex + imagesOpacity.length) % imagesOpacity.length;
  bulletsOpacity[activeIndex].classList.remove("active");
  imagesOpacity[activeIndex].classList.remove("active");
  activeIndex = newIndex;
  bulletsOpacity[activeIndex].classList.add("active");
  imagesOpacity[activeIndex].classList.add("active");
}
prevuesOpacity.addEventListener("click", () => {
  moveOpacity(activeIndex - 1);
});
nextOpacity.addEventListener("click", () => {
  moveOpacity(activeIndex + 1);
});
bulletsOpacity.forEach((el) => {
  el.addEventListener("click", function () {
    moveOpacity(+this.dataset.index);
  });
});
// #endregion slider glary opacity

// #region slider glary
let imagesScroll = document.querySelector(".images-scroll");
let imgScroll = document.querySelectorAll(".images-scroll img");
let slider = document.querySelector(".images-slider");
let imageWidth = imgScroll[0].getBoundingClientRect().width;
let imgCount = imgScroll.length;

let prevuesScroll = document.querySelector(".buttons-scroll .prevues-slider");
let nextScroll = document.querySelector(".buttons-scroll .next-slider");
let bulletsScroll = document.querySelectorAll(".buttons-scroll .bullet-slider");

let lastImage = imgScroll[imgCount - 1].cloneNode(true);
let firstImage = imgScroll[0].cloneNode(true);
imagesScroll.prepend(lastImage);
imagesScroll.append(firstImage);

let currentMove = 1;
imagesScroll.style.transform = `translateX(${-(currentMove * imageWidth)}px)`;

bulletsScroll.forEach((el) => {
  el.addEventListener("click", function () {
    moveSlider(+this.dataset.index + 1);
  });
});
prevuesScroll.addEventListener("click", () => {
  moveSlider(currentMove - 1);
});
nextScroll.addEventListener("click", () => {
  moveSlider(currentMove + 1);
});
let isAnimating = false;
function moveSlider(newInd) {
  if (isAnimating) return;
  isAnimating = true;
  bulletsScroll[currentMove - 1].classList.remove("active");
  currentMove = newInd;
  newInd = newInd === 0 ? imgCount : newInd === imgCount + 1 ? 1 : newInd;
  bulletsScroll[newInd - 1].classList.add("active");
  imagesScroll.classList.add("duration");
  imagesScroll.style.transform = `translateX(${-(currentMove * imageWidth)}px)`;
}
imagesScroll.addEventListener("transitionend", () => {
  if (currentMove === 0 || currentMove === imgCount + 1) {
    imagesScroll.classList.remove("duration");
    if (currentMove === 0) {
      currentMove = imgCount;
    } else if (currentMove === imgCount + 1) {
      currentMove = 1;
    }
    imagesScroll.style.transform = `translateX(${-currentMove * imageWidth}px)`;
  }
  isAnimating = false;
});
// #endregion slider glary

// #region add item
let formCourse = document.querySelector(".form__course");
let input = document.querySelector(".input");
let courses = document.querySelector(".courses");

function createItem(tag, className, textItem) {
  let theItem = document.createElement(tag);
  theItem.classList.add(className);
  if (textItem) {
    theItem.textContent = textItem;
  }
  return theItem;
}

function showOldData() {
  if (localStorage.getItem("oldData") !== null) {
    let oldData = localStorage.getItem("oldData");
    oldData.split(",").forEach((e) => {
      let div = createItem("div", "course");
      let p = createItem("p", "title-course", e);
      let button = createItem("button", "delete-course", "Delete");
      div.append(p, button);
      courses.append(div);
    });
  }
}

showOldData();

formCourse.addEventListener("submit", (event) => {
  event.preventDefault();
  if (input.value) {
    let oldData = localStorage.getItem("oldData");
    if (oldData === null) {
      localStorage.setItem("oldData", input.value);
    } else {
      courses.innerHTML = "";
      localStorage.setItem("oldData", `${oldData},${input.value}`);
    }
    showOldData();
    input.value = "";
  }
});
document.addEventListener("click", function (event) {
  let dlt = event.target;
  if (dlt.classList.contains("delete-course")) {
    let indexCourse = 0;
    let allCourses = document.querySelectorAll(".courses .course");
    allCourses.forEach((e) => {
      if (e.lastElementChild === dlt) {
        let updatedData = localStorage.getItem("oldData").split(",");
        updatedData.splice(indexCourse, 1);
        updatedData.join(",");
        localStorage.setItem("oldData", updatedData);
      } else {
        indexCourse++;
      }
    });
    dlt.parentElement.remove();
    if (localStorage.getItem("oldData") === "") {
      localStorage.removeItem("oldData");
    }
  }
});
// #endregion

// #region generation text
let itemsGeneration = document.querySelector(".items-generation");
let buttonGenerationText = document.querySelector(".button-generation.text");
let nxtElement = generationItems();
buttonGenerationText.addEventListener("click", () => {
  let newElement = nxtElement.next();
  if (newElement.done) {
    buttonGenerationText.disabled = true;
    buttonGenerationText.style.opacity = 0.5;
  } else {
    let p = document.createElement("p");
    p.textContent = newElement.value;
    p.classList.add("item-generation");
    itemsGeneration.append(p);
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
function* generationImages() {
  yield "img/img-3.jpg";
  yield "img/img-4.jpg";
}
buttonGenerationImages.addEventListener("click", () => {
  let newImage = nxtImage.next();
  if (newImage.done) {
    buttonGenerationImages.disabled = true;
    buttonGenerationImages.style.opacity = 0.5;
  } else {
    let img = document.createElement("img");
    img.src = newImage.value;
    img.classList.add("image-generation");
    let div = document.createElement("div");
    div.classList.add("over");
    div.append(img);
    imagesGeneration.append(div);
  }
});
document.addEventListener("click", (event) => {
  if (event.target.firstElementChild !== null) {
    let img = event.target.firstElementChild;
    if (img.classList.contains("image-generation")) {
      let imag = document.createElement("img");
      imag.classList.add("image-large");
      imag.src = img.src;
      let divOverLay = document.createElement("div");
      divOverLay.classList.add("overlay", "overlay-image");
      document.overlay = divOverLay;
      document.imag = imag;
      divOverLay.style.cursor = "pointer";
      document.body.append(imag, divOverLay);
    }
  }
});
document.addEventListener("click", (event) => {
  let deleteImg = event.target;
  if (deleteImg.classList.contains("overlay-image")) {
    document.overlay.remove();
    document.imag.remove();
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
let firstSkillFill = document.querySelector(".skill-fill");

function updateCounter(e, goalProgress, startTime) {
  let durationProgress = 2000;
  let elapsed = performance.now() - startTime;
  let theProgress = Math.min(elapsed / durationProgress, 1);
  let counter = Math.round(theProgress * goalProgress);
  e.firstElementChild.textContent = `${counter}%`;
  if (theProgress < 1) {
    requestAnimationFrame(() => {
      updateCounter(e, goalProgress, startTime);
    });
  }
}
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      skillFill.forEach((e) => {
        e.style.width = e.dataset.progress;
        let goalProgress = parseInt(e.dataset.progress);
        requestAnimationFrame((startTime) => {
          updateCounter(e, goalProgress, startTime);
        });
      });
      observer.unobserve(firstSkillFill);
    }
  });
});
observer.observe(firstSkillFill);
// #endregion progress skills
