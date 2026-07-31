# Uygulamanız (Beyaz Etiket)

Uygulamanız sayfası (`/settings/your-app`), **kendi kimliğiniz altında markalı bir sürücü uygulaması oluşturmak ve yayınlamak için gereken her şeyi toplayan bir sihirbazdır** — uygulama adı, alan adı, marka varlıkları, mağaza listeleme metni, ekran görüntüleri ve yasal bağlantılar. Formun yanında canlı cihaz önizlemesi, yazdıklarınızı iPhone ve Android sahte ekranlarında gösterir.

Kenardan **Ayarlar → Uygulamanız** altında bulabilirsiniz.

Sihirbaz sekiz adımdan oluşur: **Kimlik → Alan Adı → Varlıklar → Listeleme → Görüntüler → Yasal → Yayıncı → İnceleme**. Bu makale ilk altısını kapsar; Yayıncı ve İnceleme [Your App: Publisher & Submission](your-app-publisher.md) içinde ele alınmıştır.

## Durum yaşam döngüsü

Sayfanın üstündeki durum kartı uygulamanızın nerede olduğunu, sürüm ve zaman damgalarıyla gösterir:

**taslak → sağlama → incelemede → üretim**, veya **reddedildi**.

- Sihirbaz, durum `draft` veya `rejected` iken **düzenlenebilir** — bir reddedilme formu yeniden açar, böylece mağazanın itiraz ettiği noktaları düzeltebilirsiniz.
- Pipeline uygulamaya sahipken: `provisioning`, `in-review` ve `production` durumlarında **salt okunurdur**. Bu durumlarda sayfa bir özet olur ve mağaza bağlantıları — **TestFlight, Play iç test, App Store, Play Store** — kullanılabilir oldukça görünür.

## Kimlik adımı

- **Uygulama adı** (zorunlu) — iOS paket kimliği, Android paket kimliği ve alt alan adını **otomatik türetir**, bu yüzden dikkatli belirleyin.
- **Paket geçersiz kılma** — türetilenler size uymuyorsa iOS ve Android paket kimliklerini manuel girmeyi açan bir anahtar.
- **Simge rengi** — uygulama simgesi kabuğu ve açılış ekranı arka planı için kullanılan bir hex değeri.

## Alan Adı adımı

- **Alan adı türü** — **alt alan adı** (uygulama adından türetilir) ile **özel** arasında radyo seçimi.
- **Özel alan adı** — tür `custom` olduğunda görünen bir metin alanı.

## Varlıklar adımı

- **Monokrom** anahtarı — tek bir sanat eserinin her iki tema için de kullanılıp kullanılmayacağını belirler.
- **Sembol** ve **yazı işareti** — her zaman gereklidir.
- **Koyu tema sembolü / yazı işareti** — Monokrom kapalıyken, yani ayrı açık ve koyu sanat eserleri sağladığınızda gösterilir.

Sürükle bırak veya yapıştırılmış URL kabul eden bir alan vardır. Doğrudan ikili yükleme henüz yok — pratikte her varlığı şimdilik bir URL olarak sağlayın.

## Listeleme adımı

Mağaza listeleme metni, girişler tarafından karakter sınırları uygulanır:

| Alan                  | Sınır                                        |
| --------------------- | ------------------------------------------- |
| **Alt başlık**        | 30 karakter                                 |
| **Kısa açıklama**     | 80 karakter                                 |
| **Tanıtım metni**     | 170 karakter (App Store tanıtım metni)     |
| **Anahtar kelimeler** | 100 karakter, virgülle ayrılmış               |
| **Tam açıklama**      | 4000 karakter                               |

- **Kategori** — seyahat, navigasyon, spor, yaşam tarzı, sağlık ve fitness veya iş.
- **Mağaza dilleri** — desteklenen yerel dillerden seçin. **İlk seçilen dil temel dil olur**; her ek dil için alt başlık, açıklamalar, tanıtım metni ve anahtar kelimeler için dil bazlı geçersiz kılmalar içeren kendi sekmesi olur. Geçersiz kılmada boş bırakılan alanlar temel dilden otomatik çeviriye döner.

## Görüntüler adımı

Altı sabit ekran görüntüsü çeşidi, her biri için bir **başlık** ve bir **alt başlık** gerekir: `map`, `reserve`, `timer`, `ride`, `group`, `wallet`. Sağ sütundaki canlı cihaz önizlemesi, yazdıklarınızla marka varlıklarınızı kullanarak bunları gösterir ve günceller.

## Yasal adım

Gizlilik politikası, hizmet şartları, destek URL'si, destek e-postası, destek telefonu ve pazarlama URL'si. Bunlar **[Şirketim](my-company.md) profilinden önceden doldurulur** — Şirketim'i önce tamamlamak işi kolaylaştırır.

## Yaygın sorular

- **Paket kimlikleri yanlış görünüyor.** Bunlar uygulama adından türetilir — açıkça ayarlamak için paket geçersiz kılmayı etkinleştirin.
- **Koyu varyant varlık alanları eksik.** Bunlar yalnızca Monokrom kapalıyken görünür.
- **Artık hiçbir şeyi düzenleyemiyorum.** Durum `provisioning`, `in-review` veya `production` — pipeline uygulamaya sahip. Gönderim reddedilirse düzenleme otomatik açılır.
- **Alt başlık metni kesiliyor.** Sınır 30 karakterdir — beklediğinizden daha kısadır.
- **Özel alan adı alanı görünmüyor.** Önce alan adı türünü `custom` olarak ayarlayın.
- **Sayfa "yerel taslak" bildirimi gösteriyor.** Düzenlemeleriniz sadece bu tarayıcıda tutuluyor ve henüz senkronize edilmedi — otomatik kalıcı olacağını varsaymayın; bildirim kaybolunca formu tekrar kontrol edin.
