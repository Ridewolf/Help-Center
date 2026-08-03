# Araçlar — Liste

Araçlar listesi (`/vehicles`), tüm filonuzun envanteridir — her scooter, bisiklet veya diğer birim, mevcut durumu, konumu, bataryası, IoT bağlantısı, etiketleri ve bölgesi ile birlikte. Bu, gösterge panelindeki en çok kullanılan sayfadır: neredeyse tüm filo işlemlerine buradan başlarsınız.

Araç başına çalışma (tam durum, geçmiş, IoT komutları, rota oynatma) için [Araç detay sayfasını](vehicle-detail.md) açın.

Gerekli izin: **Araçlar** (`k7m8n9`).

## Araçlar buraya nasıl gelir

Araçlar kendi kendine görünmez — siz oluşturur ve yönetirsiniz:

1. Operatör, _Oluştur_ butonuyla **araç oluşturur** (etiket, model, IoT cihazı, başlangıç durumu ayarlanır)
2. Araç bir IoT cihazına kaydedilir; bu cihaz **batarya, kilit durumu, son sinyal, GPS koordinatları** bilgilerini sürekli raporlamaya başlar
3. IoT cihazı ilk kalp atışını gönderir göndermez, bu listedeki satır canlı verilerle dolar — batarya yüzdesi, sinyal zamanı, kilit göstergesi
4. Operatörler (ve toplu işlemler) aracın ömrü boyunca **durum, etiketler, bölge, ayarları** günceller
5. Araç emekliye ayrıldığında durumunu _Depolama_ / _Bakım_ / vb. olarak değiştirir veya silersiniz

Liste, sayfayı yenilediğinizde veya filtreleri değiştirdiğinizde yenilenir; arka uçtan gelen canlı IoT güncellemeleri de satırları yerinde güncelleyebilir.

## Görünüm modları — Tablo ve Harita

Sayfada üstteki bir kontrol ile geçiş yapılabilen iki görünüm vardır:

- **Tablo** — tüm filtreler, sıralama ve toplu seçim özellikleriyle tam veri ızgarası
- **Harita** — aynı filo, işletme alanınızın haritası üzerine yansıtılır; araçlar durumlarına göre renklendirilmiş pinler ve batarya rozetleri ile gösterilir

Filtreler her iki görünümde de geçerlidir. Harita görünümü kümeleri, boşlukları ve dengeleme fırsatlarını görmek için iyidir; Tablo ise veri ile çalışmak için kullanılır.

## Filtreler

| Filtre   | Tür              | Notlar                                                                       |
| -------- | ---------------- | --------------------------------------------------------------------------- |
| Arama    | Tam genişlik metin| Araç etiketi, Kimlik, IoT seri numarasını arar — metin girişi **~300ms gecikmeli** |
| Kilometre| Açılır liste      | Toplam mesafe aralıkları: `<1k`, `1k–10k`, `10k–50k`, `50k–100k`, `>100k` km  |
| Durum    | Açılır liste      | Araç durumuna göre filtrele (aşağıdaki durum referansına bakınız)             |
| Etiketler| Çoklu seçim      | Araca uygulanan etiketlere göre filtrele                                    |

Tüm filtreler VE ile birleştirilir. Filtre etiketleri tablonun üstünde görünür; URL ilerledikçe güncellenir.

## Sütunlar

| Sütun           | Sıralanabilir mi? | İçerik                                                                                   |
| --------------- | ----------------- | ----------------------------------------------------------------------------------------- |
| **Sağlık**      | —                 | Kompakt IoT sağlık göstergeleri (çevre) — IoT alt sistemlerinin durumunu özetleyen küçük simgeler |
| **Kod**         | ✓                 | Araç etiketi (etiketteki okunabilir kod), araç detay sayfasına bağlantı ile               |
| **Durum**       | ✓                 | Durum etiketi (Mevcut, Kullanımda, Şarjda, vb. — aşağıdaki referansa bakınız)             |
| **Model**       | —                 | Model adı ve küçük resim (örneğin Xiaomi M365)                                           |
| **Kilit**       | —                 | Kilit simgesi — kapalı (kilitli) / açık (kilitsiz) en son IoT raporuna göre                |
| **Batarya**     | ✓                 | Batarya yüzdesi renkli çubukla (yeşil ≥ %60, sarı %30–60, kırmızı < %30)                  |
| **Etiketler**   | —                 | Bu araca uygulanan etiketler (operatörler düzenleyebilir)                                |
| **Bölge**       | —                 | Araç şu anda içinde bulunduğu bölge veya "Bölge dışında"                                |
| **Son sürüş**   | ✓                 | Araç en son ne zaman sürüş için kilidi açıldı tarih/saat                                |
| **Son sinyal**  | ✓                 | IoT cihazının en son ne zaman rapor verdiği (eski sinyal = cihaz muhtemelen çevrimdışı)  |

Sıralanabilir sütunlar ✓ ile işaretlenmiştir — başlığa tıklayın. Sıralama URL'de yansıtılır.

## Durum referansı

Her araç tam olarak bir durumda olur. Durum davranışı belirler (sürücülerin kiralayıp kiralayamayacağı, IoT uyarılarının tetiklenip tetiklenmeyeceği vb.):

| Durum                   | Anlamı                                                |
| ----------------------- | ----------------------------------------------------- |
| **Mevcut**              | Boşta, kiralanabilir, doğru park edilmiş               |
| **Kullanımda**          | Şu anda sürüşte                                      |
| **Şarjda**              | Şarj istasyonunda                                    |
| **Boşaltıldı**          | Batarya kiralamaya uygun değil                        |
| **İnceleme Gerekiyor**  | Sistem veya operatör tarafından işaretlendi — manuel inceleme gerekli |
| **Bakım**               | Atölyede / onarım için filo dışında                   |
| **Hazır Değil**         | Oluşturuldu ama sürücülere henüz açılmadı             |
| **Rezerve Edildi**      | Belirli bir sürücü/rezervasyon için tutuluyor         |
| **Taşıma**              | Taşınıyor (dengeleme, sahadan alma)                   |
| **Depolama**            | Uzun süreli depolamada, operasyon dışında              |
| **Çalındı**             | Çalındı olarak bildirildi / kayıp                      |
| **Uyarı**               | IoT veya sistemden kritik uyarı                        |

## Satır eylemleri

Her satırın en sağında bir **üç nokta menüsü** vardır. Mevcut eylemler izinlerinize bağlıdır:

| Eylem                  | İzin                 | Ne yapar                                                           |
| ----------------------- | --------------------- | ------------------------------------------------------------------ |
| **Detayları görüntüle** | —                     | [araç detay sayfasını](vehicle-detail.md) açar                     |
| **Rota geçmişini görüntüle** | `coordinates-history` | Aracın son GPS izini tekrar oynatan harita görünümünü açar          |
| **Google Haritalar'da aç** | —                     | Aracın son bilinen koordinatlarını Google Haritalar'da açar (yeni sekme) |
| **Düzenle**             | `edit`                | Düzenleme formunu açar                                             |
| **Durumu değiştir**     | `edit`                | Listeden ayrılmadan durumu değiştirmek için küçük bir iletişim kutusu açar |
| **Sil**                 | `delete`              | Aracı yumuşak siler (onay iletişim kutusuyla)                      |

İzinleriniz olmayan eylemler gizlenir.

## Toplu işlemler

Her satırın solundaki onay kutularını kullanarak bir veya daha fazla araç seçin. Seçilen sayıyı ve eylemleri gösteren bir **toplu işlem çubuğu** üstte görünür:

| Toplu işlem         | İzin          | Ne yapar                                                        |
| ------------------- | ------------- | -------------------------------------------------------------- |
| **Durumu değiştir** | `bulk-update` | Seçilen tüm araçlara tek bir durumu uygulamak için iletişim kutusu açar |
| **Etiketleri değiştir** | `bulk-update` | Seçim üzerindeki etiketleri ekler veya kaldırır                 |
| **Ayarları değiştir** | `bulk-update` | Seçilen tüm araçlara araç ayarlarını uygular (ör. azami hız, alarmlar) |
| **Komut gönder**    | `iot-command` | Seçilen tüm araçlara IoT komutu gönderir (kilitle, kilidi aç, alarm aç/kapa, yeniden başlat) |
| **Toplu QR**        | —             | Seçilen araçlar için yazdırılabilir QR kod sayfası oluşturur    |
| **Seçilenleri sil** | `delete`      | Seçilen her aracı yumuşak siler (onay iletişim kutusuyla)       |

## Sayfa eylemleri (sağ üst)

- **+ Oluştur** — [Araç oluşturma formunu](vehicle-create-edit.md) açar (ayrı makale)
- **Dışa Aktar** — mevcut filtrelenmiş listeyi dosya olarak indirir (filtreler ve sıralama korunur)
- **Toplu QR** (toplu işlem olarak da mevcut) — yazdırılabilir kodlar oluşturmak için QR toplu sihirbazını açar

## Harita görünümü

Harita görünümüne geçince:

- Araçlar durumlarına göre renklendirilmiş **pinler** olarak görünür (yeşil = Mevcut, mavi = Kullanımda, vb.)
- Her pinin yanında küçük bir **pil rozeti** bulunur
- Bir pine tıklayınca aracın etiketi, durumu, pili ve _Detayları görüntüle_ bağlantısı içeren bir açılır pencere açılır
- **Filtreler hâlâ geçerli** — duruma, etiketlere göre daraltın, harita güncellenir
- Fare veya iki parmak hareketleriyle kaydırma / yakınlaştırma yapabilirsiniz

Harita, tabloyla aynı verilerle beslenir — farklı bir veri kümesi değil, farklı bir görünüm.

## Tipik iş akışları

- **Toplu dengeleme** — `Durum = Boşaltıldı` + bölgeye göre filtreleyin, hepsini seçin, _Komut gönder → Kilitle_ (veya _Durumu değiştir → Taşıma_) alımdan önce
- **Sıkışmış aracı bulun** — _Son sinyal_e göre artan sıralayın, en eski sinyaller en üstte görünür
- **Düşük pilleri sorun olmadan önce tespit edin** — _Pil_ e göre artan sıralayın; filonun altı yakın gelecekteki bakım kuyruğunuzdur
- **Bir etiketi denetleyin** — etikete göre filtreleyin ve satırları inceleyin
- **Saha personeli hazırlığı** — günün hedeflerine filtreleyin, yeni birimler için etiketleri yazdırmak üzere _Toplu QR_ kullanın

## İpuçları

- **Arama gecikmeli çalışır** — sunucunun yanıt vermesi için yazmayı durdurun
- **URL = görünüm** — filtrelenmiş bağlantıları kopyalayıp meslektaşlarınızla paylaşın
- **Sağlık sütunu bir bakışta** — küçük simgeler IoT alt sistemlerini özetler; herhangi bir simgenin üzerine gelerek neyi temsil ettiğini görün (ör. hücresel sinyal, kilit durumu, sensör okuması)
- **Pil rengi sizin kısaltmanızdır** — listede kırmızı çubuk = yakında şarj veya alım gerekir
- **Kilit göstergesi en son IoT raporudur** — birkaç saniye gecikmeli olabilir; cihazdaki durumu kesinleştirmek için _Komut gönder → Kilitle_ kullanın
