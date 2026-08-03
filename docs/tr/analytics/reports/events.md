# Analitik — Son Etkinlikler

Etkinlikler analitik sayfası (`/analytics/events`), seçilen bir dönemdeki her önemli sistem, araç, kullanıcı ve bölge etkinliğini KPI sayaçları, zaman içindeki desenler ve altta aranabilir bir akış ile gösteren **olay gösterge panelinizdir**.

[Bildirimler paneli](../../features/ux/notifications.md) (gerçek zamanlı, olay başına) ile farklı olarak — bu sayfa **toplu ve tarihsel**dir, eğilimleri tespit etmek ve olay sonrası inceleme yapmak için faydalıdır.

Gerekli izin: **Son Etkinlikleri Görüntüle** (`s1t2u3`).

## Zaman aralığı ve filtreler

En üstte bir **tarih aralığı çubuğu** bulunur — her metrik ve grafik buna uyar. Dört ek filtre görünümü daraltır:

| Filtre          | Seçenekler                                                              |
| --------------- | ----------------------------------------------------------------------- |
| **Şiddet**      | `critical` / `warning` / `info` (çoklu seçim)                          |
| **Tür**         | `error` / `offline` / `battery` / `payment` / `support` / `maintenance` |
| **Kaynak türü** | `vehicle` / `user` / `zone` / `system`                                  |
| **Durum**       | `open` / `resolved` / `dismissed`                                       |

Tüm filtreler VE ile birleştirilir. URL her ayarı yansıtır — bir bağlantı paylaşın, takım arkadaşınız tam olarak aynı dilimi görür.

## Bölümler

Sayfa **beş bölüm** içerir:

### 1. Özet

Dört metrik kartı etkinlik sayılarını özetler:

| KPI          | Gösterdiği                                               |
| ------------ | --------------------------------------------------------- |
| **Toplam**   | Aralıktaki toplam etkinlik sayısı                         |
| **Kritik**   | `severity = critical` olanların sayısı — mutlaka bakılması gereken sayı |
| **Uyarı**    | `severity = warning` olanların sayısı                     |
| **Bilgi**    | `severity = info` olanların sayısı — genellikle gürültü, spike olmadıkça |

Her kartta "önceki döneme göre" karşılaştırma rozeti bulunur.

### 2. Türüne Göre

Etkinlikleri **türüne göre** ayıran bir grafik:

- **Hata** — sistem / entegrasyon hataları
- **Çevrimdışı** — IoT cihazlarının kapanması
- **Pil** — düşük / boş / anomali alarmları
- **Ödeme** — reddedilmeler, ödeme geçidi sorunları
- **Destek** — bilet / sohbet spike'ları
- **Bakım** — servisle ilgili etkinlikler

Tek bir türdeki spike'lar genellikle inceleme için başlangıç noktanızdır.

### 3. Desenler

İki zaman serisi grafik:

- **Güne Göre** — aralıktaki gün başına etkinlikler (haftalık döngüleri görselleştirir)
- **Saate Göre** — tüm aralıktaki günün saat başına etkinlikler (günlük zirveleri görselleştirir)

### 4. En İyi Kaynaklar

Etkinlik üreten **en iyi kaynakların** listesi — genellikle orantısız sayıda etkinliği olan bireysel araçlar veya bölgeler.

Her giriş, kaynağı (detay sayfasına bağlantılı), etkinlik sayısını ve baskın şiddet / türü içerir.

Burada **bütün hafta alarm veren aracı** veya **pil sorunları olan bölgeyi** bulursunuz.

### 5. Akış

Mevcut filtrelerle eşleşen bireysel etkinliklerin kaydırılabilir akışı. Her satır şunları gösterir:

- Şiddet simgesi (renkli)
- Etkinlik türü + kaynak etiketi
- Kısa açıklama
- Zaman damgası
- Durum etiketi

İlgili varlığa (araç, müşteri, sürüş, bilet) gitmek için bir akış öğesine tıklayın, varsa.

## Tipik iş akışları

- **Günlük sabah incelemesi** — önceden ayarlanmış _Son 24saat_ → Şiddet = Kritik → tarama; her kırmızı olan, gösterge panelinin geri açılmasından önce dikkat çeker
- **En iyi kaynakların üçlemesi** — En iyi kaynaklar bölümü → sürekli görünen bir araca tıklayın → kaynaktan düzeltin veya yükseltin
- **Desen tespiti** — desen grafiklerine bakın; alışılmadık bir gün veya saat bir şeyin değiştiğini gösterir (dağıtım, hava durumu, kesinti)
- **Olay sonrası inceleme** — günü seçin → şiddet = kritik → Akışı [Araç](../../operations/fleet/vehicle-detail.md) Uyarılar sekmesi veya [Ödemeler analitiği](payments.md) Kalite bölümü ile türüne göre çapraz kontrol edin
- **Temizlik turu** — Durum = Açık → eski öğeleri toplu olarak çözün (bunu kaynak sayfalarından yaparsınız, buradan değil, ama onları burada bulursunuz)

## İpuçları

- **Önce kritik** — `severity = critical` ile başlayın; uyarılar ve bilgiler genellikle kendiliğinden çözülür
- **Tür dedektifinizdir** — bir spike gördüğünüzde, gürültüyü azaltmak için baskın türe göre filtreleyin
- **En iyi kaynaklar altındır** — kaynaklar listesinin en üstündeki bir araç genellikle tüm etkinliklerin %30-50'sini açıklar
- **Toplamalar ve ham veriler** — bu sayfa toplar; gerçek işlemler / uyarılar için kaynak alan sayfasına gidin
- **Yapışkan filtreler** — ayarlarınız gezinme sırasında korunur; URL'yi başkasına verirken temizleyin
- **Durum `open` ≠ çözülmemiş IoT alarmı** — Buradaki Durum, _etkinlik kaydı_ durumudur; altta yatan alarm cihazda temizlenmiş olabilir ama etkinlik sistemde hala açık olabilir
