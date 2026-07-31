# Scooter Bul — Bluetooth ile Araç Konumlandırma

**Scooter Bul** (`/finder`), son 30 metre içindir: GPS scooter'ın burada olduğunu söylüyor ama görünürde yok. Koordinatlar yerine, bulucu sizi Bluetooth sinyal gücüyle yönlendirir — GPS hassasiyeti tükendiğinde tam da ihtiyacınız olan budur.

Ekran, [navigasyon çekmecesinde](../basics/overview.md#navigasyon-çekmecesi) **Scooter Bul** olarak listelenir.

Akış dört aşamadan oluşur: **araç seç → ön kontrol → navigasyon → radar**.

## 1. Araç seçimi ve ön kontrol

1. **Scooter Bul**'u açın. Seçici, araçlarınızı etiketlerine göre sıralı listeler.
2. Aradığınız araca dokunun. Ön kontrol hemen başlar.

Ön kontrol, o araca ait güncel bir kopyayı (asla önbellekten değil) alır ve kullanılabilir son konumu ile izleyicisinin çevrimiçi olup olmadığını kontrol eder.

**Çevrimdışı bir izleyici sizi engellemez.** Bunun yerine bir ipucu alırsınız: son bilinen konum eski olabilir, ancak Bluetooth yaklaştığınızda scooter'ı bulabilir. Bu özelliğin tüm amacı budur — çevrimdışı uyarısını bir bilgi olarak değerlendirin, çıkmaz yol olarak değil.

## 2. Bulmaya Başlama ve izinler

**Bulmaya Başla**'ya dokunun. Bu tek dokunuş pusula erişimi ister ve ardından konum takibi, pusula ve Bluetooth taramasını birlikte başlatır.

Pusula isteği gerçek bir dokunuştan gelmelidir — bu yüzden izin istemini yanlışlıkla kapatırsanız, seçiciye geri dönün ve ekranda beklemek yerine yeni bir dokunuşla tekrar başlayın.

Scooter Bul konum, hareket ve Bluetooth izinlerine ihtiyaç duyar. **Bulmaya Başla** sonrası hiçbir şey olmazsa, bu üç izinden biri reddedilmiştir.

## 3. Navigasyon aşaması

Harita şunları gösterir:

- Sizden araca giden bir rota çizgisi
- Metre veya kilometre cinsinden mesafe etiketi
- Araca işaret eden bir pusula ibresi

Bluetooth bu aşamada zaten sessizce tarama yapar, yürürken herhangi bir şeyi açmanıza gerek yoktur.

## 4. Radar aşaması

Uygulama, scooter Bluetooth ile ilk kez algılandığında kendini radara geçirir ve "Scooter algılandı" bildirimi gösterir. Aşamalar elle değiştirilmez.

Radar, Bluetooth sinyalini soğuktan sıcağa doğru bir gradyan olarak gösterir — **soğuk uzak, sıcak yakın demektir** — ayrıca pusula yönü ve mesafeyi gösterir.

**Radar değerini mutlak olarak değil, hareketle okuyun.** Birkaç adım yürüyün ve gradyanın ısınıp ısınmadığını izleyin; soğuyorsa yönünüzü değiştirin. Pusula kararsızsa, ekran kalibrasyon için sekiz çizerek yürüyün der.

Sinyal göstergesi, yeni bir Bluetooth sinyali gelmezse yaklaşık 4 saniye sonra soğur; bu, engellerin arkasına geçtiğinizde normaldir. Scooter bir kez algılandıktan sonra radar arama boyunca kullanılabilir kalır.

## Bip

**Bip** düğmesi aracın konum bulucusunu seslendirir. Bipler arasında 10 saniyelik bekleme süresi vardır; bu süre boyunca düğme devre dışı kalır ve geri sayım gösterir.

Bu sınır kasıtlıdır: bir kez dokunun, sonra yürürken dinleyin. Durup durup bip sesi almak size yeni bir bilgi vermez.

## Yaygın sorunlar

| Belirti                                    | Ne Yapmalı                                                                                       |
| ------------------------------------------ | ------------------------------------------------------------------------------------------------ |
| Scooter hiç algılanmıyor                    | Bluetooth menzili kısadır — sabit durmak yerine alanı yürüyün. İzleyici çevrimdışıysa son GPS noktası eski olabilir |
| Radar hiç görünmüyor                        | Scooter Bluetooth ile hiç algılanmamış; radar için ilk sinyal gereklidir                          |
| Radar aniden soğuyor                        | Sinyal gelmeyince birkaç saniye sonra algılama temizlenir — yürümeye devam edin, tekrar algılar  |
| Pusula dönüyor veya yanlış yöne işaret ediyor | Sekiz çizerek kalibre edin, metal korkuluklar ve park halindeki araçlardan uzak durun             |
| **Bip** gri renkte ve kullanılamıyor       | 10 saniyelik bekleme süresi devam ediyor                                                          |
| **Bulmaya Başla** sonrası hiçbir şey başlamıyor | Konum, hareket veya Bluetooth izni reddedildi — izin verin ve seçiciden tekrar başlayın           |

## İpuçları

- **Önce aracın son sürüşü ve telemetrisini kullanın.** [Araç sayfasını](../fleet/vehicle-controls.md) açarak izleyicinin rapor verip vermediğini kontrol edin, yere inip yirmi dakika harcamadan önce.
- **Daire değil, düz bir hat üzerinde yürüyün.** 10 metrelik iki veya üç düz adım, yavaş dönmekten daha fazla yön bilgisi verir.
- **Bip ve radarı birleştirin** — radar size yönü verir, bip ise önünüzdeki üç scooter'dan hangisi olduğunu doğrular.
- **Bulduklarınızı rapor edin.** Araç hiç orada değilse, araç sayfasından durumunu (örneğin **İnceleme Gerekiyor** veya **Çalındı**) konumdayken ayarlayın.
