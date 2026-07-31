# Bilet Detayı

Bilet detay sayfası (`/support/tickets/:id`), bir destek biletini incelediğiniz yerdir. [Biletler listesi](tickets.md) üzerinde büyük bir modal olarak açılır — URL değişir, böylece bilet paylaşılabilir / derin bağlantı verilebilir.

Genellikle buraya listeden bir satıra tıklayarak veya doğrudan URL'yi tarayıcıya yapıştırarak gelirsiniz.

Gerekli izin: **Biletler** (`a8b9c1`). Bazı işlemler ek alt izinler gerektirir (`edit`, `delete`).

## Diğer bilet görünümleriyle ilişkisi

| Görünüm                                                                    | Amacı                                                                          |
| -------------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| [Biletler Listesi](tickets.md)                  | Tam kuyruk — arama, filtreleme, sıralama                                       |
| [Bilet Otomatik İnceleme](ticket-auto-review.md) | Hızlı mod — bir seferde bir bekleyen bilet, hızlı klavye ile üçleme             |
| **Bilet detayı (bu sayfa)**                                              | Bir bilete derinlemesine bakış — tam görsel, tam açıklama, bağlam, düzenle / sil |

## Düzen

Modal yukarıdan aşağıya yığılır:

1. **Başlık** — başlık (bilet etiketi), açıklama satırı ("Bilet #ID"), kapatma (X)
2. **Görsel bölümü** — sürücünün kanıt fotoğrafı (büyük, tıklayınca açılır)
3. **Bilet detay kartı** — durum, şikayet türü, açıklama, yorum
4. **Araç ve konum kartı** — araç, IMEI, konum koordinatları, bölge, raporlayan
5. **Altbilgi** — _Kapat_ ve _Düzenle_ butonları

## Başlık

Üst şerit bileti tanımlar:

- Bilet etiketinin yanında bir **uyarı-dairesi simgesi** (örneğin aracın etiketi veya oluşturulmuş bilet adı)
- Bilet ID'sini gösteren bir **açıklama satırı**
- Sağ üstte diyalog kapatma (×) — ayrıca Esc veya dışarı tıklama ile de kapanır

Diyaloğu kapatmak URL'den `/:id` kısmını kaldırır, böylece geri / ileri geçmişi gördüğünüzle eşleşir.

## Görsel bölümü

Sürücü tarafından gönderilen tam kanıt fotoğrafı, hızlıca incelemek için yeterince büyük:

- **Görsele tıklayın** (veya üzerine gelince görünen _Tam Boy Görüntüle_ butonuna) — orijinal çözünürlükte fotoğraf yeni sekmede açılır
- **Üzerine gelince** — karartılmış bir örtü + _Tam Boy Görüntüle_ butonu görünür
- Görsel yüklenemezse, yerine bir yer tutucu görünür
- Biletin görseli yoksa (nadir, örn. operatör kaynaklı biletler), bölüm gizlenir

Listede küçük bir küçük resim vardır; burası moderasyona hazır tam görseldir.

## Bilet Detay kartı

İki kartlık ızgaranın sol kartı. Alanlar:

| Alan               | Gösterdiği                                                                                                                             |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------ |
| **Durum**          | Durum etiketi (Beklemede, Devam Ediyor, Çözüldü, Reddedildi, Yinelenen, vb.) — listeyle aynı renk paleti                            |
| **Şikayet türü**   | Şikayet türü etiketi — listeyle aynı renk kodlaması (kırmızı Mekanik hasar, sarı Temizlik, vb.)                                      |
| **Açıklama**       | Sürücünün serbest metin açıklaması, markdown olarak işlenir (satır sonları korunur, bağlantılar otomatik linklenir) — boşsa boş gösterilir |
| **Yorum**          | Operatörün biletle ilgili dahili yorumu / notları — operatör ekleyene kadar boşdur                                                  |

Her etiket renginin tam anlamı için [Biletler Listesi → Durum referansı / Şikayet türleri](tickets.md) sayfasına bakın.

## Araç ve Konum kartı

Izgaranın sağ kartı. Alanlar:

| Alan          | Gösterdiği                                                                                   |
| ------------ | ------------------------------------------------------------------------------------------- |
| **Araç**     | Araç etiketi (bir araba simgesiyle) ve bağlı IoT cihazının IMEI'si                           |
| **Konum**    | Sorunun bildirildiği enlem / boylam (6 ondalık basamak, bir pin simgesiyle)                   |
| **Bölge**    | Konumun düştüğü [bölge](../../settings/infrastructure/zones.md), varsa                        |
| **Raporlayan** | Bileti açan sürücü / sistem / operatör, e-posta adresiyle birlikte                         |

Bağlamda atlamak için bu çapraz referansları kullanın: araca tıklayarak [araç detayını](../../operations/fleet/vehicle-detail.md) açın, raporlayana tıklayarak [müşteri profilini](../../operations/customers/client-detail.md) açın veya koordinatları bir harita aracına yapıştırarak konumu doğrulayın.

## Eylemler (altbilgi)

Detay sayfası **bilerek küçük** bir eylem seti sunar — çoğu bilet iş akışı listede veya ilgili varlıklarda (araç, müşteri) gerçekleşir. Burada olanlar:

| Buton      | Yaptığı                                                                                                                                                |
| --------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Kapat** | Modalı kapatır (URL'den `/:id` kaldırılır)                                                                                                            |
| **Düzenle** | Bileti düzenleme modunda açar. Not: mevcut sürümde Düzenle işleyicisi "Düzenleme uygulanmadı" bildirimi gösterir — bağlı ama form henüz gönderilmemiştir |

### Listede olup burada olmayanlar

Listenin satır menüsünde, detay sayfasında görünmeyen iki ekstra eylem vardır:

| Eylem      | Nerede bulunur   | Neden                                                                                                                             |
| ---------- | ---------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| **Düzenle**| Liste satırı + detay | Aynı Düzenle (şu anda yer tutucu)                                                                                                |
| **Sil**   | Liste satırı menüsü | Silme sadece satır eylemidir (onay iletişim kutusuyla). Detaydan silmek için önce modalı kapatın, sonra satır menüsünü kullanın |

### Liste sayfasında neler var

Liste sayfası başlığında _Otomatik İnceleme_ var, bu doğrudan akış kuyruğuna atlar — detayda eşdeğer bir düğme yok çünkü zaten tek bir bilete odaklanmışsınız.

## Özellik bayraklı eylemler (mevcut yapıda yok)

Kod tabanında, bu yapıda **yorum satırı haline getirilmiş** daha zengin bilet eylemleri için yer tutucular var:

- **Ata** — bileti bir operatöre atar
- **Aracı engelle** — aracı tek tıkla hizmet dışı bırakır
- **Bakım görevi oluştur** — bu biletin verileriyle önceden doldurulmuş bir bakım görevi açar
- **Kullanıcıya kredi ver** — raporlayana cüzdan kredisi verir
- **Yanıtla** — sürücüye şablonlu yanıt gönderir
- **Yineleneni birleştir** — bu bileti ana biletle ilişkilendirir

Eğer dağıtımınızda bunlar etkinse, satır menüsünde / başlıkta bir _Eylemler_ açılır menüsünde görünürler — modal gövdesinde değil. Bekliyorsanız ve görmüyorsanız yöneticinize danışın.

## Tipik iş akışları

- **Fotoğrafla üçleme** — bileti aç → görsele bak → hasar gerçekse araç etiketini kopyala → modali kapat → aracı engellemek / bakım görevi oluşturmak için araç detayını aç
- **Düşük kaliteli raporu çöz** — bileti aç → fotoğrafın işe yaramaz olduğunu onayla → kapat → onayla ile liste satırı menüsünden sil
- **Bir aracın geçmişini incele** — bileti aç → araca tıkla → aracın tam uyarı + sürüş geçmişini gör → yorumu eklemek için bilete dön
- **Sürücünün şikayetini yolculukla doğrula** — bileti aç → raporlayanı kopyala → müşteri detayını aç → bağlam için son sürüşlerini kontrol et
- **Bir bileti ekip arkadaşınla paylaş** — URL bilet kimliğini içerir (`/support/tickets/:id`), böylece sohbet içine yapıştırabilir ve alıcı aynı modale ulaşır

## İpuçları

- **URL yer iminizdir** — `:id` ile URL’yi kopyalayıp sonra yapıştırmak, farklı bir oturumdan bile olsa doğrudan aynı bilete atlar
- **Kapatmak için Esc** — modal Esc, dış tıklama ve X desteği sunar — üçü de URL’den kimliği kaldırır
- **Orijinali görmek için görsele bir kez tıklayın** — küçük resim sıkıştırılmıştır; orijinal sürücünün gönderdiği dosyadır
- **IMEI ile çapraz kontrol yapın** — bir araç sürekli biletleniyorsa genellikle şasi değil IoT sorunludur. IMEI, [IoT ayarları](../../settings/infrastructure/iot.md) kaydına bağlantınızdır
- **Yorum sadece dahili** — sürücüler görmez; bilet üzerinde operatörler arası notlar için serbestçe kullanın
- **Düzenle henüz sunulmadı** — bugün _Düzenle_ye tıklamak bir bildirim gösterir. Durum değiştirmek gerekirse liste düzeyindeki eylemlerden veya Otomatik İnceleme’den yapın
