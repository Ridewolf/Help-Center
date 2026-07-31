# Profiliniz

**Profil** Ridewolf içindeki _kendi_ hesabınızdır — şu anda oturum açmış olan operatör. Buradan adınızı, fotoğrafınızı, şifrenizi, temayı, bildirim seslerini değiştirebilir ve nerede oturum açtığınızı inceleyebilirsiniz. Operatör hesabınız aynı zamanda Rider App'lerdeki bir müşteri (client) hesabına bağlıysa, aynı hesabın müşteri görünümüne geçiş yapabilirsiniz.

Bu makaleyi paylaşan dört rota vardır, hepsi üst çubuktaki avatar üzerinden erişilebilir:

| Rota                | Nedir                                                                                           |
| ------------------- | ------------------------------------------------------------------------------------------------ |
| `/profile`          | Hub — hesabınızın türüne göre sizi otomatik olarak operatör veya müşteri görünümüne yönlendirir  |
| `/profile/operator` | Operatör tarafı görünümü (personel için varsayılan)                                              |
| `/profile/customer` | Müşteri tarafı görünümü (hesabınız bir rider client ile bağlıysa)                               |
| `/profile/legacy`   | Eski tek sayfa görünümü — aynı veriler uzun bir form olarak düzenlenmiş (yeniden tasarlanan görünümler için yedek) |

Bu **kendi kendine hizmet** görünümüdür. _Diğer_ operatörleri (takım arkadaşlarınızı) yönetmek için [Operatörler](../../settings/access/operators.md) sayfasını kullanın.

İzin engeli yok — oturum açmış her kullanıcı kendi profilini açabilir.

## `/profile` sizi nereye yönlendireceğine nasıl karar verir

`/profile` doğrudan tıklandığında asla bir sayfada kalmaz — hemen yönlendirir:

1. Tarayıcınızın localStorage'ından `lastPersona` değerini okur (son kullandığınız persona geçişinden ayarlanır)
2. Eğer `lastPersona = customer` ve hesabınız bağlı bir müşteri varsa → `/profile/customer`
3. Eğer `lastPersona = operator` varsa → `/profile/operator`
4. Aksi halde: operatör hesabınız varsa operatör, yoksa sadece müşteri
5. Varsayılan yedek: `/profile/operator`

Yönlendirme gerçekleşene kadar kısa bir süre "Yönlendiriliyor..." yazan bir yükleme simgesi görürsünüz.

## Hero başlığı (operatör + müşteri görünümlerinde ortak)

`/profile/operator` ve `/profile/customer` sayfalarının üstünde yapışkan bir başlık bulunur. Şunları gösterir:

- Üzerine gelince kamera simgesi çıkan **Avatar** — tıklayınca **Avatar yükleme** iletişim kutusu açılır
- **Ad** (tıklayınca kopyalar) ve **e-posta** (tıklayınca kopyalar) — her ikisinde de pano kopyalama ipuçları var
- **Rozetler** — durumunuz (`Aktif` / `Pasif`), `Doğrulanmış` ve müşteri görünümündeyseniz `Müşteri`
- **Hızlı KPI'lar** — dört küçük kutucuk, içeriği persona göre değişir (aşağıya bakınız)
- **Persona geçişi** — iki buton (`Operatör` / `Müşteri`). Hesabınız bağlı müşteri yoksa Müşteri butonu devre dışı ve ipucu gösterir
- **Eylemler** — `Düzenle` butonu ve üç noktalı menü; içinde _Kullanıcı Kimliğini Kopyala_, _E-postayı Kopyala_, _JSON olarak Aç_ (kullanıcı kaydınızı yeni sekmede gösterir) ve _Oturumu Kapat_

Bu butonlarla persona değiştirmek seçiminizi `lastPersona`'a localStorage'da kaydeder, böylece bir sonraki sefer `/profile` sizi doğru yere yönlendirir.

## `/profile/operator` — üç sekme

Operatör görünümü her şeyi üç sekmeye ayırır. URL hash'i (`#overview`, `#security`, `#preferences`) aktif sekmeyi gösterir, böylece sekmeye doğrudan bağlantı verebilirsiniz.

### Genel Bakış sekmesi

Yan yana iki kart: **Organizasyon ve Rol** (sol) ve **Aktivite** (sağ).

**Organizasyon ve Rol** kartı, salt okunur formda şunları gösterir:

| Alan           | Kaynak                                                                 | 
| -------------- | --------------------------------------------------------------------- |
| **Kullanıcı Kimliği** | Operatör kimliğiniz — 8 karaktere kısaltılmış, pano kopyalama simgesi ile |
| **Takımlar**   | Size atanmış etiket etiketleri (etiket önbelleğinden çözülür)          |
| **E-posta**    | Hesabınızın e-posta adresi                                            |
| **Durum**      | `Aktif` / `Pasif` rozeti                                              |
| **Rol**        | Rol etiketi, parantez içinde izin sayısı                              |
| **Departman**  | Organizasyon profilinizden                                            |
| **Pozisyon**   | Organizasyon profilinizden                                            |
| **Konum**      | Ayarlanmışsa şehir ve saat dilimi                                    |
| **2FA**        | `Etkin` (yeşil) veya `Devre Dışı` (gri) — sadece biliniyorsa gösterilir |

Bu kart operatör görünümünde **salt okunurdur**. Bu alanlardan herhangi birini değiştirmek için (rol, departman, pozisyon, etiketler) bir yönetici [Operatörler](../../settings/access/operators.md) sayfasından kaydınızı düzenlemelidir — kendinizi terfi ettiremezsiniz.

**Aktivite** kartı, `/activity/operator/{id}`'dan çekilen son beş eyleminizi gösterir:

- Renkli nokta (yeşil = Oluşturuldu, mavi = Güncellendi, turuncu = Silindi, birincil renk = diğer)
- Kategori rozeti ("Oluşturuldu" / "Güncellendi" / "Silindi" / "Güvenlik")
- Açıklama ("#ABC numaralı araç güncellendi" vb.)
- Göreceli zaman ("2 saat önce")
- Eylemi yapan — genellikle "kendiniz", otomatik değişikliklerde "Sistem"

Eğer aktivite akışı boşsa, kart yedek olarak **son giriş oturumlarınızı** Güvenlik etkinlikleri olarak listeler. Alttaki "Tümünü Gör" butonu sizi tam oturum listesinin olduğu Güvenlik sekmesine götürür.

Kartların üzerindeki KPI'lar `{n} actions · {m} changes in 30d`'ı gösterir.

### Güvenlik sekmesi

İki kart üst üste: **Şifre yönetimi** ve **Aktif oturumlar**.

**Şifre yönetimi** kendi şifrenizi değiştirebilmenizi sağlar. "Mevcut şifre" yanındaki _Değiştir_ butonuyla açılır.

İletişim kutusunda üç alan vardır:

| Alan                 | Doğrulama                                            |
| -------------------- | --------------------------------------------------- |
| Mevcut şifre         | Zorunlu; en az 8 karakter                            |
| Yeni şifre           | Zorunlu; en az 8 karakter; mevcut şifreden farklı olmalı |
| Yeni şifreyi onayla  | Zorunlu; en az 8 karakter; yeni şifreyle aynı olmalı  |

Gönder butonu, üç alanın tamamı geçerli olana kadar devre dışı kalır. Yazarken her alanın altında kırmızı renkte satır içi hatalar görünür. Başarılı olursa bir bildirim alırsınız ve iletişim kutusu kapanır; form temizlenir.

Parola bölümünün altında, küçük bir **parola geçmişi** tablosu, tarih, işlem ve nedeni ile birlikte son üç değişiklik olayını listeler. (Bu şu anda statik bir yer tutucudur — arka uç henüz bir parola geçmişi uç noktası sunmamaktadır.)

**Aktif oturumlar**, paylaşılan oturum yöneticisi tarafından oluşturulur. Oturumlar **cihaz parmak iziyle gruplanır** (tarayıcı + işletim sistemi + cihaz türü + üretici + model), böylece aynı dizüstündeki birden fazla sekme tek bir grup olarak toplanır.

Her grup başlığı şunları gösterir:

- Bir cihaz simgesi (`deviceType` temelinde Monitör / Akıllı Telefon / Dizüstü Bilgisayar)
- Cihaz etiketi — üretici + model, veya işletim sistemi + sürüm, veya cihaz türü
- Tarayıcı etiketi
- Bir durum rozeti: `active` (son etkinlik 1 saatten az, yeşil), `inactive` (24 saatten az, gri), `old` (24 saatten fazla, soluk), veya `Bu cihaz` (mevcut oturum, mavi çerçeve)
- Son etkinlik zamanı (göreceli)
- Grup için oturum sayısı

Bir grup başlığına tıklayarak genişletebilir ve içindeki her bireysel oturumu görebilirsiniz; her biri konum sorgulamasından ülke ve IP, giriş tarihi ve o oturumu iptal etmek için bir çöp kutusu simgesi içerir. Grup ayrıca genişletilmiş listenin altındaki "Bu cihazdan çıkış yap" düğmesiyle topluca iptal edilebilir (mevcut oturum her zaman korunur).

Üstteki **Diğer oturumlardan çıkış yap** düğmesi, _tüm_ diğer oturumları aynı anda iptal eder. Mevcut cihaz asla etkilenmez. Sayım, tüm cihazlardaki mevcut olmayan oturumları içerir.

### Tercihler sekmesi

İki kart: **Tema ve harita stili** ve **Bildirim sesleri**.

İlk kart, paylaşılan tema seçici ve harita stili seçiciyi içerir — kayan profil sayfasındaki aynı widget'lar. Modlar, vurgu renkleri ve harita stillerinin tam dökümü için [Themes](../../features/ux/themes.md) sayfasına bakın.

İkinci kart, bildirim sesleri ayarlarını içerir — her-toast-türü için sesler, her bildirim için ses ve toasts ile bildirimler için bağımsız ses kaydırıcıları. Tam seçici için [Notifications](../../features/ux/notifications.md) sayfasına bakın.

Bu sekmedeki her şey tarayıcınızın **localStorage** alanına yazılır, sunucuya değil. Bu, tercihlerin cihaz ve tarayıcı bazında olduğu anlamına gelir — başka bir makineden giriş yaptığınızda takip edilmezler.

## `/profile/customer` — müşteri tarafı görünümü

Operatör hesabınız aynı Ridewolf kurulumunda bir sürücü (müşteri) hesabına **da** bağlıysa, müşteri tarafından nasıl göründüğünüzü görmek için kişilik değiştirebilirsiniz. Kahraman başlığındaki kişilik düğmesi sizi buraya götürür.

### Müşteri hesabınız yoksa

Şunları içeren kesikli boş durum kartı görürsünüz:

- Bir simge ve "Müşteri profilinizi bağlayın" başlığı
- Bir açıklama
- İki düğme — **Müşteri Hesabı Oluştur** ve **Mevcut Hesabı Bağla** (her ikisi de şu anda "Yakında" bildirimleri gösterir; henüz arka uç yok)
- Bir doğrulama uyarısı
- `/profile/operator` sayfasına geri dönen "Operatör olarak devam et" bağlantısı

### Müşteri hesabınız varsa

İki sekme: **Genel Bakış** ve **Sürüşler**.

Kahraman KPI'ları müşteriyle ilgili sayılara döner: **Bakiye** (biçimlendirilmiş para birimi), **Toplam Sürüş**, **Puan** (1 ondalık), **Bonus** (puanlar).

**Genel Bakış sekmesi** şunları gösterir:

- **Cüzdan** kartı — mevcut bakiye, isteğe bağlı bonus puanlar (sadece > 0 ise) ve bağlı ödeme yöntemi (marka + son 4 rakam + son kullanma ay/yıl + sağlayıcı türü) varsa
- **Sürüş İstatistikleri** kartı — üç kutucuk: Toplam Sürüş, Yıldızlı Puan (ve "{n} puanlandı" alt etiketi), Bonus Puanlar
- **Hesap Bilgileri** kenar çubuğu — Müşteri Kimliği (monospace, kısaltılmış), Sağlayıcı, Oluşturulma (göreceli), Son Aktiflik (göreceli, varsa), Son Sürüş (göreceli, varsa)
- **Cihazlar** kartı — kayıtlı müşteri cihazlarınız (iOS / Android / Web) paylaşılan `ClientDevicesList` tarafından oluşturulur
- **Güvenlik ve destek** hızlı bağlantılar — SSS, Destek ile İletişim, Sorun Bildir (yer tutucu düğmeler)

**Sürüşler sekmesi** son 20 sürüşünüzü listeler (en yenisi önce), şunlarla:

- Sürüş Kimliği (monospace) ve oluşturulma zamanı (göreceli)
- Durum rozeti (`completed` dolu, `active` ikincil, diğerleri çerçeveli)
- Mesafe (km), süre (dakika veya `Ss Dd`), araç etiketi
- Fiyat (biçimlendirilmiş para birimi)
- Varsa puan için yıldız satırı

500px sabit yüksekliğe sahip kaydırılabilir bir konteyner ve 4 iskeletli yükleme durumu kullanır. Boş durum, bir harita simgesi ve "Henüz sürüş yok" mesajı gösterir.

Burada **düzenleme formu yoktur** — bu, Rider App'inizde görünenlerin salt okunur bir aynasıdır. Kahraman başlığındaki Düzenle düğmesi şu anda "Yakında" bildirimi gösterir.

## `/profile/legacy` — tek sayfalık yedek

`/profile/legacy`, yedekleme ve doğrudan bağlantı için tutulan **eski tek sayfalık profil**dir. Sekmeler yerine neredeyse her şeyi tek bir kaydırılabilir sayfaya sığdırır:

- Avatar, ad, e-posta, durum rozeti ve Düzenle / Kaydet / İptal düğmeleri içeren bir profil başlık kartı
- **Kişisel Bilgiler** kartı — düzenlenebilir Ad, Soyad (düzenleme sırasında metin girişleri); salt okunur E-posta ve düzenlenebilir Telefon
- **Hesap Bilgileri** kartı — salt okunur Kullanıcı Kimliği (kısaltılmış + kopyala), E-posta, Durum (ham değer)
- **Görünüm** kartı — tema seçici ve harita stili seçici (Tercihler sekmesiyle aynı widget'lar)
- **Bildirimler ve Sesler** kartı
- **Güvenlik** kartı — parola satırı ve Değiştir düğmesi (şu anda iletişim kutusunu açmaz)
- Uygulama sürümünü gösteren bir alt bilgi (`CF_PAGES_COMMIT_SHA` ilk 7 karakter veya yerel olarak `DEVELOPMENT_KIT`)

İki önemli uyarı:

- **Kaydet** işlemi şu anda "Özellik henüz mevcut değil" bildirimi gösterir — arka uçta `PATCH /operators/me` uç noktası yok, bu yüzden Ad, Soyad ve Telefon düzenlemeleri gerçekten kaydedilmez
- Fotoğraf yükleme bu görünümden kaldırıldı; yeniden tasarlanmış `/profile/operator`'ı kullanın ve yükleme iletişim kutusunu açmak için avatarınıza tıklayın

Günlük kullanım için `/profile/operator` tercih edin. Bu URL'yi yalnızca yeniden tasarlanmış görünümde gelecekte bir düzeltme buraya geri dönmeyi gerektirirse yer imlerine ekleyin.

## Avatar yükleme iletişim kutusu

Yeniden tasarlanmış görünümlerde kahraman başlığından (avatarınıza tıklayarak) açılır.

Şunları kabul eder:

- Dosya türleri: Sadece `image/png`, `image/jpeg`, `image/jpg` — diğer türler "Dosya türü" hatası tetikler
- Maksimum dosya boyutu: **10 MB** — daha büyük dosyalar "Dosya boyutu" hatası tetikler
- Sürükle ve bırak veya seçmek için tıklayın

Diyalog, yükleme sırasında önizleme, dosya adı ve bir ilerleme çubuğu gösterir. Yükleme sırası şudur:

1. Dosyayı `POST` et → bir `avatarUrl` döner
2. `{ photo: avatarUrl }` ile `PATCH /me` → güncellenmiş kullanıcı kaydını döner
3. Kullanıcı deposu yeni `photo` alanıyla güncellenir; yeni avatar, referans verilen her yerde hemen görünür

Başarı veya başarısızlık, bildirimlerle onaylanır. Başarılı olursa, diyalog kendiliğinden kapanır.

## Alan referansı (tüm rotalar genelinde)

Düzenlenebilir olanların, nerede ve nasıl doğrulandığının konsolide listesi:

| Alan                          | Düzenlenebilir olduğu yer       | Doğrulama                                                          |
| ----------------------------- | ------------------------------ | ------------------------------------------------------------------- |
| Avatar / fotoğraf             | Operatör                      | PNG/JPG/JPEG, maksimum 10 MB                                       |
| Adı                          | Legacy (bozuk — backend yok)  | İstemci tarafında zorunlu değil                                    |
| Soyadı                       | Legacy (bozuk — backend yok)  | İstemci tarafında zorunlu değil                                    |
| Telefon                      | Legacy (bozuk — backend yok)  | İstemci tarafında zorunlu değil                                    |
| Mevcut şifre                 | Operatör → Güvenlik           | Zorunlu, ≥ 8 karakter                                              |
| Yeni şifre                   | Operatör → Güvenlik           | Zorunlu, ≥ 8 karakter, mevcut şifreden farklı olmalı               |
| Şifreyi onayla               | Operatör → Güvenlik           | Zorunlu, yeni şifreyle eşleşmeli                                   |
| Tema modu                   | Operatör → Tercihler, Legacy  | Sadece localStorage                                               |
| Tema rengi                  | Operatör → Tercihler, Legacy  | Sadece localStorage                                               |
| Harita stili                | Operatör → Tercihler, Legacy  | Sadece localStorage                                               |
| Bildirim sesi yapılandırması | Operatör → Tercihler, Legacy  | Sadece localStorage                                               |
| Rol / Departman / Pozisyon / Etiketler | _Burada değil_               | Bir yönetici tarafından [Operatörler](../../settings/access/operators.md) sayfasından düzenlenir |

## Tipik iş akışları

- **Kendi şifrenizi sıfırlayın** — `/profile/operator` → Güvenlik sekmesi → Değiştir → üç alanı doldurun → Gönder. Diyalog kapanır ve oturumunuz açık kalır
- **Unuttuğunuz bir genel bilgisayardan çıkış yapın** — Güvenlik sekmesi → cihaz grubunu genişletin → o oturumdaki çöp kutusu simgesi veya "Bu cihazdan çıkış yap" seçeneği. Mevcut oturumunuz her zaman korunur
- **Şüpheli etkinlik** — Güvenlik sekmesi → en üstte "Diğer oturumlardan çıkış yap" seçeneği, tüm geçerli olmayan oturumları tek tıkla iptal eder
- **Avatarınızı değiştirin** — kahraman başlığındaki avatara tıklayın → 10 MB'a kadar PNG/JPG dosyası bırakın → Yükle
- **Gösterge Panelini koyu moda geçirin** — Tercihler sekmesi → Tema modu = Koyu (veya Sistem olarak ayarlayın ve işletim sistemine bırakın)
- **Bir sekmeyi yer imine ekleyin** — her sekmenin bir hash'i vardır (`#overview`, `#security`, `#preferences`); URL'yi hash ile kopyalayın ve doğrudan bağlantı olarak kullanın
- **Kendinizi müşteri olarak görün** — hesabınız bağlıysa, kahraman başlığındaki Müşteri düğmesine tıklayın → Rider App görünümünüzü (bakiye, sürüşler, cihazlar) görün. Aynı şekilde geri geçiş yapın

## İpuçları

- **Burada düzenleyebilecekleriniz sınırlıdır** — rolünüz, departmanınız, pozisyonunuz, etiketleriniz ve e-postanız bir yönetici tarafından [Operatörler](../../settings/access/operators.md) sayfasında yönetilir. Profil sadece kendi avatarınız, şifreniz, oturumlarınız ve tercihlerinize özeldir
- **Tercihler yereldir** — temalar ve bildirim sesleri localStorage'da saklanır, sunucuda değil. Tarayıcı verilerinizi silerseniz sıfırlanır; farklı makinelerde takip edilmez
- **Hash sekmeyi belirler** — `/profile/operator#security` doğrudan Güvenlik sekmesini açar. Sohbet bağlantılarında bunu kullanarak bir ekip arkadaşınızın sizinle aynı görünümü görmesini sağlayabilirsiniz
- **Legacy görünümdeki Kaydet düğmesi şu anda işlevsizdir** — `PATCH /operators/me` gelene kadar, her şey için yeniden tasarlanmış operatör görünümünü kullanın; isim değişiklikleri için bir yöneticiye başvurun
- **Oturumlar cihaz bazında gruplanır** — birden fazla sekmeyi kapsayan tek bir giriş görürseniz, bu beklenen bir durumdur. Bireysel oturumları görmek için genişletin
- **Müşteri kişiliği veri ile sınırlandırılmıştır** — düğme görünür olsa bile, hesabınızda bir `client` kaydı yoksa işe yaramaz. Yoksa Müşteri düğmesini görmezden gelin ve `/profile/operator` üzerinde kalın
