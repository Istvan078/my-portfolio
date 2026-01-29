export class MainView {
  constructor() {
    this.state = {};
    this._parentElement = document.querySelector("body");
  }

  // RENDER METHOD TO UPDATE TEXT CONTENT BASED ON STATE
  render() {
    this._parentElement.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      el.textContent = this.state.dictionary[this.state.lang]?.[key] ?? key;
    });
    this.viewShowMoreInfo();
    // this.chooseAndInitShownAmount();
  }

  // LANGUAGE CHANGE
  addHandlerNewLang(handler) {
    document.querySelectorAll(".lang-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        handler();
        this.render();
      });
    });
  }

  // GENERIC CLICK HANDLER
  addClickHandler(handler, selector, preventDefault = false, multiple = false) {
    if (!multiple)
      this._parentElement
        .querySelector(selector)
        .addEventListener("click", (e) => {
          if (preventDefault) e.preventDefault();
          handler(e.currentTarget);
        });
    if (multiple) {
      this._parentElement.querySelectorAll(selector).forEach((el) => {
        el.addEventListener("click", (e) => {
          if (preventDefault) e.preventDefault();
          handler(e.currentTarget);
        });
      });
    }
  }

  addChangeHandler(handler, selector) {
    this._parentElement
      .querySelector(selector)
      .addEventListener("change", (e) => {
        handler(e.currentTarget);
      });
  }

  // SHOW "SHOW MORE INFO" BUTTON IF TEXT OVERFLOWS
  viewShowMoreInfo() {
    const cardBody = this._parentElement.querySelectorAll(".card__body");
    cardBody.forEach((cardB, i) => {
      const textElement = cardB.querySelector("p");
      textElement.dataset.ofid = i + 1;
      // Check if text overflows
      // scrollHeight means total height of the content, clientHeight means visible height
      if (textElement?.scrollHeight - 10 > textElement?.clientHeight) {
        const btn = document.createElement("button");
        btn.dataset.ofid = i + 1;
        btn.classList.add("btn--show-more-info", "btn");
        btn.textContent = "Show more...";
        cardB.appendChild(btn);
      }
    });
  }

  // RENDER MORE INFO ON CLICK
  showMoreInfo(clickedBtn) {
    const cardBody = clickedBtn.closest(".card__body");
    const textElement = cardBody.children[0];
    if (clickedBtn.dataset.ofid === textElement.dataset.ofid) {
      textElement.style.overflow = "visible";
      clickedBtn.style.display = "none";
      textElement.style.marginBottom = "2rem";
    }
  }

  // // INIT NUMBER OF SHOWN PROJECTS
  // projShownAmount(targetSelect) {

  // }
}
