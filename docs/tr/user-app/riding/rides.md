# Rider App — Sürüş Başlatma, Duraklatma ve Bitirme

Rider uygulamasında bir sürüş, sabit bir adımlar dizisiyle ilerler: bir araç seçin, isteğe bağlı olarak tutun, başlangıç kontrollerini geçin, sürüş öncesi fotoğrafları çekin, sürüş yapın, gerektiğinde duraklatın ve devam ettirin, ardından sürüşü bir park fotoğrafı ve değerlendirmesi ile sonlandırın.

Zaman **üç ayrı segmentte** fiyatlandırılır — rezervasyon, aktif sürüş ve duraklatma — bu yüzden sürücünün toplam ücreti bazen onları şaşırtabilir. Bu konuşmaları çözmek için [maliyet dökümü](#ücret-dökümü) bölümüne bakın.

Başlatmanın iki yolu vardır: **Rezerve Et** (önce aracı tutar, sonra başlatır) ve **doğrudan başlatma** (hemen başlatır). Her ikisi de [Harita](map.md) üzerinde başlar.

## Araç seçimi

Sürücü ya:

- Harita üzerindeki bir araç işaretine **dokunabilir**, veya
- QR kodunu **tarayabilir** — **Tara** düğmesi tarayıcıyı açar (`/ride/start`). Android ve iOS'ta yerel kamera tarayıcısını, web'de ise sayfa içi kamera okuyucusunu kullanır. Kod hasarlı veya okunamazsa **manuel araç kodu girişi** sayfası sunulur. Yanlış kod _geçersiz kod_ bildirimi verir ve tarayıcı kendi kendine zaman aşımına uğrar.

Her iki yol da aynı araç detay sayfasına gider: tarifeler, ayrıca **Başlat** ve **Rezerve Et**. Sürücünün konumu tarama anında kaydedilir ve başlatma veya rezervasyon için kullanılır.

## Sürücünün sürüş başlatamama nedenleri

Bunları sırayla kontrol edin — bunlar gerçek engeller, etkili oldukları sırayla:

1. **Hiçbir Tara düğmesi yok.** Haritanın alt çubuğu, sürücünün sürüş ödeme erişimi olduğunda (bağlı kart veya kayıtlı kart desteklemeyen sağlayıcı) görünür. Kart destekleyen sağlayıcıda kart yoksa **Tara** ve **Grup sürüşü** olmaz. Bunu [Ödeme Yöntemleri](../money/payment-methods.md) bölümünde düzeltin. **Önce bunu kontrol edin.**
2. **Plan veya ödeme yöntemi seçilmemiş.** Bir tarife planı seçilene, plan devre dışı işaretli olmayana ve — sağlayıcı açık seçim gerektiriyorsa — ödeme yöntemi seçilene kadar **Başlat** / **Rezerve Et** devre dışı kalır. Devre dışı düğme nedeni gösterir.
3. **Minimum başlangıç bakiyesi — sadece bakiye ödeyenler.** **Bağlı kartı olmayan** sürücüler, tarifedeki minimum başlangıç bakiyesi ile karşılaştırılır ve altında ise reddedilir; gereken miktar mesajda belirtilir. Tarife bu miktarı belirtmemişse kural "bakiye sıfırdan büyük" olur. **Bağlı kartı olanlar** bakiye engeline tabi değildir. Kural hem **Başlat** hem **Rezerve Et** için geçerlidir. Gerçek rakamı [Araç Tarifeleri](../../settings/infrastructure/vehicle-tariffs.md) bölümünden okuyun — hafızadan sayı vermeyin.
4. **Konum izni.** **Rezerve Et** konum kontrolü yapar ve izin yoksa iptal eder. **Başlat** kullanılabilir koordinat ister, yoksa **Sürüş öncesi** moduna döner.
5. **Araçtan çok uzakta.** Uygulama, araç kodunu ve gereken yarıçapı belirten bir ileti açar. Araç konum bildirmemişse, "araç çevrimdışı" modunda aynı ileti ve yeniden deneme geri sayımı görünür. Sürücünün konumu okunamazsa "konumunuzu okuyamıyoruz" iletişi çıkar.
6. **Rezervasyon bekleme süresi.** Yeni bırakılan araç hemen yeniden rezerve edilemez; uygulama rezervasyon bekleme iletişi açar.
7. **Sürüş öncesi fotoğraflar tamamlanmamış — sonraki bölüme bakın.
8. **Bir işlem zaten devam ediyor.** Düğmeler kilitlenir ve istek sürerken dönen simge gösterir. Bu donma değil; ikinci dokunuş dikkate alınmaz.

## Sürüş öncesi fotoğraflar

Sürüş öncesi fotoğraf kanıtları şirket bazında yapılandırılır ve varsayılan olarak etkinleştirilir. Üç ayar bunları yönetir:

- Başlangıç kanıtları için **ana anahtar**
- **Araç fotoğrafları** — etkinleştirilebilir, zorunlu yapılabilir ve fotoğraf sayısı verilebilir (varsayılan: etkin, zorunlu değil, bir fotoğraf)
- **Selfie** — etkinleştirilebilir ve zorunlu yapılabilir (varsayılan: etkin, zorunlu değil)

Sıra sabittir: **Sürüş öncesi** modal → araç fotoğrafları → selfie → araç aktifleşir. Etkin ama zorunlu olmayan adım sürücü tarafından atlanabilir; zorunlu olan atlanamaz. Başlangıç kanıtları tamamen kapalıysa modal doğrudan aktifleşmeye gider.

Fotoğraflar moderasyon kuyruğunuza düşer — bkz. [Park Kanıtları](../../support/tickets-proofs-chat/park-proofs.md).

## Duraklatma ve devam ettirme

- **Duraklat** ve **Devam Ettir** aynı düğmedir, sürücünün mevcut konumu ile gönderilir.
- Her işlem yaklaşık **8 saniye** boyunca yok sayılır, böylece hızlı ikinci dokunuş etkisiz olur.
- **Devam ettirme selfie isteyebilir.** Şirketiniz için selfie kanıtı etkinse, devam ettirme önce selfie doğrulaması açar — ve **bu atlanamaz**.
- **Duraklatma ücretlendirilir.** Duraklatılan dakikalar tarifedeki **Duraklatma fiyatı** üzerinden ücretlendirilir. Maksimum duraklatma süresi yoktur.
- **Duraklatılmış sürüşte bakiye yetersizliği.** Duraklatılmış sürüş ve sıfır ya da negatif bakiye, aktif sürüş kartında bakiye yetersizliği bildirimi gösterir; **Yükle** ve **Sürüşü bitir** seçenekleri sunar. Sürücü bakiye düzelene kadar devam ettiremez. Bunu kesinlikten çok güçlü bir ipucu olarak değerlendirin — uygulama bakiyeden çıkarım yapar, bu yüzden gösterge panelindeki cüzdanı da kontrol edin.

## Sürüşü bitirme

Tam sıralama, böylece sürücüye sonraki adımları anlatabilirsiniz:

1. **Sürüşü bitir** **sürüş sonrası modalini** açar: park rehberi (park etmenin izinli ve yasak olduğu yerler) ve bir kontrol listesi — dik, kilitli, fotoğraf, çevre. Şirketiniz için bitiş kanıtları kapalıysa, sürüş burada basitçe sona erer.
2. **Devam et** hem bitiş kanıtları hem de park fotoğrafları etkinse **park kanıtı modalini** açar. Aksi takdirde sürüş kanıtsız sona erer.
3. Sürücü gerekli sayıda park fotoğrafı çeker — modal yakalanan / gereken sayacı gösterir. Park fotoğrafları zorunlu olarak işaretlenmemişse (ve bazı uygulama sürümlerinde zorunlu olsa bile) **Atla** seçeneği sunulur ve onay diyaloğundan sonra sürüş kanıtsız sona erer.
4. Fotoğraflar eksikse **Tamamla** yerel olarak reddedilir. Ardından uygulama yeni bir konum tespiti yapar ve **herhangi bir şeyi yüklemeden önce sürüşü kapatır** — böylece bir reddedilme (yanlış bölge, çok uzak) hemen ortaya çıkar.
5. Fotoğraflar tek tek yüklenir ve sürüş sonu park kanıtları olarak kaydedilir. Başarısız bir yükleme **sürüşü geri almaz** — sürüş zaten kapatılmıştır ve ücret etkilenmez.
6. Sürüş yeniden yüklenir ve **puanlama modalı** açılır: isteğe bağlı yorumlu yıldız puanı veya atla.

### Park bölgesinin dışında

Bitiş, araç izin verilen park bölgesinin dışındaysa reddedilirse, uygulama resimli bir **park bölgesi dışı** diyaloğu açar. "Haritada bölgeleri göster" eylemi sürücüyü aktif sürüşe geri döndürür ve **park fotoğraflarını kasıtlı olarak temizler** — araç hareket etmek üzeredir, bu yüzden fotoğraflar yanlış olur. Sürücü aracı izin verilen bir bölgeye taşır ve fotoğrafları yeniden çeker.

Park etmenin izinli olduğu bölgeler tamamen sizin yapılandırmanızdır — bkz. [Zones](../../settings/infrastructure/zones.md).

Bitişte mesafe reddedilmeleri, başlangıçta olduğu gibi aynı çok uzak diyaloğunu açar; yeniden deneme fotoğrafları yeniden doğrular ve bitişi tekrar dener. Başarısız bir bitiş ayrıca aktif sürüş kartında bir yeniden deneme satırı bırakır.

## Ücret dökümü

Toplam fiyat beş satırdan oluşur. Bir ücreti açıklarken bu isimleri kullanın:

| Satır            | Ne olduğu                            | Tarif alanı                 |
| ---------------- | ---------------------------------- | --------------------------- |
| **Kilidi açma ücreti** | Aracı açmak için bir kez alınır    | **Sürüş başlatma fiyatı**   |
| **Rezervasyon**  | Bekletmenin ücretli kısmı           | Ücretsiz **Rezervasyon süresi** sonrası dakika başı **Ücretli rezervasyon fiyatı** |
| **Aktif süre**   | Sürüş süresi                       | Dakika başı fiyat           |
| **Mesafe**       | Kat edilen mesafe                  | Km başı **Mesafe fiyatı**   |
| **Duraklama süresi** | Duraklama süresi                   | Dakika başı **Duraklama fiyatı** |

Tarife yüklenemezse, sürüş detayı sadece toplamı gösterir — döküm yok ve hata yok. Toplam yine doğrudur.

Tamamlanmış bir sürüş kaydı şunları içerir: durum, fiyat, mesafe (km olarak gösterilir), süre (dakika olarak gösterilir), araç etiketi ve türü, tarife, aktif sürüş ve duraklama segmentleri, rezervasyon süresi, başlangıç ve bitiş adresleri, zaman damgaları ve puanlama. Tamamlanmış sürüşler için rota haritada çizilir. Sürücüler bunların hepsini [History](../money/history.md) içinde görür; ekibiniz operatör tarafındaki karşılığını [Ride Detail](../../operations/trips/ride-detail.md) içinde görür.

## Sorun Giderme

| Sürücü der ki…                               | Genellikle nedir                                                                                                              |
| --------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| "Başlatamıyorum veya rezerve edemiyorum"    | [Why a rider cannot start a ride](#sürücünün-sürüş-başlatamama-nedenleri) içindeki sekiz kapıyı sırayla geçin                          |
| "Tarama düğmesi yok"                         | Kaydedilmiş kartları destekleyen sağlayıcıda bağlı kart yok                                                                   |
| "Yetersiz bakiye diyor ve bir miktar gösteriyor" | Bu, tarifedeki minimum başlangıç bakiyesidir. Yükleme yapın — veya kart bağlayın, bu bakiye engelini tamamen kaldırır           |
| "Araç kilidi açılmıyor" (ama uygulama başlatmayı kabul etti) | Araç tarafı: durumunu ve bağlantısını [Vehicle Detail](../../operations/fleet/vehicle-detail.md) içinde kontrol edin             |
| "Sürüşü bitiremiyorum"                        | Genellikle izin verilen park bölgesinin dışında veya çok uzak / araç çevrimdışı reddi. Her birinin kendi diyaloğu vardır         |
| "Duraklatılmış sürüşüme devam edemiyorum"    | Onaylanmamış devam selfie’si veya boş cüzdan                                                                                   |
| "Park fotoğraflarım kayboldu"                 | "Haritada bölgeleri göster" kullanıldıktan sonra beklenen durum — sürücü doğru yerde yeniden çeker diye temizlenir             |
| "Sürüş bitti ama fotoğraf kanıtı yok"         | Sürüş yüklemeden önce kapanır, bu yüzden başarısız yükleme kanıtsız kapalı sürüş bırakır. Ücret etkilenmez                      |
| "Fazla ücret alındım"                         | Sürüşü History içinde açın ve tarifeye karşı satır satır dökümü okuyun. Uzun duraklama veya fark edilmeyen ücretli bekletme çoğunu açıklar |

## İpuçları

- **Beş arıza satırı, ücret itirazlarınız için tüm kelime dağarcığınızdır.** Satırı adlandırın, ardından arkasındaki tarife alanını adlandırın.
- **Ödenen bekletmeler sessiz sürprizdir.** Rezervasyon yapan ve sonra yavaşça yürüyen bir sürücü bunun için ödeme yapar; rezervasyon satırı bunu gösterecektir.
- **Devam selfie'leri atlanamaz** — bir sürücü duraklatılmış bir sürüşte takılı kalırsa, bir selfie ekranının görünüp görünmediğini sorun.
- **Debounce'lar hata gibi görünür.** Duraklat / devam, yaklaşık 8 saniye boyunca dokunuşları yok sayar; sürücüleri tekrar tekrar dokunmak yerine beklemeyi öğretin.
- **Kanıtı olmayan kapalı bir sürüş faturalama sorunu değildir**, ve yeniden yükleme mümkün değildir. Kayıt gerekiyorsa bunu sürüşe not edin.
