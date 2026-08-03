# Sürüş Detayı

Sürüş detay sayfası (`/rides/:id`), tek bir yolculuk için çalışma alanıdır. Şikayetleri incelemek, ücretleri denetlemek, operatör işlemleri yapmak (duraklat, iade et, arşivle) ve tam etkinlik günlüğünü gözden geçirmek için kullanılır.

Genellikle buraya [Sürüşler listesi](rides.md) içindeki bir satıra tıklayarak veya bir müşterinin profilinden gelirsiniz.

Gerekli izin: **Sürüşler** (`i1j2k3`).

## Düzen

Yukarıdan aşağıya:

1. **Başlık** — temel bilgiler + _Eylemler_ butonu
2. **Genel bakış kartları** — süre, mesafe, maliyet, durum
3. **Bilgi kartları** — sürüş bilgisi, döküm, tarife anlık görüntüsü
4. **Sekmeler** — Detaylar (rota haritası + zaman çizelgesi) ve Etkinlik (tam etkinlik günlüğü)

## Başlık

Üst şerit sürüşü hızlıca tanımlar:

- **Geri butonu** (`←`) listeye döner
- **Sürüş ID'si** ve _Kopyala_ simgesi
- **Durum etiketi** (Aktif, Tamamlandı, İptal Edildi, vb.)
- **Müşteri** ve **araç** bağlantıları
- **Başlangıç → bitiş zaman damgaları** ve **üst satır maliyeti**
- Sağdaki **Eylemler** butonu — eylem iletişim kutusunu açar (aşağıda açıklanmıştır)

## Eylemler

Başlıktaki **Eylemler** butonuna tıklayarak bu sürüş için mevcut tüm operatör eylemlerini içeren bir iletişim kutusu açın. Eylemler, sürüş durumu ve izinlerinize göre kendilerini devre dışı bırakır ve nedenini açıklayan bir araç ipucu gösterir:

| Eylem                 | Ne zaman etkin olur                     | İzin kapısı     |
| --------------------- | -------------------------------------- | --------------- |
| **Duraklat / Devam et** | Sürüş aktif olmalı duraklatmak veya devam ettirmek için | `pause-unpause` |
| **Sürüşü bitir**       | Sürüş aktif olmalı bitirmek için       | `end-ride`      |
| **Haritada rotayı görüntüle** | Her zaman (harita sekmesine atlar)    | —               |
| **Sürüşü iade et**     | Sürüş tamamlanmış olmalı iade için     | refund-related  |
| **Bildirim gönder**    | Her zaman (rider'a push gönderir)      | notification    |
| **Sürüşü arşivle**     | Her zaman                             | archive         |

Devre dışı bırakılmış bir eylemin üzerine gelerek neden kullanılamadığını görün (örneğin "İade için sürüş tamamlanmış olmalı").

Başlıktaki _Eylemler_ iletişim kutusu, mevcut olanların **üst kümesidir**; liste sayfasındaki satır menüsü yalnızca en yaygın üçü (Duraklat / Devam Et / Bitir) içerir. İadeler, rota görüntüleme, push bildirimleri ve arşivleme için buraya gelin.

## Genel bakış kartları

Başlığın altında dört küçük karttan oluşan bir satır, hızlıca bilgi verir:

- **Süre** — sürüşün toplam süresi
- **Mesafe** — kat edilen toplam mesafe
- **Maliyet** — tahsil edilen toplam ücret
- **Durum** — mevcut sürüş durumu (başlıktaki etiketi yansıtır, daha büyük ve belirgin)

## Bilgi kartları

Genel bakışın altında üç kartlık bir ızgara, sürüşün temel verilerini gösterir:

- **Sürüş bilgisi** — araç, müşteri, tarife, kimlikler, zaman damgaları
- **Döküm** — dakika dakika maliyet bileşenleri (başlangıç ücreti, zaman, mesafe, değişkenler, indirimler)
- **Tarife detayları** — bu sürüş için kullanılan tarife anlık görüntüsü (müşterinin aslında neye göre ücretlendirildiğini görebilmeniz için, tarife sonradan değişse bile)

## Sekmeler

Kartların altında detay, iki sekme arasında geçiş yapar:

| Sekme         | İçindekiler                                                                                                                                               |
| ------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Detaylar**  | Rota haritası, önemli olayların zaman çizelgesi, tam bilgi kartları                                                                                      |
| **Etkinlik**  | Kronolojik etkinlik günlüğü — bu sürüşle bağlantılı her durum değişikliği, sinyal ve sistem eylemi — Detaylar zaman çizelgesinden daha geniş (IoT hata ayıklama için faydalı) |

### Rota haritası

Detaylar sekmesinde, rota haritası sürüşün GPS izini gösterir:

- **Başlangıç / bitiş işaretçileri** ve adresleri
- **Hızla renklendirilmiş polilin** (yavaş ve hızlı segmentler)
- **Bölge bindirmeleri** sürüş kısıtlı alanlara girdiyse
- **Renk skalasını açıklayan lejant**
- **Fare veya iki parmak hareketleriyle yakınlaştırma / kaydırma**

### Zaman çizelgesi

Haritanın altında, dikey bir zaman çizelgesi sürüşün her önemli olayını listeler:

- **Sürüş başlangıcı** (araç kilidi açıldı)
- **Duraklatmalar / devam ettirmeler** (varsa)
- **Bölge girişleri / çıkışları**
- **Hız uyarıları**
- **Sürüş bitişi** (kilitleme / park kanıtı ile, varsa)
- **Ödeme olayları**

Zaman çizelgesini anlaşmazlıkları incelemek için kullanın ("rider sürüş bittikten sonra ücretlendirildi diyor") — her olay zaman damgalıdır.

### Etkinlik sekmesi

Etkinlik sekmesi, sistem düzeyindeki eylemler dahil tam etkinlik günlüğünü gösterir — Detaylar zaman çizelgesinden daha kapsamlıdır. Basit zaman çizelgesi yeterli detay sağlamadığında (örneğin bir IoT sorununun teknik hata ayıklaması için) kullanın.

## Tipik iş akışları

- **Müşteri şikayetini incele** — dökümü okuyun, sonra rota haritası ve zaman çizelgesine bakın; zaman çizelgesi nadiren yalan söyler
- **İade kararını denetle** — döküm kartını açın; satır kalemleri müşterinin tam olarak ne için ödeme yaptığını gösterir, sonra _Eylemler → Sürüşü iade et_'e tıklayın
- **Duraklat ve müşteriyi ara** — _Eylemler → Duraklat_ sürüşü dondurur; _Eylemler → Bildirim gönder_ müşteriye hatırlatma yapar; geri döndüğünde _Devam et_
- **Takılı kalan sürüşü bitir** — asla kapanmayan sürüşler (bağlantı kaybı, müşteri aracı bıraktıysa) için _Eylemler → Sürüşü bitir_ kullanarak zorla kapatın — sistem park kanıtı için son bilinen konumu kullanır

## İpuçları

- **Devre dışı bırakılmış eylem araç ipucunu okuyun** — devre dışı bırakılmış düğmeler bozuk değildir; araç ipucu sürüşün hangi durumda olması gerektiğini söyler
- **Destek konuşmasına veya arka uç sorgusuna yapıştırmak için başlıktan sürüş kimliğini kopyalayın**
- **Tarife detayları, tarifeyi _olduğu gibi_ gösterir** — tarife daha sonra düzenlense bile, denetim amaçları için anlık görüntü korunur
- **Eylemler iletişim kutusu tam menüdür** — iade/arşivleme için listeye bakmayın; bunlar burada bulunur
