const lessons = [
  {
    id: "resting-meat",
    category: "Technique",
    source: "On Food and Cooking",
    title: "Resting meat with intention",
    summary: "Resting is not a ritual. It is a controlled finishing stage that changes temperature and moisture distribution.",
    idea: "After meat leaves the heat, its outer layers remain hotter than the centre. During the rest, heat continues moving inward while pressure inside the muscle fibres falls.",
    steps: [
      "Rest a small steak for roughly 4–6 minutes.",
      "Rest a lamb rack for roughly 8–12 minutes.",
      "Keep large roasts warm without wrapping them so tightly that the crust softens."
    ],
    detail: "Judge resting time by thickness, bone structure, cooking temperature and the final serving temperature—not by weight alone.",
    challenge: "Cook two similar pieces of meat. Slice one immediately and rest the other. Compare the plate juices, centre temperature and texture."
  },
  {
    id: "mantecatura",
    category: "Technique",
    source: "Italian culinary tradition",
    title: "Mantecatura",
    summary: "The final mixing stage that turns separate fat, starch and cooking liquid into a glossy, cohesive sauce.",
    idea: "Starch from pasta or rice helps water and fat remain dispersed. Vigorous movement creates a fine emulsion that clings rather than pools.",
    steps: [
      "Finish the pasta or risotto slightly looser than the final texture.",
      "Remove from aggressive heat before adding finishing fat or cheese.",
      "Toss or stir firmly, adding cooking water in small amounts."
    ],
    detail: "The goal is not simply to add butter or cheese. The goal is to build a stable texture through temperature control, starch and movement.",
    challenge: "Finish one portion of pasta by stirring gently and one by tossing firmly. Compare gloss, coating and sauce left in the pan."
  },
  {
    id: "egg-coagulation",
    category: "Food Science",
    source: "On Food and Cooking",
    title: "Control egg coagulation",
    summary: "Eggs do not suddenly become cooked; their proteins unfold and connect across a range of temperatures.",
    idea: "Gentler heat creates a finer protein network and a softer texture. High heat tightens the network quickly and squeezes out more water.",
    steps: [
      "Use low to moderate heat for custards and soft scrambled eggs.",
      "Remove eggs before they appear fully finished.",
      "Use residual heat as part of the cooking process."
    ],
    detail: "Acid, sugar, dilution and stirring all change how quickly egg proteins set, which is why one temperature rule cannot cover every egg preparation.",
    challenge: "Make two small scrambled egg portions at different heat levels and compare curd size, moisture and tenderness."
  },
  {
    id: "pasta-water",
    category: "Technique",
    source: "Italian culinary tradition",
    title: "Treat pasta water as an ingredient",
    summary: "Pasta water is not only for thinning sauce. Its starch and seasoning can help build the final texture.",
    idea: "A small amount of cloudy cooking water helps sauce spread across the pasta and supports emulsification with fat.",
    steps: [
      "Reserve water before draining.",
      "Add it gradually rather than pouring in a large amount.",
      "Reduce and toss until the sauce coats the pasta."
    ],
    detail: "Very salty water can make reduction difficult. Season the water deliberately based on how much will enter the finished sauce.",
    challenge: "Finish a tomato sauce once with plain water and once with pasta water. Compare cling and mouthfeel."
  },
  {
    id: "dry-brining",
    category: "Technique",
    source: "Professional kitchen practice",
    title: "Dry brining",
    summary: "Salt applied in advance can season more evenly and improve surface drying before cooking.",
    idea: "Salt first draws moisture outward, then the concentrated liquid is gradually reabsorbed, carrying seasoning deeper into the food.",
    steps: [
      "Salt evenly rather than heavily.",
      "Rest uncovered in the refrigerator when a dry surface is useful.",
      "Adjust the timing to the thickness and delicacy of the ingredient."
    ],
    detail: "Thin fish fillets and large roasts do not tolerate the same salt level or time. Dry brining is a controlled process, not a universal overnight rule.",
    challenge: "Cook two chicken thighs, one salted immediately and one several hours ahead. Compare seasoning and browning."
  },
  {
    id: "caponata-balance",
    category: "Recipe",
    source: "Sicilian culinary tradition",
    title: "Build caponata through contrast",
    summary: "Caponata is more than stewed aubergine. Its identity comes from layered texture and agrodolce balance.",
    idea: "Sweetness, acidity, salt and bitterness should remain distinct enough to create tension rather than collapse into one flat flavour.",
    steps: [
      "Brown or fry the aubergine separately.",
      "Build the aromatic vegetable base before combining.",
      "Add vinegar and sweetness gradually, then rest before serving."
    ],
    detail: "Caponata often tastes more integrated after resting. Evaluate it cool or at room temperature, not only while hot.",
    challenge: "Taste the mixture before and after a 30-minute rest. Note how the acidity and sweetness change."
  },
  {
    id: "maillard-moisture",
    category: "Food Science",
    source: "On Food and Cooking",
    title: "Browning begins with moisture control",
    summary: "A wet surface spends energy turning water into steam before it can brown efficiently.",
    idea: "Surface drying raises the effective cooking temperature and allows browning reactions to develop sooner.",
    steps: [
      "Dry the ingredient thoroughly.",
      "Avoid overcrowding the pan.",
      "Let the surface make stable contact before moving it."
    ],
    detail: "More heat is not always the answer. Excessive heat can burn fat or fond before the food has browned evenly.",
    challenge: "Sear one mushroom batch crowded and one in a wide pan. Compare colour, water release and flavour."
  }
];

const storageKeys = {
  saved: "dailyCulinarySaved",
  learned: "dailyCulinaryLearned",
  streak: "dailyCulinaryStreak",
  lastVisit: "dailyCulinaryLastVisit"
};

const byId = (id) => document.getElementById(id);
const getJSON = (key, fallback) => {
  try { return JSON.parse(localStorage.getItem(key)) ?? fallback; }
  catch { return fallback; }
};
const setJSON = (key, value) => localStorage.setItem(key, JSON.stringify(value));

function dayOfYear(date = new Date()) {
  const start = new Date(date.getFullYear(), 0, 0);
  return Math.floor((date - start) / 86400000);
}

function getTodayLesson() {
  return lessons[(dayOfYear() - 1) % lessons.length];
}

function updateStreak() {
  const today = new Date().toISOString().slice(0, 10);
  const lastVisit = localStorage.getItem(storageKeys.lastVisit);
  let streak = Number(localStorage.getItem(storageKeys.streak) || 0);

  if (!lastVisit) {
    streak = 1;
  } else {
    const diff = Math.round((new Date(today) - new Date(lastVisit)) / 86400000);
    if (diff === 1) streak += 1;
    else if (diff > 1) streak = 1;
  }

  localStorage.setItem(storageKeys.lastVisit, today);
  localStorage.setItem(storageKeys.streak, String(streak));
  return streak;
}

function renderLesson(lesson) {
  const date = new Date();
  byId("dayLabel").textContent = date.toLocaleDateString("en-NZ", {
    weekday: "long",
    day: "numeric",
    month: "long"
  });
  byId("categoryBadge").textContent = lesson.category;
  byId("sourceLabel").textContent = lesson.source;
  byId("todayTitle").textContent = lesson.title;
  byId("summary").textContent = lesson.summary;
  byId("idea").textContent = lesson.idea;
  byId("detail").textContent = lesson.detail;
  byId("challenge").textContent = lesson.challenge;

  const steps = byId("steps");
  steps.innerHTML = "";
  lesson.steps.forEach(step => {
    const li = document.createElement("li");
    li.textContent = step;
    steps.appendChild(li);
  });
}

function renderSaved() {
  const savedIds = getJSON(storageKeys.saved, []);
  const list = byId("savedList");
  list.innerHTML = "";

  if (!savedIds.length) {
    list.innerHTML = '<div class="empty-state">Saved lessons will appear here.</div>';
    return;
  }

  savedIds
    .map(id => lessons.find(lesson => lesson.id === id))
    .filter(Boolean)
    .forEach(lesson => {
      const article = document.createElement("article");
      article.className = "saved-item";
      article.innerHTML = `<h3>${lesson.title}</h3><p>${lesson.category} · ${lesson.source}</p>`;
      list.appendChild(article);
    });
}

function renderStats() {
  byId("streakCount").textContent = localStorage.getItem(storageKeys.streak) || "0";
  byId("savedCount").textContent = getJSON(storageKeys.saved, []).length;
  byId("learnedCount").textContent = getJSON(storageKeys.learned, []).length;
}

function updateButtons(lesson) {
  const saved = getJSON(storageKeys.saved, []);
  const learned = getJSON(storageKeys.learned, []);

  byId("saveBtn").textContent = saved.includes(lesson.id) ? "Saved" : "Save lesson";
  byId("saveBtn").disabled = saved.includes(lesson.id);

  byId("completeBtn").textContent = learned.includes(lesson.id) ? "Learned" : "Mark as learned";
  byId("completeBtn").disabled = learned.includes(lesson.id);
}

const todayLesson = getTodayLesson();
updateStreak();
renderLesson(todayLesson);
renderSaved();
renderStats();
updateButtons(todayLesson);

byId("saveBtn").addEventListener("click", () => {
  const saved = getJSON(storageKeys.saved, []);
  if (!saved.includes(todayLesson.id)) {
    saved.push(todayLesson.id);
    setJSON(storageKeys.saved, saved);
  }
  renderSaved();
  renderStats();
  updateButtons(todayLesson);
});

byId("completeBtn").addEventListener("click", () => {
  const learned = getJSON(storageKeys.learned, []);
  if (!learned.includes(todayLesson.id)) {
    learned.push(todayLesson.id);
    setJSON(storageKeys.learned, learned);
  }
  renderStats();
  updateButtons(todayLesson);
});

byId("clearSavedBtn").addEventListener("click", () => {
  setJSON(storageKeys.saved, []);
  renderSaved();
  renderStats();
  updateButtons(todayLesson);
});

let deferredPrompt;
window.addEventListener("beforeinstallprompt", (event) => {
  event.preventDefault();
  deferredPrompt = event;
  byId("installBtn").hidden = false;
});

byId("installBtn").addEventListener("click", async () => {
  if (!deferredPrompt) return;
  deferredPrompt.prompt();
  await deferredPrompt.userChoice;
  deferredPrompt = null;
  byId("installBtn").hidden = true;
});

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("sw.js").catch(console.error);
  });
}
