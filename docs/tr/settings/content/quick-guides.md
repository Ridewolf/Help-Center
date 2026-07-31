# Hızlı Kılavuzlar

Hızlı Kılavuzlar sayfası (`/settings/quick-guides`), Ridewolf sürücü mobil uygulamasının "Scooter nasıl kiralanır" veya "Güvenlik kontrol listesi" gibi şeyler için gösterdiği **adım adım rehberleri** içerir. Her kılavuz, simge, renk, başlık ve metin içeren sıralı bir öğe listesidir — hedef kitleye göre yayınlanır (sürücü uygulaması, müşteri uygulaması, teknisyen, yönetici, genel).

[SSS Setleri](faq-sets.md) (Soru/Cevap blokları) ve [Simge Setleri](icon-sets.md) (harita grafikleri) ile birlikte, Hızlı Kılavuzlar içerik katmanının üçüncü direğidir. Burada bir kılavuzu düzenleyin, sürücü uygulaması sonraki veri çekişinde değişikliği alır — uygulama sürümü gerekmez.

Gerekli izin: **Hızlı Kılavuzlar** (yönetici ile kontrol edin).

## Sürücüye nerede gösterilir

Sürücü mobil uygulamasında, Hızlı Kılavuzlar, başlangıç eğitimlerini ve yolculuk içi ipuçları ekranlarını destekler. Türü **rider-app** ve durumu `active` olan her kılavuz yüklenir; `visible` olarak işaretlenen öğeler `order` içinde görünür, sol tarafta yapılandırılmış `icon` ve `color` ile birlikte, ve `expandByDefault` doğruysa `body` metni genişletilir.

Türleri `client-app`, `mechanic`, `admin`, `general` olan kılavuzlar ilgili yüzeylere bağlanmıştır.

## Filtreler

| Filtre  | Tür          | Notlar                                                                  |
| ------- | ------------ | ----------------------------------------------------------------------- |
| Arama   | Metin        | Başlık / açıklama / kısa ad içinde arama yapar                         |
| Etiketler | Çoklu seçim | Etiketlere göre filtrele (başlangıç, temel, teknik, ödemeler, …)       |
| Durum   | Açılır liste | `Aktif` / `Taslak` / `Arşivlendi` (veya `Hepsi`)                       |
| Tür     | Açılır liste | `Müşteri uygulaması` / `Sürücü uygulaması` / `Teknisyen` / `Yönetici` / `Genel` (veya `Hepsi`) |

**Hepsini Temizle** tüm filtreleri sıfırlar.

## Sütunlar

| Sütun       | İçerik                                                              |
| ----------- | ------------------------------------------------------------------ |
| **Set**     | Kitap simgesi + başlık; alt satırda açıklama veya kısa ad gösterilir |
| **Tür**     | Hedef kitle etiketi — Müşteri uygulaması / Sürücü uygulaması / Teknisyen / Yönetici / Genel |
| **Etiketler** | İlk 3 etiket kutucuğu, `+N` fazlalık gösterimi                      |
| **Öğeler**  | Kılavuzdaki adım sayısı                                            |
| **Durum**   | `Aktif` (yeşil) / `Taslak` (gri) / `Arşivlendi` (soluk)            |
| **Güncellendi** | Göreceli tarih; tam zaman ve yazar için üzerine gelin               |

Bir satıra tıklayarak **Görüntüle** iletişim kutusunu açın (her adımın ön izlemesi). Eylemler için üç nokta menüsüne tıklayın.

## Satır eylemleri

| Eylem            | Ne yapar                                                           |
| ----------------- | ----------------------------------------------------------------- |
| **Detayları Görüntüle** | Sürücünün göreceği şekilde her öğeyi ön izler                   |
| **Düzenle**       | Form iletişim kutusunu açar (Oluştur ile aynı, önceden doldurulmuş) |
| **Kopyala**       | Kılavuzu `-copy` kısa ad eki ile klonlar ve durumu `Taslak` yapar  |
| **Dışa Aktar**    | ZIP veya JSON olarak indirir                                       |
| **Arşivle**       | `Arşivlendi` durumuna taşır — sürücü uygulamasından gizlenir, geçmiş için saklanır |
| **Sil**           | Kalıcı olarak kaldırır                                             |

Üst araç çubuğundaki **İçe Aktar** (ZIP / JSON) ve **Dışa Aktar** (ZIP / JSON) toplu çalışır.

## Oluştur / Düzenle formu

Form, SSS Setleri ile aynı üst seviye seçicilere ve daha zengin bir öğe düzenleyiciye sahiptir:

- **Tür** — zorunlu, kılavuzu kimin göreceğini belirler
- **Durum** — `Taslak` / `Aktif` / `Arşivlendi`
- **Etiketler** — çoklu seçim
- **Başlık / Açıklama** — başlık zorunlu, açıklama isteğe bağlı
- **Öğeler** — adım listesi. Her öğe şunlara sahiptir:
  - **Başlık** — adım başlığı
  - **Metin** — adım içeriği (uzun biçimli, düz metin)
  - **Simge** — Lucide simge adı (ör. `MapPin`, `QrCode`, `Shield`)
  - **Renk** — marka ön ayarlarıyla hex renk (Birincil `#6366f1`, Başarılı `#22c55e`, Uyarı `#eab308`, Tehlike `#ef4444`, vb.)
  - **Varsayılan olarak genişlet** — açık ise, öğe uygulamada genişletilmiş açılır
  - **Görünür** — öğeyi silmeden gizlemek için geçiş
  - **Sıra** — sürükleyerek yeniden sırala

Kısa ad başlıktan türetilir ve API URL'sinde kullanılır.

## Tipik iş akışları

- **Yeni bir başlangıç kılavuzu yazın** — `+ Kılavuz oluştur` → Tür = Sürücü uygulaması, Durum = Taslak → simgeler + renklerle 5–7 sıralı öğe ekleyin → Detayları Görüntüle ile ön izleyin → Aktif yapın → sonraki veri çekişte sürücü uygulamasında görünür
- **Bir adımı isteğe bağlı yap / gizle** — Düzenle → öğede `Görünür` kapat → kaydet (öğe veride kalır, sadece gösterilmez)
- **Yeni bir rehberi A/B testi yap** — Aktif kılavuzu Kopyala → kopyayı düzenle → eskiyi arşivle, yeniyi birlikte aktif et
- **Bir tasarımcının taslağını toplu içe aktar** — sağ üst _İçe Aktar_ → ZIP/JSON → ayrıştırılan yapıyı onayla → Taslak olarak içe aktar → gözden geçir ve Aktif et

## İpuçları

- **Simge adları Lucide'dir** — uygulamada doğru görünmeleri için [lucide.dev](https://lucide.dev) adresinden seçin; yanlış yazılan simge adları yer tutucuya döner
- **Adımları taranabilirlik için renklendirin** — sürücüler kılavuzları hızlıca gözden geçirir. "Dikkat" adımları için Uyarı, "tamamlandı" durumları için Başarılı rengini kullanın
- **`expandByDefault` genellikle sadece ilk adım içindir** — her öğeyi varsayılan açmak akordeonun amacını bozar. Diğerlerini kapalı bırakın
- **Metin düz anlatımdır, markdown değil** — paragrafları kısa tutun; mobil uygulama tipografiyi ayarlar
- **Bir kılavuzu kaldırırken Silme, Arşivle kullanın** — daha sonra yeniden etkinleştirebilir veya kopyalayabilirsiniz
- **Etiketleri [SSS Setleri](faq-sets.md) ile tutarlı kullanın** — `onboarding`, `troubleshooting` vb. içerik katmanı genelinde paylaşılan kelime hazinesidir
