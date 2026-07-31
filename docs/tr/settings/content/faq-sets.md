# SSS Setleri

SSS Setleri sayfası (`/settings/faq-sets`), Ridewolf uygulamalarında gösterilen **soru-cevap kütüphanesidir** — öncelikle sürücü mobil uygulamasında, ancak aynı zamanda operatör yüzeylerinde de. Her set, tek bir hedef kitleye yönelik (sürücü uygulaması, müşteri uygulaması, tamirci, yönetici veya genel) bir S/C girişleri paketidir.

[Hızlı Kılavuzlar](quick-guides.md) ve [Simge Setleri](icon-sets.md) ile birlikte, bu sayfa içerik katmanının bir parçasıdır — bir operatör burada değiştirdiğinde, sürücü telefonunda mobil uygulama sürümü olmadan görür.

Gerekli izin: **SSS Setleri** (yönetici ile kontrol edin).

## Sürücüye nerede gösterilir

Sürücü mobil uygulamasında, SSS Setleri uygulama içi Yardım / SSS bölümünü destekler. Türü **rider-app** ve durumu `active` olan her set uygulamaya yüklenir; `visible` olarak işaretlenen girişler, `order` alanına göre sıralanarak görünür. Türü `client-app`, `mechanic`, `admin`, `general` olan setler ilgili uygulamalara / yüzeylere gider.

`draft` veya `archived` bir set asla gösterilmez — yayınlamadan önce değişiklikleri hazırlamak için kullanışlıdır.

## Filtreler

| Filtre  | Tür          | Notlar                                                                  |
| ------- | ------------ | ---------------------------------------------------------------------- |
| Ara     | Metin        | Başlık / açıklama / slug içinde arama yapar                           |
| Etiketler | Çoklu seçim | Set üzerine uygulanan etiketlere göre filtreler (onboarding, payments, technical, …) |
| Durum   | Açılır Menü  | `Aktif` / `Taslak` / `Arşivlendi` (veya `Tümü`)                       |
| Tür     | Açılır Menü  | `Müşteri uygulaması` / `Sürücü uygulaması` / `Tamirci` / `Yönetici` / `Genel` (veya `Tümü`) |

**Hepsini Temizle** tüm filtreleri aynı anda sıfırlar.

## Sütunlar

| Sütun       | İçerik                                                              |
| ----------- | ------------------------------------------------------------------ |
| **Set**     | Simge + başlık; ikincil satır açıklama veya slug gösterir          |
| **Tür**     | Hedef kitle etiketi — Müşteri uygulaması / Sürücü uygulaması / Tamirci / Yönetici / Genel |
| **Etiketler** | İlk 3 etiket kutucuğu, `+N` fazlalık gösterimi                     |
| **Girişler** | Set içindeki S/C alanlarının sayısı                                |
| **Durum**   | `Aktif` (yeşil) / `Taslak` (gri) / `Arşivlendi` (soluk)            |
| **Güncellendi** | Göreceli tarih; tam zaman damgası ve yazar için üzerine gelin     |

Bir satıra tıklayarak **Görüntüle** iletişim kutusunu açın (salt okunur önizleme). Eylemler için üç nokta menüsüne tıklayın.

## Satır eylemleri

| Eylem            | Ne yapar                                                           |
| ----------------- | ----------------------------------------------------------------- |
| **Detayları Görüntüle** | Her S/C öğesinin işlendiği salt okunur önizleme               |
| **Düzenle**       | Form iletişim kutusunu açar (Oluştur ile aynı, önceden doldurulmuş) |
| **Çoğalt**        | Seti `-copy` slug eki ile klonlar ve durumu `Taslak` olarak sıfırlar |
| **Dışa Aktar**    | Seti ZIP veya JSON olarak indirir                                 |
| **Arşivle**       | `Arşivlendi` durumuna taşır — sürücü uygulamasından gizlenir, geçmiş için saklanır |
| **Sil**           | Kalıcı olarak kaldırır (yıkıcı — gerçekten gerekmediğinde kullanmayın) |

Üst araç çubuğunda ayrıca toplu **İçe Aktar** (ZIP / JSON) ve **Dışa Aktar** (görünür liste için ZIP / JSON) vardır.

## Oluştur / Düzenle formu

Form iletişim kutusunda üç üst düzey seçici ve bir S/C alanları listesi vardır:

- **Tür** — zorunlu, seti kimin göreceğini tanımlar (Müşteri uygulaması / Sürücü uygulaması / Tamirci / Yönetici / Genel)
- **Durum** — `Taslak` (yeni için varsayılan) / `Aktif` / `Arşivlendi`
- **Etiketler** — çoklu seçim, filtreleme ve gruplama için kullanılır
- **Başlık** — zorunlu, set adı olarak gösterilir
- **Açıklama** — isteğe bağlı, listede ikincil satır
- **Alanlar** — S/C girişleri. Her alanın:
  - **Etiket** (soru)
  - **Değer** (cevap)
  - **Tür** — `text` / `markdown` / `link` / `list`
  - **Görünür** anahtarı (bireysel öğeleri silmeden gizler)
  - **Sıra** (sürükleyerek yeniden sıralama)

Slug başlıktan türetilir ve API URL'sinde kullanılır — gerekirse Düzenle ile değiştirin.

## Tipik iş akışları

- **Yeni bir sürücü SSS'si yayınla** — `+ Set oluştur` → Tür = Sürücü uygulaması, Durum = Taslak → başlık + açıklama doldur → S/C alanları ekle → kaydet → Detayları Görüntüle ile önizle → Düzenle, Durumu Aktif yap → sonraki veri çekişte sürücü uygulamasında görünür
- **Mevsimlik metni hazırlama** — Var olan bir seti Çoğalt → kopyayı Taslak olarak düzenle → eski seti arşivleyip yenisini etkinleştirerek geçişi planla
- **Kötü bir cevabı geri al** — sorunlu seti aç → Düzenle → alanı düzelt (veya `Görünür` kapat) → kaydet; veya tüm seti Arşivle ve önceden çoğaltılmış sürüme dön
- **JSON dökümünden toplu içe aktar** — sağ üst _İçe Aktar_ → dosyayı seç → ayrıştırılan yapıyı onayla → Taslak olarak içe aktar, sonra gözden geçir ve Aktif yap

## İpuçları

- **Tür içeriği kimin göreceğini kontrol eder** — sürücüye yönelik metni `mechanic` setine koymayın, sürücü uygulamasına asla ulaşmaz
- **Taslak dostunuzdur** — yeni setler varsayılan olarak Taslak olur, böylece sürücü uygulaması yarım kalmış içeriği göstermez. Her şeyi gözden geçirdikten sonra Aktif yapın
- **Markdown alanları biçimlendirmeyi işler** — madde işaretleri veya kalın yazı gereken cevaplar için kullanın; sadece düz metin istiyorsanız `text` seçin
- **Etiketler filtre ile paylaşılır** — tutarlı bir etiket sözlüğü kullanın (ör. `onboarding`, `payments`, `troubleshooting`) böylece gelecekteki filtreleme faydalı olur
- **Mümkünse Silmek yerine Arşivle** — silinen setler sonsuza dek gider, arşivlenenler yeniden etkinleştirilebilir ve geçmiş olarak hizmet eder
