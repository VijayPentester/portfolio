// ---- Edit these to customise the site ----
const CONFIG = {
  githubUsername: "VijayPentester",
  resumeFile: "Vijay_Resume.pdf",
  email: "your.email@example.com"
};

// ---- Mobile nav toggle ----
const navToggle = document.getElementById("nav-toggle");
const siteNav = document.getElementById("site-nav");
navToggle.addEventListener("click", () => {
  const isOpen = siteNav.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});
document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => {
    siteNav.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  });
});

// ---- Message form: builds a mailto link (no backend on a static site) ----
const messageForm = document.getElementById("message-form");
if (messageForm) {
  messageForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("mf-name").value.trim();
    const email = document.getElementById("mf-email").value.trim();
    const message = document.getElementById("mf-message").value.trim();

    const subject = encodeURIComponent(`Portfolio contact from ${name}`);
    const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
    window.location.href = `mailto:${CONFIG.email}?subject=${subject}&body=${body}`;
  });
}

// ---- Active nav link on scroll ----
const sections = document.querySelectorAll("main .section, .hero");
const navLinks = document.querySelectorAll(".nav-links a[href^='#']");

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      navLinks.forEach(link => {
        link.style.color = link.getAttribute("href") === `#${id}` ? "var(--teal)" : "";
      });
    }
  });
}, { rootMargin: "-50% 0px -50% 0px" });

sections.forEach(section => observer.observe(section));