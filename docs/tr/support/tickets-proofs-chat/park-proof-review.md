# Park Kanıtı İncelemesi

İnceleme sayfası (`/support/park-proofs/:id/review`), bir park kanıtı fotoğrafını ayrıntılı olarak denetlediğiniz yerdir. Tam görüntü, ilgili tüm bağlam (müşteri / sürüş / araç) ve tam eylem menüsü burada bulunur.

Genellikle buraya, [Park Kanıtları listesi](park-proofs.md) içindeki küçük resme (veya satır menüsündeki _Görüntüle_ seçeneğine) tıklayarak ulaşırsınız.

Gerekli izin: **Park Kanıtları** (`d5e6f7`) + denetim işlemleri için `review` alt izni.

## Düzen

Sayfa geniş ekranlarda üç sütuna ayrılır, dar ekranlarda üst üste yığılır:

| Sütun          | Genişlik | İçerik                                             |
| -------------- | -------- | ------------------------------------------------- |
| **Görsel**     | 5/12     | Yakınlaştırma ve kaydırma özellikli tam boy fotoğraf |
| **Eylemler**   | 4/12     | Denetim düğmeleri, isteğe bağlı yorum, yönetici Sil |
| **Bilgi kartları** | 3/12  | Müşteri, Sürüş, Araç, Kanıt detayları              |

## Görsel (sol sütun)

Tam çözünürlüklü fotoğrafla **yakınlaştırılabilir görsel görüntüleyici**:

- Yakınlaştırılmışken **tıklayıp sürükleyerek** kaydırın
- Yakınlaştırmak için **kaydırma tekerleği** (veya mobilde sıkıştırma hareketi)
- Yakınlaştırmayı sıfırlamak için **çift tıklayın**

Şunlara dikkat edin:

- Çerçevede tüm araç (sadece tekerlek değil)
- Yasal bir park yeri (yaya yolunu kapatmayan, park yasağı olmayan bölge)
- Ayaklık aşağıda, araç dik pozisyonda
- Anlaşmazlık varsa sürücünün hikayesine aykırı herhangi bir şey

## Eylemler (orta sütun)

Dört denetim düğmesi dikey olarak, şiddet sırasına göre dizilir:

| Düğme                | Duruma etkisi   | Kullanım durumu                                                          |
| -------------------- | --------------- | ------------------------------------------------------------------------ |
| **Onayla**           | _Onaylandı_     | Fotoğraf iyi — sürücü doğru park etmiş                                  |
| **Uyar**             | _Uyarı_         | Fotoğraf kötü değil ama ceza gerektirmiyor — sürücüye bildirim gider    |
| **Ceza ile reddet**  | _Cezalı_        | Fotoğraf kötü — aşağıdaki alana girdiğiniz tutarda ceza uygulanır        |
| **Engelle**          | _Engellendi_    | Ağır / tekrarlayan ihlal — sürücünün gelecekteki sürüşleri engellenir    |

Her eylem `review` alt izni gerektirir. Yapamayacağınız eylemler gizlenir veya devre dışı bırakılır.

### Ceza tutarı

**Ceza ile reddet** düğmesinin hemen altında şirket para biriminde **ceza tutarı** için bir sayı girişi vardır. Ceza, müşterinin cüzdanından (veya yapılandırmaya bağlı olarak müşterinin varsayılan ödeme yönteminden) tahsil edilir. _Ceza ile reddet_ düğmesine tıkladığınızda tutar zorunludur; aksi halde düğme devre dışı kalır.

### Yorum

Eylem düğmelerinin altında bir **Yorum** metin alanı bulunur. Yazdığınız her şey eyleme eklenir ve şuraya kaydedilir:

- Kanıt kaydına (gelecekteki denetimler için)
- [Müşterinin Eylem günlüğüne](../../operations/customers/client-detail.md#etkinlik-sekmesi) (böylece daha sonra müşteriyi inceleyen herkes notunuzu görür)
- Sürücünün uygulama içi bildirimine (eyleme bağlı olarak — neden uyarıldığı / ceza aldığı hakkında bağlam görürler)

Yorumu eyleme tıklamadan **önce** yazın — eylemle birlikte gönderilir, sonrasında değil. Spesifik olun: "kaldırımı kapatan scooter, 22:14'te çekilen fotoğraf" ifadesi "kötü park"tan iyidir.

### Sil (yönetici)

Alt kısımda bulunan ve sadece yönetici izniyle görünen **Sil** düğmesi, kanıt kaydını tamamen kaldırır. Şu durumlarda kullanın:

- Test fotoğrafları / spam yüklemeleri
- Yinelenen yüklemeler (aynı sürüş, birden fazla aynı fotoğraf)
- Yanlış sürüş için yüklenen fotoğraflar (veri hatası)

Sil'i Onayla / Reddet yerine kullanmayın — Sil, _kaydın sistemden çıkarılması_ içindir, denetim kararları için değil.

## Bilgi kartları (sağ sütun)

Üç "ilişkili varlık" kartı ve bir detay kartı dikey olarak yığılır:

- **Müşteri** — ad, telefon, e-posta, durum, [müşteri detay sayfasına](../../operations/customers/client-detail.md) bağlantı
- **Sürüş** — sürüş kimliği, başlangıç/bitiş zaman damgaları, mesafe, ücret; [sürüş detay sayfasına](../../operations/trips/ride-detail.md) bağlantı
- **Araç** — etiket, model, durum; [araç detay sayfasına](../../operations/fleet/vehicle-detail.md) bağlantı
- **Park Kanıtı Detayları** — tür (başlangıç/park/son), oluşturulma zamanı, GPS koordinatları, varsa otomatik inceleme kararı

Bu kartları **bağlamı hızlıca oluşturmak için** kullanın:

- Bu müşteri ilk kez mi ihlal ediyor yoksa tekrar eden mi? — Müşteri → Eylem sekmesini açın
- Sürüşü fotoğraf konumunda mı bitirdi? — Sürüş → rota haritasını açın
- Bu araç sık sık kötü park mı ediyor? — Araç → son kanıtları açın

## Tipik iş akışları

- **Hızlı onay** — görüntü açıkça iyi → yorumu boş bırak → _Onayla_ → kuyruğa geri dön
- **Bağlamlı uyarı** — görüntü kötü ama hafif → bir cümlelik not yaz → _Uyar_ → sürücüye yumuşak bir uyarı gider
- **Düşünerek ceza** — görüntü açıkça kötü → tekrar eden ihlaller için Müşteri kartını kontrol et → cezayı açıklayan not yaz → tutarı gir → _Ceza ile reddet_
- **Engelleme için yükselt** — görüntü üçüncü ihlal → önceki uyarılar için Müşteri → Eylem sekmesini kontrol et → not yaz → _Engelle_
- **Önceki kararı denetle** — kanıtı aç → eylem günlüğündeki Yorum alanını okuyarak önceki operatörün ne yazdığını gör

## İpuçları

- **Karar vermeden önce yakınlaştırın** — ayaklıklar, park işaretleri ve yaya yolları küçük resimde kolayca gözden kaçabilir
- **Yorumu önce yazın** — bir eyleme tıkladığınızda gönderilir; yorumu sonra yazarsanız, bağlam olmadan zaten moderasyon yapmış olursunuz
- **Onayla > Uyar > Ceza > Engelle** tek yönlü bir yükseltmedir — ilk ihlalde doğrudan Engelle'ye geçmeyin
- **Yorum herkese açıktır** (ekibinize ve sürücüye) — gerçeklere dayalı tutun; dahili jargon veya müşteri hakkında görüş içermesin
- **Silme geri alınamaz** — bir kanıt silindiğinde geri getirilemez; kötü fotoğrafın kaydını tutmak istiyorsanız _Reddet_ kullanın
- **Görsel gerçektir** — sürücü cezaya itiraz ettiğinde, orijinal fotoğraf + yorumunuz + zaman çizelgesi dosya niteliğindedir
