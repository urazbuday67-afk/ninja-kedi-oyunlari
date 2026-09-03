// Service worker: oyunun internetsiz de çalışmasını sağlar.
//
// ÖNEMLİ — GÜNCELLEME MANTIĞI:
// Oyun dosyası (index.html) her zaman ÖNCE İNTERNETTEN alınır ("network-first").
// Böylece oyunu geliştirip yayınladığında oyuncular anında yeni sürümü görür.
// İnternet yoksa son kaydedilen sürüm gösterilir.
//
// Oyunu her yayınladığında aşağıdaki SURUM numarasını bir artır.
var SURUM = "v1";
var ONBELLEK = "yildiz-kedi-" + SURUM;

var TEMEL_DOSYALAR = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./simgeler/simge-192.png",
  "./simgeler/simge-512.png",
  "./simgeler/simge-maskable-512.png"
];

self.addEventListener("install", function (olay) {
  olay.waitUntil(
    caches.open(ONBELLEK).then(function (onbellek) {
      return onbellek.addAll(TEMEL_DOSYALAR);
    }).then(function () {
      return self.skipWaiting();          // yeni sürüm hemen devreye girsin
    })
  );
});

self.addEventListener("activate", function (olay) {
  olay.waitUntil(
    caches.keys().then(function (adlar) {
      return Promise.all(adlar.map(function (ad) {
        if (ad !== ONBELLEK) return caches.delete(ad);   // eski sürümleri sil
      }));
    }).then(function () {
      return self.clients.claim();
    })
  );
});

self.addEventListener("fetch", function (olay) {
  var istek = olay.request;
  if (istek.method !== "GET") return;

  var url = new URL(istek.url);
  if (url.origin !== self.location.origin) return;   // yazı tipi gibi dış kaynaklara karışma

  olay.respondWith(
    fetch(istek).then(function (cevap) {
      // internetten geldi: kopyasını sakla, sonra internetsizken kullanılsın
      var kopya = cevap.clone();
      caches.open(ONBELLEK).then(function (onbellek) { onbellek.put(istek, kopya); });
      return cevap;
    }).catch(function () {
      // internet yok: kayıtlı sürümü ver
      return caches.match(istek).then(function (bulunan) {
        return bulunan || caches.match("./index.html");
      });
    })
  );
});
