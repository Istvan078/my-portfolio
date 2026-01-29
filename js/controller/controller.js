import model from "../model/model.js";
import { MainView } from "../view/main-view.js";
import { PopupView } from "../view/popup-view.js";
import { ProjectsView } from "../view/projects-view.js";
const mainView = new MainView();
const popupView = new PopupView();
const projectsView = new ProjectsView();

// INITIALIZATION
const init = async () => {
  await controlProjects();
  controlMainView();
  controlChangeLangHandler();
  controlOpenPopup();
  controlNavLinks();
  controlHamburgerMenu();
  controlShowMoreInfo();
  controlChooseShownAmount();
  controlSortProjects();
  controlSearchProjects();
  console.log(`***App initialized***`);
};

// RENDER MAIN VIEW WITH STATE
const controlMainView = () => {
  mainView.state = model.state;
  projectsView.state = model.state;
  mainView.render();
  projectsView.render();
};

//////////////// MODEL-VIEW CONTROLLER ////////////////
async function controlProjects() {
  await model.loadProjects();
}

//////////////// EVENT HANDLERS ////////////////

// LANGUAGE CHANGE HANDLER
const controlChangeLangHandler = () => {
  mainView.addHandlerNewLang(model.changeLang);
};

// OPEN POPUP HANDLER
const controlOpenPopup = () => {
  popupView.state = model.state;
  mainView.addClickHandler(popupView.render.bind(popupView), ".btn-open-popup");
};

// NAV LINKS CLICK HANDLER
const controlNavLinks = () => {
  mainView.addClickHandler(
    model.changeActiveNavLink,
    ".nav__item",
    false,
    true,
  );
};

// HAMBURGER MENU TOGGLE
const controlHamburgerMenu = () => {
  mainView.addClickHandler(model.toggleHamburgerMenu, ".nav__menu");
};

// SHOW MORE INFO BUTTON
const controlShowMoreInfo = () => {
  mainView.addClickHandler(
    mainView.showMoreInfo,
    ".btn--show-more-info",
    true,
    true,
  );
};

// CHOOSE AMOUNT OF SHOWN PROJECTS
const controlChooseShownAmount = () => {
  projectsView.addHandlerRender(
    projectsView.chooseAndInitShownAmount.bind(projectsView),
    ".number__select",
    "change",
  );
};

// SORT PROJECTS
const controlSortProjects = () => {
  projectsView.addHandlerRender(model.sort, ".projects__sort-by", "change");
};

// SEARCH PROJECTS
const controlSearchProjects = () => {
  projectsView.addHandlerRender(model.search, ".search-input", "input");
};

// START APPLICATION
init();
