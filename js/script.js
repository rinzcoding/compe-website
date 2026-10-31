// ---------- HELPER: build one card ----------
function cardHTML(item) {
  const icon = item.icon ? item.icon + " " : "";
  const tag = item.tag ? `<span class="tag">${item.tag}</span>` : "";
  return `
    <div class="card">
      ${tag}
      <h3>${icon}${item.name}</h3>
      <p>${item.description}</p>
    </div>
  `;
}

// ---------- SUBJECTS BY YEAR ----------
const yearTabs = document.getElementById("year-tabs");
const subjectList = document.getElementById("subject-list");

function showYear(year) {
  document.querySelectorAll(".tabs button").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.year == year);
  });

  const filtered = subjects.filter(s => s.year === year);
  subjectList.innerHTML = filtered.map(s => cardHTML(s)).join("");
}

[1, 2, 3, 4].forEach(year => {
  const btn = document.createElement("button");
  btn.textContent = "Year " + year;
  btn.dataset.year = year;
  btn.addEventListener("click", () => showYear(year));
  yearTabs.appendChild(btn);
});

showYear(1);

// ---------- ROADMAP ----------
const roadmapList = document.getElementById("roadmap-list");
roadmapList.innerHTML = roadmap.map(r => `
  <div class="timeline-item">
    <span class="stage">${r.stage}</span>
    <h3>${r.name}</h3>
    <p>${r.description}</p>
  </div>
`).join("");

// ---------- CAREERS ----------
const careerList = document.getElementById("career-list");
careerList.innerHTML = careers.map(c => cardHTML(c)).join("");

// ---------- TOOLS ----------
const toolList = document.getElementById("tool-list");
toolList.innerHTML = tools.map(t => cardHTML({
  icon: t.icon,
  name: t.name,
  description: t.description,
  tag: t.category
})).join("");

// ---------- CERTIFICATIONS ----------
const certList = document.getElementById("cert-list");
certList.innerHTML = certifications.map(c => cardHTML({
  icon: c.icon,
  name: c.name,
  description: c.description,
  tag: c.level + " · " + c.issuer
})).join("");

// ---------- STUDY TIPS ----------
const tipList = document.getElementById("tip-list");
tipList.innerHTML = studyTips.map(t => cardHTML(t)).join("");

// ---------- ABOUT ME ----------
const profileBox = document.getElementById("profile-box");
profileBox.innerHTML = `
  <div class="card">
    <h3>👋 ${myProfile.name}</h3>
    <p><strong>${myProfile.course}</strong> · ${myProfile.school} · ${myProfile.year}</p>
    <p>${myProfile.bio}</p>
  </div>
`;

// ---------- MY ORGANIZATIONS ----------
const orgList = document.getElementById("org-list");
orgList.innerHTML = myOrganizations.map(o => cardHTML({
  icon: o.icon,
  name: o.name,
  description: o.description,
  tag: o.role
})).join("");

// ---------- MY PROJECTS ----------
const projectList = document.getElementById("project-list");
projectList.innerHTML = myProjects.map(p => cardHTML({
  icon: p.icon,
  name: p.name,
  description: p.description,
  tag: p.tech
})).join("");

// ---------- SEARCH ENGINE ----------
const searchBox = document.getElementById("search-box");
const searchResults = document.getElementById("search-results");

// Put everything searchable into one list
const searchIndex = [
  ...subjects.map(s => ({ tag: "Subject (Year " + s.year + ")", name: s.name, description: s.description, keywords: "" })),
  ...careers.map(c => ({ tag: "Career", icon: c.icon, name: c.name, description: c.description, keywords: "" })),
  ...tools.map(t => ({ tag: "Tool", icon: t.icon, name: t.name, description: t.description, keywords: t.category })),
  ...certifications.map(c => ({ tag: "Certification", icon: c.icon, name: c.name, description: c.description, keywords: c.issuer + " " + c.level })),
  ...studyTips.map(t => ({ tag: "Study tip", icon: t.icon, name: t.name, description: t.description, keywords: "" })),
  ...roadmap.map(r => ({ tag: "Roadmap", name: r.stage + ": " + r.name, description: r.description, keywords: "" })),
  ...myOrganizations.map(o => ({ tag: "My organization", icon: o.icon, name: o.name, description: o.description, keywords: o.role })),
  ...myProjects.map(p => ({ tag: "My project", icon: p.icon, name: p.name, description: p.description, keywords: p.tech }))
];

searchBox.addEventListener("input", () => {
  const query = searchBox.value.toLowerCase().trim();

  if (query === "") {
    searchResults.innerHTML = "";
    return;
  }

  const results = searchIndex.filter(item =>
    (item.name + " " + item.description + " " + item.keywords).toLowerCase().includes(query)
  );

  if (results.length === 0) {
    searchResults.innerHTML = "<p>No results found.</p>";
    return;
  }

  // ---------- SEARCH FILTERS AND RESULTS ----------
const filterBar = document.getElementById("search-filters");
const resultCount = document.getElementById("result-count");
let activeFilter = "All";

// Group the tags in searchIndex into friendly categories
function getCategory(tag) {
  if (tag.startsWith("Subject")) return "Subjects";
  if (tag === "Career") return "Careers";
  if (tag === "Tool") return "Tools";
  if (tag === "Certification") return "Certifications";
  if (tag === "Study tip") return "Tips";
  if (tag === "Roadmap") return "Roadmap";
  if (tag.startsWith("My ")) return "About me";
  return "Other";
}

// Wrap matching words in <mark> so they appear highlighted
function highlight(text, query) {
  if (!query) return text;
  const safe = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return text.replace(new RegExp("(" + safe + ")", "gi"), "<mark>$1</mark>");
}

function runSearch() {
  const query = searchBox.value.toLowerCase().trim();

  // Nothing typed and no category chosen: show nothing
  if (query === "" && activeFilter === "All") {
    searchResults.innerHTML = "";
    resultCount.textContent = "";
    return;
  }

  const results = searchIndex.filter(item => {
    const matchesCategory = activeFilter === "All" || getCategory(item.tag) === activeFilter;
    const text = (item.name + " " + item.description + " " + (item.keywords || "")).toLowerCase();
    const matchesText = query === "" || text.includes(query);
    return matchesCategory && matchesText;
  });

  resultCount.textContent =
    results.length + (results.length === 1 ? " result" : " results") +
    (activeFilter === "All" ? "" : " in " + activeFilter);

  if (results.length === 0) {
    searchResults.innerHTML = "<p>No results found.</p>";
    return;
  }

  searchResults.innerHTML = results.map(r => cardHTML({
    ...r,
    name: highlight(r.name, query),
    description: highlight(r.description, query)
  })).join("");
}

// Build one button per category found in searchIndex
const categories = ["All", ...new Set(searchIndex.map(item => getCategory(item.tag)))];

filterBar.innerHTML = "";
categories.forEach(cat => {
  const btn = document.createElement("button");
  btn.textContent = cat;
  if (cat === "All") btn.classList.add("active");

  btn.addEventListener("click", () => {
    activeFilter = cat;
    filterBar.querySelectorAll("button").forEach(b => b.classList.toggle("active", b === btn));
    runSearch();
  });

  filterBar.appendChild(btn);
});

searchBox.addEventListener("input", runSearch);
});

// ---------- DARK MODE ----------
const themeToggle = document.getElementById("theme-toggle");

function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  themeToggle.textContent = theme === "dark" ? "☀️" : "🌙";
}

const savedTheme = localStorage.getItem("theme");
const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
applyTheme(savedTheme || (systemDark ? "dark" : "light"));

themeToggle.addEventListener("click", () => {
  const current = document.documentElement.getAttribute("data-theme");
  const next = current === "dark" ? "light" : "dark";
  applyTheme(next);
  localStorage.setItem("theme", next);
});

// ---------- NUMBER BASE CONVERTER ----------
const converterFields = [
  { el: document.getElementById("conv-decimal"), base: 10, pattern: /^[0-9]+$/ },
  { el: document.getElementById("conv-binary"),  base: 2,  pattern: /^[01]+$/ },
  { el: document.getElementById("conv-hex"),     base: 16, pattern: /^[0-9a-f]+$/i },
  { el: document.getElementById("conv-octal"),   base: 8,  pattern: /^[0-7]+$/ }
];
const converterMsg = document.getElementById("converter-msg");
const converterClear = document.getElementById("converter-clear");

// Turn text in any base into a BigInt (handles very large numbers)
function parseInBase(text, base) {
  let result = 0n;
  const b = BigInt(base);
  for (const ch of text.toLowerCase()) {
    result = result * b + BigInt(parseInt(ch, 36));
  }
  return result;
}

function clearConverterMessage() {
  converterMsg.textContent = "";
  converterMsg.classList.remove("error");
  converterFields.forEach(f => f.el.classList.remove("invalid"));
}

converterFields.forEach(field => {
  field.el.addEventListener("input", () => {
    clearConverterMessage();
    const text = field.el.value.replace(/\s/g, "");

    // Empty box: clear everything
    if (text === "") {
      converterFields.forEach(f => (f.el.value = ""));
      return;
    }

    // Invalid characters for this base
    if (!field.pattern.test(text)) {
      field.el.classList.add("invalid");
      converterMsg.textContent = "Invalid digit for base " + field.base + ". Whole, non-negative numbers only.";
      converterMsg.classList.add("error");
      return;
    }

    // Convert and update the other boxes
    const value = parseInBase(text, field.base);
    converterFields.forEach(f => {
      if (f !== field) {
        f.el.value = f.base === 16 ? value.toString(16).toUpperCase() : value.toString(f.base);
      }
    });

    const bits = value === 0n ? 1 : value.toString(2).length;
    converterMsg.textContent = "Needs " + bits + " bit" + (bits === 1 ? "" : "s") + " to store.";
  });
});

converterClear.addEventListener("click", () => {
  converterFields.forEach(f => (f.el.value = ""));
  clearConverterMessage();
});

// ---------- MOBILE MENU ----------
const menuToggle = document.getElementById("menu-toggle");
const mainNav = document.getElementById("main-nav");

function setMenu(open) {
  mainNav.classList.toggle("open", open);
  menuToggle.textContent = open ? "✕" : "☰";
  menuToggle.setAttribute("aria-expanded", open ? "true" : "false");
  menuToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
}

menuToggle.addEventListener("click", () => {
  setMenu(!mainNav.classList.contains("open"));
});

// Close the menu after tapping a link
mainNav.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => setMenu(false));
});

// Close with the Escape key
document.addEventListener("keydown", e => {
  if (e.key === "Escape") setMenu(false);
});

// ---------- BACK TO TOP BUTTON ----------
const backToTop = document.getElementById("back-to-top");

window.addEventListener("scroll", () => {
  // show the button after scrolling down 400px
  backToTop.classList.toggle("show", window.scrollY > 400);
});

backToTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});