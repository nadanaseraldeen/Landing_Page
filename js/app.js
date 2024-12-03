const navbarList = document.getElementById("navbar__list");
const sections = document.querySelectorAll("section");
const scrollToTopButton = document.getElementById("scrollToTop");

let timer;
const navbar5 = document.querySelector(".navbar");

// Hide navbar after 1.5 seconds of inactivity
window.addEventListener("scroll", () => {
  navbar.style.top = "0";
  clearTimeout(timer);
  timer = setTimeout(() => {
    navbar5.style.top = "-60px";
  }, 1500);
});

// Toggle navbar on click
const navbar = document.getElementById("navbar");
navbar.addEventListener("click", () => {
  navbar.classList.toggle("active");
});

// Build the navbar dynamically
function buildNavbar() {
  sections.forEach((section) => {
    const navItem = document.createElement("li");
    const anchor = document.createElement("a");
    anchor.textContent = section.dataset.nav;
    anchor.href = `#${section.id}`;
    anchor.classList.add("menu__link");
    navItem.appendChild(anchor);
    navbarList.appendChild(navItem);
  });
}

// Highlight active section and navbar link
function makeActive() {
  sections.forEach((section) => {
    const box = section.getBoundingClientRect();
    const sectionLink = document.querySelector(`a[href="#${section.id}"]`);
    if (box.top <= 150 && box.bottom >= 150) {
      section.classList.add("active");
      sectionLink.classList.add("active");
    } else {
      section.classList.remove("active");
      sectionLink.classList.remove("active");
    }
  });
}

// Scroll to the corresponding section when clicking on navbar link
function scrollToSection(event) {
  if (event.target.nodeName === "A") {
    event.preventDefault();
    const targetId = event.target.getAttribute("href").slice(1);
    const targetSection = document.getElementById(targetId);
    targetSection.scrollIntoView({ behavior: "smooth" });
  }
}

// Handle scroll to top button visibility
function handleScrollToTopButton() {
  if (window.scrollY > 300) {
    scrollToTopButton.style.display = "block";
  } else {
    scrollToTopButton.style.display = "none";
  }
}

// Scroll to top when the button is clicked
scrollToTopButton.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// Event listener for scrolling and button visibility
document.addEventListener("scroll", () => {
  makeActive();
  handleScrollToTopButton();
});

// Event listener for navbar links to smooth scroll to sections
navbarList.addEventListener("click", scrollToSection);

// Create navbar toggle for mobile view
const navbarToggle = document.createElement("div");
navbarToggle.classList.add("navbar__toggle");
navbarToggle.textContent = "☰";
navbar.insertBefore(navbarToggle, navbar.firstChild);

navbarToggle.addEventListener("click", () => {
  navbar.classList.toggle("active");
});
buildNavbar();
