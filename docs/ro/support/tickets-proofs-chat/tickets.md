# Tickete — Listă

Lista de tickete (`/support/tickets`) este coada de suport pentru probleme ridicate despre un vehicul — daune mecanice, defecte electrice, piese rupte, probleme de siguranță etc. Fiecare ticket este ancorat unui vehicul specific și conține o fotografie, raportor, tipul plângerii, un cronometru SLA și un status.

Pentru investigația per-ticket (thread complet, dovezi, acțiuni de rezolvare) vezi **pagina de detaliu** (deschisă prin click pe rând).

Pentru interfața streamlined a cozii, vezi [Ticket Auto Review](ticket-auto-review.md).

Permisiune necesară: **Tickets** (`a8b9c1`).

## Cum apar ticketele aici

Ticketele sunt create din câteva surse:

1. **Raport rider** — aplicația mobilă are flow "raportează o problemă"; riderul alege un tip de plângere, face o fotografie, lasă o notă
2. **Inițiat de operator** — un operator deschide un ticket pentru un vehicul cu o problemă observată (rar; de obicei se preferă [maintenance task](../../operations/fleet/vehicle-detail.md))
3. **Sistem-flagged** — regulile IoT sau de analitică pot ridica tickete automat (ex. anomalie baterie)

Fiecare ticket nou aterizează în această listă cu un status (de obicei _Pending_) și pornește cronometrul SLA.

## Filtre

| Filtru         | Tip      | Note                                                                                    |
| -------------- | -------- | --------------------------------------------------------------------------------------- |
| Search         | Text     | Caută ID ticket, etichetă vehicul, raportor, locație                                    |
| Status         | Dropdown | Listă din backend (`Pending`, `In progress`, `Resolved`, `Dismissed`, `Duplicate` etc.) |
| Complaint type | Dropdown | 7 tipuri — referință mai jos                                                            |

Filtrele se combină cu AND. Chip-urile apar deasupra tabelului; URL-ul reflectă starea curentă.

## Coloane

| Coloană      | Sortabilă? | Conținut                                                          |
| ------------ | ---------- | ----------------------------------------------------------------- |
| **Photo**    | —          | Miniatură foto-dovadă de la rider (click pentru mărire)           |
| **Vehicle**  | —          | Etichetă și model vehicul; click deschide detaliul                |
| **SLA**      | —          | Timpul rămas până la deadline-ul SLA (devine roșu când e depășit) |
| **Location** | —          | Unde a fost raportat — coordonate și / sau adresă                 |
| **Reporter** | —          | Cine a raportat (nume rider sau system / operator)                |
| **Status**   | —          | Pilula de status cu culoare (referință mai jos)                   |
| **Dates**    | —          | Timestamp-uri Created at / updated at                             |

## Tipuri de plângere

Șapte tipuri ajută la triajul rapid. Fiecare e colorat:

| Tip                   | Culoare badge      | Ce înseamnă de obicei                                           |
| --------------------- | ------------------ | --------------------------------------------------------------- |
| **Mechanical damage** | Destructive (roșu) | Accident, ramă ruptă, componente îndoite                        |
| **Electrical issue**  | Warning (galben)   | Probleme accelerație, lumini, senzori                           |
| **Battery problem**   | Default (albastru) | Nu se încarcă, se descarcă mai repede decât ar trebui           |
| **Broken parts**      | Destructive (roșu) | Cric lipsă, reflector lipsă, frâne deteriorate                  |
| **Safety concern**    | Destructive (roșu) | Orice face vehiculul nesigur de călărit                         |
| **Cleanliness**       | Warning (galben)   | Murdar, miros, suprafețe lipicioase — urgență scăzută           |
| **Other**             | Outline            | Nu se încadrează în categoriile de mai sus — citește descrierea |

Categoriile roșii necesită de obicei scoaterea imediată din serviciu; galbene/albastre pot aștepta o fereastră de service.

## Referință statusuri

Lista de statusuri este preluată din backend, deci poate varia în funcție de deployment. Tipice:

| Status          | Variant            | Înseamnă                                                     |
| --------------- | ------------------ | ------------------------------------------------------------ |
| **Pending**     | Secondary (gri)    | Tocmai raportat, nimeni nu lucrează încă                     |
| **In progress** | Default (albastru) | Atribuit unui operator sau creat maintenance task            |
| **Resolved**    | Success (verde)    | Problemă rezolvată; ticket închis                            |
| **Rejected**    | Destructive (roșu) | Operatorul a determinat că nu e o problemă reală             |
| **Cancelled**   | Destructive (roșu) | Închis fără rezolvare (folosit adesea pentru rapoarte slabe) |
| **Archived**    | Outline            | Vechi / istoric                                              |
| **Duplicate**   | (închis)           | Legat de un ticket anterior pe același vehicul               |

Statusurile care conțin _resolved_, _dismissed_ sau _duplicate_ sunt considerate **închise** — nu mai contează în coada deschisă.

## Severitate

Intern, ticketele poartă o severitate (`critical`, `high`, `medium`, `low`) derivată din tipul plângerii și inputul operator/sistem. Lista expune severitatea prin **culoarea tipului de plângere** și **culoarea cronometrului SLA** — SLA depășit pe un ticket critical = prioritatea ta de top.

## Acțiuni pe rând

Fiecare rând are un **meniu cu trei puncte** cu un singur element activ:

| Acțiune          | Ce face                                                        |
| ---------------- | -------------------------------------------------------------- |
| **View details** | Deschide pagina de detaliu (thread complet + dovezi + acțiuni) |

Setul complet de acțiuni de operator (Assign, Block vehicle, Create maintenance task, Credit user, Reply, Merge duplicate) trăiește pe **pagina de detaliu** și e feature-flagged on/off per deployment. Treaba listei e să fie o coadă de triaj, nu o consolă de rezolvare.

## Acțiuni de pagină

- **Auto Review** — deschide [coada Ticket Auto Review](ticket-auto-review.md) — interfață streamlined ticket-cu-ticket

## Fluxuri tipice

- **Triaj zilnic** — filtrează `Status = Pending` → sortează după SLA (cele mai vechi sus, deadline cel mai apropiat sus) → parcurge, deschide fiecare în detaliu, decide și acționează
- **Doar critical** — filtrează `Complaint type = Mechanical damage / Safety concern` → astea sunt ticketele "scoate din serviciu"
- **Istoric vehicul** — caută după eticheta vehicul → fiecare ticket vreodată ridicat pe această unitate → util înainte de a-l trimite înapoi după reparație
- **Alarmă SLA** — sortează după SLA → ticketele din top sunt depășite → escaladează imediat

## Sfaturi

- **Fotografia este primul tău semnal** — chiar înainte de a deschide ticketul, miniatura îți spune dacă e un raport real de daună sau un submission slab
- **SLA roșu == acționează acum** — până când SLA devine roșu, fereastra contractuală e deja pierdută; asta e coada ta reactivă
- **Verifică cu vehiculul** — click pe coloana Vehicle → deschide tab-ul Alerts → problemele IoT și rapoartele de operator se suprapun adesea
- **Atenție la duplicate** — mai mulți rideri raportează adesea aceeași trotinetă stricată în câteva ore; folosește căutarea după vehicul pentru a-i găsi înainte de rezolvare
- **URL-ul se distribuie** — copiază o vizualizare filtrată (ex. _pending mechanical-damage_) și trimite-o echipei de mentenanță
