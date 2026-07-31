# Analitik — Araçlar

Araçlar analitik sayfası (`/analytics/vehicles`), **filo sağlık gösterge paneli**dir: kaç aracınız olduğu, performansları, pil durumu, sorunlar ve arıza türleri ile bölgelere göre dağılım.

[Araçlar listesi](../../operations/fleet/vehicles.md) ile farklıdır — o birim bazında operasyonel görünüm; bu ise seçilen dönem için **toplu filo metrikleri**dir.

## Zaman aralığı

Üstte bir **tarih aralığı çubuğu** bulunur. Trend grafiklerinde tam aralık kullanılır; genel bakış / durum sayımları **mevcut durumu** (aralığın sonu) yansıtır.

## Bölümler

Yedi bölüm, yukarıdan aşağıya:

### 1. Genel Bakış

Üst düzey filo bileşimi.

| KPI               | Gösterdiği                                              |
| ----------------- | -------------------------------------------------------- |
| **Toplam**        | Kayıtlı tüm araçlar                                     |
| **Aktif**         | Şu anda sürücüler tarafından kiralanabilir durumda olanlar |
| **Boşta**         | Kullanılmayan, beklemede olanlar (Mevcut veya düşük kullanım olabilir) |
| **Bakımda**       | Bakımda / Depoda / Hazır değil — gelir getirmeyenler    |
| **Kayıp / Çalıntı** | Durum = Çalındı veya belirli süreden uzun çevrimdışı olanlar |

Bu bölümü filo genel durumunuzun başlık özeti olarak kullanın.

### 2. Performans

Filonuzun sizin için ne kadar **kazandığı**.

| KPI                   | Gösterdiği                                              |
| --------------------- | -------------------------------------------------------- |
| **Kazanan araçlar**   | Dönemde en az bir sürüş tamamlayan araçlar              |
| **Pasif araçlar**     | Aktif araçlar arasında sıfır sürüş (boşa maliyet)       |
| **Araç başına sürüş** | Aralıktaki araç başına ortalama sürüş sayısı             |
| **Kullanım oranı**    | Kiralanan saatler / kullanılabilir saatler (sektör ortalaması: %5-15) |

Aktif araçlar arasında pasif olanlar en kötüsüdür — operasyonel maliyet yaratır ama gelir sağlamaz.

### 3. Pil

Filodaki pil sağlığı.

| KPI / Grafik     | Gösterdiği                                                                 |
| ---------------- | ------------------------------------------------------------------------- |
| **Ortalama seviye** | Tüm araçların şu anki ortalama pil yüzdesi                              |
| **Kritik**       | Kritik eşik altında olanların sayısı (yüzde 10-20 arası)                   |
| **Ortalama eğilim** | Aralıktaki pil ortalaması — düşüyorsa pil değişimleri yetişmiyor demektir |
| **Dağılım**      | Pil seviyelerine göre araç histogramı (0-20 / 20-40 / 40-60 / 60-80 / 80-100) |
| **Değişimler**   | Aralıktaki pil değişimi işlemlerinin sayısı                               |

Ortalama düşerken Kritik artıyorsa, saha ekibi geride kalıyor demektir — daha fazla pil değişimi planlayın.

### 4. Sorunlar

Filoya karşı bildirilen uyarılar ve operasyonel sorunlar.

| KPI             | Gösterdiği                                                  |
| --------------- | ------------------------------------------------------------ |
| **Uyarılar**    | Aralıktaki toplam uyarı sayısı                               |
| **Uyarı türleri** | Türlere göre dağılım (pil / bağlantı / mekanik / vb.)       |
| **Kritik**      | Kritik şiddetteki uyarılar                                   |
| **Bakımda**    | Şu anda Bakım durumundaki araçlar                            |
| **Çevrimdışı** | IoT cihazı belirli süreden uzun rapor vermeyen araçlar      |

Bu bölümü, olay bazlı görünüm için [Recent Events analytics](events.md) ile eşleştirin.

### 5. Trendler

Zaman serisi grafik(ler)i, **Aktif** araç sayısının aralık boyunca nasıl değiştiğini gösterir. Düşüş genellikle toplu durum değişikliği (bakıma geçiş, hava durumu, geri çağırma) anlamına gelir.

### 6. Türüne Göre

**Araç türüne** göre dağılım (scooter / bisiklet / e-bisiklet / vb.). Her biri için: sayım, kazanç oranı, kullanım oranı, uyarı oranı.

Bir tür uyarı oranında baskınsa, sorun **modeldedir** — operasyon ekibinde değil.

### 7. Bölgeye Göre

**Bölge** bazında dağılım. Her biri için: araç sayısı, kullanım oranı, sorun oranı.

Düşük kullanım ve yüksek envantere sahip bölgeler = **dengeleme fırsatı** (ayrıca bkz. [Rebalance analytics](../../operations/rebalance/runs.md)).

## Tipik iş akışları

- **Haftalık filo incelemesi** — Genel bakış → Performans (kullanım eğilimi) → Pil (kritik sayıda artış var mı?) → Sorunlar (uyarı artışları) → Trendler (Aktif sayıda açıklanamayan düşüş var mı?)
- **Pasif araç temizliği** — Performans → Pasif araç sayısı → artıyorsa, [Araçlar listesi](../../operations/fleet/vehicles.md) ile sorunlu araçları bulun ve durum / konum kontrolü yapın
- **Pil acil durumu** — Pil bölümü → Kritik artıyor + Ortalama düşüyor → saha ekibini harekete geçirin
- **Kötü model tespiti** — Türüne Göre bölümü → en kötü uyarı oranına sahip tür → aşamalı kaldırma veya üretici ile görüşme düşünün
- **Dengeleme** — Bölgeye Göre bölümü → düşük kullanım + yüksek envanter bölgeleri → yeniden dağıtım planlayın
- **Vardiya öncesi planlama** — Trendler + [Events](events.md) kalıpları → hangi günler / saatler daha fazla saha personeli gerektiriyor?

## İpuçları

- **Aktif + Boşta + Servis dışı + Kayıp/Çalıntı = Toplam** — toplam tutmuyorsa, durumlar geçiş aşamasındadır; yenileyin veya kararlı bir tarih seçin
- **Aktif ≠ kazanç** — bir araç "Aktif" ise kiralanabilir demektir; "Kazanç" ise gerçekten kiralanmıştır. Bunları karşılaştırın
- **%25'in üzerindeki kullanım sağlıksızdır** — kullanıcılar araç bulmakta zorlanır; o bölgedeki envanteri artırmayı düşünün
- **%5'in altındaki kullanım ölü ağırlıktır** — aracı serviste tutmanın maliyeti kazancını aşar; dengeleyin veya çekin
- **Kritik pil + Ortalama eğilim** — ikisi birlikte erken uyarı sisteminizdir; biri tek başına gürültüdür
- **Kayıp / Çalıntı durumu kalıcıdır** — temizlemek için manuel durum değişikliği gerekir; "Çalıntı"yı geri almadan kutlamayın
- **Tür ve Bölge birlikte** — bazen bir tür sadece bir bölgede başarısız olur (arazi uyumsuzluğu); çapraz analiz bunu ortaya çıkarır
