# 🐱 Oyun Projesi — Ninja Kedi Oyunları

Bu, oyun yapmayı öğrenmek için hazırlanan bir proje. **Uraz Buday** ve **Çağlar Buday** tarafından yapılıyor.
Her oyun saf **HTML + Canvas + JavaScript** ile yazıldı — hiçbir kurulum, hiçbir kütüphane gerekmez.
Uzak hedef: Play Store'daki **Level Devil** tarzı bir oyun. Oraya küçük oyunlarla adım adım gidiyoruz.

## 🎮 Oyunlar

| Klasör | Oyun | Ne yapılır |
|--------|------|------------|
| `1-yakala/` | **Yıldız Yakalayan Kedi** | Yıldız topla, kuyruk kap, çürük kuyruktan kaç, boss'ları yen |
| `2-kac/`    | **Meteordan Kaçan Kedi**   | Her yönden gelen meteorlardan kaç, çakra küresi topla |

## ▶️ Nasıl oynanır / çalıştırılır?

**En kolay yol:** İlgili klasördeki `index.html` dosyasına çift tıkla — tarayıcıda açılır.

**Daha iyi yol (önerilen):** Yerel sunucuyla aç. Böylece tarayıcı hep en yeni sürümü gösterir
(çift tıklamada bazen eski sürüm önbellekten gelir):

```bash
node ".claude/sunucu.js"
```

Sonra tarayıcıda:
- 1. oyun: http://localhost:8123/1-yakala/
- 2. oyun: http://localhost:8123/2-kac/

> Not: Sunucu için sadece [Node.js](https://nodejs.org) kurulu olması yeterli. Başka hiçbir şey gerekmez.

## 🕹️ Kontroller (1. oyun)

- **← → ↑ ↓ / WASD** veya **fare / parmak** → kediyi hareket ettir (her yöne)
- **X** → çakra topu at (boss'a uzaktan vur)
- **C** → kuyrukları savur (boss'a yakından vur)
- **G** → renk değiştir · **B** → arka plan · **K** → düşen obje türü
- **BOŞLUK** → başlat / duraklat · **F** → tam ekran · **M** → ses

## 🛠️ Kod nasıl düzenlenir?

Her oyunun `index.html` dosyasının **en üstünde büyük harfli `AYARLAR` bloğu** var.
Oradaki sayıları değiştir, kaydet, tarayıcıda **F5**'e bas — ne olduğunu hemen gör.
Örnek: `KEDI_HIZI`, `BOSS_CANLARI`, `SANS_HEDIYE`...

Kod içindeki değişken ve fonksiyon adları **Türkçe** yazıldı ki okunması kolay olsun.

## 📁 Klasör yapısı

```
oyun projesi/
├── 1-yakala/          # 1. oyun (index.html + simgeler + PWA dosyaları)
├── 2-kac/             # 2. oyun
├── yayin/             # mağazaya/siteye yüklenmeye hazır .zip dosyaları
├── .claude/           # yerel geliştirme sunucusu (sunucu.js)
├── OYUNLARI BASLAT.cmd # çift tıkla → sunucu açılır + oyun başlar
└── README.md          # bu dosya
```

## 🤝 Katkıda bulunmak isteyenler için

1. Bu depoyu bilgisayarına indir (`git clone ...`).
2. Bir oyunun `index.html`'ini düzenle.
3. Değişikliğini kaydet: `git add .` → `git commit -m "ne yaptığını yaz"` → `git push`.

**Önemli:** Aynı dosyayı aynı anda iki kişi düzenlerse çakışma olur. Kim neyi yapıyor, konuşarak ayırın.
