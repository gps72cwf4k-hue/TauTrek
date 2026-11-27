// Shared features loaded on every page: burger menu (R1), dark/light theme (R2)
// and the favourites counter in the header.

// ---------- R1 · Burger menu ----------
// The burger button opens and closes the menu on the phone;
// clicking a link inside the opened menu closes it.
const burger = document.querySelector(".burger");
const siteNav = document.querySelector(".nav");

function setMenuOpen(isOpen) {
  siteNav.classList.toggle("open", isOpen);
  burger.classList.toggle("open", isOpen);
  burger.setAttribute("aria-expanded", String(isOpen));
  burger.setAttribute("aria-label", isOpen ? "Закрыть меню" : "Открыть меню");
}

burger.addEventListener("click", () => {
  const isOpen = siteNav.classList.contains("open");
  setMenuOpen(!isOpen);
});

siteNav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => setMenuOpen(false));
});

// ---------- R2 · Dark / light theme, remembered ----------
// The button toggles the "dark" class on <body>; the choice is saved
// in localStorage as the string "dark" or "light" and applied on every page.
const themeToggle = document.querySelector(".theme-toggle");
const THEME_KEY = "tautrek-theme";

function applyTheme(theme) {
  const isDark = theme === "dark";
  document.body.classList.toggle("dark", isDark);
  themeToggle.textContent = isDark ? "☀" : "☾";
  themeToggle.setAttribute("aria-label", isDark ? "Включить светлую тему" : "Включить тёмную тему");
}

themeToggle.addEventListener("click", () => {
  const newTheme = document.body.classList.contains("dark") ? "light" : "dark";
  localStorage.setItem(THEME_KEY, newTheme);
  applyTheme(newTheme);
});

applyTheme(localStorage.getItem(THEME_KEY));

// ---------- Extra · Favourites counter ----------
// Favourite tour ids are saved in localStorage as a JSON array, e.g. "[1,5]".
// The counter in the header shows how many there are, on every page.
const FAVOURITES_KEY = "tautrek-favourites";
const favCounterNumber = document.querySelector(".fav-counter__num");

function getFavourites() {
  return JSON.parse(localStorage.getItem(FAVOURITES_KEY)) || [];
}

function updateFavouritesCounter() {
  favCounterNumber.textContent = getFavourites().length;
}

updateFavouritesCounter();
