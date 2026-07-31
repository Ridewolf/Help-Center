# Pil Değişimi — Adım Adım

Bir pil değişimi iki aşamalı bir dizidir: uygulama aracı ve pil bölmesini kilidini açar, paketi fiziksel olarak değiştirmek için size zamanlı bir pencere verir, ardından her şeyi tekrar kilitler. **Kapanış aşaması otomatik olarak tetiklenir** — bu, her operatörün ilk değişiminden önce bilmesi gereken kısımdır.

Bir değişimi, **Scooter** sekmesinde bulunan [araç sayfasından](../fleet/vehicle-controls.md) başlatırsınız.

## Değişimi başlatan şey

İki giriş yolu vardır ve ikisi de tamamen aynıdır:

- Scooter sekmesindeki **Pil Değişimi** düğmesi. Bu düğme bir yıldırım simgesi taşır ve kendi yüzeyinde canlı geri sayımı gösterir.
- Aracın durumunu **Durum** sayfasından **Şarj Ediliyor** olarak ayarlamak. Bu yol, durum değişikliği onayında aynı diziyi çalıştırır.

Her iki durumda da, herhangi bir işlem gönderilmeden önce bir onay iletişim kutusu görünür.

## Operatör akışı

1. Aracı açın ve **Scooter** sekmesinde kalın.
2. **Pil Değişimi** düğmesine dokunun veya durumu **Şarj Ediliyor** olarak ayarlayın.
3. İletişim kutusunda onaylayın.
4. Uygulama **Pil Değişimi Modu Açık** komutunu gönderir. Başarılı olursa "Pil Değişimi Modu Açık" bildirimi, bir dokunsal titreşim alırsınız ve araç kilitsiz olarak görünür.
5. **12 saniyelik bir geri sayım** hemen başlar ve düğme yüzeyinde saniyede bir azalır. Bu süre içinde pili değiştirin.
6. Geri sayım sıfıra ulaştığında uygulama otomatik olarak **Pil Değişimi Modu Kapalı** komutunu gönderir. Hiçbir şeye basmanız gerekmez.
7. Başarılı olursa ikinci bir dokunsal titreşim hissedersiniz — bu, ekranı görmeden kapanışı duyup hissetmeniz için kasıtlı bir çift onaydır — "Pil Değişimi Modu Kapalı" bildirimi görünür ve araç tekrar kilitli olarak gösterilir.

## Her aşamanın yaptığı şey

| Aşama                     | Araçta Ne Olur                                                                     |
| ------------------------- | --------------------------------------------------------------------------------- |
| **Pil Değişimi Modu Açık** | Araç kilidi açılır, hız limiti 25 km/s'ye yükselir, pil bölmesi açılır              |
| **Bekleme**               | 12 saniye — hiçbir komut gönderilmez, bu sizin çalışma pencereniz                 |
| **Pil Değişimi Modu Kapalı** | Pil bölmesi kilitlenir, hız limiti 6 km/s'ye geri döner, araç kilitlenir           |

Hız limitinde ne olduğuna dikkat edin: değişim süresi boyunca 6'dan 25 km/s'ye yükselir ve pencere kapanınca tekrar 6 km/s'ye döner. Hız limiti asla kaldırılmaz — 25 km/s araç kilitsizken servis yapılabilir tavan, 6 km/s ise park halindeki varsayılandır.

## Ne görürsünüz ve ne hissedersiniz

- Dizinin her iki ucunda bildirimler: "Pil Değişimi Modu Açık" ve ardından "Pil Değişimi Modu Kapalı"
- Her aşama için birer dokunsal titreşim
- **Pil Değişimi** düğmesinde 12'den 0'a geri sayım
- Telemetri alanındaki kilit rozeti kilitsiz ve kilitli arasında geçiş yapar

## Bir aşama başarısız olursa

Herhangi bir aşama başarısız olursa bir hata bildirimi ve hata dokunsal titreşimi alırsınız. **Hiçbir şey otomatik olarak yeniden denenmez.**

Planlamanız gereken durum başarısız kapanış aşamasıdır: araç kilitsiz kalır, hız limiti 25 km/s olur ve pil bölmesi açık kalır. Bu durumda aracı terk etmeyin.

1. Scooter sekmesinden **Sürüş Modu** kapalı (kilitle) komutunu gönderin veya değişimi tekrar çalıştırın.
2. Araçtan ayrılmadan önce kilit rozeti yeşil olduğundan emin olun.

## Şarj durumu ve değişimler aynı işlemdir

Bir aracı **Şarj Ediliyor** olarak ayarlamak bu diziyi çalıştırdığı için ikisi bağımsız değildir. Durum değişikliği tam bir değişimdir: aracın kilidinin açılmasını, 12 saniye beklemesini ve tekrar kilitlenmesini bekleyin. Sadece aracı yeniden etiketlemek istiyorsanız, açılmaya hazır olun.

## Birden fazla araçta değişim yapmak

Her seferinde bir aracı kendi araç sayfasından değiştirin. Uygulamada bir kuyrukta toplu pil değişimi yapmak şu anda mümkün değildir — [batch mode](batch-mode.md) bir iş listesi olup, toplu komut aracı değildir.

## Yaygın sorunlar

| Belirti                                  | Ne Yapmalı                                                                                  |
| ---------------------------------------- | ------------------------------------------------------------------------------------------ |
| Geri sayım takılı kalmış gibi görünüyor | Saniyede bir azalır. Ekran uyku moduna geçtiyse, hangi aşamada olduğunuzu görmek için kilit rozetini kontrol edin |
| Kapanış aşaması hiç tetiklenmedi          | Bir hata bildirimi arayın. Hiçbir şey otomatik olarak yeniden denenmez — değişimi tekrar çalıştırın veya aracı **Sürüş Modu** kapalı ile kilitleyin |
| Hız limiti hâlâ 25 km/s gösteriyor        | Kapanış aşaması tamamlanmadı; bu aşama 6 km/s'ye geri döndürür                              |
| Pil bölmesi açılmıyor                      | Açılış aşaması başarısız oldu veya hata gösterdi — bölme sadece bu aşama başarılı olursa açılır |

## İpuçları

- **Dokunmadan önce yedek paketi elinizde bulundurun.** On iki saniye değişim için yeterlidir, almak için yeterli değildir.
- **İkinci dokunsal titreşime güvenin.** İki titreşim dizinin kapandığını gösterir; bir titreşim ve sessizlik ise ekranı kontrol edin.
- **Her zaman yeşil kilit rozetiyle ayrılın** — bu, yukarıdaki tüm hata modlarını yakalayan tek kontroldür.
