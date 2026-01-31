export class SkillsContactView {
  _parentElement = document.querySelector(".contact");
  _data;

  render(data) {
    this._data = data;
    this._clear();
  }
  _clear() {
    this._parentElement.innerHTML = "";
  }
  addHandlerContactFormSubmit(handler) {
    const form = document.querySelector(".contact__form");
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const formData = new FormData(form);
      const name = formData.get("name");
      const email = formData.get("email");
      const message = formData.get("message");
      handler({ name, email, message });
      form.reset();
    });
  }
}
