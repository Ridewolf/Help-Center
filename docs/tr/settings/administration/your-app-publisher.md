# Uygulamanız: Yayıncı ve Gönderim

[Uygulamanız beyaz etiket sihirbazı](your-app.md) (`/settings/your-app`) son iki adımı: **uygulamayı hangi geliştirici hesaplarının yayınlayacağını seçmek**, mağaza kimlik bilgilerini sağlamak (eğer size aitse) ve sağlama için göndermektir.

## Yayıncı seçimi

İki seçenekli bir radyo seçimi:

- **Ridewolf** (varsayılan) — uygulama Ridewolf'un kendi geliştirici hesapları üzerinden yayınlanır. **Sizden mağaza kimlik bilgileri istenmez.**
- **Kendi hesaplarınız** — uygulama kendi Apple ve Google geliştirici hesaplarınız üzerinden yayınlanır, bu da aşağıdaki kimlik bilgilerini gerektirir.

## Mağaza erişim kimlik bilgileri (sadece kendi hesaplarınız)

**Apple — gerekli tüm bilgiler:**

- Apple ID
- Takım ID'si
- App Store Connect API **Anahtar ID'si** ve **Yayıncı ID'si**
- App Store Connect API **özel anahtarı** (`.p8` dosya içeriği)
- D-U-N-S numarası

**Google:**

- Servis hesabı e-postası
- Servis hesabı JSON dosyası
- Play Console e-postası

Bu kimlik bilgileri hassastır — sağlama için gönderilir ve **tarayıcının yerel taslağında saklanmaz.**

## Manuel onaylar

Erişimin gerçekten verildiğini onaylamak için işaretlemeniz gereken iki onay kutusu:

- **App Store Connect erişimi verildi** — Apple ID App Store Connect'e eklendi
- **Play Console erişimi verildi** — Play Console izinleri ayarlandı

Bunlar **kendi beyanınızdır ve otomatik olarak doğrulanmaz.** Gerçek izinler verilmeden işaretlenmeleri burada yakalanmaz — bu durum daha sonra sağlama hatası olarak ortaya çıkar.

## İnceleme adımı

Önceki her adımın salt okunur özeti, **kural başına doğrulama rozetleri** (örneğin _Gerekli varlıklar_ veya _Hukuki tamamlandı_) geçme veya başarısız olarak gösterilir ve dikkat gerektiren belirli adıma geri götüren **yerinde düzenleme bağlantıları** bulunur. **Gönder** butonunun etkinleşmesi için tüm kontrollerin geçmesi gerekir.

## Gönderim

Gönderim, sağlama hattını başlatır ve durumu **taslak → sağlama → incelemede → üretim** aşamalarında veya **reddedildi** durumuna taşır.

- Durum `provisioning`, `in-review` veya `production` iken sayfa **salt okunurdur** ve mağaza bağlantıları (TestFlight, Play iç test, App Store, Play Store) sağlama hattı tarafından dolduruldukça görünür.
- **Reddedildi** durumu sihirbazı tekrar düzenlenebilir yapar, böylece düzeltip yeniden gönderebilirsiniz.

## Yaygın sorular

- **Gönder butonu kullanılamıyor.** İnceleme adımındaki bir veya daha fazla doğrulama rozeti hala başarısız — hatalı adıma gitmek için düzenleme bağlantılarını kullanın.
- **Apple/Google alanları görünmüyor.** Bunlar yalnızca yayıncı kendi hesaplarınız olarak ayarlandığında görünür.
- **Gönderdikten sonra bir şeyi değiştirmem gerekiyor.** Durum `provisioning`, `in-review` veya `production` iken değişiklik yapamazsınız. Uygulama reddedilirse, sihirbaz tekrar düzenlenebilir hale gelir — `draft` ve `rejected` düzenlenebilir iki durumdur.
- **Onay kutularını işaretlememe rağmen sağlama başarısız oldu.** Bunlar manuel beyanlardır — Apple ID'nin gerçekten App Store Connect erişimi olduğundan ve servis hesabının gerçekten Play Console izinlerine sahip olduğundan emin olun.
