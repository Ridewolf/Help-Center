# Biletler — Liste

Biletler listesi (`/support/tickets`), bir araçla ilgili ortaya çıkan sorunlar için destek kuyruğudur — mekanik hasar, elektrik arızaları, kırık parçalar, güvenlik endişeleri vb. Her bilet belirli bir araca bağlıdır ve bir fotoğraf, raporlayan kişi, şikayet türü, SLA zamanlayıcısı ve durum içerir.

Bilet başına inceleme (tam ileti dizisi, kanıtlar, çözüm eylemleri) için **bilet detay sayfasına** bakın (bir satıra tıklayarak açılır).

Düzenlenmiş kuyruk arayüzü için [Ticket Auto Review](ticket-auto-review.md) sayfasına bakın.

Gerekli izin: **Biletler** (`a8b9c1`).

## Biletler burada nasıl görünür

Biletler birkaç kaynaktan oluşturulur:

1. **Sürücü raporu** — sürücü mobil uygulamasında "sorun bildir" akışı vardır; sürücüler bir şikayet türü seçer, fotoğraf çeker, not bırakır
2. **Operatör başlatmalı** — bir operatör, sorunu fark ettiği bir araç için bilet açar (nadir; genellikle [bakım görevleri](../../operations/fleet/vehicle-detail.md) akışı tercih edilir)
3. **Sistem işaretli** — IoT veya analitik kuralları otomatik olarak bilet oluşturabilir (örneğin, pil anomalisinde)

Her yeni bilet bu listeye bir durumla (genellikle _Beklemede_) gelir ve SLA zamanlayıcısı başlar.

## Filtreler

| Filtre         | Tür       | Notlar                                                                                      |
| -------------- | --------- | ------------------------------------------------------------------------------------------ |
| Ara            | Metin     | Bilet ID'si, araç etiketi, raporlayan, konumda arama yapar                                 |
| Durum          | Açılır liste | Arka uç tarafından belirlenen liste (`Beklemede`, `Devam Ediyor`, `Çözüldü`, `Reddedildi`, `Yinelenen` vb.) |
| Şikayet türü  | Açılır liste | 7 tür — aşağıdaki referansa bakınız                                                        |

Filtreler VE ile birleştirilir. Seçenekler tablonun üstünde görünür; URL mevcut durumu yansıtır.

## Sütunlar

| Sütun        | Sıralanabilir mi? | İçerik                                                        |
| ------------ | ---------------- | ------------------------------------------------------------- |
| **Fotoğraf** | —                | Sürücünün kanıt fotoğrafının küçük resmi (büyütmek için tıklayın) |
| **Araç**     | —                | Araç etiketi ve modeli; araç detayını açmak için tıklayın       |
| **SLA**      | —                | SLA süresi bitimine kalan zaman (süre aşılırsa kırmızı olur)    |
| **Konum**    | —                | Sorunun bildirildiği yer — koordinatlar ve/veya adres          |
| **Raporlayan** | —              | Sorunu bildiren kişi (sürücü adı veya sistem/operatör etiketi) |
| **Durum**    | —                | Renkli durum etiketi (aşağıdaki referansa bakınız)             |
| **Tarih**   | —                | Oluşturulma / güncellenme zaman damgaları                      |

## Şikayet türleri

Yedi tür, biletlerin hızlıca üçlenmesine yardımcı olur. Her biri renk kodludur:

| Tür                   | Rozet rengi       | Genellikle ne anlama gelir                                  |
| --------------------- | ----------------- | ----------------------------------------------------------- |
| **Mekanik hasar**     | Yıkıcı (kırmızı)  | Kaza, kırık çerçeve, eğilmiş parçalar                      |
| **Elektrik sorunu**   | Uyarı (sarı)      | Gaz kelebeği, ışıklar, sensör problemleri                   |
| **Pil problemi**      | Varsayılan (mavi) | Şarj olmuyor, beklenenden hızlı tükeniyor                    |
| **Kırık parçalar**    | Yıkıcı (kırmızı)  | Eksik ayak dayama, eksik reflektör, hasarlı frenler         |
| **Güvenlik endişesi** | Yıkıcı (kırmızı)  | Aracın sürüş için güvensiz hale getiren her şey              |
| **Temizlik**          | Uyarı (sarı)      | Kirli, koku, yapışkan yüzeyler — daha düşük öncelik          |
| **Diğer**             | Çerçeveli         | Yukarıdaki kategorilere uymayan — açıklamayı okuyun          |

Kırmızı kategoriler genellikle aracın hemen hizmet dışı bırakılmasını gerektirir; sarı/mavi ise genellikle servis zamanına kadar bekleyebilir.

## Durum referansı

Durum listesi arka uçtan alınır, bu nedenle dağıtıma göre biraz değişebilir. Tipik durumlar:

| Durum           | Varyant           | Anlamı                                                        |
| --------------- | ----------------- | ------------------------------------------------------------- |
| **Beklemede**   | İkincil (gri)     | Yeni bildirildi, henüz kimse üzerinde çalışmadı               |
| **Devam Ediyor**| Varsayılan (mavi) | Bir operatöre atandı veya bakım görevi oluşturuldu            |
| **Çözüldü**     | Başarılı (yeşil)  | Sorun giderildi; bilet kapatıldı                              |
| **Reddedildi**  | Yıkıcı (kırmızı)  | Operatör bunun gerçek bir sorun olmadığını belirledi          |
| **İptal Edildi**| Yıkıcı (kırmızı)  | Çözüm olmadan kapatıldı (genellikle düşük kaliteli raporlar için) |
| **Arşivlendi**  | Çerçeveli          | Eski / tarihsel                                              |
| **Yinelenen**   | (kapalı)           | Aynı araçta önceki bir bilete bağlı                            |

_Çözüldü_, _Reddedildi_ veya _Yinelenen_ içeren durumlar **kapalı** sayılır — artık açık kuyrukta sayılmazlar.

## Şiddet

İçsel olarak, biletler şikayet türü ve operatör/sistem girdisine bağlı olarak bir şiddet derecesi (`critical`, `high`, `medium`, `low`) taşır. Liste sayfası şiddeti **şikayet türü rengi** ve **SLA zamanlayıcı rengi** ile gösterir — kritik bir biletin süresi aşılmış SLA'sı en önceliğinizdir.

## Satır eylemleri

Her satırda tek aktif öğesi olan bir **üç nokta menüsü** vardır:

| Eylem            | Ne yapar                                                                |
| ---------------- | ----------------------------------------------------------------------- |
| **Detayları görüntüle** | Bilet detay sayfasını açar (tam ileti dizisi + kanıtlar + çözüm eylemleri) |

Operatörün tüm eylemleri (Atama, Aracı Engelle, Bakım görevi oluştur, Kullanıcıya kredi ver, Yanıtla, Yineleneni birleştir) **bilet detay sayfasında** bulunur ve dağıtıma göre özellik bayrağı ile açılıp kapatılır. Listenin görevi çözüm konsolu değil, üçleme kuyruğu olmaktır.

## Sayfa eylemleri

- **Otomatik İnceleme** — [Bilet Otomatik İnceleme kuyruğunu](ticket-auto-review.md) açar — tek seferde tek bilet için sadeleştirilmiş inceleme

## Tipik iş akışları

- **Günlük üçleme** — `Durum = Beklemede` olarak filtrele → SLA'ya göre sırala (en eski ilk, en yakın son tarih en üstte) → sırayla incele, her birini detayda aç, karar ver ve işlem yap
- **Sadece kritik üçleme** — `Şikayet türü = Mekanik hasar / Güvenlik endişesi` olarak filtrele → bunlar hizmet dışı bırakılacak biletlerdir
- **Araç geçmişi kontrolü** — araç etiketi ile ara → bu birimde şimdiye kadar açılmış tüm biletleri gör → tamir sonrası tekrar göndermeden önce faydalıdır
- **SLA alarmı** — SLA'ya göre sırala → listenin en üstündeki biletler süresi geçmiş → hemen yükselt

## İpuçları

- **Fotoğraf ilk sinyalinizdir** — bileti açmadan önce bile küçük resim gerçek bir hasar bildirimi mi yoksa düşük kaliteli bir gönderim mi olduğunu gösterir
- **SLA kırmızı == hemen harekete geç** — SLA kırmızıya döndüğünde sözleşme süresini zaten kaçırmışsınız demektir; bu sizin reaktif kuyruğunuzdur
- **Araçla çapraz kontrol yapın** — araç sütununa tıklayın → aracın Uyarılar sekmesini açın → IoT sorunları ve operatör raporları genellikle örtüşür
- **Yinelenenlere dikkat edin** — birden fazla sürücü genellikle aynı kırık scooter'ı saatler içinde bildirir; çözmeden önce bunları Araç arama ile tespit edin
- **URL paylaşılabilir** — filtrelenmiş bir görünümü (örneğin _beklemedeki mekanik hasar biletleri_) kopyalayın ve bakım ekibine gönderin
