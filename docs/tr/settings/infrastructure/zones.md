# Bölgeler

Bölgeler sayfası (`/zones`), **hizmet alanınızın görünmez kurallarını** çizdiğiniz yerdir — park etme, girilmez, düşük hız, şarj ve araçlar ile müşterilerin sınırı geçtiğinde davranışlarını değiştiren diğer çokgenler. Her bölge, harita üzerinde tek bir çokgen artı bir tür, bir durum, isteğe bağlı parametreler (hız, fiyat, araç kapasitesi) ve etiketlerden oluşur.

Bölgeler, [Araçlar](../../operations/fleet/vehicles.md) için çalışma zamanı davranışını belirler — bir sürüş yasak çokgenine girerseniz araç devre dışı kalır; ücretli park alanına park ederseniz ücret uygulanır.

Gerekli izin: **Bölgeler** (`u7v8w9`). Alt izinler `create` / `edit` / `delete` ilgili işlemlere erişim sağlar.

## Bölge nedir

Bir bölgenin dört temel bileşeni vardır:

1. **Tür** — renk ve çalışma zamanında uygulanan kuralı seçer (aşağıdaki tabloya bakınız)
2. **Çokgen** — harita üzerinde tam olarak bir çokgen çizilir; girintili şekiller sorun değil, delikler yok
3. **Parametreler** — türe bağlıdır: hız (düşük hız), fiyat (ücretli park), miktar (şarj), izin verilen araçlar (park, ücretli park, dengeleme)
4. **Durum** — `Aktif` (uygulanan), `Pasif` (kaydedilmiş ama göz ardı edilen), `Arşivlendi` (çoğu listeden gizlenen)

### Bölge türleri

| Tür              | Renk       | Ne işe yarar                                                        |
| ---------------- | ---------- | ------------------------------------------------------------------ |
| **Girilmez**     | Siyah      | Araçlar buraya giremez veya çalışamaz                              |
| **Park yasak**   | Kırmızı    | Sürücüler burada sürüşü sonlandıramaz                              |
| **Sürüş yasak**  | Mor        | Araçlar bu çokgen içinde devre dışı kalır / başlamayı reddeder     |
| **Düşük hız**    | Mavi       | Maksimum hız, yapılandırılmış `speed` değeri (km/s) ile sınırlandırılır |
| **Park**         | Yeşil      | Belirlenmiş park alanı; isteğe bağlı araç kapasitesi               |
| **Ücretli park** | Turuncu    | Ücretli park alanı ve isteğe bağlı kapasite                        |
| **Şarj**         | Koyu yeşil | Ödül bölgesi — sürücüler burada bitirdiğinde `amount` uygulanır         |
| **Bakım**        | Koyu kırmızı | Operasyonlar için dahili işaret; içindeki araçlar sürücü akışından hariç tutulur |
| **Dengeleme**    | Koyu mavi  | Filo dengeleme hedef alanı; isteğe bağlı araç kapasitesi           |

## Görünüm modları

Sayfa başlığındaki bir geçiş grubu üç görünüm arasında geçiş yapar — aynı veriler, farklı bakış açıları.

| Mod       | En uygun olduğu durumlar                                             |
| --------- | ------------------------------------------------------------------- |
| **Tablo** | Toplu düzenlemeler, ada/türe/duruma göre sıralama, sayfalı gezinme  |
| **Kartlar** | Her bölge için mini harita ile görsel tarama; sonsuz kaydırma       |
| **Harita** | Gerçek harita üzerinde tüm bölgeleri görmek — kapsama denetimleri için faydalı |

## Filtreler

| Filtre  | Tür       | Notlar                                |
| ------- | --------- | ------------------------------------ |
| Arama   | Metin     | Bölge adı ve açıklamasında arama yapar |
| Durum   | Açılır menü | `Aktif` / `Pasif` (veya `Tümü`)     |
| Tür     | Açılır menü | 9 türden biri (veya `Tümü`)          |

Filtreler üç görünüm modunun tamamında uygulanır. Harita görünümü **tüm** eşleşen bölgeleri getirir (sayfalama yok); Tablo ve Kartlar sayfalama yapar.

## Sütunlar (Tablo görünümü)

| Sütun           | Sıralanabilir mi? | İçerik                                                    |
| --------------- | ----------------- | --------------------------------------------------------- |
| **Bölge adı**   | ✓                 | Etiket + renkli tür göstergesi; bölge detay sayfasına bağlantı |
| **Açıklama**    | —                 | İsteğe bağlı serbest metin açıklaması                      |
| **Tür**         | ✓                 | Renkli tür etiketi (yukarıdaki türler tablosuna bakınız)  |
| **Durum**       | ✓                 | `Aktif` / `Pasif` / `Arşivlendi`                          |
| **Etiketler**   | —                 | Bölgeye uygulanan etiketler                                |

## Satır işlemleri

Her satırda üç noktalı menü. Mevcut işlemler izinlere bağlıdır:

| İşlem            | İzin       | Ne yapar                                                |
| ---------------- | ---------- | ------------------------------------------------------- |
| **Detayları görüntüle** | —          | Bölge detay sayfasını açar (harita + meta veriler)       |
| **Düzenle**      | `edit`     | Geometri/özellikler düzenleme formunu açar               |
| **Sil**          | `delete`   | Kalıcı silme — onay için 3 saniye basılı tutma gerekir  |

## Toplu işlemler

Tablo görünümünde satırları seçerek toplu işlem çubuğunu açın. Tüm değiştirici toplu işlemler `edit` yeteneği gerektirir:

- **Türü değiştir** — birçok bölgeyi aynı anda yeni bir türe boyar (parametreler buna göre sıfırlanır)
- **Araç sınırını değiştir** — seçilenler için `allowedVehicles` ayarlar (park / ücretli park / dengeleme için geçerlidir)
- **Değeri değiştir** — türlere özgü sayısal değeri ayarlar (hız / fiyat / miktar)
- **Durumu değiştir** — Aktif ↔ Pasif arasında toplu geçiş yapar
- **Etiketleri değiştir** — seçilenlere etiket ekler veya değiştirir
- **Seçilenleri dışa aktar** — sadece vurgulanan bölgeleri JSON olarak indirir (izin gerekmez; istemci tarafı)

## Oluştur — 5 adımlı sihirbaz

`+ Oluştur` rehberli bir form açar. Geriye serbestçe geçiş yapabilirsiniz; ileri geçişler yalnızca mevcut adım geçerli olduğunda açılır.

1. **Ad ve açıklama** — `Etiket` (zorunlu) ve isteğe bağlı `Açıklama`
2. **Sınıflandır** — `Tür` (zorunlu, renk ve parametre şekli seçer), `Durum` (Aktif / Pasif / Arşivlendi), `Etiketler`
3. **Parametreler** — türüne özgü sayı girişleri, hızlı giriş için 0–100 kaydırıcı: hız (km/s), fiyat, miktar veya izin verilen araçlar. Parametresiz türler "parametre yok" bildirimi gösterir ve ilerlemenize izin verir
4. **Geometri** — harita üzerinde tam olarak **1 poligon** çizin. Mevcut bölgeler kesikli bir örtü olarak açılıp kapatılabilir, böylece üst üste binmezsiniz. Harita kontrolleri: çiz, düzenle, nokta ekle, geri al (20 adıma kadar), sil, yakınlaştır, sınırları sığdır, konumumu bul, tam ekran
5. **İnceleme** — her alanın ve poligon nokta sayısının son okunabilir özeti

Kaydetme, bölgeyi oluşturur ve sizi detay sayfasına yönlendirir.

## Düzenleme formu

`Düzenle` aynı yapıyı kullanır ancak tek sayfa formunda (adım yok) — etiketi, türü, durumu, parametreleri, etiketleri değiştirin veya poligonu yeniden çizin, sonra Kaydet. Kaydedilmemiş değişiklikler sayfadan ayrılmadan önce uyarı verir.

## İçe / Dışa Aktarma

**+ Oluştur** düğmesinin yanında iki ana hat düğmesi:

- **İçe Aktar** — daha önce dışa aktarılmış bir `.json` dosyası seçin; gösterge paneli yükü doğrular ve sunucu tarafında bölgeleri oluşturur. `create` yeteneği gerektirir
- **Dışa Aktar** — indirilecekleri seçebileceğiniz bir iletişim kutusu açar: mevcut sayfa, geçerli filtrelerle tüm sayfalar veya hepsi. Toplu işlemler çubuğu ayrıca vurgulanan satırlar için "Seçilenleri Dışa Aktar" seçeneği sunar

## Detay sayfası

Bir satıra tıklamak (veya _Detayları görüntüle_) bölgenin detay sayfasını açar ve şunları içerir:

- Poligonun canlı harita önizlemesi
- Temel bilgi kartı (etiket, açıklama, tür, durum, renk)
- Parametreler kartı (ilgili olduğunda hız / fiyat / miktar / izin verilen araçlar)
- Etiketler
- Oluşturulma / güncellenme zaman damgaları
- Başlıkta Düzenle ve Sil düğmeleri (izinle sınırlı)

## Tipik iş akışları

- **Yeni bir şehir kurmak** — varsa bir JSON bölge paketi içe aktarın, yoksa önce yasak bölge halkasını, sonra içinde park poligonlarını çizin
- **Yavaş hız alanını ayarlamak** — Düzenle → adım 3 → hız değerini artır → Kaydet. Hemen aktif olur
- **Bir park yerini bir gün kapatmak** — Düzenle → Durum = Pasif → Kaydet. Park yeri açıldığında tekrar aktif edin
- **Şehir değişikliğinden sonra yeniden bölgelendirme** — etkilenen bölgeleri toplu seç → Tür değiştir → onayla. Eski tür parametreleri otomatik temizlenir
- **Kapsam denetimi** — Harita görünümüne geçin, Durum = Aktif filtreleyin, boşluk ve örtüşmeleri gözle kontrol edin

## İpuçları

- **Tür her şeyi belirler** — renk, parametre şekli, çalışma zamanı kuralı. Yanlış tür seçmek en yaygın yeniden çalışma nedenidir
- **Her bölge için bir poligon** — karmaşık alanları birden çok bölgeye bölün; düzenleyici tek poligon zorunluluğu getirir
- **Bölgelerin üst üste binmesine izin verilir** — en kısıtlayıcı kural geçerlidir (yasak > sürüş yok > düşük hız), bu yüzden düşük hız alanını park poligonunun içine koymaktan çekinmeyin
- **Kesikli örtüyü kullanın** — düzenleyicide "Haritada mevcut bölgeleri göster" seçeneğini açıp kapatarak komşularla kazara örtüşmeyi önleyin
- **Pasif ≠ Silindi** — bir bölgeyi geçici durdurmak için Durumu değiştirin; Silme kalıcıdır (3 saniye basılı tutma onayı güvenlik sağlar)
- **Bölgelerinize etiket ekleyin** — etiketler, görünüm modları arasında kalan tek çoklu seçim filtresidir. İlçe, kampanya veya sahiplik bazında gruplamak için kullanın
- **Toplu düzenlemeden önce dışa aktarın** — dışa aktarma iletişim kutusunda bir tıklama tüm seti yedekler, böylece hatalı toplu değişiklik bir İçe Aktarma ile geri alınabilir
