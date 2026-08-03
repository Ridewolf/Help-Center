# Hata Kayıtları

Hata Kayıtları (`/error-logs`), gösterge paneli ve sürücü mobil uygulaması tarafından bildirilen hataları listeleyen **dahili bir tanılama aracıdır** — JavaScript istisnaları ve başarısız API çağrıları — yığın izleri, istek bağlamı ve mevcutsa bir ekran görüntüsü ile kullanıcının konum haritası dahil.

Birisi _"uygulama çöktü"_ veya _"bir şeyler yanlış gitti dedi"_ şeklinde rapor verdiğinde ve arkasındaki gerçek hatayı bilmeniz gerektiğinde kullanın.

## Nerede bulunur

- `/error-logs` — liste
- `/error-logs/:id` — tek bir hata

**Yan menü girişi yoktur**. Doğrudan URL'yi yazarak erişirsiniz — bu, normal operatör gezinmesinin bir parçası olmayan mühendisler ve yöneticiler için bir tanılama aracıdır (örneğin [Quest Confirmations](../../support/tickets-proofs-chat/quest-confirmations.md) gibi, listelenmeyen bir yüzeydir).

**Erişim:** sayfa, ortamınız için yapılandırılmış bir hata raporlama API anahtarı ve normal oturum açma bilgilerinizi gerektirir. Sayfa hiçbir şey döndürmüyorsa, o ortam için anahtarın eksik olup olmadığını kontrol edin — yöneticinize danışın.

## Liste görünümü

- Sayfa 1'den başlayan, sayfa başına 100 satır içeren sayfalı liste; sayfa boyutunu oradan kontrol eden sayfalayıcı.
- Bir **kaynak** açılır menüsü, hatanın geldiği yeri filtreler: **gösterge paneli** veya **uygulama**.
- Başlıkta bir **yenile** kontrolü bulunur. Otomatik yenileme **varsayılan olarak kapalıdır**; 10 saniye, 1 / 5 / 15 / 30 dakika aralıklarından birini seçebilirsiniz. Sekme gizliyken anket duraklar ve geri döndüğünüzde yakalar, böylece arka plandaki sekme sürekli anket yapmaz.

Kaynak ile sayfa/sınır, tek filtrelerdir — kullanıcı, e-posta veya zaman aralığına göre filtre yoktur.

## Rozeti okuma

Her satır, sizin için en **hızlı üçleme sinyalini** taşıyan bir rozet içerir:

- Bir **sayı** (HTTP durumu) → satır bir **başarısız API çağrısıdır**; sorun arka uçta veya istekte olabilir.
- Bir **kelime** → satır istemci tarafındadır; tür, mesaj metninden tahmin edilir: **Runtime** (TypeError / ReferenceError / SyntaxError), **Auth** (oturum açma), **Network** (ağ, fetch, zaman aşımı), **Cancelled** veya genel **Error**.

Kelime rozetlerini, raporlayanın gönderdiği bir sınıflandırma değil, mesaj dizisi üzerinde kaba bir kestirim olarak değerlendirin.

## Detay görünümü

Tek hata sayfası şunları gösterir:

- hata meta verileri ve **yığın izi**
- hatanın gerçekleştiği **URL** ve **kullanıcı aracısı** (tarayıcı, işletim sistemi, cihaz, donanım ve ekran bilgisi olarak ayrıştırılmış)
- rapora eklenmişse satır içi bir **ekran görüntüsü**
- geçerli koordinatlar yakalandıysa kırmızı işaretli bir **mini harita** — bu, bölge sınırı veya kötü GPS düzeltmesi gibi konuma özgü hataları görünür kılar

Zaman damgaları, geçen zaman formatında gösterilir.

## Alan referansı

- **id** — hata tanımlayıcısı
- **source** — `dashboard` veya `app`
- **message** / **stack** — hata ve yığın izi
- **url** — hatanın gerçekleştiği sayfa veya uç nokta
- **userAgent** — ham kullanıcı aracısı; cihaz bilgisi için ayrıştırılır ve harita koordinatları buradan gelir
- **metadata** — yapılandırılmış bağlam: API hataları için istek (yöntem, uç nokta, gövde) ve yanıt (durum, gövde); rapor bir kullanıcıyı tanımladıysa kullanıcı kimliği / e-posta / rol; gösterge paneli ve uygulama sürümleri, çalışma zamanı, platform; ekran görüntüsü; ve hata bir soketten geldiyse WebSocket bağlamı (kapatma kodu / nedeni, yeniden bağlanma denemesi)
- **clientTimestamp** — cihaz saatinden alınır, bu nedenle yanlış olabilir
- **createdAt** — sunucu zaman damgası; **sıralama için güvenilir olan**

Her rapor bir kullanıcıyı tanımlamaz — e-posta boş olabilir.

## Yaygın sorular

- **Sayfa boş veya yetkisiz.** Hata raporlama anahtarının bu ortam için yapılandırıldığını ve oturum açtığınızı kontrol edin. Yöneticinize danışın.
- **Menüde bulamıyorum.** Navigasyon girişi yoktur — doğrudan `/error-logs` adresine gidin.
- **Ekran görüntüsü gösterilmiyor.** O rapor bir ekran görüntüsü içermemiştir; her hata ekran görüntüsü taşımaz.
- **Harita gösterilmiyor.** O rapor için geçerli koordinatlar yakalanmamıştır.
- **Zaman damgaları uyuşmuyor.** `createdAt` (sunucu) ile `clientTimestamp` (cihaz saati) karşılaştırın — cihaz saatinin kayması farkı açıklar.
- **Bir kullanıcının hatalarına ihtiyacım var.** Kullanıcı veya e-posta filtresi yoktur; kaynağa göre filtreleyin ve listeyi sayfalarla gezin.
- **Liste güncel değil gibi görünüyor.** Otomatik yenileme varsayılan olarak kapalıdır — yenileme kontrolünden bir aralık seçin ve sekme arka planda iken anketin durakladığını unutmayın.
- **Bir rozet "Runtime" diyor ama durum kodu bekliyordum.** O satırda istek/yanıt bağlamı yoktu, bu yüzden rozet mesaj metninden tür tahmini yaptı.
