# Rider App — Abonelikler ve Promosyon Kodları

**Abonelikler ve promosyon kodları şu anda uygulamada mevcut değildir.** Bir sürücü plan satın alamaz, promosyon kodu kullanamaz ve iptal edecek bir şeyi yoktur.

Bir sürücüye indirim vermek istiyorsanız, bunu Gösterge Paneli tarafında ayarlayın — bkz. [Bugün bir sürücüye indirim vermek](#bugün-bir-sürücüye-indirim-vermek).

## Bir sürücünün gerçekte gördükleri

- [Harita](../riding/map.md#navigasyon-kabuğu) üzerindeki yan çekmecede **Promosyonlar ve Abonelikler girişi yoktur**.
- `/subscriptions` bağlantısı bir ekran açmaz. Bu bağlantıyı yazan veya ona tıklayan sürücü, uygulamanın **Bulunamadı** ekranına yönlendirilir. Bu beklenen bir davranıştır, hesap veya cihaz hatası değildir.
- Eski `/promo` bağlantısı ise sadece [Cüzdan](wallet.md) sayfasına yönlendirir.
- Şirketiniz için abonelikleri veya promosyon kodlarını açan **hiçbir gösterge paneli ayarı yoktur**.

Bir sürücüye "etkinleştirdiğimizde kod çalışacak" diye söz vermeyin ve plan adları veya fiyatları vermeyin — şu anda geçerli değildir.

## Bugün bir sürücüye indirim vermek

Operatör tarafında üç mekanizma mevcuttur:

| Mekanizma                 | Nerede                                                                        | İyi olduğu durumlar                                         |
| ------------------------- | ---------------------------------------------------------------------------- | ------------------------------------------------------------ |
| **Tarife indirim kademeleri** | [Araç Tarifeleri](../../settings/infrastructure/vehicle-tariffs.md)           | Daha uzun sürüşleri herkes için kademeli olarak daha ucuz yapmak |
| **Ayrı bir tarife artı etiketler** | [Araç Tarifeleri](../../settings/infrastructure/vehicle-tariffs.md) + [Etiketler](../../settings/infrastructure/tags.md) | Belirli bir grup için daha ucuz fiyatlandırma (kurumsal, personel, VIP) |
| **Manuel bakiye kredisi** | [Müşteri Detayı](../../operations/customers/client-detail.md#eylemler) → **Bakiyeyi yükle** | Şikayet veya başarısız sürüş sonrası tek seferlik iyi niyet ödemesi |

Tek seferlik bir tazminat için manuel bakiye kredisi en hızlısıdır ve müşterinin etkinlik günlüğünde bir kayıt bırakır. Tekrarlayan durumlar için bunu bir tarifeye dahil edin.

## SSS

| Soru                                        | Cevap                                                                                                        |
| ----------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| "Abonelik nasıl satın alınır?"                  | Şu anda uygulamada mevcut değildir                                                                             |
| "Abonelikler sayfası Bulunamadı gösteriyor"        | Doğru ve beklenen durum                                                                                           |
| "Şirketimiz için abonelikleri açabilir miyiz?"  | Hayır — bunun için gösterge panelinde bir ayar yok                                                                       |
| "Promosyon kodum uygulanmıyor"                     | Promosyon kodları şu anda uygulamada mevcut değildir                                                              |
| "Promosyon QR kodu taraması hiçbir şey yapmıyor"         | Aynı şekilde — şu anda mevcut değildir                                                                                  |
| "Planımı nasıl iptal ederim?"                      | İptal edilecek bir plan yoktur                                                                                      |
| "Bana hangi fiyatlandırma uygulanıyor?"              | Sürüş yapılan araca bağlı tarife uygulanır. Bkz. [Araç Tarifeleri](../../settings/infrastructure/vehicle-tariffs.md) ve [sürüş maliyet dökümü](../riding/rides.md#ücret-dökümü) |

## İpuçları

- **"Şu anda mevcut değil" deyin, sonra yapabileceklerinizi söyleyin.** Promosyon kodları hakkında soru soran sürücüler genellikle indirim ister; manuel bakiye kredisi gerçek soruya yanıt verir.
- **İndirim mantığını tarifelerde tutun.** Orada yaptığınız her şey tutarlı şekilde uygulanır ve sürücünün sürüş maliyet dökümünde doğru görünür.
- **Üçüncü taraf promosyon kodlarına dikkat edin.** Sürücüler kampanyalardan gelen kodlarla geliyorsa, pazarlamanın uygulamanın bunları kullanamadığını bildiğinden emin olun.
