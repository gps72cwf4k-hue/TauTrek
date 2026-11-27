// Extra · Image slider: previous/next buttons and the arrow keys change the photo;
// after the last photo it starts again from the first one (and back).

const slides = [
  { image: "images/hero.jpg", caption: "Большое Алматинское озеро с перевала", alt: "Бирюзовое Большое Алматинское озеро среди гор, вид с перевала" },
  { image: "images/kok-zhailau.jpg", caption: "Тропа на Кок-Жайляу", alt: "Тропа через луг к Кок-Жайляу, вдали ельник и горы" },
  { image: "images/big-almaty-lake.jpg", caption: "Подъём к БАО", alt: "Каменистая тропа к Большому Алматинскому озеру" },
  { image: "images/furmanov.jpg", caption: "Вершина Фурманова, 3053 м", alt: "Табличка на вершине Фурманова, за ней хребет Заилийского Алатау" },
  { image: "images/about.jpg", caption: "Бутаковское ущелье весной", alt: "Ельник на зелёном склоне Бутаковского ущелья, вдали заснеженные вершины" },
  { image: "images/komsomol.jpg", caption: "Пик Комсомола", alt: "Заснеженный пик Комсомола над зелёными холмами" },
  { image: "images/talgar-pass.jpg", caption: "Перевал Талгар зимой", alt: "Заснеженный перевал Талгар под синим небом" },
  { image: "images/bao-night.jpg", caption: "Млечный путь над БАО", alt: "Млечный путь над хребтом и Большим Алматинским озером" }
];

const sliderImage = document.querySelector("#slider-image");
const sliderCaption = document.querySelector("#slider-caption");
const sliderCounter = document.querySelector("#slider-counter");
const prevButton = document.querySelector(".slider__btn--prev");
const nextButton = document.querySelector(".slider__btn--next");

let currentSlide = 0;

function showSlide(index) {
  // % makes the index loop: after the last slide comes 0, before 0 comes the last one
  currentSlide = (index + slides.length) % slides.length;
  const slide = slides[currentSlide];
  sliderImage.src = slide.image;
  sliderImage.alt = slide.alt;
  sliderCaption.textContent = slide.caption;
  sliderCounter.textContent = `${currentSlide + 1} / ${slides.length}`;
}

prevButton.addEventListener("click", () => showSlide(currentSlide - 1));
nextButton.addEventListener("click", () => showSlide(currentSlide + 1));

document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft") {
    showSlide(currentSlide - 1);
  } else if (event.key === "ArrowRight") {
    showSlide(currentSlide + 1);
  }
});

showSlide(0);
