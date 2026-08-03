# Sürüşler — Liste

**Sürüş**, müşterinin araçlarınızdan biriyle yaptığı tek bir yolculuktur. Sürüşler listesi (`/rides`), tüm filodaki geçmiş, mevcut ve gelecekteki her yolculuğun ana kaydıdır.

Bir satırı açarak rota, zaman çizelgesi ve tam eylemlerle [Sürüş detay sayfasını](ride-detail.md) görebilirsiniz.

Gerekli izin: **Sürüşler** (`i1j2k3`).

## Sürüşlerin burada görünme şekli

Sürüşleri gösterge panelinde oluşturmazsınız — bunlar müşteri tarafından başlatılır:

1. Müşteri mobil uygulamada (Ridewolf Rider App) bir aracı **kilidini açar**
2. Arka uç, o araç ve müşteri için yeni bir sürüş kaydı açar
3. Sürüş, durum olarak **Aktif** ile hemen bu listede görünür
4. Müşteri aracı **kilitlediğinde / park ettiğinde**, arka uç sürüşü kapatır; durum **Tamamlandı** olur ve mesafe, süre, fiyat gibi son detaylar hesaplanır
5. Diğer son durumlar (`İptal Edildi` vb.) sistem kurallarından veya operatör işlemlerinden gelir

Sayfayı yenileyin veya tekrar ziyaret edin; aktif sürüşler müşteri hareket ettikçe güncellenir.

## Varsayılan sıralama

Varsayılan olarak arka uç önce **aktif sürüşleri**, sonra tamamlanmış sürüşleri ters kronolojik sırayla (en yeniler önce) döner. Bu varsayılanı geçersiz kılmak için sütun sıralaması uygulayın.

## Filtreler

| Filtre     | Tür          | Notlar                                                              |
| ---------- | ------------ | ------------------------------------------------------------------ |
| Ara        | Metin        | Müşteri adı, araç etiketi, sürüş ID'sinde arama yapar              |
| Tarih aralığı | Takvim     | Başlangıç / bitiş seçici; varsayılan "tüm zamanlar"               |
| Durum      | Açılır menü  | `Aktif`, `Tamamlandı`, `İptal Edildi` vb.                         |
| Değerlendirme | Açılır menü | Sürücü tarafından bırakılan yıldız derecelendirmesine göre filtrele (1–5, _Değerlendirme yok_) |
| Etiketler  | Çoklu seçim  | Sürüş etiketlerine göre filtrele (araçtan miras alınır — aşağıdaki Sütunlara bakınız) |

Tüm filtreler VE (AND) ile birleştirilir. Filtre etiketleri tablonun üstünde görünür; URL mevcut filtre durumunu yansıtır.

## Sütunlar

| Sütun   | Sıralanabilir mi? | İçerik                                                            |
| ------- | ---------------- | ---------------------------------------------------------------- |
| Müşteri | —                | Avatar, ad, müşterinin profil bağlantısı                         |
| Araç    | —                | Etiket, model, aracın bağlantısı                                 |
| Tarif   | —                | Sürüşe uygulanan tarifenin adı                                   |
| İstatistikler | —           | Hızlı rozetler: mesafe, süre, üst satır maliyet                  |
| Etiketler | —               | Sürüş başladığında **araçtan** miras alınan etiketler            |
| Durum   | ✓                | Durum etiketi (Aktif, Tamamlandı, İptal Edildi vb.)              |
| Değerlendirme | ✓           | Sürücü tarafından bırakılan yıldız derecelendirmesi (yoksa "–") |
| Oluşturulma | ✓             | Sürüşün başladığı tarih ve saat; varsayılan sıralama = en yeniler önce |

Sıralamak için sıralanabilir başlığa tıklayın. Seçilen sıralama URL'nin bir parçasıdır ve yukarıda açıklanan varsayılan sıralamayı **geçersiz kılar** — "varsayılanı geri yükle" için üçüncü tıklama yoktur, ancak URL'yi düzenleyerek veya sıralama parametresi olmadan yenileyerek sıralamayı temizleyebilirsiniz.

> **Etiketler araçtan miras alınır.** Sürüşlerin kendi etiket düzenleyicisi yoktur — bir sürüşün etiketleri, sürüş başladığında araçta bulunan etiketlerin anlık görüntüsüdür. Aracın etiketlerini daha sonra düzenlerseniz mevcut sürüşler orijinal anlık görüntüyü korur; yalnızca yeni sürüşler yeni etiketleri alır.

## Satır eylemleri

Her satırın en sağında bir **üç nokta menüsü** vardır. Mevcut eylemler sürüşün durumuna ve izinlerinize bağlıdır:

| Eylem        | İzin           | Ne zaman etkin                                              |
| ------------ | -------------- | ----------------------------------------------------------- |
| **Duraklat** | `pause-unpause`| Sürüş **Aktif** (zaten duraklatılmamış, tamamlanmamış, iptal edilmemiş) |
| **Devam ettir** | `pause-unpause`| Sürüş **Duraklatılmış**                                      |
| **Sürüşü bitir** | `end-ride`   | Sürüş **Tamamlanmamış** veya İptal Edilmemiş                |

İzin verilmemiş eylemler gizlenir. Devre dışı bırakılmış eylemler (örneğin zaten tamamlanmış bir sürüşte Bitir) gri görünür, böylece doğru durumda hangi eylemlerin mümkün olduğunu görebilirsiniz.

Tam eylem seti — iade, haritada rotayı görüntüleme, bildirim gönderme, arşivleme — **sürüş detay sayfasında** bulunur. Erişmek için satıra tıklayın.

## Sayfa eylemleri

Liste sayfasının sağ üstünde:

- **Dışa Aktar** — şu anda filtrelenmiş listeyi dosya olarak indirir (filtreler ve sıralama dikkate alınır)

## Listede tipik iş akışları

- **Canlı etkinliği izle** — sayfayı açın ve açık tutun; listenin üstü aktif sürüşleri gösterir
- **Bir bölgede veya zaman aralığında sürüş bulun** — tarih aralığı + durum + etiketleri birleştirin
- **Anormallikleri tespit edin** — `Durum = İptal Edildi` veya `Değerlendirme ≤ 2` ile filtreleyin ve desenleri tarayın (aynı araç mı? günün aynı saati mi?)
- **Sıkışmış sürüşü hızlıca durdurun** — listeden çıkmadan satır menüsünü açın ve _Sürüşü bitir_ (izin gerektirir)

## İpuçları

- **URL paylaşılabilir** — listeyi filtreleyin, URL'yi kopyalayın, bir meslektaşınıza gönderin — aynı görünümü alırlar
- **Listede istatistik rozetleri** tıklamadan önce olağandışı kısa veya uzun sürüşleri hızlıca fark etmenizi sağlar
- **Sadece değerlendirmeye güvenmeyin** — düşük puanlı sürüşler için detay sayfasını açın; değerlendirme birçok sinyalden biridir
- **İzinler şirkete göre değişir** — bazı operatörler yalnızca yönettikleri araçların sürüşlerini görür; bir sürüş sizin için eksikse bir yöneticiyle kontrol edin
