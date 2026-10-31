// ---------- SUBJECTS BY YEAR ----------
const yearTabs = document.getElementById("year-tabs");
const subjectList = document.getElementById("subject-list");

function showYear(year) {
  // highlight active button
  document.querySelectorAll(".tabs button").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.year == year);
  });

  // show subjects for that year
  const filtered = subjects.filter(s => s.year === year);
  subjectList.innerHTML = filtered.map(s => `
    <div class="card">
      <h3>${s.name}</h3>
      <p>${s.description}</p>
    </div>
  `).join("");
}

// create a button for each year
[1, 2, 3, 4].forEach(year => {
  const btn = document.createElement("button");
  btn.textContent = "Year " + year;
  btn.dataset.year = year;
  btn.addEventListener("click", () => showYear(year));
  yearTabs.appendChild(btn);
});

showYear(1); // default view

// ---------- CAREERS ----------
const careerList = document.getElementById("career-list");
careerList.innerHTML = careers.map(c => `
  <div class="card">
    <h3>${c.name}</h3>
    <p>${c.description}</p>
  </div>
`).join("");

// ---------- SEARCH ENGINE ----------
const searchBox = document.getElementById("search-box");
const searchResults = document.getElementById("search-results");

searchBox.addEventListener("input", () => {
  const query = searchBox.value.toLowerCase().trim();

  if (query === "") {
    searchResults.innerHTML = "";
    return;
  }

  const subjectMatches = subjects
    .filter(s => (s.name + " " + s.description).toLowerCase().includes(query))
    .map(s => ({ type: "Subject (Year " + s.year + ")", name: s.name, description: s.description }));

  const careerMatches = careers
    .filter(c => (c.name + " " + c.description).toLowerCase().includes(query))
    .map(c => ({ type: "Career", name: c.name, description: c.description }));

  const results = [...subjectMatches, ...careerMatches];

  if (results.length === 0) {
    searchResults.innerHTML = "<p>No results found.</p>";
    return;
  }

  searchResults.innerHTML = results.map(r => `
    <div class="card" style="margin-bottom:10px;">
      <span class="tag">${r.type}</span>
      <h3>${r.name}</h3>
      <p>${r.description}</p>
    </div>
  `).join("");
});