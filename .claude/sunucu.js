// Bagimliligi olmayan kucucuk statik dosya sunucusu.
// Oyunlari http:// uzerinden acar; boylece tarayici eski surumu onbellekten vermez.
var http = require("http");
var fs = require("fs");
var path = require("path");

var KOK = path.join(__dirname, "..");
var PORT = Number(process.env.PORT) || 8123;   // Claude bir port atarsa onu kullan

var TURLER = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png", ".jpg": "image/jpeg", ".gif": "image/gif",
  ".svg": "image/svg+xml", ".ico": "image/x-icon",
  ".mp3": "audio/mpeg", ".wav": "audio/wav", ".zip": "application/zip"
};

function listele(dizin, url, cevap) {
  var girisler = fs.readdirSync(dizin, { withFileTypes: true });
  var satirlar = girisler.map(function (g) {
    var ad = g.name + (g.isDirectory() ? "/" : "");
    return '<li><a href="' + encodeURI(ad) + '">' + ad + "</a></li>";
  });
  cevap.writeHead(200, { "Content-Type": TURLER[".html"] });
  cevap.end('<meta charset="utf-8"><h1>Oyun projesi</h1><ul>' + satirlar.join("") + "</ul>");
}

http.createServer(function (istek, cevap) {
  var yol;
  try { yol = decodeURIComponent(istek.url.split("?")[0]); } catch (e) { yol = "/"; }
  var tam = path.join(KOK, yol);

  // kok klasorun disina cikilmasin
  if (path.relative(KOK, tam).indexOf("..") === 0) {
    cevap.writeHead(403); cevap.end("yasak"); return;
  }

  fs.stat(tam, function (hata, bilgi) {
    if (hata) { cevap.writeHead(404, { "Content-Type": TURLER[".html"] }); cevap.end("<meta charset=utf-8>bulunamadi: " + yol); return; }

    if (bilgi.isDirectory()) {
      var indeks = path.join(tam, "index.html");
      if (fs.existsSync(indeks)) { tam = indeks; }
      else { listele(tam, yol, cevap); return; }
    }

    var uzanti = path.extname(tam).toLowerCase();
    cevap.writeHead(200, {
      "Content-Type": TURLER[uzanti] || "application/octet-stream",
      "Cache-Control": "no-store"          // her zaman en yeni surum gelsin
    });
    fs.createReadStream(tam).pipe(cevap);
  });
}).listen(PORT, function () {
  console.log("Oyun sunucusu hazir: http://localhost:" + PORT + "/");
  console.log("  1. oyun: http://localhost:" + PORT + "/1-yakala/");
  console.log("  2. oyun: http://localhost:" + PORT + "/2-kac/");
});
