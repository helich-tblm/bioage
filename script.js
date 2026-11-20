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

const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxcMKrpqo5UVFglnXeVT8mluCjSUy0vOLAODPgKIKyX7d4o-tW86ALFQYbwt7JZxLgaqA/exec";

if (form) {
    const submitButton = form.querySelector(".form-submit");
    const status = document.getElementById("form-success");

    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        if (!form.reportValidity()) return;

        submitButton.disabled = true;
        submitButton.textContent = "Отправляем...";
        status.hidden = true;

        try {
            await fetch(SCRIPT_URL, {
                method: "POST",
                mode: "no-cors",
                body: new FormData(form)
            });

            status.textContent =
                "Запрос отправлен. Подтверждение приёма заявки ожидается.";
            status.hidden = false;

            // Не очищаем форму: сервер не подтвердил запись.
        } catch (error) {
            status.textContent =
                "Не удалось отправить заявку. Попробуйте ещё раз.";
            status.hidden = false;
        } finally {
            submitButton.disabled = false;
            submitButton.innerHTML =
                'Отправить заявку <span>→</span>';
        }
    });
}



// ============================================================
// КОНТАКТЫ САЙТА — РЕДАКТИРУЙТЕ ТОЛЬКО ЭТИ ТРИ СТРОКИ.
// Оставьте пустую строку, если контакт ещё не готов.
// Пример: TELEGRAM_URL = "https://t.me/your_username";
// ============================================================
const CONTACTS = {
  phone: "",
  max: "",
  telegram: "",
};

document.querySelectorAll("[data-contact]").forEach((button) => {
  button.addEventListener("click", () => {
    const kind = button.dataset.contact;
    const value = CONTACTS[kind]?.trim();
    if (!value) {
      alert("Контакт пока не добавлен");
      return;
    }
    if (kind === "phone") {
      window.location.href = "tel:" + value;
    } else if (/^https:\/\//i.test(value)) {
      window.open(value, "_blank", "noopener,noreferrer");
    } else {
      alert("Укажите полную ссылку, начинающуюся с https://");
    }
  });
});
