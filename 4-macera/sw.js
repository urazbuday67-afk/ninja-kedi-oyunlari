// Service worker: oyunun internetsiz de çalışmasını sağlar.
// Oyun dosyası her zaman ÖNCE internetten alınır (network-first);
// güncelleme yayınlayınca oyuncular anında yeni sürümü görür.
// Oyunu her yayınladığında SURUM numarasını bir artır.
var SURUM = "v1";
var ONBELLEK = "orangutan-" + SURUM;

var TEMEL_DOSYALAR = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./simgeler/simge.svg",
  "./simgeler/simge-maskable.svg"
];

self.addEventListener("install", function (olay) {
  olay.waitUntil(
    caches.open(ONBELLEK).then(function (onbellek) {
      return onbellek.addAll(TEMEL_DOSYALAR);
    }).then(function () { return self.skipWaiting(); })
  );
});

self.addEventListener("activate", function (olay) {
  olay.waitUntil(
    caches.keys().then(function (adlar) {
      return Promise.all(adlar.map(function (ad) {
        if (ad !== ONBELLEK) return caches.delete(ad);
      }));
    }).then(function () { return self.clients.claim(); })
  );
});

self.addEventListener("fetch", function (olay) {
  var istek = olay.request;
  if (istek.method !== "GET") return;
  var url = new URL(istek.url);
  if (url.origin !== self.location.origin) return;

  olay.respondWith(
    fetch(istek).then(function (cevap) {
      var kopya = cevap.clone();
      caches.open(ONBELLEK).then(function (onbellek) { onbellek.put(istek, kopya); });
      return cevap;
    }).catch(function () {
      return caches.match(istek).then(function (bulunan) {
        return bulunan || caches.match("./index.html");
      });
    })
  );
});
