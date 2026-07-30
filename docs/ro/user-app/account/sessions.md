# Sesiuni — Dispozitivele autentificate în cont

Ecranul **Sesiuni** (Sessions) (`/settings/sessions`) listează fiecare loc în care contul unui rider este autentificat în prezent și îi permite să deconecteze acele locuri. Este ecranul la care apelezi de fiecare dată când un rider suspectează că altcineva are acces la contul lui.

Două puncte de intrare, ambele ducând aici:

- **Profile → Manage Sessions**
- **Settings → Privacy card → Manage Sessions**

## Cum este organizată lista

Sesiunile sunt **grupate pe dispozitiv** — browser și versiune, sistem de operare și versiune, tip de dispozitiv, vendor și model — astfel încât același telefon apare o singură dată, nu de zeci de ori.

Grupurile sunt sortate deliberat:

1. Dispozitivul curent al riderului, primul
2. Apoi după status: **active**, apoi **inactive**, apoi **old**
3. Apoi după ultima activitate, cele mai noi primele

Fiecare grup este pliabil. Extinderea lui dezvăluie fiecare sesiune individuală ce aparține acelui dispozitiv.

## Citirea unui grup de dispozitive

| Ce vezi                          | Semnificație                                                                    |
| ------------------------------------- | -------------------------------------------------------------------------- |
| **Eticheta dispozitivului**                      | Vendor și model, când sunt cunoscute, altfel sistemul de operare și versiunea lui |
| Iconița de tip dispozitiv                      | Telefon, tabletă sau monitor                                                    |
| **Eticheta browserului**                     | Browserul și versiunea din spatele sesiunii                                  |
| Eticheta de **status sesiune**              | Vezi tabelul de mai jos                                                         |
| **Ultima activitate**                     | Timp relativ — „chiar acum”, N minute / ore / zile în urmă, și o dată absolută odată ce depășește o săptămână |
| **Numărul de sesiuni**                     | Câte sesiuni are acel dispozitiv                                           |
| **Locație**                          | Oraș, țară și adresă IP                                                    |
| **Creat**                           | Când a început acea sesiune                                                |
| **Current Device** / **Current Session** | Etichetă evidențiată pe dispozitivul și sesiunea pe care riderul le folosește chiar acum |

### Etichetele de status

| Etichetă        | Semnificație                              |
| ------------ | ------------------------------------ |
| **active**   | Ultima activitate cu mai puțin de o oră în urmă  |
| **inactive** | Ultima activitate cu mai puțin de 24 de ore în urmă |
| **old**      | Ultima activitate acum 24 de ore sau mai mult   |

Eticheta măsoară **doar recența** — nu spune dacă o sesiune mai este valabilă. O etichetă „old” nu înseamnă că sesiunea a expirat.

## Deconectarea unei singure sesiuni

Sesiunea curentă nu are niciun control de ștergere — prin design, nu poate fi eliminată din această listă. Orice altă sesiune poate fi:

1. Extinde grupul de dispozitiv
2. Atinge iconița de **coș** de pe sesiune
3. Confirmă în dialog

Lista se reîncarcă și sesiunea dispare.

## Acțiuni în masă

| Acțiune                     | Ce face                                                                                                   |
| -------------------------- | -------------------------------------------------------------------------------------------------------------- |
| **Logout Other Sessions**  | Deconectează fiecare sesiune, cu excepția celei de pe dispozitivul din mâna riderului. Aceasta este acțiunea potrivită când un rider suspectează că altcineva are acces la cont |
| **Logout All Sessions**    | Deconectează totul, **inclusiv dispozitivul curent**, astfel încât riderul este trimis înapoi la ecranul de autentificare și trebuie să se autentifice din nou. Stilizat ca acțiune distructivă din acest motiv |
| **Revoke Device**          | Oferit pe un grup de dispozitiv extins, care nu este dispozitivul curent — deconectează fiecare sesiune de pe acel dispozitiv      |

Cât timp o cerere de deconectare rulează, butoanele sunt dezactivate. Un eșec arată un mesaj scurt de eroare; un succes arată o confirmare și reîncarcă lista.

## Fluxuri tipice

- **Riderul crede că altcineva îi este în cont** — **Logout Other Sessions**, apoi schimbă parola din **Profil**. Reține că o schimbare reușită a parolei deconectează și riderul, deci se va autentifica încă o dată după aceea ([Profil](profile.md))
- **O autentificare uitată pe un telefon împrumutat** — extinde acel grup de dispozitiv, **Revoke Device**
- **Începe curat peste tot** — **Logout All Sessions**, apoi autentifică-te din nou ([Autentificare](registration-login.md))

## Întrebări frecvente

- **De ce nu poate riderul să-și șteargă sesiunea curentă?** Nu este afișat niciun control de ștergere pentru ea. Pentru a încheia sesiunea curentă, folosește **Logout All Sessions**, sau butonul normal **Log Out** din Profil.
- **Ce înseamnă „active” de fapt?** Activitate în ultima oră — nimic mai mult.
- **De ce un telefon arată mai multe sesiuni?** Sesiunile sunt create per autentificare. Ecranul le grupează sub un singur dispozitiv și arată numărul.
- **Butonul Manage Sessions e gri.** Contul are o ștergere în așteptare, ceea ce dezactivează gestionarea sesiunilor, la fel ca editarea profilului — vezi [Profil](profile.md).

## Articole conexe

- [Profil](profile.md) — schimbarea parolei, deconectare, ștergerea contului
- [Setări](../help/settings.md) — cardul Confidențialitate, care de asemenea trimite aici
- [Confidențialitate](privacy.md) — politica de confidențialitate și ghidul de siguranță
