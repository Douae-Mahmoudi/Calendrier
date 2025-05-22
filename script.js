const calendar = document.getElementById("calendar");
const monthYear = document.getElementById("monthYear");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const eventModal = document.getElementById("eventModal");
const closeModal = document.getElementById("closeModal");
const selectedDateText = document.getElementById("selectedDate");
const eventInput = document.getElementById("eventInput");
const saveEvent = document.getElementById("saveEvent");

let currentDate = new Date();
let events = JSON.parse(localStorage.getItem("events")) || {};

function renderCalendar() {
  calendar.innerHTML = "";
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const startDay = firstDay.getDay();

  monthYear.textContent = `${firstDay.toLocaleString("fr-FR", { month: "long" })} ${year}`;

  for (let i = 0; i < startDay; i++) {
    calendar.innerHTML += `<div></div>`;
  }

  for (let day = 1; day <= lastDay.getDate(); day++) {
    const dateStr = `${year}-${month + 1}-${day}`;
    const cell = document.createElement("div");
    cell.textContent = day;

    if (events[dateStr]) {
      cell.classList.add("event");
    }

    cell.addEventListener("click", () => openModal(dateStr));
    calendar.appendChild(cell);
  }
}

function openModal(dateStr) {
  selectedDateText.textContent = "Date : " + dateStr;
  eventModal.style.display = "flex";
  eventInput.value = events[dateStr] || "";
  eventInput.dataset.date = dateStr;
}

function closeModalFunc() {
  eventModal.style.display = "none";
}

saveEvent.addEventListener("click", () => {
  const date = eventInput.dataset.date;
  const value = eventInput.value.trim();

  if (value) {
    events[date] = value;
  } else {
    delete events[date];
  }

  localStorage.setItem("events", JSON.stringify(events));
  renderCalendar();
  closeModalFunc();
});

closeModal.addEventListener("click", closeModalFunc);
window.addEventListener("click", (e) => {
  if (e.target === eventModal) closeModalFunc();
});

prevBtn.addEventListener("click", () => {
  currentDate.setMonth(currentDate.getMonth() - 1);
  renderCalendar();
});

nextBtn.addEventListener("click", () => {
  currentDate.setMonth(currentDate.getMonth() + 1);
  renderCalendar();
});

renderCalendar();
