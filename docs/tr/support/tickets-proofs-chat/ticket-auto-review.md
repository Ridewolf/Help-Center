# Bilet Otomatik İnceleme

Bilet Otomatik İnceleme sayfası (`/support/tickets/auto-review`), kararlar arasında listeye dönmeden bekleyen biletleri ardışık olarak işlemek için **düzenlenmiş bir kuyruk arayüzüdür**.

[Park Kanıtı Otomatik İnceleme](park-proof-auto-review.md) gibi, burada "Otomatik" **otomatik ilerleme** anlamına gelir: her işlemden sonra sayfa bir sonraki bekleyen bileti yükler, böylece akışı bozmadan moderasyona devam edebilirsiniz.

[Biletler listesi](tickets.md) üzerindeki **Otomatik İnceleme** butonundan erişebilirsiniz.

Gerekli izin: **Biletler** (`a8b9c1`).

## Nasıl çalışır

1. Sayfa açıldığında **mevcut bekleyen bilet kuyruğunu** yükler
2. İlk bileti görürsünüz — kanıt fotoğrafı, bilet bilgisi ve işlem butonları
3. Bir işlem seçin (Çöz, İşlemde, Bilgi Bekleniyor, Reddet, Yinelenen) veya Atla
4. Sayfa **otomatik olarak** bir sonraki bekleyen bilete geçer
5. Kuyruk boşalana kadar tekrarlayın
6. Boşaldığında, sayfa yeni biletler için anket yapan bir geri sayımla **bekleme durumuna** geçer

Yeriniz bekleyen kuyruktur — sekmeyi kapatıp açmak ilerlemeyi kaybettirmez, sayfa yüklendiğinde bir sonraki bekleyen biletten devam edersiniz.

## Düzen

Geniş ekranlarda üç sütun, dar ekranlarda üst üste:

| Sütun       | Genişlik | İçerik                                                                |
| ----------- | -------- | -------------------------------------------------------------------- |
| **Görsel**  | 5/12     | Yakınlaştırılabilir kanıt fotoğrafı + zaman damgası                   |
| **İşlemler**| 4/12     | Beş durum değiştirme butonu + Atla + Yorum                           |
| **Bilgi**   | 3/12     | Durum, şikayet türü, araç, raporlayan, tarihler içeren bilet bilgi kartı |

Üstte ilerleme çubuğu ne kadar ilerlediğinizi gösterir.

## Başlık

- **Başlık** "Bilet Otomatik İnceleme"
- İlerlemeyi gösteren **Alt başlık**: `X / Y inceleniyor · T-12345`
- Sağ üstte **Atla** butonu — mevcut bileti kararsız bırakır (bilet _Beklemede_ kalır)
- **Geri oku** — [Biletler listesine](tickets.md) döner

## İşlem butonları

Beş durum geçişi, artı Atla ve isteğe bağlı Yorum:

| Buton           | Yeni durum     | Kullanım amacı                                                             |
| --------------- | -------------- | -------------------------------------------------------------------------- |
| **Çöz**         | _Çözüldü_      | Sorun giderildi (veya gerçek değildi) — bileti kapatır                    |
| **İşlemde**     | _Devam Ediyor_ | Sorun gerçek, çözüm başlatıldı (bakım görevi, takip)                      |
| **Bilgi Bekleniyor** | _Bilgi Bekleniyor_ | Karar vermeden önce sürücüden ek bilgi istenir — sürücüye bildirim gider |
| **Reddet**      | _Reddedildi_   | Gerçek sorun değil (kalitesiz rapor, yanlış hedef, spam)                  |
| **Yinelenen**   | _Yinelenen_    | Aynı araç / sorun için başka bilet zaten var                              |
| **Atla**        | (değişmez)     | Karar vermeden sonraki bilete geç                                         |
| **Yorum**       | (herhangi bir işlem) | Tıkladığınız işleme eklenebilen isteğe bağlı not                        |

Her tıklama hemen kaydedilir ve bir sonraki bilete geçer. Yorum eklemek istiyorsanız **önce yorumu yazın**.

### Hangi kapanış durumunu ne zaman kullanmalı

- **Çöz** — arıza giderildi (veya rapor, araç kontrol edilerek yanlış anlama olduğu anlaşıldı)
- **Reddet** — rapor kötü / sahte / yanlış hedef; sürücü uygulamasında reddedildi olarak görünür
- **Yinelenen** — orijinale bağlanır; arka uç zinciri yönetir, birinin çözümü hepsini kapatır

_Çöz_, _Reddet_ ve _Yinelenen_ biletleri kapatır. _İşlemde_ ve _Bilgi Bekleniyor_ farklı bir kategoride açık tutar.

## Bilgi sütunu

Sağdaki **Bilet Bilgi** kartı fotoğrafın arkasındaki yapılandırılmış verileri gösterir:

- **Durum** — mevcut durum etiketi
- **Şikayet türü** — renk kodlu etiket (mekanik hasar, elektrik, batarya vb.)
- **Araç** — etiket ve bağlantı
- **Raporlayan** — isim (sürücü) veya etiket (sistem / operatör)
- **Konum** — adres / koordinatlar
- **Oluşturulma / güncellenme** — zaman damgaları
- **SLA** — kalan süre (veya "gecikmiş" rozeti)

Karar vermeden önce bu kartı okuyun — sayfadan ayrılmadan tüm hikayeyi anlatır.

## Bekleme durumu

Kuyruk boşaldığında sayfa Park Kanıtlarında kullanılan aynı bekleme ekranını gösterir:

- "Tüm biletler incelendi" mesajı
- Sonraki otomatik anket için **geri sayım sayacı**
- Hemen anket için **Şimdi kontrol et** butonu
- Listeye dönmek için **Çıkış** butonu

Beklerken yeni bilet gelirse sayfa otomatik yükler.

## Otomatik İnceleme ile listeyi ne zaman kullanmalı

| Listeyi kullanın…                                         | Otomatik İncelemeyi kullanın…                      |
| ---------------------------------------------------------- | ------------------------------------------------- |
| Durum, şikayet türü veya araç filtrelemeniz gerektiğinde   | Filtrelenmemiş bekleyen kuyruktan hızlıca geçiyorsanız |
| Belirli bir araç veya sürücünün geçmişini incelerken       | Bir bilete odaklanıp tam ekran çalışıyorsanız       |
| Önceki kararları denetliyorsanız (Çözüldü / Reddedildi vb.) | Hız istiyorsanız: oku → karar ver → sonraki          |
| Bakım ekibine yükseltmeniz gerekiyorsa                      | Vardiya modunda, kuyruğu baştan sona işliyorsanız    |

## Tipik iş akışları

- **Vardiya başlangıcı** — Otomatik İncelemeyi açın → her bekleyen bileti işleyin → bekleme ekranında bitirin
- **Hızlı üçleme** — fotoğraf + şikayet türü + raporlayanı okuyun → açıksa, bir satırlık yorumla _Çöz_ / _Reddet_; değilse, _İşlemde_ yapın ve yorumda bakım ekibini etiketleyin
- **Sürücü bekleniyor** — rapor belirsizse, yorumda bir soru ile _Bilgi Bekleniyor_; sürücüye bildirim gider
- **Yinelenen** — arama aynı araç için açık bir bilet bulursa, zinciri bağlamak için _Yinelenen_ yapın
- **Belirsiz durum** — _Atla_ ve tam bağlamla (araç geçmişi, ilgili sürüşler, IoT uyarıları) listeden açın

## İpuçları

- **Önce yorumu yazın** — Park Kanıtları ile aynı kural: işlem, geç yorumlardan önce kaydedilir
- **Atla ≠ karar** — atlamak hiçbir şeyi kapatmaz; bilet sırada kalır ve sonraki operatöre gider
- **Çöz vs Reddet aynı değil** — _Çöz_ "sorunu çözdük" der; _Reddet_ "bu gerçek bir sorun değildi" der; sürücü uygulamasında farkı görür
- **Yinelenen işlemi** — önce araç etiketiyle listeyi arayın; ana bilet bulunursa Yinelenen'e tıklayın, yoksa en bilgilendiriciyi çözün ve diğerlerini Yinelenen yapın
- **SLA sayacı beklerken de çalışır** — kuyruk boşsa ama listede gecikmiş satırlar varsa, bunlar Otomatik İncelemeden filtrelenir (izinler veya durum olabilir); görmek için listeye geri dönün
- **Otomatik İnceleme, arka uçtan gelen bilet sırasına saygı duyar** — en yeni bekleyenler dağıtıma göre değişir; kuyruk sırasını yetkili kabul edin
