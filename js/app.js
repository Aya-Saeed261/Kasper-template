// Animation
AOS.init({
  once: true,
  anchorPlacement: "center-center",
  offset: 120,
  duration: 2000,
  easing: "ease",
});

// jquery mixitup
let mixer = mixitup(".portofolio .content");

// Global Variables
const navBar = document.querySelector(".navbar");
const navLinks = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll("section:not(.subscribe)");
const portofolioFilterBtns = document.querySelectorAll(".filter");
const portofolioWorks = document.querySelectorAll(".work");
const skillsSection = document.querySelector(".skills");
const skillsProgressBars = document.querySelectorAll(".progress-bar");
const statsSection = document.querySelector(".stats");
const statsNumbers = document.querySelectorAll(".stat .number");
const openWorkBtns = document.querySelectorAll(".open-work");
const portofolioImgs = document.querySelectorAll(".work .work-image");
const modalCarousel = document.querySelector(".modal .carousel-inner");
const fragment = document.createDocumentFragment();
let skillBarsDone = false;
let statsDone = false;
let scrolled = false;

// Helper functions
function activeNavLink(link) {
  navLinks.forEach((navLink) => {
    navLink.classList.remove("active");
    navLink.removeAttribute("aria-current");
  });

  link.classList.add("active");
  link.setAttribute("aria-current", "page");
}

function skillsBarsHandler() {
  skillsProgressBars.forEach((bar) => {
    bar.style.width = `${bar.dataset.progress}%`;
    bar.innerHTML = `${bar.dataset.progress}%`;
  });

  skillBarsDone = true;
}

function statsHandler() {
  statsNumbers.forEach((number) => {
    let value = number.dataset.stat;
    let stat = value - 120;
    let countingFunc = setInterval(() => {
      if (stat === value - 1) clearInterval(countingFunc);
      stat += 1;
      number.innerHTML = `${stat}`;
    }, 10);
  });

  statsDone = true;
}

function checkSectionInView() {
  sections.forEach((section) => {
    let { top } = section.getBoundingClientRect();
    if (top <= 50) {
      let relatedNavLink = [...navLinks].find(
        (link) => link.getAttribute("href") === `#${section.id}`
      );
      activeNavLink(relatedNavLink);
    }
  });

  let { top: skillSecTop } = skillsSection.getBoundingClientRect();
  if (skillSecTop <= 160 && !skillBarsDone) skillsBarsHandler();

  let { top: statSecTop } = statsSection.getBoundingClientRect();
  if (statSecTop <= 350 && !statsDone) statsHandler();
}

function navBarHandler() {
  if (window.scrollY > 580 && scrolled) return;

  if (window.scrollY > 580) {
    navBar.classList.add("on-scroll");
    scrolled = true;
  } else {
    navBar.classList.remove("on-scroll");
    scrolled = false;
  }
}

function filterWorks() {
  let category = this.dataset.filter;
  portofolioFilterBtns.forEach((btn) => btn.classList.remove("active"));
  this.classList.add("active");
}

function openWork() {
  portofolioImgs.forEach((img) => img.classList.remove("active"));

  let imgToOpen = this.parentElement.previousElementSibling;
  imgToOpen.classList.add("active");

  modalCarousel.innerHTML =
    [...portofolioImgs]
      .map((img) => {
        return `<div class="carousel-item ${
          img.classList.contains("active") ? "active" : ""
        }">
    <img src="${img.getAttribute("src")}" class="w-100" alt="${
          img.dataset.title
        }">
      <p class="title text-light position-absolute start-50 bottom-0 rounded-pill bg-black px-3 py-1 opacity-75">${
        img.dataset.title
      }</p>
  </div>`;
      })
      .join("") +
    `<button class="carousel-control-prev justify-content-start d-none d-md-flex p-4 opacity-100 top-0"
    type="button" data-bs-target="#portofolioCarousel" data-bs-slide="prev">
    <i class="fa-solid fa-angle-left slide-icon border border-2 rounded-circle bg-dark opacity-0"
      aria-hidden="true"></i>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next justify-content-end d-none d-md-flex p-4 opacity-100 top-0"
    type="button" data-bs-target="#portofolioCarousel" data-bs-slide="next">
    <i class="fa-solid fa-angle-right slide-icon border border-2 rounded-circle bg-dark opacity-0"
      aria-hidden="true"></i>
    <span class="visually-hidden">Next</span>
  </button>`;
}

// Main
navLinks.forEach((navLink) =>
  navLink.addEventListener("click", () => activeNavLink(navLink))
);

document.addEventListener("scroll", checkSectionInView);

document.addEventListener("scroll", navBarHandler);

portofolioFilterBtns.forEach((btn) =>
  btn.addEventListener("click", filterWorks)
);

openWorkBtns.forEach((btn) => btn.addEventListener("click", openWork));
