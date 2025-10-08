

// ======= TOGGLE MENU (Fixed single version) =======
const menuToggle = document.getElementById("menuToggle");
const mobileMenu = document.getElementById("mobileMenu");

if (menuToggle && mobileMenu) {
  menuToggle.addEventListener("click", () => {
    mobileMenu.classList.toggle("active");
  });
}

// ======= FOOTER IMPORT =======
fetch("footer/footer.html")
  .then(res => res.text())
  .then(data => {
    document.getElementById("footer").innerHTML = data;
  })
  .catch(err => console.error("Footer load error:", err));

// ======= WHATSAPP FLOAT BEHAVIOR =======
window.addEventListener("scroll", function() {
  const footer = document.querySelector("footer");
  const whatsapp = document.querySelector(".whatsapp-float");

  if (!footer || !whatsapp) return;

  const footerRect = footer.getBoundingClientRect();
  if (footerRect.top < window.innerHeight) {
    whatsapp.style.opacity = "0";
    whatsapp.style.pointerEvents = "none";
  } else {
    whatsapp.style.opacity = "1";
    whatsapp.style.pointerEvents = "auto";
  }
});



//========= search bar===========//

document.addEventListener("DOMContentLoaded", function () {
  const menuToggle = document.getElementById("menuToggle");
  const mobileMenu = document.getElementById("mobileMenu");

  if (menuToggle) {
    menuToggle.addEventListener("click", () => {
      mobileMenu.classList.toggle("open");
    });
  }

  // ✅ Detect search form (desktop or mobile)
  function setupSearch(inputId, formId) {
    const form = document.getElementById(formId);
    const input = document.getElementById(inputId);

    if (!form || !input) return;

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const query = input.value.toLowerCase().trim();

      // ✅ If not on medicine page → redirect
      if (!window.location.href.includes("medicine")) {
        window.location.href = `medicine.html?search=${encodeURIComponent(query)}`;
        return;
      }

      // ✅ If on medicine page → filter directly
      const cards = document.querySelectorAll(".medicine-card");
      const whatsappContact = document.querySelector(".whatsapp-contact");
      let found = false;

      cards.forEach((card) => {
        const nameEl = card.querySelector(".medicine-name");
        if (!nameEl) return;

        const name = nameEl.textContent.toLowerCase().trim();
        if (name.includes(query)) {
          card.style.display = "block";
          found = true;
        } else {
          card.style.display = "none";
        }
      });

      if (whatsappContact) whatsappContact.style.display = query ? "none" : "block";
      if (!found && query !== "") alert("No medicine found 😔");
    });
  }

  setupSearch("searchInput", "searchForm");
  setupSearch("searchInputMobile", "searchFormMobile");

  // ✅ If medicine page opened with ?search= query, auto-search
  const urlParams = new URLSearchParams(window.location.search);
  const autoQuery = urlParams.get("search");
  if (autoQuery && window.location.href.includes("medicine")) {
    const input = document.getElementById("searchInput");
    if (input) {
      input.value = autoQuery;
      const form = document.getElementById("searchForm");
      if (form) form.dispatchEvent(new Event("submit"));
    }
  }
});


//-------- Hero Section slider-------------
let currentSlide = 0;
const slides = document.querySelectorAll(".slide");
const totalSlides = slides.length;

const showSlide = (index) => {
  slides.forEach((slide) => slide.classList.remove("active"));
  slides[index].classList.add("active");
};

// Next / Prev
document.querySelector(".next").addEventListener("click", () => {
  currentSlide = (currentSlide + 1) % totalSlides;
  showSlide(currentSlide);
});

document.querySelector(".prev").addEventListener("click", () => {
  currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
  showSlide(currentSlide);
});

// Auto slide
setInterval(() => {
  currentSlide = (currentSlide + 1) % totalSlides;
  showSlide(currentSlide);
}, 5000);

