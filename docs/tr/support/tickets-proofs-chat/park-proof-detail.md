# Park Kanıtı Detayı

Park kanıtı detay sayfası (`/support/park-proofs/:id`), bir park kanıtını derinlemesine inceleyip — eğer hâlâ beklemedeyse — onu denetlediğiniz yerdir. Bu sayfa, [Park Kanıtları listesi](park-proofs.md) üzerinde büyük bir iletişim kutusu olarak açılır; URL değişir, böylece kanıt paylaşılabilir / derin bağlantı verilebilir.

Genellikle buraya bir satırdaki _Görüntüle_ye tıklayarak, galeri görünümündeki bir kutucuğa tıklayarak veya doğrudan URL yapıştırarak gelirsiniz.

Gerekli izin: **Park Kanıtları** (`d5e6f7`). `review` alt izni denetleme işlemlerini etkinleştirir, `delete` ise Sil düğmesini etkinleştirir.

## İnceleme sayfasıyla ilişkisi

Hem `/support/park-proofs/:id` (bu sayfa) hem de `/support/park-proofs/:id/review` vardır — benzer görünürler ama farklı işler görürler:

| Yüzey                                                                             | Nedir                                                                                                                                    |
| --------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| **Park Kanıtı Detayı (bu sayfa)**                                                | Listeden açılan bir **iletişim kutusu** — tam çözünürlüklü resim, tam bağlam, tam işlem seti. Tek kayıt görünümü. URL `/support/park-proofs/:id` |
| [Park Kanıtı İncelemesi](park-proof-review.md)           | Bir **tam ekran sayfası** (`/:id/review`) — tek bir kanıt için ayrılmış inceleme yüzeyi                                                     |
| [Park Kanıtı Otomatik İnceleme](park-proof-auto-review.md) | **Hızlandırılmış mod** — bekleyen kanıtların otomatik ilerleyen kuyruğu, birer birer                                                        |

Günlük kullanımda: kuyruk temizliği için **Otomatik İnceleme**yi, listeden tek tek inceleme için **detay iletişim kutusunu** (bu sayfa), özel inceleyici akışı için **inceleme sayfasını** kullanın.

## Düzen

İletişim kutusu geniş ekranlarda iki sütuna ayrılır, dar ekranlarda üst üste yığılır:

| Sütun            | Genişlik | İçerik                                                                                               |
| ---------------- | -------- | --------------------------------------------------------------------------------------------------- |
| **Resim (sol)**  | 3/5      | Siyah arka planda tam çözünürlüklü fotoğraf ve yakınlaştırma                                        |
| **Bilgi (sağ)**  | 2/5      | Başlık (başlık + durum / tür rozetleri), bağlam (müşteri / sürüş / araç), detaylar ızgarası, inceleme işlemleri |

## Resim (sol sütun)

Siyah arka planda tam çözünürlüklü fotoğrafla büyük bir resim görüntüleyici:

- **Resme tıklayın** yakınlaştırmayı açıp kapatmak için (1× → 2× → 3× → 4× → tekrar 1×)
- **Fare tekerleği** ile 0,5× adımlarla yakınlaştırma yapın veya uzaklaştırın
- İmleç duruma göre yakınlaştırma açma / kapama simgesine dönüşür
- 1× üzerindeyken sol üstte bir **yakınlaştırma % rozeti** görünür

Fareyle üzerine gelindiğinde sağ altta dört düğme belirir (siyah arka planda yarı saydam):

| Düğme               | Ne yapar                                                                       |
| ------------------- | ------------------------------------------------------------------------------ |
| **Yakınlaştır**     | +0,5× yakınlaştırma adımı (en fazla 4×)                                        |
| **Uzaklaştır**     | -0,5× yakınlaştırma adımı (en az 1×)                                           |
| **Küçült**         | Yakınlaştırmayı 1×'ye sıfırlar                                               |
| **Yeni sekmede aç** | Orijinal çözünürlüklü resmi yeni tarayıcı sekmesinde açar, daha yakından inceleme için |

[İnceleme sayfasında](park-proof-review.md) olduğu gibi aynı işaretlere bakın: aracın tamamı çerçevede mi, yasal park yeri mi, ayaklık aşağıda mı, sürücünün iddiasıyla çelişen bir şey var mı.

## Başlık (sağ sütun üstü)

Başlık şeridi kanıtı tanımlar:

- **Başlık** _"Park Kanıtını İncele"_ ve altında kısa açıklama
- Sağda üst üste iki **rozet**:
  - **Durum rozeti** — duruma göre renklendirilmiş (sarı Beklemede, yeşil Onaylandı, turuncu Uyarı, kırmızı Reddedildi, koyu Engellendi)
  - **Tür rozeti** — _Başlangıç_ / _Park_ / _Bitiş_ gösteren çerçeveli kapsül

## Bağlam bölümü

İlgili varlıklara bağlantı veren üç satır. Her biri bir router-link (tıklayınca ilgili detay sayfası aynı pencerede açılır):

| Satır         | Gösterir                                                                                                               |
| ------------- | --------------------------------------------------------------------------------------------------------------------- |
| **Müşteri**   | Müşteri adı ([müşteri detayı](../../operations/customers/client-detail.md) bağlantılı), e-posta + telefon (tıklayınca kopyalar) |
| **Sürüş**     | Sürüş adı / kimliği [sürüş detayı](../../operations/trips/ride-detail.md) bağlantılı                                   |
| **Araç**      | Araç etiketi [araç detayı](../../operations/fleet/vehicle-detail.md) bağlantılı, altında araç türü                      |

Bağlamı hızlı oluşturmak için bu çapraz referansları kullanın — bu müşteri daha önce ihlal etti mi, gerçekten sürüşü burada mı bitirdi, bu araç sık sık işaretlendi mi?

## Detaylar bölümü

Bağlamın altında iki sütunlu anahtar/değer ızgarası. Görünen alanlar kanıtın durumuna bağlıdır:

| Alan                | Ne zaman gösterilir         | Ne gösterir                                                                                                                                                                                                                                   |
| ------------------- | --------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Oluşturulma**     | Her zaman                   | Rider App fotoğrafı yüklediği zaman                                                                                                                                                                                                           |
| **İncelenme zamanı** | Sadece incelemeden sonra    | Bir operatör (veya Otomatik İnceleme) karar verdiği zaman                                                                                                                                                                                     |
| **İnceleme süresi**  | Sadece incelemeden sonra    | Oluşturulma → İncelenme zaman farkı (ör. "2s 14d") — kanıt için SLA ölçümünde faydalı                                                                                                                                                        |
| **İnceleyen**       | Sadece operatör incelemesinde | İnceleyen operatör. [operatör profiline](../../settings/access/operators.md) bağlıdır. Operatör çözümlenemiyorsa (404, izin yok) id tıklanabilir link olarak gösterilir — profil sayfası kendi yetkilendirmesini yönetir |
| **Konum**           | Sürüşün koordinatları varsa  | Sürüşün başlangıç ( _Başlangıç_ kanıtları için) veya bitiş ( _Park_/_Bitiş_ kanıtları için) enlem / boylamı, 6 ondalık basamağa kadar                                                                                                         |

Kanıt ceza ile reddedildiyse, detayların altında şirket para biriminde ceza tutarını gösteren kırmızı bir _Ceza_ uyarısı gösterilir.

Önceki bir yorum veya reddetme nedeni varsa, aşağıda _Yorum_ bölümü olarak görünür.

## İnceleme eylemleri (sadece bekleyenler)

Kanıtın durumu **Beklemede** ise, sağ sütunun altında bir eylem seçici görünür. Detay diyaloğu **beş** moderasyon eylemini destekler (ayrılmış inceleme sayfasından bir fazla):

| Eylem                    | Duruma etkisi   | Ek alanlar            | Ne zaman kullanılır                                                                 | 
| ------------------------ | --------------- | --------------------- | ----------------------------------------------------------------------------------- |
| **Onayla**               | _Onaylandı_     | —                     | Fotoğraf açıkça iyi — yorum gerekmez                                              |
| **Yorumla onayla**       | _Onaylandı_     | Yorum zorunlu          | Fotoğraf iyi ama not düşmek istiyorsunuz (istisnai durum, gelecekte referans, ML eğitimi) |
| **Uyar**                 | _Uyarı_         | Yorum önerilir         | Fotoğraf ideal değil — rider yumuşak bildirim alır, ceza yok                      |
| **Reddet**               | _Reddedildi_    | Yorum + Ceza tutarı    | Kötü fotoğraf — ceza uygulanır. Gönderimde cüzdandan ceza düşülür                  |
| **Engelle**              | _Engellendi_    | Yorum zorunlu          | Ciddi / tekrar eden ihlal — rider gelecekteki sürüşlerden engellenir               |

Her eylem, açıklamalı tıklanabilir radyo kartı olarak gösterilir; birini seçmek koşullu alanları (yorum metin alanı ve / veya ceza tutarı girişi) açar. Birincil gönderme düğmesi eylemin rengini alır (yeşil / sarı / kırmızı / koyu).

Gönderdiğinizde, diyalog kapanır, bir toast eylemi onaylar ve liste yenilenir.

### İnceleme sayfasından farkı nedir

Ayrılmış [inceleme sayfası](park-proof-review.md) (`/:id/review`) **dört** eylemi yığılmış düğmeler olarak gösterir. Bu diyalog **beş** eylemi radyo kartları olarak gösterir — ekstra olan _Yorumla onayla_, olumlu kararda bağlam kaydetmek için yararlıdır, uyarıya yükseltmeden.

## Kapanmış kanıtlar (zaten incelenmiş)

Kanıt zaten incelenmişse (Onaylandı / Uyarı / Reddedildi / Engellendi), eylem bölümü gizlenir — diyalog salt okunur olur. Yine de tüm bağlamı görürsünüz (görsel, müşteri / sürüş / araç, detaylar, ceza, yorum, kim ve ne zaman inceledi) ve şunları yapabilirsiniz:

- Kayıdı **Sil** (`delete` izni ile) — sadece spam / test / yanlış sürüş yüklemeleri için
- Diyaloğu **Kapat**

Kararı sonradan değiştirmek için yöneticinizle konuşun — standart akış UI üzerinden yeniden incelemeye izin vermez.

## Altbilgi

| Düğme            | Görünür Olduğunda                              | Yaptığı İş                                                                                                                        |
| ----------------- | ----------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| **Sil**           | Her zaman, `delete` alt-izinine sahipseniz      | Kanıt kaydını tamamen kaldırır (onayla ile). Sadece test / spam / yanlış sürüş yüklemeleri için kullanın — moderasyon seçimi olarak değil |
| **İptal Et**      | Sadece Beklemede                               | Diyaloğu gönderim yapmadan kapatır                                                                                                |
| **Eylemi gönder** | Sadece Beklemede, bir eylem seçildikten sonra   | Seçilen eylemi gönderir (eylemle aynı renkte)                                                                                     |
| **Kapat**         | İncelenmiş kanıtlar                             | Diyaloğu kapatır                                                                                                                  |

Diyaloğu kapatmak (İptal Et / Kapat / Esc / kaplama tıklaması) URL'den `/:id` kısmını kaldırır, böylece geri / ileri geçmiş gördüğünüzle eşleşir.

## Tipik iş akışları

- **Listeden bir kanıtı incele** — listede kanıtı bul (filtrele / ara), satıra tıkla → detay diyaloğu açılır → bağlamda gez → karar ver
- **Para cezası kesilen bir kanıtı derinlemesine incele** — müşteri ile ara → reddedilen kanıtlardan birini aç → Kim İnceledi + yorum kısmını kontrol et, kimin ve neden karar verdiğini gör → itiraz çözümlemede kullan
- **Derin bağlantıdan hızlı onay** — bir ekip arkadaşından URL al → tıkla → diyalog açılır → fotoğrafa yakınlaş → Yorumla Onayla / Onayla
- **Araç geçmişini çapraz kontrol et** — bir kanıt aç → araca tıkla → aynı aracın sürekli kötü park fotoğrafları alıp almadığını gör → bu sürücü değil, yerleştirme / işaretleme sorunu olduğunu gösterir
- **İnceleyenlerin kararlarını denetle** — Durum `Onaylandı` ile listeyi filtrele → kanıtlara tıkla, Kim İnceledi + yorumu gör → ekibin standartlarını kalibre et

## İpuçları

- **Kaydırma tekerleği yakınlaştırması hızlıdır** — düğmeye gerek yok — sadece imleci görselin üzerine getirip yukarı kaydır
- **Görsel tam çözünürlükte yeni sekmede açılır** — diyaloğun içindeki yakınlaştırma yeterli olmadığında (örneğin plaka büyüklüğünde bir işaret okumak için), dışarıda aç
- **"Yorumla Onayla" sessiz onaydan iyidir** — sınır durumlar için bir satırlık not bırak, sonraki inceleyen (veya üç ay sonra sen) teşekkür eder
- **Engelleme kesindir** — sürücüler [müşteri detayından](../../operations/customers/client-detail.md) engeli kaldırılabilir ama herhangi bir kanıt için _Engelle_ en yüksek yaptırımdır. İlk ihlalde kullanma
- **Silmek ile Reddetmek arasındaki fark** — Reddetmek moderasyon kaydı bırakır (ve sürücüye ceza keser); Silmek kanıtı tamamen siler. Kağıt izi istersen asla silme
- **URL paylaşılabilir** — `/support/park-proofs/:id` doğrudan buraya gelir, liste gezintisi gerekmez
- **Kapanmış kanıtlar salt okunurdur** — incelenmiş bir kanıtı işlem yapmak için açtıysanız, düğmelerin neden kaybolduğunu böylece anlarsınız
