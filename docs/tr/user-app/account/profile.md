# Profil — Hesap Detayları, Parola ve Silme

**Profil** ekranı (`/profile`), sürücünün kendi hesap ekranıdır: operatörün onlar hakkında bildiği bilgiler ve her hesap düzeyindeki işlem — fotoğraf, ad, parola, oturumlar, çıkış yapma ve silme.

Hesap silme işlemi de burada gerçekleşir. Gizlilik ekranındaki buton kullanılmaz — bkz. [Privacy](privacy.md).

## Ekranın gösterdikleri

| Alan               | Düzenlenebilir mi? | Notlar                                              |
| ------------------ | ----------------- | --------------------------------------------------- |
| **Fotoğraf**       | Evet              | 96 × 96 avatar, değiştirmek için kamera kaplaması   |
| **Tam Ad**         | Evet              | Burada gösterilir, düzenleme sayfasında değiştirilir|
| Durum rozeti       | Hayır             | Etiketi gösterildiği gibi okuyun                     |
| **E-posta**        | Hayır             | Sadece görüntüleme                                  |
| **Telefon**        | Hayır             | Sadece görüntüleme                                  |
| **Hesap Durumu**   | Hayır             | Sadece görüntüleme                                  |
| **Üyelik Tarihi**  | Hayır             | Hesabın oluşturulduğu tarih                          |

Doğum tarihi bu ekranda **yoktur**. Kaydolma sırasında alınır ancak burada gösterilmez veya düzenlenemez, bu yüzden sürücüyü değiştirmek için buraya göndermeyin.

## Adın düzenlenmesi

1. **Kalem** simgesine dokunun
2. Düzenleme sayfası **Ad** ve **Soyad** ile açılır — başka alan yoktur. İkisi de zorunludur
3. Kaydet

E-posta ve telefon burada düzenlenemez ve bunları değiştirmek için uygulama içinde bir akış yoktur. Sürücü farklı bir e-posta veya telefon istiyorsa, ekibiniz bunu Gösterge Paneli üzerinden halletmelidir — bkz. [Client — Create & Edit](../../operations/customers/client-create-edit.md).

Bir kolaylık: Apple veya Google ile giriş yapan sürücülerden gerçek adlarını yazmaları istenebilir, çünkü bu servislerin döndürdüğü ad her zaman kullanılabilir olmayabilir.

## Fotoğrafın değiştirilmesi

Avatar'a dokunmak, üç kaynaktan oluşan fotoğraf sayfasını açar:

- **Fotoğraf Çek** — telefon kamerası
- **Galeriden Seç**
- **Dosyadan Seç**

Sınırlamalar: **JPEG, JPG, PNG veya WEBP, en fazla 10 MB**. Kırpma adımı yoktur — fotoğraf olduğu gibi kullanılır, bu yüzden sürücülere yüklemeden önce çerçevelemelerini söyleyin. Yükleme tamamlandığında, yeni fotoğraf uygulamadaki her yerde eskiyi değiştirir.

## Parolanın değiştirilmesi

**Parolayı Değiştir** sayfası üç alan ister:

| Alan                 | Kural                                    |
| --------------------- | --------------------------------------- |
| **Mevcut Parola**     | Zorunlu                                 |
| **Yeni Parola**       | Gösterilen parola kurallarını sağlamalı |
| **Parolayı Onayla**   | Yeni parola ile eşleşmeli                 |

Sürücüyü başlamadan önce uyarın: **başarılı bir parola değişikliği onları oturumdan çıkarır** ve onay mesajıyla giriş ekranına döner. Bu beklenen davranıştır, hata değil — yeni parolayla tekrar giriş yaparlar.

Yanlış mevcut parola, o alanda satır içi hata gösterir. Diğer hatalar ekranın üstünde kısa mesaj olarak görünür.

## Oturumların yönetimi

**Oturumları Yönet** `/settings/sessions` adresini açar, hesapta oturum açmış tüm cihazların listesidir. Cihaz listesi ve her yerde çıkış yapma işlemleri için bkz. [Sessions](sessions.md).

## Çıkış yapma

**Çıkış Yap** butonu bu cihazdaki oturumu sonlandırır ve sürücüyü uygulamanın başlangıcına döndürür. Diğer cihazları etkilemez — onlar için [Sessions](sessions.md) kullanılır.

## Hesabın silinmesi — çalışma akışı

1. **Hesabı Sil** yalnızca silme işlemi beklemiyorsa görünür
2. Dokunmak onay diyaloğunu açar
3. Onaylandığında silme planlanır
4. Buton, beklemede kutusuyla değiştirilir: saat simgesi, **{date} için Planlandı**, ve iptal hala mümkünse **İptal** butonu

İptal etmek için sürücü **İptal**e dokunur, diyaloğu onaylar ve normal **Hesabı Sil** butonu geri gelir.

Bu akışta bakiye şartı yoktur — cüzdanında para kalan sürücü yine de silme planlayabilir, bu yüzden önemliyse önce bakiyeyi harcamalarını veya geri almalarını hatırlatın. Bkz. [Wallet](../money/wallet.md).

## Silme beklerken

Silme planlandığında profil düzenleme, parola değişikliği, fotoğraf yükleme ve oturum yönetimi **tamamen devre dışı bırakılır**.

Bir sürücü Profil ekranındaki butonların gri olduğunu bildirdiğinde bu cevaptır: silme planlanmıştır. İptal etmek her şeyi geri getirir.

## SSS

- **Neden sürücü e-posta veya telefonunu burada düzenleyemiyor?** Düzenleme sayfasında sadece ad ve soyad var; iletişim alanları sadece görüntüleme amaçlıdır ve uygulama içinde değişim akışı yoktur.
- **Neden tüm butonlar devre dışı?** Bekleyen bir hesap silme işlemi var. İptal edin.
- **Sürücü parolayı değiştirdikten hemen sonra çıkış yaptı.** Beklenen durum — başarılı parola değişikliği yeni giriş gerektirir.
- **Durum değerleri ne anlama geliyor?** **Hesap Durumu** etiketini gösterildiği gibi okuyun; sabit bir değer listesine eşlemeyin.
- **Sürücü Gizlilik ekranından hesap silme talep etmek istedi.** Gizlilik ekranında silme butonu yoktur — sadece bilgilendiricidir. **Profil → Hesabı Sil** kullanın — bkz. [Privacy](privacy.md).

## İlgili

- [Sessions](sessions.md) — hesapta oturum açmış cihazlar
- [Settings](../help/settings.md) — bildirimler, dil, tema, harita görünümü
- [Privacy](privacy.md) — gizlilik politikası ve güvenlik yönergeleri
- [Signing in](registration-login.md) — parola sıfırlama, parolası olmayan sürücüler için
