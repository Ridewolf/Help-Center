# Ödemeler — Geçmiş

Ödemeler sayfası (`/payments`), bir müşterinin hesabına dokunan her parasal işlemin defteridir: sürüş ücretleri, cüzdan yüklemeleri, iadeler, cezalar. Bir ücreti araştırmak, iade yapmak veya belirli bir tarih aralığında para akışını denetlemek için kullanın.

Ödeme sağlayıcılarından işlenmemiş webhook olayları için bkz. [Bekleyen Webhook'lar](pending-webhooks.md).

Gerekli izin: **Ödemeler** (`m1n2p3`). Bazı satır işlemleri ek alt izinler gerektirir.

## Burada neler var

Her satır tek bir ödeme işlemini temsil eder:

| Tür        | Nedir                                                                 |
| ---------- | -------------------------------------------------------------------- |
| **Yükleme**| Müşterinin cüzdanına eklenen para (manuel operatör kredisi veya kart yüklemesi) |
| **Borç**   | Müşteriden alınan para (sürüş ücreti veya ceza)                      |
| **İade**   | Müşteriye geri verilen para (önceki bir borcun ters çevrilmesi)      |

Her işlemin bir **yöntemi/sağlayıcısı** vardır — işlemin gerçekleştiği kanal:

- **Kart sağlayıcıları** (Stripe vb.) — ödeme kartı üzerinden gerçek para
- **Bakiye** — dahili cüzdan (ödeme sağlayıcısı değil; sadece müşterinin bakiyesi üzerinde borç/alacak)
- **Diğer geçitler** entegrasyonlarınıza bağlı olarak

_Kart sağlayıcı_ ve _bakiye_ ayrımı iadeler için önemlidir — aşağıdaki _Satır işlemleri → İade_ bölümüne bakın.

## Filtreler

| Filtre     | Tür       | Notlar                                                      |
| ---------- | --------- | ----------------------------------------------------------- |
| Ara        | Metin     | Müşteri adı, ödeme ID'si, ilgili sürüş / ceza ID'sinde arama |
| Tarih aralığı | Takvim  | Başlangıç / bitiş seçici; varsayılan "tüm zamanlar"         |
| Tür        | Açılır liste | `Yükleme` / `Borç` / `İade` (veya `Tümü`)                  |
| Durum      | Açılır liste | `Beklemede` / `Tamamlandı` / `Başarısız` / `İade Edildi` (veya `Tümü`) |

Filtreler sunucu tarafında uygulanır ve AND ile birleştirilir.

## Sütunlar

| Sütun      | Sıralanabilir mi? | İçerik                                                            |
| ---------- | ---------------- | ----------------------------------------------------------------- |
| **Tarih**  | ✓                | İşlemin oluşturulduğu tarih; varsayılan sıralama = en yeni önce  |
| **Müşteri**| —                | Müşteri adı ve avatarı; müşteri detayına bağlantı                |
| **Kaynak** | —                | İşlem türü (Yükleme / Borç / İade), renkli etiket ile             |
| **Tutar**  | ✓                | Şirket para biriminde tutar, işaretli (+/−) ve renk kodlu         |
| **Yöntem** | —                | Ödeme yöntemi / sağlayıcı (kart, bakiye, geçit adı)              |
| **Durum**  | ✓                | Durum göstergesi (aşağıdaki referansa bakınız)                    |

Sıralamak için sıralanabilir başlığa tıklayın. Seçilen sıralama URL'nin bir parçasıdır.

## Durum referansı

| Durum         | Anlamı                                                                    |
| ------------- | ------------------------------------------------------------------------- |
| **Beklemede** | Sağlayıcıya gönderildi; webhook onayı bekleniyor                         |
| **Tamamlandı**| Sağlayıcı başarıyı onayladı; para transfer edildi                        |
| **Başarısız** | Sağlayıcı işlemi reddetti (kart reddi, ağ hatası, dolandırıcılık kontrolü) |
| **İade Edildi**| Başarılı bir borcun daha sonra iade ile ters çevrilmesi                  |

## Satır işlemleri

Her satırın sağında bir **üç nokta menüsü** vardır. Kullanılabilir işlemler ödeme türüne, durumuna ve izinlerinize bağlıdır:

| İşlem           | Ne zaman etkin olur                  | İzin                                                      |
| --------------- | ---------------------------------- | --------------------------------------------------------- |
| **Müşteriyi Görüntüle** | Her zaman (müşteri profil sayfasına atlar) | —                                                       |
| **İade**        | Aşağıdaki "İade yönlendirmesi" bölümüne bakınız | `refund` / `topup-manual` / `fine` (yönlendirmeye bağlı) |

### İade yönlendirmesi

Gösterge Paneli sağlayıcı detaylarını gizler, ancak _İade_ işlemi doğru yolu seçmek için yeterince akıllıdır:

- **Sağlayıcı tabanlı borç** (kart, geçit) → sağlayıcının iade uç noktasını çağırır → para karta geri gider
- **Bakiye borcu** (cüzdan) → sağlayıcı yok — cüzdana kredi vermek için **Bakiyeyi yükle** iletişim kutusunu açar (`topup-manual` gerekir)
- **Bakiye yüklemesi** (manuel operatör kredisi) → sağlayıcı üzerinden tersine çevrilemez — aynı tutarı borçlandırmak için **Ceza kes** iletişim kutusunu açar (`fine` gerekir)

İade şu durumlarda **devre dışı**dır:

- Satır zaten bir iade (bir iadeyi iade etmek mantıklı değildir)
- Durum _Tamamlandı_ değil (beklemede / başarısız işlemleri iade edemezsiniz)
- İşlem zaten tersine çevrilmiş (gösterge paneli bunu takip eder ve yinelenen tıklamaları engeller)
- Yönlendirme yolu için gerekli alt izniniz yok

## Ödemelerin burada görünme nedeni (ve onları oluşturan işlemler)

Ödemeler bu sayfadan **oluşturulmaz** — başka akışlardan gelirler:

1. **Rider bir sürüş yapar** → sürüş sonu → arka uç bir _Borç_ işlemi oluşturur → başarılı olursa durum _Tamamlandı_'ya döner ve para cüzdandan veya karttan alınır
2. **Rider uygulamada cüzdanını yükler** → sağlayıcı çağrısı → arka uç bir _Yükleme_ işlemi oluşturur → webhook onayı ile durum _Tamamlandı_ olur
3. **Operatör bir müşterinin cüzdanını kredilendirir** → _Bakiyeyi yükle_ ile → arka uç _bakiye_ yöntemiyle ve hemen _Tamamlandı_ olarak bir _Yükleme_ oluşturur
4. **Operatör ceza keser** → arka uç _bakiye_ yöntemiyle ve hemen _Tamamlandı_ olarak bir _Borç_ oluşturur
5. **Bu listeden iade** → arka uç bir _İade_ işlemi oluşturur; orijinal işlem _İade Edildi_ olarak işaretlenir

Orijinal işlem asla kaybolmaz — her işlem denetlenebilir.

## Tipik iş akışları

- **Bir ücreti araştırın** — müşteri / sürüş / ödeme kimliğine göre arama yapın → Durumu kontrol edin (Tamamlandı = para alındı, Başarısız = para alınmadı) ve Yöntem
- **Bir sürüşü iade edin** — sürüş için _Borç_ satırını bulun → satır menüsü → _İade_ → onaylayın → eşleşen bir _İade_ satırı görünür, orijinal _İade Edildi_ olarak değişir
- **Günü denetleyin** — Tarih aralığını bugün olarak ayarlayın → Durum = Tamamlandı olarak filtreleyin → toplamları gözden geçirin
- **Yeniden denenecek başarısızlıkları bulun** — Durum = Başarısız olarak filtreleyin → müşterilerle yeniden deneme / alternatif yöntem hakkında iletişime geçin
- **Sağlayıcı ile mutabakat yapın** — Tarih aralığı + Tür = Yükleme/Borç + Yöntem = kart sağlayıcı olarak ayarlayın → dışa aktarın ve sağlayıcının ekstresiyle karşılaştırın

## İpuçları

- **Beklemede başarısız değildir** — beklemedeki işlemler sağlayıcının webhook'unu bekliyor; bir satır çok uzun süre Beklemede kalırsa [Bekleyen Webhook'lar](pending-webhooks.md) sayfasını kontrol edin
- **Bakiye işlemleri kartla iade edilemez** — sistem sizi doğru diyaloğa yönlendirir; dengeleme işlemlerini manuel oluşturmayın
- **Orijinal işlem iade sonrası da kalır** — iadeler eşleşen bir satır ekler, borcu silmez; her iki satır da denetim için geçmişte kalır
- **Tutar işareti yönü gösterir** — `+` (yeşil) müşteri lehine para; `−` (kırmızı/koyu) müşteri aleyhine para
- **Sağlayıcı isimleri destek için önemlidir** — ödeme sağlayıcınıza yükseltirken, Ödeme kimliğini ve Yöntem sütunundaki sağlayıcı adını kopyalayın
- **URL paylaşılabilir** — filtrelenmiş bir görünümü (örneğin _dünün başarısız kart borçları_) kopyalayın ve finans veya dolandırıcılık birimine gönderin
