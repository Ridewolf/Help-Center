# Envanter ve Parçalar

Envanter ve Parçalar sayfası (`/maintenance/inventory`), **bakım operasyonunuzun arkasındaki yedek parça stoklarını** — filtreler, fren balataları, aküler, gövde panelleri — stok seviyeleri, yeniden sipariş eşikleri ve değerlemeyle takip eder. Bu sayfa, [Bakım Görevleri](tasks.md) ve [Bakım Otomasyonu](automation.md) ile birlikte **Bakım Bilgi Paneli**ni paylaşır.

Bunu kenar çubuğunda **Bakım → Envanter** altında bulabilirsiniz.

> **Dikkat: ürün yönetimi yakında geliyor.** Envanter öğesi ekleme ve düzenleme şu anda devre dışı ("yakında geliyor"). Bugün aktif olan, sabit 30 günlük bir pencere üzerinden Bilgi Paneli sayılarıdır — **toplam öğe, düşük stok, stokta yok, toplam değer**.

## Bilgi Paneli size ne anlatır

- **Toplam öğe** — kaç farklı envanter kaydı var
- **Düşük stok** — minimum seviyesinde veya altında olan öğeler
- **Stokta yok** — hiç mevcut olmayan öğeler; sıfırın üzerindeki herhangi bir değer kutuyu **tehlike** kırmızısına çevirir
- **Toplam değer** — eldeki stokun değerlemesi

Aynı panel, üç Bakım sayfasının tamamında görünür (dört bloğunun tam dökümü için [Bakım Görevleri](tasks.md) sayfasına bakın) ve sayfalar arası geçiş anında gerçekleşir.

## Envanter modeli

Öğe yapısı zaten tanımlanmıştır, böylece özellik yayınlanmadan önce katalog yapınızı planlayabilirsiniz:

- **SKU**, **etiket**, **açıklama**
- **Kategori** — `filters`, `oils`, `brakes`, `electrical`, `engine`, `body`
- **Stok** — elde, rezerve, mevcut, minimum, maksimum, ayrıca yeniden sipariş gereksinimi bayrağı
- **Yolda** — gelen satın almalar ve transferler
- **Maliyet** — ortalama, son satın alma fiyatı, değerleme
- **Durum** — `new`, `used`, `refurbished`, `for-repair` — ayrıca depolama **kutuları**
- **Garanti bitişi**, **son kullanma tarihi**, **durum**, **etiketler**

## Planlanan oluşturma akışı

Öğe oluşturma üç adımlı bir sihirbaz olacak:

1. **Öğe** — SKU, ad, kategori, açıklama
2. **Stok** — miktar, minimum seviye, fiyat
3. **İnceleme** — onayla ve gönder

## Yaygın sorular

- **Öğe ekleyemiyorum — izinler mi?** Hayır, form özellik yayınlanana kadar herkes için devre dışı. Beklenen bir durum.
- **Stokları depolama kutusu bazında yönetebilir miyim?** Kutular veri modelinde var, ancak henüz kutu düzeyinde yönetim ekranı yok.
- **Sayılarda herhangi bir filtreye tepki yok.** Bilgi Paneli'nin 30 günlük penceresi sabittir; uygulanacak filtre yoktur.

## İpuçları

- **"Stokta yok" durumunu öncelikle izleyin** — bu, kutuyu tehlike durumuna çeviren ve onarımları engelleyen metriktir.
- **Yeniden sipariş mantığı minimum seviyeye bağlı olacak** — kataloğunuzu tasarlarken, öğe başına gerçekçi minimumlar belirleyin; yeniden sipariş gereksinimi bayrağı bunlardan türetilir.
