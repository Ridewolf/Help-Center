# Park Kanıtı Otomatik İnceleme

Otomatik İnceleme sayfası (`/support/park-proofs/auto-review`), kararlar arasında listeye geri dönmeden bekleyen park kanıtlarını ardışık olarak hızlıca incelemeniz için **düzenlenmiş bir kuyruk arayüzüdür**.

"Otomatik" adıyla karşınıza çıksa da, moderasyon kararları hâlâ size aittir — burada _otomatik_ demek **otomatik ilerleme** anlamına gelir: her işlemden sonra sayfa otomatik olarak bir sonraki bekleyen kanıtı yükler, böylece listeye tıklamadan moderasyona devam edebilirsiniz.

[Park Kanıtları listesi](park-proofs.md) üzerindeki **Otomatik İnceleme** butonundan erişebilirsiniz.

Gerekli izin: **Park Kanıtları** (`d5e6f7`) + `review` alt izni.

## Nasıl çalışır

1. Sayfa açıldığında **mevcut bekleyen kuyruk** yüklenir
2. İlk kanıt gösterilir — aynı görsel + aynı işlem butonları, normal [inceleme sayfası](park-proof-review.md) ile aynı
3. Bir işlem seçin (Onayla / Uyar / Para cezasıyla Reddet / Engelle) ya da Atla
4. Sayfa **otomatik olarak** bir sonraki bekleyen kanıta geçer
5. Kuyruk boşalana kadar tekrarlayın
6. Boşaldığında sayfa **bekleme durumuna** geçer — belirli aralıklarla yeni kanıtlar için sorgulama yapar ve otomatik yükler

Yanlışlıkla yerinizi kaybetmezsiniz: sekmeyi kapatıp geri döndüğünüzde, kuyruk hâlâ bekleyenlerden yeniden oluşturulur.

## Düzen

Geniş ekranlarda iki eşit sütun, dar ekranlarda üst üste:

| Sütun       | Genişlik | İçerik                                                        |
| ----------- | -------- | ------------------------------------------------------------- |
| **Görsel**  | 6/12     | Yakınlaştırılabilir fotoğraf + altında oluşturulma zaman damgası |
| **İşlemler**| 6/12     | Aynı Onayla / Uyar / Para cezasıyla Reddet / Engelle / Yorum yığını |

Üstteki ilerleme çubuğu, kuyruktaki ilerlemenizi gösterir.

## Başlık

- **Başlık** "Park Kanıtı Otomatik İnceleme"
- **Alt başlık** ilerleme ile: `X / Y İnceleniyor · PP-12345`
- **Atla** butonu (sağ üst) — mevcut kanıtı kararsız bırakır ve sonraki kanıta geçer (kanıt _Beklemede_ kalır)
- **Geri oku** — [Park Kanıtları listesine](park-proofs.md) döner

Başlığın altındaki **ilerleme çubuğu** çalıştıkça dolar — dolan kısımda hafif bir parıltı efekti var.

## İşlem butonları

[Tek kanıt İnceleme sayfası](park-proof-review.md) ile aynıdır:

| Buton                | Etki                                                             |
| -------------------- | ---------------------------------------------------------------- |
| **Onayla**           | _Onaylandı_ olarak işaretle → otomatik ilerle                     |
| **Uyar**             | _Uyarı_ olarak işaretle + sürücüye bildirim gönder → otomatik ilerle |
| **Para cezasıyla reddet** | Girilen ceza tutarıyla _Para cezası kesildi_ olarak işaretle → otomatik ilerle |
| **Engelle**          | _Engellendi_ olarak işaretle (sürücü engellenir, kanıt değil) → otomatik ilerle |
| **Atla**             | Karar verme; sonraki kanıta geç (bu kanıt _Beklemede_ kalır)     |
| **Yorum**            | İsteğe bağlı metin alanı — tıkladığınız işleme eklenir             |

Her karardan sonra bir sonraki kanıt kayar şekilde gelir. "Geri al" yoktur — tıkladığınızda işlem kesinleşir.

## Bekleme durumu

Kuyruk boşaldığında sayfa, boş bir İşlemler kartı yerine **bekleme ekranı** gösterir:

- "Tüm kanıtlar incelendi" mesajı
- Sonraki otomatik yenilemeye kadar **geri sayım sayacı** (genellikle birkaç dakika)
- Geri sayımı atlayıp hemen sorgulama yapmak için **Şimdi kontrol et** butonu
- Listeye dönmek için **Çıkış** butonu

Beklerken yeni bir kanıt gelirse (sürücü yeni bir sürüşü bitirirse), sayfa otomatik yükler ve moderasyon akışınız devam eder.

## Otomatik İnceleme ile listeyi ne zaman kullanmalı

| Listeyi (`/support/park-proofs`) kullanın…                  | Otomatik İncelemeyi kullanın…                        |
| ------------------------------------------------------------ | ---------------------------------------------------- |
| Belirli müşterileri veya sürüşleri rastgele kontrol ediyorsunuz | Genel bekleyen kanıt yığılmasını temizliyorsunuz     |
| Sadece satır menüsünden hızlı onay yeterli                   | Her fotoğrafı tam boy görmek istiyorsunuz             |
| Önceki kararları denetliyorsunuz (Onaylandı / Para cezası kesildi / vb.) | Şu anda _Beklemede_ kuyrukla ilgileniyorsunuz         |
| Tarih aralığı, tür veya müşteri filtrelemek istiyorsunuz     | Hız istiyorsunuz: görsel → işlem → sonraki            |

Otomatik İnceleme, **akış durumu** aracıdır — moderasyon vardiyanızın başında açın ve kuyruk boşalana kadar kapatmayın.

## Tipik iş akışları

- **Vardiya başı** — Otomatik İncelemeyi açın → tüm bekleyen kanıtları inceleyin → bekleme ekranında bitirin → mola verin
- **Hızlı yoğunluk** — 10 dakika açın, yapabildiğinizi temizleyin, başka bir şey ilgilendiğinde _Çıkış_ ile listeye dönün
- **Belirsiz durum ortasında** — ekstra bağlam gerektiğinde (tam sürüş haritası, müşteri geçmişi), normal incelemedeki ilgili varlık bağlantılarına tıklayın (burada gösterilmez); kanıtı _Atla_ yapıp listeden geri dönmek isteyebilirsiniz

## İpuçları

- **Yorumu önce yazın** — normal inceleme sayfasındaki kural aynı: bir işlem tıklayınca geç kalmış yorumu kaydetme şansı olmaz
- **Atla dostunuzdur** belirsiz durumlarda — "neredeyse eminim" diye ceza kesmeyin; atlayın ve tam bağlamla (müşteri geçmişi, sürüş haritası) listeden inceleyin
- **Otomatik ilerleme hızlıdır** — acele etmeyin; para cezasıyla reddetmede hata yaparsanız, sürücünün cüzdanından saniyeler içinde para çekilir
- **Bekleme ekranı sağlıklıdır** — boş kuyruk ekibinizin yetiştiği anlamına gelir. Görünce klavyeden uzaklaşın
- **Burada filtre yoktur** — Otomatik İnceleme, filtrelenmemiş bekleyen kuyruğu geliş sırasına göre yürür; belirli bir alt küme hedefliyorsanız [listeyi](park-proofs.md) kullanın
- **Sekmeyi kapatmak güvenlidir** — yeriniz _Beklemede_ kuyruktur; sekmeyi yeniden açtığınızda kuyrukta kaldığınız yerden devam edebilirsiniz
