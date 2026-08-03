# Rider App — Geçmiş (Sürüşler ve Ödemeler)

Geçmiş (`/history`), rider uygulamasında rider'ın kendi verilerinin bulunduğu tek yerdir. Tek ekranda iki sekmesi vardır — **Sürüşler** ve **Ödemeler** — ve rider'ı geçmiş bir yolculuk veya geçmiş bir ödeme ile ilgili her şey için buraya yönlendirirsiniz.

Her sekmenin kendi sayfalaması ve kendi sonsuz kaydırması vardır; rider aşağıya yaklaştıkça sonraki sayfa yüklenir. Sekmeler arası geçiş, kaydırma konumunu ve sayfalamayı sıfırlar ve ekran her yeniden açıldığında veriler yeniden yüklenir.

Operatör tarafındaki karşılıkları için bkz. [Rides — List](../../operations/trips/rides.md) ve [Payments — History](../../operations/payments/payments.md).

## Sürüşler sekmesi

Her sürüş kartı şunları gösterir: araç türü, araç numarası, başlangıç ve bitiş konumu, başlangıç ve bitiş zamanı, kilometre cinsinden mesafe, dakika cinsinden süre, maliyet ve durum. Kartlar sayfa başına 20 adet yüklenir. Birine dokunmak [sürüş detayını](#sürüş-detayı) açar.

| Durum         | Renk   | Anlamı                                      |
| ------------- | ------ | ------------------------------------------- |
| **Tamamlandı** | Yeşil  | Sürüş normal şekilde tamamlandı             |
| **İptal Edildi** | Kırmızı | Sürüş iptal edildi                          |
| **Süresi Doldu** | Sarı   | Sürüş veya bekletme tamamlanmadan süresi doldu |

## Ödemeler sekmesi

Her ödeme kaydı şunları gösterir: tür, tutar, para birimi, durum, sağlayıcı, tarih, işlem öncesi ve sonrası bakiye ve — başarısızlık durumunda — bir hata kodu.

**Türler:** bakiye yükleme, iade, borç ve bonus.

**Tutar renk kodlaması:**

| Renk   | Uygulama Alanı           |
| ------ | ------------------------ |
| Yeşil  | Bakiye yüklemeler, iadeler, bonuslar |
| Turuncu | Cezalar                  |
| Kırmızı | Borçlar ve ücretler      |

**Durum rozetleri:** _beklemede_ kehribar renginde, _başarısız_ kırmızı, _iade edildi_ soluk. **Tamamlanmış bir ödeme hiçbir rozet göstermez** — rozetin olmaması normal ve sağlıklı durumdur, eksik veri değildir. Riderlar bazen bunu "hiçbir şey olmadı" diye okur; aslında tam tersidir.

Başarısız bir ödemenin **hata kodu**, rider neden ödemenin gerçekleşmediğini sorduğunda okunması gereken bilgidir.

## Sürüş detayı

Bir sürüş kartına dokunmak `/history/:id` sayfasını açar. Şunları gösterir:

- **Sürüş bilgileri** — durum, fiyat, mesafe (km cinsinden), süre (dakika cinsinden), araç etiketi ve türü, tarife, başlangıç ve bitiş adresleri, zaman damgaları ve rider'ın verdiği puan
- **Maliyet dökümü** — toplam fiyatı oluşturan beş satır: açma ücreti, rezervasyon, aktif süre, mesafe ve duraklama süresi. Tarifedeki karşılıkları için bkz. [Cost breakdown](../riding/rides.md#ücret-dökümü)
- **Aktivite zaman çizelgesi** — önce rezervasyon süresi (varsa), sonra sürüş ve duraklama blokları zaman sırasına göre. Bu, rider'a pahalı hissettiren bir sürüşte paralarının gerçekten nereye gittiğini göstermek için en net yoldur
- **Rota haritası** — tamamlanmış sürüşler için: rota çizgi olarak çizilir, başlangıç ve bitiş işaretçileriyle, tüm yolculuğu kapsayacak şekilde yakınlaştırılmış

Sürüşün tarifesi yüklenemezse, ekran **yalnızca toplamı gösterir, döküm ve hata mesajı yoktur**. Toplam yine doğrudur — bu yüzden bazen döküm eksik olabilir.

## Şu anda uygulamada mevcut değil

Riderlar bunları düzenli olarak ister. Hiçbiri Geçmiş'te yoktur, bu yüzden rider'ı arama yaptırmak yerine açıkça söyleyin:

- Listeyi Bugün / Dün / Bu Hafta olarak gruplayabilme
- Tarih, araç türü veya duruma göre filtre paneli
- **Makbuz İndir** işlemi (PDF veya e-posta)
- Geçmiş bir sürüşü yeniden puanlama (puan sürüş sonunda verilir)
- Bir sürüş için **Sorun Bildir** formu — bunun yerine [Destek](../help/support.md) kullanın
- Sürüş veya ödeme geçmişinin CSV veya PDF olarak dışa aktarımı
- Listenin üstünde toplamlar veya yaşam boyu harcama tutarı gösterimi

Rider'a yönelik istatistikler de [şu anda mevcut değil](analytics.md). Rider toplamlar veya makbuz tarzı belge isterse, Gösterge Paneli'nden üretin: [Rides — List](../../operations/trips/rides.md) ve [Payments — History](../../operations/payments/payments.md) her ikisi de dışa aktarım yapar.

## SSS

| Rider sorar…                        | Cevap                                                                                                                           |
| ---------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| "Bu döküm ne anlama geliyor?"     | Beş satırı sırayla okuyun. Uzun bir duraklama veya rezervasyon satırı çoğu sürpriz toplamı açıklar                                  |
| "Neden döküm yok?"                 | Sürüşün tarifesi yüklenemedi, bu yüzden sadece toplam gösteriliyor. Toplam doğrudur                                          |
| "Ödemem neden beklemede?"         | Sağlayıcı onaylamadı. Yönlendirme veya QR bakiye yüklemede, rider muhtemelen ödemeyi tamamlamadı — bkz. [Payment Methods](payment-methods.md#bekleyen-yüklemeler) |
| "Toplamlarım nerede?"             | Rider uygulamasında toplam yok; listeden toplayın veya Gösterge Paneli'nden alın                          |
| "Makbuz alabilir miyim?"          | Uygulamadan değil. Rider belge isterse ödeme kaydını Gösterge Paneli'nden dışa aktarın                                     |
| "Ödememin rozet yok, neden?"      | Çünkü tamamlandı. Sadece beklemede, başarısız ve iade edilen ödemelerde rozet olur                                                   |

## İpuçları

- **Sürüş detayı ücret anlaşmazlıklarını çözer, liste değil.** Sürüşü açın, tarifeye karşı dökümü okuyun, ardından baskın olan tek satırı açıklayın.
- **Aktivite zaman çizelgesi en iyi görsel yardımınızdır.** 40 dakikalık bir duraklama bloğu gören bir sürücü toplam hakkında tartışmayı bırakır.
- **"Rozet yok" tamamlandı anlamına gelir.** Ekibinize bunu öğretin, böylece sağlıklı ödemelerin peşinden koşmayı bırakırlar.
- **Başarısızlık kodları kayıttadır.** Bir banka hakkında spekülasyon yapmadan önce kodu okuyun.
