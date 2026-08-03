# Konuşmalar

Konuşmalar sayfası (`/support/conversations`), **operatör mesajlaşma** alanıdır — destek ekibiniz ile sürücüleriniz arasında gerçek zamanlı sohbet arayüzü. Her konuşma bir müşteriye aittir ve tam mesaj geçmişini, ekibinizin eylemlerini ve durum değişikliklerini içerir.

Gerekli izin: **Konuşmalar** (`x2y3z4`).

## Konuşmaların burada görünme şekli

Konuşmalar birkaç akıştan gelir:

1. **Sürücü mobil uygulamada sohbet açar** — _Yeni_ bir konuşma oluşturur, _Beklemede_ kuyruğuna girer
2. **Operatör başlatır** — kenar çubuğundaki _+ Yeni_ ile belirli bir müşteriyle sohbet başlatabilirsiniz (örneğin ceza takibi veya dolandırıcılık kontrolü için)
3. **Yeniden açılanlar** — kapatılmış konuşmalar (sürücü veya operatör tarafından) yeniden açılabilir ve listenin en üstüne gelir

Liste **canlıdır** — yeni konuşmalar ve gelen mesajlar WebSocket üzerinden yenileme olmadan akar.

## Düzen

Sayfa iki ana alana sahiptir. Düzen ekran boyutuna uyum sağlar:

- **Masaüstü** — bölünmüş görünüm, sol tarafta kenar çubuğu (%30) ve sağda sohbet içeriği (%70), sürüklenebilir tutamaç ile
- **Mobil** — bir seferde bir alan: kenar çubuğu listesi veya açık sohbet (geri oku listeye döner)

## Kenar çubuğu (sol)

Konuşma kuyruğu ve filtreler:

- **+ Yeni** — bir müşteri aramak ve yeni bir konuşma başlatmak için bir iletişim kutusu açar (durum _Beklemede_)
- **Ara** — müşteri adı, kimliği, son mesajda metin araması
- **Durum filtreleri** — sayaçlı butonlar: `Tümü` / `Yeni` / `Beklemede` / `Aktif` / `Gecikmeli` / `Kapalı`
- **Konuşma kartları** — her biri: avatar, müşteri adı, son mesaj önizlemesi, durum butonu, zaman damgası, okunmamış rozeti gösterir. Açmak için tıklayın
- **Daha fazla yükle** — kaydırırken sayfalama

Varsayılan sıralama, yanıtlanmamışları (Beklemede / okunmamış Aktif) en üste koyar — en acil sohbetler her zaman gözünüzün önündedir.

### Durum referansı

| Durum       | Anlamı                                                      |
| ----------- | ----------------------------------------------------------- |
| **Yeni**    | Yeni açıldı, henüz kimse okumadı                            |
| **Beklemede** | Atanmamış, herhangi bir operatörün alması için sırada      |
| **Aktif**   | Bir operatöre atanmış, konuşma devam ediyor                 |
| **Gecikmeli** | Operatör beklemeye aldı (bilgi bekleniyor, sonra takip)    |
| **Kapalı**  | Çözüldü ve kapatıldı                                        |

## Sohbet içeriği (sağ)

Bir konuşma seçtiğinizde, sağ sütun şunları gösterir:

### Sohbet başlığı

- **Geri oku** (sadece mobil) — kenar çubuğu listesine döner
- **Başlık** — müşteri adı ve konuşma durum butonu
- **Bilgi aç** — tam müşteri bağlamı için [Kullanıcı Bilgisi kenar çubuğunu](#bilgi-panelleri) açar
- Duruma bağlı olarak **Geciktir / Aktar / Kapat** düğmeleri

### Sohbet penceresi

- **Mesaj baloncukları** — operatör mesajları sağda (vurgulu renk), sürücü mesajları solda; zaman damgaları ve okundu göstergeleri ile
- **Yazma göstergesi** — sürücünün yazdığını gösterir
- **Daha eskiyi yükle** düğmesi üstte — önceki mesajları talep üzerine getirir
- **Yeni mesajlara git** düğmesi — yukarı kaydırdıysanız en alta hızlı kaydırma
- **Mesaj eylemleri** üzerine gelince — Kendi mesajlarınızda Düzenle / Sil

### Hazır yanıtlar

Girişin üstünde kategoriye göre gruplanmış hızlı yanıt şablonları satırı vardır. Birine tıklayın, metin girişe düşer — göndermeden önce düzenleyebilirsiniz.

### Sohbet altbilgisi

Altbilgide görünenler konuşma **durumu** ve atamaya bağlıdır:

- **Aktif + size atanmış** → ekli menülü **Mesaj girişi** (metin + resim / dosya)
- **Diğer durumlar** → mevcut duruma uygun düğmelerle **Konuşma Eylemleri** çubuğu

## Konuşma eylemleri (duruma göre)

Altbilgi, mevcut duruma uygun düğmeleri gösterir. Yaygın eylemler:

| Eylem         | Ne zaman kullanılabilir…             | Ne yapar                                             |
| ------------- | ------------------------------------ | ----------------------------------------------------- |
| **Kabul et**  | Beklemede / Yeni (henüz size ait değil) | Konuşmayı size atar ve _Aktif_ yapar                   |
| **Devral**    | Aktif (başka bir operatörün)          | Size yeniden atar                                    |
| **Geri ver**  | Aktif (size atanmış)                   | Konuşmayı _Beklemede_'ye bırakır                      |
| **Geciktir**  | Aktif                                | Konuşmayı beklemeye alır → _Gecikmeli_                |
| **Yeniden aç**| Kapalı                               | Konuşmayı tekrar _Aktif_ yapar                         |
| **Kapat**     | Aktif                                | Konuşmayı çözüldü olarak işaretler → _Kapalı_         |
| **Sil**      | İzin gerektirir                      | Konuşmayı yumuşak siler (yönetici tarzı)              |
| **Yeni**      | Her zaman                           | Aynı müşteriyle yeni bir konuşma başlatır             |

Sohbet size ait değilse işlem yapmanız engellenir — sohbet başka birine atanmışsa mesaj girişi yerine _Devral_ düğmesi görürsünüz.

## Bilgi panelleri

Sohbet penceresi eylemlerinden açılan iki kayan panel:

- **Kullanıcı Bilgisi Kenar Çubuğu** — atanan operatör için hızlı bağlam (siz), bu sohbette sürücünün son etkinlikleri
- **Müşteri Bilgi Sayfası** — sohbeti terk etmeden tam müşteri profili anlık görüntüsü (bakiye, durum, etiketler, son sürüşler) — hızlı kararlar için kullanışlı

## Boş durum (masaüstü)

Masaüstünde sohbet seçilmediğinde, sağ panel boş durum çizimi ve bir konuşma seçmeniz için ipucu gösterir. Mobilde sağ panel yoktur, kenar çubuğu listesi ekranı doldurur.

## Tipik iş akışları

- **Bekleyen bir sohbeti al** — `Status = Waiting` → üst kartı tıkla → _Kabul Et_ → sohbete başla
- **Bir ekip arkadaşının sohbetini devral** — sohbeti aç (başkasına ait olduğunu görürsün) → _Devral_ (dikkatli kullan; sürücünün devamlılığını keser)
- **Yavaş bir sohbeti soğut** — sürücü yanıt vermeyi bıraktığında, _Geciktir_ ile aktif kuyruğundan çıkar; yanıt verdiklerinde gelen kutuna geri döner
- **Sohbeti kapat** — sorun çözüldü → hızlı bir hazır yanıtla _Kapat_ ("Hepsi tamam, iyi sürüşler!")
- **Sürücünün bağlamını hızlıca öğren** — başlıktaki _Bilgileri Aç_ → fatura sorusuna yanıt vermeden önce bakiye / son sürüşler / etiketleri gör
- **Hazır yanıtları kullan** — tekrar eden cevaplar için (iade politikası, kayıp eşya süreci), bir şablon seç ve kişiselleştir

## İpuçları

- **Varsayılan olarak canlı** — yeni mesajlar yenileme olmadan akar; rozet sayacı otomatik güncellenir
- **Öncelikle yanıtlanmamışlar** — sıralama acil sohbetleri en üste getirir; liste sırasına güven
- **Hazır yanıtlar şablondur, metin değil** — selamlaşma ve kapanış cümlesini mutlaka kişiselleştir; sürücüler hazır metin aldıklarını anlar
- **Devralırken dikkatli ol** — sürücü operatör seviyesindeki durumu görmez. Sohbet ortasında geçiş sarsıcı olabilir; sadece mevcut operatör açıkça takılmışsa (çevrimdışı, mesai dışı) devral
- **Belirsiz durumlarda Kapat yerine Geciktir** — sorunun geri dönebileceğini düşünüyorsan, _Geciktir_ konuyu bağlı tutar; _Kapat_ sürücünün devam etmek isterse yeni sohbet açmasını gerektirir
- **Sadece kendi mesajlarını düzenle** — ve sadece küçük yazım hatalarını; sürücü okuduktan sonra eski mesajı yeniden yazmak güveni zedeler
- **URL sohbet kimliğini içerir** — bir bilet veya yükseltme notuna yapıştır, sonraki operatör doğrudan girebilir
