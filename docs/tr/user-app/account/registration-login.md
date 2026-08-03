# Oturum Açma — Kodlar, Parolalar ve Messenger Girişi

Bir sürücünün haritaya ulaşmadan önce yaşadığı her şey: bir oturum açma yöntemi seçmek, tek kullanımlık kodu onaylamak, minimal bir profil doldurmak, parolayı kurtarmak veya Telegram ya da Viber botundan gelmek.

Bir sürücü uygulamaya giremediğinde bu makaleyi kullanın. İlk başarılı oturum açmadan *sonra* olanlar [Onboarding and verification](onboarding-verification.md) içinde ele alınmıştır.

## Bir sürücünün gördüğü oturum açma yöntemleri

Giriş ekranındaki sekmeler (`/auth/login`), **Ayarlar → Şirketim → Uygulama** altında etkinleştirdiğiniz **Kimlik Doğrulama Yöntemleri** temel alınarak oluşturulur. Her sürücü her yöntemi görmez. Olası yöntemler şunlardır:

- **Telefon** ile tek kullanımlık kod
- **E-posta** ile tek kullanımlık kod
- **WhatsApp** üzerinden tek kullanımlık kod
- **E-posta ve parola**
- **Google**
- **Apple**
- **Telegram**
- **Viber**

Bir sürücü bir yöntemin eksik olduğunu söylerse, o yöntem o operatör için etkin değildir. Bunu [Şirketim](../../settings/administration/my-company.md) içinde açın — sürücünün kendi tarafında yapabileceği bir şey yoktur.

## Her sekmedeki alanlar

| Sekme                    | Alanlar                                                                                         |
| ------------------------ | ---------------------------------------------------------------------------------------------- |
| **Telefon**              | Telefon numarası (en az 6 karakter) ve teslimat seçeneği — kodu **telefon** veya **WhatsApp** ile gönder |
| **E-posta**              | E-posta adresi                                                                                  |
| **Parola** — oturum açma | E-posta ve parola                                                                              |
| **Parola** — kayıt olma  | **Ad** (zorunlu, en az 2 karakter), **Soyad** (isteğe bağlı), e-posta, parola                  |

Telefon ve WhatsApp **ayrı teslimat yollarıdır**. Teslimat seçeneği WhatsApp olarak ayarlanmışken SMS bekleyen bir sürücü sonsuza kadar bekler.

**Google** ve **Apple** butonları bu yöntemler etkinleştirildiğinde görünür. Sürücü sağlayıcı sayfasından geri çıkarsa, hiçbir şey olmaz ve hata gösterilmez — bu beklenen durumdur, sadece iptal etmişlerdir.

## Yeni sürücü veya geri dönen sürücü

Kod gönderilmeden önce, uygulama iletişim bilgisinin mevcut bir hesaba ait olup olmadığını kontrol eder.

- **Geri dönen sürücü** — kod hemen gönderilir
- **Yeni sürücü** — önce kısa bir kayıt diyaloğu çıkar ve **Ad**, **Soyad** ile eksik olan iletişim bilgisini toplar: kod telefonla gidiyorsa e-posta, kod e-postayla gidiyorsa telefon

## Güvenlik kontrolü

Tek kullanımlık kod istenmeden önce giriş ekranında bir CAPTCHA yüklenmelidir. Yüklenmezse — engellenmiş ağ, çok eski tarayıcı motoru, uygulama içi tarayıcıda reklam engelleyici — kod isteği hiç gönderilemez. Sürücüden uygulamayı normal bir bağlantıyla yeniden açmasını isteyin.

## Tek kullanımlık kodun girilmesi — `/auth/otp`

1. Sürücü kodu yazar — tam olarak **6 rakam**, sadece rakam
2. Ekrandaki geri sayım sıfıra ulaştığında **Yeniden Gönder** aktif olur
3. Telefon kanalında, desteklenen telefonlar kodu otomatik doldurur ve gönderir

Sonraki adımlar:

- **Yeni sürücü** **Profili Tamamla** ekranına devam eder
- **Geri dönen sürücü** doğrudan uygulamaya girer

## Profili Tamamla — `/auth/complete-profile`

Sadece yeni sürücülere gösterilir. Şunları ister:

- **Ad** — zorunlu, en az 2 karakter
- **Soyad** — isteğe bağlı
- Hâlâ eksik olan iletişim bilgisi — kod telefonla geldiyse e-posta, kod e-postayla geldiyse telefon

Zaten toplanmış değerler önceden doldurulur ve hem ad hem iletişim bilgisi varsa form otomatik gönderilir. Bir **Atla** butonu mevcuttur.

Bir sürücünün telefon numarası daha sonra eksik çıkarsa, bu adımın kaydettiğini varsaymak yerine **Profil** ekranını kontrol ettirin — bkz. [Profile](profile.md).

## Parola seçmemiş sürücüler

Hesabını onboarding ile oluşturan sürücüden parola seçmesi istenmemiştir. Daha sonra **Parola** sekmesinden oturum açmak isterse, önce **Parolamı Unuttum** yoluyla parola belirlemelidir. Sürücüye "sadece alışık olduğu parolayı denesin" demeyin.

## Parolamı Unuttum — `/auth/forgot-password`

Tek alan: hesap e-postası. Gönderildikten sonra ekran üç sonuçtan birini gösterir ve bunlar farklı anlamlara gelir:

| Sürücünün gördüğü    | Anlamı                                        |
| --------------------- | --------------------------------------------- |
| **Yeşil mesaj**       | Sıfırlama e-postası başarıyla istendi         |
| **Sarı geri sayım**   | Bu cihazdan çok fazla deneme — zamanlayıcı bitene kadar bekleyin |
| **Kırmızı hata**      | İstek başarısız oldu — tekrar deneyin          |

Sarı geri sayım sürücünün kendi cihazında tutulur, bu yüzden başka bir telefona geçince devam etmez.

## Parolayı Sıfırla — `/auth/reset-password`

Sürücü bu ekranı sıfırlama e-postasındaki bağlantıdan açmalıdır. Geçerli bağlantı olmadan açılırsa, "bağlantı süresi doldu" uyarısıyla **Parolamı Unuttum** ekranına geri gönderilir — yeni bir e-posta isteyin.

Ekranda sürücü yeni bir parola ve onayını yazar. Parola kuralları yazarken canlı gösterilir ve form gönderilmeden önce iki alanın eşleşmesi gerekir.

## Messenger girişi (Telegram / Viber) — `/auth/messenger-callback`

Bir sürücü Telegram veya Viber botunuzdan başlattığında, botun bağlantısı bir köprü sayfası açar, bu sayfa uygulamayı açar, uygulama sürücüyü oturum açtırır ve uygulamaya düşürür.

İki başarısızlık durumu kendi mesajlarına sahiptir:

- **Hesap engellendi** — kullanıcı **Hesap Engellendi** ekranına yönlendirilir, bkz. [Onboarding and verification](onboarding-verification.md)
- **Rider erişimi gerekli** — hesap mevcut ancak bu operatörde rider hesabı değil

Başka herhangi bir durumda genel bir "geçersiz giriş" mesajı gösterilir; rider'ın bot ile yeni bir bağlantı üzerinden yeniden başlamasını sağlayın.

## Oran sınırları

Tek kullanımlık kodlar üzerindeki sınırlar sunucu tarafından belirlenir, uygulama tarafından değil. Ekran, sunucunun döndürdüğü bekleme süresine göre bir geri sayım gösterir. **Geri sayımı rider'a okuyun — asla sabit bir dakika sayısı vermeyin**, çünkü bu sabit değildir.

## Sorun Giderme

| Belirti                          | Anlamı ve yapılacaklar                                                                         |
| -------------------------------- | ------------------------------------------------------------------------------------------------ |
| Bir oturum açma yöntemi eksik     | **Kimlik Doğrulama Yöntemleri** bölümünde etkin değil. [Şirketim](../../settings/administration/my-company.md) altında etkinleştirin |
| Kod hiç gelmedi                   | Geri sayımın bitmesini bekleyin, sonra **Yeniden Gönder**. **Telefon** sekmesindeki teslimat seçeneğinin rider'ın beklediği yol olduğundan emin olun — telefon ve WhatsApp ayrı yollar |
| "Çok fazla deneme"              | Ekrandaki geri sayımı okuyun; bekleme süresi sunucudan gelmiştir                                |
| Kod isteği gönderilmiyor          | Giriş ekranındaki CAPTCHA muhtemelen yüklenmemiştir                                            |
| Rider şifresini bilmiyor          | Muhtemelen hiç şifre belirlemedi. Onu **Şifremi Unuttum** yoluyla yönlendirin                   |
| Sıfırlama bağlantısı süresi doldu | Rider **Şifremi Unuttum** ekranına yönlendirilir; yeni bir bağlantı isteyin                      |
| **Hesap Engellendi** ekranı       | [Onboarding and verification](onboarding-verification.md) içindeki engellenmiş hesap bölümüne bakın |
| Oturum açıldı ama hiçbir şey yüklenmiyor | [Oturumlar](sessions.md) kontrol edin — hesap silinme bekliyorsa, uygulamanın bazı bölümleri kısıtlanmıştır; bkz. [Profil](profile.md) |
