# Genel

Genel sayfası (`/settings/general`), **sistem genelinde kontrol panelidir** — sürücü uygulaması, filo, fiyatlandırma, sürüşler, bildirimler ve geliştirici düzeyindeki anahtarları yöneten varsayılanları ayarlamak için tek bir yer. Buradaki her şey tüm şirket için geçerlidir; araç başına veya tarife başına geçersiz kılmalar [Araç Ayarları](../infrastructure/vehicle-settings.md) ve [Araç Tarifeleri](../infrastructure/vehicle-tariffs.md) içinde bulunur.

> _Not_: bu sayfa şu anda **yalnızca ön uç ekranıdır** — her değer yerel durumda tutulur ve **Kaydet** düğmesi sadece bir onay bildirimi gösterir. Henüz arka uca veri gönderilmez. Bunu yaklaşan API için taslak / hazırlık arayüzü olarak değerlendirin.

`/settings/general-settings` rotası, tek bir illüstrasyon ve başlıktan oluşan ayrı, neredeyse boş bir **yer tutucudur**. Gerçek yapılandırma ekranı `/settings/general` (bu makale) — tüm altı sekmenin bulunduğu yerdir.

Gerekli izin: yönlendiricide özel bir `requiredPermissions` ayarı yok — oturum açmış herhangi bir operatör sayfayı açabilir.

## Sekmeler

Sayfanın üst kısmında (masaüstü) altı sekme vardır. Mobilde aynı sekmeler, sadece _Tam yapılandırma için masaüstünü kullanın_ diyen bir akordeona dönüşür — bu ayarlar niyet olarak yalnızca yöneticilere açıktır.

| Sekme         | Simge       | Kapsadığı Alanlar                                                                                      |
| ------------- | ----------- | ------------------------------------------------------------------------------------------------------ |
| Uygulama      | sliders     | Uygulama güncelleme engelleme, varsayılan modül görünürlüğü, özellik bayrakları, oran limitleri, araç varsayılanları |
| Yerel Ayarlar | globe       | Varsayılan dil, saat dilimi, etkin diller, tarih / saat / birim formatları, harita sağlayıcısı + bölge stili |
| Fiyatlandırma | dollar sign | Fiyatlandırma varsayılanları, tarife şablonları, indirimler/promosyon politikası, abonelik varsayılanları |
| Sürüşler      | car         | Rezervasyon + sürüş kuralları, otomatik duraklatma/durdurma, cezalar, ödeme işlemleri                    |
| Bildirimler   | bell        | Kanal anahtarları (push / e-posta / SMS) ve sürücü etkinlikleri için mesaj şablonları                    |
| Gelişmiş      | code        | Entegrasyonlar, güvenlik, gizlilik saklama, yasal sayfalar, geliştirici bayrakları, sistem bakımı         |

Bir alanı gerçekten değiştirdikten sonra sayfanın altında yalnızca **Vazgeç** ve **Değişiklikleri Kaydet** içeren yapışkan bir altbilgi görünür — sayfa, yüklü anlık görüntüye karşı farkı almak için `useFormState` kullanır.

## Sekme başına bölümler

### Uygulama

İki kart üst üste.

**Uygulama varsayılanları**

- _Uygulama güncellemesi zorunlu_ — anahtar + minimum sürüm metin girişi (anahtar açık olana kadar devre dışı). Açık ise, sürücü uygulaması bu sürümün altındaki kullanıcıları engeller.
- _Varsayılan modül görünürlüğü_ — dört anahtar (Pazarlama, Dengeleme, Destek, Analitik) yeni operatörlerin hangi modülleri göreceğini ön ayarlar.
- _Özellik bayrakları_ — dört anahtar (Canlı izleme, Gelişmiş istatistikler, Çoklu para birimi, Beyaz etiket).
- _API oran limiti_ / _UI oran limiti_ — sayısal girişler (varsayılanlar 1000 / 100 istek/dakika).

**Araç varsayılanları**

- _Varsayılan simge seti_ — simge seti adlarının aranabilir açılır listesi (şu anda dört sabit örnek: Varsayılan Simgeler / Modern Set / Minimalist / Renkli Kalın; gerçek liste [Simge Setleri](../content/icon-sets.md) sayfasından gelecek).
- _Pil eşikleri_ — iki sayısal giriş (Düşük %, Kritik %). Kaydetme sırasında doğrulama yapılır: kritik düşükten küçük olmalıdır, aksi halde bir bildirim hatası alırsınız.
- _Sağlık puanı ağırlıkları_ — üç yüzde girişi (sinyal / hatalar / pil). Kaydetme sırasında toplamın 100 olması doğrulanır.
- _Otomatik etiketler_ — yeni araçlara otomatik uygulanan virgülle ayrılmış etiket dizisi.

### Yerel Ayarlar

- _Varsayılan dil_ / _Saat dilimi_ — seçim.
- _Etkin diller_ — çoklu etiket; kaldırmak için X.
- _Hafta başlangıcı_ — Pazartesi / Pazar.
- _Tarih formatı_ — GG/AA/YYYY, AA/GG/YYYY, ISO, vb.
- _Saat formatı_ — 12 saat / 24 saat.
- _Sıcaklık birimi_ — Santigrat / Fahrenheit.
- _Mesafe birimi_ — km / mil.
- _Para birimi gösterimi_ — varsayılan EUR (kodda TODO: şirket API'sinden yükle).
- _Fiyat yuvarlama_ — yok / en yakın 0,05 / vb.

**Haritalar** (aynı sekmede ayrı kart)

- _Sağlayıcı_ (varsayılan MapTiler) ve _Stil_ (açık / koyu / uydu).
- _API anahtarı_ — sağlayıcının anahtarı için metin alanı.
- _Varsayılan yakınlaştırma_ + _Varsayılan merkez_ — GPS bağlamı olmadığında kullanılır.
- _Bölge stili_ — Park, Yasak, Düşük hız, Ücretli park alanları için renk + çizgi kalınlığı. Seçiciler 12 renk paleti kullanır.
- _Düşük hız limiti_ — sayısal (km/s).

### Fiyatlandırma

Dört kart: _Fiyatlandırma varsayılanları_, _Tarife şablonları_, _İndirimler ve Promosyon_, _Abonelikler_. Bunlar **yedek değerleri** ayarlar — gerçek sürüş fiyatlandırması araç bazında [Araç Tarifeleri](../infrastructure/vehicle-tariffs.md) ile geçersiz kılınır.

- Fiyatlandırma varsayılanları: açılış ücreti, dakika başı fiyat, km başı fiyat, ücretli bekleme, ücretsiz rezervasyon dakikası, sürüş sayısına göre iki kademeli indirim.
- Tarife şablonları: dönem bazında (dakika / saat / gün / hafta / ay / yıl) — fiyat, maksimum süre, ücretsiz park anahtarı, etkin anahtar. Ayrıca _yığmaya izin ver_.
- İndirimler ve Promosyon: maksimum indirim %, promosyon ön eki (varsayılan `WOLF`), varsayılan geçerlilik günleri ve yığma kuralları.
- Abonelikler: varsayılan % indirim, deneme günleri, otomatik yenileme, promosyon kodlarına izin ver.

### Sürüşler

- Rezervasyon + Sürüş kuralları: ücretsiz rezervasyon dakikası, müşteri başına maksimum aktif rezervasyon, başlamak için minimum bakiye, otomatik duraklatma + otomatik durdurma (her biri etkin + eşik ile).
- Cezalar: iki ceza türü (Bölge dışı, Uygunsuz park) — her biri bir ücret tutarı ve uyarı mesajı dizisi içerir.
- _Varsayılan hızlı kılavuz_ — yer tutucu listesinden açılır; [Hızlı Kılavuzlar](../content/quick-guides.md) sayfasından alınacak.
- _Varsayılan SSS seti_ — [SSS setleri](../content/faq-sets.md) sayfasından alınan açılır liste.
- Ödemeler kartı: 3-D Secure, tahsilat modu (anında / ön yetki), ön yetki tutarı, tutma süresi (saat), iade politikası, maksimum iade süresi (gün).

### Bildirimler

- _Kanallar_ — üç anahtar (Push / E-posta / SMS) — hangi kanalların Rider App için kullanılabilir olduğunu kontrol eder.
- _Şablonlar_ — üç temel olay için başlık + gövde metni: Sürüş başladı, Sürüş tamamlandı, Ceza uygulandı. `{{amount}}` / `{{reason}}` gibi değişkenler arka uç tarafından değiştirilir.
- Bir **Test bildirimi** düğmesi bilgi bildirimi gösterir (henüz gerçek gönderim yok).

**Operatör tarafı** uyarı hattı için bkz. [Alerts & Notifications](alerts-notifications.md) — buradaki sekme Rider App tarafı içindir.

### Gelişmiş

Beş kart.

- _Entegrasyonlar_ — webhook uç noktası + gizli anahtar, Google Analytics ID, Sentry DSN, Telegram ve Slack bot dizeleri. Bir **Test webhook** düğmesi bildirim gösterir.
- _Güvenlik_ — 2FA gereksinimi anahtarı, oturum zaman aşımı (dakika), parola politikası (minimum uzunluk + büyük harf/rakam/özel karakter), reCAPTCHA anahtarları, IP izin listesi, dışa aktarma kısıtlamaları açılır menüsü.
- _Gizlilik_ — veri saklama süresi gün olarak (telemetri / medya / günlükler), GPS anonimleştirme anahtarı, dışa aktarma SLA ve silme SLA gün olarak.
- _Hukuki_ — Hizmet Şartları + Gizlilik Politikası Markdown metin alanları olarak, ayrıca bir sürüm dizesi ve yayınlanma tarihi.
- _Geliştirici / Gelişmiş_ — sandbox modu, günlük seviyesi, üretim + test uç noktası URL'leri, deney anahtarları (AI yönlendirme, öngörücü bakım, dinamik fiyatlandırma).
- _Sistem / Bakım_ — bakım modu anahtarı + afiş metni + salt okunur mod anahtarı.
- _Denetim & Yedekler_ — _Yedek oluştur_ ve _Tüm verileri sil_ düğmeleri (ikisi de bildirim gösterir; silme düğmesi _yönetici onayı gerektirir_ — henüz bağlanmadı).

## İş Akışları

- **Yeni bir sürümü kilitle** — Uygulama sekmesi → _Uygulama güncellemesi gerektir_ anahtarını aç → minimum sürümü ayarla → Kaydet. Eski sürümdeki sürücülere güncelleme bildirimi gider.
- **Bir dil ekle** — Yerel sekmesi → _Etkin diller_ → yerel dil seçeneğini seç → Kaydet. Dizeler hâlâ [Localization](localization.md) üzerinden çevrilmeli.
- **Sürücü ceza kullanıcı deneyimini ayarla** — Sürüşler sekmesi → bölge dışı ücret + uyarı metnini ayarla → Kaydet.
- **Platformu bakım için duraklat** — Gelişmiş → _Sistem / Bakım_ → anahtarı değiştir, afiş metnini düzenle, isteğe bağlı salt okunur modu ayarla → Kaydet.
- **Yeni bir harita stili yayınla** — Yerel → _Haritalar_ kartı → stil seç → bölge renklerini ayarla → Kaydet (değişiklikler API bağlandığında tüm sistemde geçerli olur).

## İpuçları

- **Şimdilik sadece ön uç.** Kaydetme yerel bir anlık görüntü alır ama arka uç uç noktasına göndermez — API hazır olana kadar bu sayfaya güvenmeyin.
- **Doğrulama Kaydetme sırasında yapılır.** Pil eşikleri (kritik < düşük) ve sağlık puanı ağırlıkları (toplam 100) Kaydet tuşuna basıldığında kontrol edilir, yazarken değil — hata bildirimi düzeltip tekrar deneyin.
- **`/settings/general-settings` ile karıştırmayın.** O rota var ama sadece boş bir yer tutucu kart gösterir — gerçek ekran için `/settings/general` açın.
- **Vazgeç sizin güvenlik ağınızdır** — alt bilgi yalnızca kaydedilmemiş değişiklikler varsa görünür; _Vazgeç_ tıklayarak sayfayı terk etmeden yüklenen anlık görüntüye dönebilirsiniz.
- **Mobil kasıtlı olarak sınırlı.** Sadece Uygulama akordeonu bağlı; diğerleri sizi masaüstü oturumuna yönlendirir.
- **Araç başına ayarlar kazanır.** Fiyatlandırma / Sürüşler altında yaptığınız her şey varsayılandır; sürücünün ödediği gerçek tarife modelle bağlı Araç Tarifesi'nden gelir — bkz. [Vehicle Tariffs](../infrastructure/vehicle-tariffs.md).
