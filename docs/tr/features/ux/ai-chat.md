# AI Sohbet

Gösterge Paneli, ürünü anlayan, üzerinde bulunduğunuz ekranlardan canlı veri okuyabilen ve — izninizle — sizin adınıza işlem yapabilen bir **AI asistanı** ile birlikte gelir. Ona yanınızda oturan bir takım arkadaşı gibi davranın: bir soru sorun, bir şey yapmasını isteyin veya baktığınız şeyi açıklamasını isteyin.

## Paneli açma

Üst çubuktaki **parıltı simgesine** (✨) tıklayın. Sohbet, sağda yan panel olarak açılır.

- İkon üzerinde küçük bir `*` yıldız rozeti yanıyorsa, AI paneli en son gördüğünüzden beri yeni bir yanıt üretmiştir.
- Panel ayrıca çoğu sayfada `⌘ + K` / `Ctrl + K` ile açılır (kısayol tanımlıysa).

## Neler yapabilir

Gücü artan beş yetenek kategorisi:

| Yetenek           | Örnekler                                                                    |
| ------------------ | ---------------------------------------------------------------------------- |
| **Açıklama yap**   | "Bu durum ne anlama geliyor?", "Nasıl tarif oluştururum?"                  |
| **Bilgi arama**   | "Bölge A'da kaç aktif araç var?", "Dünkü başarısız ödemeleri göster"       |
| **Gezinme**       | "Bugüne filtrelenmiş sürüşler sayfasını aç", "RW-001 aracına git"           |
| **Form doldurma** | "'VIP' adlı yeni bir etiket oluştur, rengi kırmızı yap ve müşteri X'e uygula" |
| **Veri değiştirme**| "RW-001 aracını kilitle", "#12345 ödemesini iade et", "Bölge A'dakilere push gönder" |

AI, sizin sahip olduğunuz **aynı API'leri ve izinleri** kullanır. Bir işlemi manuel olarak yapamıyorsanız, AI da sizin adınıza yapamaz. Bu güvenlik sınırıdır — "AI süper kullanıcı" modu yoktur.

## Panel içinde

### Başlık

- **Parıltı + başlık** "AI Sohbet"
- **Temsilci adı rozeti** sağda (parlak yeşil kapsül) hangi temsilcinin aktif olduğunu gösterir — ayarları açmak ve temsilciler arasında geçiş yapmak için tıklayın
- **Bağlam rozeti** konuşmada mesajlar olduktan sonra açıklamanın altında görünür — AI'nın hafıza penceresinin ne kadar dolu olduğunu gösterir (örneğin "12 mesaj · %35 bağlam")

### Canlı işlem balonu

AI çok adımlı bir işlem yaparken (veri arama, sayfa açma, araç çağırma) her adımı gerçek zamanlı gösteren **canlı durum balonu** görünür:

- _Araçlar aranıyor…_
- _/vehicles açılıyor…_
- _Form dolduruluyor: Durum = Aktif…_
- _Gönderiliyor…_

Ne olduğunu gerçekleşirken okuyabilir ve yanlış gidiyorsa erken durdurabilirsiniz.

### Konuşma

Konuşma bir sohbet gibi akar: kullanıcı mesajları sağda, AI yanıtları solda, markdown olarak (listeler, tablolar, kod, bağlantılar çalışır). Araç işlemleri genişletilerek tam argümanlar ve yanıtlar görülebilir — yapılan işlemi doğrulamak için faydalıdır.

### Girdi

- **Mesaj yazın** ve göndermek için `Enter` tuşuna basın; yeni satır için `Shift + Enter`
- Girdi yazdıkça büyür
- Dosya / yapıştırılmış görseller mevcut sohbette desteklenmez

## Değişiklikleri onaylama

Yıkıcı olabilecek işlemler (silme, iade, durum değiştirme, toplu işlemler) için AI hemen çalıştırmak yerine **satır içi onay** gösterir:

- Olacakların özeti ("#12345 ödemesini iade et — John Doe'ya 42,50 $")
- **Onayla** / **İptal** düğmeleri
- Onaylayana kadar hiçbir şey yapılmaz

Özeti dikkatle okuyun — bu, AI'nın anlayışı ile verileriniz arasındaki tek güvenlik kontrolüdür.

## Ayarlar

Başlıktaki **temsilci adı rozetine** tıklayarak ayarları açın:

- **Temsilci seçimi** — temsilci kişiliğini seçin (farklı temsilciler farklı görevler için ayarlanmıştır: filo, destek, analitik)
- **Model** — temel LLM'yi seçin (birden fazla varsa)
- **İzin verilen araçlar** — araçları seçici olarak devre dışı bırakın (örneğin sadece Soru-Cevap için değişiklikleri engelleyin)
- **Konuşma geçmişi** — temizle, dışa aktar

## Bağlam penceresi

AI'nın mevcut konuşmanın sınırlı bir hafızası vardır. Sohbet ederken bağlam dolar; başlık rozeti olarak yüzde halinde görürsünüz.

- **%70'in altında** — bolca yer var
- **%70–90 arası** — dolmaya başladı; alakasız bir konu için yeni konuşma başlatmayı düşünün
- **%90'ın üzerinde** — eski mesajlar özetlenebilir; AI erken detayları unutabilir

Yeni bir görev için taze bir konuşma başlatmak ucuzdur ve AI'nın keskin kalmasını sağlar.

## İpuçları

- **Spesifik olun** — "RW-001'i kilitle" "bahsettiğimiz scooter'ı kilitle"den iyidir
- **Değişiklikleri onaylamadan önce doğrulayın** — onay kartındaki özeti okuyun. AI bazen istemediğiniz bir varlığı çıkarır
- **Her sayfada "burada neler yapabilirsin?" diye sorun** — AI mevcut ekranla ilgili araçları bilir
- **Tanımadığınız verileri açıklamak için kullanın** — bir durum kodu veya ekran etiketi yapıştırın ve "bu ne anlama geliyor?" diye sorun
- **İzinler hala geçerlidir** — AI "bunu yapamam" diyorsa, genellikle izin eksikliğidir, özellik eksikliği değil
- **Hassas veriler** — sohbeti bir takım arkadaşınızın ekranı gibi görün. Şifre, ödeme kartı numarası veya kaydedilmesini istemediğiniz verileri yapıştırmayın
- **Bağlantı kesilmeleri** — AI işlem ortasında durursa, son canlı işlem balonunu bulmak için yukarı kaydırın; tam olarak nerede durduğunu gösterir
