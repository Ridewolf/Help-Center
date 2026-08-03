# Rider App — Cüzdan ve Yüklemeler

Cüzdan (`/wallet`), yan menüdeki cüzdan bakiyesi satırından açılan sürücünün para ekranıdır. Mevcut bakiye, bonuslar, yükleme giriş noktası, otomatik yükleme anahtarı ve kaydedilmiş kartlara erişim içerir.

Kartlarla ilgili her şey — kart ekleme, kaldırma, varsayılan seçme ve bir yüklemenin tamamlanabileceği üç yol — [Ödeme Yöntemleri](payment-methods.md) sayfasında bulunur. Geçmiş yüklemeler, iadeler, borçlar ve bonuslar ise [Geçmiş](history.md) sayfasındadır.

## Ekranda neler var

| Öğe                          | Açıklaması                                                                                                      |
| ---------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| **Gerçek Bakiye**            | Sürücünün harcanabilir bakiyesi. Yanındaki yenileme simgesi, bakiyeyi sunucudan tekrar okur                        |
| **Bonuslar**                 | Sadece bonuslar etkinse gösterilen ayrı bir bonus bakiyesi                                                       |
| **Yükleme Tutarı** ön ayarları | Dört buton: **50**, **100**, **200**, **400**. Bu ekranda özel tutar alanı yoktur                                  |
| **Otomatik Yükleme**          | Kendi eşik ve tutar açıklamasıyla tek bir anahtar                                                                |
| **Ödeme Yöntemlerini Yönet** | [Ödeme Yöntemleri](payment-methods.md) (`/wallet/payment-methods`) sayfasını açar                                |

Bir sürücü bakiyesinin yanlış veya güncel olmadığını iddia ederse, **önce yenileme simgesine dokunmasını sağlayın** — bu önbelleğe alınmış değeri temizler ve canlı değeri okur. Bu, "yüklemem görünmüyor" şikayetlerinin çoğunu çözer.

## Sürücü nasıl yükleme yapar

1. Cüzdanı açın.
2. Ön ayar tutarlardan birini seçin — 50, 100, 200 veya 400.
3. Yüklemeyi onaylayın.

Sonraki adım tamamen kullanılan ödeme sağlayıcısına bağlıdır ve tam olarak **üç** olasılık vardır:

| Sağlayıcı akışı                  | Sürücünün deneyimi                                                                       | Uygulamadan çıkar mı? |
| -------------------------------- | ---------------------------------------------------------------------------------------- | --------------------- |
| **Uygulama içi onay** (Stripe)   | Ödeme, kaydedilmiş karta karşı uygulama içinde onaylanır                                 | Hayır                 |
| **Yönlendirme** (MAIB ve benzeri) | Harici bir tarayıcı açılır, sürücü bankanın sayfasında ödemeyi yapar, uygulama onay bekler | Evet                  |
| **QR ile ödeme** (MIA ve benzeri) | Geri sayımlı QR / banka uygulaması ödemesi, uygulama onay bekler                         | Evet                  |

**Sadece uygulama içi onay akışı uygulamadan çıkmadan tamamlanır.** Yönlendirme ve QR akışlarında, sürücüye paranın anında geldiğini asla söylemeyin — önce dışarıda ödemeyi tamamlamaları gerekir. Üçü için adım adım talimatlar [Ödeme Yöntemleri](payment-methods.md#yükleme--üç-akış) sayfasındadır.

## Yüklemeden hemen sonra ne olur

Bakiye uygulamada hemen güncellenir, ardından uygulama sunucuya karşı doğrular ve artan gecikmelerle (yaklaşık yarım saniye, sonra 1, 2, 4 ve 8 saniye) birkaç kez tekrar dener. Hiç onay gelmezse, gösterilen bakiye **orijinal değerine geri alınır.**

Kısa süreli görünüp sonra kaybolan bakiye tek bir anlama gelir: **ödeme hiç onaylanmamıştır.** Bekleyen yüklemeler listesini [Ödeme Yöntemleri](payment-methods.md#bekleyen-yüklemeler) ekranında kontrol edin.

## Otomatik Yükleme

- Tek bir anahtar, sürücü açarken onay iletişim kutusu gösterilir.
- Mevcut sağlayıcı uygulama içinde ödemeleri onaylayamıyorsa **devre dışı**dır. Bu yüzden sadece yönlendirme veya QR sağlayıcısı kullanan sürücüler bunu açamaz.
- Eşik ve tutar ekran üzerinde açıklanır. Ekrandan okuyun — rakamları ezberden söylemeyin ve ekranda olmayan limitleri belirtmeyin.

## Ödeme geçmişi nerede bulunur

Burada değil. Yüklemeler, iadeler, borçlar ve bonuslar, miktar ve durum renk kodlamasıyla [Geçmiş](history.md#ödemeler-sekmesi) sayfasının **Ödemeler** sekmesinde listelenir. Operatör tarafındaki defteriniz [Ödemeler — Geçmiş](../../operations/payments/payments.md) sayfasındadır.

## Sorun Giderme

| Rider der ki…                          | Kontrol edilecekler                                                                                                                        |
| --------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| "Bakiyem yanlış / güncel değil"         | **Gerçek Bakiye** yanındaki yenileme simgesine dokunun                                                                                     |
| "Ödeme reddedildi"                      | Kart veya banka tarafı reddi. Başarısızlık kodu [Geçmiş → Ödemeler](history.md#ödemeler-sekmesi) kaydında bulunur                            |
| "Yetersiz bakiye"                      | Bakiye, işlemin gerektirdiği miktarın altında. Önce bakiye yükleyin — ve kartı olmayan sürücüler için sürüş başlatmanın kendi [minimum başlangıç bakiyesi](../riding/rides.md#sürücünün-sürüş-başlatamama-nedenleri) olduğunu unutmayın |
| "Otomatik bakiye yüklemeyi açamıyorum" | Aktif sağlayıcı, uygulama içinde ödemeleri onaylayamıyor                                                                                   |
| "Yüklemem gitmedi"                      | [Ödeme Yöntemleri](payment-methods.md#bekleyen-yüklemeler) sayfasındaki bekleyen bakiye yüklemelerini kontrol edin. Tamamlanmamış yönlendirme veya QR ödemeleri orada durur ve iptal edilebilir |
| "İadem ne zaman gelir?"                 | Gün sayısı vaat etmeyin — uygulamada iade zamanlaması tanımlı değildir. İade edilen ödemeler, Ödemeler sekmesinde iade edilmiş olarak görünür |

## İpuçları

- **Araştırmaya başlamadan önce yenileyin.** "Para kayboldu" biletlerinin yarısı önbelleğe alınmış bakiyedir.
- **Cevap vermeden önce sağlayıcınızın akışını bilin.** "Anında" sadece uygulama içi onay için geçerlidir; diğer iki yöntem sürücünün banka tarafında işlemi tamamlamasını gerektirir.
- **Kaybolan bakiye, onaylanmamış bir ödemedir**, kayıp değil. Doğrudan bekleyen bakiye yüklemelerine gidin.
- **Kart bağlamak, sürüş bakiyesi engelini tamamen kaldırır** — küçük miktarlarda sürekli bakiye yükleyen sürücüler için bu daha iyi bir tavsiyedir.
