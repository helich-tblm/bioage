// Мобильная навигация и небольшие интерактивные детали.
const menuToggle = document.querySelector(".menu-toggle");
const mainNav = document.querySelector(".main-nav");

if (menuToggle && mainNav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = mainNav.classList.toggle("is-open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  mainNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mainNav.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}

// В FAQ одновременно открыт только один ответ.
const faqItems = document.querySelectorAll(".faq-item");
faqItems.forEach((item) => {
  item.addEventListener("toggle", () => {
    if (!item.open) return;
    faqItems.forEach((other) => {
      if (other !== item) other.open = false;
    });
  });
});

// Модальное окно записи на курс.
const courseModal = document.querySelector("#course-modal");
const openFormButtons = document.querySelectorAll(".js-open-form");
const closeFormButtons = document.querySelectorAll(".js-close-form");
const courseForm = document.querySelector("#course-form");
const formSuccess = document.querySelector("#form-success");

function openCourseModal() {
  if (!courseModal) return;
  courseModal.classList.add("is-open");
  courseModal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
  const firstField = courseModal.querySelector('input[name="full_name"]');
  if (firstField) firstField.focus();
}

function closeCourseModal() {
  if (!courseModal) return;
  courseModal.classList.remove("is-open");
  courseModal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
}

openFormButtons.forEach((button) => button.addEventListener("click", openCourseModal));
closeFormButtons.forEach((button) => button.addEventListener("click", closeCourseModal));

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && courseModal?.classList.contains("is-open")) {
    closeCourseModal();
  }
});

if (courseForm) {
  courseForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!courseForm.reportValidity()) return;
    if (formSuccess) formSuccess.hidden = false;
  });
}
