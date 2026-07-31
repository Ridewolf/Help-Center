# Rider App — Ödeme Yöntemleri ve Yükleme Akışları

Bir sürücünün nasıl ödeme yaptığına dair her şey: kayıtlı kart listesi, kart ekleme ve kullanılan ödeme sağlayıcısına bağlı olarak tamamlanan üç farklı yükleme yöntemi.

| Ekran                 | Rota                         | Erişim Yolu                              |
| --------------------- | ---------------------------- | ----------------------------------------- |
| Ödeme Yöntemlerini Yönet | `/wallet/payment-methods`   | [Wallet](wallet.md) → **Ödeme Yöntemlerini Yönet** |
| Kart Ekle             | `/wallet/add-payment-method` | Yukarıdaki ekranda **Kart Ekle**          |
| Yükleme Yönlendirmesi | `/wallet/topup-redirect`     | Yönlendirme sağlayıcısında yüklemeyi onaylama |
| QR ile Yükleme        | `/wallet/topup-qr`           | QR sağlayıcısında yüklemeyi onaylama       |

Bu sayfa, en yaygın iki sürücü şikayetine yanıt verir: _"Kart Ekle düğmesi yok"_ ve _"ödeme beklemede takıldı"_.

## Ödeme Yöntemlerini Yönet

Üstte bir **sağlayıcı seçici** bulunur ve ekranın geri kalanı o sağlayıcının desteklediklerine göre uyarlanır:

- Sağlayıcı **kayıtlı kartları desteklemiyorsa**, kart listesi hiç gösterilmez — bunun yerine boş durum mesajı görünür.
- Sağlayıcı **yeni kart kaydetmeyi desteklemiyorsa**, **Kart Ekle** düğmesi tamamen gizlenir. Bu, sürücünün neden kart ekleyemediğine verilen cevaptır.

Her kayıtlı yöntem türünü (kart veya Apple Pay / Google Pay gibi cüzdan), marka, son dört hane, son kullanma ay ve yılı ile varsayılan olup olmadığını gösterir. Liste sonsuz kaydırma ile 10'ar 10'ar yüklenir.

**Varsayılan olarak ayarla** ve **Kaldır** işlemleri onay ister, ardından liste yenilenir.

### Bekleyen Yüklemeler

Kartların altında, sürücünün ödeme kayıtlarından oluşturulan bir **Bekleyen Yüklemeler** listesi bulunur: tutar, para birimi, tarih, durum ve sağlayıcı. Varsayılan olarak **en son iki** gösterilir, genişletmek için **Tümünü göster** düğmesi vardır.

Bu liste, tamamlanmamış bir yönlendirme veya QR ödemesinin bulunduğu yerdir. Parası "gitmeyen" bir sürücünün burada tamamlamadığı bir kaydı neredeyse her zaman vardır — ve buradan iptal edilebilir.

Aynı ekranda bulunan bir **Nasıl yüklenir** akordeonu, seçilen sağlayıcıya özgü talimatlar verir.

## Kart ekleme

1. **Wallet → Ödeme Yöntemlerini Yönet → Kart Ekle** yolunu açın.
2. **Kart Sahibinin Adı**, sürücünün profilinden (adı ve soyadı) önceden doldurulur.
3. Kart numarası, son kullanma tarihi ve CVC, uygulamanın giriş alanlarında değil, **ödeme sağlayıcısının kendi güvenli kart çerçevesinde** girilir. Çerçeve ekran açıldığında yüklenir.
4. **Gönder** düğmesi, iki koşul sağlanana kadar engellenir: güvenli çerçeve tamamen yüklendi ve tüm alanlar eksiksiz ve doğrulama hatası olmadan tamamlandı. Aktif olmayan Gönder düğmesi genellikle bu iki durumdan biridir.
5. Alternatif olarak sürücü, kart girmek yerine **Apple Pay / Google Pay** cüzdan düğmesini kullanabilir.
6. Başarılı olursa kart listesi yenilenir ve ekran Ödeme Yöntemlerini Yönet'e döner.

Ekrandaki bir güvenlik bilgisi iletişim kutusu, ödeme sağlayıcısının kart verilerini işlediğini ve uygulamanın tam kart numarasını asla saklamadığını açıklar. Bu doğru ve endişeli sürücülere alıntı yapmak için değerlidir.

## Yükleme — üç akış

Sürücü her zaman aynı şekilde başlar — **Wallet → önceden belirlenmiş bir tutar seç → onayla** — ve ardından hangi akışın çalışacağı sağlayıcı tarafından otomatik olarak belirlenir.

### 1. Uygulama içi onay (Stripe)

Ödeme, kayıtlı karta karşı uygulama içinde onaylanır. Tarayıcı veya dış adım yoktur. Bu, anlık yükleme gibi davranan tek akıştır ve **Otomatik Yükleme** yalnızca bu akışta etkinleştirilebilir.

### 2. Yönlendirme sağlayıcıları (MAIB ve benzerleri)

1. Sürücü tutarı onaylar.
2. Uygulama **sağlayıcının ödeme sayfasını** sistem veya uygulama içi tarayıcıda otomatik olarak açar.
3. Sürücü o sayfada ödemeyi yapar.
4. Bu arada uygulama ödeme durumunu yaklaşık **her 5 saniyede bir** kontrol eder.
5. Sürücü ayrıca **Zaten Ödedim** düğmesine dokunarak anlık kontrolü zorlayabilir.
6. Tamamlanmamış bir ödeme ekrandan **iptal edilebilir** — bu, bekleyen ödemeyi temizler ve Wallet'a döner.

### 3. QR sağlayıcıları (MIA ve benzerleri)

1. Ekran, kasanın süresi dolana kadar canlı bir **DD:SS geri sayımı** gösterir.
2. **Banka Uygulamasında Aç** kasayı açar — yerel olarak, harici tarayıcıda veya uygulama içi tarayıcı penceresinde.
3. **Bağlantıyı Kopyala** kasanın bağlantısını panoya kopyalar, böylece sürücü başka bir cihazda tamamlayabilir.
4. Geri sayım bittiğinde Aç düğmesi devre dışı kalır ve **Bağlantı Süresi Doldu** rozeti görünür. **Süresi dolan kasa canlandırılamaz** — sürücü yeni bir yükleme başlatır.
5. Durum kontrolü, **Zaten Ödedim** ve iptal işlemleri yönlendirme akışıyla tamamen aynıdır.

## Sorun Giderme

| Rider der ki…                       | Nedir                                                                                                                                                 |
| ------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| "Nasıl bakiye yüklerim?"            | Cüzdan → önceden belirlenmiş bir tutar seçin → ardından sağlayıcının kullandığı üç akıştan biri. Sadece uygulama içi onay uygulamadan çıkmadan tamamlanır |
| "Kart Ekle düğmesi yok"             | Aktif sağlayıcı yeni kart kaydetmeyi desteklemiyor                                                                                                   |
| "Kartlar listelenmiyor"             | Aktif sağlayıcı kayıtlı kartları desteklemiyor                                                                                                       |
| "Kart formu gönderilmiyor"          | Güvenli kart çerçevesi yüklenmeyi tamamlamadı veya hala eksik ya da geçersiz bir alan bildiriyor                                                      |
| "Ödemem beklemede takıldı"          | Yeniden kontrol etmek için **Zaten Ödedim**'e dokunun. Hala çözülmezse, **Bekleyen Yüklemeler**'den iptal edin ve tekrar deneyin. Bekleyen kayıt ayrıca operatör uzlaştırması gerektirebilir — bkz. [Bekleyen Webhook'lar](../../operations/payments/pending-webhooks.md). **Çözüm süresi vaat etmeyin** |
| "QR bağlantısı süresi doldu"        | Yeni bir bakiye yüklemesi başlatın; süresi dolan yükleme yeniden açılamaz                                                                             |
| "Ödeme reddedildi"                  | Banka tarafı reddi. Başarısızlık kodu [Geçmiş → Ödemeler](history.md#ödemeler-sekmesi) kaydında bulunur                                                     |
| "Otomatik bakiye yükleme limitleri nedir?" | Limitleri belirtmeyin — uygulamada tanımlı limit yoktur. Cüzdan ekranının kendi açıklamasını okuyun                                                  |

## İpuçları

- **Ekranı sağlayıcı belirler.** "Neden yapamıyorum…" sorusuna yanıt vermeden önce, sürücünün hangi sağlayıcıda olduğunu kontrol edin — eksik düğmelerin yarısı sağlayıcı yeteneklerinden kaynaklanır, hata değil.
- **Para ile ilgili her sorunda ilk bakılacak yer Bekleyen Yüklemeler'dir**, kart reddi dışında.
- **İptal edin, sonra tekrar deneyin.** Takılı kalan bekleyen ödeme, sürücünün zihinsel modelini hesaplarından daha çok engeller; iptal edip yeniden başlamak genellikle beklemekten daha hızlıdır.
- **Kendi güvence sözleriniz yerine güvenlik iletişim kutusunu alıntılayın.** Kart verilerinin kim tarafından saklandığını tam olarak belirtir.
- **Kart eklemek sadece bakiye yüklemeyi etkinleştirmez** — aynı zamanda sürüşlerde minimum başlangıç bakiyesi engelini kaldırır ve **Tara** düğmesini görünür yapar. Bkz. [Harita](../riding/map.md#alt-çubuk-koşullu).
