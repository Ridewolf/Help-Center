# Tekrar Oynatıcı

Tekrar Oynatıcı (`/apps/replay-player`), bir aracın GPS izini bir gün boyunca veya tek bir sürüşün tam rotasını harita üzerinde canlandıran adli bir araçtır. Olayları araştırmak, sürücü iddialarını doğrulamak, olağandışı rotaları denetlemek veya sadece filonun hareketini izlemek için kullanın.

Bu gerçek zamanlı bir harita değildir (bunun için Realtime gösterge paneline bakın) — arka uçtan **tarihi** koordinatları tam zaman çizelgesi kaydırıcısıyla tekrar oynatır.

Gerekli izin: **Tekrar Oynatıcı** (`k7m8n9`).

## Düzen

Sayfa, sol tarafta bir yan panel (seçiciler + bilgi panelleri) ve altında bir kontrol çubuğu bulunan büyük bir harita alanına bölünmüştür:

| Bölge       | Genişlik | İçerik                                                               |
| ------------ | -------- | ------------------------------------------------------------------- |
| **Yan panel**  | 320 px   | Seçici sekmeleri (Araç Bazında / Sürüş Bazında), araç başına bilgi paneli |
| **Harita**    | esnek    | Rota polilini, başlangıç / bitiş işaretçileri, canlı imleç içeren MapLibre haritası |
| **Kontroller** | alt      | Oynat / duraklat, hız açılır menüsü, zaman çizelgesi kaydırıcısı, geçen / toplam süre gösterimi |

## Kontroller (yan panel)

Yan panel **neyin** oynatılacağını belirler. Seçim modelini değiştiren iki sekmesi vardır.

### Araç Bazında sekmesi

Bir veya daha fazla aracın tam günlük izini (veya seçtiğiniz herhangi bir tarihi) oynatın:

- **Araçlar** — en fazla **5** aracı çoklu seçin. Arama yapmak için yazın, aşağıdaki açılır menüden etiketlere göre listeyi filtreleyin.
- **Tarih** — takvim açılır penceresi; varsayılan olarak bugündür. Tekrar oynatma seçilen tarihin yerel saat gününün tamamını kapsar.
- **Etiketler** — araç açılır menüsünü seçilen etiketlerden herhangi birini taşıyan araçlarla sınırlandırır. Büyük filolar için faydalıdır.
- **Yükle** — seçilen tüm araçlar için günün koordinatlarını paralel olarak getirir ve görüntüler.

Birden fazla araç yüklendiğinde, her biri haritada kendi polilini (hıza göre renklendirilmiş) ve hareket eden kendi işaretçisine, ayrıca yan panelde özel bir bilgi kartına sahip olur.

### Sürüş Bazında sekmesi

Tam gün yerine tek bir sürüşün koordinatlarını oynatın:

- **Araç** (isteğe bağlı) — tek seçim; aşağıdaki sürüş listesini daraltır
- **Tarih** (isteğe bağlı) — takvim açılır penceresi; sürüşleri tek bir güne filtreler. Tüm tarihleri görmek için temizleyin.
- **Etiketler** (isteğe bağlı) — sürüş listesini araç etiketlerine göre filtreler
- **Sürüş listesi** — yukarıdaki filtrelere uyan sürüşlerin kaydırılabilir, sayfalı listesi. Her kart başlangıç zamanı, durum göstergesi, süre ve mesafeyi gösterir.

Bir sürüş kartına tıklamak, koordinatlarını hemen otomatik olarak yükler — ayrı bir Yükle düğmesine gerek yoktur.

## Zaman Çizelgesi (alt çubuk)

Kontrol çubuğu haritanın altında yer alır:

| Kontrol            | Ne yapar                                                                                  |
| ------------------ | ----------------------------------------------------------------------------------------- |
| **Oynat / Duraklat** | Animasyonu başlatır veya duraklatır                                                      |
| **Hız açılır menüsü** | Oynatma hızı çarpanını seçin (aşağıya bakınız)                                           |
| **Zaman çizelgesi kaydırıcısı** | Tekrar oynatmadaki herhangi bir noktaya kaydırın; harita anında güncellenir          |
| **Geçen / Toplam**  | `dd:ss` (veya bir saatten uzun ise `s:dd:ss`) — geçen ve toplam tekrar oynatma süresi      |

Birden fazla araç yüklendiğinde, kaydırıcı tüm izlerin birleşiminin **küresel** başlangıç ve bitiş zamanını kapsar. Henüz başlamamış izlerin haritada işaretçisi olmaz.

## Harita

Harita, mevcut temanızın harita stilini kullanır ([Themes](../../features/ux/themes.md) bakınız). Yüklenen her iz için:

- Hıza göre renklendirilmiş bir **polilin** çizilir — yavaş için yeşil, orta için turuncu, hızlı için kırmızı
- İlk noktaya bir **yeşil Başlangıç işaretçisi** yerleştirilir
- Son noktaya bir **kırmızı Bitiş işaretçisi** yerleştirilir
- Zaman çizelgesi oynadıkça bir **araç işaretçisi** çizgi boyunca hareket eder

Harita kontrolleri sağ üst köşede (dikey yığın) bulunur:

| Düğme             | Ne yapar                                                                                   |
| ----------------- | ------------------------------------------------------------------------------------------ |
| **Yakınlaştır / Uzaklaştır** | Standart harita yakınlaştırma                                                        |
| **Yönü sıfırla**  | Haritayı kuzey yukarı döndürür, eğer eğilmiş / döndürülmüşse                             |
| **Sınırları sığdır** | Uzun bir tekrar oynatma sonrası kameranın kaydığı durumlarda tüm rotayı görünür yapar     |
| **Tam ekran**     | Haritayı tam ekran yapar; kontrol çubuğu altta kalır                                     |

## Oynatma hızı

Hız açılır menüsü sekiz ön ayar sunar: **1x, 2x, 4x, 8x, 16x, 32x, 64x, 128x**.

- **1x** tekrar oynatmayı gerçek zamanlı oynatır — 20 dakikalık bir sürüş 20 dakika sürer
- **128x** 8 saatlik bir günü yaklaşık 4 dakikaya sıkıştırır
- Hız oynatma sırasında değiştirilebilir; animasyon kaldığı yerden sorunsuz devam eder

Tam günlük araç tekrarları için yüksek hızları (32x / 64x / 128x), sürücünün her saniyede tam olarak nerede olduğunu görmek istediğiniz sürüş adli incelemeleri için düşük hızları (1x / 2x / 4x) kullanın.

## Araç başına bilgi paneli

Yüklenen her araç için yan panelde, tekrar oynatma sırasında canlı güncellenen küçük bir kart bulunur:

| Alan            | Gösterdiği Bilgi                                                          |
| --------------- | ------------------------------------------------------------------------- |
| **Hız**         | Şu anki enterpolasyonlu hız km/s cinsinden (renk kodlu: yeşil / sarı / kırmızı) |
| **Koordinatlar** | Şu anki enlem / boylam, 6 ondalık basamağa kadar                         |
| **Mesafe**      | Şimdiye kadar kat edilen kümülatif mesafe km cinsinden (haversine, istemci tarafında hesaplanır) |
| **Nokta**       | Şu anki nokta indeksi / toplam noktalar (veri setinde ne kadar ilerlediği) |

Oynatma başlamadığında veya veri yüklenmediğinde, kart tireler gösterir.

## Boş / yükleniyor durumları

- **Seçim yok** — harita alanında bir oynat simgesi ve "Tekrar oynatmayı başlatmak için bir araç ve tarih ya da sürüş seçin" istemi görünür
- **Yükleniyor** — haritanın ortasında "Koordinatlar yükleniyor..." yazan bir dönen simge belirir
- **Veri yok** — seçilen tarih / sürüş için koordinat noktası yoksa, bir uyarı bildirimi "Bu seçim için koordinat verisi bulunamadı" der ve harita boş kalır
- **Harita parçası yüklenemedi** — harita tembel yüklenen bir parça (~1 MB); yükleme başarısız olursa (eski dağıtım, çevrimdışı), yenilemeniz için bir hata bildirimi görürsünüz

## Tipik iş akışları

- **Bir şikayeti inceleyin** — Sürüşe göre moduna geçin, sürücünün sürüşünü arayın, tıklayın → rotayı 4x hızda izleyerek iddia edilenle gerçek gidiş arasındaki farkı görün
- **"Kayıp" bir aracı denetleyin** — Araç modunda, birimi seçin, bugünün tarihini ayarlayın → tüm günü saniyeler içinde görmek için 128x hızda oynatın; son işaretçi konumu aracın şu anki yeridir
- **İki aracı karşılaştırın** — Araç modunda, benzer rotalar kullanan iki birimi seçin, aynı tarih → her iki polilin ve işaretçiler birlikte görselleştirilir
- **Bir olay zamanını belirleyin** — bir sürüş yükleyin → kaydırıcıyı bilet / günlük zaman damgasına sürükleyin → bilgi panelinden koordinatları okuyun
- **Hız ihlali tespit edin** — bir aracın gününü yükleyin → **kırmızı** polilin segmentlerini arayın → doğrulamak için kaydırıcıyı o bölgeye sürükleyin

## İpuçları

- **En fazla 5 araç** aynı anda — kullanıcı arayüzü, harita performansını korumak için çoklu seçimi sınırlar. Daha fazlası için ayrı oturumlar açın.
- **Uzun tekrar oynatmadan sonra Fit Bounds kullanın** — oynatma işaretçiyi takip eder, bu da kamerayı kaydırır; Fit Bounds’a bir tıklama tüm rotayı yeniden çerçeveler.
- **Hız renkleri tarifeye bağlı değildir** — bunlar sadece gözlemlenen GPS hızına göre görsel ipuçlarıdır (>15 km/s sarı, >30 km/s kırmızı). Bağlam için araç detay sayfasındaki _hız modu_ ile karşılaştırın.
- **Kaydırıcı her iki yönde de çalışır** — geri sürükleyerek geri sarabilirsiniz. Düşük hızla birlikte kullanarak zor segmentlerde adım adım ilerleyin.
- **URL durumu yok** — seçimler URL’ye kaydedilmez, bu yüzden derin bağlantı paylaşamazsınız. Anı kaydetmek için ekran görüntüsü alın.
- **[Ride Detail](../../operations/trips/ride-detail.md) sayfasıyla eşleştirin** — sürüş detayı statik bir rota haritası ve zaman çizelgesi olayları içerir; tekrar oynatıcı buna zaman boyutunu ekler.
