const CACHE = "italian-library-rebuilt-v1";
const ASSETS = ["./", "./index.html", "./styles.css", "./cards.js", "./app.js", "./manifest.json", "./icon.svg", "./images/culture-010.jpg", "./images/culture-016.jpg", "./images/culture-022.jpg", "./images/culture-032.jpg", "./images/sicily-001.jpg", "./images/sicily-004.jpg", "./images/sicily-005.jpg", "./images/sicily-007.jpg", "./images/sicily-009.jpg", "./images/sicily-010.jpg", "./images/sicily-012.jpg", "./images/sicily-016.jpg", "./images/sicily-017.jpg", "./images/sicily-018.jpg", "./images/sicily-021.jpg", "./images/sicily-022.jpg", "./images/sicily-023.jpg", "./images/sicily-024.jpg", "./images/sicily-026.jpg", "./images/sicily-029.jpg", "./images/sicily-038.jpg", "./images/sicily-039.jpg", "./images/sicily-041.jpg", "./images/sicily-044.jpg", "./images/sicily-051.jpg", "./images/sicily-052.jpg", "./images/sicily-056.jpg", "./images/sicily-060.jpg", "./images/sicily-061.jpg", "./images/sicily-063.jpg", "./images/sicily-066.jpg", "./images/sicily-067.jpg", "./images/sicily-069.jpg", "./images/sicily-071.jpg", "./images/sicily-072.jpg", "./images/sicily-078.jpg", "./images/sicily-080.jpg", "./images/sicily-083.jpg", "./images/sicily-088.jpg", "./images/sicily-090.jpg", "./images/sicily-094.jpg", "./images/sicily-099.jpg", "./images/sicily-102.jpg", "./images/sicily-110.jpg", "./images/sicily-113.jpg", "./images/sicily-114.jpg", "./images/sicily-117.jpg", "./images/sicily-119.jpg", "./images/sicily-122.jpg", "./images/sicily-123.jpg", "./images/sicily-124.jpg", "./images/sicily-126.jpg", "./images/sicily-128.jpg", "./images/sicily-129.jpg", "./images/sicily-139.jpg", "./images/sicily-144.jpg"];
self.addEventListener("install", event => {
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(ASSETS)));
  self.skipWaiting();
});
self.addEventListener("activate", event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))));
  self.clients.claim();
});
self.addEventListener("fetch", event => {
  event.respondWith(caches.match(event.request).then(hit => hit || fetch(event.request)));
});
