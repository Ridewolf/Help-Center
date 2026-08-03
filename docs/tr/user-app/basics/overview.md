# Kullanıcı Uygulaması — Genel Bakış

Kullanıcı uygulaması (rider app), müşterilerinizin paylaşılan araçları bulmak ve kullanmak, cüzdan bakiyesini doldurmak, geçmiş sürüşleri incelemek ve destek ekibinize ulaşmak için kullandığı mobil uygulamadır.

Bu makale, o uygulamanın haritasıdır: ne işe yarar, her ekran nerede bulunur ve hangi kılavuz hangi soruya cevap verir. Bir rider yazdığında ve tam ekran adını ve adımları bilmeniz gerektiğinde başlangıç noktası olarak kullanın.

İlk açılış için rider odaklı bir rehber isterseniz, bkz. [Getting started](getting-started.md). Saha personeli uygulaması için bkz. [Service app — Overview](../../service-app/basics/overview.md).

## Uygulamanın yapabilecekleri

- Ana ekran olarak canlı araç haritası
- Birkaç bakiye yükleme sağlayıcısı ile cüzdan bakiyesi
- Sürüş geçmişi, sürüş başına maliyet dökümü ve rota haritası
- Destek ile canlı sohbet ve etkinleştirdiğiniz iletişim kanalları
- Birkaç arayüz dili, açık ve koyu temalar
- Cihaz başına oturum yönetimi

## Rider'lar uygulamada nasıl gezinir

**Harita** ana ekrandır. Diğer her şey **yan menü**den açılır; rider haritadan bu menüyü çeker — bu çekmece uygulamanın tek gezinme kabuğudur. Uygulamada alt sekme çubuğu yoktur, bu yüzden bir rider'ı araması için asla yönlendirmeyin.

Operatör sohbet mesajları ayrıca rider'ı doğrudan bir ekrana götüren uygulama bağlantıları içerebilir (örneğin Gizlilik ekranı).

## Göreve göre hızlı yanıtlar

### Hesap, giriş ve kurulum

| Rider sorusu                              | Cevabın bulunduğu yer                                                 |
| ------------------------------------------- | ------------------------------------------------------------------- |
| Nasıl giriş yaparım?                           | [Signing in](../account/registration-login.md) — mevcut yöntemler şirket ayarlarınızdan gelir, bu yüzden giriş ekranı her operatör için aynı değildir |
| Şifremi unuttum                        | [Signing in](../account/registration-login.md)                      |
| Uygulamayı Telegram veya Viber botundan açtım | [Signing in](../account/registration-login.md)                    |
| İlk girişten hemen sonra ne olur? | [Onboarding and verification](../account/onboarding-verification.md) |
| Hangi belgeler isteniyor?              | [Onboarding and verification](../account/onboarding-verification.md) |
| Hesabım neden engellendi?                  | [Onboarding and verification](../account/onboarding-verification.md) — **Account Blocked** ekranı |
| Uygulamanın ilk turu                       | [Getting started](getting-started.md)                               |

### Araç bulma ve sürüş

| Rider sorusu                                          | Cevabın bulunduğu yer                    |
| ------------------------------------------------------- | -------------------------------------- |
| Araç nasıl bulunur ve seçilir? Rezervasyon fiyatlandırması nasıl çalışır? | [Map](../riding/map.md)  |
| Sürüş nasıl başlatılır, duraklatılır ve sonlandırılır?                   | [Rides](../riding/rides.md)            |
| Neden sürüş başlatamıyorum?                               | [Rides](../riding/rides.md) — eksik **Scan** butonu, minimum başlangıç bakiyesi, konum izni, araçtan çok uzak olma, rezervasyon bekleme süresi ve tamamlanmamış başlangıç fotoğraflarını kapsar |
| Sürüş sonunda park fotoğrafı ne olacak?                 | [Rides](../riding/rides.md) — park alanı dışı diyalog dahil |
| Sürüş maliyetim neye dayanıyor?                           | [Rides](../riding/rides.md) ve [History](../money/history.md) |

### Para ve ödemeler

| Rider sorusu                        | Cevabın bulunduğu yer                                              |
| ------------------------------------- | ---------------------------------------------------------------- |
| Nasıl bakiye yüklerim?                      | Giriş noktası için [Wallet](../money/wallet.md), her yükleme akışının tam adım adım açıklaması için [Payment methods](../money/payment-methods.md) |
| Kart nasıl eklenir?                  | [Payment methods](../money/payment-methods.md)                    |
| Hangi sağlayıcılar var ve nasıl farklılar? | [Payment methods](../money/payment-methods.md)            |
| Yüklemem beklemede takıldı / iptal etmek istiyorum | [Payment methods](../money/payment-methods.md)         |
| Otomatik bakiye yükleme nasıl çalışır?            | [Wallet](../money/wallet.md)                                      |

### Geçmiş, makbuzlar ve istatistikler

| Rider sorusu                                    | Cevabın bulunduğu yer                                        |
| ------------------------------------------------- | ---------------------------------------------------------- |
| Geçmiş sürüşlerim ve ödemelerim nerede?             | [History](../money/history.md) — iki sekme, her biri sayfalı  |
| Bir sürüş için makbuz, rota haritası ve maliyet dökümü lazım | [History](../money/history.md) — sürüş detayı       |
| Toplamlarım nedir?                               | [History](../money/history.md). **Analytics** ekranı şu anda uygulamada mevcut değil — bkz. [Analytics](../money/analytics.md) |

### Profil, ayarlar ve güvenlik

| Rider sorusu                                 | Cevabın bulunduğu yer                                     |
| ---------------------------------------------- | ------------------------------------------------------- |
| Adımı, fotoğrafımı veya şifremi nasıl değiştiririm? | [Profil](../account/profile.md)                     |
| Hesabımı nasıl silerim?                    | [Profil](../account/profile.md) — bu çalışma akışıdır. [Gizlilik](../account/privacy.md) sayfası, Gizlilik ekranındaki butonun neden kullanılmaması gerektiğini açıklar |
| Bildirimler, dil, tema, harita görüntüsü    | [Ayarlar](../help/settings.md)                         |
| Hangi cihazlarda oturum açtım?               | [Oturumlar](../account/sessions.md)                      |
| Gizlilik politikası / güvenlik rehberi nerede?  | [Gizlilik](../account/privacy.md)                       |

### Yardım

| Rider sorusu                        | Cevabın bulunduğu yer                     |
| ------------------------------------- | --------------------------------------- |
| Desteğe nasıl ulaşırım?               | [Destek](../help/support.md)           |
| Abonelikler veya promosyon kodu         | [Abonelikler](../money/subscriptions.md) — şu anda uygulamada mevcut değil |

## Ekran referansı

| Ekran              | Yol                         | Nedir                                                   |
| ------------------- | --------------------------- | ------------------------------------------------------------ |
| **Harita**             | `/map`                      | Ana ekran — bir araç bulun ve seçin                      |
| **Cüzdan**          | `/wallet`                   | Bakiye, bonuslar, bakiye yükleme, otomatik bakiye yükleme                        |
| **Ödeme yöntemleri** | `/wallet/payment-methods`   | Kaydedilmiş kartlar ve bekleyen bakiye yüklemeler                              |
| **Geçmiş**         | `/history`                  | **Sürüşler** ve **Ödemeler** sekmeleri; bir sürüşe dokunarak detayını görün   |
| **Profil**         | `/profile`                  | Hesap bilgileri, fotoğraf, şifre, hesap silme              |
| **Ayarlar**        | `/settings`                 | Bildirimler, harita görüntüsü, dil, tema                  |
| **Oturumlar**        | `/settings/sessions`        | Hesaba giriş yapılmış tüm cihazlar                        |
| **Gizlilik**         | `/privacy`                  | Gizlilik politikası ve güvenlik rehberleri                         |
| **Destek**         | `/support`                  | **SSS** ve **İletişim** sekmeleri, ayrıca canlı sohbet                 |

## Şu anda uygulamada mevcut değil

Bunları bir rider'a vaat etmeyin — şu anda uygulamada mevcut değiller:

- **Abonelikler** ve **promosyon kodları** — ekran açılamıyor
- **Analitik** — toplamlar için riderları **Geçmiş**e yönlendirin
- **Kayıt sırasında belge yükleme** — asla bir rider'a belgesinin alındığını söylemeyin
- **Sürüş Modu**, **Birimler**, **Çevrimdışı Haritalar**, **davet kodları**, **Verilerimi indir** ve Gizlilik ekranındaki **Hesap Silme Talebi** butonu

Hesap silme işlemi kendisi çalışır — **Profil**den, bkz. [Profil](../account/profile.md).

## Şirket ayarlarınızın değiştirdikleri

Uygulamanın bazı bölümleri operatörler arasında farklıdır çünkü bunları gösterge panelinde, **Ayarlar → Şirketim → Uygulama** altında yapılandırırsınız:

- **Kimlik Doğrulama Yöntemleri** — rider'ın giriş ekranında hangi sekmeleri gördüğü
- **Kayıt Ek Adımları** — kayıt sırasında ekstra belge istenip istenmediği
- **Destek kanalları** — Destek ve Hesap Engellendi ekranlarında hangi iletişim kanallarının göründüğü
- **Hukuki & uyumluluk** — uygulamada gösterilen Hizmet Şartları ve Gizlilik Politikası bağlantıları

Operatör tarafı için bu ayarları görmek üzere bkz. [Şirketim](../../settings/administration/my-company.md).
