// Features of the contacts page: booking form validation (R4) and FAQ accordion (extra).

// ---------- R4 · Booking form validation ----------
// Checks the fields on submit without reloading the page, shows a message
// next to each wrong field, and a success message when everything is correct.

const form = document.querySelector("#booking-form");
const nameInput = document.querySelector("#name");
const phoneInput = document.querySelector("#phone");
const emailInput = document.querySelector("#email");
const tourSelect = document.querySelector("#tour");
const dateInput = document.querySelector("#date");
const successMessage = document.querySelector("#form-success");

// +7 or 8, then 10 digits; spaces, dashes and brackets are allowed between them
const PHONE_PATTERN = /^(\+7|8)[\s\-()]*(\d[\s\-()]*){10}$/;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Fill the tour list from data.js so it always matches the tours page
function fillTourOptions() {
  tourSelect.replaceChildren();
  tours.forEach((tour) => {
    const option = document.createElement("option");
    option.value = tour.name;
    option.textContent = tour.name;
    tourSelect.append(option);
  });
}

// Today's date as "YYYY-MM-DD" in local time — the same format as <input type="date">
function getTodayString() {
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${now.getFullYear()}-${month}-${day}`;
}

function showError(input, message) {
  input.closest(".field").classList.add("field--invalid");
  document.querySelector(`#${input.id}-error`).textContent = message;
}

function clearError(input) {
  input.closest(".field").classList.remove("field--invalid");
  document.querySelector(`#${input.id}-error`).textContent = "";
}

// Checks every field, shows messages and returns true only if the whole form is correct
function validateForm() {
  let isValid = true;

  const name = nameInput.value.trim();
  if (name === "") {
    showError(nameInput, "Пожалуйста, введите имя.");
    isValid = false;
  } else if (name.length < 2) {
    showError(nameInput, "Имя должно быть не короче 2 букв.");
    isValid = false;
  } else {
    clearError(nameInput);
  }

  const phone = phoneInput.value.trim();
  if (phone === "") {
    showError(phoneInput, "Пожалуйста, введите телефон.");
    isValid = false;
  } else if (!PHONE_PATTERN.test(phone)) {
    showError(phoneInput, "Введите телефон вида +7 701 234 56 78.");
    isValid = false;
  } else {
    clearError(phoneInput);
  }

  // E-mail is optional, but if it is filled in, it must have the right format
  const email = emailInput.value.trim();
  if (email !== "" && !EMAIL_PATTERN.test(email)) {
    showError(emailInput, "Введите e-mail вида name@mail.kz.");
    isValid = false;
  } else {
    clearError(emailInput);
  }

  // Topic check: the hike date cannot be in the past
  const date = dateInput.value;
  if (date === "") {
    showError(dateInput, "Пожалуйста, выберите дату похода.");
    isValid = false;
  } else if (date < getTodayString()) {
    showError(dateInput, "Выберите дату начиная с сегодняшней.");
    isValid = false;
  } else {
    clearError(dateInput);
  }

  return isValid;
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  successMessage.hidden = true;

  if (!validateForm()) {
    form.querySelector(".field--invalid input").focus();
    return;
  }

  const name = nameInput.value.trim();
  const tour = tourSelect.value;
  successMessage.textContent = `Спасибо, ${name}! Заявка на тур «${tour}» принята — гид позвонит в течение дня.`;
  successMessage.hidden = false;
  form.reset();
});

fillTourOptions();
dateInput.min = getTodayString();

// ---------- Extra · FAQ accordion ----------
// Clicking a question opens its answer and closes all the others;
// clicking an open question closes it.
const faqItems = document.querySelectorAll(".faq__item");

function setFaqItemOpen(item, isOpen) {
  item.classList.toggle("open", isOpen);
  item.querySelector(".faq__question").setAttribute("aria-expanded", String(isOpen));
}

faqItems.forEach((item) => {
  const question = item.querySelector(".faq__question");
  question.addEventListener("click", () => {
    const wasOpen = item.classList.contains("open");
    faqItems.forEach((other) => setFaqItemOpen(other, false));
    setFaqItemOpen(item, !wasOpen);
  });
});
