# Müşteri Detayı

Müşteri detay sayfası (`/clients/:id`), tek bir müşteri için çalışma alanıdır. Kişisel bilgileri incelemek, bakiye işlemleri yapmak (yükleme, ceza), engelleme / engel kaldırma, mesaj gönderme ve müşterinin sürüş geçmişi ile hesap etkinliğini denetlemek için kullanılır.

Genellikle buraya [Müşteriler listesi](clients.md) içindeki bir satıra tıklayarak veya bir sürüşün detay sayfasından (başlıktaki müşteri bağlantısı) gelirsiniz.

Gerekli izin: **Müşteriler** (`e4f5h6`). Belirli işlemler alt izinler gerektirir (aşağıda belirtilmiştir).

## Düzen

Yukarıdan aşağıya:

1. **Başlık** — geri, ad, durum, _Eylemler_ düğmesi
2. **Özet kartlar** — bakiye, sürüşler, puanlama, durum (4 KPI kutucuğu)
3. **Sekmeler** — Detaylar / Etkinlik / Geçmiş

## Başlık

Üst şerit müşteriyi tanımlar:

- **Geri düğmesi** (`←`) listeye döner
- **Ad** (adı + soyadı) ve **durum etiketi** (Aktif / Engellendi / Donduruldu / Kayıt Oluyor)
- Sağdaki **Eylemler** düğmesi — eylemler iletişim kutusunu açar

## Eylemler

**Eylemler** tıklanınca bu müşteri için mevcut tüm operatör eylemlerini içeren bir modal iletişim kutusu açılır. Her biri izinle kontrol edilir:

| Eylem               | İzin                | Ne yapar                                                                  |
| ------------------- | ------------------- | ------------------------------------------------------------------------- |
| **Bakiye yükle**    | `topup-manual`      | Bakiye iletişim kutusunu açar — müşterinin cüzdanına para yükler           |
| **Ceza kes**        | `fine`              | Ceza iletişim kutusunu açar — cüzdandan para düşer (hasar, park, vb.)     |
| **Push gönder**     | —                   | Müşterinin uygulamasına push bildirimi göndermek için iletişim kutusu açar |
| **Engelle / Engel kaldır** | `block` / `unblock` | Müşterinin engelli durumunu isteğe bağlı bir nedenle değiştirir            |
| **Müşteriyi düzenle** | `edit`              | [düzenleme formunu](client-create-edit.md) açar                           |
| **Müşteriyi sil**   | `delete`            | Onay iletişim kutusuyla yumuşak silme (kırmızı yıkıcı öğe)                |

İzniniz olmayan eylemler gizlenir.

## Özet kartlar

Başlığın altında müşteriyi hızlıca özetleyen dört kart dizisi:

| Kart         | Gösterdiği Bilgi                                                                 |
| ------------ | -------------------------------------------------------------------------------- |
| **Bakiye**  | Şirket para biriminde cüzdan bakiyesi (negatifse kırmızı)                        |
| **Sürüşler** | Ömür boyu sürüş sayısı                                                           |
| **Puanlama**| Bu müşteri için sürücüler tarafından verilen ortalama puan                        |
| **Durum**   | Güncel durum ve tek satırlık alt başlık ("Aktif / Engellendi / Donduruldu / Kayıt Oluyor") |

## Sekmeler

Üç sekme:

| Sekme         | İçeriği                                                                                      |
| ------------- | -------------------------------------------------------------------------------------------- |
| **Detaylar**  | Kişisel bilgiler (ad, e-posta, telefon, durum, bakiye, etiketler) ve **Cihazlar** paneli (oturum açmış cihazlar) |
| **Etkinlik**  | Bu müşteri hesabındaki operatör ve sistem eylemleri (durum değişiklikleri, bakiye düzenlemeleri, vb.) |
| **Geçmiş**   | Müşterinin sürüş geçmişi — küresel Sürüşler listesinin bu müşteriye özel dilimi               |

### Detaylar sekmesi

Müşteri hesap durumunun en derin görünümü. İki alan:

**Kişisel bilgiler (ızgara):**

- Ad
- Soyad
- E-posta (doğrulanma durumu göstergesi)
- Telefon (doğrulanma durumu göstergesi)
- Durum (durum etiketi ile)
- Bakiye (şirket para biriminde biçimlendirilmiş)
- Etiketler (bu müşteriye uygulanmış etiketler)

**Cihazlar paneli:**

Bu hesaba bağlı Rider App'de oturum açmış tüm cihazları, son görülme zamanlarıyla ve izin varsa push gönderme veya cihazdan çıkış yapma seçenekleriyle listeler. Güvenlik incelemeleri ve "Giriş yapamıyorum" destek durumları için faydalıdır.

### Etkinlik sekmesi

Bu müşteriye ait kronolojik **etkinlik günlüğü**: her operatör eylemi (bakiye yükleme, ceza, durum değişikliği, düzenleme, SMS/e-posta/push gönderme) ve her sistem olayı (kayıt aşamaları, doğrulama durumu değişiklikleri, iade kaynaklı bakiye ayarlamaları).

Uyumluluk, anlaşmazlık çözümü ve hesap verebilirlik için faydalıdır.

### Geçmiş sekmesi

Müşterinin **sürüş geçmişi** tablo olarak — küresel Sürüşler listesiyle aynı satır formatında, bu müşteriye özel ön filtreli. Herhangi bir satıra tıklayarak sürüş detayını açabilirsiniz.

Bu sekme, "müşteri X sürüşünün yanlış olduğunu söylüyor" durumları için başlangıç noktasıdır.

## Tipik iş akışları

- **Müşteri cüzdanın yanlış olduğunu söylüyor** — Detaylar (güncel bakiye), sonra Etkinlik (son bakiye değişikliğini kontrol et), sonra Geçmiş (borçlandıran sürüşü doğrula). Bir hata varsa, _Eylemler → Bakiye yükle_ sebep ile
- **Müşteri kayıp telefon bildiriyor** — Detaylar → Cihazlar → kayıp cihazdan çıkış yap (destekleniyorsa); isteğe bağlı olarak _Eylemler → Müşteriyi engelle_ ile cüzdanı kilitle, erişim sağlanana kadar
- **Dolandırıcılık veya kötüye kullanım** — Zaman çizelgesi için Etkinlik, şüpheli sürüşler için Geçmiş; sonra _Eylemler → Müşteriyi engelle_ sebep ile; sebep etkinlik günlüğüne kaydedilir
- **İyiniyet iadesi** — _Eylemler → Bakiye yükle_ açıklama olarak "İyiniyet iadesi — bilet #12345" gibi; açıklama denetim izi için Etkinlikte görünür
- **Hoş geldin / onboarding iletişimi** — _Eylemler → Push gönder_ hoş geldin mesajı ile; önce Cihazları kontrol ederek aktif oturumları doğrula

## İpuçları

- **Durum kartını izleyin** — her şey yolunda görünse bile, _Engellendi_ veya _Donduruldu_ durumu müşterinin neden sürüş yapamadığını açıklar
- **Cihazlar paneli hata ayıklama başlangıcınızdır** — çoğu "Giriş yapamıyorum" durumu eski bir cihaz oturumundan kaynaklanır
- **Yükleme ve ceza açıklamaları Etkinlik'te görünür** — operatörlerin daha sonra arayabileceği bir şey yazın ("bilet #X", "Y sürüşü için iade") sadece bir sayı yerine
- **Düzenle meta veriler içindir** — ad, e-posta, telefon — bakiye için değil. Para işlemleri için özel bakiye diyaloglarını (denetim izi ile) kullanın
- **Puanlama müşterinin _sürücü_ puanlamasıdır** — düşük puan, park kanıtı / bilet artışları ile çapraz kontrol edildiğinde genellikle sorunlu bir sürücüyü gösterir
- **URL müşteri kimliğini içerir** — tam profili paylaşmak için destek konuşmasına yapıştırın
