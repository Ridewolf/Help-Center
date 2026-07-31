# Başlarken — Kullanıcı Uygulaması Temelleri

Bu, yepyeni bir sürücüye uygulamanın kurulmasından ilk sürüşe kadar rehberlik eden bir anlatımdır. Ayrıca, bir sürüşün başlayıp başlayamayacağını belirleyen kuralları listeler, böylece destek personeliniz "neden sürüş yapamıyorum?" sorusuna tahmin etmeden yanıt verebilir.

Uygulamanın tam ekran haritası için bkz. [Overview](overview.md).

## Bir sürücünün yapabilecekleri

- Harita üzerinde yakınlardaki paylaşılan araçları bulmak, birini taramak veya dokunmak ve sürmek
- Bir cüzdan bakiyesi tutmak ve uygulamadan bakiye yüklemek
- Geçmiş sürüşleri ve ödemeleri, sürüş başına maliyet dökümü ile incelemek
- Etkinleştirdiğiniz kanallar veya canlı sohbet yoluyla destek almak
- Hesabı yönetmek: ad, fotoğraf, şifre, giriş yapılmış cihazlar

Abonelikler ve promosyon kodları şu anda uygulamada mevcut değildir — bkz. [Subscriptions](../money/subscriptions.md).

## Başlamadan önce

- Sürücünün operatörünüzün uygulamasının yüklü olduğu bir telefona ihtiyacı vardır
- Sürücünün, **Ayarlar → Şirketim → Uygulama → Kimlik Doğrulama Yöntemleri** altında etkinleştirdiğiniz giriş yöntemlerinden birine ihtiyacı vardır (bkz. [Şirketim](../../settings/administration/my-company.md))
- Hesap oluşturmak için kart veya ödeme kurulumu gerekmez — bu daha sonra, **Cüzdan** üzerinden yapılır

## İlk kurulum

### 1. Giriş yap

Tek bir sabit giriş akışı yoktur. Giriş ekranı, etkinleştirdiğiniz her yöntem için bir sekme gösterir ve olası yöntemler telefonla tek kullanımlık kod, e-postayla tek kullanımlık kod, WhatsApp kodu, e-posta ve şifre, Google, Apple, Telegram ve Viber'dir.

Bunu sürücüye "operatörünüzün sunduğu yöntemlerden biriyle giriş yap" olarak anlatın — "telefon numaranızı girin ve SMS bekleyin" olarak değil. Sekme başına alanlar ve kod girme adımları için bkz. [Signing in](../account/registration-login.md).

### 2. Onboarding'i tamamla

Yepyeni bir sürücü, haritaya ulaşmadan önce onboarding sürecinden geçirilir. Bazı adımlar koşulludur, bu yüzden farklı operatörlerdeki iki sürücü farklı sayıda ekran görebilir. Sıra şudur:

1. **Hakkımda** — üç adımlı bir ilerleyici: isteğe bağlı bir fotoğraf, ardından ad ve doğum tarihi, sonra iletişim bilgileri ve bir pazarlama onayı onay kutusu. **Bu adım aslında hesabı oluşturur.**
2. **Sürücü belgesi** — yalnızca şirket ayarlarınız bunu etkinleştirdiğinde (varsayılan olarak etkin değildir)
3. **Pasaport** — aynı şekilde etkinleştirildiğinde
4. **İzinler** — bildirimler, konum, kamera
5. **Tebrikler** — ardından haritaya geçiş

Kart veya ödeme kurulumu onboarding'in **parçası değildir**. Sürücü, istediği zaman bakiye yüklemek için daha sonra **Cüzdan** ekranından bir ödeme yöntemi ekler.

Onboarding sırasında sürücüye anlatmadan önce bilmeniz gereken iki şey: belge adımları tamamlanamaz (belge yükleme şu anda uygulamada mevcut değildir) ve izinler verildikten sonra **Devam Et** ve **Atla** düğmeleri şu anda ileriye gitmek yerine **Hakkımda** ilerleyicisine döner. Ayrıntılı bilgi için: [Onboarding and verification](../account/onboarding-verification.md).

### 3. Sürüşe başla

Onboarding haritada sona erer. Oradan sürücü bir araç seçer ([Map](../riding/map.md)) ve bir sürüş başlatır ([Rides](../riding/rides.md)).

## Uygulamanın bölümleri

| Bölüm               | Yol                       | Sürücünün orada yaptığı şey                                  |
| ------------------- | ------------------------- | ------------------------------------------------------------ |
| **Harita**          | `/map`                    | Ana ekran — bir araç bul ve seç                               |
| **Cüzdan**          | `/wallet`                 | Bakiye, bonuslar, bakiye yükleme, otomatik bakiye yükleme    |
| **Ödeme yöntemleri**| `/wallet/payment-methods` | Kaydedilmiş kartlar, bekleyen bakiye yüklemeleri            |
| **Geçmiş**          | `/history`                | **Sürüşler** ve **Ödemeler** sekmeleri; bir sürüşe dokunarak detay, rota haritası ve maliyet dökümünü gör |
| **Profil**          | `/profile`                | Hesap bilgileri, fotoğraf, şifre, hesap silme                |
| **Ayarlar**         | `/settings`               | Bildirimler, harita görünümü, dil, tema                       |
| **Oturumlar**       | `/settings/sessions`      | Giriş yapılmış tüm cihazlar                                   |
| **Gizlilik**        | `/privacy`                | Gizlilik politikası ve güvenlik yönergeleri                  |
| **Destek**          | `/support`                | **SSS** ve **İletişim** sekmeleri, ayrıca canlı sohbet       |

Bunların tümü haritadaki **yan menü**den açılır. Uygulamada alt sekme çubuğu yoktur.

## Bir sürüşü yöneten kurallar

Bunlar gerçek kurallardır ve yapılandırmanız tarafından belirlenir. Bir sayıyı ezberden vermek yerine değerleri Gösterge Paneli'nden kontrol edin.

| Kural                           | Kaynağı                                                                                                     |
| ------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| **Başlamak için minimum bakiye**| Tarifedeki minimum başlangıç bakiyesi, sadece kartı bağlı olmayan sürücülere uygulanır. Tarife bu değer verilmemişse, kural basitçe "bakiye sıfırın üzerinde olmalı"dır. Değeri tarifeden okuyun — bkz. [Araç Tarifeleri](../../settings/infrastructure/vehicle-tariffs.md) |
| **Sürüş nerede bitebilir**      | Bölgeleriniz. İzin verilen park bölgesi dışında bitirmek reddedilir ve uygulama özel bir iletişim kutusu gösterir — bkz. [Bölgeler](../../settings/infrastructure/zones.md) |
| **Sürüş öncesi ve sonrası fotoğraflar** | Şirket ayarlarınız: sürüş başında araç fotoğrafları ve selfie, sürüş sonunda park fotoğrafları. Her biri etkinleştirilebilir, zorunlu yapılabilir ve fotoğraf sayısı verilebilir. Varsayılan olarak hepsi etkin, bir fotoğraf ve zorunlu değil |

Hatırlanması gereken ekstra bir fotoğraf kuralı: sürüş başı selfisi etkinleştirildiğinde, duraklatılmış bir sürüşe devam etmek de selfie ister ve **bu selfie atlanamaz**.

Yukarıdakilerin adım adım açıklaması: [Rides](../riding/rides.md).

## Bir sürücüye tavsiye vermeden önce

- **Bildirimlerin etkinleştirilmesi önerilir** — [Ayarlar](../help/settings.md) içindeki sürüş ve promosyon bildirim anahtarları gerçek ve çalışıyor
- **Toplamlar Analitik ekranında değil, Geçmişte canlıdır**
- **Belge yükleme şu anda uygulamada mevcut değildir** — bir sürücüye belge alındı veya inceleniyor demeyin
- **Abonelikler ve promosyon kodları şu anda uygulamada mevcut değildir**

## Sonraki adımlar

- [Oturum açma](../account/registration-login.md) — her oturum açma yöntemi, alan alan
- [Başlangıç ve doğrulama](../account/onboarding-verification.md) — her başlangıç adımında istenenler
- [Cüzdan](../money/wallet.md) — ilk bakiye yüklemesi
- [Destek](../help/support.md) — sürücülerin ekibinize nasıl ulaşacağı
