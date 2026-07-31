# Müşteriler — Liste

Müşteriler listesi (`/clients`), müşteri veritabanınızdır: hizmetinize kayıtlı her kişi, bakiyesi, etiketleri, sürüş geçmişi özeti ve iletişim kanalları ile birlikte.

Her müşteriye özel işlemler (tam geçmiş, bakiye işlemleri, cihazlar, yorumlar) için [Müşteri detay sayfasını](client-detail.md) açın.

Gerekli izin: **Müşteriler** (`e4f5h6`). Ek alt izinler belirli satır ve toplu işlemleri sınırlar.

## Müşteriler burada nasıl görünür

Genellikle müşterileri gösterge panelinde oluşturmazsınız — onlar sürücü mobil uygulaması üzerinden kaydolur:

1. Bir kişi **Ridewolf Rider App** uygulamasını yükler ve kayıt olur (telefon veya e-posta)
2. Arka uç bir müşteri kaydı oluşturur; doğrulama (SMS, kimlik, ödeme yöntemi) devam ederken satır **Kayıt Oluyor** durumunda burada görünür
3. Doğrulama tamamlandıktan sonra durum **Aktif** olur — müşteri sürüş yapabilir
4. Operatörler manuel olarak müşteriler oluşturabilir (örneğin VIP veya test hesapları için) `+ Oluştur` ile — _Oluştur_ makalesinde anlatılmıştır

Liste, sayfayı yenilediğinizde veya filtreleri değiştirdiğinizde güncellenir.

## Filtreler

| Filtre      | Tür          | Notlar                                                      |
| ----------- | ------------ | ----------------------------------------------------------- |
| Ara         | Metin        | Ad, telefon, e-posta, müşteri kimliği içinde arama yapar   |
| Tarih aralığı | Takvim      | **Kayıt tarihi**ne göre filtreler; başlangıç / bitiş        |
| Durum       | Açılır liste | `Aktif` / `Engellendi` / `Donduruldu` / `Kayıt Oluyor` (veya `Tümü`) |
| Etiketler   | Çoklu seçim  | Müşteriye uygulanmış etiketlere göre filtreler              |

Tüm filtreler VE ile birleştirilir. Filtre etiketleri tablonun üstünde görünür; URL mevcut durumu yansıtır.

## Sütunlar

| Sütun         | Sıralanabilir mi? | İçerik                                                                       |
| ------------- | ---------------- | ----------------------------------------------------------------------------- |
| **Müşteri**   | ✓                | Avatar + ad/soyad + telefon veya e-posta; müşteri detay sayfasına bağlantı   |
| **Kanallar**  | —                | Müşterinin doğruladığı iletişim kanallarının simgeleri (telefon, e-posta, sosyal) |
| **Bakiye**    | ✓                | Şirket para biriminde cüzdan bakiyesi, negatifse kırmızı renkte               |
| **Etiketler** | —                | Bu müşteriye uygulanmış etiketler                                            |
| **Durum**     | ✓                | Durum etiketi (aşağıdaki referansa bakınız)                                 |
| **Puan**      | ✓                | Sürücülerin bu müşteri için verdiği ortalama puan (sürücü puanı)             |
| **Sürüşler**  | ✓                | Ömür boyu sürüş sayısı                                                       |
| **Son sürüş** | ✓                | Müşterinin en son sürüş yaptığı zaman                                        |
| **Ödeme**    | —                | Varsayılan ödeme yöntemi simgesi (kart, cüzdan vb.)                          |

Sıralamak için sıralanabilir başlığa tıklayın. Sıralama URL'nin bir parçasıdır.

## Durum referansı

| Durum           | Anlamı                                                                                 |
| --------------- | ------------------------------------------------------------------------------------- |
| **Aktif**       | Tam doğrulanmış, sürüş yapabilir, ücretlendirilebilir                                  |
| **Engellendi**  | Sürüş yapamaz; operatör tarafından engellenmiş (dolandırıcılık, kötüye kullanım, borç) veya sistem tarafından tetiklenmiş |
| **Donduruldu**  | Hesap duraklatılmış (örneğin bir anlaşmazlık incelenirken veya müşteri talebiyle)       |
| **Kayıt Oluyor** | Kayıt işlemi devam ediyor — telefon / e-posta / kimlik / ödeme yöntemi henüz doğrulanmadı |

## Satır işlemleri

Her satırın sağında bir **üç nokta menüsü** vardır. Mevcut işlemler izinlerinize bağlıdır:

| İşlem               | İzin               | Ne yapar                                                                         |
| ------------------- | ------------------ | -------------------------------------------------------------------------------- |
| **Profili görüntüle** | —                | [Müşteri detay sayfasını](client-detail.md) açar                                |
| **Sürüş geçmişi**    | —                  | Müşterinin sürüşlerini gösteren görünümü açar (küresel sürüş listesine odaklanmış) |
| **SMS gönder**       | —                  | Müşterinin doğrulanmış telefonuna SMS göndermek için iletişim kutusunu açar      |
| **E-posta gönder**   | —                  | Müşterinin doğrulanmış adresine e-posta göndermek için iletişim kutusunu açar    |
| **Push gönder**      | —                  | Müşterinin uygulamasına push bildirimi göndermek için iletişim kutusunu açar     |
| **Bakiye yükle**     | `topup-manual`      | Bakiye iletişim kutusunu açar — müşterinin cüzdanına para yükler                  |
| **Ceza kes**         | `fine`              | Ceza iletişim kutusunu açar — cüzdandan para düşer (hasar, park vb. için)        |
| **Engelle / Engeli kaldır** | `block` / `unblock` | Engelleme iletişim kutusunu açar — müşterinin engelli durumunu isteğe bağlı nedenle değiştirir |
| **Düzenle**          | `edit`              | [Düzenleme formunu](client-create-edit.md) açar                                 |
| **Sil**              | `delete`            | Müşteri kaydını yumuşak siler (onayla; kırmızı, yıkıcı işlem)                   |

İzinleriniz olmayan işlemler menüde gizlenir.

## Toplu işlemler

Soldaki onay kutularıyla bir veya daha fazla müşteri seçin. Seçilen sayıyı ve işlemleri gösteren bir **toplu işlem çubuğu** üstte belirir:

| Toplu işlem       | İzin               | Ne yapar                                                               |
| ----------------- | ------------------- | ---------------------------------------------------------------------- |
| **Bakiye ekle**   | `topup-manual`      | Seçilen her cüzdana tek bir tutar ekler (onay ile)                    |
| **Tutar tahsil et** | `fine`            | Seçilen her cüzdandan tek bir tutar çeker (ör. etkinlik genel cezası) |
| **Durum değiştir** | `block` / `unblock` | Seçilen her müşterinin durumunu aynı yapar (Aktif / Engellendi / Donduruldu) |
| **Push gönder**   | —                   | Seçilen her müşteriye aynı anda push bildirimi gönderir               |

Toplu diyaloglar sizi tutar / mesaj / durum adımlarında yönlendirir, ardından tüm seçilen satırlara tek bir işlemle ve son onayla uygular.

## Sayfa işlemleri (sağ üst)

- **+ Oluştur** — [Create client form](client-create-edit.md) formunu açar (ayrı makale)

## Tipik iş akışları

- **Bir ödeme şikayetini araştır** — telefon veya e-posta ile ara → detay aç → bakiye ve sürüş geçmişini kontrol et
- **Operatör talebiyle cüzdanı doldur** — müşteriyi bul, satır menüsünden _Bakiye ekle_, tutarı gir, onayla
- **Bir dolandırıcıyı engelle** — müşteriyi ara → _Engelle / Engellemeyi kaldır_ → Engellendi olarak ayarla; durum _Engellendi_'ye döner, yeni sürüş yok
- **Kesinti SMS'i gönder** — bölge etiketi ile filtrele → _Tümünü seç_ → _Push gönder_ (veya acil olmayan yayınlar için Pazarlama → SMS kullan)
- **Bir etiketin sahiplerini denetle** — etikete göre filtrele, bakiye ve sürüş sayılarını tarayarak anormalliklere bak

## İpuçları

- **Durum sessiz kapı bekçisidir** — _Kayıt oluyor_ / _Donduruldu_ / _Engellendi_ durumundaki müşteriler sürüş yapamaz; Sürüşler listesinde görmeyi bekleme
- **Kanal simgeleri neyin doğrulandığını gösterir** — e-posta simgesi yoksa SMS, o müşteri için tek çıkış kanalındır
- **Puanlama, sürücünün müşteriye verdiği puandır** (sürüş değil) — düşük puanlar genellikle park sorunları veya kaba davranış anlamına gelir; park kanıtları ve biletlerle çapraz kontrol yap
- **Bakiye kırmızıya dönüyorsa** = negatif cüzdan. Müşteri bakiye eklenene veya iade edilene kadar yeni sürüş başlatamaz
- **İzinler katmanlıdır** — aynı müşteriye _SMS Gönder_ izinli olabilirsin ama _Bakiye ekle_ izinli olmayabilirsin; menü ne yapabileceğini gösterir
- **URL paylaşılabilir** — filtrelenmiş bir görünümü (ör. _Sürüşü > 0 olan Engellenmiş müşteriler_) kopyala ve bir ekip arkadaşına gönder
