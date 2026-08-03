# Gösterge Paneli Ana Sayfa

Ana sayfa (`/dashboard`), günlük genel görünümünüzdür. Seçilen bir gün için temel filo metriklerini, bunların 30 günlük hareketli ortalamaya göre karşılaştırmasını ve saatlik aktivite dağılımını gösterir. Operasyonların nabzını tek bir ekranda görmek için açın.

## Başlık

En üstte:

- **Selamlama** — "Merhaba, _{adınız}_! _{şirketiniz}_'in gösterge paneline hoş geldiniz!"
- **Alt başlık** — "Şirketinizin performansının genel görünümü"
- **Tarih seçici** — metriklerin ait olduğu günü gösterir

## Tarih seçici

Varsayılan olarak sayfa **bugünün** verilerini yükler. Tarih seçici ile geçmişe doğru gezinebilirsiniz.

- **Bugün** — bugüne sıfırlayan buton
- **Önceki gün** (‹) / **Sonraki gün** (›) — birer gün adımla
- **Takvim simgesi** — belirli bir güne atlamak için tarih seçici açar

Seçilen tarih mevcut oturum için sabittir — başka bir sayfaya gidip geri döndüğünüzde seçiminiz korunur.

## İstatistik kartları (KPI'lar)

Sekiz metrik kartı iki satır halinde düzenlenmiştir. Her kart şunları gösterir:

- **Başlık** — ölçülen şey (örneğin _Sürüşler_)
- **Değer** — seçilen günün rakamı
- **Açıklama** — kısa bir açıklama ("Tamamlanan sürüşler", "Toplam mesafe" vb.)
- **Karşılaştırma** — 30 günlük hareketli ortalamaya göre değişim, yukarı/aşağı ok ile
- **Araç ipucu** — başlığın üzerine gelince tam tanım görünür

### Sekiz kart

| Kart                 | Gösterdiği şey                                |
| -------------------- | ---------------------------------------------- |
| **Sürüşler**          | Seçilen günde tamamlanan sürüş sayısı          |
| **Mesafe**            | Tüm sürüşlerde kat edilen toplam kilometre     |
| **Süre**              | Filodaki toplam sürüş süresi                    |
| **Gelir**             | Seçilen günde sürüşlerden elde edilen toplam gelir |
| **Yüklemeler**        | O gün müşteriler tarafından yapılan cüzdan yüklemelerinin toplamı |
| **Ortalama fiyat**    | Sürüş başına ortalama fiyat                      |
| **Ortalama fiyat / km** | Kilometre başına ortalama fiyat                 |
| **Ortalama fiyat / dk** | Dakika başına ortalama fiyat                     |

Karşılaştırma "**30 günlük ortalamaya karşı**" olarak okunur:

- ↑ Yeşil — son 30 günün ortalamasının üzerinde
- ↓ Kırmızı — ortalamanın altında
- (ok yok) — ortalamaya çok yakın, işaretlenmedi

## Hava durumu kartı

İstatistik kartları ızgarasında, işletme alanınızdaki koşulları gösteren bir hava durumu widget'ı bulunur:

- **Mevcut sıcaklık** ve durum (Açık, Bulutlu, Yağmur vb.)
- **Rüzgar** ve **yağış**
- **3 günlük tahmin** — sonraki iki gün ve yarın
- Konum kaynağı — _GPS'den_ veya _IP'den_ (hangisi mevcutsa)

Talebi tahmin etmek için faydalıdır: yağmur ve rüzgar genellikle sürüş hacmiyle ilişkilidir.

## Saatlik grafikler

İstatistik kartlarının altında, seçilen günün 24 saati boyunca aktivitenin nasıl dağıldığını gösteren dört alan grafiği bulunur, iki bölüm halinde gruplanmıştır:

### Aktivite

- **Saat başına sürüşler** — her saatte başlayan sürüş sayısı
- **Saat başına mesafe** — saatlik toplam kilometre
- **Saat başına süre** — saatlik toplam sürüş dakikası

### Gelir

- **Saat başına gelir** — saatlik kazanılan para

Her grafik günün eğrisini gösterir; bir noktaya gelince o saatin tam değeri görünür.

## Yükleme ve hatalar

- **Yükleniyor** — analiz uç noktası çözülürken istatistik kartları iskelet durumunda gösterilir
- **Hata** — üstte "Analitik yüklenemedi" yazan küçük bir bant görünür; sayfanın geri kalanı kullanılabilir kalır

## İzinler

Ana sayfa, **Gösterge Paneli Analitiklerini Görüntüle** (`q4r5t6`) izni ile sınırlandırılmıştır. Bu izin olmadan, girişte başka bir açılış sayfasına yönlendirilirsiniz.

Gösterge paneline erişiminiz varsa ama sayfa boşsa:

- Seçilen tarihi kontrol edin — boş günler geçerlidir (sürüş yok)
- Ağı kontrol edin — "Analitik yüklenemedi" bantını görün
- Aksi takdirde bir yöneticiyle iletişime geçin

## İpuçları

- **Günleri hızlıca karşılaştırın** — `‹` ve `›` ile son günlerde gezinin ve KPI'ların nasıl değiştiğini izleyin
- **İstatistik başlıklarında araç ipuçları** — her kartın kesin bir tanımı vardır; "Ortalama fiyat / km"nin neleri dışladığını tahmin etmek yerine buna güvenin
- **Önce karşılaştırma rozeti kullanın** — renkli ok, sayıyı okumadan önce günün normalin üzerinde mi altında mı olduğunu tek bakışta gösterir
- **Saatlik grafikler desenleri ortaya çıkarır** — sabah ve akşam işe gidiş zirveleri, hafta sonu eğrileri, hava durumu etkileri; toplamdan daha fazlasını anlatırlar
