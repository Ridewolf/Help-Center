# Bakım Görevleri

Bakım Görevleri sayfası (`/maintenance/tasks`), **filonuz için iş emirlerinin** — onarımlar, denetimler, planlı servislerin — merkezi konumudur. Bu sayfa, [Envanter ve Parçalar](inventory.md) ile [Bakım Otomasyonu](automation.md) sayfalarıyla paylaşılan **Bakım Bilgi Paneli**ni içerir ve size bakım iş yükünün canlı 30 günlük bir görünümünü sunar.

Bunu kenar çubuğunda **Bakım → Görevler** altında bulabilirsiniz.

> **Dikkat: görev oluşturma yakında geliyor.** **Görev oluştur** düğmesi şu anda "yakında gelecek" araç ipucuyla devre dışı bırakılmıştır — ürün içinde bugün görev kayıtları oluşturulamaz veya düzenlenemez. Ancak Bilgi Paneli sayıları canlıdır. Özellik yayınlanana kadar burada görev oluşturmayı içeren bir iş akışı planlamayın.

## Bakım Bilgi Paneli

Sayfanın üstündeki panel tamamen çalışır durumdadır ve salt okunurdur. **Sabit bir 30 günlük pencereyi** kapsar (sabit — tarih seçici yoktur) ve şunları gösterir:

| Blok           | Metrikler                                                  |
| -------------- | ---------------------------------------------------------- |
| **Görevler**   | toplam, beklemede, devam ediyor, tamamlandı, gecikmiş      |
| **Servis**     | planlandı, tamamlandı, ortalama süre, bu hafta gelecek     |
| **Envanter**   | toplam öğe, düşük stok, stokta yok, toplam değer           |
| **Otomasyon**  | etkin kurallar, bugün tetiklenen, başarı oranı             |

- Bir kutucuk açık görevler olduğunda **uyarı** olur, stokta olmayan herhangi bir şey olduğunda ise **tehlike** olur.
- Kutucukların altında: görev durumu dağılımının çubuk grafiği ve otomasyon başarı oranı için ilerleme göstergesi.
- Aynı panel (ve aynı veriler) tüm üç Bakım sayfasında görünür, böylece aralarında geçiş anında gerçekleşir.

## Görev modeli

Oluşturma henüz mümkün olmasa da, görev yapısı tanımlanmıştır — ekibinizin nasıl kullanacağını planlarken faydalıdır:

- **Etiket** ve **açıklama**
- **Durum** — `unassigned`, `assigned`, `in-progress`, `on-hold`, `completed`, `cancelled`, `active`, `inactive`, `archived`
- **Öncelik** ve **şiddet** — her biri `low` / `medium` / `high` / `critical`
- **Etkisi** — `cosmetic`, `minor-issue`, `degraded`, `out-of-service`
- **Kaynak** — `user`, `iot`, `inspection`, `schedule` (görevin kaynağı)
- **Kategori / alt kategori**, bağlı **araç**, **atanan kişi**, **etiketler**
- **Maliyet** — parçalar, işçilik, toplam
- **SLA** — son tarih ve SLA durumu

Ayrı bir "görev türü" alanı yoktur — _rutin_, _onarım_ veya _denetim_ olarak düşünebileceğiniz şeyler, bunun yerine **kaynak**, **kategori**, **şiddet** ve **etki** ile eşleştirilir.

## Planlanan oluşturma akışı

Oluşturma yayınlandığında, üç adımlı bir sihirbaz olacaktır:

1. **Bilgi** — ad ve açıklama
2. **Durum** — başlangıç durumunu seçin
3. **İnceleme** — herhangi bir alanı düzenlemek için geri dönebileceğiniz bir özet, ardından gönderin

## Yaygın sorular

- **"Görev oluştur" açılmıyor — bu bir izin sorunu mu?** Hayır. Özellik tamamlanırken düğme herkes için devre dışı bırakılmıştır. Beklenen bir durum.
- **Bilgi Paneli tarih filtrelerimi görmezden geliyor.** Uygulanacak filtre yoktur — 30 günlük pencere sabittir.
- **Pil değişim metrikleri yer tutucu iskeletler gösteriyor.** Bu toplama henüz mevcut değil.
- **Araç başına servis geçmişi nerede?** Mevcut yapıda yoktur. Şimdilik, en yakın kayıt olarak aracın [detay sayfasındaki](../fleet/vehicle-detail.md) etkinlik günlüğünü kullanın.

## İpuçları

- **Şimdilik acil onarımları [Biletler](../../support/tickets-proofs-chat/tickets.md) üzerinden takip edin** — görev oluşturma yayınlanana kadar, destek bileti kuyruğu (şiddet ve SLA alanlarıyla) uygulanabilir takipler için çalışan alternatiftir.
- **Bilgi Panelini bir sağlık gösterge paneli olarak kullanın** — gecikmiş görevler ve stokta olmayan parçalar, kutucukları kırmızıya çeviren iki sayıdır; vardiya başında bunları kontrol edin.
