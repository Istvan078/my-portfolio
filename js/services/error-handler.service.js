class ErrorHandlerService {
  handleError(error, element) {
    const errorDiv = document.createElement("div");
    errorDiv.className = "error-handler";
    errorDiv.textContent = error.message;
    if (element) element.appendChild(errorDiv);
    console.log("An error occurred:", error.message);
  }
}

export default new ErrorHandlerService();
