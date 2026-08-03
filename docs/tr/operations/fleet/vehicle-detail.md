# Araç Detayı

Araç detay sayfası (`/vehicles/:id`), tek bir birim için çalışma alanıdır. Canlı IoT verilerini görmek, komut göndermek, sürüş geçmişini incelemek, uyarıları araştırmak ve operatör işlemleri yapmak (düzenle, konumu değiştir, bakım için işaretle, QR oluştur, sil) için kullanılır.

Genellikle buraya [Araçlar listesi](vehicles.md) içindeki bir satıra tıklayarak gelirsiniz.

Gerekli izin: **Araçlar** (`k7m8n9`). Bazı sekmeler ve işlemler ek izinler gerektirir (aşağıda belirtilmiştir).

## Düzen

Yukarıdan aşağıya:

1. **Başlık** — geri, etiket, durum, _Eylemler_ butonu
2. **Genel bakış kartları** — pil, son sinyal, IoT sağlık özeti, model vb.
3. **Konum kartı** — mevcut GPS pinini gösteren küçük harita
4. **Sekmeler** — Detaylar / Sürüşler / Aktivite / Uyarılar / Komutlar

## Başlık

Üst şerit aracı tanımlar:

- **Geri butonu** (`←`) listeye döner
- **Araç etiketi** (ör. _RW-001_) ve **durum etiketi** (Mevcut, Kullanımda vb.)
- Sağdaki **Eylemler** butonu — eylemler iletişim kutusunu açar

## Eylemler

**Eylemler** butonuna tıklamak, bu araç için mevcut tüm operatör işlemlerini içeren bir modal iletişim kutusu açar. Bazıları izin gerektirir:

| Eylem                    | İzin       | Ne yapar                                                                                                                              |
| ------------------------ | ---------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| **Aracı düzenle**         | `edit`     | [düzenleme formunu](vehicle-create-edit.md) açar                                                                                      |
| **Rota geçmişini görüntüle** | —          | Son GPS izini içeren koordinatlar iletişim kutusunu açar                                                                               |
| **Bakım için işaretle**   | —          | Durumu hızlıca _Bakım_ olarak ayarlar                                                                                                |
| **Konumu değiştir**       | —          | GPS koordinatlarını manuel güncellemek için harita iletişim kutusunu açar (IoT cihazı sessizse ve operatör aracın yerini biliyorsa kullanılır) |
| **QR kodu oluştur**       | —          | Bu tek araç için QR kodu oluşturucusunu açar (yazdırılabilir etiket)                                                                   |
| **Aracı sil**             | `delete`   | Onay iletişim kutusuyla yumuşak silme yapar                                                                                           |

İzin verilmemiş eylemler iletişim kutusunda gizlenir.

## Genel bakış kartları

Başlığın altında küçük kartlardan oluşan bir ızgara, aracı hızlıca özetler:

- **Pil** — scooter pil yüzdesi (ayrı bildiriliyorsa IoT kart pil durumu)
- **Son sinyal** — IoT cihazının son raporu, durum etiketi ile (Çevrimiçi / Çevrimdışı / Güncel değil)
- **Kilitleme** — kilitli / kilitsiz
- **Model** — model adı, durum, görsel
- **GSM / GPS** — hücresel ve GPS geçerlilik durumu
- **Hız modu** — mevcut sürüş modu (eko, normal, spor vb., model destekliyorsa)
- **Voltaj** — IoT kart voltajı (mühendislik alanı)

## Konum kartı

Küçük bir harita, aracın son bilinen GPS koordinatında tek bir pin olarak gösterir, pin'e sığdırılmış varsayılan yakınlaştırma ile. Rota geçmişini açmadan "şu anda nerede?" sorusuna hızlı yanıt için kullanılır.

## Sekmeler

Detay, en fazla beş sekme arasında geçiş yapar (bazıları izin gerektirir):

| Sekme         | İzin         | İçindekiler                                                                       |
| ------------- | ------------ | --------------------------------------------------------------------------------- |
| **Detaylar**  | —            | Tam araç verisi — IoT alanları, model + tarifeler, etiketler, bölgeler, GSM/GPS, hız modu |
| **Sürüşler**  | view-rides   | Bu araçta yapılan son sürüşler (küresel Sürüşler listesinin odaklanmış dilimi)     |
| **Aktivite**  | —            | Bu araca özel aktivite günlüğü (operatör ve sistem işlemleri)                     |
| **Uyarılar**  | —            | Sayfalandırılmış gruplanmış IoT hataları ve alarmları ("ne yanlış gitti" geçmişi) |
| **Komutlar**  | `iot-command`| Cihaza doğrudan IoT komutları gönder (kilitle, kilit aç, alarm, yeniden başlat vb.)|

### Detaylar sekmesi

Varsayılan sekme ve aracın durumunun en derin görünümü:

- **IoT paneli** — pil, voltaj, kilit, GSM sinyali, GPS geçerliliği, son sinyal, hız modu
- **Model paneli** — model adı ve görseli, durum, modelden miras alınan etiketler
- **Tarifeler paneli** — aracın modeline atanan tarifeler (sürüş fiyatlandırmasını belirler)
- **Etiketler paneli** — bu özel araca uygulanan etiketler (operatör tarafından _Düzenle_ ile değiştirilebilir)
- **Bölgeler paneli** — aracın şu anda ait olduğu bölgeler

IoT verisi yüklenemezse, bu sekmede bir hata afişi görünür; sayfanın geri kalanı çalışmaya devam eder.

### Sürüşler sekmesi

Bu araçta yapılan son sürüşleri listeler — küresel Sürüşler listesiyle aynı satır formatında, sadece bu araca filtrelenmiş. Herhangi bir satıra tıklayarak sürüş detayını açabilirsiniz.

Bu sekme, bu araçta `view-rides` izniniz yoksa gizlenir.

### Aktivite sekmesi

Bu araç için kronolojik **aktivite günlüğü**: her operatör işlemi (düzenlendi, durum değişti, silindi, etiketler güncellendi) ve her sistem olayı (IoT tetikleyicilerinden durum geçişleri, otomasyon çalışmaları).

Uyumluluk, hesap verebilirlik ve beklenmedik durum değişikliklerini hata ayıklama için faydalıdır.

### Uyarılar sekmesi

Cihaz tarafından oluşturulan gruplanmış **IoT uyarıları ve hataları**, sayfalandırılmış. Her giriş şunları içerir:

- Kod ve insan tarafından okunabilir başlık
- İlk / son görülme zaman damgaları
- Sıklık (bu kodun kaç kez tetiklendiği)
- Durum (aktif / çözüldü)

_Temizle_ düğmesi (desteklenen yerlerde), bir grubu çözüldü olarak işaretlemenizi sağlar. Sayfalama, geçmiş uyarılar arasında geri gitmenize olanak tanır.

### Komutlar sekmesi

Cihaza doğrudan **IoT komutları**, kategoriye göre gruplanmış (ör. _Kilitle & kilidi aç_, _Alarm_, _Işıklar_, _Sistem_). İzin `iot-command` ile sınırlandırılmıştır.

- Bir komut seçin ve _Gönder_'e tıklayın
- Komut IoT cihazına gönderilir; yanıt süresi hücresel sinyale bağlıdır
- Son komut geçmişi, durumuyla birlikte (gönderildi / teslim edildi / başarısız) aşağıda görünür

Toplu _Komut gönder_ yolunun kapsamadığı bir şeyi yapmanız gerektiğinde kullanın — tanılama, tek seferlik yeniden başlatmalar, destek vakaları için manuel kilit açma.

## Tipik iş akışları

- **Bir şikayeti araştırın** — Bugün bu araca hangi operatörlerin / sistemlerin dokunduğunu görmek için Aktivite'yi açın; sonra IoT hataları için Uyarılar; ardından ilgili yolculuk için Sürüşler
- **Kilitleme veya kilit açmayı zorlayın** — Komutlar sekmesi → _Kilidi Gönder_ veya _Kilidi Aç Gönder_ (gerektirir `iot-command`)
- **Bir birimi servise çekin** — _Eylemler → Bakım için işaretle_ (durumu ayarlar); saha ekibini gönderin
- **GPS'i manuel düzeltin** — _Eylemler → Konumu değiştir_ (IoT cihazı sessizse ve nerede olduğunu biliyorsanız)
- **Yeni bir etiket yazdırın** — _Eylemler → QR kodu oluştur_

## İpuçları

- **Uyarılar sekmesini izleyin** — sık kodlar donanım sorunlarının erken uyarılarıdır; olay olmadan önce müdahale edin
- **Aktivite denetim izinizdir** — her operatör değişikliği burada isim ve zaman damgasıyla kaydedilir
- **Komutlar hücresel üzerinden tek yönlü, unut ve devam et şeklindedir** — bir dakika içinde yanıt görmezseniz cihaz çevrimdışı olabilir; tekrar denemeden önce genel bakışta Son sinyali kontrol edin
- **Etiketler ve tarifeler iki yerden gelir** — araç düzeyindeki etiketler (Etiketler paneli, Düzenle'de düzenlenebilir) model düzeyindeki etiketlerin (burada salt okunur, Araç Ayarları'nda ayarlanır) üzerine yazar / tamamlar
- **Harita kartı sadece en son pini gösterir** — iz için _Eylemler → Rota geçmişini görüntüle_ kullanın
