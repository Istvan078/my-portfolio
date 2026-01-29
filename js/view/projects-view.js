export class ProjectsView {
  _parentElement = document.querySelector(".projects");
  _projectCards = this._parentElement.querySelector(".projects__cards");
  state = {};

  constructor() {}

  render() {
    if (this.state.searchedProjects?.length)
      this.renderProjectCards(this.state.searchedProjects);
    else this.renderProjectCards(this.state.projects);
    this.chooseAndInitShownAmount();
  }

  // RENDER PROJECT CARDS BASED ON STATE
  renderProjectCards(arr) {
    // Implementation for rendering project cards based on this.state.projects
    // Clears existing cards if any
    this._projectCards.innerHTML = "";
    arr.map((proj) => {
      this._projectCards.insertAdjacentHTML(
        "beforeend",
        this.generateMarkup(proj),
      );
    });
    return;
  }

  generateMarkup(proj) {
    const markup = `
                <div class="card ${proj.isError ? "card--error" : ""}">
          <div class="card__header">
            <div class="img-wrapper">
              <img src="${proj.logo}" alt="${proj.name}" />
            </div>
            <h3 class="card__title">${proj.name}</h3>
            ${
              !proj.isError
                ? `
            <span class="card__menu">...</span>
            `
                : ""
            }
          </div>
          <div class="card__body">
            <p class="card__body-text">
              ${proj.description}
            </p>
          </div>
          ${
            proj.btnTexts
              ? `
          <div class="card__actions">
            <button class="btn btn--${proj.btnTexts?.[0]} btn-icon-btn">
            ${
              proj.icons?.[0].type === "sprite" && proj.iconsResolved?.[0]
                ? `
              <svg class="btn-icon">
                <use
                  xlink:href="${proj.iconsResolved[0]}"
                ></use>
              </svg>`
                : proj.iconsResolved?.[0]
                  ? `
                <object class="btn-icon" data="${proj.iconsResolved[0]}" type="image/svg+xml">
                </object>
              `
                  : ""
            }
              ${proj.technologies?.[0]}
            </button>
            <button class="btn btn--${proj.btnTexts?.[1]} btn-icon-btn">
              ${
                proj.icons?.[1].type === "sprite" && proj.iconsResolved?.[1]
                  ? `<svg class="btn-icon">
                <use
                  xlink:href="${proj.iconsResolved[1]}"
                ></use>
              </svg>`
                  : proj.iconsResolved?.[1]
                    ? `
                <object class="btn-icon" data="${proj.iconsResolved[1]}" type="image/svg+xml">
                </object>
              `
                    : ""
              }
              ${proj.technologies?.[1]}
            </button>
          </div>
          `
              : ""
          }
          <div class="card__footer">
            ${
              !proj.isError
                ? `
            <span class="card__footer-date">Updated on ${proj.timeString}</span>
            `
                : ""
            }
          </div>
        </div>
    `;
    return markup;
  }

  addHandlerRender(handler, selector, eventType) {
    const element = this._parentElement.querySelector(selector);
    const listener = (e) => {
      handler(e.currentTarget);
      this.render();
    };
    element.addEventListener(eventType, listener);
    return () => {
      element.removeEventListener(eventType, listener);
    };
  }

  // CHOOSE NUMBER OF SHOWN PROJECTS
  chooseAndInitShownAmount(targetSelect) {
    const cards = this._parentElement.querySelectorAll(".card");
    const shownNumber = this._parentElement.querySelector(".shown-number");
    const selectElement = targetSelect
      ? targetSelect
      : this._parentElement.querySelector(".number__select");
    const numOfProjects = this._parentElement.querySelector(".num-of-projects");
    shownNumber.textContent = targetSelect
      ? targetSelect.value
      : selectElement.value;
    numOfProjects.textContent =
      +shownNumber.textContent > cards.length
        ? cards.length + " / " + cards.length
        : shownNumber.textContent + " / " + cards.length;
    cards.forEach((card, i) => {
      if (i > selectElement.value - 1) card.style.display = "none";
      else card.style.display = "grid";
    });
  }
}
