# Simge Setleri

Simge Setleri sayfası (`/settings/icon-sets`), Ridewolf sürücü mobil uygulamasının araçları görüntülemek için kullandığı **harita simgesi kütüphanesidir**. Her set bir araç türüne (e-skuter, e-bisiklet, kargo e-bisiklet, e-moped, e-araba, e-tekne) bağlıdır ve üç kategori SVG simgesi sağlar: **Seçili**, **Seçili değil** ve **İndirim**.

Bu bir içerik altyapısıdır — operatörler SVG'leri buraya yükler, sürücü uygulaması araç türüne, pil seviyesine ve sürücünün haritadaki araca dokunup dokunmadığına göre doğru simgeyi seçer. Sanat değişikliği için mobil uygulama sürümü gerekmez.

[FAQ Sets](faq-sets.md) ve [Quick Guides](quick-guides.md) ile birlikte, bu gösterge panelinin içerik katmanıdır.

Gerekli izin: **Simge Setleri** (yönetici ile kontrol edin).

## Sürücüye nerede görünür

Sürücü uygulaması haritasında, her araç pini araç türü için aktif setten bir simge kullanır:

- **Seçili değil** simgeler, sürücünün dokunmadığı pinler için kullanılır — altı pil seviyesi (`bat10`, `bat25`, `bat40`, `bat55`, `bat90`, `bat100`) böylece pin mevcut şarjı yansıtır
- **Seçili** simgeler, sürücü pinine dokunduğunda pinin yerini alır — aynı altı pil seviyesi, farklı stil
- **İndirim** simgeleri (varsayılan olarak %5, %15, %25, %35, %45, %55) araçta promosyon fiyatı olduğunda pinin üzerine gelir

Her araç türü için bir set **varsayılan** olarak işaretlenebilir — bu, başka bir şey yapılandırılmadığında uygulamanın yüklediği settir.

## Filtreler

| Filtre          | Tür       | Notlar                                                                                                            |
| -------------- | --------- | ---------------------------------------------------------------------------------------------------------------- |
| Ara            | Metin     | Başlık / kısa ad içinde arama yapar                                                                                |
| Araç türü      | Açılır    | `E-skuter` / `E-bisiklet` / `Kargo e-bisiklet` / `E-moped` / `E-araba` / `E-tekne` (veya `Tümü`)                  |
| Durum kapsamı  | Açılır    | Dolu olanlara göre filtreler: `Sadece seçili` / `Sadece seçili değil` / `Sadece indirim` / `Tam kapsam` (veya `Tümü`) |
| Durum          | Açılır    | `Aktif` / `Taslak` / `Eksik` / `Arşivlendi` (veya `Tümü`)                                                        |
| Etiketler      | Kombobox  | Serbest biçimli etiket filtresi (girdi gösterilir ancak şu anda devre dışı — yakında)                              |

**Hepsini Temizle** tüm filtreleri sıfırlar.

## Sütunlar

| Sütun                  | İçerik                                                                    |
| ---------------------- | ------------------------------------------------------------------------- |
| **Set**                | Paket simgesi + başlık; ikincil satırda kısa ad gösterilir                |
| **Araç türü**          | Kapsül (E-skuter, E-bisiklet, vb.)                                        |
| **Seçili simgeler**    | Kapsama `6/6` gibi (kaç pil seviyesi yüklendi)                            |
| **Seçili değil simgeler** | Seçili olmayan varyantlar için aynı `n/6` kapsama                        |
| **İndirim simgeleri**  | İlk 3 indirim yüzdesi çip olarak (`5%`, `15%`, `25%`), `+N` taşma         |
| **Etiketler**          | İlk 2 etiket çipi ve `+N` taşma                                          |
| **Güncellendi**        | Son güncelleme tarihi                                                    |
| **Durum**              | `Aktif` / `Taslak` / `Eksik` / `Arşivlendi`                              |

`Eksik`, setin üç kategoriden birinde simgelerin eksik olduğu anlamına gelir — sürücü uygulaması, yüklemeyi tamamlayana kadar o araç türü için varsayılan simgeye döner.

Bir satıra tıklayarak **Detay iletişim kutusunu** açın — setteki her simgenin görsel önizlemesi. Eylemler için üç nokta menüsüne tıklayın.

## Satır eylemleri

| Eylem               | Ne yapar                                                                         |
| ------------------- | -------------------------------------------------------------------------------- |
| **Detayları görüntüle** | Yüklenen her SVG'nin önizlemesiyle detay iletişim kutusunu açar                 |
| **Düzenle**          | Çok sekmeli formu açar (Detaylar / Seçili / Seçili değil / İndirimler / Önizleme) |
| **Çoğalt**           | Seti Taslak olarak klonlar                                                      |
| **Varsayılan yap**   | Bu seti araç türü için varsayılan olarak işaretler — sürücü uygulaması bunu yükler |
| **İndir**            | Seti tüm SVG'lerin ZIP'i olarak indirir                                        |
| **Arşivle**          | `Arşivlendi` durumuna taşır — geçmiş için saklanır, uygulama kullanmaz          |
| **Sil**              | Kalıcı olarak kaldırır                                                          |

Üst araç çubuğundaki **İçe Aktar** (ZIP / JSON) ve **Dışa Aktar** (ZIP / JSON) toplu çalışır.

## Oluştur / Düzenle formu

Form beş sekmeli bir iletişim kutusudur:

1. **Detaylar** — başlık (zorunlu), kısa ad (otomatik türetilir), araç türü (zorunlu), etiketler, durum
2. **Seçili** — her pil seviyesi için 6 SVG yükleyin (`bat10` → `bat100`)
3. **Seçili değil** — seçilmemiş harita durumu için aynı 6 slot
4. **İndirimler** — her indirim yüzdesi için bir SVG. Varsayılan ön ayarlar `5, 15, 25, 35, 45, 55` ancak satır ekleyip çıkarabilirsiniz
5. **Önizleme** — kaydetmeden önce tüm setin görsel kontrolü

Herhangi bir sekmede boş slot olan set `Eksik` olarak kaydedilir.

## Tipik iş akışları

- **E-scooter pinlerini yeniden markalamak için yenile** — Mevcut varsayılanı çoğalt → üç sekmenin tümüne yeni SVG'leri yükle → Taslak olarak kaydet → önizle → Varsayılan olarak ayarla → rider app bir sonraki yenilemede alır
- **Simge setlerinde A/B testi yap** — eski seti Etkin ve varsayılan olmayan olarak tut, yeni bir set oluştur ve bir araç türü için Etkin + varsayılan yap → gerekirse eskiyi varsayılan yaparak geri al
- **Tatil indirimi görselleri** — etkin seti aç → Düzenle → İndirimler sekmesi → şu anda kullanılan yüzdeler için temalı SVG'leri yükle → kaydet
- **Bir tasarımcının ZIP dosyasını toplu içe aktar** — sağ üstte _İçe Aktar_ → ZIP → dosya eşlemesini onayla → Önizlemede gözden geçir → Etkinleştir

## İpuçları

- **Her araç türü için bir varsayılan** — yeni bir varsayılan ayarlamak öncekinin varsayılanlığını otomatik kaldırır. Bir setin varsayılan olması için Durum rozeti `Etkin` olmak zorunda değil, ama öyle olmalı
- **Pil seviyeleri sabittir** — uygulamanın anladığı tek seviyeler `bat10/25/40/55/90/100`; uygulama canlı araç şarjına göre en yakınını seçer
- **Sadece SVG** — yüklemeler SVG dosyaları bekler; PNG'ler retina ekranlarda temiz ölçeklenmez
- **`Eksik` faydalı bir koruma sağlar** — rider app'in varsayılan sete döndüğünü gösterir, böylece yarım yüklenmiş bir seti yanlışlıkla göndermezsiniz
- **Silmeden önce arşivle** — arşivlenen setler aranabilir kalır, geri dönmek isterseniz
