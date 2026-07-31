# Araç Sayfası — Kontroller, Biletler, Arızalar ve Uyarılar

Araç sayfası (`/vehicle/:id`), saha operatörünün tek bir araç için çalışma alanıdır: üstte canlı telemetri, ortada eylem düğmeleri ve temizlenmesi gereken üç kuyruk. Buraya [filo haritasındaki](fleet-map.md) bir işaretçiye veya liste satırına dokunarak, bir QR kodu tarayarak veya [toplu modda](../operations/batch-mode.md) bir satıra dokunarak gelirsiniz.

## Sayfa hangi araç türü için ne gösterir

Sayfa açıldığında önce aracı, sonra modelini yükler:

- **Scooterlar ve bisikletler** burada açıklanan tam kontrol sayfasını alır.
- **Arabalar** ise uzaktan kontrol içermeyen sadece durum sayfası alır.

Model bilgisi yüklenemezse sayfa yine açılır — sizi bir yükleme simgesiyle bırakmak yerine scooter düzenine geri döner. Araç kendisi yüklenemezse, geri düğmeli bir hata ekranı alırsınız.

## Sekmeler

Kaydırmalı göstergeye sahip dört sekme:

| Sekme       | İçerik                                          |
| ----------- | ----------------------------------------------- |
| **Scooter** | Canlı telemetri ve eylem düğmeleri              |
| **Biletler**| Sürücülerin bildirdiği açık destek biletleri    |
| **Arızalar**| İzleyicinin bildirdiği hatalar                   |
| **Uyarılar**| İzleyicinin bildirdiği uyarılar                  |

## Scooter sekmesi — telemetri

Üstte bir kilit rozeti (**yeşil** = kilitli, **amber** = kilitsiz) ve araç durum rozeti bulunur, ardından şu satırlar gelir:

| Satır               | Okuma şekli                                                                                 |
| ------------------- | ------------------------------------------------------------------------------------------- |
| **QR / etiket**     | Araç üzerindeki etiketteki kod                                                              |
| **Ağ**              | Çevrimiçi ise 36 üzerinden mobil sinyal kalitesi, çevrimdışı ise son sinyalden geçen süre  |
| **Batarya**         | Araç batarya yüzdesi — %10 ve altı kırmızı, %20 ve altı turuncu, %40 ve altı amber, %40 üstü yeşil |
| **İzleyici voltajı**| İzleyicinin kendi bataryası, iki ondalık basamaklı voltaj — 3.6 V altında kırmızı, 3.6 V ve üstü yeşil |
| **GPS**             | **Fix** veya **No Fix**                                                                     |

**İzleyici voltajı**, operatörlerin en sık yanlış okuduğu değerdir. Bu, aracın değil izleyicinin bataryasıdır: oradaki kırmızı okuma, ana batarya tamamen sağlıklı görünse bile izleyicinin kapanmak üzere olduğu anlamına gelir. Bu araçları tamamen rapor vermeyi bırakmadan önce toplama için işaretleyin.

## Scooter sekmesi — beş eylem düğmesi

Her eylem gönderilmeden önce onay ister ve gönderildiğinde size dokunsal bir titreşim verir.

### 1. Durum

Dokuz durumu içeren, her biri bir simge ve kısa açıklama ile gösterilen ve geçerli durumda onay işareti bulunan bir sayfa açar:

- Mevcut
- Boşaltıldı
- Şarj Ediliyor
- İnceleme Gerekiyor
- Bakım
- Hazır Değil
- Taşıma
- Depolama
- Çalındı

**Şarj Ediliyor** seçildiğinde tam [batarya değişimi](../operations/battery-swap.md) dizisi de çalışır — aracın kilidinin açılması, beklemesi ve yeniden kilitlenmesi beklenir. Sadece bir etiket değişikliği değildir.

### 2. Sürüş Modu (kilitle / kilit aç)

- **Kilit açma** komutunu gönderir, hız sınırını 25 km/s'ye yükseltir, motoru açar ve sürüş takibini başlatır.
- **Kilitleme** takibi durdurur, motoru kapatır, 6 km/s park hızı sınırını geri getirir ve aracı kilitler.

Kilitleme rozeti yeşile dönene kadar yanınızdan ayrılmayın.

### 3. Bip

Tek bir konum bulma bip sesi çıkarır, başarı veya hata bildirimi verir. Görünmeyen ama yakındaki bir aracı bulmak için kullanın — veya rehberli arama için [Scooter Bul](../operations/finder.md) kullanın.

### 4. Batarya Değişimi

Zamanlı değişim dizisini başlatır ve düğme üzerinde geri sayımı gösterir. Tam akış için [Batarya değişimi](../operations/battery-swap.md) sayfasına bakın.

### 5. Komutlar

O aracın izleyicisi tarafından desteklenen komutların kategorilere ayrılmış bir listesini açar. Bazı komutlar gönderilmeden önce sizin yazdığınız bir değer ister.

## Biletler sekmesi

Bu araca karşı sürücüler tarafından açılmış açık destek biletlerini listeler. Her satır şunları gösterir:

- Elektrik sorunu için bir yıldırım simgesi veya diğer durumlar için bir anahtar simgesi
- Mor bir durum rozeti
- Açıklama, iki satırla sınırlandırılmış
- Şikayet türü
- Oluşturulma süresi

Kritik ve yüksek öncelikli satırlar ayrıca kırmızı öncelik rozeti taşır — önce onları yapın.

Bir satıra dokunmak, filo haritasının bilet çekmecesinde kullanılan aynı modalde bileti açar.

**Tümünü Çöz** onay ister, sonra araçtaki tüm açık biletleri kapatır. Kapanan biletler listeden hemen kaybolur ve "X bilet(ler) çözüldü" veya bazıları kapatılamadıysa "X çözüldü, Y başarısız" mesajı alırsınız. Düğme kapatma işlemi sürerken ve açık bilet yokken devre dışıdır.

Sekme boşsa "Bu araç için açık bilet yok" yazar.

## Arızalar sekmesi

Arızalar, izleyicinin kendisinin bildirdiği hata olaylarıdır. Gürültü ve hata olmayan girdiler filtrelenir, en yeni arıza en üstte görünür.

- **Aktif arızalar** — henüz işlenmemiş ve alarm penceresi içinde olanlar — kırmızı kenarlık ve arka plana sahiptir.
- **İşlenmiş arızalar** griye döner ve **Çözüldü** rozeti kazanır.

Her satır arıza türü için bir simge (türün özel simgesi yoksa genel bir uyarı üçgeni), arıza başlığı ve ne kadar önce gerçekleştiğini gösterir.

**Hepsini Temizle** onay ister, ardından her aktif arızayı tek tek işler, aralarında kısa bir duraklama olur — uzun bir listeyi temizlemek anında olmaz, biraz zaman tanıyın. Liste ilerledikçe güncellenir ve işlenmemiş arıza kalmayınca araç uygulamanın alarm listesinden çıkar. "X arıza temizlendi" veya "X temizlendi, Y başarısız" mesajı alırsınız. Aktif arıza yoksa buton devre dışıdır.

Boş durum: "Kayıtlı arıza yok".

## Uyarılar sekmesi

Yapı olarak ve **Hepsini Temizle** davranışı olarak Arızalarla aynıdır, ancak hatalar yerine uyarılar içindir. Boş durum: "Kayıtlı uyarı yok".

Pratik ayrım:

- **Arızalar** — izleyicinin bildirdiği hatalar
- **Uyarılar** — izleyicinin bildirdiği uyarılar
- **Biletler** — sürücülerin yaptığı şikayetler

Üçü de ayrı kuyruklardır; birini temizlemek diğerlerini temizlemez.

## Yaygın sorunlar

| Belirti                                          | Anlamı                                                                           |
| ------------------------------------------------ | -------------------------------------------------------------------------------- |
| Bir eylem düğmesi hiçbir şey yapmıyor veya devre dışı | Başka bir eylem hâlâ devam ediyor — bildirimini bekleyin                         |
| Bir sekme boş                                    | Bu araç için gerçekten açık bir şey yok; bir hata boş durum yerine gösterilir   |
| Hiç uzaktan kumanda yok                          | Araç bir arabadır, sadece durum sayfası alır                                    |
| **Ağ** bir kesir yerine zaman gösteriyor          | İzleyici çevrimdışı ve son sinyalinden beri geçen süreyi görüyorsunuz            |
| **Hepsini Temizle** takılmış gibi görünüyor       | Arızaları tek tek işliyor; bitirmesine izin verin                                |
| Temizlenen bir arıza tekrar aktif oluyor          | İzleyici alarm penceresinde tekrar bildirdi — temel sorun hâlâ mevcut            |

## İpuçları

- **Kontrolü kullanmadan önce telemetriyi yukarıdan aşağıya inceleyin**: kilit rozeti, ağ, pil, izleyici voltajı, GPS size beş saniyede aracın çalışabilir mi yoksa alınacak mı olduğunu söyler.
- **Tümünü Çöz, araç başına geçerlidir**, bu yüzden biletlerde tanımlanan fiziksel sorunu giderdikten sonra güvenle kullanabilirsiniz.
- **Arızaları sadece onarımdan sonra temizleyin**, öncesinde değil — tekrar eden arıza faydalı kanıttır.
- **Kırmızı izleyici voltajı ve sağlıklı pil** klasik "araç haritadan kaybolmak üzere" işaretidir.
