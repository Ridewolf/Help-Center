# Bakım Otomasyonu

Bakım Otomasyonu sayfası (`/maintenance/automation`), **bakım işlerini otomatik tetikleyen kuralların** yer aldığı yerdir — "her 500 km'de bir, bir denetim görevi oluştur", "bir pil olayı tetiklendiğinde, parça sipariş et" gibi. Bu sayfa, [Bakım Görevleri](tasks.md) ve [Envanter & Parçalar](inventory.md) ile birlikte **Bakım İçgörü Paneli**ni paylaşır.

Kenardaki menüde **Bakım → Otomasyon** altında bulabilirsiniz.

> **Dikkat: otomasyon yakında geliyor.** **Otomasyon kurallarını etkinleştir** anahtarı devre dışı bırakılmıştır, arayüzde bunun açıklaması gösterilmektedir ve henüz kural oluşturulamamaktadır. İçgörü Paneli'nin otomasyon sayıları (aktif kurallar, bugün tetiklenenler, başarı oranı) sayfanın canlı kısmıdır.

## Bir kural nasıl şekillenir

Bir kural **bir tetikleyici ile bir eylemi** eşleştirir:

- **Tetikleyici türü** — `mileage`, `time`, `event` veya `schedule` ve parametreleri
- **Eylem türü** — `create_task`, `send_notification`, `order_parts` veya `schedule_service` ve yapılandırması
- **Ad**, **açıklama**, **durum** (`active` / `inactive` / `paused`)
- **Uygulandığı yer** — kuralın kapsadığı araçlar veya gruplar
- **Koşullar** — tetikleyicinin karşılaması gereken ek kriterler
- Yürütme kayıtları: **yürütme sayısı**, **son çalıştırma**, **yürütme geçmişi**

## Planlanan oluşturma akışı

Kural oluşturma üç adımlı bir sihirbaz olacak:

1. **Tetikleyici** — ad, açıklama, tetikleyici türü ve parametreleri
2. **Eylem** — eylem türünü seç
3. **İnceleme** — kural, düz dilde bir cümle olarak gösterilir, _"{tetikleyici} olduğunda, {eylem}"_, böylece kaydetmeden önce kontrol edebilirsiniz

## Yaygın sorular

- **Etkinleştirme anahtarı hareket etmiyor — izinler mi?** Hayır. Özellik tamamlanırken herkes için devre dışı bırakılmıştır; arayüzde bu açıkça belirtilmiştir. Beklenen durumdur.
- **Başarı oranı ölçer neyi?** İçgörü Paneli'nin sabit 30 günlük penceresinde başarıyla tamamlanan kural yürütmelerinin oranını ölçer.
- **"Pil %20'nin altında VE bir yıldan eski" ifadesini yazabilir miyim?** Kurallar modelde bir koşullar listesi taşır, ancak koşul düzenleyici henüz mevcut değildir.

## İpuçları

- **Şimdi tetikleyici → eylem çiftleri düşünün** — istediğiniz kuralları yazmak ("her 30 günde bir → servis planla", "IoT hata olayı → görev oluştur") otomasyon açıldığında kullanımı çok kolaylaştırır.
- **"Bugün tetiklendi" sayacını canlı izleyin** — beklenenden çok daha sık tetiklenen bir kural yanlış yapılandırılmıştır; silmek yerine duraklatın (`paused` durumu).
