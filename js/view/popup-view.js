export class PopupView {
  _parentElement = document.querySelector('.popup')
  _btnClose = document.querySelector('.close-btn')
  _popupContent = document.querySelector('.popup__content')
  _popupHeading = document.querySelector('.popup__header')
  _popupText = document.querySelector('.popup__text')
  state = {};


  render() {
    this._parentElement.style.display = 'grid';
    this.renderMarkup1();
    this._parentElement.querySelectorAll("[data-i18n]").forEach((el) => {
     const key = el.getAttribute("data-i18n");
     const keyParts = key.split('.');
    el.innerHTML = this.state.dictionary[this.state.lang]?.[keyParts[0]]?.[keyParts[1]] ?? key;
    });
    this._addHandlerClose();
  }

    _addHandlerClose() {
    this._btnClose.addEventListener('click', this.closePopup.bind(this));
    this._parentElement.addEventListener('click', (e) => {
        if (e.target === this._parentElement)
      this.closePopup();
    });
  }

    closePopup() {
    this._parentElement.style.display = 'none';
    this.removeEventListeners([this._btnClose, this._parentElement]);
  }

  renderMarkup1() {
    this._popupHeading.textContent = 'Flame Chat';
    this._popupText.innerHTML = `
    <h4 class="header-4" data-i18n="project-1.intro"></h4>
    <ul class="popup__list">
  <li data-i18n="project-1.li-1"></li>
  <li data-i18n="project-1.li-2"></li>
  <li data-i18n="project-1.li-3"></li>
  <li data-i18n="project-1.li-4"></li>
  <li data-i18n="project-1.li-5"></li>
  <li data-i18n="project-1.li-6"></li>
  <li data-i18n="project-1.li-7"></li>
    </ul>
    <footer class="popup__footer" data-i18n="project-1.tech-stack"></footer>
`
  }

  removeEventListeners(elements) {
    elements.forEach(el => {
        el.removeEventListener('click', this.closePopup.bind(this));
    })
  }
}
