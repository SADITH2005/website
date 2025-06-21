// Project Data
const projects = [
  {
    title: "To-do List App",
    description: "A simple task manager built using HTML, CSS and JavaScript with local storage for data persistence.",
    image: "https://cdn.glitch.global/663e7d2b-1f1c-46f3-8f05-a4b02b32a4e8/Todo.png?v=1746378792954",
    link: "https://sadith2005.github.io/To-do-list-app/"
  },
  {
    title: "Pythagoras Calculator",
    description: "Interactive tool to calculate hypotenuse and sides using the Pythagorean theorem with visual representation.",
    image: "https://cdn.glitch.global/663e7d2b-1f1c-46f3-8f05-a4b02b32a4e8/pytho.png?v=1746378797342",
    link: "https://sadith2005.github.io/Pythagoras_calculater/"
  },
  {
    title: "Math Game",
    description: "An interactive math quiz game for kids and students featuring multiple difficulty levels and timed challenges.",
    image: "https://cdn.glitch.global/663e7d2b-1f1c-46f3-8f05-a4b02b32a4e8/mathgame.jpg?v=1746378802315",
    link: "https://sadith2005.github.io/Math-Game/"
  },
  {
    title: "Sadith Salon Website",
    description: "A modern responsive web design for a salon business with online booking functionality and service catalog.",
    image: "https://cdn.glitch.global/663e7d2b-1f1c-46f3-8f05-a4b02b32a4e8/saloon.png?v=1746378794817",
    link: "https://sadith2005.github.io/sadith-saloon-web/"
  },
  {
    title: "Exam Center for DP education",
    description: "Real Exam LMS for Students. This LMS make used Firebase + web development .",
    image: "https://cdn.glitch.global/663e7d2b-1f1c-46f3-8f05-a4b02b32a4e8/dp.jpg?v=1750489078804", // Consider updating this placeholder
    link: "dhttps://dp-education-exams.web.app/"
  },
  {
    title: "Portfolio Website",
    description: "Professional portfolio website built with HTML, CSS, and JavaScript showcasing projects and skills.",
    image: "https://cdn.glitch.global/663e7d2b-1f1c-46f3-8f05-a4b02b32a4e8/poet.png?v=1746379216867",
    link: "https://sadith2005.github.io/website/"
  }
];

// DOM Elements
const projectSection = document.getElementById("projects-list");
const mobileMenuButton = document.getElementById("mobile-menu-button");
const mobileMenu = document.getElementById("mobile-menu");
const backToTopButton = document.getElementById("back-to-top");
const navLinks = document.querySelectorAll(".nav-link");
const header = document.querySelector("header");
const contactForm = document.getElementById("contact-form"); // Get the form element

// Render Projects
function renderProjects() {
  // Check if projectSection exists before trying to append children
  if (!projectSection) {
      console.error("Projects list element not found!");
      return;
  }
  projectSection.innerHTML = ''; // Clear existing projects first
  projects.forEach(project => {
    const card = document.createElement("div");
    card.className = "project-card"; // Remove fade-in initially if using Intersection Observer

    card.innerHTML = `
      <div class="project-image-container">
        <img class="project-image" src="${project.image}" alt="${project.title}" loading="lazy">
      </div>
      <div class="project-content">
        <h3 class="project-title">${project.title}</h3>
        <p class="project-description">${project.description}</p>
        <a href="${project.link}" target="_blank" rel="noopener noreferrer" class="project-link">
          View Project <i class="fas fa-arrow-right ml-1"></i>
        </a>
      </div>
    `;

    projectSection.appendChild(card);
  });
}

// Mobile Menu Toggle
function toggleMobileMenu() {
  if (mobileMenu) {
    mobileMenu.classList.toggle("hidden");
  }
}

// Scroll Functions
function handleScroll() {
  // Back to top button visibility
  if (backToTopButton) {
    if (window.scrollY > 300) {
      backToTopButton.classList.add("show");
    } else {
      backToTopButton.classList.remove("show");
    }
  }

  // Header shadow on scroll
  if (header) {
    if (window.scrollY > 50) {
      header.classList.add("shadow-lg");
    } else {
      header.classList.remove("shadow-lg");
    }
  }
}

// Scroll to top function
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}

// Close mobile menu when clicking a link or outside
function closeMobileMenuOnClick() {
  if (mobileMenu && !mobileMenu.classList.contains("hidden")) {
     mobileMenu.classList.add("hidden");
  }
}

// Form submission using Fetch API
function handleFormSubmit(e) {
  e.preventDefault(); // Prevent default form submission
  const form = e.target; // Get the form that triggered the event
  const data = new FormData(form);

  // Optional: Show a loading state here

  fetch(form.action, {
    method: form.method,
    body: data,
    headers: {
      'Accept': 'application/json' // Important for services like Formspree
    }
  }).then(response => {
    if (response.ok) {
      alert("Message sent successfully!"); // Consider using a less intrusive notification
      form.reset(); // Clear the form
      // Optional: Hide loading state, show success message more permanently
    } else {
      // Try to get error message from response if possible
      response.json().then(data => {
        if (Object.hasOwn(data, 'errors')) {
           alert("Oops! There was a problem: " + data["errors"].map(error => error["message"]).join(", "));
        } else {
           alert("Oops! There was a problem submitting the form.");
        }
      }).catch(error => {
          alert("Oops! There was a problem submitting the form.");
      });
    }
  }).catch(error => {
    // Network error or other issue
    console.error("Form submission error:", error);
    alert("Oops! There was a problem sending your message.");
    // Optional: Hide loading state
  });
}


// Intersection Observer for animations
function setupIntersectionObserver() {
    const observerOptions = {
        threshold: 0.1 // Trigger when 10% of the element is visible
    };

    const observer = new IntersectionObserver((entries, observerInstance) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in'); // Add animation class
                observerInstance.unobserve(entry.target); // Stop observing once animated
            }
        });
    }, observerOptions);

    // Observe sections and project cards
    const elementsToObserve = document.querySelectorAll('section:not(#home), .project-card');
    elementsToObserve.forEach(el => {
        // Prepare element for animation (optional, can be done in CSS)
        // el.style.opacity = 0;
        // el.style.transform = "translateY(20px)";
        // el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
        observer.observe(el);
    });
}

// Event Listeners
document.addEventListener("DOMContentLoaded", () => {
  // Make sure DOM elements exist before adding listeners or calling functions
  if (mobileMenuButton) {
    mobileMenuButton.addEventListener("click", toggleMobileMenu);
  }
  if (backToTopButton) {
    backToTopButton.addEventListener("click", scrollToTop);
  }
  window.addEventListener("scroll", handleScroll);

  // Attach form submit listener ONLY if the form exists
  if (contactForm) {
    contactForm.addEventListener("submit", handleFormSubmit);
  } else {
    console.warn("Contact form not found on this page.");
  }

  // Render projects only if the container exists
  renderProjects();

  // Setup animations
  setupIntersectionObserver();

  // Add listeners to nav links
  navLinks.forEach(navLink => {
    navLink.addEventListener("click", closeMobileMenuOnClick);
  });

  // Close mobile menu when clicking outside
  document.addEventListener("click", (e) => {
    if (mobileMenu && !mobileMenu.classList.contains("hidden")) { // Check if menu exists and is open
        if (!mobileMenu.contains(e.target) && !mobileMenuButton.contains(e.target)) {
           closeMobileMenuOnClick(); // Use the function to close it
        }
    }
  });

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();

      const targetId = this.getAttribute('href');
      // Check if it's just "#" or an actual ID
      if (targetId.length <= 1) return;

      try {
          const targetElement = document.querySelector(targetId);
          if (targetElement) {
              const headerOffset = header ? header.offsetHeight : 80; // Use header height or default
              const elementPosition = targetElement.getBoundingClientRect().top;
              const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

              window.scrollTo({
                  top: offsetPosition,
                  behavior: 'smooth'
              });
              // Close mobile menu if open after clicking a link
              closeMobileMenuOnClick();
          } else {
              console.warn(`Smooth scroll target not found: ${targetId}`);
          }
      } catch (error) {
          console.error(`Error finding smooth scroll target ${targetId}:`, error);
      }
    });
  });

  // Initial call to handleScroll to set header shadow correctly on load if already scrolled
  handleScroll();
});
