# Analitik — Isı Haritaları

Isı Haritaları sayfası (`/analytics/heatmaps`), **coğrafi yoğunluk görselleştiricisidir**: bir veri kaynağı, tarih aralığı ve görselleştirme modu seçin — harita, işletme alanınızdaki etkinliğin nerelerde yoğunlaştığını gösterir.

Bunu **talep keşfi** için kullanın (sürücüler nereden başlamak istiyor? nerede bitiriyorlar?) ve **kapsama planlaması** için (sürücüler nerelere bakıyor ama araç yok?).

## Veri kaynakları

Üç sinyal kaynağı, aynı anda biri:

| Kaynak          | Ne gösterir                                                             |
| --------------- | ----------------------------------------------------------------------- |
| **Tarama**      | Sürücülerin **uygulamayı açıp araç aradığı yerler** — talep niyeti       |
| **Sürüş başlangıçları** | Sürüşlerin **gerçekten başladığı yerler** — dönüşmüş talep           |
| **Sürüş bitişleri** | Sürüşlerin **bittiği yerler** — doğal iniş noktaları                    |

_Tarama_ ile _Sürüş başlangıçları_'nı karşılaştırarak **karşılanmamış talebi** bulun: sürücülerin baktığı ama araç bulamadığı yerler.

## Görselleştirme modları

Aynı veriyi çizmenin dört yolu:

| Mod           | Ne çizer                                                                       |
| ------------- | ------------------------------------------------------------------------------ |
| **Isı haritası**  | Klasik yumuşak ısı bulanıklığı — **zirveleri hızlıca görmek** için en iyisi     |
| **Altıgenler**   | Altıgen kutular — **bölgeleri tutarlı geometride karşılaştırmak** için en iyisi |
| **Kümeler**     | Yakınlaştırınca genişleyen nokta kümeleri — **bireysel noktalara inmek** için en iyisi |
| **Izgara**      | Düzenli kare ızgara — **planlama bölgeleriyle hizalamak** için en iyisi         |

Aynı kaynak verisi farklı modlarda farklı hikayeler anlatabilir — araştırırken modlar arasında geçiş yapın.

## Renk şemaları

Küçük renk örnekleri satırı renk şemasını seçmenizi sağlar — renk körü operatörler veya marka paletine uyum için faydalı. Şema adı üzerine gelince araç ipucunda görünür.

## Nokta kaydırıcısı

Araç çubuğundaki kaydırıcı, kaç veri noktası örnekleyeceğinizi kontrol eder (örneğin 1k / 10k / 100k). Daha fazla nokta = daha doğru yoğunluk resmi ama daha yavaş çizim. Keşfederken düşük başlayın, alan/aralığı daralttığınızda artırın.

## Tarih aralığı

Üstte standart tarih aralığı çubuğu. Aralık ne kadar genişse, resim o kadar toplulaşır; "bu sabah ne oldu" için birkaç saat seçin.

## Harita

Harita sayfayı doldurur. Standart harita kontrolleri (kaydırma, yakınlaştırma, katman değiştirme). Isı haritası katmanı harita tabanının üstünde yer alır.

Bir köşedeki **açıklama** aktif modun renk skalasını açıklar — düşükten yükseğe yoğunluk.

## Tipik iş akışları

- **Karşılanmamış talebi bulun** — Kaynak = Tarama, Mod = Isı haritası → sıcak bir alan tespit edin → Kaynağı Sürüş başlangıçları olarak değiştirin → aynı alan soğuksa = karşılanmamış talep → o alanı dengeleme veya genişletmeyi düşünün
- **Yeni bölge planlayın** — Kaynak = Sürüş bitişleri, Mod = Altıgenler → mevcut bölgelerinizin dışındaki doğal iniş yoğunluklarını arayın → operasyonlara önerin
- **Sıcak noktaya inin** — Mod = Kümeler → sıcak alana yakınlaştırın → bireysel noktalar tam enlem/boylam gösterir; sürüş detayları için [Araç Arama](vehicles.md) ile çapraz kontrol yapın
- **Zaman dilimlerini karşılaştırın** — sabah Tarama verisini yükleyin → ekran görüntüsü alın → akşam Tarama verisine geçin → ekran görüntülerini yan yana karşılaştırın (gösterge paneli henüz çift dönem görünümü yapmıyor; manuel dışa aktarım gerekli)
- **Kapsama denetimi** — Kaynak = son hafta Tarama → planlanmış bölgeden uzak sıcak noktalar arayın → bölge sınırlarını yeniden çizme düşünün

## İpuçları

- **Tarama ≠ sürüşler** — birçok tarama dönüşmez (sürücü araç görmez, fiyat görür, vazgeçer). Tarama ile Sürüş başlangıçları arasındaki fark en eyleme geçirilebilir sinyalinizdir
- **Isı haritası modu ölçeği gizler** — renkler görünür harita içinde görecelidir; yakınlaştırma resmi değiştirir. Altıgenler modu sabit yakınlaştırmada daha dürüsttür
- **Az noktayla başlayın, çok noktayla bitirin** — 1k noktayla keşfetmek hızlıdır; neye baktığınızı anladıktan sonra 100k'ya çıkın
- **Planlama için Izgara modu** — bölgeleriniz dikdörtgensi ise Izgara onlarla hizalanır ve hesaplamayı kolaylaştırır; aksi halde Altıgenleri tercih edin
- **Renk körü müsünüz?** — alternatif şemaları deneyin; temel veri aynıdır
- **Harita tarih değişiminde otomatik yenilenmez** — yapılandırmaya bağlı olarak tarih aralığını değiştirdikten sonra _Uygula_ / _Yenile_'ye tekrar tıklamanız gerekebilir
- **Açıklama önemli** — "kırmızı ve dramatik" görünen şey küçük mutlak sayı olabilir; yorumlamadan önce her zaman açıklamaya göz atın
