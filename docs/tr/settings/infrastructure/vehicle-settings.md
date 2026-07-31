# Araç Kuralları

Araç Kuralları sayfası (`/settings/vehicle-rules`), Ridewolf'un nasıl çalıştıracağını bildiği **araç modelleri kataloğudur** — _Xiaomi M365_, _Ninebot Max G30_, _Segway F40_ ve benzeri. Buradaki her satır bir **model şablonu**dur: fiyatlandırma, teknik sınırlar, fotoğraf kanıtı kuralları ve etiketlerden oluşan yeniden kullanılabilir bir paket olup, bireysel fiziksel [araçlara](../../operations/fleet/vehicles.md) [araç formu](../../operations/fleet/vehicle-create-edit.md) aracılığıyla eklenir.

Gerekli izin: **Araç Kuralları** (`e7f8g9`). Alt izinler: `create` / `edit` / `delete`.

## Model ile araç örneği arasındaki fark

Bu sayfadaki en önemli ayrım şudur:

- Bir **Araç Modeli** (bu sayfa) — bir tanım. _"Filomuzdaki her Xiaomi M365 böyle davranır"_. Her marka/konfigürasyon için bir satır.
- Bir **Araç** ([Araçlar listesi](../../operations/fleet/vehicles.md)) — `RW-007` gibi bir etiketle işaretlenmiş, tek bir IoT cihazına bağlı, bir yerde park edilmiş fiziksel bir birim. Yüzlercesi tek bir modele işaret eder.

Burada bir modeli değiştirdiğinizde, ona işaret eden her araç yeni varsayılanları devralır — tarifeler aktif olur, hız limitleri güncellenir, fotoğraf kanıtı gereksinimleri yürürlüğe girer. Bu sayfayı, birçok birime aynı anda yayılan bir **politika katmanı** olarak düşünün.

## Filtreler

Üst filtre çubuğunda üç kontrol vardır:

| Filtre      | Tür       | Notlar                                                                                 |
| ---------- | --------- | ------------------------------------------------------------------------------------- |
| **Ara**    | Metin     | Model etiketinde arama yapar                                                          |
| **Durum**  | Açılır    | `Tümü` / `Aktif` / `Pasif` / `Arşivlendi`                                            |
| **Tür**    | Açılır    | `Tümü` / `E-Scooter` / `E-Bisiklet` / `Kargo E-Bisiklet` / `E-Moped` / `E-Araba` / `E-Bot` |

Herhangi bir filtre değişikliği sayfalandırmayı sayfa 1'e sıfırlar ve sunucudan yeniden yükler.

## Sütunlar

| Sütun           | Sıralanabilir mi? | İçerik                                                                                      |
| --------------- | ---------------- | ------------------------------------------------------------------------------------------ |
| **Görsel**      | —                | 64×64 küçük resim; görsel yüklenmemişse genel bir araba simgesine döner                     |
| **Ad**          | ✓                | Model etiketi (örneğin _Xiaomi M365 Pro_)                                                  |
| **Tür**         | ✓                | Araç türü etiketi (e-scooter, e-bisiklet, …)                                              |
| **Açıklama**    | ✓                | Markdown açıklamanın ilk 36 karakteri, biçimlendirme kaldırılmış                             |
| **Etiketler**   | —                | En fazla 2 etiket + `+N` taşma etiketi — **hızlı düzenleme için tıklayın** bir iletişim kutusunda |
| **Durum**       | ✓                | Renkli etiket: Aktif (yeşil) / Pasif (gri) / Arşivlendi (mavi) — **hızlı düzenleme için tıklayın** |
| **Oluşturulma** | ✓                | Modelin oluşturulduğu tarih                                                                 |
| **Güncellenme** | ✓                | Son değişiklik tarihi                                                                       |

Hızlı düzenleme tıklamaları sadece etiket çoklu seçimi veya durum açılır menüsünü içeren küçük bir iletişim kutusu açar — listeyi terk etmeden durum değişikliklerini toplu yapmak için kullanışlıdır.

## Araç çubuğu eylemleri

Sağ üst düğmeler (görünürlük izinlere bağlıdır):

| Düğme            | İzin       | Ne yapar                                                                                                                  |
| ---------------- | ---------- | ------------------------------------------------------------------------------------------------------------------------- |
| **Otomatik yenile** | —          | Listeyi düzenli aralıklarla yeniler; aç/kapa; yüklenirken simge döner                                                      |
| **İçe aktar**    | `create`   | Bir JSON dosyası seçin (dışa aktarma formatı). Her öğe bir `create` çağrısına dönüşür; etiketler ve tarifeler çıkarılır — elle yeniden ekleyin |
| **Dışa aktar**   | —          | Geçerli sayfa / tüm filtrelenmiş / belirli sayfaları `vehicle-models-export.json` olarak dışa aktarmak için iletişim kutusu açar |
| **+ Oluştur**    | `create`   | `/settings/vehicle-rules/create` sayfasına gider                                                                                 |

## Satır eylemleri

Her satır için üç nokta menüsü:

| Eylem             | İzin       | Ne yapar                                                                                                                  |
| ----------------- | ---------- | ------------------------------------------------------------------------------------------------------------------------- |
| **Detayları görüntüle** | —          | Model detayını `/settings/vehicle-rules/:id` adresinde açar (Genel / Teknik / Geçmiş sekmeleri)                            |
| **Düzenle**       | `edit`     | Düzenleme formunu (`/settings/vehicle-rules/:id/edit`) tam alan setiyle açar                                                |
| **Sil**           | `delete`   | Onay kutusu ile yıkıcı işlem; onay düğmesi 3 saniye sonra etkinleşir. Model satırı listeden kaybolur                      |

Satırın kendisine (hızlı düzenleme etiketleri dışındaki herhangi bir yere) tıklamak **Detayları görüntüle** sayfasına gider.

## Oluştur / Düzenle formu

`+ Oluştur` (`/settings/vehicle-rules/create`) ve _Düzenle_ (`/settings/vehicle-rules/:id/edit`) aynı düzeni paylaşır: solda bir form kartı, sağda modelin canlı önizlemesi ile bağlamsal bir **Alan Kılavuzu** kenar çubuğu.

Form bölümlere ayrılmıştır — Oluştur sadece temel yedi alanı gösterir; Düzenle gelişmiş ayarlar için üç ek alt bölüm (Teknik Özellikler, Otomatik Politikalar, Belge Gereksinimleri) ekler.

### Temel alanlar

| Alan             | Gerekli | Notlar                                                                                                                                |
| ---------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| **Etiket**       | ✓       | Her yerde gösterilen insan tarafından okunabilir isim (örneğin _Xiaomi M365 Pro_). Serbest metin                                      |
| **Açıklama**     | —       | Markdown düzenleyici; model detayında ve operatör ipuçlarında kullanılır                                                              |
| **Araç Türü**    | ✓       | Şunlardan biri: e-scooter / e-bike / cargo-e-bike / e-moped / e-car / e-boat. Sürüş simgesi ve kategori mantığı                      |
| **Durum**        | ✓       | Aktif / Pasif / Arşivlendi. Pasif, modeli araç oluşturma seçiminden kaldırır                                                          |
| **Görsel**       | —       | Sürükle ve bırak veya tıklayarak yükle. PNG/JPEG/JPG, maksimum 10 MB. Liste küçük resmi ve Araç detayında gösterilir                   |
| **Tarifeler**    | ✓       | Çoklu seçim [Araç Tarifeleri](vehicle-tariffs.md) arasından. Bu modeldeki tüm sürüşler bu tarifelere göre fiyatlandırılır              |
| **Etiketler**    | ✓       | Model düzeyinde çoklu seçim. Bu modeldeki her araç tarafından miras alınır                                                             |

### Teknik Özellikler (Sadece Düzenleme modunda)

| Alan                              | Notlar                                                                                  |
| -------------------------------- | --------------------------------------------------------------------------------------- |
| **Temel hız limiti (km/s)**      | IoT yazılımı tarafından her sürüşte zorunlu olarak uygulanan üst sınır                   |
| **Pil rezervi (%)**               | Araç düşük pil olarak kabul edildiği şarj seviyesi                                    |
| **Menzil rezervi (km)**           | Birimin değiştirilmesi için işaretlendiği tahmini kalan menzil                         |
| **Min / Max pil voltajı (V)**     | Geçerli ana pil okumaları için sınırlar — dışındakiler _İnceleme Gerekiyor_ olarak işaretlenir |
| **Min / Max IoT voltajı (V)**     | Aynı, IoT modülünün izleyici pil voltajı için                                            |

### Otomatik Politikalar (Sadece Düzenleme modunda)

Açma/kapama paketi: **Düşük pil durdurma**, **Düşük bakiye durdurma**, **Birden fazla sürüş**, **Otomatik kilitleme**, ayrıca kendi eşik değerleriyle **Otomatik iade** ve **Otomatik indirim** (mesafe / süre / tutar).

### Belge Gereksinimleri (Sadece Düzenleme modunda)

Sürücünün hangi fotoğraf / belgeleri sunması gerektiğini belirler:

- **Başlangıç kanıtları** — sürüş başlangıcında araç fotoğrafları (açma + zorunlu + sayısı) ve sürücü selfie'si
- **Park kanıtları** — sürüş sonunda park fotoğrafları (açma + zorunlu + sayısı)
- **Ek belgeler** — sürücü belgesi / pasaport / kimlik kartı / selfie / diğer

Bu kurallar, bu modele bağlı bir araçta sürüş başlatılırken / bitirilirken Rider App tarafından okunur.

## Diğer varlıklarla ilişkisi

- **[Araç Tarifeleri](vehicle-tariffs.md)** — **Tarifeler** alanında seçtiğiniz fiyatlandırma satırları. Tarifesi olmayan bir model sürüşü fiyatlandıramaz
- **[Araçlar](../../operations/fleet/vehicles.md)** — bu modele işaret eden fiziksel birimler, [araç formu](../../operations/fleet/vehicle-create-edit.md)'ndeki _Araç Modeli_ alanı ile. Model politikayı tanımlar; araç IoT, etiket ve konuma sahiptir
- **Etiketler** — modele ait etiketler, bu modeldeki her araç tarafından miras alınır; ayrıca doğrudan birime uygulanan araç düzeyi etiketler de vardır. Sürüşler her ikisini de sürüş başlangıcında miras alır

## Tipik iş akışları

- **Yeni bir model ekleme** — `+ Oluştur` → Etiket / Tür / Durum / Görsel doldur → geçerli tarifeleri seç → kaydet → listeden yeni modeli aç ve Teknik Özellikler ile politikaları ayarlamak için _Düzenle_'ye tıkla
- **Bir modeli emekliye ayırma** — modeli aç → _Düzenle_ → Durum = _Arşivlendi_ olarak ayarla → kaydet. Mevcut araçlar çalışmaya devam eder; model sadece araç oluşturma seçiminde görünmez
- **Filo genelinde tarife değişikliği** — modeli düzenle → tarifeleri değiştir → kaydet. Bu modeldeki tüm araçlar bir sonraki sürüşten itibaren yeni tarifelere göre fiyatlandırmaya başlar
- **Geçiş sonrası toplu içe aktarma** — Staging'den dışa aktar → JSON dosyasını buraya içe aktar → her yeni modelde tarifeleri ve etiketleri manuel olarak yeniden bağla (içe aktarma bu referansları kasıtlı olarak kaldırır)
- **Fotoğraf gereksinimlerini ayarlama** — Düzenle → Belge Gereksinimleri → Başlangıç / Park kanıtlarını aç/kapat → kaydet. Rider App yeni kuralları bir sonraki sürüş başlangıcında alır

## İpuçları

- **Aktif yapmadan önce tarifeleri ayarlayın** — tarifsiz bir model sürüş fiyatlandırma isteklerini reddeder
- **Emekliye ayırmak için Silme değil Pasif kullanın** — Pasif, modeli yeni araç oluşturma listesinden gizler ama geçmişi korur. Silme geri alınamaz ve 3 saniyelik onay gecikmesiyle engellenir
- **Görsel önemlidir** — liste küçük resmi ve operatör araç seçimleri bu görseli kullanır. En temiz görünüm için şeffaf arka planlı kareye kırpın
- **Buradaki etiketler model düzeyindedir, araç düzeyinde değil** — buraya bir etiket uygulamak, bu modeldeki her araca uygular. Birime özgü etiketler için bireysel aracı düzenleyin
- **Teknik Özellikler kapı uyarıları** — pil rezervi ve voltaj sınırları _İnceleme Gerekiyor_ tetikleyicisine besleme yapar; çok sıkı ayarlamak uyarı kuyruğunu doldurur
- **Alan Kılavuzu yan çubuğu bir alana odaklandığınızda güncellenir** — bir modeli ilk oluşturduğunuzda okuyun, bu makaleden daha günceldir
