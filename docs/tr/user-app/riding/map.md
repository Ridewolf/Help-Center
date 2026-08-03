# Rider App — Harita, Rezervasyonlar ve Tarama

Harita (`/map`), rider app'in ana ekranı ve onboarding'in son adımıdır. Üç şeyi gösterir: rider'ın kendi konumu, çevresindeki kullanılabilir araçlar ve işletme alanınız için çizdiğiniz bölgeler.

Destek personeli bu ekranda diğer tüm ekranlardan daha fazla zaman harcar, çünkü en yaygın rider şikayeti — _"sürüş başlatmanın bir yolu yok"_ — neredeyse her zaman burada, [Alt çubuk koşullu](#alt-çubuk-koşullu) bölümünde yanıtlanır.

Sürüşün kendisi için (başlatma kapıları, duraklatma, bitirme, fotoğraf kanıtları) bkz. [Rides](rides.md). Bölgelerin operatör tarafı için bkz. [Zones](../../settings/infrastructure/zones.md).

## Navigasyon kabuğu

**Menü** düğmesi yan çekmeceyi açar — uygulamanın tek navigasyonu budur. Alt sekme çubuğu yoktur. Çekmece şunları içerir:

| Çekmece girişi         | Açar                                         |
| ----------------------- | ------------------------------------------- |
| Cüzdan bakiye satırı    | [Wallet](../money/wallet.md)                 |
| **Geçmiş**              | [History](../money/history.md)               |
| **Destek**              | [Support](../help/support.md)                |
| **Gizlilik**            | Gizlilik ve güvenlik yönergeleri ekranı      |
| **Ayarlar**             | [Settings](../help/settings.md)              |
| **Profil**              | Rider'ın profil ekranı                        |

Promosyonlar ve Abonelikler şu anda uygulamada mevcut değildir ve çekmecede bunlar için giriş yoktur — bkz. [Subscriptions & Promo Codes](../money/subscriptions.md).

## Ekrandaki kontroller

**Üst kontroller**

- **Menü** — yukarıda tanımlanan yan çekmeceyi açar
- **Nasıl sürülür** — uygulama içi sürüş yardım sayfasını açar (uygulama içi rehber içerikleri [Quick Guides](../../settings/content/quick-guides.md) üzerinden yönetilir)
- **Konumum** — haritayı rider'ın konumuna yeniden merkezler

**Alt çubuk**

| Düğme          | Göründüğü durum                                                                                  | Ne yapar                                                                              |
| -------------- | ------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------- |
| **Grup sürüşü** | Alt çubukla birlikte                                                                             | Grup sürüşü akışını açar                                                              |
| **Tara**       | Alt çubukla birlikte                                                                             | QR tarayıcıyı (`/ride/start`) açar, manuel araç kodu girişi sayfası yedek olarak      |
| **Filtreler**  | Rider'ın özel araç etiketleri varsa ve zaten bir sürüşte veya beklemede değilse                  | İşaretçileri bu etiketlere göre filtreler                                            |

### Alt çubuk koşullu

Alt çubuk **sadece rider'ın sürüş ödeme erişimi olduğunda** görüntülenir — yani ya bağlı bir kartı vardır ya da kart kaydetmeyi desteklemeyen bir ödeme sağlayıcısı kullanıyordur.

**Kartı bağlı olmayan ve kart kaydetmeyi destekleyen bir sağlayıcı kullanan rider alt çubuk görmez**, dolayısıyla **Tara** ve **Grup sürüşü** düğmeleri de yoktur. Bu tasarım gereği böyledir ve "uygulama sürüş başlatmama izin vermiyor" şikayetinin en yaygın nedenidir.

Çözüm: onları **Wallet → Ödeme Yöntemlerini Yönet → Kart Ekle** sayfasına yönlendirin. Bkz. [Payment Methods](../money/payment-methods.md).

**Filtreler** düğmesi yoksa, rider'ın özel araç etiketi yoktur ya da zaten aktif bir sürüşte veya rezervasyondadır.

## Araç bulma

1. Rider'ın kendi konumu, konum izni verildiğinde görünür. Bu izin onboarding sırasında istenir ve cihazın sistem ayarlarından yeniden verilebilir.
2. Kullanılabilir araçlar işaretçi olarak görünür.
3. Bir işaretçiye dokunmak araç detay sayfasını açar — tarifeler ve **Başlat** ile **Rezerve Et**.
4. Kaydırma, iki parmakla yakınlaştırma ve **Konumum** kontrolü beklendiği gibi çalışır.

### Bir işaretçinin ne gösterdiği kısmen rider'ın tercihidir

Bu [Ayarlar](../help/settings.md) anahtarları haritanın ne çizdiğini değiştirir:

- **Pil Seviyesini Göster**
- **Promosyon Araçlarını Göster**
- **Fiyatlandırmayı Göster**
- **Otomatik Yakınlaştırma**
- **Harita 3D**

Haritadaki bonus bölgeler ve araç sayfasındaki indirimli araç afişi şu anda uygulamada mevcut değildir.

## Bölgeler

Bölgeler, bir aracın nerede sürülebileceğini ve sürüşün nerede sonlandırılabileceğini belirler. Bir bölgeye dokunmak bölge bilgi sayfasını açar.

Belirli bir bölgenin ne yaptığı — kısıtlı alan, park yasağı, hız sınırı, ek ücret — tamamen sizin [Zones](../../settings/infrastructure/zones.md) sayfasında yaptığınız yapılandırmaya bağlıdır. Rider'a evrensel bir renk kodu verilemez; kendi yapılandırmanızı açıklayın.

Riderların en sık karşılaştığı bölge kuralı park etmeyle ilgilidir: **izin verilen park bölgesi dışında sürüş sonlandırmak reddedilir** ve uygulama haritada bölgeleri gösterme seçeneği sunan özel bir iletişim kutusu açar. Bu akış [Rides](rides.md#park-bölgesinin-dışında) bölümünde belgelenmiştir.

## Araç rezervasyonu

**Rezerve Et** gerçek bir tutma işlemidir ve gerçek bir zamanlayıcıya sahiptir, fiyatı araca bağlı tarifeden alınır:

1. Rider bir işaretçiye dokunur, ardından araç sayfasında **Rezerve Et** seçeneğine basar.
2. Ücretsiz pencere, tarifenin dakika cinsinden **Rezervasyon süresi**dir. Bu süre boyunca rezervasyon kartı **geri sayar**.
3. Ücretsiz pencere sona erdiğinde tutma **ücretli tutma** olur: kart **ileri saymaya** başlar ve tarifenin dakika başı **Ücretli rezervasyon fiyatı** uygulanır.
4. Ücretli tutma kısmı, tamamlanan sürüşün maliyet dökümünde kendi satırı olarak görünür.

Rider'a yanıt vermeden önce bilinmesi gereken notlar:

- **"Birkaç dakika" diye asla varsayımda bulunmayın.** Bazı tarifeler uzun ücretsiz süreler sunar — 12 veya 24 saat. Gerçek rakamı [Araç Tarifeleri](../../settings/infrastructure/vehicle-tariffs.md) sayfasındaki tarifeden okuyun.
- Eğer tarife **Rezervasyon süresi** alanını boş bırakırsa, uygulama kısa bir 3 dakikalık pencereye döner. Eğer **Ödenmiş rezervasyon fiyatı** boş bırakılırsa, küçük bir varsayılan dakika başı ücret uygulanır — her ikisini de açıkça belirleyin ki sürücüler sizin rakamlarınızı görsün.
- Bir rezervasyon şu durumlardan birindedir: _beklemede_, _aktif_, _süresi dolmuş_, _rezerve edilmiş_ veya _durdurulmuş_.
- Rezervasyon **verilen konum izni gerektirir**, ayrıca sürücü aracın çok uzağında olduğu veya o araçta bir rezervasyon bekleme süresi olduğu için reddedilebilir. Her reddediş kendi iletişim kutusunu açar — bkz. [Sürüşler](rides.md#sürücünün-sürüş-başlatamama-nedenleri).

## Sorun Giderme

| Sürücü der ki…                   | Kontrol edilecekler                                                                                                                                                     |
| -------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| "Araç göremiyorum"              | Konum izni verildi mi? Sonra: sürücü gerçekten hizmet verdiğiniz bir alanın içinde mi?                                                                                  |
| "Tarama butonu yok"             | Kaydedilmiş kartları destekleyen sağlayıcıda bağlı kart yok. [Ödeme Yöntemleri](../money/payment-methods.md) sayfasından kart ekleyin                              |
| "Filtreler butonu yok"          | Sürücünün özel araç etiketi yok veya zaten bir sürüşte ya da beklemede                                                                                                 |
| "Harita yüklenmiyor"            | Önce bağlantı, sonra **Ayarlar → Veri Modu** (_dengeli_ / _düşük_ / _yüksek_), bu harita karo kalitesini ve ne kadar detay indirileceğini kontrol eder                   |
| "Harita yavaş / ağır"           | Aynı: **Veri Modu**nu _düşük_ yapın ve [Ayarlar](../help/settings.md) sayfasında **Azaltılmış Animasyonlar**ı açın                                                    |
| "Sürüş başlatamıyorum"          | [Sürüşler](rides.md#sürücünün-sürüş-başlatamama-nedenleri) sayfasındaki kapıları sırayla kontrol edin — alt çubuk, plan ve ödeme, minimum başlangıç bakiyesi, konum, mesafe, bekleme, kanıtlar |

## İpuçları

- **Her şeyden önce alt çubuğu kontrol edin.** Sürücüden haritanın ekran görüntüsünü göndermesini isteyin; eksik alt çubuk sorunu anında teşhis eder.
- **Konum izni her zaman ikinci sorudur.** Konum yoksa rezervasyon olmaz ve çoğu durumda sürüş başlatılamaz.
- **Bölgeler sadece sizin onlara verdiğiniz anlamı taşır.** Sürücüye "orada park edemezsiniz" demeden önce bölgeyi gösterge panelinde açın ve gerçek yapılandırmasını okuyun.
- **Uzun ücretsiz rezervasyon süreleri herkesi şaşırtır**, kendi personeliniz dahil. Bir bekletme ücreti açıklamadan önce tarifedeki **Rezervasyon süresi**ni bilin.
