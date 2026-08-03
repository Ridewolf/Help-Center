# Operatörler

Operatörler sayfası (`/settings/operators`), **personel dizini**dir — gösterge paneline erişimi olan her çalışan. Her operatörün bir rolü vardır (bkz. [Roller](roles.md)), isteğe bağlı bölüm / pozisyon bilgisi, filtreleme için etiketler ve bir durumu (Aktif / Pasif).

[Müşterilerden](../../operations/customers/clients.md) (müşterileriniz) farklı olarak — Operatörler platformu yöneten **iç ekip**tir.

Gerekli izin: **Operatörler** (`t4u5v6`). Alt izinler düzenleme işlemlerini sınırlar.

## Operatörler buraya nasıl gelir

Operatörler, siz (bir yönetici) tarafından **+ Oluştur** butonuyla oluşturulur — kendi kendine kayıt yoktur:

1. **+ Oluştur** operatör formunu açar — ad, e-posta, rol, isteğe bağlı bölüm / pozisyon / etiketler
2. Yeni operatöre giriş talimatları ve geçici şifre içeren bir e-posta gönderilir
3. Giriş yaparlar, profillerini tamamlarlar (`/profile`) ve rollerinin izinlerine göre çalışmaya başlayabilirler
4. Pasif operatörler giriş yapamaz — bir çalışan ayrıldığında hesabı pasif yapın

## Filtreler

| Filtre  | Tür          | Notlar                                                    |
| ------- | ------------ | --------------------------------------------------------- |
| Ara     | Metin        | Ad, e-posta, pozisyon, bölümde arama yapar                |
| Durum   | Açılır Menü  | `Aktif` / `Pasif` (veya `Tümü`)                           |
| Etiketler | Çoklu seçim | Operatörlere uygulanan etiketlere göre filtreleme (örneğin "Gece vardiyası") |

## Sütunlar

| Sütun          | Sıralanabilir mi? | İçerik                                                                 |
| -------------- | ----------------- | --------------------------------------------------------------------- |
| **Kullanıcı**  | ✓                 | Avatar + ad/soyad + e-posta; operatör detay sayfasına bağlantı       |
| **Rol**        | —                 | Operatörün rol etiketi (bkz. [Roller](roles.md))                     |
| **Bölüm**      | —                 | İsteğe bağlı bölüm etiketi                                           |
| **Pozisyon**   | —                 | İsteğe bağlı pozisyon etiketi                                        |
| **Etiketler**  | —                 | Operatöre uygulanan etiketler                                        |
| **Durum**      | ✓                 | `Aktif` (yeşil) / `Pasif` (gri)                                     |

## Satır işlemleri

Her satırda üç noktalı bir menü vardır. Kullanılabilir işlemler izinlere bağlıdır:

| İşlem            | İzin       | Ne yapar                                         |
| ---------------- | ---------- | ------------------------------------------------ |
| **Detayları Görüntüle** | —          | Operatörün detay sayfasını açar                   |
| **Düzenle**      | `edit`     | Düzenleme formunu açar (ad, rol, bölüm vb.)       |

**Silme işlemi yoktur** — operatör kayıtları denetim amaçlı saklanır. Giriş engellemek için, Düzenle üzerinden operatörün durumunu _Pasif_ yapın.

## Detay sayfası

Bir satıra tıklamak (veya _Detayları Görüntüle_) operatörün detay sayfasını açar, burada:

- Kişisel bilgiler (ad, e-posta, telefon, fotoğraf)
- Rol + izinler anlık görüntüsü
- Bölüm / pozisyon / etiketler
- Durum
- Aktivite günlüğü (giriş olayları, rol değişiklikleri)

Oradan veya satır menüsünden düzenleyin — her ikisi de aynı forma gider.

## Oluştur / Düzenle formu

**Operatör formu** (`+ Oluştur` veya _Düzenle_) basittir:

- **Ad / Soyad** (zorunlu)
- **E-posta** (zorunlu, operatörler arasında benzersiz)
- **Rol** (zorunlu, mevcut rollerin açılır menüsü — bkz. [Roller](roles.md))
- **Bölüm / Pozisyon** (isteğe bağlı)
- **Etiketler** (isteğe bağlı çoklu seçim)
- **Durum** (Aktif / Pasif)
- Sadece Oluşturma sırasında: bir **ilk şifre** alanı veya otomatik oluşturulan şifre operatöre e-posta ile gönderilir

Kaydet, doğrulama yapar ve denetim günlüğüne yazar. Yeni oluşturulan operatörler otomatik olarak hoş geldiniz e-postası alır.

## Tipik iş akışları

- **Yeni işe alımın kaydı** — `+ Oluştur` → ad/e-posta/rol doldur → Kaydet → hoş geldiniz e-postasının alındığını onayla → giriş yapıp profili tamamlamasını iste
- **Terfi sonrası rol değişikliği** — Düzenle → Rol değiştir → Kaydet (yeni izinler operatörün sonraki isteğinde geçerli olur, geriye dönük değil)
- **Ayrılma** — Düzenle → Durum = Pasif yap → Kaydet (kayıt denetim için kalır; giriş engellenir)
- **Etiket bazlı vardiya planlama** — "Gece vardiyası" gibi etiketler uygula → listeyi etikete göre filtrele, kimlerin planlandığını gör

## İpuçları

- **Rol güçlü bir alandır** — değiştirirken dikkatli olun. Yönetici'den Destek'e düşürmek yazma erişimini hemen kaldırır
- **Pasif ≠ Silindi** — operatörün geçmişi korunur; erişimi geri almak için tekrar Aktif yapın
- **Liste varsayılan olarak ada göre sıralanır** — çok sayıda operatör varsa, kaydırmak yerine e-posta veya bölüme göre arama yapın
- **Buradaki etiketler müşteri etiketlerinden farklıdır** — operatörlere özgüdür (örneğin "Gece vardiyası", "Eğitmen") ve isim alanı paylaşmazlar
- **Kendi kendini düzenleme kısıtlamaları** — kendi rolünüzü satır menüsünden değiştiremezsiniz; kişisel değişiklikler için Profil'i kullanın
