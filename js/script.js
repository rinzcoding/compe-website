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

  searchResults.innerHTML = results.map(r => cardHTML(r)).join("");
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