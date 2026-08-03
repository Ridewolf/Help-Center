# Rider App — Ayarlar

Ayarlar (`/settings`), sürücüye yönelik tüm uygulama tercihlerini içerir: bildirimler, haritanın çizdikleri, gizlilik anahtarları, dil, tema ve performans.

**Bir Kaydet düğmesi yoktur.** Ekran, önbelleğe alınmış ayarları anında gösterir, arka planda yeniler ve yapılan her değişikliği hemen ardından otomatik olarak uygular. Bir sürücü bir şeyi değiştirdiğinde ve ekranı hemen kapattığında, neredeyse kesin olarak kaydetmiştir — bu, "değişikliğim uygulandı mı?" sorusunun cevabıdır.

Bu anahtarlardan birkaçı [Harita](../riding/map.md) üzerinde neyin çizileceğini değiştirir, bu yüzden "harita yavaş" ve "pil seviyelerini göremiyorum" durumlarında gidilecek ilk ekran budur.

## Bildirimler

Beş bağımsız anahtar:

- **Sürüş Bildirimleri**
- **Promosyon Bildirimleri**
- **Uygulama Güncellemeleri**
- **Push Bildirimleri**
- **E-posta Bildirimleri** — tek bir anahtar; altında tür bazında alt seçenek yoktur

Aynı alanda:

| Kontrol           | Notlar                                                                       |
| ----------------- | ---------------------------------------------------------------------------- |
| **Ses**           | Anahtar                                                                      |
| **Ses Seviyesi**  | Kaydırıcı — sadece **Ses** açıkken görünür                                   |
| **Titreşim**      | Anahtar                                                                      |
| **Radar Ayarları**| Radar ayarlarının etkin olduğu uygulama sürümlerinde görünen bir kart          |

## Harita ve görüntü

Anahtarlar:

- **Pil Seviyesini Göster**
- **Promosyon Araçlarını Göster**
- **Fiyatlandırmayı Göster**
- **Otomatik Yakınlaştırma**
- **Harita 3D** — harita üzerinde hemen etkili olur
- **Azaltılmış Animasyonlar**

Ayrıca **Veri Modu** vardır; **dengeli**, **düşük** ve **yüksek** seçenekleriyle. Harita karo kalitesini ve haritanın ne kadar detay çizdiğini yönetir ve **bir sürücü haritanın yavaş veya ağır olduğunu bildirdiğinde denenmesi gereken ilk şeydir** — düşük seviyeye alın ve ayrıca **Azaltılmış Animasyonlar** açın.

**Çevrimdışı Haritalar** şu anda uygulamada mevcut değildir.

## Gizlilik kontrolleri

- **Konum Paylaşımı** anahtarı
- **Veri Paylaşımı** anahtarı
- **Gizlilik Politikası** — [Şirketim](../../settings/administration/my-company.md) içinde yapılandırdığınız harici URL’yi açar; URL ayarlandığında görünür
- **Oturumları Yönet** — oturum açmış cihazlar ekranını açar (`/settings/sessions`), Profil’den de erişilebilir

Tam gizlilik ve güvenlik yönergeleri ekranı kendi rotasıdır (`/privacy`). **Hesap silme burada değildir** — çalışan silme akışı Profil ekranındadır.

## Bölge ve görünüm

| Kontrol        | Seçenekler                        | Notlar                                                                                                   |
| -------------- | -------------------------------- | --------------------------------------------------------------------------------------------------------- |
| **Dil**        | **en**, **ru**, **ro**           | Yeniden yükleme olmadan hemen uygulanır. Bu ekranda sadece bu üç dil sunulur                              |
| **Birimler**   | —                                | Uygulamada şu anda bir birim seçici mevcut değildir                                                      |
| **Tema**       | Açık, Koyu, Sistem               | Hemen uygulanır                                                                                           |
| **Harita Stili**| Otomatik, Açık, Koyu             | **Tema Sistem olarak ayarlandığında devre dışı bırakılır ve Otomatik olarak zorlanır.** Temayı Açık veya Koyu yaparak açabilirsiniz |

Ürün içinde başka yerlerde başka yerel ayarlar olsa da, burada sadece yukarıdaki üç uygulama dili görünür — Gösterge Paneli tarafı için bkz. [Localization](../../settings/administration/localization.md).

## Sürüş Modu

**Sürüş Modu şu anda uygulamada mevcut değildir.** Sürüş modu kontrolünün nerede olduğu soran bir sürücü, bir izin kaybetmemiştir — bu bölüm uygulamada yoktur ve ekleyen bir gösterge paneli ayarı da yoktur.

## SSS

| Sürücü sorar…                        | Cevap                                                                                         |
| ----------------------------------- | --------------------------------------------------------------------------------------------- |
| "Kaydet düğmesi nerede?"           | Yoktur — değişiklikler otomatik kaydedilir                                                    |
| "Sürüş Modu nerede?"                | Şu anda uygulamada mevcut değildir                                                            |
| "Harita Stili neden gri?"           | **Tema** **Sistem** olarak ayarlanmıştır. Önce Açık veya Koyu yapın                             |
| "Dilim neden listede yok?"          | Bu ekran sadece **en**, **ru** ve **ro** sunar                                               |
| "Birim ayarı nerede?"               | Şu anda uygulamada mevcut değildir                                                            |
| "Çevrimdışı Haritalar anahtarı nerede?" | Şu anda uygulamada mevcut değildir                                                            |
| "Hesabımı nasıl silerim?"           | Ayarlardan değil, Profil ekranından                                                           |
| "Giriş yaptığım cihazları nasıl görürüm?" | **Oturumları Yönet** — burada veya Profil’deki aynı düğme                                   |
| "Harita yavaş"                      | **Veri Modu → düşük**, sonra **Azaltılmış Animasyonlar** açık. Bkz. [Harita](../riding/map.md#sorun-giderme) |

## İpuçları

- **Veri Modu performans ayarınızdır.** Bir sürücünün telefonunu ya da harita karolarınızı suçlamadan önce, onlara _düşük_ modda denemelerini söyleyin.
- **"Kaydetmedi" neredeyse hiç doğru değildir.** Ekranı yeniden açmalarını isteyin — değer orada olacaktır.
- **Harita şikayetleri genellikle burada, haritanın kendisinde değil yaşanır.** Eksik pil yüzdeleri, eksik fiyatlar ve eksik promosyon araçları bu ekrandaki anahtarlarla kontrol edilir.
- **Tema, Harita Stilini kilitler.** Bu ikiliyi ezberleyin; aksi halde haftalık bir sorun olur.
