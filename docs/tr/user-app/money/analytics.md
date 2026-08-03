# Rider App — Sürücü İstatistikleri

**Sürücüye yönelik istatistikler şu anda uygulamada mevcut değildir.** Bir grafik ekranı, toplamlar veya sürücünün açabileceği bir harcama özeti yoktur.

Sürücüleri bunun yerine [History](history.md) sayfasına yönlendirin — kendi verilerinin olduğu tek yerdir.

## Sürücünün gördükleri

- **Bir giriş noktası yoktur.** Yan menüde Cüzdan, Geçmiş, Destek, Gizlilik, Ayarlar ve Profil listelenir — başka hiçbir şey yoktur. Analitik ekranı bulamadığını söyleyen bir sürücü haklıdır; onlara menüde bakmalarını söylemeyin ve bir bağlantı göndermeyin.
- `/analytics` ekranı doğrudan açılırsa, sadece bir başlık ve boş alan gösterir. Sürücünün hesabında, cihazında veya uygulama kurulumunda **hiçbir sorun yoktur** — yeniden yüklemek de bir şey değiştirmez.

## Sürücünün sayılarının gerçekten bulunduğu yer

[History](history.md) gerçek sürücü başına veriler içerir:

- **Rides** sekmesi, her geçmiş sürüşü mesafe, süre ve maliyeti ile listeler
- **Payments** sekmesi, tutarları ve durumlarıyla birlikte bakiye yüklemeleri, iadeler, borçlar ve bonusları listeler
- Bir sürüşe dokunmak, tam [maliyet dökümünü](../riding/rides.md#ücret-dökümü), etkinlik zaman çizelgesini ve harita üzerinde çizilmiş rotayı gösteren detayını açar

Sürücü uygulamasında **hiçbir yerde toplamlar için bir afiş yoktur** — ne herhangi bir istatistik ekranında ne de Geçmiş sayfasının üstünde. Ömür boyu toplamlar sürüş listesinden toplanmalı veya kendi raporlamanızdan çekilmelidir.

## Gösterge Paneli'nden gelen sayı sorularını yanıtlamak

Bir sürücü gerçekten toplamlar istediğinde, bunları operatör tarafında üretin:

| Sürücü ister                     | Nereden alırsınız                                                                 |
| ------------------------------- | --------------------------------------------------------------------------------- |
| Belirli bir dönemde toplam harcama | [Analytics — Payments](../../analytics/reports/payments.md)                        |
| Kendi sürüş listesinin dışa aktarımı | [Rides — List](../../operations/trips/rides.md), o müşteriye filtrelenmiş          |
| Ödeme kayıtları                 | [Payments — History](../../operations/payments/payments.md)                        |
| Hızlı müşteri özeti            | [Client Detail](../../operations/customers/client-detail.md) — ömür boyu sürüş sayısı, bakiye, puanlama |

## SSS

| Sürücü sorar…                   | Cevap                                                                            |
| ------------------------------- | ------------------------------------------------------------------------------- |
| "İstatistiklerim nerede?"       | Şu anda uygulamada mevcut değil. [History](history.md) kullanın                   |
| "Menüde Analytics'i bulamıyorum" | Menüde böyle bir giriş yok                                                        |
| "Analytics sayfası boş"         | Beklenen durum — ekran şu anda mevcut değil. Hiçbir şey bozuk değil               |
| "Sürüş verilerimi dışa aktarabilir miyim?" | Uygulamadan değil. Sürücü adına Gösterge Paneli'nden dışa aktarın                  |
| "Toplam ne kadar harcadım?"     | Sürücü uygulamasında toplam yok. Geçmişten okuyun veya Gösterge Paneli'nden çekin |

## İpuçları

- **Sürücülere analitik bağlantıları göndermeyin.** İniş yapılacak değerli bir ekran yoktur ve boş bir sayfa bozuk bir uygulama izlenimi verir.
- **Toplam sorularını kendiniz yanıtlayın.** Rakamı Gösterge Paneli'nden çekmek bir dakika sürer ve konuşmayı sonlandırır.
- **Geçmiş dürüst cevaptır** ve gerçekten her sürüş ve ödeme için eksiksizdir — bunu eksik bir ekran için özür dilemek yerine böyle çerçeveleyin.
