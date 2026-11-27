// Extra · Countdown timer: counts down to the nearest hike
// (every Saturday at 7:00) in days, hours, minutes and seconds; updates every second.

const daysElement = document.querySelector("#cd-days");
const hoursElement = document.querySelector("#cd-hours");
const minutesElement = document.querySelector("#cd-minutes");
const secondsElement = document.querySelector("#cd-seconds");
const countdownDate = document.querySelector("#countdown-date");

const HIKE_DAY = 6; // Saturday (getDay(): 0 = Sunday … 6 = Saturday)
const HIKE_HOUR = 7;

// Returns the Date of the next Saturday 7:00 that is still in the future
function getNextHikeDate() {
  const now = new Date();
  const hike = new Date(now);
  hike.setHours(HIKE_HOUR, 0, 0, 0);

  const daysUntilSaturday = (HIKE_DAY - now.getDay() + 7) % 7;
  hike.setDate(now.getDate() + daysUntilSaturday);

  // Today is Saturday but 7:00 has already passed — take next week
  if (hike <= now) {
    hike.setDate(hike.getDate() + 7);
  }
  return hike;
}

// Adds a leading zero: 5 → "05"
function twoDigits(number) {
  return String(number).padStart(2, "0");
}

let nextHike = getNextHikeDate();

function updateCountdown() {
  let msLeft = nextHike - new Date();
  if (msLeft <= 0) {
    nextHike = getNextHikeDate();
    msLeft = nextHike - new Date();
  }

  const totalSeconds = Math.floor(msLeft / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  daysElement.textContent = days;
  hoursElement.textContent = twoDigits(hours);
  minutesElement.textContent = twoDigits(minutes);
  secondsElement.textContent = twoDigits(seconds);
  countdownDate.textContent = "Выход: " + nextHike.toLocaleDateString("ru-RU", {
    weekday: "long",
    day: "numeric",
    month: "long"
  }) + ", 7:00";
}

updateCountdown();
setInterval(updateCountdown, 1000);
