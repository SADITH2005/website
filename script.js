// Project Data
const projects = [
  {
    title: "To-do List App",
    description: "A simple task manager built using HTML, CSS and JavaScript with local storage for data persistence.",
    image: "https://drive.google.com/file/d/1U9o9luNYtf6GZLc0hEwf0ugR3lU_u1Ke/view?usp=sharing",
    link: "https://sadith2005.github.io/To-do-list-app/"
  },
  {
    title: "Pythagoras Calculator",
    description: "Interactive tool to calculate hypotenuse and sides using the Pythagorean theorem with visual representation.",
    image: "https://drive.google.com/file/d/1CuQrxMd9FsUTpW2QxhzD2eEFeF61zkv0/view?usp=sharing",
    link: "https://sadith2005.github.io/Pythagoras_calculater/"
  },
  {
    title: "Math Game",
    description: "An interactive math quiz game for kids and students featuring multiple difficulty levels and timed challenges.",
    image: "https://drive.google.com/file/d/1mFaXZ4l8FgsO899PfPwmFNnNzKLxLsuT/view?usp=sharing",
    link: "https://sadith2005.github.io/Math-Game/"
  },
  {
    title: "Sadith Salon Website",
    description: "A modern responsive web design for a salon business with online booking functionality and service catalog.",
    image: "https://drive.google.com/file/d/1GKJj5IqXhzmFah2-okwnXfOcJZcoPWgW/view?usp=sharing",
    link: "https://sadith2005.github.io/sadith-saloon-web/"
  },
  {
    title: "Weather Dashboard",
    description: "Real-time weather application that displays current conditions and forecasts using weather API integration.",
    image: "/api/placeholder/400/200",
    link: "#"
  },
  {
    title: "Portfolio Website",
    description: "Professional portfolio website built with HTML, CSS, and JavaScript showcasing projects and skills.",
    image: "/api/placeholder/400/200",
    link: "#"
  }
];

// DOM Elements
const projectSection = document.getElementById("projects-list");
const mobileMenuButton = document.getElementById("mobile-menu-button");
const mobileMenu = document.getElementById("mobile-menu");
const backToTopButton = document.getElementById("back-to-top");
const navLinks = document.querySelectorAll(".nav-link");
const header = document.querySelector("header");
const contactForm = document.getElementById("contact-form");

// Render Projects
function renderProjects() {
  projects.forEach(project => {
    const card = document.createElement("div");
    card.className = "project-card fade-in";

    card.innerHTML = `
      <div class="project-image-container">
        <img class="project-image" src="${project.image}" alt="${project.title}">
      </div>
      <div class="project-content">
        <h3 class="project-title">${project.title}</h3>
        <p class="project-description">${project.description}</p>
        <a href="${project.link}" target="_blank" class="project-link">
          View Project <i class="fas fa-arrow-right ml-1"></i>
        </a>
      </div>
    `;

    projectSection.appendChild(card);
  });
}

// Mobile Menu Toggle
function toggleMobileMenu() {
  mobileMenu.classList.toggle("hidden");
}

// Scroll Functions
function handleScroll() {
  // Back to top button visibility
  if (window.scrollY > 300) {
    backToTopButton.classList.add("show");
  } else {
    backToTopButton.classList.remove("show");
  }

  // Header shadow on scroll
  if (window.scrollY > 50) {
    header.classList.add("shadow-lg");
  } else {
    header.classList.remove("shadow-lg");
  }
}

// Scroll to top function
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}

// Close mobile menu when clicking a link
function closeMobileMenuOnClick() {
  mobileMenu.classList.add("hidden");
}

// Form submission
function handleFormSubmit(e) {
  e.preventDefault();
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const subject = document.getElementById("subject").value;
  const message = document.getElementById("message").value;

  // Here you would normally send the data to a server
  // For now, we'll just log it and show an alert
  console.log({ name, email, subject, message });
  
  // Show success message (you could improve this with a proper modal/toast)
  alert("Sorry,Server Teampary Closed!");
  contactForm.reset();
}

// Intersection Observer for animations
function setupIntersectionObserver() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = 1;
        entry.target.style.transform = "translateY(0)";
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  // Select all sections except the hero section
  const sections = document.querySelectorAll("section:not(#home)");
  sections.forEach(section => {
    section.style.opacity = 0;
    section.style.transform = "translateY(20px)";
    section.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(section);
  });
}

// Event Listeners
document.addEventListener("DOMContentLoaded", () => {
  renderProjects();
  setupIntersectionObserver();
  
  mobileMenuButton.addEventListener("click", toggleMobileMenu);
  backToTopButton.addEventListener("click", scrollToTop);
  window.addEventListener("scroll", handleScroll);
  contactForm.addEventListener("submit", handleFormSubmit);
  
  // Close mobile menu when clicking nav links
  navLinks.forEach(navLink => {
    navLink.addEventListener("click", closeMobileMenuOnClick);
  });
  
  // Close mobile menu when clicking outside
  document.addEventListener("click", (e) => {
    if (!mobileMenu.contains(e.target) && !mobileMenuButton.contains(e.target) && !mobileMenu.classList.contains("hidden")) {
      mobileMenu.classList.add("hidden");
    }
  });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href');
    if (targetId === "#") return;
    
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  });
});
