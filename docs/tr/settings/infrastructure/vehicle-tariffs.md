# Araç Tarifeleri

Ridewolf filonuz için fiyatlandırma kural kütüphanesi. Bir **Tarife**, sistemin bir sürüş için sürücüden alınacak ücreti hesaplamak için kullandığı, taban fiyat, sürüş başlatma ücreti, mesafe başına ücret, duraklatma ücreti, ücretli rezervasyon ücreti, indirim kademeleri ve otomatik iade güvenlik ağı gibi parasal kurallardan oluşan kendi içinde bağımsız bir settir.

`/settings/vehicle-tariffs` konumunda bulunur. İzin: **Tarifeleri Listele** (`v1w2x3`).

## Tarife Nedir

Bir Tarife doğrudan bir araca bağlı **değildir** — [Araç Ayarları](vehicle-settings.md) içindeki bir **Araç Modeli**ne bağlıdır. Zincir şu şekildedir:

```
Tarife  →  Araç Modeli  →  Araç  →  Sürüş
```

Tek bir tarife kaydı şunları içerir:

- **Kimlik** — `Ad`, `Açıklama` (Markdown), `Durum` (Aktif / Pasif / Arşivlendi), `Etiketler`
- **Fiyatlandırma birimi** — `Tür`: `per-minute`, `per-hour`, `per-day`, `per-month` seçeneklerinden biri. Bu, faturalama ayrıntısını kontrol eder (dakika başı saniye düzeyinde hesaplama yapar; gün/ay başı ise yukarı yuvarlamalı faturalama yapar — tam birim önceden tahsil edilir)
- **Fiyatlandırma alanları** (tüm parasal değerler şirket para biriminizdedir):
  - **Taban fiyat** — bir fiyatlandırma biriminin maliyeti (örneğin bir dakika, bir gün)
  - **Sürüş başlatma fiyatı** — sürüş başında bir kez alınan sabit açma ücreti
  - **Mesafe fiyatı** — kat edilen km başına maliyet
  - **Duraklatma fiyatı** — sürüş duraklatıldığında dakika başı ücret
  - **Ücretli rezervasyon fiyatı** — ücretsiz rezervasyon süresi bittikten sonra dakika başı ücret
  - **Rezervasyon süresi** — ücretli rezervasyon başlamadan önce ücretsiz rezervasyon dakikaları
- **İndirim kademeleri** — üç isteğe bağlı kademe (Birinci / İkinci / Üçüncü). Her kademe _"N birimden sonra X % indirim uygula"_ şeklindedir, böylece uzun sürüşler kademeli olarak daha ucuz olur
- **Otomatik iade** — açma/kapama + iki eşik (`distance` metre, `time` saniye). Etkinleştirildiğinde, sürücü sürüşü her iki eşik dolmadan durdurursa, arka uç sürüşü iptal eder ve iade yapar — başarısız açma durumunda sürücünün ücretlendirilmesini önler

## Tarifenin Uygulandığı Yerler

1. Operatör burada bir **Tarife** oluşturur / düzenler
2. Operatör tarifeyi [Araç Ayarları](vehicle-settings.md) içindeki bir **Araç Modeli**ne bağlar
3. O modele atanan araçlar tarifeyi miras alır
4. Bir sürücü sürüşü başlattığında, arka uç **tarifeyi anlık görüntü olarak** sürüş kaydına kaydeder ve tüm faturalama hesaplamalarında bu anlık görüntüyü kullanır

> **Anlık görüntü kritik önemdedir.** Bir tarife sonradan düzenlenip silinse bile tamamlanmış veya devam eden sürüşler geriye dönük olarak değişmez. [Sürüş Detayı](../../operations/trips/ride-detail.md) sayfasında gördüğünüz sürüş dökümü, tarifedeki değerlerin **sürüş başında olduğu haliyle** hesaplanır — Ridewolf faturalamayı denetlenebilir tutmak için bunu yapar.

## Filtreler

Tablonun üzerindeki filtre çubuğu:

| Filtre      | Tür     | Seçenekler                                              |
| ----------- | ------- | ------------------------------------------------------- |
| **Ara**     | metin   | Serbest biçim — ad / açıklama ile eşleşir               |
| **Durum**   | seçim   | Tüm durumlar · Aktif · Pasif · Arşivlendi               |
| **Tür**     | seçim   | Tüm türler · Dakika başı · Saat başı · Gün başı · Ay başı |

Filtreler gecikmeli çalışır ve her değişiklikte tablo 1. sayfadan yeniden yüklenir. URL durumu senkronize edilir — aynı görünümü paylaşmak için URL'yi yapıştırabilirsiniz.

## Sütunlar

| Sütun           | Sıralanabilir | Notlar                                                                             |
| --------------- | ------------ | --------------------------------------------------------------------------------- |
| **Ad**          | evet         | Tarife etiketi                                                                     |
| **Açıklama**    | evet         | Kısaltılmış; tam metin üzerine gelince görünür (Markdown başka yerde işlenir)      |
| **Tür**         | evet         | Çerçeveli rozet — `per-minute` / `per-hour` / `per-day` / `per-month`              |
| **Fiyat**       | evet         | Taban fiyat, şirket para biriminizde biçimlendirilmiş, monospaced                   |
| **Etiketler**   | hayır        | En fazla 2 etiket çipi + `+N` taşma. Hızlı düzenleme açmak için tıklayın             |
| **Durum**       | evet         | Renkli rozet (Aktif yeşil / Pasif gri / Arşivlendi mavi). Hızlı düzenleme için tıklayın |
| **Oluşturulma** | evet         | Oluşturulma tarihi                                                                 |
| **Güncellenme** | evet         | Son güncelleme tarihi                                                              |

Sıralama **istemci tarafında** yapılır — mevcut sayfa üzerinde çalışır.

## Üst eylemler

- **Otomatik yenileme** — listeyi yeniler (manuel tıklama veya aralıkla, bkz. [Otomatik yenileme](../../features/ux/notifications.md))
- **Dışa aktar** — Dışa Aktar iletişim kutusunu açar (mevcut sayfa · tüm filtrelenmiş · belirli sayfalar). Çıktı `vehicle-tariffs-export.json` dosyasıdır
- **+ Oluştur** — oluşturma formunu açar. Sadece **Tarife Oluştur** alt iznine sahipseniz görünür

## Satır eylemleri

Her satır için `⋯` menüsü:

- **Detayları görüntüle** — `/settings/vehicle-tariffs/:id` açar (her zaman erişilebilir)
- **Düzenle** — `/settings/vehicle-tariffs/:id/edit` açar (`edit` alt izni gerekir)
- **Sil** — 3 saniyelik beklemeli onay açar; onaylanırsa tarife silinir (`delete` alt izni gerekir)

> **Dikkatli silin.** Silinen tarifeye işaret eden Araç Modelleri, o araçlarda yeni sürüşler başlayabilmesi için başka bir tarifeye atanmalıdır. Mevcut sürüş kayıtları anlık görüntülerini korur.

## Hızlı düzenleme (Etiketler / Durum)

Herhangi bir satırdaki **Etiketler** çiplerine veya **Durum** rozetine doğrudan tıklayın → sadece bu alanları değiştirmenizi sağlayan küçük bir iletişim kutusu açılır, tam düzenleme formuna girmenize gerek kalmaz. Toast onay verir; tablo yenilenir.

## Oluştur / Düzenle formu

Hem `/settings/vehicle-tariffs/create` hem de `/settings/vehicle-tariffs/:id/edit` aynı form düzenini paylaşır: sol kartta girişler, sağda bağlamsal yardım içeren bir **Alan Kılavuzu** kenar çubuğu ve girdiğiniz değerlerin (ad, tür, taban fiyat, başlatma/mesafe, duraklatma, rezervasyon, etiketler, indirim kademeleri) **canlı önizlemesi**.

### Gerekli alanlar

| Alan           | Gerekli | Doğrulama                                |
| -------------- | ------- | ---------------------------------------- |
| **Ad**         | evet    | Boş olmamalı                            |
| **Tür**        | evet    | 4 seçenekten biri                       |
| **Durum**      | evet    | `active` / `inactive` / `archived` seçeneklerinden biri       |
| **Temel fiyat**| evet    | `>= 0`                                 |

Diğer tüm parasal alanlar varsayılan olarak `0` değerindedir ve `0` değerini kabul eder (etkin olarak "özellik devre dışı").

### Bölümler

1. **Kimlik** — Ad, Açıklama (Markdown), Tür, Durum, Etiketler
2. **Fiyatlandırma** — Temel fiyat, Sürüş başlangıç fiyatı, Mesafe fiyatı, Duraklatma fiyatı, Ücretli rezervasyon fiyatı, Rezervasyon süresi (dakika)
3. **Otomatik iade** — Açma/kapama. Açık olduğunda, `Mesafe` (metre) ve `Zaman` (saniye) doldurulur. Her iki eşik de aşılmadan sürüş başlamış sayılmaz; aksi halde otomatik iptal edilir ve iade yapılır
4. **İndirim kademeleri** — Üç kademe. Her biri: `İndirim %` (0-100) ve `Sonra birimler` (indirim aktif olmadan önce geçmesi gereken fiyatlandırma birimi sayısı). Bir kademeyi atlamak için sıfır bırakın

### Kaydetme davranışı

- **Oluştur** → "oluşturuldu" bildirimi, detay sayfasına yönlendirme
- **Düzenle** → "güncellendi" bildirimi, detay sayfasına yönlendirme
- **Kaydedilmemiş değişiklikler** anlık görüntü farkıyla izlenir. Sayfadan ayrılmak (iptal / geri) değişiklik varsa onay iletişim kutusu açar

> **Arka uç durum eşlemesi.** Formdaki `archived` değeri arka uca `deleted` olarak gönderilir — bu dahili addır. Operatörler arayüzde her yerde `archived` görür.

## Detay sayfası

`/settings/vehicle-tariffs/:id`, tarif etiketi, durum rozeti, **Düzenle** ve **Sil** eylemleri, üç genel istatistik kartı (Durum / Oluşturuldu / Güncellendi) ve ardından şu bilgileri içeren bir **Detaylar** kartı gösterir:

- Kimlik alanları (Ad, Tür, Durum, Temel fiyat, tarihler)
- Markdown'dan oluşturulmuş **Açıklama**
- **Fiyatlandırma** — tüm 5 parasal oran için ızgara görünümü (`TariffPriceGrid`)
- **Otomatik iade** — etkin/devre dışı rozeti, aktifse iki eşik
- **İndirim kademeleri** — üç kademenin görsel dökümü (`TariffDiscountTiers`)
- **Etiketler** — çözümlenmiş etiket çipleri (sadece varsa)
- **Sistem bilgisi** — tam kimlik, oluşturulma/güncellenme zaman damgaları

## Anlık görüntünün Sürüş dökümünü nasıl yönettiği

Bir [Sürüş Detayı](../../operations/trips/ride-detail.md) açtığınızda, **Döküm kartı** şunlardan hesaplanır:

- `ride.tariff` — sürüş başlangıcında gömülü anlık görüntü
- Canlı sürüş telemetrisi (süre, mesafe, duraklatma süresi, rezervasyon süresi)

Arka ucun yerelde yaptığı matematik:

- **Temel** — `birimler × Temel fiyat`, burada `units` = geçen saniye (dakika başına) veya tavan tabanlı türler için tavanlanmış gün/ay
- **Kilitleme ücreti** — sabit `Sürüş başlangıç fiyatı`, bir kez alınır
- **Mesafe** — `km × Mesafe fiyatı`
- **Duraklatma** — `duraklatma dakikası × Duraklatma fiyatı`
- **Rezervasyon** — ilk `Rezervasyon süresi` dakika ücretsiz, sonra `ücretli dakika × Ücretli rezervasyon fiyatı`
- **İndirim kademeleri** eşikler aşıldığında üstüne uygulanır

Bugün tarifede bir yazım hatası düzeltirseniz, **dünkü sürüşler etkilenmez** — dökümleri hala eski rakamları gösterir çünkü anlık görüntü gerçek kaynaktır.

## İş akışları

- **Yeni fiyatlandırma şeması başlatma** — tarifeyi oluştur (Durum `Pasif`) → finansla gözden geçir → `Aktif` yap → ilgili Araç Modeline [Araç Ayarları](vehicle-settings.md) içinde bağla
- **Mevsimsel promosyon** — mevcut bir tarifeyi çoğalt (manuel: yeni oluştur + alanları kopyala), `Temel fiyat` değiştir, tarih ekli ad ver (ör. `Yaz 2026 — Scooter`), promosyon dönemi için modele bağla, sonra geri değiştir
- **Otomatik iade ayarı** — başarısız kilit açmalar faturalandırmasın diye muhafazakar eşiklerle başla (küçük mesafe + kısa süre), sonra [Sürüşler](../../operations/trips/rides.md) içinde yanlış pozitif iadeler görürsen gevşet
- **Eski tarifeyi emekliye ayırma** — artık hiçbir Araç Modeli referans vermiyorsa Durumu `Arşivlendi` yap (arka uca `deleted` olarak gönderilir). Eski sürüşler anlık görüntülerini korur — güvenle arşivleyebilirsiniz
- **Anlaşılır isimlendirme** — Ad sadece bir etikettir. Yeniden adlandırmalar o andan itibaren yeni sürüş anlık görüntülerini etkiler; bitmiş sürüşler dökümlerinde eski adı tutar

## İpuçları

- **Anlık görüntü, anlık görüntü, anlık görüntü** — geçmiş bir sürüşün fiyatı hakkında şüphe varsa, bu listedeki mevcut tarifeye değil, [Sürüş Detayı](../../operations/trips/ride-detail.md) üzerindeki `ride.tariff.*` değerine bakın
- **Silme — onun yerine Arşivle** — Arşivlenen tarifeler veritabanında kalır (sunucu tarafında yumuşak silinir) ve eski sürüş anlık görüntülerinden hâlâ çözülebilir. Hiç kullanılmamış taslaklar için sert `Sil` uygundur
- **Alan Kılavuzu canlı önizlemesini kullanın** — sağ kenar çubuğu yazarken hesaplanan toplamları gösterir, bu da yeni bir tarifeyi kaydetmeden önce hızlıca kontrol etmenin en hızlı yoludur
- **Tür matematik için önemlidir** — `per-minute`'den `per-hour`'ye geçmek `Temel fiyat`ı otomatik ölçeklendirmez; manuel olarak yeniden hesaplamanız gerekir (1 dakika @ €0.20 ≠ 1 saat @ €0.20)
- **İndirim kademeleri sıralıdır** — `Sonra` aynı birimlerle ölçülür. `per-minute` türünde `Sonra: 30, İndirim: %10` olan bir kademe "30. dakikadan itibaren temel fiyatın %90'ı alınır" demektir. Üç kademe sırayla üst üste biner — en yüksek uygulanabilir kazanır
- **Tarifelerinizi etiketleyin** — etiketler Araç Modeline taşınır ve bu listede filtrelemeye yardımcı olur. Yaygın etiketler: `Scooter`, `Bike`, `Promo`, `Legacy`
