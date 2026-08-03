# Bildirimler

Bildirimler, gösterge panelindeki canlı etkinlikleri gösterir — yeni biletler, IoT uyarıları, ödeme etkinlikleri, araç sorunları, sistem mesajları. WebSocket bağlantısı üzerinden gelirler, böylece sayfa yenilemeden gerçek zamanlı güncellemeler alırsınız.

## Üst çubuktaki zil

Üst çubuktaki **zil simgesi** giriş noktanızdır. Kırmızı rozet okunmamış bildirim sayısını gösterir.

- Rozet yok → okunmamış yok
- Sayı rozeti → o kadar okunmamış
- `99+` → 99'dan fazla okunmamış

Zile tıklayarak **Bildirimler panelini** sağda yan panel olarak açın.

## Panelin içi

### Başlık

- **Başlık** "Bildirimler"
- **Okunmamış sayısı** "N okunmamış" veya hiç yoksa "Hepsi yakalandı" olarak gösterilir
- **Ayarlar kısayolu** (dişli simgesi) global bildirim ayarları sayfasını açar

### Tarayıcı bildirimleri anahtarı

Tarayıcınız sistem bildirimlerini destekliyorsa, başlığın altında bir anahtar görünür:

- **Kapalı** → bildirimler sadece gösterge panelinde canlıdır
- **Açık** → yeni bir şey geldiğinde, sekme arka planda olsa bile tarayıcı sistem bildirimi gösterir
- İlk kez etkinleştirirken, tarayıcı izin ister

Daha önce izin vermediyseniz, anahtar devre dışı bırakılır ve tarayıcı site ayarlarında yeniden etkinleştirme talimatları içeren sarı bir bildirim görünür.

### Liste

Bildirimler en yeniden en eskiye listelenir. Her öğe şunları gösterir:

- **Kategori simgesi** — öncelik rengine göre renklendirilmiş küçük simge (aşağıya bakınız)
- **Başlık** — kısa başlık
- **Gövde** — etkinlik açıklaması
- **Zaman** — örn. "2 dakika önce"
- İlgili sayfaya (ilgili bilet, araç, ödeme vb.) gitmek için öğeye **tıklayın**

### Boş durum

Gösterilecek bir şey yoksa, panel dostça bir mesaj ve ayarlar sayfasını açan bir düğme gösterir.

## Kategoriler ve öncelik

Her bildirim bir **kategoriye** (simgeyi belirler) ve bir **önceliğe** (rengi belirler) sahiptir.

### Kategoriler

| Kategori    | Simge          | Tipik etkinlikler                            |
| ----------- | -------------- | ------------------------------------------- |
| Destek      | 🔔 Zil         | Yeni biletler, bilet yanıtları              |
| Bakım       | 🔧 Anahtar     | Atanan servis görevleri, otomasyon tetikleyicileri |
| Araç        | ✨ Parıltılar  | Durum değişiklikleri, anormallikler          |
| Müşteri     | 👥 Kullanıcılar| Yeni kayıtlar, hesap bayrakları             |
| Ödeme       | 💳 Kart        | İşlemler, iadeler, webhook etkinlikleri     |
| IoT         | 🖥️ Cpu         | Cihaz çevrimdışı, düşük pil, sensör uyarıları |
| Sistem      | 🛎️ Zil Çalması | Sistem mesajları, dağıtımlar                 |
| Güvenlik    | 🛡️ Kalkan Uyarısı | Kimlik doğrulama etkinlikleri, şüpheli aktiviteler |

### Öncelik renkleri

| Öncelik  | Renk   | Kullanım                                           |
| -------- | ------ | ------------------------------------------------- |
| Kritik   | Kırmızı| Hemen eylem gerektirir (araç arızası, güvenlik uyarısı) |
| Yüksek   | Turuncu| Önemli ama engelleyici değil                       |
| Orta     | Amber  | Rutin dikkat gerektirir                            |
| Düşük    | Mavi   | Bilgilendirici                                    |

## Ayarlar (daha derin yapılandırma)

Zil paneli temel özellikleri kapsar. Tam yapılandırma için **Ayarlar → Uyarılar ve Bildirimler** sayfasını açın (veya panel başlığındaki dişli simgesine tıklayın):

- **Sesler** — öncelik başına ses seçin veya sesleri kapatın
- **Sağlayıcılar** — bildirimleri harici kanallara (Telegram vb.) sohbet/alıcı bazında iletin
- **Filtreleme** — hangi kategorilerden bildirim almak istediğinizi seçin
- **Sessize alma programları** — sessiz saatler (desteklenen yerlerde)

## İzin nasıl çalışır

Tarayıcı bildirimleri için tarayıcıdan bir defaya mahsus izin gerekir. Paneldeki anahtar ilk kez açıldığında tarayıcı izin istemini tetikler.

- **Verildi** → anahtar çalışır; gösterge paneli herhangi bir sekmede açıkken sistem bildirimleri alırsınız
- **Reddedildi** → anahtar kapalı kalır; tarayıcınızın site ayarlarından izni açmanız, sonra geri gelip anahtarı açmanız gerekir
- **Desteklenmiyor** → bazı gömülü tarayıcılar ve eski sürümler sistem bildirimlerini gösteremez; anahtar gizlenir

Tarayıcı izni vermek gösterge paneli içindeki hiçbir şeyi değiştirmez — uygulama içi panel her durumda çalışır.

## İpuçları

- **Tarayıcı bildirimlerini tek bir sekmede kullanın** — gösterge panelini birden fazla sekmede açmak sistem bildirimlerini çoğaltabilir
- **Sesler yereldir** — sadece bağlı olduğunuz sekmede çalar; paylaşılan bilgisayarlarda sessize alın
- **Tıklama en hızlı iş akışıdır** — bildirime tıklamak sizi doğrudan tetikleyen sayfaya götürür; manuel gezinmekten daha hızlıdır
- **Bağlantı kesilirse** — WebSocket bağlantısı koparsa, avatarın küçük durum noktası kırmızı olur. Bağlantı geri geldiğinde bildirimler devam eder; bu arada hiçbir şey kaybolmaz
- **Öncelik kritik olanlar** — çok sayıda bildirim aynı anda gelirse, başlıklardan önce renkleri tarayın: kırmızı simgeler kuyruğunuzun en üstüne gider
