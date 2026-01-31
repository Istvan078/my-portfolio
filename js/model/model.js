import en from "../../i18n/en.json";
import hu from "../../i18n/hu.json";
import { utils } from "../utils/utils.js";
import Project from "../model/project.model.js";
import errorHandlerService from "../services/error-handler.service.js";
import firebaseSvg from "./../../assets/SVG/firebase-icon.svg";
import errorIcon from "./../../assets/SVG/error.svg";
import firestoreService from "../services/firestore.service.js";
import fireStorageService from "../services/firestorage.service.js";

const sprites = {
  codeLangs: "/sprites/code-languages-sprite.svg",
  sprite1: "/sprites/sprite-1.svg",
  sprite2: "/sprites/sprite-2.svg",
  sendSprite: "/sprites/send-sprite.svg",
};

const fileIcons = {
  firebase: firebaseSvg,
};

// const icons = [
//   { type: "sprite", sprite: "codeLangs", symbol: "icon-angular" },
//   { type: "sprite", sprite: "codeLangs", symbol: "icon-redux" },
// ];

///// MAIN STATE ////
const state = {};

state.dictionary = { en, hu };
state.demoIcon = `${sprites.sendSprite}#icon-send`;

// state.project = new Project({
// });

// ADD NEW PROJECT TO FIRESTORE
async function addProject() {
  await firestoreService.addDataToStore({ ...state.project }, "projects");
}

// GET ALL PROJECTS FROM FIRESTORE
async function getAllProjects() {
  state.projects = await firestoreService.getDataFromStore("projects");
  state.projects = state.projects.map((p) => ({
    ...p,
    iconsResolved: (p.icons || []).map(resolveIcon),
  }));
  state.projects = utils.sort("date-newest", {
    arr: state.projects,
    compProp: "modifiedAt",
    lang: state.lang,
  });
}

// UPDATE PROJECTS IN FIRESTORE
async function updateProject(id) {
  try {
    await firestoreService.updateProject(id, { ...state.project });
  } catch (err) {
    errorHandlerService.handleError(err);
  }
}
// DELETE PROJECT FROM FIRESTORE
async function deleteProject(id) {
  try {
    await firestoreService.deleteProject(id);
  } catch (err) {
    errorHandlerService.handleError(err);
  }
}

// UPLOAD PROJECT IMAGE TO FIREBASE STORAGE
async function uploadProjectImage(locFilePath, proj) {
  // FONTOS: ellenőrizzük, hogy tényleg képet kaptunk-e
  const res = await fetch(locFilePath);
  const ct = res.headers.get("content-type") || "";
  if (!res.ok || !ct.startsWith("image/")) {
    const text = await res.text();
    throw new Error(
      `Nem képet kaptam vissza. status=${res.status}, content-type=${ct}. Valószínűleg index.html jött vissza.\n` +
        text.slice(0, 120),
    );
  }
  const blob = await res.blob();
  blob.name = locFilePath.split("/").pop();
  const file = new File([blob], blob.name, { type: blob.type });
  console.log(res, "Blob created.");
  const timestamp = Date.now();
  const filePath = `${proj.name}-media/${timestamp}-${file.name}`;
  const downloadURL = await fireStorageService.uploadFile(filePath, file);
  console.log(downloadURL, "File uploaded successfully.");
  return downloadURL;
}

// ADD MESSAGE FROM GET IN TOUCH FORM TO FIRESTORE
const addMessage = (message) => {
  firestoreService.addDataToStore({ ...message }, "messages");
};

// GET MESSAGES FROM FIRESTORE
const getMessages = async () => {
  const messages = await firestoreService.getDataFromStore("messages");
  if (messages?.length) {
    state.admin = {};
    state.admin.messages = messages;
  }
  return messages;
};

// RESOLVE ICON URLS
const resolveIcon = (icon) => {
  if (!icon) return "";
  if (typeof icon === "string") return icon; // ha van régi adatod még
  if (icon.type === "sprite") {
    return `${sprites[icon.sprite]}#${icon.symbol}`;
  }
  if (icon.type === "svg") {
    return fileIcons[icon.key] || "";
  }
  return "";
};

const selectedLang = localStorage.getItem("lang");
if (selectedLang) state.lang = selectedLang;
else {
  state.lang = navigator.language || "en";
  localStorage.setItem("lang", state.lang);
}
state.lang = state.lang.split("-")[0];

const changeLang = () => {
  if (state.lang === "en") state.lang = "hu";
  else state.lang = "en";
  localStorage.setItem("lang", state.lang);
  return state.lang;
};

const changeActiveNavLink = (linkElement) => {
  document.querySelectorAll(".nav__item").forEach((link) => {
    link.dataset.active = "false";
  });
  linkElement.children[0].classList.contains("nav__link")
    ? (linkElement.dataset.active = "true")
    : "";
};

const toggleHamburgerMenu = () => {
  const navMenu = document.querySelector(".nav__menu");
  const navList = document.querySelector(".nav__list");
  const navItems = document.querySelectorAll(".nav__item");
  navMenu.classList.toggle("nav__menu--open");
  navList.classList.toggle("nav__list--open");
  navItems.forEach((item) => item.classList.toggle("nav__item--open"));
};

// SORT PROJECTS IN STATE
const sort = (selectElement) => {
  selectElement.previousElementSibling.value = "";
  state.searchedProjects = [];
  let sortByData = {
    arr: state.projects,
    compProp: "modifiedAt",
    lang: state.lang,
  };
  switch (selectElement.value) {
    case "date-newest":
      state.projects = utils.sort("date-newest", sortByData);
      break;
    case "date-oldest":
      state.projects = utils.sort("date-oldest", sortByData);
      break;
    case "name-a-z":
      sortByData.compProp = "name";
      state.projects = utils.sort("name-a-z", sortByData);
      break;
    case "name-z-a":
      sortByData.compProp = "name";
      state.projects = utils.sort("name-z-a", sortByData);
      break;
  }
};

// SEARCH PROJECTS IN STATE
const search = (inputElement) => {
  if (!inputElement.value) {
    state.searchedProjects = [];
    return;
  }
  const result = utils.searchResult(state.projects, inputElement.value, "name");
  if (inputElement.value && !result?.length) {
    const err = new Error("No projects found matching your search.");
    state.searchedProjects = [
      {
        name: "ERROR",
        description:
          "No projects found matching your search. Please try again.",
        logo: errorIcon,
        isError: true,
      },
    ];
    return;
  }
  state.searchedProjects = result;
};

// EXPORTING MODEL OBJECT
const model = {
  state,
  changeLang,
  changeActiveNavLink,
  toggleHamburgerMenu,
  sort,
  search,
  loadProjects: getAllProjects,
  addMessage,
  getMessages,
};

export default model;
