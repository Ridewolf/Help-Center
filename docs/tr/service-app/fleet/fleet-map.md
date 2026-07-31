# Filo Haritası ve QR Araç Arama

Filo haritası (`/battery-swap`), Servis uygulamasının oturum açıldıktan sonraki açılış ekranıdır: filonuzun tam ekran haritası ve alt kısımda yüzen bir dizi eylem düğmesi bulunur. Her saha işi burada başlar — aracı bulun, ardından açın.

Bu ekrandan bir araç açmak sizi kontrol düğmelerinin bulunduğu [Araç sayfasına](vehicle-controls.md) götürür. Uygulamanın menüsü ve ayarları için [Servis uygulaması genel bakışına](../basics/overview.md) bakın.

## Haritayı okuma

Her araç haritada bir işaretçidir. Her işaretçinin arkasında uygulama, sahada ihtiyacınız olan değerleri tutar:

- Etiket ve durum
- Araç pil yüzdesi
- İzleyici pil yüzdesi
- Konum, yön ve km/saat cinsinden hız
- Kilitli veya kilitsiz
- Mobil sinyal kalitesi, 0 ile 36 arasında bir değer olarak
- GPS durumu ve izleyicinin çevrimiçi olup olmadığı
- İzleyicinin IMEI numarası

Bir işaretçiye dokunarak o aracı açın.

### Liste görünümü

Tam ekran bir liste haritanın üzerinde kayar ve mevcut filtrelerle eşleşen tüm araçları gösterir. Kendi başlığı, haritaya dönme ve filtreleri açma düğmelerini taşır ve liste açıkken alt eylem düğmesi satırı gizlenir.

Bir satıra dokunmak, o aracın işaretçisine dokunmakla aynı araç sayfasını açar — iş için hangisi daha hızlıysa onu kullanın.

## Araçları filtreleme

Filtreler bir filtre sayfasında bulunur ve **cihazınızda kaydedilir** — uygulamayı kapatıp açsanız bile kalır. Bir aracın "kaybolmasının" en yaygın nedeni budur: dün ayarlanmış bir filtre bugün de uygulanıyordur.

Kontroller, sırasıyla:

| Kontrol              | Ne işe yarar                                                                            |
| -------------------- | --------------------------------------------------------------------------------------- |
| **Durum etiketleri** | Duruma göre filtreler; etiketler, canlı haritadaki durum noktalarının renkleriyle eşleşir |
| **Pil aralığı**      | 0–100% arası bir kaydırıcı                                                                |
| **Araç türü**        | Bir tür karuseli — filonuzda birden fazla araç türü varsa gösterilir                      |
| **Son sinyal**       | Ön ayarlar: herhangi, 1s, 6s, 24s, 7g — seçilen süreden daha uzun süredir çevrimdışı olan araçları gizler |
| **Etiketler**        | Öncelikle alfabetik sırayla genel etiketler, ardından kilit simgesiyle özel etiketler    |
| **Arama**            | Serbest metin, etiket, VIN veya IMEI ile eşleşir                                        |

Aklınızda tutmanız gereken iki davranış:

- **Birden çok etiket AND mantığıyla çalışır** — bir aracın sonuçlarda kalması için *her* seçili etikete sahip olması gerekir.
- **Etiketler sessizce yüklenir.** Etiket listesi yüklenemezse, etiketler görünmez ve hata gösterilmez. Tekrar denemek için sayfayı kapatıp açın.

Düşük kontrastlı durum renkleri (örneğin şarj oluyor ve boşalmış) açık modda okunabilir kalmaları için koyu metinle gösterilir; koyu mod parlak rengi korur.

Sayfa her zaman kaydedilmiş filtreleriniz uygulanmış şekilde yeniden açılır.

## QR kod ile araç açma

1. **Tarayıcı** eylem düğmesine dokunun.
2. Kamerayı aracın QR koduna doğrultun. Zaten aracı tanımlayan kodlar hemen açılır; diğerleri etiket, VIN veya IMEI ile aranır. Birden fazla araç eşleşirse, tam etiket eşleşmesi kazanır.
3. Uygulama o aracın sayfasını açar.

[Toplu modda](../operations/batch-mode.md), aynı tarama aracı açmak yerine kuyruğa ekler.

### Kod taranmazsa

Manuel giriş yedeklemesini kullanın: modale **etiket**, **VIN** veya **IMEI** yazın. Aynı arama kullanılır, böylece tarayıcının açabileceği her şey yazılarak da açılır.

Tanınmayan bir kod geçersiz kod hatası gösterir. Tarayıcı ayrıca bir süre sonra otomatik kapanır — tekrar açmak için düğmeye dokunun.

## Bilet çekmecesi ve açıklama

- **Biletler** eylem düğmesi, açık destek biletlerinin sayılarıyla birlikte bir çekmece açar. Bu, sürücülerin bildirdiklerini görmenin saha kısayoludur ve [Back-office tools](../tools/back-office-tools.md#destek--biletler) bölümünde anlatılan tam destek kuyruğundan ayrıdır.
- **Açıklama** modali, haritadaki işaretçi şekillerini ve durum renk kodlamasını açıklar. Rengi bilmiyorsanız tahmin etmek yerine açın.

## Harita tercihleri

Haritanın **sağ üst köşesindeki** bir kontrol — uygulama genelindeki **Ayarlar** çekmecesi değil — harita tercihlerini açar. Şunları kapsar:

- İşaretçi stili (ikon, nokta, otomatik) ve işaretçi boyutu
- Katmanlar: pil yüzdesi, etiketler, durum halkaları, alarmlar, biletler
- Kümeleme
- Bölgeler
- Kendi konumunuz
- Yumuşak hareket
- Uyandırma kilidi (çalışırken ekranı açık tutar)
- Yenileme hızı

Harita çok kalabalıksa bunları değiştirin: daha temiz bir görünüm için katmanları kapatın veya yoğun bir alanda kümelemeyi açın.

## Yaygın sorunlar

| Belirti                                    | Ne yapılmalı                                                                                   |
| ------------------------------------------ | ---------------------------------------------------------------------------------------------- |
| Beklediğiniz bir araç eksik                | Kaydedilmiş bir filtre hala uygulanıyor — durum etiketlerini, pil menzilini ve özellikle son sinyal penceresini kontrol edin |
| Filtrelerde araç türü kaydırıcısı yok      | Filonuzda sadece bir araç türü var; bu normaldir                                              |
| Hiç etiket etiketi yok                      | Etiket listesi yüklenmedi. Filtre sayfasını kapatıp yeniden açarak tekrar deneyin               |
| Bir etiket kombinasyonu hiçbir şey döndürmüyor | Etiketler VE (AND) ile birleştirilir — bir etiketi kaldırın                                    |
| Taranan bir kod tanınmıyor                  | Kodun şirketinizdeki bir araca ait olduğundan emin olun, ardından etiket, VIN veya IMEI ile manuel giriş yapın |
| Tarayıcı kendi kendine kapanıyor            | Belirli bir süre hareketsizlikten sonra zaman aşımına uğrar — tekrar açın                      |

## İpuçları

- **Vardiya başında filtrelerinizi temizleyin.** Filtreler kalıcıdır ve eski bir son sinyal penceresi tam olarak bulmanız gereken araçları gizler.
- **Ölü izleyicileri bulmak için son sinyal ön ayarlarını kullanın** — `7d` olarak ayarlayın ve sessiz kalanları arayın.
- **Arama IMEI kabul eder**, bu yüzden sadece izleyici numarası olan bir etiket bile aracı açmak için yeterlidir.
- **Manuel giriş bir gerileme değildir** — tarayıcıyla aynı şekilde çözülür, bu yüzden bir kod hasarlı görünüyorsa hemen kullanın.
