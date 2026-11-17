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



const modal = document.getElementById("course-modal");
const form = document.getElementById("course-form");

if (modal) {
  const openButtons = document.querySelectorAll(".js-open-form");
  const closeButtons = modal.querySelectorAll(".js-close-form");

  function openModal() {
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
    modal.querySelector(".modal-close").focus();
  }

  function closeModal() {
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
  }

  openButtons.forEach(button => {
    button.addEventListener("click", openModal);
  });

  closeButtons.forEach(button => {
    button.addEventListener("click", closeModal);
  });

  document.addEventListener("keydown", event => {
    if (event.key === "Escape" && modal.classList.contains("is-open")) {
      closeModal();
    }
  });
}

// Демонстрационная отправка
if (form) {
  form.addEventListener("submit", event => {
    event.preventDefault();
    alert("Анкета заполнена! Отправку подключим отдельно.");
  });
}

