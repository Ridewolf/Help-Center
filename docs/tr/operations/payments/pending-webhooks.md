# Bekleyen Webhook'lar

Bekleyen Webhook'lar sayfası (`/payments/pending-webhooks`), ödeme sağlayıcısının webhook onayı henüz gelmediği için **Beklemede** kalan ödeme işlemlerini listeler.

Her satır, sağlayıcıya gönderdiğimiz ancak nihai durum geri çağrısını almadığımız bir ödemedir. Bu sayfayı **ödeme-takılı kuyruk** olarak kullanın: eski satırları tarayın, geciken sağlayıcıyı belirleyin ve yükseltin.

Gerekli izin: **Ödemeler** (`m1n2p3`).

## İncelediğiniz şey

Bir müşteri ödeme yaptığında:

1. Gösterge Paneli, bir **sağlayıcıya** (Stripe, geçit vb.) ödeme talebi gönderir — bir _Ödeme Niyeti_ oluşturulur
2. Sağlayıcı işlemi asenkron olarak işler ve nihai durumu içeren bir **webhook** gönderir (`succeeded`, `failed` vb.)
3. Gösterge Paneli webhook'u alır ve [ödeme](payments.md) durumunu _Beklemede_'den _Tamamlandı_ / _Başarısız_ olarak değiştirir

**Bekleyen Webhook'lar** satırları 2. adımda asılı kalmıştır — sağlayıcı ile iletişime geçildi ancak takip edilmedi. Çoğu zaman webhook saniyeler içinde gelir, bazen dakikalar alır. Yaklaşık 30 dakikadan eski olanlar şüphelidir; 2 saatten eski olanlar neredeyse kesinlikle sağlayıcı tarafında veya webhook alıcımızda sorun vardır.

## Filtreler

| Filtre          | Tür     | Notlar                                                                             |
| -------------- | ------- | --------------------------------------------------------------------------------- |
| **Sağlayıcı**  | Metin   | Sağlayıcı adına göre arama yapın (örneğin `stripe`)                               |
| **Daha eski**  | Seçim   | `Tümü` / `5` / `15` / `30` / `60` / `120` dakika — sadece bu süreden daha eski satırları göster |

Günlük izleme filtresi olarak _30 dakikadan eski_ veya _60 dakikadan eski_ kullanın — yeni bekleyenler gürültüdür.

## Sütunlar

| Sütun                 | Sıralanabilir mi? | İçerik                                                               |
| --------------------- | ---------------- | ------------------------------------------------------------------- |
| **Oluşturulma zamanı**| ✓                | Ödeme niyetinin oluşturulduğu zaman                                 |
| **Yaş**               | ✓                | Oluşturulma süresinden itibaren dakika — renk kodlu (aşağıya bakınız) |
| **Sağlayıcı**         | —                | Ödeme niyetinin gönderildiği sağlayıcı                              |
| **Ödeme Niyeti ID**   | —                | Sağlayıcının bu niyet için ID'si — yükseltirken bunu kopyalayın     |
| **Durum**             | —                | Sağlayıcı tarafı durumu (ham) — genellikle `requires_action` / `processing` |
| **Sipariş ID**        | —                | Dahili sipariş/ödeme ID'miz                                        |

### Yaş renk kodlaması

**Yaş** sütunu yaşlandıkça renk değiştirir, böylece hızlıca tarayıp önceliklendirebilirsiniz:

| Yaş             | Renk   | Yapılacaklar                                   |
| -------------- | ------ | ---------------------------------------------- |
| **< 30 dk**    | Gri    | Normal; görmezden gel                           |
| **30–120 dk**  | Sarı   | Bir göz atmaya değer; sağlayıcının gösterge panelini kontrol edin |
| **> 120 dk**   | Kırmızı| Neredeyse kesinlikle bozuk — yükseltin          |

## Satır eylemleri

Her satırın sağında küçük bir eylem menüsü:

| Eylem            | Ne yapar                                               |
| ---------------- | ------------------------------------------------------ |
| **Müşteriyi görüntüle** | Bu ödeme niyetine bağlı müşteri profilini açar          |

(_Ödeme detayını görüntüle_ eylemi kodda var ancak ödeme detay sayfası özellikten kaldırıldığı için geçici olarak devre dışı — daha sonra geri gelecek.)

## Tipik iş akışları

- **Günlük izleme** — _Daha eski = 30 dk_ olarak ayarlayın → sayfa çoğu zaman boş olmalı → değilse sağlayıcı sütununu tarayın
- **Tek sağlayıcı kesintisi** — aynı sağlayıcıya ait birçok satır sarı/kırmızıya döner → sağlayıcının durum sayfasını kontrol edin → tablodan birkaç _Ödeme Niyeti ID'si_ ile desteklerine başvurun
- **Tek müşteri sorunu** — bir veya iki eski satır → _Müşteriyi görüntüle_ → müşterinin [Aktivite / Ödemeler](../customers/client-detail.md) sayfasını kontrol edin → tekrar denemelerini veya farklı bir yöntem kullanmalarını söyleyin
- **Webhook alıcı sorunu** — birçok sağlayıcı aynı anda kırmızı olur ama sağlayıcı tarafında kesinti yoktur → sorun bizim webhook alıcımızda; mühendislik ekibine yükseltin

## Bir satır ne zaman kaybolur

Webhook geldiğinde bir satır bu sayfadan çıkar — ödeme durumu ana [Ödemeler listesi](payments.md) sayfasında _Tamamlandı_ veya _Başarısız_ olarak değişir. Satır kendi kendine "yaşlanmaz"; sadece bir webhook onu temizler.

Eğer **bir günden eski takılı bekleyenler** varsa ve gitmiyorsa, bu yükseltilecek bir hatadır — operatör gösterge panelinde güvenlik nedeniyle manuel "zorla tamamlama" butonu yoktur (yanlış manuel tamamlama muhasebe karışıklığı yaratır ve geri alınması zordur).

## İpuçları

- Sağlayıcıya yükseltirken **Ödeme Niyeti ID'sini kopyalayın** — sağlayıcının tanıdığı tek ID budur
- **Yaşa göre sıralama** (en yeniden en eskiye) size önceliklendirme kuyruğu verir: sıralı listenin en üstü acil işinizdir
- **Boş sayfa hedefiniz olsun** — Bekleyen Webhook'lar normal bir günde boş (veya neredeyse boş) olmalıdır; herhangi bir satırı yapılacak iş olarak görün
- **Sağlayıcı araması gevşektir** — kısmi eşleşmeler çalışır (`stri` `stripe` ile eşleşir)
- **Sayfa otomatik yenilenmez** — aktif önceliklendirme yaparken yenile butonunu kullanın veya sayfayı yeniden yükleyin
