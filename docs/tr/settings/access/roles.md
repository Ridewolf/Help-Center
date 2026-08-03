# Roller

Roller sayfası (`/settings/roles`), operatörlerin gösterge panelinde **neler yapabileceğini** tanımladığınız yerdir. Bir rol, izinlerin isimlendirilmiş bir paketidir; her operatörün tam olarak bir rolü vardır; izinler hangi sayfaları göreceklerini ve hangi işlemleri yapabileceklerini belirler.

Bu sayfayı [Operatörler](operators.md) ile eşleştirin — Operatörler rolleri kişilere atar, Roller ise her rolün gerçekte neler yapabileceğini tanımlar.

Gerekli izin: **Roller** (`d4e5f6`).

## İzinler nasıl çalışır

Gösterge panelindeki her sayfa ve işlem bir **izin kimliği** arkasındadır (örneğin Araçlar için `k7m8n9`, Müşteriler için `e4f5h6`). Bir rol temelde bu izin kimliklerinin bir kontrol listesidir:

- Bir operatör, rolü sayfanın iznine sahipse sayfayı görebilir
- Bir satır işlemi (Düzenle, Sil, vb.) rol ilgili alt-izne sahip değilse gizlenir
- İzinler **her istek için** değerlendirilir — rol değişirse operatör bunu sonraki sayfa yüklemesinde (veya daha erken) görür

Roller arasında **miras yoktur** — her rol bağımsızdır. Daha yüksek güvenilirlikteki roller sadece daha uzun bir izin listesine sahiptir.

## Varsayılan ve özel roller

Roller iki çeşittir:

| Tür          | Düzenlenebilir | Amaç                                                                    |
| ------------ | -------------- | ---------------------------------------------------------------------- |
| **Varsayılan** | Hayır          | Platformla birlikte gelir (ör. Sahip, Yönetici). Güvenli bir temel sağlar |
| **Özel**     | Evet           | Siz oluşturursunuz — ekibinizin yapısına uyar                          |

**Sahip / Yönetici** varsayılan rolleri düzenlenemez veya silinemez — bunlar güvenlik ağıdır. Özel roller, gerçek sorumluluklara uygun izinleri ayarladığınız yerdir.

## Filtreler

| Filtre  | Tür       | Notlar                              |
| ------- | --------- | ---------------------------------- |
| Ara     | Metin     | Rol adı ve açıklamasında arama yapar |
| Durum   | Açılır Menü | `Aktif` / `Pasif` (veya `Tümü`)    |

## Sütunlar

| Sütun           | Sıralanabilir mi? | İçerik                                                                    |
| --------------- | ----------------- | ------------------------------------------------------------------------- |
| **Rol adı**     | ✓                 | Rolün etiketi                                                             |
| **Açıklama**    | —                 | Rolün ne için olduğunu açıklayan kısa metin                              |
| **Tür**         | —                 | Varsayılan / Özel etiketi                                                  |
| **İzinler**     | —                 | Verilen izinlerin sayısı (ör. "23 / 84")                                |
| **Güven skoru** | ✓                 | Rolün ne kadar yetkili olduğunu gösteren sayısal skor (yüksek = daha güçlü) |
| **Oluşturulma** | ✓                 | Rolün oluşturulma zamanı                                                  |

### Güven skoru

Güven skoru, "bu rolün izin seti ne kadar tehlikeli" sorusuna yaklaşık sayısal bir karşılıktır — sıralama ve görsel ipuçları için kullanılır. Silme + toplu güncelleme + izin yönetimi olan bir rol, sadece görüntüleme izni olan rolden daha yüksek güven skoruna sahiptir. Sabit bir ölçek yoktur; kendi roller listenizde göreceli bir ölçü olarak değerlendirin.

## Satır işlemleri

Her satır için üç noktalı menü.

| İşlem            | İzin       | Ne yapar                                                                                         |
| ---------------- | ---------- | ------------------------------------------------------------------------------------------------ |
| **Detayları Gör** | —          | Rol detay sayfasını tam izin dökümü ile açar                                                    |
| **Düzenle**      | `edit`     | Düzenleme formunu açar (Varsayılan roller için toast ile devre dışı bırakılır)                    |
| **Sil**          | `delete`   | Rolü yumuşak siler (onayla; sadece Özel roller; şu anda hiçbir operatörün rolü olmamalı)         |

Bir rol kullanımda ise sistem Silme işlemini reddeder ve kaç operatörün hala bu role sahip olduğunu söyler — önce onları yeniden atayın.

## Oluştur / Düzenle formu

Rol formu, her izni alanına göre (Operasyonlar, Destek, Analitik, Ayarlar vb.) gruplayarak onay kutuları ile gösterir.

Ana alanlar:

- **Ad** (zorunlu, benzersiz)
- **Açıklama** (isteğe bağlı ama önerilir)
- **Durum** (Aktif / Pasif)
- **İzin ağacı** — sayfa düzeyi ve alt izinler, alanlara göre gruplanmış

Bir üst düzey sayfa iznini kapattığınızda, tüm alt izinleri de kapatılır (operatör sayfayı tamamen kaybeder). Sayfa iznini açmak varsayılan olarak sadece görüntüleme verir — ardından _oluşturma_, _düzenleme_, _silme_ vb. alt izinleri tek tek seçersiniz.

Küçük bir **Güven skoru** göstergesi kutuları işaretledikçe güncellenir — benzer rollerle çapraz kontrol için faydalıdır.

## Rol detay sayfası

Bir satıra tıklamak rolün detay sayfasını açar ve şunları gösterir:

- Ad, açıklama, tür, durum
- Güven skoru
- Tam izin listesi (salt okunur, alanlara göre gruplanmış)
- Aktivite günlüğü: rolün ne zaman oluşturulduğu, son düzenleme zamanı, kim tarafından
- Şu anda atanmış operatörlerin listesi (profillerine bağlantılarla)

## Tipik iş akışları

- **Yeni bir ekip tanımla** — `+ Oluştur` → ad ver (ör. "Saha ekibi lideri") → ihtiyaç duydukları izinleri işaretle → Kaydet → ilgili [operatörlere](operators.md) rolü ata
- **Mevcut rolü sıkılaştır** — listeden rolü bul → Düzenle → istemediğin izinlerin işaretini kaldır → Kaydet (bu rolü kullanan operatörler bir sonraki isteklerinde erişimi kaybeder)
- **Bir ekip üyesini terfi ettir** — [Operatörler](operators.md) sayfasına git → Düzenle → Rol değiştir → Kaydet (bu sayfadan yapılmaz)
- **Araçları kimlerin silebileceğini denetle** — bu listeyi aç → Güven skoruna göre sırala → her rolün Araçlar için Düzenle / Sil alt izinlerini incele
- **Bir rolü emekliye ayır** — hiçbir operatörün rolü olmadığından emin ol ([Operatörler](operators.md) rol filtresi ile) → Sil

## İpuçları

- **Az çoktur** — sadece görüntüleme ile başlayın ve belirli eylemler ekleyin; daha yüksek bir rolü kopyalama ve kırpma isteğine direnin
- **Temsilci olarak test edin** (desteklenen yerlerde) — bir rolü dağıtmadan önce, rol ile test operatörü olarak giriş yapın ve iş akışlarını deneyin
- **Varsayılan roller sizin yedek planınızdır** — Sahip / Yönetici her zaman vardır; yanlışlıkla kendinizi Özel rolden kilitlerseniz, bir Yönetici erişimi geri yükleyebilir
- **Güven puanı bir ipucudur, kural değil** — aynı güven puanına sahip iki rol çok farklı şeyler yapabilir; her zaman gerçek izin ağacını kontrol edin
- **İzinler sunucu tarafında değerlendirilir** — rolde kapatmak operatörün mevcut oturumunu kaldırmaz, ancak sonraki istek reddedilir
- **Her Özel rolü Açıklama alanında belgeleyin** — altı ay sonra, "Filo yöneticisi (okuma + düzenleme, silme yok)" hayat kurtarıcıdır
