# Servis Uygulamasındaki Back-Office Araçları

Saha ekranlarının yanı sıra, Servis uygulaması bir dizi back-office aracı taşır: rota tekrar oynatma, analitik ve üç destek kuyruğu. Bu makale, her birinin uygulamadaki işlevini ve operatör gösterge panelindeki aynı özellikten nasıl farklılaştığını açıklar.

**Buradaki Replay Player hariç her şey sadece sahipler için mevcuttur** ve diğer operatörler için [navigasyon çekmecesinde](../basics/overview.md#navigasyon-çekmecesi) tamamen yoktur — tıklanabilir gri bir öğe bulunmaz.

## Replay Player

**Replay Player** (`/replay-player`), bir aracın bir gün boyunca gittiği yerleri yeniden oluşturur.

1. **Bir araç seçin.** Alfabetik olarak sıralanmış, önceden yüklenmiş 500 araca kadar araç listesi vardır. Bir etiketin veya IMEI'nin bir kısmını yazarak listeyi filtreleyin.
2. Takvimden **bir gün seçin**. Gelecekteki tarihler seçilemez.
3. Uygulama, o aracın tüm yerel gün için koordinatlarını yükler. Veri olmayan günlerde "Bu gün için veri yok" gösterilir.

### Harita

- Bölgeler altta çizilir
- Tüm rota, hızla renklendirilmiş ince soluk bir çizgi olarak görünür
- Zaten oynatılan kısım kalın bir iz olarak görünür
- Dönen yeşil bir üçgen araç konumunu işaret eder
- Günün başlangıcı ve sonu yeşil ve kırmızı işaretçilerle gösterilir

Varsayılan olarak bir **takip kamerası** açıktır: araçla birlikte hareket eder ve hız değiştikçe yakınlaştırmayı yumuşatır. Haritayı elle kaydırmak, yakınlaştırmak veya döndürmek takip kamerasını devre dışı bırakır — geri getirmek için günü yeniden yükleyin.

### Kontroller

| Kontrol            | Detaylar                                                                                 |
| ------------------ | --------------------------------------------------------------------------------------- |
| **Scrubber**       | Hızla renklendirilmiş, park etme, başlatma, hız uyarısı ve hız alarmı için olay rozetleri |
| **Zaman çizelgesi yakınlaştırması** | Yoğun bir günden kesin bir an seçmek için 1x ila 32x arası yakınlaştırma                  |
| **Oynatma hızı**   | 1, 2, 4, 8, 16, 32, 64, 128x                                                            |

Klavye kısayolları (web sürümünde kullanışlıdır):

- **Boşluk** veya **K** — oynat / duraklat
- **Sol / Sağ oklar** — 10 saniye ileri/geri; **Shift** ile bir dakika, **Alt** ile bir saat, **Ctrl** veya **Cmd** ile bir gün atla
- **Home / End** — günün başına veya sonuna atla
- **Yukarı / Aşağı oklar** — oynatma hızı ön ayarları arasında geçiş yap

Canlı veri afişi **Hız** ve **Mesafe** gösterir. Kontak, batarya, bağlantı ve GPS okumaları şu anda uygulamada mevcut değildir — alanlar gösterilir ancak veri içermez, bu nedenle boş olması veri kesintisi anlamına gelmez.

Daha kapsamlı oynatma aracı için — aynı anda birden fazla araç, sürüş başına tekrar oynatma, etiket filtreleme — gösterge panelindeki [Replay Player](../../apps/tools/replay-player.md) kullanın.

## Analitik

**Analitik** (`/analytics`, sadece sahipler) günlük KPI gösterge panelidir: gelir, sürüşler, mesafe, süre, bakiye yüklemeleri ve sürüş başına, kilometre başına ve dakika başına ortalama fiyat, her biri 30 günlük trend kıvılcımı ile, ayrıca metrik seçicili saatlik çubuk grafik.

İki detaylandırma, her ikisi de 7 günlük, 30 günlük ve 90 günlük ön ayarlarla:

| Detaylandırma                | Gösterdiği Bilgiler                                                    |
| --------------------------- | -------------------------------------------------------------------- |
| **`/analytics/payments`**   | Ödeme akışı, kalitesi, bakiye, ödeme yöntemleri ve en çok ödeyenler  |
| **`/analytics/heatmaps`**   | QR tarama, sürüş başlangıcı veya sürüş bitiş yoğunluğu (5.000 noktaya kadar) |

Gösterge panelinde bu raporların tam sürümleri vardır — bkz. [Payments report](../../analytics/reports/payments.md) ve [Heatmaps](../../analytics/reports/heatmaps.md).

## Destek — Biletler

**Destek** (`/support/tickets`, sadece sahipler) araç şikayet kuyruğudur.

- **Durumlar**: yeni, üçleme, işte, bilgi bekleniyor, çözüldü, reddedildi, yinelenen
- **Öncelik**: düşükten kritiğe
- **SLA geri sayım rozeti**: iki saatten az kaldığında turuncu, süresi geçince kırmızı olur

Bir biletin **araç** düğmesi o aracın sayfasını açar, böylece şikayet üzerinde hemen işlem yapabilirsiniz. **Bakım görevi** düğmesi uygulamanın Bakım ekranını açar, burada "Yakında" ekranıdır (aşağıya bakınız).

Tek bir araç için biletler ayrıca [araç sayfasındaki](../fleet/vehicle-controls.md#biletler-sekmesi) **Biletler** sekmesinde listelenir; burada **Tümünü Çöz** hepsini aynı anda kapatır. Filtreler, atama ve geçmiş ile tam kuyruk için gösterge panelindeki [Tickets](../../support/tickets-proofs-chat/tickets.md) kullanılır.

## Konuşmalar

**Konuşmalar** (`/support/dialogs`, sadece sahipler) sürücülerle canlı mesajlaşmadır: sohbeti almak için **Al** ve **Devral**, mesaj yazma alanı, yazıyor göstergesi ve mesaj başına 5 görsele kadar ek. Canlı bağlantı koparsa, uygulama her 15 saniyede bir yenilemeye geçer.

**Bu ekrandan yanıt göndermek şu anda uygulamada mümkün değildir.** Saha işinize yarıyorsa sohbetleri burada okuyun, ancak sürücülere yanıt vermek için gösterge panelindeki [Conversations](../../support/tickets-proofs-chat/conversations.md) sayfasını kullanın.

## Park Kanıtları

**Park kanıtları** (`/support/park-proofs`, sadece sahipler) sürücülerin çektiği fotoğrafların inceleme galerisi: başlangıç, park, bitiş ve selfie çekimleri. Her fotoğraf otomatik tahmin etiketi taşır — **park**, **park yok**, **sürüş yok** veya **belirsiz** — ve bir güven değeri ile. 1, 2 ve 3 sütunlu düzenler arasında geçiş yapmak için sıkıştırma hareketi yapın.

İnceleme işlemleri:

| Eylem                    | Ne Yapar                                           |
| ------------------------ | --------------------------------------------------- |
| **Onayla**               | Fotoğrafı iyi olarak işaretler                       |
| **Uyar**                 | Sürücüyü uyarır; yorum gerektirir                    |
| **Reddet** / **Para Cezası** | Yorum ve tutar gerektirir                            |
| **Engelle**              | Sürücüyü engeller; yorum gerektirir                  |
| **Yorumla Onayla**       | Onaylar ve isteğe bağlı promosyon kodu ekleyebilir  |

Bonus ile onaylama şu anda uygulamada mevcut değildir.

Gösterge Paneli'nin [Park Kanıtları](../../support/tickets-proofs-chat/park-proofs.md) kuyruğu tam moderasyon iş akışı, filtreler ve otomatik inceleme kurallarına sahiptir.

## Bakım ve Dengeleme

Servis uygulamasındaki `/maintenance` ve `/rebalancing` "Yakında" ekranlarıdır: veri yok, yapılandırılacak bir şey yok. **Dengeleme** ayrıca gezinme çekmecesinde **Yakında** rozetiyle görünür.

Bu, saha operatörüne yanıt verirken önemlidir: gösterge panelinin kendi gerçek bakım ve dengeleme özellikleri vardır ve bunlar bu ekranlardan tamamen farklıdır. Gösterge paneli bakım işlevselliğini, bir teknisyenin Servis uygulamasında kullanabileceği şekilde asla tanımlamayın.

## Yaygın sorunlar

| Belirti                                                        | Anlamı                                                            |
| -------------------------------------------------------------- | ----------------------------------------------------------------- |
| Tekrar Oynat afişi ateşleme veya batarya için boş gösteriyor   | Bu okumalar şu anda uygulamada mevcut değil — bir kesinti değil    |
| Tekrar Oynat bir gün için veri bulamıyor                       | Araç o gün hareket etmemiş veya rapor vermemiş olabilir — başka bir tarih deneyin |
| Analitik, Destek, Konuşmalar veya Park Kanıtları eksik         | Bunlar sadece sahipler için mevcuttur                             |
| Bir biletin bakım düğmesi "Yakında" ekranına gidiyor          | Bu uygulamada beklenen bir durum — bakım için gösterge panelini kullanın |
| Bir sohbet yanıtı gönderiliyor gibi görünüyor ama hiçbir şey olmuyor | Uygulamadan yanıt vermek şu anda mümkün değil — yanıtı gösterge panelinden verin |
| Park Kanıtlarında bonus ile onaylama kullanılamıyor             | Bu eylem şu anda mevcut değil                                     |

## İpuçları

- **Takip kamerası, bir günü incelemenin en hızlı yoludur** — oynatmayı 8x hızda başlatın ve sadece olay rozetlerinin olduğu yerde yavaşlatın.
- **Uygulamanın bilet kuyruğunu rota planlamak için kullanın**, ardından her araç sayfasından işlem yapın; uygulamanın gücü evrak işleri değil, yakınlıktır.
- **Moderasyon ve mesajlaşma işlerini gösterge panelinden yapın.** Uygulamanın bu kuyrukların kopyaları, sokaktayken bir şeylere bakmak içindir.
