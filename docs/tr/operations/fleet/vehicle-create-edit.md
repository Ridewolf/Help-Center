# Araç — Oluştur ve Düzenle

İki URL aynı form düzenini paylaşır:

- **Oluştur** — `/vehicles/create` — yeni bir fiziksel birim kaydeder
- **Düzenle** — `/vehicles/:id/edit` — mevcut bir aracın meta verilerini günceller

Her ikisine de [Araçlar listesi](vehicles.md) (`+ Oluştur` butonu sağ üstte) veya [Araç detayı](vehicle-detail.md) (`Eylemler → Aracı düzenle`) üzerinden ulaşılır.

İzinler:

- **Oluştur** — `Araçlar` (`k7m8n9`) + oluşturmayla ilgili alt izin
- **Düzenle** — `Araçlar` (`k7m8n9`) + `edit` alt izni

## Düzen

Sayfa masaüstünde iki sütuna ayrılır, mobilde üst üste dizilir:

- **Sol (8/12)** — formun kendisi, _Araç bilgileri_ kartı içinde
- **Sağ (4/12)** — odaklanılan alan için bağlamsal yardım içeren **Alan Rehberi** kenar çubuğu ve doldurduklarınızın canlı önizlemesi

## Alanlar

Toplam beş alan. Zorunlu alanlar kırmızı yıldız (`*`) ile işaretlenmiştir.

### 1. Etiket (zorunlu)

Aracın etiketinde basılı insan tarafından okunabilir kod (ör. _RW-001_).

- Filonuzda benzersiz olmalı
- Serbest metin — tipik kullanım _ÖNEK-SSS_ (şirket ön eki + ardışık numara)
- Otomatik doldurmak için **Oluştur** (parıltı simgesi) tıklayın — sistem şirket ön ekinizi ve mevcut etiketleri okur, sonraki diziyi hesaplar ve alana yazar. Sorgulama sırasında yükleme simgesi görünür.

### 2. Durum (zorunlu)

Aracın başlangıç / mevcut durumu. On iki seçenek — [Araçlar listesi filtresi](vehicles.md#durum-referansı) ile aynı liste.

Oluştururken yaygın başlangıç değerleri:

- **Hazır Değil** — oluşturuldu ama henüz sürücülere verilmedi (varsayılan güvenli seçim)
- **Mevcut** — hemen kiralamaya hazır (sadece IoT ve park doğrulandıktan sonra kullanın)
- **Depolama** — henüz hizmette olmayan stok için

Düzenlerken durumu dikkatle değiştirin — bu araç kiralama döngüsünden çıkarabilir veya tekrar dahil edebilir.

### 3. IoT Cihazı (isteğe bağlı)

Bu araca bağlı IoT modülü (kilit açma/kilitleme işlemlerini yöneten ve pil/GPS raporu veren hücresel kutu).

- Aranabilir açılır liste — IMEI veya etiketle filtrelemek için yazın
- İsteğe bağlı — şimdi IoT olmadan araç oluşturabilir, sonra (Düzenle'de) bağlayabilirsiniz
- Bir IoT cihazı aynı anda sadece bir araca bağlanabilir

Düzenlerken IoT cihazını değiştirmek mümkündür ancak geri alınamaz hissi verir — yeni cihaz bu araç altında raporlamaya başlar, eski cihaz bağlantısı kesilir. Fiziksel kart değişiminde kullanılır.

### 4. Araç Modeli (isteğe bağlı)

Birim tarifelerini, varsayılan ayarları ve kategoriyi tanımlayan model kaydı (Ayarlar → Araç Ayarları).

- Aranabilir açılır liste — model etiketiyle filtrelemek için yazın
- Oluştururken isteğe bağlı, modeli bildiğiniz anda ayarlamanız önerilir — tarifeler ve davranışlar buradan gelir
- Modeli sonradan değiştirmek aktif tarifeleri ve davranış kurallarını günceller — canlı birimde değiştirmeden önce operasyonlarla onaylayın

### 5. Etiketler (isteğe bağlı)

Operatör tarafından bu özel araca uygulanan etiketler.

- Çoklu seçim — bir veya daha fazla seçin
- Aranabilir
- Bunlar _araç düzeyinde_ etiketlerdir, seçilen Araç Modelinden miras alınan _model düzeyi_ etiketlerden ayrıdır
- Bu araçta yapılan sürüşler, sürüş başlangıcında bu araç düzeyi etiketleri miras alır (etiket mirası nasıl çalışır görmek için [Sürüşler listesi](../trips/rides.md) sayfasına bakın)

## Alan Rehberi kenar çubuğu

Sağ sütun bir **bağlamsal rehber**dir, formun kopyası değildir:

- Yazdığınız/seçtiğiniz değerlerin **canlı önizlemesi** (kaydetmeden önce doğrulama için)
- Bir alana odaklandığınızda güncellenen **satır içi ipucu** — alanın ne anlama geldiğini, yaygın hataları, varsayılanları açıklar
- Gösterilen **otomatik alanlar**: mevcut etiket, durum etiketi, IoT cihaz etiketi, model etiketi, etiket sayısı

İkinci bir göz olarak kullanın. Geniş ekranda form kaydırılırken görünür kalır.

## Kaydet / Geri

- **Geri** (`←`) — kaydedilmemiş değişiklikleri atar ve önceki sayfaya döner (liste veya düzenlemede detay)
- **Kaydet** — formu doğrular ve aracı oluşturur / günceller. Başarı durumunda bildirim gösterilir; alan hataları kırmızı mesajla alan altında vurgulanır

Doğrulama başarısız olursa (etiket eksik, durum eksik, etiket tekrarı) sayfa açık kalır ve hatalı alan kırmızıyla çevrelenir.

## Oluşturma ve Düzenleme — farklar

| Özellik           | Oluşturma                           | Düzenleme                                               |
| ------------------ | ---------------------------------- | ------------------------------------------------------- |
| Etiket            | Boş veya _Oluştur_                  | Mevcut etiketle önceden doldurulmuş                    |
| Durum             | Boş (seçmeniz gerekir)              | Mevcut durumla önceden doldurulmuş                      |
| IoT Cihazı        | Boş veya bağlı olmayan cihazlardan seç | Önceden doldurulmuş; değiştirmek önceki cihazın bağlantısını keser |
| Araç Modeli       | Boş                                | Önceden doldurulmuş                                    |
| Etiketler         | Boş                                | Mevcut araç düzeyi etiketleriyle önceden doldurulmuş    |
| Kaydettikten sonra | Yeni aracın detayına yönlendirir   | Formda kalır / detaya yönlendirir (akışa bağlı)          |
| Aktivite günlüğü girişi | "_operatör adı_ tarafından araç oluşturuldu" | "_operatör adı_ tarafından araç düzenlendi" alan farklarıyla |

Her iki akış da aracın [Aktivite günlüğü](vehicle-detail.md#aktivite-sekmesi) kaydına yazar.

## Tipik iş akışları

- **Yeni bir parti kaydet** — etiket oluştur → durum _Hazır Değil_ → IoT bağla → Model ayarla → kaydet. Birim sahada ve test edildikten sonra, durumu _Mevcut_ olarak düzenle
- **Arızalı IoT kartını değiştir** — düzenle → bağlantıyı kaldır / yeni IoT seç → kaydet → ilk sinyalin gelmesini bekle (Detayda Son sinyal)
- **Yeniden sınıflandır** — birimleri filolar/kategoriler arasında taşırken Modeli değiştir
- **Geçici etiket ekle** — düzenle → Etiketler → kaydet (örneğin "Etkinlik 2026-05", "Ödünç")

## İpuçları

- **Etiketler için Oluştur'u kullan** — numaralandırmanı düzenli tutar ve yinelenmeleri önler
- **Modeli erken ayarla** — tarifeler modelden gelir; model ayarlanmazsa bu araçtaki sürüşler model-siz fiyatlandırma kurallarına döner
- **Durumu _Mevcut_ olarak değiştirmeden önce IoT'yi fiziksel olarak doğrula** — sürücüler hemen kilidini açabilir
- **Bir alan hakkında şüpheye düştüğünde Alan Kılavuzu ipucunu izle** — satır içi yardım bu makaleden daha günceldir
- **Eylem günlüğü senin güvenlik ağın** — her kaydetme, operatör adı ve zaman damgası ile [araç detayında](vehicle-detail.md#aktivite-sekmesi) kaydedilir
