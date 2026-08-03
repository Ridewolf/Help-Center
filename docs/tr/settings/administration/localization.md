# Yerelleştirme

Yerelleştirme sayfası (`/settings/localization`) **çeviri çalışma tezgahı**dır — düzenleyebileceğiniz, içe/dışa aktarabileceğiniz ve yayımlayabileceğiniz _Koleksiyonlar_ (ilişkili çeviri anahtarları grupları) kütüphanesi. Her koleksiyonun bir ad alanı (örneğin `ui`, `auth`, `rides`), bir temel dili (her zaman `en`), hedef diller seti ve diller bazında değerleri olan anahtar listesi vardır.

> _Not_: bu sayfa şu anda **yalnızca ön uç prototipi**dir — koleksiyonlar `mockData.ts`'den alınır ve yerel durumda tutulur. _Kaydet_ ve _Yayınla_ onay bildirimleri gösterir ancak henüz bir arka uç uç noktası yoktur. Sayfa API için bir spesifikasyon olarak güvenle kullanılabilir; burada yaptığınız hiçbir şey kalıcı değildir.

Gerekli izin: rotada özel bir `requiredPermissions` ayarı yoktur — oturum açmış herhangi bir operatör açabilir.

## Sayfa düzeni

Sayfa başlığı, bir arama kutusu, bir _İçe / Dışa Aktar_ açılır menüsü ve bir _+ Koleksiyon oluştur_ butonundan oluşan tek bir başlık satırı — ardından Filtreler kartı ve Koleksiyonlar tablosu.

Referans verileri (şu anda `Localization.vue` içinde sabit kodlanmış):

- Diller: `en`, `ro`, `ru`, `de`, `fr`, `es` (temel + 5 hedef)
- Ad alanları: `ui`, `auth`, `rides`, `payments`, `marketing`
- Etiketler: `core`, `beta`, `promo`, `legacy`

## Filtreler

Tablonun üstünde bir Filtreler kartı bulunur.

| Filtre    | Tür            | Notlar                                                                        |
| --------- | -------------- | ---------------------------------------------------------------------------- |
| Dil       | Açılır liste   | Bu dili içeren koleksiyonları filtreler. Varsayılan `ro`                      |
| Ad alanı  | Açılır liste   | Ad alanı listesinden biri (veya tümü için boş)                               |
| Durum     | Açılır liste   | `all`, `active`, `draft`, `archived`                                         |
| Etiketler | Anahtar kartları | Çoklu seçim etiket kartları — bir koleksiyonun geçmesi için _her_ işaretli etikete sahip olması gerekir |
| Arama     | Metin (araç çubuğu) | 300 ms gecikmeli — ad, açıklama, ad alanı ile eşleşir                      |

Filtreler kartındaki bir _Temizle_ butonu dört filtreyi sıfırlar.

## Koleksiyonlar tablosu

| Sütun      | Sıralanabilir? | İçerik                                                                                                               |
| ---------- | -------------- | --------------------------------------------------------------------------------------------------------------------- |
| Koleksiyon | —              | Ad + 1 satırlık açıklama                                                                                             |
| Ad alanı   | —              | Ad alanı metniyle rozet                                                                                              |
| Diller    | —              | Her dil için rozet. Temel dil birincil varyantı alır; hedefler ikincildir. Üzerine gelince _temel_ ve _hedef_ gösterir |
| Anahtarlar | —              | Toplam anahtar sayısı. Üzerine gelince bayraklara göre döküm (_eksik_, _değişmiş_, _eski_) gösterir                   |
| Durum      | —              | Rozet — `active` / `draft` / `archived`                                                                               |
| Güncellendi| —              | Göreceli tarih. Üzerine gelince yazarı gösterir                                                                       |
| Eylemler   | —              | Her satır için üç nokta menüsü                                                                                        |

Sayfanın altında sayfalama: _Önceki / Sonraki_, toplam sayısı ve sayfa başına seçim (10 / 20 / 50).

### Satır eylemleri

| Eylem     | Ne yapar                                                                       |
| --------- | ------------------------------------------------------------------------------- |
| Görüntüle | Koleksiyon iletişim kutusunu salt okunur _görüntüleme_ modunda açar              |
| Düzenle   | Koleksiyon iletişim kutusunu _düzenleme_ modunda açar                            |
| Kopyala   | Koleksiyonu " (Kopya)" ekiyle çoğaltır ve listenin en üstüne ekler             |
| İçe Aktar | Koleksiyon iletişim kutusunu _İçe / Dışa Aktar_ sekmesine odaklanmış içe aktarma modunda açar |
| Dışa Aktar| Bildirim — koleksiyonu seçilen formatta indirme yer tutucu                      |
| Arşivle   | Durumu `archived` olarak değiştirir (satır kalır — arşivlenenleri görmek için Durum filtresini kullanın) |
| Sil       | Satırı yerel listeden kaldırır                                                 |

## Oluştur / Düzenle / Görüntüle — Koleksiyon iletişim kutusu

+ Oluştur veya herhangi bir satır eyleminden açılır. İletişim kutusunda dört sekme bulunur.

### Genel bakış sekmesi

Koleksiyonun meta verilerini düzenleyin.

- _Ad_ (zorunlu) — görüntüleme adı (ör. "UI Etiketleri").
- _Ad alanı_ — arama girişi olan seçim.
- _Açıklama_ — kısa açıklama.
- _Temel dil_ — salt okunur, her zaman `en`.
- _Hedef diller_ — beş İngilizce olmayan seçenekten açılır kartlar. Temel + hedefler birlikte Anahtarlar sekmesindeki dil sütunlarını oluşturur.
- _Durum_ — `active` / `draft` / `archived`.
- _Etiketler_ — etiket listesinden açılır kartlar.

### Anahtarlar sekmesi

Gerçek çeviri ızgarası.

- Araç çubuğu: bir arama kutusu (anahtar adı ve herhangi bir değeri eşleştirir), bir durum filtresi (ör. _Sadece Eksik_), bir dil seçici (hangi hedef sütunun düzenleme odağı olduğu).
- Anahtar seçildiğinde toplu işlemler: _Durum ayarla_, _Değerleri temizle_, _Seçilenleri dışa aktar_, _Sil_.
- Satır başına eylemler: anahtarı çoğalt, anahtarı sil, İngilizceden kopyala (geçerli hedefi EN değeriyle doldurur), yer tutucuları doğrula (EN'deki `{{name}}` gibi öğelerin hedefte korunduğunu kontrol eder).
- Her satır isteğe bağlı bayraklar taşır ve rozet olarak gösterilir:

| Bayrak     | Anlamı                                                        |
| ---------- | -------------------------------------------------------------- |
| `new`      | Anahtar yeni eklendi — insan incelemesi gerekiyor             |
| `changed`  | EN değeri son çeviriden beri değişti — hedefler güncel olmayabilir |
| `missing`  | En az bir hedef dilde boş değer                                 |
| `obsolete` | Anahtar artık kodda kullanılmıyor — silmek güvenli             |

- _Anahtar ekle_ ve _Bul & değiştir_ özel mini-diyaloglar açar.
- _Otomatik kaydet_ anahtarı — açıkken, bir değerde yapılan düzenlemeler hemen yerel duruma işlenir.

### İçe / Dışa Aktarma sekmesi

İçe Aktarma:

- _Format_ — JSON / CSV / XLSX.
- _Mod_ — mevcut değerleri değiştir / birleştir / ekle.
- _Bilinmeyen anahtarları tut_ anahtarı — kapalıysa, içe aktarılan dosyada olmayan anahtarlar `obsolete` olarak işaretlenir.
- _Simüle et_ — ne değişeceğini raporlayan kuru çalışma (yazma yok).
- _Uygula_ — içe aktarmayı onayla. İşlem sırasında ilerleme çubuğu gösterilir.

Dışa Aktarma:

- _Format_ — JSON / CSV / XLSX.
- _Kapsam_ — tüm anahtarlar / filtrelenmiş anahtarlar / seçili anahtarlar.
- _İndir_ — yer tutucu işlem (şimdilik toast).

### Yayınla sekmesi

- Bir özet bloğu: _Toplam N anahtar / M değişti / K eksik_.
- Önceki / sonraki değerlerle değişen anahtarların listesi.
- Uyarılar listesi (ör. yer tutucu uyumsuzluğu, eksik hedef).
- _Taslağı kaydet_ — çalışma kopyasını taslak olarak saklar (`status = draft`).
- _Yayınla_ — taslağı `active` olarak yükseltir ve toast gösterir.

## Üst araç çubuğu — İçe / Dışa Aktarma menüsü

Sayfa başlığında iki global kısayol (koleksiyon başına eylemlerden ayrı):

- _Koleksiyonları içe aktar_ — sayfa düzeyinde içe aktarma diyaloğunu açar (birden çok koleksiyonu toplu içe aktar).
- _Tümünü dışa aktar_ — her koleksiyonu tek pakette dışa aktarmak için kısayol (şimdilik toast).

## Kaydedilmemiş değişiklikler ve gezinme koruması

Global bir "kaydedilmemiş değişiklikler" bayrağı (`hasUnsavedGlobal`) vardır — açıkken, _Vazgeç_ / _Kaydet_ içeren yapışkan bir alt bilgi görünür. Sayfa ayrıca bir `router.beforeEach` koruması kurar: kaydedilmemiş değişikliklerle sayfadan ayrılmaya çalışmak, yerel tarayıcı _onay_ diyaloğunu tetikler.

## İş akışları

- **Romence yeni bir anahtar çevirin** — Tabloyu seç → Düzenle → Anahtarlar sekmesi → dil seçiciyi `ro` yap → anahtarı bul (veya _Anahtar ekle_) → değeri doldur → _Kaydet_ (veya Otomatik kaydet açık olsun).
- **Fransızcada eksikleri denetleyin** — Koleksiyonu düzenle → Anahtarlar sekmesi → durum filtresi _Sadece eksik_ → dil _fr_. Hızlı çözüm için _İngilizceden kopyala_ veya yayınlamadan önce _Yer tutucuları doğrula_ kullanın.
- **XLSX'ten toplu güncelleme** — Koleksiyonu düzenle → İçe / Dışa Aktarma sekmesi → XLSX seç, mod _Birleştir_, önce _Simüle et_ → farkı incele → _Uygula_.
- **Taslak dizeleri üretime yükseltin** — Koleksiyonu düzenle → Yayınla sekmesi → değişen anahtarlar listesini onayla, uyarıları düzelt → _Yayınla_.
- **Yeni bir pazar için varyant oluşturun** — Koleksiyonu çoğalt → yeniden adlandır → _Hedef diller_ e yeni dili ekle → çevir.
- **Kullanımdan kaldırılmış seti arşivleyin** — Satır menüsü → Arşivle. Koleksiyon tabloda kalır ama durumu `archived` olur; sonra bulmak için Durum filtresini kullan.

## İpuçları

- **Şimdilik sadece ön uç.** Buradaki hiçbir şey henüz arka uca gitmiyor — `Kaydet`, `Yayınla`, `Dışa Aktar`, `Sil`, `Arşivle` tümü yerel durum değişiklikleri + toastlar. Gerçek üretim dizeleri için API gelene kadar güvenmeyin.
- **Temel dil kilitli.** `en` her zaman temel dildir — İngilizce olmayan koleksiyonlar, İngilizce temel koleksiyonun hedef dilleri olarak oluşturulmalı, bağımsız değil.
- **Etiketler VE mantığı kullanır.** İki etiket çipiyle filtreleme, koleksiyonun _her iki_ etikete sahip olması demektir. Herhangi biriyle aramak için çiplerden birini temizleyin.
- **Gezinme koruması globaldir.** Sadece bir diyalog kirliyken bile sayfadan ayrılmak onay ister — istemi atlamak için açıkça kaydedin veya vazgeçin.
- **Yer tutucu doğrulama dostunuzdur** — Yayınlamadan önce çalıştırmak, çalışma zamanında dizenin bozulmasına neden olan "çeviride `{{name}}` kaybettik" hatalarını yakalar.
- **[Genel](general.md) içindeki Locale sekmesiyle karıştırmayın** — o sekme varsayılanları ayarlar (hangi diller _etkin_, tarih / saat / birim formatları). Bu sayfa gerçek çevrilmiş dizelerin evidir.
- **Referans veriler örnektir.** Diller, ad alanları ve etiketler şu anda sabit kodlu — arka uç geldiğinde API'den gelecek ve muhtemelen düzenlenebilir olacaklar.
