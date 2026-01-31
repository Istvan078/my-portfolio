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
}
