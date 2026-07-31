# Park Kanıtları — Liste

Park Kanıtları listesi (`/support/park-proofs`), sürücülerin sürüşün önemli anlarında araçlarının fotoğrafını çektiği fotoğrafların moderasyon kuyruğudur. Bu fotoğraflar sürücünün aracı doğru park ettiğini (veya etmediğini) kanıtlar ve ekibinizin görevi burada **iyi fotoğrafları onaylamak, kötü olanları uyarmak veya cezalandırmaktır**.

Fotoğraf başına inceleme (büyük resim moderasyon ekranı) için bkz. [Park Proof Review](park-proof-review.md). Operatör müdahalesi olmadan açık durumları yöneten otomasyon kuralları için bkz. [Auto Review](park-proof-auto-review.md).

Gerekli izin: **Park Kanıtları** (`d5e6f7`). Bazı satır eylemleri ek alt izinler gerektirir.

## Kanıtlar buraya nasıl gelir

Sürücü mobil uygulaması kullanıcıdan üç noktada fotoğraf çekmesini ister:

1. **Başlangıç** — aracı kilidini açtığında (birimi aldığında iyi durumda olduğunu kanıtlar)
2. **Park** — sürüş sırasında ara durakta (duraklama sırasında yasal olarak park ettiğini kanıtlar)
3. **Bitiş** — sürüşü bitirdiğinde (en önemlisi — aracı doğru park ettiğini kanıtlar)

Fotoğraf GPS meta verisiyle yüklenir ve bu kuyruğa **Beklemede** durumu ile gönderilir. Auto Review, operatör müdahalesi olmadan fotoğrafı _Onaylandı_ (iyi fotoğraf) olarak değiştirebilir; Auto Review'ın emin olmadığı her şey insan incelemesi için buraya düşer.

## Filtreler

| Filtre     | Tür       | Notlar                                                               |
| ---------- | --------- | ------------------------------------------------------------------- |
| Ara        | Metin     | Müşteri adı, araç etiketi, sürüş ID'si ile arama yapar               |
| Tarih aralığı | Takvim  | Başlangıç / bitiş seçici; varsayılan "tüm zamanlar"                 |
| Durum      | Açılır Menü | `Beklemede` / `Onaylandı` / `Uyarı` / `Ceza` / `Engellendi` (veya `Tümü`) |
| Tür        | Açılır Menü | `Başlangıç` / `Park` / `Bitiş` (veya `Tümü`)                        |

Günlük izleme filtresi olarak `Durum = Beklemede` kullanın — bu moderasyon kuyruğudur.

## Sütunlar

| Sütun       | Sıralanabilir mi? | İçerik                                                   |
| ----------- | ---------------- | --------------------------------------------------------- |
| **Görsel**  | —                | Fotoğrafın küçük resmi (inceleme sayfasını açmak için tıklayın) |
| **Kullanıcı** | —               | Müşteri adı ve avatarı; müşteri profilini açmak için tıklayın  |
| **Araç**    | —                | Araç etiketi ve modeli; araç detayını açmak için tıklayın     |
| **Sürüş**   | —                | Sürüş ID'si; sürüş detayını açmak için tıklayın              |
| **Tür**    | ✓                 | Sürüş aşaması (`Başlangıç` / `Park` / `Bitiş`)              |
| **Durum**  | ✓                 | Durum etiketi (aşağıdaki referansa bakınız)                  |
| **Tarih**  | ✓                 | Fotoğrafın çekildiği zaman; varsayılan sıralama = en yeni önce |

## Durum referansı

| Durum        | Renk   | Anlamı                                                                       |
| ------------ | ------ | ----------------------------------------------------------------------------- |
| **Beklemede** | Sarı   | Moderasyon bekliyor (sizin veya Auto Review'ın)                              |
| **Onaylandı** | Yeşil  | Fotoğraf iyi — sürücü doğru park etti                                        |
| **Uyarı**    | Turuncu | Fotoğraf iyi değil — sürücü uyarılır ama henüz ceza yok                      |
| **Ceza**     | Kırmızı| Fotoğraf kötü — sürücü cezalandırıldı (veya sistem ceza adayı olarak işaretledi) |
| **Engellendi** | Gri   | Bu kanıt nedeniyle sürücü engellendi (ağır / tekrarlayan ihlal)              |

Satır eylemleri ve inceleme sayfasında ayarlanan durumlar, hem kanıt kaydına hem de müşterinin [Eylem günlüğü](../../operations/customers/client-detail.md#etkinlik-sekmesi) kaydına işlenir.

## Satır eylemleri

Her satırın sağında bir **üç nokta menüsü** vardır. Kullanılabilir eylemler izinlere bağlıdır:

| Eylem         | İzin          | Ne yapar                                                                                                  |
| ------------- | ------------- | --------------------------------------------------------------------------------------------------------- |
| **Görüntüle** | `view-detail` | Tam resim ve bağlam için [inceleme sayfasını](park-proof-review.md) açar                                  |
| **Onayla**    | `review`      | Kanıtı _Onaylandı_ olarak işaretler (ceza yok, uyarı yok) — iyi fotoğraflar için tipik                      |
| **Uyar**      | `review`      | _Uyarı_ olarak işaretler — sürücü bilgilendirilir ama ceza almaz                                         |
| **Sürüşü aç** | —             | İlgili sürüşün detay sayfasına atlar (rota haritası, zaman çizelgesi vb.)                                |

İzin verilmemiş eylemler gizlenir.

Tam eylem seti (Ceza, Kullanıcıyı engelle, Bakım görevi oluştur, Yeniden park etmesini iste) **inceleme sayfasında** bulunur — hızlı onay/uyarı dışındaki işlemler için oraya gidin.

## Sayfa eylemleri (sağ üst)

- **Auto Review** — açık ve net iyi fotoğrafları otomatik onaylayan, kötüleri otomatik işaretleyen kuralları yapılandırmak için [Auto Review ayarları sayfasını](park-proof-auto-review.md) açar (bu, Beklemede kuyruğunu boşaltır ve sadece uç durumları incelemenizi sağlar)

## Tipik iş akışları

- **Günlük moderasyon kuyruğu** — `Durum = Beklemede` → tarihe göre en eski ilk sıralama → her birini sırayla incele, bağlam için _Görüntüle_, gördüğüne göre _Onayla_ / _Uyar_ 
- **Bir şikayeti araştır** — sürüş ID'si veya müşteri ile ara → kanıtı bul → _Görüntüle_ → fotoğrafı sürücünün iddiasıyla karşılaştır
- **Tekrarlayan suçluları bul** — müşteri adı ile ara → birden fazla kanıtı inceleyerek bir desen gör (kullanıcının profilindeki eylem günlüğü aynı hikayeyi anlatır)
- **Sadece sürüş sonu** — `Tür = Bitiş` → sadece sürüş sonu fotoğraflarını incele (en önemli olan; sürüş içi park fotoğrafları genellikle iyidir)
- **Auto Review denetimi** — son gün için `Durum = Onaylandı` filtresi → kuralların doğru çalıştığından emin olmak için örnek kontrolü yap

## İpuçları

- **Çoğu çağrı için küçük resim yeterlidir** — açıkça bir bölge içinde, düzgün çerçevelenmiş, engelleme yok — açmadan _Onayla_. Belirsiz fotoğraflar için _Görüntüle_'yi kaydedin
- **Açık sürüş** bağlama hızlı erişiminizdir — sürücü yasal olarak park ettiğini iddia ederse, sürüş haritası aslında nerede durduklarını gösterir
- **Durumlar kalıcıdır** — bir kez _Onaylandı_ olarak ayarlarsanız, sürücü o kanıt için hatırlatmaları almayı bırakır. Kuyruğu temizlemek için kötü bir fotoğrafı onaylamayın, yoksa takip etme yeteneğinizi kaybedersiniz
- **Uyarı sizin "araya giren" durumunuzdur** — fotoğraf kötü ama kötü niyetli değilse kullanın (sürücü acele ediyordu, hava kötüydü vb.). Tekrarlanan uyarılar Otomatik İnceleme kurallarıyla para cezalarına dönüşür
- **Otomatik İncelemeyi agresif kullanın** — kuyruk hızla büyür; Otomatik İnceleme kendi başına onayladıkça daha belirgin iyi fotoğraflar, gerçekten belirsiz olanlara daha fazla enerji ayırmanızı sağlar
- **URL paylaşılabilir** — filtrelenmiş bir görünümü (örneğin _dünkü cezalı kanıtlar_) kopyalayın ve rastgele kontrol için bir ekip arkadaşınıza gönderin
