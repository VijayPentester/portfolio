// ---- Edit these to customise the site ----
const CONFIG = {
  githubUsername: "VijayPentester",
  resumeFile: "Vijay_Resume.pdf",
  email: "vijayvenkatesh6202@gmail.com"
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

// ---- Hero terminal boot sequence (single orchestrated animation) ----
const termBody = document.getElementById("term-body");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const termLines = [
  { text: "reconpipe run --target example.com", prompt: true },
  { text: "[+] subfinder ......... 46 subdomains found", ok: true },
  { text: "[+] httpx ............. 31 hosts live", ok: true },
  { text: "[+] waybackurls ....... 812 endpoints" , ok: true},
  { text: "[+] paramspider ....... 214 parameters", ok: true },
  { text: "[+] nuclei ............ scan complete", ok: true },
  { text: "[i] report written to output/report.json" }
];

function renderStatic() {
  termBody.innerHTML = termLines.map(l =>
    `<div><span class="${l.prompt ? "term-prompt" : l.ok ? "term-ok" : ""}">${l.prompt ? "$ " : ""}${escapeHtml(l.text)}</span></div>`
  ).join("") + '<span class="term-cursor"></span>';
}

function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

async function typeSequence() {
  for (const line of termLines) {
    const row = document.createElement("div");
    const span = document.createElement("span");
    span.className = line.prompt ? "term-prompt" : (line.ok ? "term-ok" : "");
    row.appendChild(span);
    termBody.appendChild(row);

    const prefix = line.prompt ? "$ " : "";
    const full = prefix + line.text;
    for (let i = 0; i < full.length; i++) {
      span.textContent = full.slice(0, i + 1);
      await sleep(line.prompt ? 28 : 6);
    }
    await sleep(line.prompt ? 220 : 90);
  }
  const cursor = document.createElement("span");
  cursor.className = "term-cursor";
  termBody.appendChild(cursor);
}

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

if (termBody) {
  if (prefersReducedMotion) {
    renderStatic();
  } else {
    typeSequence();
  }
}

// ---- GitHub live stats ----
async function loadGithubStats() {
  const reposEl = document.getElementById("gh-repos");
  const followersEl = document.getElementById("gh-followers");
  const bioEl = document.getElementById("gh-bio");
  if (!reposEl) return;

  try {
    const res = await fetch(`https://api.github.com/users/${CONFIG.githubUsername}`);
    if (!res.ok) throw new Error("GitHub API request failed");
    const data = await res.json();
    reposEl.textContent = data.public_repos ?? "—";
    followersEl.textContent = data.followers ?? "—";
    if (data.bio) bioEl.textContent = data.bio;
  } catch (err) {
    reposEl.textContent = "—";
    followersEl.textContent = "—";
    // Fails silently on rate limits or offline preview; the profile link still works.
  }
}
loadGithubStats();

// ---- Active nav link on scroll ----
const sections = document.querySelectorAll("main .section, .hero");
const navLinks = document.querySelectorAll(".nav-links a[href^='#']");

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      navLinks.forEach(link => {
        link.style.color = link.getAttribute("href") === `#${id}` ? "var(--text)" : "";
      });
    }
  });
}, { rootMargin: "-50% 0px -50% 0px" });

sections.forEach(section => observer.observe(section));
