# Uyarılar ve Bildirimler

Uyarılar ve Bildirimler sayfası (`/settings/alerts-notifications`), **operatör uyarı konsolu**dur — platformun _personeline_ bir şeyin dikkat gerektirdiğini bildirme şeklidir. Kanalları (push / uygulama içi / e-posta / SMS), dış sağlayıcıları (SendGrid, Twilio, Telegram, Slack, Discord, webhook'lar), uyarıları tetikleyen kuralları, mesaj şablonlarını, yükseltme politikalarını, kimlerin abone olduğunu ve teslimat günlüğünü kapsar.

Bu sayfa, **platformu yöneten ekip için uyarılar** hakkındadır. Sürücüye yönelik bildirim metinleri (Sürüş başladı, Ceza uygulandı vb.) için [General](general.md) dosyasındaki _Notifications_ sekline bakınız.

> _Not_: bu sayfa şu anda **yalnızca ön yüz prototipidir** — kanal yapılandırmaları, kurallar, abonelikler ve teslimat günlüğü yerel durumda tutulur (veya `mockData.ts`'den alınır). _Değişiklikleri kaydet_ bir onay bildirimi gösterir ancak henüz herhangi bir arka uç noktasına göndermez. Sayfanın yapısı gerçek modele uygundur ve API çalışması için güvenli bir spesifikasyon olarak kullanılabilir.

Gerekli izin: rotada özel bir `requiredPermissions` ayarı yoktur — giriş yapmış herhangi bir operatör açabilir.

## Üst araç çubuğu

Sayfa başlığında dört düğme vardır:

| Eylem        | Ne yapar                                                                                                                  |
| ------------ | ------------------------------------------------------------------------------------------------------------------------- |
| Otomatik yenileme | Paylaşılan `AutoRefresh` bileşeni — burada işlevsiz, diğer sayfalarla uyum için mevcut                                         |
| Hepsini test et   | "Hepsi test ediliyor" bildirimi gösterir — "etkin tüm kanallara test gönder" için yer tutucu                             |
| 1 saat sustur    | "1 saat susturuldu" bildirimi — genel 1 saatlik susturma için yer tutucu                                                |
| Bakım           | Yıkıcı kırmızı düğme — onay isteyen bir Uyarı Diyaloğu açar; onaylandıktan sonra bakım etkinleştirildi bildirimi gösterir |

## Sekmeler

Yedi sekme üstte yan yana. Her biri ayrı bir alt bileşendir.

| Sekme          | Amaç                                                                                  |
| -------------- | ------------------------------------------------------------------------------------- |
| Kanallar       | Dahili kanallar (push / uygulama içi / e-posta / SMS) + önem derecesi yönlendirmesi + özetler |
| Sağlayıcılar   | Dış sağlayıcı kimlik bilgileri (E-posta / SMS / Telegram / Slack / Discord / Webhook)  |
| Kurallar       | Olay ailesi başına uyarı kuralları                                                    |
| Şablonlar      | Olay ailesi × dil başına bildirim metni                                              |
| Politikalar    | Yükseltme zinciri, otomatik susturma, hedef kitle güvenliği, KİB gizleme             |
| Abonelikler    | Hangi rol veya kullanıcı hangi olay ailelerini hangi kanallarda alır                 |
| Günlükler      | Salt okunur teslimat günlüğü (gönderilen / onaylanan / başarısız kayıtlar)           |

### Kanallar

Üç kart üst üste dizili.

**Dahili kanallar**

- _Push_ — tam yapılandırma (etkin anahtarı, hız limiti, yeniden denemeler, sessiz saatler başlangıç/bitiş, test düğmesi).
- _Uygulama içi_ — etkin, hız limiti, otomatik kapatma süresi.
- _E-posta_ — Sağlayıcılar sekmesindeki E-posta sağlayıcısına bağlı. Etkin, hız limiti, yeniden denemeler.
- _SMS_ — SMS sağlayıcısına bağlı. Etkin, hız limiti, yeniden denemeler, sessiz saatler.

**Önem derecesi eşlemesi** — üç açılır menü ile `info` → `inApp` (varsayılan), `warning` → `push`, `critical` → `push+email`. Bir kural bu önem derecesine sahip ancak belirli kanalları belirtmezse bu kanallar kullanılır.

**Özet (Digest)** — sıklık (kapalı / saatlik / günlük / haftalık) + gönderim zamanı (HH:00 seçici).

### Sağlayıcılar

Altı sağlayıcı bloğu, her biri etkinleştirme anahtarı ve kimlik bilgileri içerir.

- _E-posta_ — sağlayıcı türü açılır menüsü (SMTP / SendGrid / Mailgun), API anahtarı veya SMTP kimlik bilgileri (maskelenmiş giriş), gönderici alan adı.
- _SMS_ — Hesap SID, Yetki belirteci (maskelenmiş), gönderici numarası — Twilio biçimi.
- _Telegram_ — Bot belirteci (maskelenmiş) + sohbet kimliği seçici (üç demo sohbetten sabit liste: `@ridewolf_alerts`, `@support_team`, `@management`; **Test** düğmesi yer tutucudur).
- _Slack_ — webhook URL'si + kanal.
- _Discord_ — webhook URL'si.
- _Webhook_ — genel webhook URL'si + imzalama sırrı.

Her sağlayıcı bloğu, anahtarı açıldığında başlığın yanında _Etkin_ rozeti gösterir. _Test_ düğmeleri bir bildirim tetikler.

### Kurallar

Bir uyarı kuralları tablosu. Sütunlar: Ad / Olay ailesi / Önem derecesi / Kanallar / Durum / Eylemler (3 nokta menüsü: Düzenle / Kopyala / Etkinleştir-Pasifleştir / Sil). **+ Kural oluştur** düğmesine tıklayınca Kural Diyaloğu açılır — ad, kapsam (genel / bölge / rol), bir veya daha fazla olay ailesi, önem derecesi (bilgi / uyarı / kritik), kanallar ve etkin bayrağı seçilir.

Önceden eklenmiş kurallar: _Ödeme hataları_ (kritik, ödemeler ailesi, push+email+telegram) ve _Araç çevrimdışı_ (uyarı, araçlar ailesi, push+email).

### Şablonlar

Bir olay ailesi + dil + kanal seçin, sonra başlık ve gövdeyi düzenleyin. Gövde, **Önizleme** bloğunun örnek olayla genişlettiği yer tutucuları (örneğin `{{ride.id}}`, `{{amount}}`) destekler. _Test gönder_ seçili kanala test gönderildiğini bildiren bir bildirim tetikler.

### Politikalar

Dört blok:

- _Kritik yükseltme_ — zincir açılır menüsü (örneğin push → e-posta → telegram → SMS), onay zaman aşımı (dakika), okundu bildirimi gereksinimi anahtarı.
- _Otomatik susturma_ — tekrarları sessize alma: aynı olay _M_ dakikada _N_ kez tetiklenirse, _K_ dakika sustur (üç sayısal giriş). Altında kuralı özetleyen bir metin.
- _Hedef kitle güvenliği_ — _Sessiz saatler dışında SMS engelle_ anahtarı (özellikle SMS için kanal bazlı sessiz saatleri geçersiz kılar).
- _Veri gizleme_ — _Dış mesajlarda KİB gizle_ anahtarı; hangi bilgilerin maskelendiğini açıklayan ipucu (telefon, e-posta, kartların son 4 hanesi vb.).

### Abonelikler

Abonelik girişlerinin bir tablosu. Her satır, bir hedefi (bir Rol veya belirli bir Kullanıcı) bir veya daha fazla etkinlik ailesi ve kanala bağlar — örneğin _Rol: Yönetici → sistem + ödemeler → push + e-posta_. **+ Oluştur** düğmesi bir abonelik iletişim kutusunu açar; satır menüsünde Düzenle / Sil seçenekleri bulunur.

Abonelikleri, bir Kuralda sabitlenmiş herhangi bir kanal ile eşleşmeyen kişilere uyarılar göndermek için kullanın — Kurallar _ne_ hakkında uyarılacağını tanımlar, Abonelikler ise _kimin_ duyacağını belirler.

### Günlükler

Yalnızca okunabilir teslimat denemeleri tablosu. Sütunlar: Zaman / Etkinlik / Rota / Kanal / Alıcı / Durum (gönderildi / onaylandı / başarısız) / Gecikme. Bir satıra tıklayarak detaylı bir bildirim açılır (tam detay paneli için yer tutucu). Bir uyarının gerçekten gönderildiğini doğrulamak veya başarısız olan bir sağlayıcıyı hata ayıklamak için kullanın.

## Etkinlik aileleri

Kurallar, Şablonlar ve Abonelikler, aynı sabit etkinlik ailesi listesine dayanır (`models/channels.ts` içinde tanımlanmıştır):

`authProfile` · `dashboard` · `vehicles` · `rides` · `payments` · `marketing` · `rebalance` · `support` · `maintenance` · `settings` · `system`

Bunlar kabaca gösterge panelinin alanlarına karşılık gelir — uyarı vermek istediğiniz etkinlik türüne uygun aileyi seçin.

## İş akışları

- **E-posta uyarılarını bağlayın** — Sağlayıcılar sekmesi → E-posta'yı etkinleştir → sağlayıcı türünü seç → API anahtarını yapıştır → kaydet → Kanallar sekmesine dön → E-posta kanalını etkinleştir → tamam.
- **Ödeme başarısızlıklarında sayfa alın** — Kurallar sekmesi → _Ödeme hataları_ düzenle → şiddetin `critical` olduğundan ve kanalların gerçekten izlediklerinizden oluştuğundan emin olun → kaydet.
- **Gece SMS spam'ini durdurun** — Politikalar sekmesi → _Sessiz saatler dışında SMS engelle_ etkinleştir → Kanallar sekmesinde kanal başına sessiz saatleri ayarlayın.
- **Ping yerine günlük özet gönderin** — Kanallar sekmesi → Özet kartı → sıklığı _günlük_ olarak ayarlayın, örn. 09:00.
- **Yeni bir nöbetçi rolü ekleyin** — Abonelikler sekmesi → + Oluştur → rolü seç → etkinlik aileleri → kanallar → kaydet. Gelecekteki eşleşen uyarıları alacaklar.
- **Eksik bir uyarıyı hata ayıklayın** — Günlükler sekmesi → etkinliği rota veya zamana göre arayın → durum `failed` ise kimlik bilgilerini kontrol etmek için Sağlayıcılar'a gidin; durum `sent` ama insan görmediyse, Abonelikler / sessiz saatler / sessize alma durumunu kontrol edin.

## İpuçları

- **Şimdilik sadece ön uç.** Kaydetme bir bildirim gösterir ama API henüz yok — bu sayfayı bir spesifikasyon olarak kabul edin, kesin bilgi kaynağı olarak değil.
- **Test düğmeleri sadece yer tutucu.** _Tümünü test et_, _1 saat sessize al_, kanal başına _Test_ ve _Bakım_ onayı sadece bildirim gösterir — gerçek test mesajları göndermez veya sessize almaz.
- **Şiddet eşlemesi yedek olarak kullanılır.** Bir Kuralın _Kanallar_ listesi ayarlanmışsa önceliklidir; sadece boş veya ayarsızsa şiddet eşlemesine döner.
- **Özet, etkinlik başına uyarılardan ayrıdır.** Özet açmak bireysel uyarıları sessize almaz — sadece periyodik özet ekler.
- **Abonelikler sadece rol değil, kullanıcı da hedefleyebilir.** Örneğin, _gece vardiyası lideri tüm `rides` uyarıları push ile alır_ gibi tek seferlik yükseltmeler için rol oluşturmadan kullanın.
- **Mobil düzen kasıtlı olarak yalnızca okunabilir.** Mobilde tüm sekmeler sadece _Tam yapılandırma için masaüstünü kullanın_ der — uyarı yönetimi masaüstü işi.
- **Kişisel verilerin gizlenmesi SMS/e-posta için önemlidir.** Kapalıysa, uyarı metinleri telefon numaraları veya kart sonları gibi bilgileri dış sağlayıcılara sızdırabilir — özel bir nedeniniz yoksa açık bırakın.
