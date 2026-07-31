# Oturumlar — Hesaba Giriş Yapılan Cihazlar

**Oturumlar** ekranı (`/settings/sessions`), bir kullanıcının hesabının şu anda giriş yaptığı her yeri listeler ve bu yerlerden çıkış yapmalarını sağlar. Bir kullanıcı hesabına başkasının eriştiğinden şüphelendiğinde ulaşılması gereken ekrandır.

Buraya yönlendiren iki giriş noktası:

- **Profil → Oturumları Yönet**
- **Ayarlar → Gizlilik kartı → Oturumları Yönet**

## Liste nasıl düzenlenir

Oturumlar **cihaz bazında gruplanır** — tarayıcı ve sürümü, işletim sistemi ve sürümü, cihaz türü, üretici ve model — böylece aynı telefon birden fazla kez değil, bir kez görünür.

Gruplar kasıtlı olarak şu şekilde sıralanır:

1. Kullanıcının şu anki cihazı ilk sırada
2. Sonra duruma göre: **aktif**, sonra **pasif**, sonra **eski**
3. Son olarak son etkinliğe göre, en yenisi önce

Her grup katlanabilir. Genişletildiğinde o cihaza ait her bireysel oturum görünür.

## Bir cihaz grubunu okuma

| Gördüğünüz                           | Anlamı                                                                    |
| ----------------------------------- | ------------------------------------------------------------------------- |
| **Cihaz etiketi**                   | Biliniyorsa üretici ve model, yoksa işletim sistemi ve sürümü             |
| Cihaz türü simgesi                  | Telefon, tablet veya monitör                                              |
| **Tarayıcı etiketi**                | Oturumun arkasındaki tarayıcı ve sürümü                                   |
| **Oturum durumu** rozeti            | Aşağıdaki tabloya bakınız                                                  |
| **Son etkinlik**                    | Göreceli zaman — "az önce", N dakika / saat / gün önce, ve bir haftadan eskiyse kesin tarih |
| **Oturum sayısı**                   | O cihazın kaç oturumu olduğu                                               |
| **Konum**                          | Şehir, ülke ve IP adresi                                                  |
| **Oluşturulma**                    | O oturumun ne zaman başladığı                                             |
| **Mevcut Cihaz** / **Mevcut Oturum** | Kullanıcının şu anda kullandığı cihaz ve oturumda vurgulanmış rozet       |

### Durum rozetleri

| Rozet        | Anlamı                              |
| ------------ | ---------------------------------- |
| **aktif**    | Son etkinlik bir saatten daha kısa süre önce |
| **pasif**    | Son etkinlik 24 saatten daha kısa süre önce |
| **eski**     | Son etkinlik 24 saat veya daha uzun süre önce |

Rozet sadece **yakınlığı ölçer** — bir oturumun hala geçerli olup olmadığını göstermez. "Eski" rozeti oturumun süresinin dolduğu anlamına gelmez.

## Bir oturumdan çıkış yapma

Mevcut oturumun silme kontrolü yoktur — tasarım gereği bu listeden kaldırılamaz. Diğer tüm oturumlar kaldırılabilir:

1. Cihaz grubunu genişletin
2. Oturumdaki **çöp kutusu** simgesine dokunun
3. Diyalogda onaylayın

Liste yenilenir ve oturum kaldırılmış olur.

## Toplu işlemler

| İşlem                      | Ne yapar                                                                                                   |
| -------------------------- | ---------------------------------------------------------------------------------------------------------- |
| **Diğer Oturumlardan Çıkış Yap** | Kullanıcının elindeki cihazdaki oturum dışındaki tüm oturumlardan çıkış yapar. Başkasının eriştiğinden şüphelenildiğinde doğru işlemdir |
| **Tüm Oturumlardan Çıkış Yap**   | Mevcut cihaz dahil tüm oturumlardan çıkış yapar, böylece kullanıcı giriş ekranına döner ve tekrar giriş yapmak zorunda kalır. Bu nedenle yıkıcı olarak işaretlenmiştir |
| **Cihazı İptal Et**              | Mevcut cihaz olmayan genişletilmiş bir cihaz grubunda sunulur — o cihazdaki tüm oturumlardan çıkış yapar  |

Çıkış isteği çalışırken butonlar devre dışı bırakılır. Başarısızlık kısa bir hata mesajı gösterir; başarı onay gösterir ve listeyi yeniler.

## Tipik iş akışları

- **Kullanıcı hesabında başkasının olduğunu düşünüyor** — **Diğer Oturumlardan Çıkış Yap**, ardından **Profil**den şifre değiştirin. Başarılı bir şifre değişikliği kullanıcının da çıkış yapmasını sağlar, böylece sonrasında tekrar giriş yapar ([Profil](profile.md))
- **Ödünç alınan telefonda unutulmuş bir giriş** — o cihaz grubunu genişletin, **Cihazı İptal Et**
- **Her yerde temiz başlamak** — **Tüm Oturumlardan Çıkış Yap**, ardından tekrar giriş yapın ([Giriş yapma](registration-login.md))

## SSS

- **Neden kullanıcı mevcut oturumunu silemiyor?** Mevcut oturum için silme kontrolü gösterilmez. Mevcut oturumu sonlandırmak için **Tüm Oturumlardan Çıkış Yap** veya Profildeki normal **Çıkış Yap** düğmesini kullanın.
- **"Aktif" ne anlama geliyor?** Son bir saat içindeki etkinlik — başka bir anlamı yok.
- **Neden bir telefonda birden fazla oturum gösteriliyor?** Oturumlar giriş başına oluşturulur. Ekran bunları bir cihaz altında gruplar ve sayısını gösterir.
- **Oturumları Yönet düğmesi gri görünüyor.** Hesap silinme bekliyor, bu da oturum yönetimini ve profil düzenlemeyi devre dışı bırakır — bkz. [Profil](profile.md).

## İlgili

- [Profil](profile.md) — şifre değişikliği, çıkış yapma, hesap silme
- [Ayarlar](../help/settings.md) — buraya da bağlantı veren Gizlilik kartı
- [Gizlilik](privacy.md) — gizlilik politikası ve güvenlik yönergeleri
