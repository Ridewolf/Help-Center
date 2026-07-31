# Kaydolma ve Sürücü Doğrulaması

Kaydolma, yepyeni bir sürücünün ilk başarılı oturum açmasından sonra haritaya ulaşana kadar geçtiği ekranlar dizisidir. Bazı adımlar koşullu olduğundan, ekran sayısı operatörlere göre değişir.

Sürücü doğrulaması veya belge yüklemeleri hakkında herhangi bir soruya cevap vermeden önce bunu okuyun — dürüst cevap genellikle sürücünün beklediği cevap değildir.

Oturum açma işlemi [Signing in](registration-login.md) belgesinde ele alınmıştır.

## Adım sırası

| # | Adım                 | Rota                         | Göründüğü zaman                                                        |
| - | -------------------- | ---------------------------- | --------------------------------------------------------------------- |
| 1 | **Davet kodu**       | `/onboarding/invite`         | Şu anda uygulamada mevcut değil — sürücüler doğrudan **Hakkımda** adımına gider |
| 2 | **Hakkımda**         | `/onboarding/about-me`       | Her zaman. **Hesabın oluşturulduğu adımdır**                         |
| 3 | **Sürücü belgesi**   | `/onboarding/driver-license` | Yalnızca şirket ayarlarınız bunu etkinleştirdiğinde (varsayılan olarak etkin değildir) |
| 4 | **Pasaport**         | `/onboarding/passport`       | Aynı şekilde etkinleştirildiğinde                                    |
| 5 | **İzinler**          | `/onboarding/permissions`    | Her zaman                                                             |
| 6 | **Tebrikler**        | `/onboarding/congratulations`| Her zaman, ardından `/map`'e geçer                                   |

Sıralamaya dikkat edin: kayıt ve kişisel bilgiler belgelerden **önce**, izinler ise belgelerden **sonra** gelir — tam tersi değil.

## Hakkımda — hesabın oluşturulduğu adım

Üç adımlı bir ilerleyici:

1. **Fotoğraf** — isteğe bağlı, atlanabilir
2. **Ad ve doğum tarihi** — **Adı** zorunlu; **Soyadı** ve **Orta Adı** isteğe bağlı; **Doğum Tarihi** zorunlu ve bugünden sonraki bir tarih olamaz
3. **İletişim** — **E-posta** isteğe bağlı; telefon ülke kodu seçici ile girilir ve uluslararası numara olarak doğrulanır; pazarlama onayı kutusu **devam etmek için zorunludur**

Gönderildiğinde hesap oluşturulur. Fotoğraf seçildiyse hemen ardından yüklenir — fotoğraf yüklemesi başarısız olsa bile kayıt işlemi **bozulmaz**, hesap yine de oluşturulur.

Sonraki ekran şirket ayarlarınıza bağlıdır: etkinse **Sürücü belgesi**, değilse etkinse **Pasaport**, değilse doğrudan **İzinler** adımına geçilir.

### "Şifrem ne?"

Burada kayıt olan bir sürücüden şifre seçmesi istenmez. Daha sonra e-posta ve şifre ile oturum açmak isterse, önce **Şifremi unuttum** yoluyla bir şifre belirlemelidir — bkz. [Signing in](registration-login.md).

## Sürücü belgesi ve pasaport

Her biri üç adımlı bir ilerleyici — ön fotoğraf, arka fotoğraf, sonra belgeyi tutarken selfie — ve her adım kamera çekimi veya galeriden fotoğraf kabul eder. **Gönder** tüm üç resim mevcut olana kadar engellenir; sürücü "tüm fotoğraflar gereklidir" mesajını görür ve adım atlanamaz.

**Belge yükleme şu anda uygulamada mevcut değildir.** Gönderim hata verir ve sürücüyü aynı adımda bırakır. Başarılı bir yeniden deneme yoktur ve hiçbir belge resmi sistemlerinize ulaşmaz.

Pratikte bunun anlamı:

- Bir sürücüye (veya meslektaşınıza) belge alındı, inceleniyor veya saklanıyor demeyin — hiçbir şey yüklenmedi
- Bu ekranda takılı kalan bir sürücü yanlış yapmıyor: bu fotoğraf kalitesi, kamera veya ağ sorunu değildir
- Gerçek kimlik doğrulaması ekibiniz tarafından uygulama dışında yapılmalıdır
- Şirket ayarlarınız bu adımları etkinleştirmişse, operatörünüzdeki sürücüler bu adımlarla kaydolmayı tamamlayamaz. Ek adımları kapatın: **Ayarlar → Şirketim → Uygulama → Kayıt Ek Adımları** ([Şirketim](../../settings/administration/my-company.md)) — saklamak için bir nedeniniz yoksa

## İzinler

Ekran üç izin ister: **bildirimler**, **konum** ve **kamera**. Üçü de verildiğinde **Devam** kullanılabilir olur.

**Bilinen sorun:** hem **Devam** hem de **Atla** düğmeleri sürücüyü **Tebrikler** yerine **Hakkımda** ilerleyicisine geri götürür. Üç izni yeni veren bir sürücü kişisel bilgiler ilerleyicisinin başına dönebilir. Bu uygulamadaki bilinen bir sorundur, sürücü hatası değildir — sürücüyü dolandırmak yerine bunu belirtin.

Konum izni kaydolmanın ötesinde önemlidir: olmadan sürüş başlatılamaz. Bkz. [Rides](../riding/rides.md).

## Tebrikler

Sadece görüntüleme amaçlı bir ekran. Kaydolma verilerini temizler, "hesap incelemede" bildirimi gösterir ve haritayı açan **Devam** sunar.

Bildirim incelemenin ne kadar süreceğini belirtmez ve siz de belirtmemelisiniz — yayımlanmış bir süre yoktur. Ayrıca hiçbir belge yüklenmediği için henüz bir inceleme kuyruğu yoktur.

## Hesap Engellendi — `/onboarding/account-blocked`

Sürücünün hesabı engellendiğinde gösterilir. Olası nedenleri listeleyen sadece görüntüleme ekranıdır:

- Şartlar ihlali
- Dolandırıcılık
- Tekrarlayan ödeme hataları
- Şüpheli davranış
- Güvenlik endişeleri

Nedenlerin altında, Destek ekranı için yapılandırdığınız aynı **Destek kanalları** kullanılarak oluşturulmuş bir **Destek ile iletişime geç** akordeonu bulunur — telefon, e-posta, Telegram, WhatsApp ve web sitesi, her biri bağımsız olarak etkinleştirilir — hangi kanallar görünürse yapılandırmanıza bağlıdır. Bir **Girişe Geri Dön** düğmesi sağlanır.

Uygulama içinde bir itiraz akışı yoktur. Yolcunun ilerleyebileceği tek yol, ekibinizle bu kanallardan biri aracılığıyla iletişime geçmesidir. Sizin tarafınızda, müşteriyi **Dashboard** üzerinden inceleyip engelini kaldırın — bkz. [Client Detail](../../operations/customers/client-detail.md).

## SSS

- **Yolcu doğrulaması nasıl çalışır?** Uygulama içinde değil. Hesap **Hakkımda** bölümünde oluşturulur; belge adımları tamamlanamaz çünkü uygulamada belge yükleme şu anda mevcut değildir. Kimlik kontrollerini uygulama dışında yapın.
- **Neden bir yolcu pasaport adımını görürken diğeri görmüyor?** Belge adımları operatör bazındadır, **Kayıt Ekstra Adımlar** bölümünde ayarlanır.
- **Bir yolcu sürücü belgesi veya pasaport ekranında takıldı.** Beklenen durumdur. Orada gönderim her zaman başarısız olur — yolcu tarafından düzeltilemez.
- **Yolcu belge adımını atlayabilir mi?** Hayır. Gönderimden önce üç resmin tamamı gereklidir ve gönderim başarısız olur.
- **İnceleme ne kadar sürer?** Uygulama süre belirtmez, bu yüzden kesin bir süre vermeyin.
- **Yolcu fotoğraf kalitesinin reddedildiğini söylüyor.** Uygulama görüntü kalitesini hiç değerlendirmez. Gördükleri yükleme hatasıdır.
- **Hangi adım gerçekten hesabı oluşturur?** **Hakkımda**, 3. adım, gönderimde.
- **Davet kodu ekranı hiç görünmüyor.** Davet kodları şu anda uygulamada mevcut değildir.

## İlgili

- [Getting started](../basics/getting-started.md) — bu akışın kısa versiyonu
- [Signing in](registration-login.md) — giriş yöntemleri, kodlar, şifre sıfırlama
- [Profile](profile.md) — yolcunun sonradan değiştirebilecekleri
- [Support](../help/support.md) — Hesap Engellendi ekranında gösterilen kanallar
