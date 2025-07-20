// Navigation and Scroll Spy
const navLinks = document.querySelectorAll(".nav-links a");
const sections = document.querySelectorAll("section");
const hamburger = document.getElementById("hamburger");
const navLinksContainer = document.querySelector(".nav-links");
const scrollTopBtn = document.getElementById("scroll-top");

// Mobile menu toggle
hamburger.addEventListener("click", () => {
  navLinksContainer.classList.toggle("active");
});

// Close mobile menu when clicking a link
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navLinksContainer.classList.remove("active");
  });
});

// Scroll spy and scroll to top button visibility
window.addEventListener("scroll", () => {
  const scrollPosition = window.scrollY;

  // Scroll spy for navigation
  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 100;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute("id");

    if (
      scrollPosition >= sectionTop &&
      scrollPosition < sectionTop + sectionHeight
    ) {
      navLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${sectionId}`) {
          link.classList.add("active");
        }
      });
    }
  });

  // Show/hide scroll to top button
  if (scrollPosition > 300) {
    scrollTopBtn.classList.add("active");
  } else {
    scrollTopBtn.classList.remove("active");
  }
});

// Scroll to top functionality
scrollTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// Theme Toggle
const themeToggle = document.getElementById("theme-toggle");
const themeIcon = themeToggle.querySelector("i");

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light-mode");

  if (document.body.classList.contains("light-mode")) {
    themeIcon.classList.remove("fa-moon");
    themeIcon.classList.add("fa-sun");
  } else {
    themeIcon.classList.remove("fa-sun");
    themeIcon.classList.add("fa-moon");
  }
});

// Typing Animation
const typingElement = document.getElementById("typing-text");
const professions = [
  "Back-end Developer",
  "Machine Learning Enthusiast",
  "AI Researcher",
];
let professionIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingDelay = 100;

function typeText() {
  const currentProfession = professions[professionIndex];

  if (isDeleting) {
    typingElement.textContent = currentProfession.substring(0, charIndex - 1);
    charIndex--;
    typingDelay = 50;
  } else {
    typingElement.textContent = currentProfession.substring(0, charIndex + 1);
    charIndex++;
    typingDelay = 100;
  }

  if (!isDeleting && charIndex === currentProfession.length) {
    isDeleting = true;
    typingDelay = 1000; // Pause at end
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    professionIndex = (professionIndex + 1) % professions.length;
    typingDelay = 300; // Pause before typing next
  }

  setTimeout(typeText, typingDelay);
}

// Start typing animation
setTimeout(typeText, 1000);

// Counter Animation with Intersection Observer
const statNumbers = document.querySelectorAll(".stat-number");

const startCounter = (element) => {
  const target = +element.dataset.count;
  const duration = 2000; // 2 seconds
  const increment = target / (duration / 20); // Update every 20ms
  let current = 0;

  const updateCounter = () => {
    current += increment;
    if (current < target) {
      element.textContent = "+" + Math.floor(current);
      setTimeout(updateCounter, 20);
    } else {
      element.textContent = "+" + target;
    }
  };

  updateCounter();
};

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.5,
  rootMargin: "0px 0px -100px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      // For counter animation
      if (entry.target.classList.contains("stat-box")) {
        const statNumber = entry.target.querySelector(".stat-number");
        startCounter(statNumber);
      }

      // For skill cards animation
      if (
        entry.target.classList.contains("skill-card") ||
        entry.target.classList.contains("skill-category")
      ) {
        entry.target.style.opacity = 1;
        entry.target.style.transform = "translateY(0)";
      }

      // For social links animation
      if (entry.target.classList.contains("social-link")) {
        entry.target.style.opacity = 1;
        entry.target.style.transform = "translateY(0)";
      }

      // Unobserve after animation
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll(".stat-box").forEach((box) => {
  observer.observe(box);
});

// Add initial styles for animations
document.querySelectorAll(".skill-card, .skill-category").forEach((element) => {
  element.style.opacity = 0;
  element.style.transform = "translateY(20px)";
  element.style.transition = "opacity 0.5s ease, transform 0.5s ease";
  observer.observe(element);
});

document.querySelectorAll(".social-link").forEach((link, index) => {
  link.style.opacity = 0;
  link.style.transform = "translateY(20px)";
  link.style.transition = `opacity 0.5s ease ${
    index * 0.1
  }s, transform 0.5s ease ${index * 0.1}s`;
  observer.observe(link);
});

(function () {
  function c() {
    var b = a.contentDocument || a.contentWindow.document;
    if (b) {
      var d = b.createElement("script");
      d.innerHTML =
        "window.__CF$cv$params={r:'9615625e32656969',t:'MTc1Mjg3NzQxNC4wMDAwMDA='};var a=document.createElement('script');a.nonce='';a.src='/cdn-cgi/challenge-platform/scripts/jsd/main.js';document.getElementsByTagName('head')[0].appendChild(a);";
      b.getElementsByTagName("head")[0].appendChild(d);
    }
  }
  if (document.body) {
    var a = document.createElement("iframe");
    a.height = 1;
    a.width = 1;
    a.style.position = "absolute";
    a.style.top = 0;
    a.style.left = 0;
    a.style.border = "none";
    a.style.visibility = "hidden";
    document.body.appendChild(a);
    if ("loading" !== document.readyState) c();
    else if (window.addEventListener)
      document.addEventListener("DOMContentLoaded", c);
    else {
      var e = document.onreadystatechange || function () {};
      document.onreadystatechange = function (b) {
        e(b);
        "loading" !== document.readyState &&
          ((document.onreadystatechange = e), c());
      };
    }
  }
})();

document.addEventListener("DOMContentLoaded", function () {
  const loadingScreen = document.getElementById("loadingScreen");

  // Generate a unique timestamp for this browser session
  if (!sessionStorage.getItem("sessionId")) {
    sessionStorage.setItem("sessionId", Date.now().toString());
  }

  const currentSessionId = sessionStorage.getItem("sessionId");
  const lastSessionId = localStorage.getItem("lastSessionId");

  if (currentSessionId === lastSessionId) {
    // Same session (page reload) - hide loader immediately
    loadingScreen.style.display = "none";
  } else {
    // New session or first visit - show loader and save session ID
    localStorage.setItem("lastSessionId", currentSessionId);

    // Hide the loading screen after 10 seconds
    setTimeout(() => {
      loadingScreen.style.visibility = "hidden";
    }, 10000);
  }

  // For testing: Button to simulate closing and reopening the site
  document.getElementById("resetButton").addEventListener("click", function () {
    sessionStorage.removeItem("sessionId");
    alert("Session cleared! Reload the page to simulate reopening the site.");
  });
});

(function () {
  function c() {
    var b = a.contentDocument || a.contentWindow.document;
    if (b) {
      var d = b.createElement("script");
      d.innerHTML =
        "window.__CF$cv$params={r:'961ee73526033468',t:'MTc1Mjk3NzIyNy4wMDAwMDA='};var a=document.createElement('script');a.nonce='';a.src='/cdn-cgi/challenge-platform/scripts/jsd/main.js';document.getElementsByTagName('head')[0].appendChild(a);";
      b.getElementsByTagName("head")[0].appendChild(d);
    }
  }
  if (document.body) {
    var a = document.createElement("iframe");
    a.height = 1;
    a.width = 1;
    a.style.position = "absolute";
    a.style.top = 0;
    a.style.left = 0;
    a.style.border = "none";
    a.style.visibility = "hidden";
    document.body.appendChild(a);
    if ("loading" !== document.readyState) c();
    else if (window.addEventListener)
      document.addEventListener("DOMContentLoaded", c);
    else {
      var e = document.onreadystatechange || function () {};
      document.onreadystatechange = function (b) {
        e(b);
        "loading" !== document.readyState &&
          ((document.onreadystatechange = e), c());
      };
    }
  }
})();
