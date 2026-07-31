# Müşteri — Oluştur ve Düzenle

İki URL:

- **Oluştur** — `/clients/create` — yeni bir müşteriyi manuel olarak kaydetme (nadir; çoğu müşteri kendisi kaydolur)
- **Düzenle** — `/clients/:id/edit` — mevcut bir müşterinin kişisel bilgilerini ve durumunu güncelleme

Her ikisine de [Müşteriler listesi](clients.md) (`+ Oluştur` düğmesi sağ üstte) veya [Müşteri detay sayfası](client-detail.md) (_Eylemler → Müşteriyi düzenle_) üzerinden ulaşılır.

İzinler:

- **Oluştur** — `Clients` (`e4f5h6`) + oluşturmayla ilgili alt izin
- **Düzenle** — `Clients` (`e4f5h6`) + `edit` alt izni

## Ne zaman kullanılır

Çoğu müşteriniz **kendileri Rider App üzerinden kaydolur** — onları Gösterge Paneli'nde nadiren oluşturursunuz.

Manuel oluşturma şunlar içindir:

- **Test hesapları** — dahili QA, demo kullanıcılar
- **VIP / kurumsal** — Rider uygulamayı indirmeden önce var olması gereken hesaplar
- **Operatör destekli kayıt** — personelin Rider adına kayıt yaptığı etkinlikler / ortaklıklar

Diğer her şey için, kayıt işlemini uygulamaya bırakın ve iletişim bilgilerini düzeltmeniz veya durumu değiştirmeniz gerektiğinde **Düzenle**yi kullanın.

## Düzen

Tek bir kart içinde dikey form, Field Guide yan çubuğu yok (Araç formundan farklı).

## Alanlar — Oluştur

Toplam yedi alan. Hepsi zorunlu.

| Alan                | Doğrulama                                                                                                             |
| -------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| **Adı**              | 1–100 karakter                                                                                                         |
| **Soyadı**           | 1–100 karakter                                                                                                         |
| **E-posta**          | Standart e-posta formatı (`name@domain.tld`); müşteriler arasında benzersiz olmalı                                     |
| **Telefon**          | `+` ile başlayan uluslararası format (ör. `+373 60 123 456`); sadece rakam, boşluk, tire, parantez                     |
| **Parola**           | **En az 12 karakter**, içinde **büyük harf, küçük harf, rakam ve özel karakter** olmalı                                 |
| **Parolayı onayla**  | Parola ile tam olarak eşleşmeli                                                                                        |
| **Durum**            | Başlangıç durumu: `Active` / `Inactive` / `Blocked` / `Frozen` / `Registering` (varsayılan _Active_)                    |

Doğrulama kaydetme sırasında ve alanı terk ettikçe satır içi olarak çalışır. Hatalar alanın altında kırmızı görünür.

### Parola kuralları

Parola gereksinimi en katı alandır. Gösterge Paneli, dört kontrolün tamamını karşılamayan parolaları reddeder:

- ≥ 12 karakter
- ≥ 1 büyük harf (A–Z)
- ≥ 1 küçük harf (a–z)
- ≥ 1 rakam (0–9)
- ≥ 1 özel karakter (ör. `!@#$%^&*`)

Kaydettikten sonra, müşteri bu parolayı (artı telefon veya e-posta) kullanarak Rider App'e giriş yapacak. Parolaları doğrulanmış bir kanal üzerinden iletin — uçtan uca şifrelenmeyen sohbetlere asla parola yapıştırmayın.

### Durum (oluştururken)

| Değer           | Kullanım                                                                              |
| --------------- | ------------------------------------------------------------------------------------ |
| **Active**      | Varsayılan — müşteri hemen sürüş yapabilir                                          |
| **Inactive**    | Oluşturuldu ama henüz aktif değil (sonra Active yapılacak)                           |
| **Blocked**     | Önceden engellenmiş (nadir — genellikle dolandırıcılık sonrası hesap yeniden oluşturulurken kullanılır) |
| **Frozen**      | Hesap duraklatıldı                                                                    |
| **Registering** | Kayıt işlemi devam ediyor (yalnızca harici akışla entegrasyon için kullanılır)       |

## Alanlar — Düzenle

Düzenle parola alanlarını gizler (parolalar başka yerde sıfırlanır) ve **Etiketler** ekler.

| Alan          | Notlar                                                                       |
| -------------- | --------------------------------------------------------------------------- |
| **Adı**       | Önceden doldurulmuş, Oluştur ile aynı doğrulama                             |
| **Soyadı**    | Önceden doldurulmuş, Oluştur ile aynı doğrulama                             |
| **E-posta**   | Önceden doldurulmuş; değiştirmek müşterinin girişini doğrulayana kadar bozabilir |
| **Telefon**   | Önceden doldurulmuş; E-posta ile aynı uyarı                                |
| **Etiketler** | Çoklu seçim; gruplama ve filtreleme için operatör tarafından uygulanan etiketler |
| **Durum**     | Mevcut durumla önceden doldurulmuş; aynı enum                              |

## Kaydet / İptal

- **İptal** (veya geri oku) — kaydedilmemiş değişiklikleri atar ve önceki sayfaya döner
- **Kaydet** — formu doğrular ve müşteriyi oluşturur / günceller. Başarıyı bildiren toast; alan hataları kırmızı vurgulanır

Doğrulama başarısız olursa (eksik alan, parola kuralları, yinelenen e-posta, telefon formatı), sayfa açık kalır ve hatalı alan çevrelenir.

## Oluşturma ve Düzenleme — farklar

| Özellik            | Oluştur                                                | Düzenle                                               |
| ------------------ | ------------------------------------------------------- | ---------------------------------------------------- |
| Şifre alanları     | Mevcut ve zorunlu                                       | Gizli                                                |
| Etiketler          | Formda yok (daha sonra Düzenle veya liste/detaydan ayarlanır) | Mevcut                                               |
| Durum              | Boş → varsayılan _Aktif_                                | Mevcut durumla önceden doldurulmuş                   |
| E-posta / Telefon  | Boş                                                    | Önceden doldurulmuş — değiştirilmesi yeniden doğrulamayı gerektirebilir |
| Kaydettikten sonra | Yeni müşterinin detayına yönlendir                     | Müşteri detayına geri yönlendir                       |
| Aktivite günlüğü girişi | "_operatör adı_ tarafından Müşteri oluşturuldu"       | "_operatör adı_ tarafından Müşteri düzenlendi" ve alan farkı gösterilir |


Her iki akış da müşterinin [Activity log](client-detail.md#etkinlik-sekmesi) kaydına yazar.

## Tipik iş akışları

- **Bir VIP oluşturun** — listede `+ Create` → ad, gerçek e-posta, gerçek telefon, güçlü şifre, durum _Aktif_ doldur → kaydet → sürücüyü kimlik bilgileriyle bilgilendir
- **Yazım hatasını düzeltin** — liste satırı → satır menüsü → _Düzenle_ → alanı düzelt → kaydet (değişiklik Aktivite'de fark olarak görünür)
- **Kurumsal toplu kayıt** — oluşturmayı API ile betikleyin (bu form tekil kayıtlar içindir); şirkete özel etiketleri uygulamak için daha sonra Düzenle'yi kullanın
- **Cihaz değişiminden sonra telefonu değiştirin** — Düzenle → Telefonu güncelle → kaydet → müşteri sonraki girişte yeniden doğrulama yapmalıdır (arka uç kurallarına bağlı olarak)

## İpuçları

- **Telefon formatı önemlidir** — `+` ve ülke kodu ile başlamalıdır; format zorunludur ve doğrulayıcı hatalı girişi reddeder
- **Güçlü şifre seçimi** — tek seferlik operatör oluşturmalarda, tüm kuralları aynı anda karşılayan uzun bir ifade kullanın ("rideTheWolf2026!RW"); şifrenizi sohbet yerine şifre yöneticinize kaydedin
- **E-posta benzersizliği** — yinelenen e-posta en yaygın Oluşturma hatasıdır; önce listeyi e-posta ile arayarak kontrol edin
- **Mevcut müşterilerde E-posta / Telefonu rastgele değiştirmeyin** — doğrulama akışları bunlara bağlıdır; kaydetmeden önce müşteri ile koordine olun
- **Etiketler burada olmalı, satırda değil** — liste üzerinde toplu işlemle de etiket ekleyip çıkarabilirsiniz, ancak cerrahi değişiklikler için düzenleme formu doğrudur
- **Durum değişiklikleri denetim ağırlığı taşır** — bu form üzerinden _Aktif → Engellendi_ geçişi, özel _Eylemler → Müşteriyi engelle_ işlemi gibi kaydedilir — her ikisi de geçerlidir
