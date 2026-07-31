# Etiketler

Etiketler sayfası (`/settings/tags`), şirketiniz için **paylaşılan etiket kütüphanesidir**. Bir etiket, araçlara, müşterilere, operatörlere, sürüşlere ve ödemelere ekleyebileceğiniz, onları filtrelemek, gruplamak ve raporlamak için kullanılan isimlendirilmiş bir rozetdir. Buradaki liste tek gerçek kaynaktır — bir etiket eklediğinizde, desteklenen her yerde kullanılabilir hale gelir.

Gerekli izin: **Etiketler** (`d1e2f3`). Alt izinler oluşturma, düzenleme ve silmeyi kontrol eder.

## Etiketlerin kullanıldığı yerler

Etiketler **tek bir küresel havuzdur** — varlık bazında kapsam yoktur. Aynı etiket farklı türde kayıtlara eklenebilir:

- **[Araçlar](../../operations/fleet/vehicles.md)** — örn. "Temizlik gerekiyor", "Öncelikli bakım", "Test filosu"
- **[Müşteriler](../../operations/customers/clients.md)** — örn. "VIP", "Kurumsal", "Engelleme listesi"
- **[Operatörler](../access/operators.md)** — örn. "Gece vardiyası", "Eğitmen", "Çağrıda"
- **Sürüşler** — inceleme, itiraz veya kampanya takibi için etiketlenmiş
- **Ödemeler** — mutabakat veya takip için etiketlenmiş

Her kayıt birden fazla etiket taşıyabilir; etiketle filtreleme, destekleyen her listede mevcuttur.

## Filtreler

| Filtre  | Tür   | Notlar                                   |
| ------- | ----- | ---------------------------------------- |
| Arama   | Metin | Etiket adı (etiket) ve açıklamada arama |

Liste varsayılan olarak sayfa başına 50 satır gösterir ve filtreleri **Temizle** işlemiyle sıfırlar.

## Sütunlar

| Sütun           | Sıralanabilir mi? | İçerik                                                        |
| --------------- | ---------------- | ------------------------------------------------------------- |
| **Etiket adı**  | EVET             | Etiket simgesi + etiket; etiket detay sayfasına bağlantı     |
| **Durum**       | EVET             | `Public` veya `Private` (aşağıya bakınız)                     |
| **Açıklama**    | HAYIR            | Serbest metin açıklama; boşsa "Açıklama yok" yer tutucu      |
| **Tarih**       | EVET             | Üstte oluşturulma tarihi, altında güncellenme tarihi          |

Sayfa başlığı ayrıca **Otomatik yenileme**, **+ Oluştur**, **İçe Aktar** (yakında) ve **Dışa Aktar** (JSON indirimi — mevcut sayfa, tüm filtrelenmiş veya belirli sayfalar) seçeneklerini sunar.

## Satır işlemleri

Her satırda üç noktalı menü. Kullanılabilir işlemler izinlere bağlıdır:

| İşlem            | İzin       | Ne yapar                                                                                      |
| ---------------- | ---------- | --------------------------------------------------------------------------------------------- |
| **Detayları Gör** | —          | Etiketin detay sayfasını açar                                                                 |
| **Düzenle**       | `edit`     | Düzenleme formunu açar (etiket, durum, açıklama)                                              |
| **Sil**           | `delete`   | Etiketi şirketten kaldırır. **Önceden etiketlenmiş kayıtlar bağlantıyı kaybeder** — dikkatli kullanın |

Silme işlemi kazara yapılmasını önlemek için 3 saniyelik basılı tutma ile onay gerektirir.

## Detay sayfası

Bir satıra tıklamak (veya _Detayları Gör_) etiketi detay sayfasında açar:

- **Etiket bilgisi** — etiket, durum, açıklama (Markdown desteği ile render edilir)
- **Meta veriler** — dahili kimlik, oluşturulma / güncellenme zaman damgaları

Düzenle ve Sil işlemleri detay sayfasının başlık eylemlerinden de erişilebilir.

## Oluştur / Düzenle formu

**Etiket formu** (`+ Oluştur` veya _Düzenle_) üç alana sahiptir:

- **Etiket** (zorunlu) — görünür etiket adı; kolayca tanınacak kadar benzersiz olmalı
- **Durum** (zorunlu) — `Public` veya `Private`
  - **Public** — şirket genelindeki tüm operatörler tarafından görünür ve seçilebilir
  - **Private** — görünürlüğü kısıtlı; dahili/yöneticiye özel etiketleme iş akışları için kullanışlı
- **Açıklama** (isteğe bağlı) — etiketi ne zaman kullanacağınıza dair serbest metin; detay sayfasında gösterilir

Yan panelde canlı bir **önizleme** etiket adı ve açıklamanın yazarken nasıl görüneceğini gösterir. Kaydet, etiketin boş olmadığını doğrular, şirket etiket havuzuna yazar ve paylaşılan etiket önbelleğini temizler, böylece diğer sayfalar bir sonraki açılışta güncellenir.

## Tipik iş akışları

- **Yeni etiket ekleme** — `+ Oluştur` → etiket yaz → Public/Private seç → isteğe bağlı açıklama ekle → Kaydet → etiket hemen Araçlar / Müşteriler / Operatörler filtrelerinde ve düzenleme formlarında kullanılabilir
- **Etiket adını değiştirme** — Düzenle → Etiket değiştir → Kaydet (önceden etiketlenmiş tüm kayıtlar bağlantıyı korur; yeni ad her yerde görünür)
- **Etiketi devre dışı bırakma** — Satır menüsünden Sil veya önce Durumu Private yaparak yeni etiketlemeden gizle, ancak geçmiş bağlantıları koru (sonra sadece doğrudan düzenleme ile yeniden ekleyebilirsin)
- **Yinelenenleri temizleme** — listede benzer etiketleri ara ("vip" vs "VIP") → birini düzenleyip isimleri birleştir, sonra diğerini sil (not: silinen etikete bağlı kayıtlar bağlantıyı kaybeder — önce yeniden etiketle)
- **Toplu dışa aktarma** — Dışa Aktar → Tüm filtrelenmiş → JSON indirimi, ekibinle paylaşmak veya taksonomiyi yedeklemek için

## İpuçları

- **Etiketler küreseldir** — ayrı "müşteri etiketleri" veya "araç etiketleri" alanı yoktur. Bir etiketin (örneğin "VIP") hangi varlığa eklendiğinde anlamlı olacağını açıkça adlandırın veya düzenli tutmak için önekler kullanın ("client:vip", "vehicle:maintenance")
- **Varsayılan Public'tir** — görünürlüğü kısıtlamak için özel bir nedeniniz yoksa Public bırakın
- **Silme işlemi geri alınamaz** — etiketi taşıyan her kayıt bağlantıyı hemen kaybeder; emin değilseniz yeniden adlandırmayı veya Private yapmayı tercih edin
- **Açıklama Markdown destekler** — detay görünümünde kullanarak etiketi kimlerin ve ne zaman uygulaması gerektiğini belgeleyin
- **Paylaşılan önbellek her kaydetme / silmede temizlenir** — diğer açık sekmeler değişikliklerinizi sonraki gezintilerinde tam sayfa yenilemeden alır
- **Etiket adları Ridewolf'un bağlamsal filtrelerinde her yerde görünür** — yoğun tablolarda en iyi kullanıcı deneyimi için kısa ve küçük harfe uygun tutun
