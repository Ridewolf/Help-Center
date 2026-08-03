# Servis Uygulaması — Genel Bakış, Giriş ve Navigasyon

Servis uygulaması, Ridewolf'un saha operatörleri için olan uygulamasıdır — teknisyenin sokakta pil değiştirmek, scooter kilidini açmak, arızaları gidermek ve biletleri kapatmak için kullandığı araçtır. Rider App ve operatör gösterge panelinden ayrı bir üründür: kendi oturum açma ekranı ve kendi navigasyonu vardır.

Oturum açtıktan sonra, uygulama doğrudan filo haritasını (`/battery-swap`) açar; ana gösterge paneli yerine, çünkü sahada harita her iş için başlangıç noktasıdır.

Sonraki adımlar:

- [Filo haritası ve QR arama](../fleet/fleet-map.md) — bir araç bulun
- [Araç sayfası](../fleet/vehicle-controls.md) — kontroller, biletler, arızalar, uyarılar
- [Pil değişimi](../operations/battery-swap.md) — zamanlanmış değişim dizisi
- [Scooter Bul](../operations/finder.md) — son birkaç metre için Bluetooth radarı
- [Toplu mod](../operations/batch-mode.md) — üzerinde çalışılacak araç kuyruğu
- [Arka ofis araçları](../tools/back-office-tools.md) — tekrar oynat, analitik, destek kuyrukları

## Oturum açma

Oturum açma ekranı (`/login`), yalnızca oturum kapatmış operatörlere gösterilir — zaten oturum açtıysanız, uygulama sizi doğrudan filo haritasına yönlendirir.

1. **İş e-postanızı** girin. Tam bir adres olmalıdır (et işareti ve nokta içermeli), aksi takdirde alan gönderilmeden reddedilir.
2. **Parolanızı** girin — en az 6 karakter.
3. Gönderin. Burada yalnızca operatör hesapları çalışır; rider kimlik bilgileri reddedilir.
4. Profiliniz yüklenir (ad, rol, pozisyon, departman, şirket, izinler) ve uygulama filo haritasını açar.

### Google ve Apple ile oturum açma

**Google** ve **Apple** butonları yalnızca bu oturum açma yöntemi kurulumunuzda etkinleştirildiğinde görünür. Eksik bir buton, operatör bazlı bir ayar değildir — şirketinizde kimse görmez.

- **Uygulamada** — butona dokunmak, sağlayıcının sayfasını telefonunuzun tarayıcısında açar ve uygulama tarayıcının oturum açmayı geri vermesini bekler. Bekleme süresi 5 dakika sonra dolar (uygulama ön plana geldiğinde kısa bir ek süre vardır). Tarayıcı açıkken uygulama kapandıysa, soğuk başlatma oturum açmayı tamamlar.
- **Tarayıcıda** — Google oturum açma bir açılır pencerede açılır.

Her iki durumda da, akışın geri kalanı parola ile oturum açma ile aynıdır.

## Navigasyon çekmecesi

Her ekranda, soldan kayan bir panel olan navigasyon çekmecesini açan bir menü butonu vardır. İçerik, yukarıdan aşağıya:

| Öğe                | Açılır                 | Notlar                                              |
| ------------------- | --------------------- | -------------------------------------------------- |
| **Profiliniz**      | `/profile`            | Avatar, ad ve e-posta                               |
| **Driver App**      | `/battery-swap`       | Filo haritası — "Filonuzu hareket halindeyken yönetin" |
| **Tekrar Oynatıcı** | `/replay-player`      | Bir aracın gününü tekrar oynat                       |
| **Scooter Bul**     | `/finder`             | "Bluetooth ile scooter konumlandırma"              |
| **Dengeleme**       | `/rebalancing`        | Sadece sahip, devre dışı, **Yakında** rozeti gösterir |
| **Destek**          | `/support/tickets`    | Sadece sahip                                         |
| **Konuşmalar**      | `/support/dialogs`    | Sadece sahip                                         |
| **Park Kanıtları**  | `/support/park-proofs`| Sadece sahip                                         |
| **Analitik**        | `/analytics`          | Sadece sahip                                         |

Kaydırılabilir listenin altında sabitlenmiş üç kontrol daha vardır:

- **Ayarlar** — Uygulama Ayarları çekmecesini açar (aşağıya bakınız)
- **Harita tercihleri** — harita ayarları sayfasını açar, [Filo haritası](../fleet/fleet-map.md#harita-tercihleri) bölümünde açıklanmıştır
- **Oturumu kapat** — kırmızı renkte stilize edilmiştir

İki etiket alışkanlığı ezberlemeye değerdir, çünkü çoğu "Bulamıyorum" sorusuna neden olur: filo haritası **Driver App** olarak listelenir, "Battery Swap" değil; Bluetooth radarı ise **Find Scooter** olarak listelenir, "Finder" değil. Her öğenin etiketi altında tek satırlık bir açıklama da vardır.

Sekiz navigasyon öğesi tek bir düz listedir, iç içe gruplar değildir — **Destek**, **Konuşmalar** ve **Park Kanıtları** aynı `/support` altında olsalar da eşdeğerdir. Mevcut ekranınızla eşleşen öğe vurgulu bir arka plana sahiptir.

Çoğu "menü telefonumda farklı görünüyor" raporunu açıklayan iki kural vardır:

- **Sahip dışındaki operatörler için sahip-özel öğeler tamamen gizlenir** — gri gösterilmez, dokunulacak veya sorulacak bir şey yoktur.
- **Devre dışı öğeler normalde ok işareti yerine Yakında rozeti gösterir**.

## Profil sayfası

Çekmecedeki profil butonundan `/profile` sayfasını açın.

- **Başlık** — büyük bir avatar (fotoğraf yoksa baş harfleriniz) ve bir fotoğraf yüklemek için kamera butonu. Sadece görseller, maksimum 5 MB. Yanında bir durum rozeti ve sahipler için bir sahip rozeti bulunur.
- **Hesap** — rol, departman, pozisyon, telefon, izin sayısı, üyelik tarihi ve kopyalama butonlu kullanıcı kimliğiniz (destek istediğinde kullanışlıdır).
- **Çalışma alanları** — birden fazla şirkete üyeyseniz burada geçiş yapın. Uygulama seçtiğiniz şirket altında yeniden yüklenir.
- **Güvenlik** — **Uygulama Kilidi**, **PIN Değiştir**, **Parola Değiştir**, **Aktif Oturumlar**.
- **Daha Fazla** — **Görünüm ve Dil**, çekmecedeki **Ayarlar** öğesiyle aynı Uygulama Ayarları çekmecesini açar.
- En altta **Oturumu kapat**.

### Uygulama Kilidi

**Uygulama Kilidi** yalnızca yüklü uygulamada mevcuttur, bu nedenle tarayıcıda bu bölüm yoktur. Açılması, bir PIN ve cihaz biyometrik verilerinizi kaydeden kısa bir sihirbaz çalıştırır. Kaydedildikten sonra kodu değiştirmek için **PIN Değiştir** kullanılır.

### Parola Değiştir

1. Güvenlik bölümünden **Parola Değiştir**'i açın.
2. Mevcut parolanızı, ardından yeni parolayı iki kez girin.
3. Gönderin.

Üç alanın da en az 8 karakter olması gerekir, yeni şifre mevcut olandan farklı olmalı ve onaylama eşleşmelidir. Diyalog her açılıp kapandığında alanlarını ve hatalarını temizler, böylece paylaşılan bir telefonda yazdığınız hiçbir şey kalmaz.

### Aktif Oturumlar

Oturumlar tarayıcı, işletim sistemi ve cihaz satıcısına göre gruplanır. Her grup şunları gösterir:

- Bir sayaç rozeti
- Konum (ülke ve IP adresi)
- En son ne kadar önce aktif olduğu
- Kullandığınız cihazda **mevcut cihaz** rozeti

**İptal Et** mevcut cihaz dışındaki her grupta kullanılabilir. **Diğer cihazlardan çıkış yap** tüm diğer oturumları aynı anda iptal eder — telefon kaybolduğunda en hızlı yanıt budur.

## Uygulama Ayarları çekmecesi

Çekmecenin **Ayarlar** öğesinden veya profil sayfasındaki **Görünüm ve Dil** düğmesinden açılan alt bir sayfa. Her kontrol hemen uygulanır; Kaydet düğmesi yoktur.

| Ayar             | Seçenekler                                                  |
| ---------------- | ----------------------------------------------------------- |
| **Tema**         | Açık, Koyu, Sistem                                         |
| **Harita Stili** | Varsayılan, Sokak, Uydu, 3D, Navigasyon, Düz               |
| **Çevrimdışı Haritalar** | Çevrimdışı kullanım için mevcut konumunuzun çevresindeki haritayı indirir |
| **Dil**          | Otomatik, İngilizce, Română, Rusça                          |
| **Benim İşaretçim** | Kendi konumunuzun nasıl çizileceği için 6 simgeli bir ızgara  |

**Çevrimdışı Haritalar**, şu anda bulunduğunuz bölgenin haritasını indirir ve önbellekte tutar. İndirme sırasında indirilen karo sayacı ve bir **İptal** düğmesi görürsünüz. Ayarı kapatmak, devam eden indirimi iptal eder ve önbelleği temizler.

Araçlar için harita görünümü (işaretçiler, bindirmeler, kümelenme, yenileme hızı) ayrı bir **Harita tercihleri** sayfasında bulunur — bkz. [Fleet map](../fleet/fleet-map.md#harita-tercihleri).

## Çıkış yapma

**Çıkış Yap** gezinme çekmecesinde ve profil sayfasının altında bulunur. Uygulama Kilidini kapatır, oturumunuzu sonlandırır ve cihazdaki oturum temizlenmiş olarak giriş ekranına döner.

## Yaygın sorunlar

| Belirti                                         | Neden                                                                   |
| ----------------------------------------------- | ----------------------------------------------------------------------- |
| **Google** veya **Apple** düğmesi yok           | Bu oturum açma yöntemi kurulumunuz için etkin değil                    |
| Bir menü öğesi meslektaşınızda var ama sizde yok | Sadece sahip içindir                                                  |
| Bir öğe açılmıyor ve **Yakında** gösteriyor      | Şimdilik kasıtlı olarak devre dışı bırakılmış                           |
| Profil sayfasında **Uygulama Kilidi** bölümü yok  | Tarayıcı sürümünü kullanıyorsunuz; Uygulama Kilidi yüklü uygulama gerektirir |
| Herhangi bir şey yüklenmeden oturum açma reddedildi | E-posta biçimi veya 6 karakterli şifre minimumu cihazda başarısız oldu |
| Menü etiketleri beklediğinizle uyuşmuyor         | Filo haritası **Sürücü Uygulaması**dır; Bluetooth radarı **Scooter Bul**dur |
