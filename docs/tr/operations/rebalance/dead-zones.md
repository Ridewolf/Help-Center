# Yeniden Dengeleme — Ölü Bölgeler

Ölü Bölgeler sayfası (`/rebalance/dead-zones`), **saha operasyonları hedefleme panosu**dur: envanterinizin nerede boşta durduğunu, bunun size ne kadar gelir kaybettirdiğini ve yeniden dengeleme aracını hangi bölgelere göndermeniz gerektiğini gösterir.

Zaman içinde saha ekibi faaliyetlerini özetleyen [Analytics — Rebalance](runs.md) sayfasının aksine, bu sayfa ileriye dönük bir bakış sunar: _şimdi nereye gitmeliyiz?_ sorusuna yanıt verir.

Gerekli izin: giriş yapmış operatör (rota sadece _requiresAuth_ zorunluluğu uygular, belirli bir izin ID'si gerektirmez).

## "Ölü bölge" ne demek

**Ölü bölge**, araçların çok uzun süre kiralanmadan park halinde kaldığı şehir alanıdır. Sayfa bu bölgeleri tespit eder ve saha personelinin hangi kümeleri önce dağıtması gerektiğini bilmesi için sıralar.

Sistem haritayı iki şekilde gruplamayı destekler:

- **Sahip bölgeleri** — [Ayarlar — Bölgeler](../../settings/infrastructure/zones.md) sayfasından yapılandırdığınız kendi çokgenleriniz
- **H3 ızgarası** — Uber'in altıgen ızgara döşemesi, daha ince taneli veya bölge bağımsız analiz için kullanılır

Geçiş filtresinde bulunur; tablo her iki durumda da aynı sütunları gösterir.

## KPI satırı (üst)

Beş KPI kartından oluşan bir satır, filtrelediğiniz ölü bölge durumunu özetler.

| KPI                 | Gösterdiği                                                                                  |
| ------------------- | ------------------------------------------------------------------------------------------ |
| **Ölü bölgeler**    | Şu anda ölü olarak işaretlenmiş bölge / hücre sayısı                                       |
| **Günlük kayıp**    | Günlük tahmini gelir kaybı — filtrelenen bölgelerdeki `lostRevenuePerDay` toplamı          |
| **Sıkışan cihazlar**| Ölü bölgelerde boşta kalan toplam cihaz sayısı — fiziksel toplama hedefiniz                |
| **Ortalama kalış**  | Ölü bölgelerde ortalama kalış süresi (dakika) — bir aracın hareket etmeden önce ne kadar kaldığı |
| **Haftalık ilerleme**| Geçen haftaya göre yüzde değişim — negatif = durum kötüleşiyor; pozitif = iyileşiyor         |

Her KPI filtrelerle güncellenir; listeye derinlemesine bakmadan önce tek sayı olarak hızlı kontrol için kullanın.

## Görünüm modları — Harita ve Tablo

Sağ üstteki bir geçiş, aynı verinin iki farklı sunumunu değiştirir:

- **Harita** — şehir üzerinde ölü bölgelerin coğrafi görünümü (şu anda _yakında gelecek_ yer tutucu)
- **Tablo** — aşağıdaki veri ızgarası, tüm sütunlar ve satır bağlamıyla

Filtreler her iki görünümde de geçerlidir. _Tablo_ varsayılandır; _Harita_ bağlıdır ancak coğrafi renderlama hâlâ yapım aşamasındadır.

Bir _Otomatik yenileme_ kontrolü görünüm geçişinin yanında bulunur — bunu açarak verileri belirli aralıklarla yeniden sorgulayabilirsiniz (canlı operasyonlar için faydalıdır).

## Filtreler

Filtre bloğunda dört kontrol vardır; hepsi VE mantığıyla birlikte çalışır:

| Filtre         | Tür       | Notlar                                                                             |
| -------------- | --------- | --------------------------------------------------------------------------------- |
| **Şehir**      | Açılır liste | _Tüm şehirler_ / _Moskova_ / _Saint Petersburg_ — tek bir işletme şehrine daraltır |
| **Şiddet**     | Açılır liste | _Tümü_ / _Düşük_ / _Orta_ / _Yüksek_ / _Kritik_ — bölge şiddet puanına göre       |
| **Bölge türü** | Açılır liste | _Sahip bölgeleri_ / _H3 ızgarası_ — hangi döşemenin kullanılacağı                   |
| **Arama**      | Metin      | Serbest metin — bölge adı / ilçe ile eşleşir                                     |

Filtre kartının sağındaki _Hepsini Temizle_ düğmesi tüm kontrolleri tek tıkla sıfırlar.

## Sütunlar

Tablo görünümünde dokuz sütun vardır. Bir satıra tıklayarak bölge bilgi çekmecesini açabilirsiniz (şu anda bölge adını gösteren bir toast yer tutucu olarak kullanılıyor).

| Sütun                | İçerik                                                                                          |
| -------------------- | ---------------------------------------------------------------------------------------------- |
| **Bölge / Hücre**    | Bölge adı ve altında şehir ile ilçe; H3 modunda bu altıgen ID'sidir                             |
| **Boşta kalma oranı** | Bölgedeki boşta cihazların zaman yüzdesi, renk kodlu: yeşil `< %25`, sarı `25–40%`, kırmızı `≥ %40` |
| **Kalış süresi**      | Dakika cinsinden medyan kalış süresi, altında _p90_ değeri                                    |
| **Ortalama boşta cihaz** | Bölgedeki ortalama boşta araç sayısı, karşılaştırma için _Hedef_ arz ile birlikte             |
| **Başlangıçlar**      | Bölgedeki sürüş başlangıçları _son 24saat_ / _son 7gün_ / _son 30gün_                         |
| **Dönüşüm**          | Boşta cihaz başına saatlik başlangıç sayısı — yeşil `≥ 0.30`, sarı `0.15–0.30`, kırmızı `< 0.15` |
| **Fazla arz**         | Hedefin üzerindeki cihaz sayısı — pozitif = fazla, negatif = az; pozitif kırmızı gösterilir  |
| **Günlük kayıp**     | Sadece bu bölge için tahmini günlük gelir kaybı                                              |
| **Son boşta görülme**| Bölgenin en son boşta cihaz gördüğü zaman — yerel ayarınıza göre biçimlendirilmiş             |

Satırlar tıklanabilir; sütun sıralaması bu sürümde henüz etkin değil.

## Satır eylemleri

Her satırın bir tıklama işleyicisi vardır; şu anda bölge adını gösteren bir toast açar. Tam **eylem menüsü (satır başına)** kodda uygulanmıştır ancak API beklenirken devre dışıdır. Planlanan eylemler aşağıda referans için listelenmiştir — etkinleştirildiğinde her satırın en sağında üç nokta menüsünde görünecektir:

| Planlanan eylem          | Ne yapacak                                                             |
| ------------------------ | --------------------------------------------------------------------- |
| **Çalışma oluştur**      | Bu bölge ile önceden doldurulmuş dengeleme çalışma oluşturucusunu açar |
| **Park süresi sınırı belirle** | Bölge içindeki maksimum park süresini sıkılaştırır                   |
| **Dinamik fiyatlandırma**| Burada başlayan veya biten sürüşleri çekmek veya caydırmak için fiyat kolları uygular |
| **Bölge düzenlemesi**    | Bölge sınırını düzenle (böl, birleştir, şekillendir)                   |
| **Park yasağı olarak işaretle** | Araçları dışarı itmek için bölgeyi park yasağına dönüştürür          |
| **Arz hedefini azalt**   | Sistem buraya araç göndermeyi durdursun diye cihaz hedefini düşürür   |
| **A/B deneyi**           | Bir iyileştirme stratejisi üzerinde kontrollü deney kurar             |

Uç nokta yayınlanana kadar, tabloyu **yalnızca okunabilir bir içgörü yüzeyi** olarak değerlendirin — araçları bireysel olarak eyleme geçirmek için Araçlar listesiyle eşleştirin.

## Boş / yükleniyor durumları

- **Yükleniyor** — arka uç sorgulanırken "Ölü bölgeler yükleniyor…" yazılı bir dönen simge
- **Hata** — istek başarısız olursa _Tekrar Dene_ butonlu bir _Uyarı_ afişi
- **Boş** — ortalanmış bir _UyarıÜçgeni_ simgesi ve "Ölü bölge yok" metni; bu, uç noktanın veri döndürmediği için **bugünün beklenen durumu**

## Tipik iş akışları

- **Sabah planlaması** — Tabloyu _Günlük kayıp_ sütununa göre sırala (görsel olarak, bugün; sıralanabilir sütunlar yakında): bugünün çalışmalarına atamak için en iyi 3 bölgeyi seç
- **Şiddet üçlemesi** — Sadece en kötü suçluları görmek için _Şiddet = Kritik_ filtresi uygula, sonra bağlam için her bölgeyi aç
- **Şehir bazlı operasyonlar** — Çok şehirli operasyonlarda _Şehir_ filtresi uygula; kayıp sayısını ve toplam geliri ayrı ayrı incele
- **Filoyla çapraz kontrol** — KPI satırındaki _Sıkışan cihazlar_ sayısını kullan, sonra gerçek araçları görmek için bölgeye göre filtrelenmiş [Araçlar listesine](../fleet/vehicles.md) atla
- **Analitikle eşleştir** — Buradaki canlı sayıyı [Analitik — Dengeleme](runs.md) ve [Araç analitiği](../../analytics/reports/vehicles.md) Ölü Bölgeler / Boşta Cihazlar bölümleriyle karşılaştırarak trendi doğrula

## İpuçları

- **Dönüşüm en operasyonel sütundur** — düşük dönüşüm (kırmızı) ve yüksek aşırı arz, bölgeyi dengelemenin _yardımcı olmayacağı_ anlamına gelir; doğru arz var ama talep yok
- **Boşta oranı ve ortalama boşta cihazlar** — _boşta oranı_ zaman ağırlıklıdır (bölgenin ne sıklıkta boşta olduğu), _ortalama boşta cihazlar_ sayısal ağırlıklıdır (orada kaç tane var). İkisinin de kırmızı olması = en güçlü ölü bölge sinyali
- **_Ortalama boşta cihazlar_ altındaki _Hedef_ bölge yapılandırmasından gelir** — yanlış ayarlanmışsa, her bölge ölü görünecektir; [Ayarlar — Bölgeler](../../settings/infrastructure/zones.md) içinde çapraz kontrol edin
- **H3 ızgarası, bölgesiz şehirler için faydalıdır** — operatör bölgeleri henüz tanımlanmadığında, H3 size varsayılan coğrafi kova sağlar
- **Haftalık ilerleme sayfanın "kazanıyor muyuz" göstergesidir** — ölü bölge sayısı artarken kaybedilen gelir azalıyorsa, saha ekibi en yüksek değerli bölgelerle ilk olarak ilgileniyor (iyi bir işaret)
- **Eylem işleyicileri şimdilik taslaktır** — bir satıra tıklamak şu anda sadece bilgi tostu gösterir; gerçek çekmece / diyaloglar arka uç hazır olduğunda gelir
