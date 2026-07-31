# Tablolar ve Filtreler

Gösterge Paneli'ndeki hemen hemen her liste sayfası (Araçlar, Sürüşler, Müşteriler, Ödemeler, Destek Biletleri, Park Kanıtları, Konuşmalar, Analitik, Operatörler vb.) aynı yapıyı paylaşır. Deseni öğrendiğinizde, her liste sayfası aynı şekilde çalışır.

## Bir liste sayfasının yapısı

Yukarıdan aşağıya:

1. **Sayfa başlığı** — başlık, sayfa düzeyinde eylemler (ör. _Oluştur_, _Dışa Aktar_)
2. **Arama çubuğu** — birden çok alanda tam metin araması
3. **Filtre satırı** — sonuçları daraltmak için açılır menüler ve etiketler
4. **Aktif filtre etiketleri** — şu anda uygulanan filtreleri gösteren kaldırılabilir etiketler
5. **Toplu işlem çubuğu** — bir veya daha fazla satır seçildiğinde görünür
6. **Tablo** — sıralanabilir sütunlar, sağda satır eylemleri
7. **Sayfalama** — sağ alt köşe

## Arama

Arama çubuğu, o sayfa için en alakalı alanlarda arama yapar (ör. etiket, ID, sahip adı).

- **Aramak için yazın** — yazdıkça sonuçlar filtrelenir, sunucuyu spam yapmamanız için kısa bir gecikme vardır
- **Temizle** — girişteki × işaretine tıklayın veya `Esc` tuşuna basın
- Arama, sadece mevcut sayfa değil, tüm veri kümesi üzerinde **sunucu tarafında** çalışır

## Filtreler

Filtreler, metin araması olmadan sonuç kümesini daraltır. Her filtre bir açılır menüdür (alan türüne bağlı olarak tek veya çoklu seçim).

- **Değişiklikte uygula** — filtreler anında uygulanır, Uygula düğmesi yoktur
- **Birden çok filtre AND ile birleşir** — ekledikçe sonuçlar daha da daralır
- **Aktif filtre etiketleri** tablonun üstünde görünür; bir etiketteki × işaretine tıklayarak sadece o filtre kaldırılır
- **Hepsini temizle** — çok sayıda filtre uygulandığında, etiketlerin yanında bir _Hepsini Temizle_ düğmesi gösterilir

Yaygın filtre türleri:

| Tür          | Davranış                                                      |
| ------------ | ------------------------------------------------------------- |
| Durum        | Tek seçimli açılır menü                                        |
| Tür / Model  | Tek seçimli açılır menü                                        |
| Etiketler    | Açılır menü içinde çoklu seçim ve etiketler                   |
| Tarih aralığı| Takvim aracı (başlangıç / bitiş)                              |
| Sayı aralığı | Başlangıç / bitiş sayısal girişleri (ör. pil %0–30)           |
| ID ile arama | Ana aramadan ayrı, filtre etiketi içinde serbest metin arama  |

## Sıralama

- **Bir sütun başlığına tıklayın** — artan sırada sıralar
- **Tekrar tıklayın** — azalan sırada sıralar
- **Üçüncü kez tıklayın** — sıralamayı temizler (varsayılan düzene döner)
- Aktif sıralama olan sütun adının yanında bir **ok simgesi** (↑ / ↓) görünür

Her sütun sıralanabilir değildir. Sıralanabilir sütunlar başlıkta hafif bir fareyle üzerine gelme durumu gösterir; sıralanamaz olanlar göstermez.

## Sayfalama

Tablonun sağ alt köşesinde:

- **Sayfa numaraları** — bir numaraya tıklayarak atlayabilirsiniz
- **Önceki / Sonraki** okları kenarlarda
- **Sayfa boyutu seçici** — açılır menü (genellikle sayfa başına 10 / 20 / 50 / 100 satır)

Sayfalama sunucu tarafındadır. Filtreleriniz ve aramanız **tüm veri kümesine** uygulanır, sadece baktığınız sayfaya değil — filtrelenmiş sonuçların 3. sayfası da filtrelidir.

## Satır eylemleri

Her satırın en sağında bir **üç nokta menüsü** vardır. Menü, satır düzeyinde eylemler içeren bir açılır menü açar:

- **Görüntüle** — detay sayfasını açar
- **Düzenle** — düzenleme formunu açar
- **Sil** — kaydı kaldırır (onay iletişim kutusuyla)
- **Sayfaya özel eylemler** — örn. müşterilerde _Push gönder_, araçlarda _Kilidi aç_, ödemelerde _İade et_, biletlerde _Ata_

Gördüğünüz eylemler **izinlerinize** bağlıdır — izin verilmemiş eylemler gizlenir.

## Çoklu seçim ve toplu işlemler

Destekleyen sayfalarda (Müşteriler, Araçlar vb.):

1. **Satırları seçin** — her satırın solundaki onay kutusuna tıklayın
2. **Bu sayfadaki tümünü seçin** — sütun başlığındaki onay kutusuna tıklayın
3. Seçilen sayıyı ve mevcut toplu işlemleri gösteren bir **toplu işlem çubuğu** üstte görünür
4. **Bir işlem seçin** — seçilen tüm satırlara uygulanır
5. **Seçimi temizle** — toplu işlem çubuğundaki × işaretine tıklayın veya başlıktaki onay kutusunun işaretini kaldırın

Yaygın toplu işlemler:

- Etiket ekle veya kaldır
- Push bildirimi gönder
- Ceza uygulama veya bakiye yükleme (müşteriler için)
- Durum değişikliği

## Boş ve yüklenme durumları

- **Yükleniyor** — veri yüklenirken kısa süreli iskelet satırlar görünür
- **Sonuç yok** — filtreler aktifken _Filtreleri temizle_ düğmeli dostça bir yer tutucu ("Eşleşen sonuç yok")
- **Ağ hatası** — _Tekrar Dene_ düğmeli hata durumu (en çok dalgalı bağlantıda görülür)

## İpuçları

- **Gecikmeyi bekleyin** — arama yazdıktan sonra tıklamadan önce kısa bir an bekleyin — sunucu yazmayı bıraktığınızda bir kez tetiklenir
- **Filtrelenmiş görünümleri paylaşın** — arama, filtreler, sıralama ve sayfa URL'de yansıtılır. URL'yi kopyalayıp bir ekip arkadaşınıza gönderin; tam olarak aynı görünümü görürler
- **Tarayıcı geri/ileri** beklenildiği gibi çalışır — filtre değişikliklerinizde geriye doğru gider
- **Arama + filtreleri birleştirin** — arama, filtrelerin üstünde serbest metin katmanıdır. Durum/tür ile filtreleyin, sonra o alt kümede isimle arama yapın
- **Sayfa boyutunu 100 yapın** çok sayıda kaydı görsel olarak taramak istediğinizde sayfalar arasında tıklamak yerine
- **İzinler sessiz filtredir** — bir ekip arkadaşınız sizin göremediğiniz satırları görüyorsa, bu neredeyse her zaman izin farkıdır, hata değil
