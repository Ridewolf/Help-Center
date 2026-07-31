# Ödemeler ve Entegrasyonlar

[Şirketim](my-company.md) sayfasının (`/settings/my-company`, **Gelişmiş mod**) **Ödemeler** ve **Entegrasyonlar** sekmeleri, üçüncü taraf kimlik bilgilerinin bulunduğu yerlerdir: sürücülerinizi ücretlendiren ödeme ağ geçitleri ve girişler, mesajlaşma ve yapay zeka asistanını sağlayan servis entegrasyonları.

Gelişmiş modda, Şirketim dört sekmeye sahiptir — Profil, Uygulama Yapılandırması, **Ödemeler**, **Entegrasyonlar**. Bu makale son iki sekmeyi kapsar.

## Ödemeler sekmesi

1. **Şirket para birimini seçin** — para birimi (ve türetilmiş sembolü) burada düzenlenir, **Profil sekmesinde değil**. Açılır menüde 16 kod sunulur: USD, EUR, GBP, CHF, RON, MDL, GEL, UAH, RUB, TRY, PLN, CZK, HUF, BGN, ILS, AED.
2. **Her ödeme sağlayıcısı için bir kart yapılandırın** — **maib**, **mia**, **Stripe**.
3. Her kartın bir **etkinleştirme** anahtarı, kendi kimlik bilgisi alanları ve bir **varsayılan** onay kutusu vardır.

Tam olarak **bir sağlayıcı yeni ücretlendirmeler için varsayılan olarak görev yapar** ve bu, etkinleştirilmiş/desteklenen sağlayıcılardan biri olmalıdır.

## Entegrasyonlar sekmesi

Her biri kendi etkinleştirme anahtarı ve kimlik bilgilerine sahip beş kart:

| Kart          | Kimlik Bilgileri                                   | Sağladıkları                  |
| ------------- | ------------------------------------------------- | ----------------------------- |
| **Telegram**  | bot token, bot kullanıcı adı                       | Telegram girişi / mesajlaşma  |
| **WhatsApp**  | iş hesabı kimliği, telefon numarası kimliği, erişim tokenı | WhatsApp girişi / mesajlaşma  |
| **Google**    | istemci kimliği, istemci sırrı                     | Sürücüler için Google girişi  |
| **Apple**     | istemci kimliği, takım kimliği, anahtar kimliği, özel anahtar | Sürücüler için Apple girişi   |
| **OpenAI**    | API anahtarı                                       | Gösterge Paneli yapay zeka asistanı |

## Her kart kendi içinde kaydedilir

Her ödeme sağlayıcısı ve entegrasyon kartı **bireysel olarak kaydedilir** — hiçbiri sayfa genelindeki kaydın parçası değildir. Profil veya Uygulama Yapılandırması sekmesini kaydetmek bu kartları kaydetmez, tersi de geçerlidir. **Değiştirdiğiniz her kartı kaydedin.**

## Sürücü giriş yöntemleriyle ilişkisi

Uygulama Yapılandırması sekmesindeki Google, Apple, Telegram ve WhatsApp için kimlik doğrulama yöntemleri, yalnızca **ilgili Entegrasyonlar kartı etkinleştirilip yapılandırıldıktan sonra** çalışır. Önce entegrasyonu yapılandırın, sonra giriş yöntemini etkinleştirin.

## Gizli bilgiler

- Gizli alanlar, tarayıcı şifre yöneticilerinin yakalamaya veya otomatik doldurmaya çalışmasını engelleyen şekilde **görsel olarak maskelenmiştir**.
- **Bir gizli bilgiyi döndürürken, maskelenmiş yer tutucuya güvenmek yerine tam değeri kasıtlı olarak yeniden girin.**

## Telegram: iki farklı ayar

Entegrasyonlar Telegram kartından ayrı olarak, bir **Telegram OTP-bot keşif** akışı vardır: bir bot tokenı girin, **Sohbetleri Kontrol Et** düğmesine tıklayın ve açılan listeden bir sohbet seçin. Bu akış tek kullanımlık şifre teslimi içindir ve Entegrasyonlar Telegram kartından **farklı bir ayardır** — birini yapılandırmak diğerini yapılandırmaz.

## Yaygın sorular

- **Bir kimlik bilgisi değiştirdim ama etkisi olmadı.** Her kart kendi içinde kaydedilir — sadece sayfayı değil, o spesifik kartı kaydettiğinizden emin olun.
- **Sosyal giriş sürücüler için kullanılamıyor.** Sağlayıcı kartı burada etkinleştirilmeli ve yapılandırılmalıdır, ardından Uygulama Yapılandırması'ndaki eşleşen giriş yöntemi çalışır.
- **Varsayılan ödeme sağlayıcısını seçemiyorum.** Varsayılan yalnızca gerçekten desteklenen ve yapılandırılmış sağlayıcılar arasından seçilebilir.
- **Para birimi alanı nerede?** Bu Ödemeler sekmesindedir — Profil sekmesinde değil.
- **"Sohbetleri Kontrol Et" geçerli token ile başarısız oluyor.** Öncelikle ortam/bağlantı sorunu olarak değerlendirin, tokenın yanlış olduğunu varsaymayın.
