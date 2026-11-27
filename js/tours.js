// Features of the tours page: cards from data with filter and search (R3),
// sorting, favourites and a modal window with tour details (extras).

const cardsContainer = document.querySelector("#tour-cards");
const emptyMessage = document.querySelector("#tours-empty");
const searchInput = document.querySelector("#tour-search");
const sortSelect = document.querySelector("#tour-sort");
const filterButtons = document.querySelectorAll(".filter-btn");

// Current state of the controls
let activeCategory = "all";

function formatPrice(price) {
  return price.toLocaleString("ru-RU") + " ₸";
}

// ---------- R3 · Cards from data ----------
// Builds one card element for a tour object with createElement and textContent.
function createCard(tour) {
  const card = document.createElement("article");
  card.className = "card";

  const image = document.createElement("img");
  image.className = "card__image";
  image.src = tour.image;
  image.alt = tour.alt;
  image.width = 1280;
  image.height = 853;
  image.loading = "lazy";

  const favButton = createFavouriteButton(tour.id);

  const body = document.createElement("div");
  body.className = "card__body";

  const badge = document.createElement("span");
  badge.className = "card__badge";
  badge.textContent = tour.badge;

  const title = document.createElement("h2");
  title.className = "h3";
  title.textContent = tour.name;

  const meta = document.createElement("p");
  meta.className = "card__meta";
  meta.textContent = `${categoryNames[tour.category]} · ${tour.distance} км · ${tour.duration}`;

  const text = document.createElement("p");
  text.className = "card__text";
  text.textContent = tour.text;

  const footer = document.createElement("div");
  footer.className = "card__footer";

  const price = document.createElement("span");
  price.className = "card__price";
  price.textContent = formatPrice(tour.price);

  const detailsButton = document.createElement("button");
  detailsButton.className = "button button--small button--outline";
  detailsButton.type = "button";
  detailsButton.textContent = "Подробнее";
  detailsButton.addEventListener("click", () => openModal(tour));

  footer.append(price, detailsButton);
  body.append(badge, title, meta, text, footer);
  card.append(favButton, image, body);
  return card;
}

// Clears the container and draws the given tours; shows a message if the list is empty.
function renderCards(list) {
  cardsContainer.replaceChildren();
  list.forEach((tour) => cardsContainer.append(createCard(tour)));
  emptyMessage.hidden = list.length > 0;
}

// ---------- Extra · Favourites ----------
// A heart button on each card adds the tour to favourites or removes it.
// The list is saved in localStorage; getFavourites() and the header counter are in common.js.
function setFavouriteButtonState(button, isFavourite) {
  button.classList.toggle("active", isFavourite);
  button.textContent = isFavourite ? "♥" : "♡";
  button.setAttribute("aria-pressed", String(isFavourite));
}

function toggleFavourite(tourId) {
  let favourites = getFavourites();
  if (favourites.includes(tourId)) {
    favourites = favourites.filter((id) => id !== tourId);
  } else {
    favourites.push(tourId);
  }
  localStorage.setItem(FAVOURITES_KEY, JSON.stringify(favourites));
  updateFavouritesCounter();
  return favourites.includes(tourId);
}

function createFavouriteButton(tourId) {
  const button = document.createElement("button");
  button.className = "fav-btn";
  button.type = "button";
  button.setAttribute("aria-label", "В избранное");
  setFavouriteButtonState(button, getFavourites().includes(tourId));
  button.addEventListener("click", () => {
    const isFavourite = toggleFavourite(tourId);
    setFavouriteButtonState(button, isFavourite);
  });
  return button;
}

// ---------- Extra · Sort ----------
// Returns a sorted copy of the list (the original array stays unchanged).
function sortTours(list, sortValue) {
  const sorted = [...list];
  if (sortValue === "price-asc") {
    sorted.sort((a, b) => a.price - b.price);
  } else if (sortValue === "price-desc") {
    sorted.sort((a, b) => b.price - a.price);
  } else if (sortValue === "name-asc") {
    sorted.sort((a, b) => a.name.localeCompare(b.name, "ru"));
  } else if (sortValue === "name-desc") {
    sorted.sort((a, b) => b.name.localeCompare(a.name, "ru"));
  }
  return sorted;
}

// ---------- R3 · Filter and search ----------
// Applies the category filter, the search text and the sort order, then redraws.
function updateCards() {
  const query = searchInput.value.trim().toLowerCase();

  const filtered = tours.filter((tour) => {
    const matchesCategory = activeCategory === "all" || tour.category === activeCategory;
    const matchesSearch = tour.name.toLowerCase().includes(query);
    return matchesCategory && matchesSearch;
  });

  renderCards(sortTours(filtered, sortSelect.value));
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    activeCategory = button.dataset.category;
    filterButtons.forEach((btn) => btn.classList.toggle("active", btn === button));
    updateCards();
  });
});

searchInput.addEventListener("input", updateCards);
sortSelect.addEventListener("change", updateCards);

// ---------- Extra · Modal window ----------
// "Подробнее" opens a window with tour details; it closes with ×, a click outside and Esc.
const modal = document.querySelector("#tour-modal");
const modalCloseButton = modal.querySelector(".modal__close");

function openModal(tour) {
  document.querySelector("#modal-image").src = tour.image;
  document.querySelector("#modal-image").alt = tour.alt;
  document.querySelector("#modal-badge").textContent = tour.badge;
  document.querySelector("#modal-title").textContent = tour.name;
  document.querySelector("#modal-text").textContent = tour.details;
  document.querySelector("#modal-level").textContent = categoryNames[tour.category];
  document.querySelector("#modal-distance").textContent = `${tour.distance} км`;
  document.querySelector("#modal-duration").textContent = tour.duration;
  document.querySelector("#modal-price").textContent = formatPrice(tour.price);

  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
  modalCloseButton.focus();
}

function closeModal() {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
}

modalCloseButton.addEventListener("click", closeModal);

// A click on the dark overlay (not inside the window) closes the modal
modal.addEventListener("click", (event) => {
  if (event.target === modal) {
    closeModal();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && modal.classList.contains("open")) {
    closeModal();
  }
});

updateCards();
