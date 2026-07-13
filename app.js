
const cards = window.CULINARY_CARDS || [];
const $ = id => document.getElementById(id);
const key = {
  viewed: "culinary-rebuilt-viewed",
  saved: "culinary-rebuilt-saved",
  learned: "culinary-rebuilt-learned"
};
const get = (k, fallback=[]) => {
  try { return JSON.parse(localStorage.getItem(k)) ?? fallback; }
  catch { return fallback; }
};
const set = (k, value) => localStorage.setItem(k, JSON.stringify(value));

let activeType = "All";
let searchTerm = "";
let current = null;

function esc(value="") {
  return String(value).replace(/[&<>"']/g, char => ({
    "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"
  })[char]);
}
function filtered() {
  return cards.filter(card => {
    const typeOK = activeType === "All" || card.type === activeType;
    const searchOK = !searchTerm || (card.search || `${card.title} ${card.source}`).includes(searchTerm);
    return typeOK && searchOK;
  });
}
function nextCard() {
  const pool = filtered();
  if (!pool.length) return null;
  const viewed = new Set(get(key.viewed));
  let options = pool.filter(card => !viewed.has(card.id) && card.id !== current?.id);
  if (!options.length) options = pool.filter(card => card.id !== current?.id);
  if (!options.length) options = pool;
  return options[Math.floor(Math.random() * options.length)];
}
function markViewed(card) {
  const viewed = get(key.viewed);
  if (!viewed.includes(card.id)) {
    viewed.push(card.id);
    set(key.viewed, viewed);
  }
}
function listSection(title, items, ordered=false, extraClass="") {
  if (!items || !items.length) return "";
  const tag = ordered ? "ol" : "ul";
  return `<section class="section ${extraClass}"><h3>${esc(title)}</h3><${tag}>${
    items.map(item => `<li>${esc(item)}</li>`).join("")
  }</${tag}></section>`;
}
function chipGroup(title, items) {
  if (!items || !items.length) return "";
  return `<div class="pairing-group"><h4>${esc(title)}</h4><div class="chips">${
    items.map(item => `<span class="chip">${esc(item)}</span>`).join("")
  }</div></div>`;
}
function renderRecipe(card) {
  const ingredientHTML = (card.ingredientGroups || []).map(group =>
    `<div class="pairing-group"><h4>${esc(group.label || "Ingredients")}</h4><ul>${
      group.items.map(item => `<li>${esc(item)}</li>`).join("")
    }</ul></div>`
  ).join("");

  return `
    ${card.intro ? `<section class="section"><h3>About this dish</h3><p>${esc(card.intro)}</p></section>` : ""}
    ${card.servings ? `<section class="section callout"><h3>Yield</h3><p>${esc(card.servings)}</p></section>` : ""}
    ${ingredientHTML ? `<section class="section"><h3>Ingredients</h3>${ingredientHTML}</section>` : ""}
    ${listSection("Condensed method", card.method, true)}
    ${listSection("Source notes", card.notes)}
  `;
}
function renderPairing(card) {
  const metadata = card.metadata || {};
  const metaLines = Object.entries(metadata).map(([k,v]) => `${k}: ${v}`);
  return `
    ${metaLines.length ? `<section class="section callout"><h3>Profile</h3><ul>${metaLines.map(x=>`<li>${esc(x)}</li>`).join("")}</ul></section>` : ""}
    ${listSection("Techniques listed", card.techniques)}
    <section class="section">
      <h3>Compatible flavours from the source</h3>
      ${chipGroup("Very highly recommended", card.veryStrong)}
      ${chipGroup("Frequently recommended", card.strong)}
      ${chipGroup("Additional matches", card.regular)}
    </section>
    ${listSection("Exact Flavor Affinities", card.affinities)}
    ${listSection("Example dishes named in the book", card.dishes)}
    ${listSection("How to read this card", card.notes)}
  `;
}
function renderCulture(card) {
  return `
    ${card.intro ? `<section class="section"><h3>Context</h3><p>${esc(card.intro)}</p></section>` : ""}
    ${listSection("Further detail", card.details)}
    ${listSection("Study note", card.notes)}
  `;
}
function renderScience(card) {
  return `
    <section class="section"><h3>The principle</h3><p>${esc(card.intro)}</p></section>
    ${listSection("Kitchen application", card.application)}
    ${listSection("Source note", card.notes)}
  `;
}
function renderCard(card) {
  current = card;
  markViewed(card);

  $("typeBadge").textContent = card.type;
  $("source").textContent = card.source;
  $("title").textContent = card.title;
  $("subtitle").textContent = [card.subtitle, card.language && `Language: ${card.language}`].filter(Boolean).join(" · ");

  if (card.image) {
    $("image").src = card.image;
    $("image").alt = card.title;
    $("imageWrap").hidden = false;
  } else {
    $("imageWrap").hidden = true;
    $("image").removeAttribute("src");
  }

  if (card.type === "Recipe" || card.type === "Classic Recipe") {
    $("body").innerHTML = renderRecipe(card);
  } else if (card.type === "Pairing Profile") {
    $("body").innerHTML = renderPairing(card);
  } else if (card.type === "Food Culture") {
    $("body").innerHTML = renderCulture(card);
  } else {
    $("body").innerHTML = renderScience(card);
  }

  const pool = filtered();
  $("progressLabel").textContent = `${pool.length.toLocaleString()} cards in this view`;

  const saved = get(key.saved);
  const learned = get(key.learned);
  $("save").textContent = saved.includes(card.id) ? "Saved" : "Save";
  $("save").disabled = saved.includes(card.id);
  $("learn").textContent = learned.includes(card.id) ? "Learned" : "Mark learned";
  $("learn").disabled = learned.includes(card.id);

  renderStats();
  window.scrollTo({top: 0, behavior: "smooth"});
}
function renderStats() {
  $("viewedCount").textContent = get(key.viewed).length.toLocaleString();
  $("savedCount").textContent = get(key.saved).length.toLocaleString();
  $("learnedCount").textContent = get(key.learned).length.toLocaleString();
}
function renderSaved() {
  const list = $("savedList");
  const savedIDs = get(key.saved);
  const savedCards = savedIDs.map(id => cards.find(card => card.id === id)).filter(Boolean);
  list.innerHTML = "";
  if (!savedCards.length) {
    list.innerHTML = `<div class="empty">Saved cards will appear here.</div>`;
    return;
  }
  savedCards.forEach(card => {
    const item = document.createElement("article");
    item.className = `saved-item ${card.image ? "" : "no-image"}`;
    item.innerHTML = `${card.image ? `<img src="${esc(card.image)}" alt="">` : ""}<div><h3>${esc(card.title)}</h3><p>${esc(card.type)} · ${esc(card.source)}</p></div>`;
    item.addEventListener("click", () => renderCard(card));
    list.appendChild(item);
  });
}
$("next").addEventListener("click", () => {
  const card = nextCard();
  if (card) renderCard(card);
});
$("save").addEventListener("click", () => {
  const saved = get(key.saved);
  if (!saved.includes(current.id)) saved.push(current.id);
  set(key.saved, saved);
  renderSaved();
  renderCard(current);
});
$("learn").addEventListener("click", () => {
  const learned = get(key.learned);
  if (!learned.includes(current.id)) learned.push(current.id);
  set(key.learned, learned);
  renderCard(current);
});
$("clearSaved").addEventListener("click", () => {
  set(key.saved, []);
  renderSaved();
  if (current) renderCard(current);
});
document.querySelectorAll("#filters button").forEach(button => {
  button.addEventListener("click", () => {
    document.querySelectorAll("#filters button").forEach(x => x.classList.remove("active"));
    button.classList.add("active");
    activeType = button.dataset.type;
    const card = nextCard();
    if (card) renderCard(card);
    else $("body").innerHTML = `<div class="empty">No matching cards.</div>`;
  });
});
$("search").addEventListener("input", event => {
  searchTerm = event.target.value.trim().toLowerCase();
  const card = nextCard();
  if (card) renderCard(card);
  else $("body").innerHTML = `<div class="empty">No results for this search.</div>`;
});

$("libraryCount").textContent = `${cards.length.toLocaleString()} quality-checked cards · real recipes · exact source pairings`;
renderSaved();
renderStats();
renderCard(nextCard() || cards[0]);

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => navigator.serviceWorker.register("sw.js").catch(console.error));
}
