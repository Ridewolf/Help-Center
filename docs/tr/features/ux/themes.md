# Temalar

Gösterge Paneli'nin üç bağımsız görünüm ayarı vardır:

- **Mod** — açık, koyu veya işletim sistemini takip et
- **Renk** — düğmeler, bağlantılar, rozetler ve aktif durumlar için kullanılan vurgu rengi
- **Harita stili** — temel harita karoları (açık ve koyu mod için ayrı seçim)

Üçü de en alttaki **Profil sayfası**nda bulunur — açmak için üst çubuktaki avatarınıza tıklayın.

## Mod (açık / koyu / sistem)

Üç mod arasında geçiş yapın:

| Simge      | Mod    | Davranış                                                        |
| ---------- | ------ | --------------------------------------------------------------- |
| 🖥️ Monitör | Sistem | İşletim sisteminizin tercihini takip eder; OS değiştiğinde otomatik geçiş yapar |
| ☀️ Güneş   | Açık   | Her zaman açık mod, OS'yi yok sayar                            |
| 🌙 Ay      | Koyu   | Her zaman koyu mod, OS'yi yok sayar                            |

**Sistem** modu varsayılandır. OS temanızı değiştirirseniz (örneğin macOS'ta gün batımında otomatik koyu mod), gösterge paneli hemen takip eder — sayfa yenilenmez.

## Renk

Vurgu rengi düğmeler, bağlantılar, rozetler, odak halkaları ve aktif yan menü öğesini belirler. On iki ön ayarlı palet mevcuttur:

| Renk   | Önizleme |
| ------ | -------- |
| Siyah  | ⚫       |
| Kırmızı| 🔴       |
| Gül    | 🌹       |
| Pembe  | 🩷       |
| Turuncu| 🟠       |
| Sarı   | 🟡       |
| Yeşil  | 🟢       |
| Camgöbeği | 🟢    |
| Camgöbeği | 🔵    |
| Mavi   | 🔵       |
| Çivit  | 🟣       |
| Mor    | 🟣       |

Seçtiğiniz moda karşı en kolay okunanı seçin (bazı renkler açık modda, bazıları koyu modda daha iyi görünür).

## Harita stili

Harita gösteren sayfalar (Canlı Harita, Araç detayları, Bölge düzenleyici, Sürüş rotası vb.) bağımsız seçilebilen bir temel harita stilini kullanır. Gösterge Paneli **iki ayrı harita stili tercihi** tutar — biri açık mod, biri koyu mod için — böylece mod değiştirirken harita arayüzle uyumlu olur.

- Mod değiştirildiğinde (açık ↔ koyu) o moda seçtiğiniz harita stili otomatik olarak geçer
- Mevcut stiller harita sağlayıcınıza (MapTiler veya alternatif) bağlıdır; genellikle: Streets, Satellite, Light, Dark, Outdoors

## Tercihler nerede saklanır

Üç ayar da tarayıcınızın **localStorage** alanında şu anahtarlarla saklanır:

| Ayar              | Depolama anahtarı       |
| ----------------- | ----------------------- |
| Mod               | `app-dark-mode`         |
| Renk              | `app-theme`             |
| Harita stili (açık) | `app-map-style-light` |
| Harita stili (koyu) | `app-map-style-dark`  |

Bu demektir ki:

- **Cihaz ve tarayıcı başına** — farklı cihaz = farklı tercihler
- **Hesabınızla senkronize değil** — aynı hesabı kullananlar kendi temalarını görür
- **"Tarama verilerini temizle" ile silinir**
- **Gizli mod** pencereleri varsayılanlarla başlar

## İpuçları

- **Sistem moduyla başlayın** — OS zamanlamasına bırakın; sadece OS'den farklı tercihiniz varsa Açık/Koyu mod seçin
- **Harita stilini moda uyarlayın** — Koyu modda Uydu zor okunur; onun yerine "Koyu" veya "Streets Dark" stilini seçin
- **Renk kontrastı etkiler** — Açık arka planda Sarı veya Camgöbeği zor okunabilir; düğmeler "ince" görünüyorsa koyu vurgu (Kırmızı, Mavi, Çivit) deneyin
- **Tema izin değildir** — her operatör kendi temasını seçebilir; takım arkadaşlarınız sizin değişikliklerinizi görmez
