# Analitik — Ödemeler

Ödemeler analitik sayfası (`/analytics/payments`), **finansal gösterge panelinizdir**: Gelen para (bakiye yüklemeleri), çıkan para (iade işlemleri), tahsil edilen para (borçlandırmalar) ve ödeme sisteminizin durumu hakkında KPI'lar ve grafikler.

Her işlem için bir defter olan [Ödeme geçmişi](../../operations/payments/payments.md)'nden farklı olarak — bu sayfa, eğilimleri, sızıntıları ve anormallikleri tespit edebilmeniz için bir tarih aralığı boyunca **toplanmış** veriler sunar.

Gerekli izin: **Ödemeler Analitiğini Görüntüle** (`w7x8y9`).

## Zaman aralığı

Sayfanın üstünde bir **tarih aralığı çubuğu** bulunur. Her metrik ve grafik bu aralığa uyar:

- Önceden tanımlı bir aralık seçin (Bugün, Son 7 / 30 / 90 gün, Bu / Geçen ay) veya özel bir aralık belirleyin
- Metrik kartlarının altındaki karşılaştırma rozeti "önceki dönemle karşılaştır" yazar — _Son 7 gün_ seçildiğinde, karşılaştırma önceki 7 gündür
- Aralık oturum boyunca kalıcıdır: başka bir sayfaya gidip geri döndüğünüzde aralığınız korunur

## Bölümler

Sayfa, ödemelerin farklı yönlerine odaklanan **altı bölüm** halinde düzenlenmiştir:

### 1. Akış

Genel görünüm — gelen para ve çıkan para.

| KPI            | Ölçtüğü şey                                                                                                              |
| -------------- | ------------------------------------------------------------------------------------------------------------------------- |
| **Bakiye yüklemeleri**    | Bu aralıktaki cüzdanlara yatırılan para (manuel + sağlayıcı)                                                               |
| **İadeler**    | Müşterilere geri verilen para; _İade oranı_ rozeti taşır (iadeler / borçlandırmalar)                                               |
| **Borçlandırmalar**     | Müşterilerden tahsil edilen para (sürüşler, cezalar). Belirli bir müşteri etiketi (ör. _VIP_) için kapsam belirlemek üzere **etiket filtresi** içerir |
| **Net giriş** | Bakiye yüklemeleri − İadeler; pozitif ise cüzdan bakiyeniz artıyor                                                                |

### 2. Kalite

Ödeme sağlayıcı entegrasyonunuzun sağlığı.

| KPI                 | Ölçtüğü şey                                                                                                              |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| **Başarı oranı**    | Tamamlanan işlemler / tüm denenenler — ana güvenilirlik sayınız                                                 |
| **Başarısız**          | Aralıktaki başarısız işlem sayısı                                                                                     |
| **Beklemede**         | Hâlâ beklemede olan işlem sayısı ([Bekleyen Webhook'lar](../../operations/payments/pending-webhooks.md) ile karşılaştırın) |
| **İade edilen**        | İade edilen borçlandırma sayısı                                                                                    |
| **Başarısızlık nedenleri** | Başarısızlıkları nedenlerine göre ayıran grafik (reddedilme / 3DS / ağ / vb.)                                                   |

_Başarısız_ işlemlerde ani artış + grafikte belirgin bir neden = yükseltmeniz gereken bir kesinti veya entegrasyon sorunu.

### 3. Bakiye

Aralık sonunda operatörün elindeki fonların durumu (sürücü cüzdanları).

| KPI               | Gösterdiği şey                                                              |
| ----------------- | -------------------------------------------------------------------------- |
| **Bakiye**         | Tüm pozitif bakiyelerin toplamı — sürücüler için etkin olarak tuttuğunuz para |
| **Borç**          | Tüm negatif bakiyelerin toplamı — sürücülerin size borcu                        |
| **Ortalama bakiye**   | Aktif müşteri başına ortalama bakiye                                          |
| **Kullanıcılar**         | Sıfır olmayan bakiyesi olan müşteri sayısı                                     |
| **Kova grafiği** | Bakiye büyüklüğüne göre müşterilerin histogramı (ör. 0–10 / 10–50 / 50–100 / 100+)   |

_Borç_ değerini tahsilat gecikmesi sinyali olarak kullanın — yüksek borç, takip edilmesi gereken çok sayıda ceza veya başarısız borçlandırma olduğunu gösterir.

### 4. Kalıplar

Sürücülerin bakiye yükleme davranış kalıpları — pazarlama / ürün için faydalı.

- **Bakiye yükleme büyüklüğü histogramı** — sürücülerin yüklemelerini miktarlara göre nasıl dağıttığı. Histogramın modu (en yaygın büyüklük) uyarılarınızın varsayılanı olmalıdır
- **Saatlere göre bakiye yüklemeleri** — sürücülerin günün hangi saatlerinde bakiye yüklediği. Zirveler genellikle sürüş zirveleriyle (işe gidiş-geliş, hafta sonu akşamları) örtüşür

### 5. Yöntemler

**Ödeme yöntemi / sağlayıcı** bazında tablo dökümü.

- Sütunlar: Yöntem (kart / bakiye / cüzdan / vb.), Toplam tutar, Sayı, Ortalama işlem, Başarı oranı
- Düşük başarı oranına sahip sağlayıcıları tespit etmek için faydalı (bir yöntemde düşük başarı oranı zayıf halkanızdır)

### 6. Kullanıcılar

Müşteri kohort görünümü — size kimler ödeme yapıyor.

| KPI               | Ölçtüğü şey                                                                   |
| ----------------- | ---------------------------------------------------------------------------------- |
| **Benzersiz ödeyenler** | Aralıkta ödeme yapan farklı müşteriler                                             |
| **Yeni ödeyenler**    | Bu aralıkta ilk kez ödeme yapan müşteriler                                  |
| **Tekrar eden ödeyenler** | Bu aralıkta birden fazla kez ödeme yapan müşteriler                                      |
| **En çok ödeyenler**    | En çok ödeme yapan müşterilerin adı, tutarı, sürüş sayısı ve profil bağlantısı ile tablosu |

## Tipik iş akışları

- **Haftalık inceleme** — önceden ayarlanmış _Son 7 gün_ → her bölümü bir kez kaydırarak inceleyin. Karşılaştırma şeridinin (büyük ▲ veya ▼) dışındaki her şey daha derinlemesine incelenir
- **Kesinti sonrası analiz** — tarih aralığını bir olayın olduğu güne ayarlayın → Kalite bölümü → Arıza nedenleri grafiği → gerçek işlemler için [Ödeme Geçmişi](../../operations/payments/payments.md) ile çapraz kontrol yapın
- **Etiket derinlemesine inceleme** — Borçlar kartı → Etiket filtresi → _VIP_ gibi bir etiket seçin → Borçlar metriği sadece o kohortu gösterir; hızlı bir pay oranı için toplam borçlarla karşılaştırın
- **Tahsilat baskısı** — Bakiye bölümü → _Borç_ → eğer artmışsa, negatif bakiye ile filtrelenmiş Müşteriler listesi üzerinden bireysel müşterilere derinlemesine bakın
- **Pazarlama fiyatlandırması** — Desenler → Yükleme boyutu histogramı → uygulama içi önerilen yükleme miktarınızı en popüler aralığa ayarlayın

## İpuçları

- **Karşılaştırma şeridi mutlak sayıdan daha faydalıdır** — mutlak gelir rakamı şirket büyüklüğüne bağlıdır; % değişim işlerin iyileşip iyileşmediğini gösterir
- **Sabit tarih aralığı** — son seçilen aralığınız gezinme sırasında korunur; bir meslektaşınız farklı bir aralıkla URL paylaşıyorsa, o aralık geçerli olur
- **Etiket filtresi sadece Borçlar için geçerlidir** — etiketlere göre yüklemeleri görmek için Müşteriler listesi ile çapraz kontrol yapmanız gerekir
- **Arıza nedenleri grafiği sağlayıcı performans kartınızdır** — aniden yeni bir neden kategorisinin ortaya çıkması genellikle bir sağlayıcı yapılandırma değişikliği anlamına gelir
- **Net giriş pozitif ≠ kâr** — bu cüzdan bakiyesi, gelir değildir; daha sonra yapabileceğiniz iadeleri veya çözülmemiş bakiyeleri hesaba katmaz
- **Ortalama bakiye × Kullanıcılar ≠ Bakiye** — Bakiye pozitiflerin toplamıdır; birçok sürücü borçluysa, Ortalama Bakiye Bakiye / Kullanıcılar’dan düşük olabilir
