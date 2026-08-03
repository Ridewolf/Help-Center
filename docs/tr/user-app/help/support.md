# Rider App — Destek, SSS ve Canlı Sohbet

Destek (`/support`), bir sürücünün yardım almak için gittiği yerdir. İki sekmesi vardır — **SSS** ve **İletişim** — ve canlı sohbet kendi ekranında açılır (`/support/messenger`).

Destek hakkında destekle ilgili herhangi bir soruyu yanıtlamadan önce bilmeniz gereken iki şey:

- **Her iletişim kanalı sizin tarafınızdan yapılandırılır.** Uygulamada global bir Ridewolf destek e-postası, telefon numarası veya çalışma saatleri yoktur — asla bunları belirtmeyin.
- **Uygulamada bilet formu değil, sohbet vardır.** Sürücüler bilet numarası almaz. Ekibinizin aynı konuşmaları görme şekli [Konuşmalar](../../support/tickets-proofs-chat/conversations.md); [Biletler](../../support/tickets-proofs-chat/tickets.md) ise operatör tarafı kavramıdır.

## SSS sekmesi

Yayınladığınız soru-cevap içeriğinden oluşturulan akordeon bölümleri ve ayrıca **Sürüş Rehberi** öğeleri, **Başlamadan Önce** ve **Bitirmeden Önce** gruplarına ayrılmıştır.

Bunun tamamını bir uygulama sürümü yayınlamadan kontrol edersiniz:

- Sorular ve cevaplar — [SSS Setleri](../../settings/content/faq-sets.md)
- Sürüş Rehberi adımları — [Hızlı Kılavuzlar](../../settings/content/quick-guides.md)

Bireysel SSS öğeleri **derin bağlantı verilebilir**: belirli bir öğeye bağlantı, Destek'i o öğe zaten genişletilmiş ve görünür halde açar. Bu, sürücüyü "SSS'ye bak" demek yerine doğrudan bir cevaba yönlendirmenin doğru yoludur.

## İletişim sekmesi

Buradaki her kanal yalnızca [Şirketim → Uygulama → destek kanalları](../../settings/administration/my-company.md) altında etkinleştirdiğinizde görünür.

| Kanal         | Ne işe yarar                                                        |
| ------------- | ------------------------------------------------------------------- |
| **Canlı Sohbet** | Messenger'ı açar (`/support/messenger`)                          |
| **E-posta**     | Sürücünün posta uygulamasını sizin adresinizle açar                |
| **Web Sitesi**  | Yapılandırdığınız URL'yi uygulama içi tarayıcıda açar               |
| **Telegram**    | Telegram iletişim bilgilerinizi harici olarak açar                 |
| **WhatsApp**    | WhatsApp iletişim bilgilerinizi harici olarak açar                 |
| **Telefon**     | Yapılandırdığınız numaraya arama başlatır                          |

**Hiçbiri** etkin değilse, sekme iletişim yok illüstrasyonu gösterir. "Destek ile iletişim kurmanın yolu yok" diyen bir sürücü neredeyse her zaman tüm kanalları kapalı olan bir şirkettedir — başka yere bakmadan önce kendi yapılandırmanızı kontrol edin.

## Canlı sohbet

Messenger konuşma tabanlıdır:

- Sürücü, durumu, atanan operatörü, son mesajı ve zamanını ve okunmamış sayısını gösteren **konuşma listesini** görür.
- **Yeni Sohbet** yalnızca sürücünün açık bir konuşması yoksa sunulur. Açık bir sohbeti olan sürücü ikinci bir sohbet başlatamaz — tasarım gereği. Mevcut sohbeti sürdürür.
- Bir konuşma açıldığında mesaj geçmişi yüklenir, 50 mesajlık partiler halinde, sürücü yukarı kaydırdıkça eski mesajlar getirilir.

| Konuşma durumu  | Anlamı                              |
| ---------------- | ------------------------------------ |
| **Yeni**         | Yeni açıldı, henüz alınmadı          |
| **Beklemede**    | Ekibinizin yanıtı bekleniyor          |
| **Aktif**        | İşlemde                            |
| **Gecikmeli**    | Ertelenmiş                         |
| **Kapalı**       | Bir operatör tarafından kapatıldı    |

**Uygulamanın gösterdiği mesaj türleri:** metin, görsel, dosya, konum, iletişim, sürüş, uygulama bağlantısı ve sistem mesajları.

**Mesaj durum simgeleri:** gönderiliyor, gönderildi, teslim edildi, okundu ve başarısız.

### Mesaj gönderme

Bir sürücü şunları ekleyebilir:

- Mesaj başına **en fazla 5 görsel**
- Bir **konum işareti** (enlem, boylam ve etiket)
- Bir **dosya**

Gönderilen mesaj hemen _gönderiliyor_ olarak görünür, ardından sunucu onayladıkça gerçek durumuna güncellenir. Aynı canlı bağlantı yeni mesaj ve okundu güncellemelerini, konuşma kapandı ve atandı bildirimlerini ve "_{name} yazıyor…_" göstergesini sağlar.

Bağlantı kesildikten sonra uygulama konuşma listesini ve açık sohbeti yeniden yükler, mesajları çoğaltmadan — böylece çevrimdışı kalan sürücü aynı mesajı iki kez görmez.

Bir operatör konuşmayı **kapattığında**, sürücünün girişi devre dışı bırakılır ve yerine "konuşma kapandı" bildirimi gösterilir.

## Sorun Giderme

| Sürücü der ki…                          | Anlamı                                                                                                      |
| ---------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| "İletişim seçenekleri yok"               | Şirketiniz için hiçbir kanal etkin değil — [Şirketim](../../settings/administration/my-company.md) altında düzeltin  |
| "Yeni Sohbet butonu yok"                  | Sürücünün zaten açık bir konuşması var; o sohbeti sürdürmeli                                               |
| "Artık yazamıyorum"                      | Bir operatör konuşmayı kapattı. Açık sohbet kalmayınca yeni başlatılabilir                                   |
| "Mesajım başarısız görünüyor"            | Mesaj cihazdan hiç çıkmadı — tekrar deneyin                                                                 |
| "Bağlantı sonrası mesajlar çoğaldı"      | Çoğalmadı; yeniden yükleme çoğaltmayı önler. Israr ederlerse ekran görüntüsü isteyin                          |
| "Ne kadar hızlı yanıt verirsiniz?"       | Uygulamada yanıt süresi tanımlı değil. **Söz vermeyin** — kendi yayınlanmış hizmet taahhüdünüzü belirtin       |
| "Acil durumu nereden bildiririm?"        | Etkinleştirdiğiniz kanallardan bildirin. Uygulamada acil durum hattı yoktur ve acil durum numarası verilmemelidir |

## İpuçları

- **İletişim sekmenizi denetleyin.** Şirketim'de herhangi bir değişiklikten sonra Rider App'i kendiniz açın — tamamen boş bir İletişim sekmesi sizin için görünmezdir ve sürücüleri sinirlendirir.
- **SSS cevaplarını sohbet yanıtlarında derin bağlantı olarak kullanın, yeniden yazmayın.** Bu, sürücülere cevabın nerede olduğunu öğretir.
- **Aynı anda sadece bir açık konuşma** kuraldır. Sürücü ilgisiz bir konuyu gündeme getirmek istediğinde, önce eski sohbeti kapatın.
- **SSS Setlerini ve Hızlı Kılavuzları güncel tutun** — cevapladıkları her soru, sizin yapmadığınız bir sohbet demektir.
- **Bir konuşmayı kapatmak, sürücünün yanıt verme yeteneğini sonlandırır.** Kapatmadan önce cevabın eksiksiz olduğundan emin olun.
