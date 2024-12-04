const navbarList = document.getElementById("navbar__list");
const sections = document.querySelectorAll("section");
const scrollToTopButton = document.getElementById("scrollToTop");

let inactivityTimer;
const navbar = document.querySelector(".navbar");

// Hide navbar after 1.5 seconds of inactivity
window.addEventListener("scroll", () => {
  navbar.style.top = "0";
  clearTimeout(inactivityTimer);
  inactivityTimer = setTimeout(() => {
    navbar.style.top = "-60px";
  }, 1500);
});

// Toggle navbar visibility on click (for mobile view)
navbar.addEventListener("click", () => {
  navbar.classList.toggle("active");
});

// Dynamically generate the navbar based on sections
function createNavbar() {
  const navList = document.createElement("ul");
  sections.forEach((section) => {
    const listItem = document.createElement("li");
    const link = document.createElement("a");
    link.textContent = section.getAttribute("data-nav");
    link.setAttribute("href", `#${section.id}`);
    listItem.appendChild(link);
    navList.appendChild(listItem);
  });
  navbar.appendChild(navList);
}

// Highlight the active section and corresponding navbar link
function updateActiveSection() {
  sections.forEach((section) => {
    const sectionRect = section.getBoundingClientRect();
    const sectionLink = document.querySelector(`a[href="#${section.id}"]`);
    if (sectionRect.top <= 150 && sectionRect.bottom >= 150) {
      section.classList.add("active");
      sectionLink.classList.add("active");
    } else {
      section.classList.remove("active");
      sectionLink.classList.remove("active");
    }
  });
}

// Smooth scroll to the section when a navbar link is clicked
function scrollToSection(event) {
  if (event.target.nodeName === "A") {
    event.preventDefault();
    const targetId = event.target.getAttribute("href").slice(1);
    const targetSection = document.getElementById(targetId);
    targetSection.scrollIntoView({ behavior: "smooth" });
  }
}

// Handle the visibility of the scroll-to-top button
function toggleScrollToTopButton() {
  if (window.scrollY > 300) {
    scrollToTopButton.style.display = "block";
  } else {
    scrollToTopButton.style.display = "none";
  }
}

// Scroll to the top when the button is clicked
scrollToTopButton.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// Update active section and scroll-to-top button visibility on scroll
document.addEventListener("scroll", () => {
  updateActiveSection();
  toggleScrollToTopButton();
});

// Listen for navbar link clicks and scroll to the respective section
navbarList.addEventListener("click", scrollToSection);

// Create the navbar toggle button for mobile view
const navbarToggle = document.createElement("div");
navbarToggle.classList.add("navbar__toggle");
navbarToggle.textContent = "☰";
navbar.insertBefore(navbarToggle, navbar.firstChild);

// Toggle the navbar when the hamburger icon is clicked
navbarToggle.addEventListener("click", () => {
  navbar.classList.toggle("active");
});

// Generate the navbar on page load
createNavbar();
