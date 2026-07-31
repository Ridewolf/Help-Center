# Şirketim

**Şirketim** sayfası (`/settings/my-company`), operatör kimliğinizdir: filoyu işleten şirketin yasal bilgileri, markalaşması ve Rider App'in okuduğu yapılandırma — varsayılan harita şehri, giriş yöntemleri, destek kanalları ve yasal bağlantılar.

Sayfa, yalnızca **hem** view-company hem de edit-company izinlerine sahip operatörler tarafından görülebilir — düzenleme hakkı olmadan tamamen gizlenir, salt okunur olarak gösterilmez.

Gösterge Paneli'nin geri kalanı gibi, Şirketim de içinde bulunduğunuz arayüz moduna uyum sağlar:

- **Kolay mod** (arayüz modu anahtarında _Lite_ olarak etiketlenmiş) — temel bilgilerin salt okunur özeti ve bunları düzenlemek için rehberli **beş adımlı sihirbaz**.
- **Gelişmiş mod** — dört sekme: **Profil** (sekme şeridinde _Şirket_ olarak etiketlenmiş), **Uygulama Yapılandırması** (_Uygulama_ olarak etiketlenmiş), **Ödemeler** ve **Entegrasyonlar**.

Kolay moddan Gelişmiş moda geçiş onay ister ve ardından sayfayı yeniden yükler; gösterge paneli seçtiğiniz modu hatırlar.

## Kolay mod

Kolay mod, temel bilgileri bir bakışta gösterir — logo, iletişim bilgileri (e-posta, telefon, web sitesi, adres) ve şu anda etkin olan herkese açık destek kanalları — ayrıca diğer her şeyin salt okunur **Daha fazla detay** genel görünümünü: yasal varlık verileri, uygulama markalaşması, ödeme sağlayıcıları ve bağlı entegrasyonlar ile yasal bağlantılar.

İki eylem mevcuttur:

- **Detayları düzenle** rehberli sihirbazı açar (aşağıda).
- **Ödemeler ve entegrasyonlar için Gelişmiş moda geçiş yap** — ödeme sağlayıcı anahtarları ve entegrasyon kimlik bilgileri yalnızca Gelişmiş modda yapılandırılır; bu düğme sizi oraya götürür (onayla → sayfa yeniden yüklenir).

### Beş adımlı sihirbaz

**Detayları düzenle**, temel bilgileri adım adım geçirir ve her şeyi sonunda tek bir kaydetme ile işler:

1. **Ad ve logo** — şirket görüntü adı (zorunlu) ve logo.
2. **İletişim bilgileri** — e-posta, telefon, web sitesi.
3. **Adres** — ülke, şehir, adres, posta kodu.
4. **Destek kanalları** — sürücülerin uygulamada gördüğü herkese açık iletişim kanalları.
5. **İnceleme** — her alanın özetini satır düzenleme kısayollarıyla; **Onayla ve kaydet** tüm seti bir kerede işler.

## Gelişmiş mod

Dört sekme. Bir yapışkan altbilgi, yalnızca bir şey değiştiğinde alt kısımda **Vazgeç** ve **Değişiklikleri Kaydet** düğmelerini gösterir — Kaydet düğmesini görmüyorsanız henüz bir değişiklik yapılmamıştır.

### Profil sekmesi (_Şirket_)

Yasal varlık beş kartta:

- **Kimlik** — _Yasal ad_ (zorunlu), _Etiket_ (kısa görüntü adı; burada isteğe bağlı, ancak Kolay mod sihirbazı gerektirir), _Kayıt numarası_ (zorunlu) ve _Vergi kimlik numarası_ (isteğe bağlı, biçimin yargı alanına bağlı olduğunu açıklayan araç ipucu ile).
- **Konum** — _Ülke_, _Şehir_, _Adres_ ve _Posta kodu_ (tümü zorunlu).
- **İletişim** — _E-posta_ (zorunlu), _Telefon_ ve _Web sitesi_ (isteğe bağlı).
- **İzleyici bağlantısı** — salt okunur: şirketinize atanmış _Alan adı_ ve _Port_, hazır _Uç nokta_ dizesi (tek tıklama ile seçilir) ve bir araç izleyiciyi ona yönlendirmek için adım adım talimatlar. Cihazlar [İzleyici](../infrastructure/iot.md) sayfasında yönetilir.
- **İçerik** — _Açıklama_ (kısa metin) ve _Hakkında_ (daha uzun metin), her ikisi de canlı önizlemeli Markdown.

**Para birimi bu sekmede değildir.** Şirket para birimi (ve türetilmiş sembolü), **Ödemeler** sekmesinin ilk adımıdır — bkz. [Payments & Integrations](company-integrations.md).

### Uygulama Yapılandırması sekmesi (_Uygulama_)

Rider App'in okuduğu her şey, baştan sona:

- **Marka kimliği ve renkler** — uygulama adı, kısa adı, logo ve tema/vurgu renkleri (hex değerleri). Logo URL olarak ayarlanır ve satır içi önizleme vardır; doğrudan dosya yükleme henüz yok.
- **Varsayılan harita görünümü** — etkileşimli haritaya tıklayarak Rider App'in varsayılan şehrini ayarlayın; enlem, boylam ve yakınlaştırma kaydedilir ve tıklama ters coğrafi kodlama ile şehir adına çevrilir.
- **Kimlik doğrulama yöntemleri** — _Telefon OTP_, _E-posta OTP_, _E-posta ve şifre_, _Google_, _Apple_, _Telegram_ ve _WhatsApp_ için geçişler. Sosyal yöntemler yalnızca **Entegrasyonlar** sekmesindeki ilgili kart yapılandırılıp etkinleştirildikten sonra çalışır — bkz. [Payments & Integrations](company-integrations.md).
- **Kayıt ek adımları** — her biri bir kimlik, pozisyon ve _Zorunlu_ anahtarı ile ek kayıt adımları; **Adım Ekle** yeni bir satır ekler.
- **İletişim** — _Canlı sohbet_ anahtarı ve **Telegram OTP botu**: bir bot jetonu yapıştırın, **Sohbetleri Kontrol Et**ye tıklayın ve açılır menüden botun kullanacağı sohbeti seçin. Bu, Entegrasyonlar sekmesindeki Telegram kartından farklı bir ayardır — biri yapılandırıldığında diğeri otomatik yapılandırılmaz.
- **Destek kanalları** — _E-posta_, _Telefon_, _Web sitesi_, _Telegram_ ve _WhatsApp_, her biri etkinleştirme anahtarı ve bir değer ile; yalnızca etkin kanallar sürücülere gösterilir.
- **Yasal ve uyumluluk** — uygulamada gösterilen _Hizmet Şartları_, _Gizlilik Politikası_ ve _Lisanslar_ URL'leri.

### Ödemeler ve Entegrasyonlar sekmeleri

Ödeme ağ geçitleri (para birimi, maib / mia / Stripe sağlayıcı kartları, varsayılan sağlayıcı) ve servis entegrasyonları (Telegram, WhatsApp, Google, Apple, OpenAI) kendi makalesine sahiptir: **[Payments & Integrations](company-integrations.md)**. Hatırlanması gereken önemli nokta: bu kartlar **bireysel olarak kaydedilir**, bu sayfanın Değişiklikleri Kaydet altbilgisinden ayrı olarak.

## İş akışları

- **Bir telefon numarasını veya adresi hızlıca düzeltin** — Kolay mod → **Detayları düzenle** → adıma atla → **İncele** → **Onayla ve kaydet**.
- **Kayıtlı adresi güncelleyin (Gelişmiş)** — Profil sekmesi → Konum kartı → alanları düzenle → **Değişiklikleri kaydet**.
- **Rider App'in markasını değiştirin** — Uygulama Yapılandırma sekmesi → Marka kimliği → adı, renkleri ve logo URL'sini güncelle → **Değişiklikleri kaydet**.
- **Varsayılan harita şehrini değiştirin** — Uygulama Yapılandırma sekmesi → Varsayılan harita görünümü → yeni konuma tıklayın → **Değişiklikleri kaydet**.
- **Riderların Google ile giriş yapmasına izin verin** — önce Entegrasyonlar sekmesinde Google kartını yapılandırıp etkinleştirin, sonra Kimlik Doğrulama yöntemlerinde _Google_'ı etkinleştirin → **Değişiklikleri kaydet**.
- **Gerekli bir kimlik yükleme kayıt adımı ekleyin** — Uygulama Yapılandırma sekmesi → Kayıt ek adımları → **Adım ekle** → kimliği ve konumu ayarlayın, _Gerekli_'yi açın → **Değişiklikleri kaydet**.
- **Bir izleyiciyi şirketinize yönlendirin** — Profil sekmesi → İzleyici bağlantısı → _Uç Nokta_ dizgisini cihaz yapılandırmasına yapıştırın.
- **Güncellenmiş yasal belgeleri yayınlayın** — Uygulama Yapılandırma sekmesi → Hukuki ve uyumluluk → yeni genel URL'leri yapıştırın → **Değişiklikleri kaydet**.

## Yaygın sorular

- **Sayfayı hiç bulamıyorum.** Hem görüntüleme hem de şirket düzenleme izni gerekir — yöneticinize danışın.
- **Gelişmiş modda Kaydet düğmesi yok.** Altbilgi yalnızca bir şey değiştiğinde görünür.
- **Para birimi nerede?** Profil sekmesinde değil, **Ödemeler** sekmesinde — bkz. [Payments & Integrations](company-integrations.md).
- **Bir sosyal giriş yöntemi riderlar için çalışmıyor.** Önce ilgili Entegrasyon kartını yapılandırıp etkinleştirin, sonra kimlik doğrulama yöntemini etkinleştirin.
- **Logo yüklenmiyor.** Şu anda yalnızca URL verilebilir; doğrudan dosya yükleme daha sonra gelecek.
- **Haritaya tıklamak şehir adını doldurmuyor.** Koordinatlar ve yakınlaştırma yine kaydedilir — şehir adı tersine coğrafi kodlamadan gelir ve bazen kullanılamayabilir.
- **Sürüş fotoğrafı gereksinimleri nerede?** Burada değil — başlangıç/bitiş sürüş kanıtları her araç modeli için [Araç ayarları](../infrastructure/vehicle-settings.md) içinde yapılandırılır.
