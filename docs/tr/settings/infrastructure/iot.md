# IoT Cihazları

IoT sayfası (`/iot`), **donanım envanteri**dir — filonuzun sahip olduğu her izleyici / kilit birimi, şu anda bir araca takılı olup olmadığına bakılmaksızın. Her satır, **IMEI** ile tanımlanan bir fiziksel cihazdır ve son ping'den alınan canlı telemetri (çevrimiçi durumu, GPS konumu, GSM sinyali, pil durumu) ile güncellenir.

Bu, [Araçlar](../../operations/fleet/vehicles.md) sayfasının cihaz tarafı yansımasıdır: IoT olmayan bir araç izlenemez veya kontrol edilemez; araca bağlı olmayan bir IoT ise sadece rafta duran atanmamış bir donanımdır.

Gerekli izin: **IoT Cihazları** (`n8p9q9`). Alt izinler `edit` / `send-command` / `delete` ve toplu _Araç oluştur_ işlemi `operations.vehicles.create` izninden yararlanır.

## Cihazlar buraya nasıl gelir

Cihazlar otomatik keşfedilmez — gönderim aldıkça kaydedersiniz:

1. **Satın alma** — IoT birimlerini bir satıcıdan (Omni, Segway, Okai vb.) satın alırsınız. Her birimin kutusunda / etiketinde benzersiz bir **IMEI** bulunur
2. Burada **+ Oluştur** — Ad, IMEI, Satıcı, Durum girilir. Cihaz artık envanterde ama bağlı değil
3. **Bir araca bağlama** — [Araç Oluştur / Düzenle](../../operations/fleet/vehicle-create-edit.md) sayfasından cihaz seçici ile bu IoT seçilerek yapılır. Bir araç için bir IoT, bir IoT için bir araç
4. Cihaz SIM ile açılıp Ridewolf'un MQTT aracısına bağlandığında **telemetri akışı başlar**. Liste en güncel anlık görüntüyü gösterir — yenile veya Otomatik Yenilemeyi bekle

Alternatif olarak, aşağıdaki **Araç oluştur** toplu işlemi ile seçilen her IoT için tek seferde yeni bir araç oluşturabilirsiniz (örneğin yeni bir scooter partisi devreye alındıktan sonra).

## Filtreler

| Filtre  | Tür       | Notlar                                      |
| ------- | --------- | ------------------------------------------- |
| Ara     | Metin     | Ad ve IMEI üzerinde eşleşir                  |
| Durum   | Açılır    | `Tümü` / `Aktif` / `Pasif` / `Arşivlendi`  |

Filtreler URL ile senkronizedir (yenileme görünümünüzü korur) ve filtre çubuğundaki Temizle bağlantısıyla varsayılanlara sıfırlanır.

## Sütunlar

| Sütun           | Sıralanabilir? | İçerik                                                                 |
| --------------- | ------------- | --------------------------------------------------------------------- |
| **Ad**          | evet          | Cihaz adı + kısa kimlik; detay sayfasını açmak için satıra tıklayın    |
| **Kilit**       | —             | Son MQTT komutundan kilit durumu göstergesi (Kilitli / Kilitsiz)       |
| **Çevrimiçi**   | —             | Son ping tazelik penceresindeyse yeşil nokta; eskiyse kırmızı         |
| **GPS**         | —             | Geçerli / Geçersiz konum göstergesi                                   |
| **GSM**         | —             | Sinyal gücü (0-32 ölçeği, kırmızı ≤10, sarı ≤20, yeşil ≤32)           |
| **Pil**         | evet          | Renkli çubuklu pil yüzdesi                                            |
| **Durum**       | evet          | `Aktif` / `Pasif` / `Arşivlendi` göstergesi                           |
| **Son Sinyal**  | evet          | Son telemetri paketinden geçen süre (göreceli, örn. "5 dk önce")    |

## Satır işlemleri

Her satırda üç noktalı menü. Kullanılabilir işlemler izinlere bağlıdır:

| İşlem              | İzin       | Ne yapar                                                                 |
| ------------------ | ---------- | ----------------------------------------------------------------------- |
| **Detayları görüntüle** | —          | Cihaz detay sayfasını açar (Detaylar / Aktivite / Komutlar / Geçmiş sekmeleri) |
| **Konumu görüntüle**    | —          | Son bilinen GPS koordinatlarını Google Haritalar'da açar (yeni sekme)    |
| **Düzenle**             | `edit`     | Düzenleme formunu açar (Ad / IMEI / Satıcı / Durum)                     |
| **Sil**                 | `delete`   | Cihaz kaydını siler. Onaylama 3 saniyelik gecikme ile kilidi kaldırır   |

## Toplu işlemler

Birden fazla satır seçmek için başlık onay kutusunu veya satır başına kutuları kullanın; toplu çubuk görünür. İşlemler izinlere bağlıdır — yapamadıklarınız gizlenir, gri gösterilmez:

| İşlem                      | İzin              | Ne yapar                                                                                                         |
| -------------------------- | ----------------- | ---------------------------------------------------------------------------------------------------------------- |
| **Araç oluştur**           | `vehicles.create` | Seçilen her IoT için şirket ön ekinizle otomatik adlandırılmış yeni araç oluşturur; araç modeli ve isteğe bağlı etiket seçin |
| **Durum değiştir**          | `edit`            | Seçilenlerin tümü için Aktif / Pasif / Arşivlendi ayarlar                                                        |
| **Bağlantıyı test et (Bip)** | `send-command`    | Her cihaza `Beep` komutu gönderir — birimleri fiziksel olarak depoda bulmak için kullanışlı                      |
| **Komut gönder**            | `send-command`    | İlk seçimin satıcısından bir komut seçer (ön ayarlı veya gelişmiş çok adımlı prosedür) ve hepsine gönderir        |
| **Sil**                    | `delete`          | Onay diyaloğuyla toplu silme (3 saniyelik onay gecikmesi)                                                        |

Toplu işlemler sıralı olarak ilerleme ile (`işlendi / toplam`) ve başarısız öğeler paneli ile çalışır — kısmi başarı normaldir, başarısız cihazlar seçili kalır, böylece yeniden deneyebilir veya inceleyebilirsiniz.

## Detay sayfası

Bir satıra (veya _Detayları görüntüle_'ye) tıklamak cihaz detay sayfasını açar. Dört sekme:

- **Detaylar** — Gömülü Google Maps önizlemesi ile IMEI / Satıcı / Durum / koordinatlar; tam telemetri bloğu (hız modu, GPS geçerliliği, GSM ham değeri, pil, kilitli durum)
- **Aktivite** — bu cihaz için genel aktivite günlüğü (`entity-type=iot`)
- **Komutlar** — satıcıya duyarlı komut gönderici. Aynı motor [Araç Detayı](../../operations/fleet/vehicle-detail.md) Komutlar sekmesinde kullanılır — prosedür / gelişmiş akış için o makaleye bakın
- **Geçmiş** — telemetri geçmişi / paket günlüğü

Başlık, bağlı Araç varsa bir çip olarak gösterir — tıklayınca o aracın detay sayfasına atlar. Başlıkta bir **Eylemler** açılır menüsü Düzenle / Google Maps'te Görüntüle / Sil seçeneklerini sunar.

## Oluştur / Düzenle formu

IoT formu (`+ Oluştur` veya _Düzenle_) dört alan içerir, hepsi zorunludur:

- **Ad** — listelerde göreceğiniz kısa etiket (ör. `SCOOTER-014`). Serbest metin
- **IMEI** — cihazın benzersiz donanım kimliği (bir aracı bağlamak ve MQTT trafiği almak için kullanılır). Bir kez ayarlandıktan sonra değişmez olarak kabul edin — dağıtılmış bir cihazda değiştirmek, araç bağlaması güncellenene kadar telemetriyi bozacaktır
- **Satıcı** — üretici dizesi (ör. `omni`, `segway`). Cihazın hangi komut setini anladığını belirler — tam ve doğru yazın, satıcı araması büyük/küçük harfe duyarlıdır
- **Durum** — `Aktif` (varsayılan) / `Pasif` (araç bağlama için seçimde gizli) / `Arşivlendi` (emekli donanım)

Burada araca bağlama için satır içi form yok — bu yön araç Oluştur / Düzenle formunun sorumluluğundadır.

## Tipik iş akışları

- **50 adet izleyici sevkiyatını kaydetmek** — Her birini oluşturun (veya CSV yüklemesi ile içe aktarın, varsa) → hepsini seçin → doğru araç modeli ile _Araç oluştur_ → tamam; her IoT artık QA için hazır `needs_investigation` durumunda eşleşmiş bir araca sahiptir
- **Depoda kayıp bir birimi bulmak** — Ad/IMEI ile filtreleyin → satır eylemi _Bağlantıyı test et (Bip)_ veya toplu Bip → etrafta dolaşıp dinleyin
- **Arızalı cihazı emekliye ayırmak** — Düzenle → Durum = Arşivlendi olarak ayarlayın (Silmeyin — Aktivite günlüğü korunur). Eğer araç bağlıysa, önce Araç düzenleme formundan bağlantıyı kaldırın
- **Satıcı genelinde komut dağıtımı** (ör. firmware ayarı) — Ad kalıbı veya telemetri ile filtreleyin, eşleşen tümünü seçin → _Komut gönder_ → satıcı komutunu seçin ve ilerlemeyi izleyin
- **"Hayalet" aracı araştırmak** (çevrimiçi ama kayıp) — Konumu görüntüleyin → GPS Geçersiz ise Bip deneyin; hala sessizse SIM / pil şüphesi
- **Telemetriyi etkinliklerle karşılaştırmak** — bu IoT'nin aracı ile filtrelenmiş [Etkinlikler raporu](../../analytics/reports/events.md) açarak donanım durumu ile platform aktivitelerini ilişkilendirin

## İpuçları

- **IMEI her yerde birleştirme anahtarıdır** — araç bağlama, MQTT yönlendirme, destek biletleri. Bir kez yazın, sonsuza kadar kopyalayın
- **Satıcı alanı yapısaldır, kozmetik değil** — Komutlar sekmesindeki komut kataloğunu belirler. `omni`yi `Omni` olarak yanlış yazmak boş komut listesiyle sonuçlanabilir
- **Çevrimiçi ≠ Aktif** — Çevrimiçi canlı telemetri sinyalidir; Durum ise yönetici bayrağıdır. Aktif bir cihaz Çevrimdışı olabilir (pil bitmiş, GSM yok); Arşivlenmiş bir cihaz kapatılana kadar ping göndermeye devam edebilir
- **Toplu Komut Gönderme ilk satırın satıcısını kullanır** — seçiminiz karışık satıcılar içeriyorsa, tek satıcılı partilere bölün yoksa kafa karıştırıcı komut listesi alırsınız
- **Araç oluşturma kasıtlı olarak `needs_investigation` araçlar yaratır** — canlıya geçmeden önce bağlamanın doğru olduğunu insan onaylamalıdır. Oluşturma sırasında toplu etiketleme sonraki QA geçişini kolaylaştırır
- **"Zorla yeniden eşle" düğmesi yoktur** — değişim sonrası telemetri durursa, bu sayfa yerine Araç → IoT bağlamasını (Araç düzenleme) ve cihazın SIM / gücünü kontrol edin
- **Arşivlenmiş cihazlar IMEI ile aranabilir kalır** — eski bir birim tamirden döndüğünde ve yeniden canlandırmanız gerektiğinde kullanışlıdır (Aktif'e geri alın)
- **Son Sinyal en hızlı sağlık kontrolüdür** — azalan sırada sıralayın, eski cihazları önce bulun; Aktif satırda 24 saati geçen her şey incelenmeye değerdir
