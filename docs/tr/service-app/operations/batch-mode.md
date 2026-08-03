# Toplu Mod — Birden Fazla Aracı Kuyruğa Alma

Toplu mod (`/batch`), birkaç aracı tek bir kuyruğa toplar, böylece yan yana görebilir ve her birini tekrar aramadan sırayla işleyebilirsiniz. Ana ekrandan veya [filo haritasının](../fleet/fleet-map.md) boş durumundaki tarama bağlantısından erişebilirsiniz.

**Önce bunu okuyun:** toplu mod bir iş listesi olup toplu komut aracı değildir. Ekranın altındaki grup işlem düğmeleri **şu anda uygulamada kullanılamamaktadır**. Her araç üzerinde işlem yapmak için kendi [araç sayfasını](../fleet/vehicle-controls.md) kullanırsınız.

## Araç ekleme

1. Toplu modu açın.
2. Bir aracın QR kodunu tarayın — tarayıcı filo haritasında kullanılanla aynıdır, bu yüzden aynı arama kuralları geçerlidir (etiket, VIN veya IMEI).
3. Her başarılı tarama, aracı **boşta** durumda kuyruğa ekler.
4. Listeye eklemek istediğiniz her araç için tekrarlayın.

Uzun kuyruklar da duyarlıdır, bu yüzden listeyi kısa tutmanın pratik bir nedeni yoktur, kendi vardiya planınız dışında.

## Kuyruğu okuma

Her satır şunları gösterir:

| Öğe                 | Nasıl okunur                                                                            |
| -------------------- | ---------------------------------------------------------------------------------------- |
| **Etiket**           | Aracın kodu                                                                             |
| **Batarya çubuğu**   | %10 veya altında kırmızı, %20 veya altında turuncu, %40 veya altında amber, %40 üstü yeşil |
| **İzleyici bataryası**| İzleyicinin kendi şarj durumu                                                           |
| **Bağlantı simgesi** | İzleyicinin çevrimiçi veya çevrimdışı olup olmadığı                                      |
| **Durum**            | Aracın mevcut durumu                                                                     |
| **Satır durumu**     | boşta, çalışıyor, tamam, veya başarısız                                                  |

Başarısız bir satır, telemetri yerine hata mesajını gösterir, böylece kuyruğu terk etmeden neyin yanlış gittiğini görebilirsiniz.

**Herhangi bir satıra dokunmak o aracın sayfasını açar** — araç üzerinde işlem yapmanın yolu budur: onları burada kuyruğa alın, sonra tek tek işleyin.

## Araçları kaldırma

- **Bir satırdaki çöp kutusu simgesi** o aracı kuyruktan kaldırır. Araca hiçbir şey göndermez — kaldırma sadece sizin listenizi etkiler.
- **Başlıktaki çöp kutusu simgesi** onay sonrası tüm kuyruğu temizler. Toplu işlem çalışıyor olarak işaretliyse devre dışıdır.

## Grup işlemleri

Ekranın altında beş düğme vardır: bir ayar dişlisi, kilit açma, zil, şimşek ve katmanlar. **Bu grup işlemleri şu anda uygulamada kullanılamamaktadır.** Birine dokunmak herhangi bir araca bir şey göndermez.

Kilidi açmak, bip sesi vermek, batarya değiştirmek veya izleyici komutu göndermek için, kuyruğun içinden aracı açın ve [araç sayfasındaki](../fleet/vehicle-controls.md) kontrolleri kullanın:

- Kilitleme ve kilit açma — **Sürüş Modu**
- Konum bulucu sesi — **Bip**
- [Batarya değişimi](battery-swap.md) — zamanlı değişim dizisi
- Satıcı komutları — **Komutlar** sayfası

## Yaygın sorunlar

| Belirti                                        | Anlamı                                                                            |
| ---------------------------------------------- | --------------------------------------------------------------------------------- |
| Grup işlemi düğmesine basmak hiçbir şey yapmıyor gibi | Doğru — grup işlemleri şu anda kullanılamıyor. Her aracı kendi sayfasından işleyin |
| Tümünü temizle düğmesi gri görünüyor             | Toplu işlem çalışıyor olarak işaretlenmiş                                         |
| Bir satır batarya veya bağlantı göstermiyor     | Bu değerler o araç için bilinmiyor — sıfır değil                                 |
| Taranan araç görünmedi                           | Kod çözümlenemedi. Kurallar filo haritasındakiyle aynı: etiket, VIN veya IMEI      |

## İpuçları

- **Kuyruğu bir rotanın başında oluşturun.** On aracı bir avluda bir kez taramak, onları sonra tek tek aramaktan iyidir.
- **Batarya renklerini iş sıralamanız için kullanın** — önce kırmızılar, bunlar sürücünün sonraki rapor edeceği araçlardır.
- **Kuyruk sadece size aittir**, bu yüzden bir satırı kaldırmak meslektaşlarınız veya araç için hiçbir şeyi değiştirmez.
- **Filo çapında işlemler için Gösterge Panelini kullanın.** Toplu durum değişiklikleri, toplu etiketler ve toplu komutlar [Gösterge Paneli Araçlar listesinde](../../operations/fleet/vehicles.md#toplu-işlemler) bulunur.
