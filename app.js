const form = document.querySelector("#signUpForm");
const inputs = form.querySelectorAll("input");
const submitBtn = form.querySelector(".sigup-btn");

if (form && inputs && submitBtn) {
  // Validate on typing
  inputs.forEach((input) => {
    input.addEventListener("input", () => {
      validateInput(input);
      updateSubmitState();
    });
  });

  // Validate again on submit
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    let formIsValid = true;

    inputs.forEach((input) => {
      if (!validateInput(input)) formIsValid = false;
    });

    if (formIsValid) {
      form.submit();
    }
  });

  function validateInput(input) {
    const wrapper = input.closest(".input-wrapper");
    const icon = wrapper.querySelector(".status-icon");
    const message = wrapper.querySelector(".message");
    const value = input.value.trim();
    let isValid = true;

    // Reset UI
    input.classList.remove("invalid", "valid");
    icon.style.display = "none";
    message.style.display = "none";
    message.textContent = "";

    // Empty check
    if (value === "") {
      setError("This field is required.");
    }
    // Name validation
    else if (input.name === "lastName" || input.name === "firstName") {
      if (value.length < 2) {
        setError("Name must be at least 2 characters long.");
      } else if (!/^[a-zA-Z\s]+$/.test(value)) {
        setError("Name must only contain letters.");
      } else {
        setSuccess("Looks good!");
      }
    }
    // Email validation
    else if (input.type === "email") {
      const isValueValid = input.validity.valid;

      if (!isValueValid) {
        setError("Please enter a valid email address.");
      } else {
        setSuccess("Looks good!");
      }
    }
    // Password validation
    else if (input.type === "password") {
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

      if (value.length < 8) {
        setError("Password must be at least 8 characters long.");
      } else if (!passwordRegex.test(value)) {
        setError("Include upper, lower, number & symbol.");
      } else {
        setSuccess("Strong password!");
      }
    } else {
      setSuccess("Looks good!");
    }

    // Error and success handlers
    function setError(msg) {
      isValid = false;
      input.classList.add("invalid");
      icon.style.display = "block";
      icon.innerHTML = `
    <img
      src="./images/icon-error.svg"
      alt="icon-error"
      width="24"
      height="24"
    />

    <figcaption class="offscreen">icon-error</figcaption>`;
      message.style.display = "block";
      message.textContent = msg;
      message.classList.add("error-message");
      message.classList.remove("success-message");
    }

    function setSuccess(msg) {
      input.classList.add("valid");
      icon.style.display = "block";
      icon.innerHTML = `
    <img
      src="./images/icon-success.svg"
      alt="icon-success"
      width="24"
      height="24"
    />

    <figcaption class="offscreen">icon-success</figcaption>`;
      message.style.display = "block";
      message.textContent = msg;
      message.classList.add("success-message");
      message.classList.remove("error-message");
    }

    return isValid;
  }

  function updateSubmitState() {
    const allValid = Array.from(inputs).every((input) => validateInput(input));
    submitBtn.disabled = !allValid;
  }
}
