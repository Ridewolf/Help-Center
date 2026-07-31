# Görev Onayları

Görevler, **platformun sürücülerden ödül karşılığında yapmalarını istediği oyunlaştırılmış görevlerdir** — ve Görev Onayları (`/support/quest-confirmations`), bir operatörün sürücünün gönderdiği kanıtları inceleyip ödeme yapıp yapmamaya karar verdiği yerdir.

Dört görev türü vardır:

- **batarya** — batarya ile ilgili bir görev
- **kayıp** — kayıp bir eşyanın iadesi
- **temizlik** — bir aracın temizlenmesi
- **park** — park etme görevi

> **Uyarı: bu sayfa önizlemedir.** Burada verilen kararlar **şu anda kaydedilmez ve ödül ödenmez** — inceleme iş akışı, özellik tamamen ürünleştirilmeden önce görünür durumdadır. Bu ekrandan sürücüye görevinin ödendiğini söylemeyin.

## Nerede bulunur

**Yan menüde bir giriş yoktur** — Yan menüdeki Destek grubunda sadece Park Kanıtları, Biletler ve Konuşmalar bulunur. Sayfaya doğrudan `/support/quest-confirmations` yazarak ulaşılır.

Sayfa yalnızca **Gelişmiş modda** kullanılabilir; Kolay (Lite) modda engellenmiştir. Normal operatör gezinmesinin parçası değil, liste dışı bir ileri düzey kullanıcı yüzeyi olarak değerlendirin — tıpkı [Error Logs](../../apps/tools/error-logs.md) gibi.

Liste ve detay aynı sayfada bulunur: bir gönderim seçildiğinde, başka bir sayfaya gitmek yerine **yerinde bir detay paneli açılır**. Panele dönmek için panel başlığındaki **Listeye Geri Dön** kullanılır.

## Liste görünümü

| Filtre          | Seçenekler                             |
| -------------- | -------------------------------------- |
| **Durum**      | Tümü / Beklemede / Onaylandı / Reddedildi |
| **Görev türü** | Tümü / Batarya / Kayıp / Temizlik / Park |
| **Ara**        | Kullanıcı, görev veya araç bazında     |
| **Temizle**    | Tüm filtreleri sıfırlar                |

Listenin üstündeki istatistik özeti, **bekleyen sayısını**, bugün **kaçının onaylandığını**, bugün **kaçının reddedildiğini** ve **ortalama inceleme süresini** dakika cinsinden gösterir.

## Bir gönderimi inceleme

1. Bir gönderim satırına tıklayarak detay panelini açın.
2. Kanıtları okuyun:
   - **fotoğraf ızgarası**
   - sürücü aracın kodunu taradıysa bir **QR rozeti**
   - konum yakalandıysa metre cinsinden doğruluk içeren bir **GPS rozeti**
   - sürücü bir yorum bıraktıysa **yorum**
3. Karar verin:
   - **Onayla ve Ödülü Öde** onayı doğrudan uygular — **onay diyaloğu yoktur**, bu yüzden dikkatli tıklayın.
   - **Gönderimi Reddet** bir reddetme nedeni açılır menüsü (**zorunlu**) ve isteğe bağlı bir yorum gösterir; ardından **Reddetmeyi Onayla** düğmesine basılır.

Sadece **beklemede** olan gönderimler incelenebilir. Karar verilmiş gönderimlerde İncele yerine **Görüntüle** düğmesi bulunur.

Reddetme nedenleri: `wrong-vehicle`, `poor-quality`, `wrong-location`, `incomplete`, `fraud`, `other`.

## Bir gönderim neler içerir

- Gönderim zamanı, **kullanıcı**, talep edilen **görev** ve ilgili **araç**
- **QR bayrağı** — sürücünün araç QR kodunu tarayıp taramadığı
- **Fotoğraflar** — her biri neyi gösterdiğiyle etiketlenmiş
- **GPS** — etiketli enlem/boylam ve metre cinsinden doğruluk (yüksek değer konumun belirsiz olduğunu gösterir)
- **Ödül** — örneğin belirli bir tutara kadar ücretsiz sürüş gibi ödemeyi açıklayan serbest metin
- **Kullanıcı yorumu** — sürücünün isteğe bağlı notu
- Karar verildikten sonra **İnceleyen / zaman** ve isteğe bağlı **reddetme yorumu**

## Yaygın sorular

- **Onaylamak gerçekten ödülü öder mi?** Bugün değil — sayfa önizlemedir ve kararlar kaydedilmez.
- **Onayda neden onaylama adımı yok?** Onayla ve Ödülü Öde, mevcut uygulamada doğrudan bir işlemdir. Dikkatli tıklayın.
- **Bir gönderimde QR veya GPS rozeti yok — bu sahtekarlık mı?** Her iki sinyal de isteğe bağlıdır. Eksik rozeti herhangi bir kanıt olarak değil, fotoğraflarla birlikte değerlendirin.
- **GPS doğruluk değeri çok yüksek — ne anlama geliyor?** Cihaz konumun belirsiz olduğunu bildirdi; konum sadece yaklaşık bir gösterimdir.
- **Karar verilmiş bir gönderimi yeniden açabilir miyim?** Hayır — onaylanmış ve reddedilmiş gönderimler sadece Görüntüle seçeneği sunar.
- **Menüde bulamıyorum.** Menüde giriş yoktur; URL'yi doğrudan, Gelişmiş modda yazın.
