# Yeniden Dengeleme — Sürüşler

Yeniden Dengeleme Sürüşleri sayfası (`/rebalance/runs`), **her yeniden dengeleme gezisinin operasyonel günlüğüdür**: hangi sürücünün hangi minibüsü kullandığı, hangi depodan çıktığı, kaç scooter ve pilin yüklü olduğu, zamanında olup olmadığı ve nerede sorun yaşandığı.

Bir **sürüş**, bir vardiyelik saha çalışmasıdır — bir sürücü, bir minibüs, çıkış deposu, sıralı durak listesi ve planlanan tahmini varış zamanı aralığı. Sayfa, sevk memurlarının aktif sürüşleri izlemesine ve tamamlananları gözden geçirmesine olanak tanır.

Bu sayfa, daha üst düzeydeki [Analytics — Rebalance](runs.md) özetini ve konuma dayalı [Rebalance — Dead Zones](dead-zones.md) panosunu tamamlayan, sürüş başına detay görünümüdür.

Gerekli izin: giriş yapmış operatör (rota sadece _requiresAuth_ zorunluluğunu uygular, belirli bir izin kimliği gerektirmez).

> Not — yazım tarihi itibarıyla, `/rebalance/runs` CRUD uç noktaları henüz aktif değil. Sayfa, filtre bloğunu, KPI satırını ve tablo düzenini sahte KPI'lar ve boş liste ile render eder. _Sürüş oluştur_, _Ara_, _Otomatik yenileme_ ve satır başına eylem menüsü (_Sevk et_, _Yeniden ata_, _Yeniden optimize et_, _Sayfa yazdır_, _Dışa aktar_, _Düzenle_, _İptal et_) kodda bağlı ancak arka uç tamamlanana kadar yorum satırına alınmıştır. Bir satıra tıklamak `/rebalance/runs/:id` sayfasına gider ancak detay sayfası bu yapının parçası değildir.

## KPI satırı (üst)

Beş KPI kartından oluşan bir satır, bugünün sürüşlerini özetler.

| KPI                | Gösterdiği                                                                                     |
| ------------------ | --------------------------------------------------------------------------------------------- |
| **Aktif sürüşler** | Şu anda _Sevk edildi_ / _Devam ediyor_ / _Duraklatıldı_ durumundaki sürüşler                    |
| **Zamanında %**    | Planlanan ETA aralığına uyan sürüşlerin yüzdesi; yeşil yükselen trend ≥ %90, kırmızı düşen trend altında |
| **Geç kalan sürüşler** | SLA'sında _Geç_ olarak işaretlenmiş sürüşlerin sayısı — sevk memurunun "yardım gereken" göstergesi |
| **Bugün toplam km** | Bugün tüm yeniden dengeleme minibüslerinin kat ettiği toplam mesafe                            |
| **Pil değişimleri** | Saha ekibi tarafından bugün yapılan toplam pil değişimi                                       |

Bu beş KPI birlikte, bugünkü saha operasyonunun plana karşı genel durumunu tek bakışta gösterir.

## Filtreler

Dört filtre _Filtreler_ kartında yer alır; hepsi birlikte VE (AND) koşulu ile uygulanır. Sağdaki _Hepsini Temizle_ düğmesi bloğu sıfırlar.

| Filtre             | Tür       | Seçenekler                                                                                  |
| ------------------ | --------- | ------------------------------------------------------------------------------------------ |
| **Durum**          | Açılır menü | _Tümü_ / _Planlandı_ / _Sevk edildi_ / _Devam ediyor_ / _Duraklatıldı_ / _Tamamlandı_ / _İptal edildi_ |
| **SLA riski**      | Açılır menü | _Tümü_ / _Yolda_ / _Risk altında_ / _Geç_ — sürüşün gecikme durumu                         |
| **Şehir**          | Açılır menü | _Tüm şehirler_ / _Moskova_ / _Saint Petersburg_                                           |
| **Olay var mı**    | Açılır menü | _Tümü_ / _Evet_ / _Hayır_ — sürüşe kayıtlı olaylar                                       |

Serbest metin _Ara_ kontrolü (sürüş numarası, sürücü veya minibüs ile) uygulanmıştır ancak uç nokta aktif olana kadar _Otomatik yenileme_ ve _Sürüş oluştur_ ile birlikte gizlenmiştir.

## Sütunlar

Tabloda dokuz görünür sütun vardır. Satırlar tıklanabilir — `/rebalance/runs/:id` sayfasına gider (detay görünümü bu yapıda yoktur).

| Sütun                 | İçerik                                                                                                                  |
| --------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| **Sürüş #**           | İnsan tarafından okunabilir sürüş tanımlayıcısı (ör. `RUN-2026-0517-001`)                                              |
| **Sürücü / Minibüs**  | Sürücü avatarı + adı + telefonu; altında minibüs modeli + plaka numarası                                               |
| **Depo / Şehir**      | Çıkış deposu adı ve şehri                                                                                                |
| **Durum**             | Durum etiketi — gri _Planlandı_, mavi _Sevk edildi_, yeşil _Devam ediyor_, sarı _Duraklatıldı_, camgöbeği _Tamamlandı_, kırmızı _İptal edildi_ |
| **Duraklar**          | İlerleme `tamamlandı / toplam` olarak, herhangi bir durak başarısızsa kırmızı _Başarısız: N_ altında gösterilir       |
| **Yük**               | Yüklenen scooter sayısı (`🛴 yüklü / kapasite`) ve piller (`🔋 dolu + boşalmış / kapasite`)                              |
| **Planlanan**         | ETA başlangıç–bitiş zamanı + planlanan mesafe (km) ve süre (dk)                                                        |
| **SLA riski**         | Risk etiketi — yeşil _Yolda_, amber _Risk altında_, kırmızı _Geç_                                                      |
| **Oluşturuldu / Güncellendi** | Üstte oluşturulma tarihi, altta son güncelleme tarihi                                                                |

Eylem sütunu (üç nokta menüsü) uygulanmıştır ancak CRUD uç noktaları tamamlanana kadar yorum satırına alınmıştır; planlanan set için aşağıdaki _Satır eylemleri_'ne bakınız.

## Durum referansı

Bir sürüş tam olarak bir durumda olur; durum, hangi sevk eylemlerinin mevcut olduğunu belirler:

| Durum           | Anlamı                                               |
| --------------- | ---------------------------------------------------- |
| **Planlandı**   | Oluşturuldu ve planlandı ancak henüz sürücüye gönderilmedi |
| **Gönderildi**  | Sürücü / araç gönderildi — kalkış bekleniyor          |
| **Devam ediyor**| Araç hareket halinde ve/veya duraklarda duruyor       |
| **Duraklatıldı**| Sürücü çalışmayı duraklattı (mola, olay vb.)          |
| **Tamamlandı**  | Tüm duraklar denendi, çalışma kapatıldı               |
| **İptal Edildi**| Tamamlanmadan önce durduruldu                          |

## SLA risk referansı

Çalışmanın planlanan zaman aralığına uyup uymayacağını gerçek zamanlı gösteren bayrak:

| Risk          | Anlamı                                               |
| ------------- | ---------------------------------------------------- |
| **Yolda**     | Mevcut hız planlanan ETA ile uyumlu                   |
| **Risk Altında** | Gecikme eğiliminde, ancak hala kurtarılabilir mesafede |
| **Geç Kaldı** | Plan zaten kaçırıldı — gönderici dikkatine ihtiyaç var |

Sabahları göndericinin ilk filtresi olarak _SLA risk = Geç Kaldı_ kullanın.

## Satır eylemleri (planlandı)

Her satırın sağında aşağıdaki eylemlerle üç noktalı bir menü olacak; bugün API beklenirken sütun gizlidir.

| Eylem           | Ne yapacak                                               |
| --------------- | -------------------------------------------------------- |
| **Görüntüle**   | Çalışma detay sayfasını `/rebalance/runs/:id` adresinde açar |
| **Gönder**      | _Planlanan_ çalışmayı _Gönderildi_ durumuna geçirir, sürücüyü bilgilendirir |
| **Yeniden Ata** | Çalışmadaki sürücü ve/veya aracı değiştirir              |
| **Yeniden Optimizasyon** | Kalan duraklar için rota optimizasyonunu tekrar çalıştırır |
| **Yazdırma Sayfası** | Yazdırılabilir çalışma sayfası oluşturur (sürücü özetli) |
| **Dışa Aktar**  | Çalışma verilerini dosya olarak dışa aktarır (filtreler/sıralama geçerli) |
| **Düzenle**     | Çalışma düzenleyicisini açar                             |
| **İptal Et**    | Çalışmayı iptal eder — onay iletişim kutusu açılır       |

## Boş / yükleniyor durumları

- **Yükleniyor** — arka uç sorgulanırken "Çalışmalar yükleniyor…" yazan bir dönen simge
- **Hata** — istek başarısız olursa _Uyarı_ afişi ve _Tekrar Dene_ butonu
- **Boş** — ortalanmış bir _Kamyon_ simgesi ve "Çalışma bulunamadı"; bu **bugün beklenen durumdur** çünkü uç nokta öğe döndürmüyor

## Tipik iş akışları

- **Sabah gönderim taraması** — _Durum = Planlandı_ filtresi, oluşturulma tarihine göre sırala, sırayla gönder
- **Canlı izleme** — _Durum = Devam ediyor_ filtresi, ardından _SLA risk = Geç Kaldı_ ile yardıma ihtiyaç duyan sürücüleri göster; etkinleştirildiğinde _Otomatik yenileme_ görünümü güncel tutar
- **Günün sonunda inceleme** — _Durum = Tamamlandı_ filtresi, _Duraklar_ sütununda başarısız durakları tarar, her birine tıklayarak olay değerlendirmesi yapar
- **Şehir bazında** — Çok şehirli operasyonlarda _Şehir_ filtresi; sayıları [Analytics — Rebalance](runs.md) sayfasıyla karşılaştır
- **Olay üçlemesi** — _Olay var = Evet_ filtresi ile bugün sorun yaşayan tüm çalışmaları gösterir
- **Kapasite kontrolü** — _Devam ediyor_ satırlardaki _Yük_ sütununa bakar; kapasiteye yakın araçlar yakında depoya dönmeli olabilir

## İpuçları

- **Çalışma numaraları sabit tanımlayıcılardır** — saha ekibiyle paylaşarak net koordinasyon sağlar ("RUN-2026-0517-003'e bak")
- **Duraklar sütunu durumu hemen gösterir** — `4/7` dörtü tamamlandı, üçü kaldı; altında kırmızı _Başarısız: N_ = takip gerektirir
- **Yük "tükenmesi" önemlidir** — yüksek boşalmış pil sayısı aracın ölü pillerle dolu olduğunu ve şarj cihazına uğraması gerektiğini gösterir
- **Oluşturulma ve Güncellenme** — _Güncellendi_ her sürücünün çalışmada işlem yapışında işaretlenir; _Devam ediyor_ satırında eski _Güncellendi_ sürücünün uzun süredir giriş yapmadığını gösterir
- **Durum _Duraklatıldı_ hata değildir** — sürücüler molalar, olaylar ve yolcu etkileşimleri için duraklatır; uzun süre duraklatılan çalışmalar telefonla kontrol edilmeli
- **Uç nokta gelene kadar bu sayfayı düzen / UX önizlemesi olarak değerlendirin** — yapı, filtreler ve görsel dil son halindedir; arkasındaki veriler henüz değil
