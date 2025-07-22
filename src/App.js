import React, { useState, useMemo } from 'react';
import { Search, MapPin, Clock, Globe, Euro, Heart, Filter, X, Menu, Map } from 'lucide-react';

const locaties = [
  {
    categorie: "Bezienswaardigheden",
    naam: "Fort Kijkduin & Noordzeeaquarium",
    adres: "Admiraal Verhuellplein 1, 1789 AZ Huisduinen (Den Helder)",
    gps_coordinaten: "52.9669°N, 4.7172°O",
    beschrijving: "Dit Napoleontische fort uit 1811 biedt een spectaculair ondergronds Noordzeeaquarium, waar kinderen door een 15-meter lange tunnel oog-in-oog staan met haaien en roggen en vissen mogen voeren. Verken eeuwenoude ondergrondse gangen en geniet van een adembenemend uitzicht over de Noordzee en Texel vanaf de koepel. Ideaal bij slecht weer.",
    prijsindicatie: "Volwassenen €11, Senioren (65+) €10, Kinderen 4-12 jaar €9,50, 0-3 jaar gratis",
    openingstijden: "Dagelijks 10:00-17:00 uur",
    website: "https://fortkijkduin.nl/",
  },
  {
    categorie: "Bezienswaardigheden",
    naam: "Marinemuseum, Den Helder",
    adres: "Hoofdgracht 3, 1781 EW Den Helder",
    gps_coordinaten: "52.9638°N, 4.7717°E",
    beschrijving: "Een boeiend museum dat de geschiedenis van de Nederlandse marine tot leven brengt. Verken unieke museumschepen, waaronder de onderzeeboot Tonijn, waar oud-bemanningsleden persoonlijke verhalen delen. Het interactieve brughuis De Ruyter en speciale audiotours voor kinderen maken dit 'Kidsproof' museum ideaal bij minder goed weer.",
    prijsindicatie: "Ca. €8–€12 p.p. (diverse tarieven)",
    openingstijden: "Dinsdag-zondag 10:00-17:00 uur (maandag gesloten)",
    website: "marinemuseum.nl",
  },
  {
    categorie: "Bezienswaardigheden",
    naam: "De Klimduin, Schoorl",
    adres: "Midden in het centrum van Schoorl",
    gps_coordinaten: "Niet expliciet vermeld",
    beschrijving: "Een indrukwekkende zandduin van 51 meter hoog, perfect voor kinderen om te klimmen, rennen en van af te rollen. Een nostalgisch uitje waar ouderen kunnen genieten van het weidse uitzicht of de levendigheid vanaf de basis kunnen observeren. Horeca is direct aan de duin beschikbaar voor een complete, ontspannen ervaring.",
    prijsindicatie: "Gratis toegang",
    openingstijden: "Altijd toegankelijk (natuurlijke omgeving)",
    website: "Niet gespecificeerd",
  },
  {
    categorie: "Bezienswaardigheden",
    naam: "Floratuin Julianadorp",
    adres: "Julianadorp",
    gps_coordinaten: "Niet expliciet vermeld",
    beschrijving: "Een prachtige showtuin met meer dan 2.000 verschillende soorten bolgewassen, die vooral in het voorjaar op zijn mooist is. Deze open ruimte biedt een rustpunt voor ontspanning en wandelingen voor ouderen, terwijl jonge kinderen veilig kunnen rondrennen en spelen. Een \"must see\" in Julianadorp.",
    prijsindicatie: "Vaak gratis of een kleine bijdrage",
    openingstijden: "Vaak seizoensgebonden; controleer lokaal",
    website: "Niet gespecificeerd",
  },
  {
    categorie: "Bezienswaardigheden",
    naam: "Hollands Kaasmuseum Alkmaar",
    adres: "Waagplein 2, 1811 JP Alkmaar",
    gps_coordinaten: "52.6317°N, 4.7482°O",
    beschrijving: "Interactief museum in het monumentale Waaggebouw met touchscreen spelletjes, een stickerspeurtocht en een speciale kinderruimte. Geniet van het uitzicht over de wereldberoemde Kaasmarkt (vrijdags). Educatief en speels leren over Nederlandse kaasmaking. Ideaal overdekt bij slecht weer.",
    prijsindicatie: "Volwassenen €6, Kinderen (t/m 12) €2,50, 0-3 jaar gratis",
    openingstijden: "Ma-do 10:00-16:00, Vr 09:00-16:00, Za 10:00-16:00, Zo 12:00-16:00 uur",
    website: "https://www.kaasmuseum.nl/",
  },
  {
    categorie: "Bezienswaardigheden",
    naam: "Historisch Centrum Alkmaar",
    adres: "Startpunt Waagplein, 1811 JP Alkmaar",
    gps_coordinaten: "52.6317°N, 4.7482°O",
    beschrijving: "Verken het pittoreske centrum van Alkmaar via de Elfendeurtjesroute, een schattenjacht naar 23 kleine deurtjes. Maak een 45-minuten grachtenrondvaart of bezoek de Grote Kerk Sint Laurens. Geniet van de gezellige terrasjes in dit historische centrum.",
    prijsindicatie: "Elfendeurtjes gratis, Grachtenrondvaart €12-15 (kinderkorting)",
    openingstijden: "Centrum altijd toegankelijk, Grachtenrondvaart april-oktober",
    website: "https://www.inalkmaar.nl/",
  },
  {
    categorie: "Bezienswaardigheden",
    naam: "Reddingmuseum Dorus Rijkers",
    adres: "Willemsoord 60E, 1781 AS Den Helder",
    gps_coordinaten: "52.9587, 4.7590",
    beschrijving: "Dit museum vertelt de heldhaftige geschiedenis van de reddingsbrigade. Ervaar orkaankracht in een windtunnel, test een vaarsimulator en speel interactieve spellen. Bij goed weer (april-november) kunt u zelfs een onvergetelijke tocht maken op een echte reddingboot.",
    prijsindicatie: "Ca. €8 (volw), €5 (kind); extra €4,50 p.p. voor rondvaart",
    openingstijden: "Dinsdag-zondag 10:00-17:00 uur",
    website: "reddingmuseum.nl",
  },
  {
    categorie: "Attracties",
    naam: "Dierenpark Hoenderdaell",
    adres: "Van Ewijckskade 1, 1761 JA Anna Paulowna",
    gps_coordinaten: "52.8713°N, 4.8297°E",
    beschrijving: "Een uitgestrekt natuurpark van 64 hectare, verkozen tot leukste uitje in Noord-Holland. Wandel langs exotische dieren zoals leeuwen, tijgers en sneeuwluipaarden, en kom dichtbij vrijlopende ringstaartmaki's of voer alpaca's. Het park biedt dagelijkse voederpresentaties, grote speeltuinen en het walvisziekenhuis SOS Dolfijn.",
    prijsindicatie: "0-2 jaar gratis, 3-4 jaar €12 (online), 5+ jaar €18 (online), Parkeren gratis",
    openingstijden: "Dagelijks 09:30-17:30 uur",
    website: "https://hoenderdaell.nl",
  },
  {
    categorie: "Attracties",
    naam: "Speelpark De Goudvis, Sint Maartenszee",
    adres: "Zeeweg 91, 1753 BB Sint Maartenszee",
    gps_coordinaten: "52.8083, 4.6840",
    beschrijving: "Een enorm binnen- en buitenspeelparadijs, perfect voor regenachtige dagen met drie overdekte speelhallen (2200m²) vol glijbanen en klimtoestellen. Buiten vindt u een grote speeltuin van 3,5 hectare met Europa's grootste airtrampoline van 400m². Het park is overzichtelijk, zodat ouders ontspannen toezicht kunnen houden vanaf het terras.",
    prijsindicatie: "Zomerseizoen (apr-sep): Kind 2-17 jr €10,00, Volw. €3,00. Winterseizoen (okt-mrt): Kind 2-17 jr €10,00, Volw. gratis. Kind 0 jr gratis, 1 jr €5,00. Parkeren €3,00",
    openingstijden: "Mei-september dagelijks 10:00-18:00 uur; Oktober-april wo-zo 10:00-18:00 uur (ma-di gesloten); Tijdens schoolvakanties regio Noord dagelijks geopend 10:00-18:00 uur",
    website: "www.degoudvis.eu",
  },
  {
    categorie: "Attracties",
    naam: "Land van Fluwel, Sint Maartenszee",
    adres: "Belkmerweg 65, 1753 GD Sint Maartenszee",
    gps_coordinaten: "52.796511, 4.691538",
    beschrijving: "Een avonturenpark voor jong en oud, gelegen in het hart van de bloembollenstreek. Geniet van het Blote Voetenpad, een Avonturen Speelparadijs, een uitkijktoren en een zwerfweb. De Dutch Tulip Experience vertelt het verhaal van de tulp. Bij mooi weer is er Fluwel Beach voor verkoeling. Combineert actief plezier met educatie.",
    prijsindicatie: "Online: Kinderen 3-13 jr €11,50, 2 jr €7,00, 0-1 jr gratis. Volw. (14+) €10,50. Gezinsticket (2 volw. + 2 kind.) €42,00. Kassa: duurder.",
    openingstijden: "Dagelijks geopend vanaf 10:00 uur",
    website: "https://landvanfluwel.nl/en/",
  },
  {
    categorie: "Attracties",
    naam: "Vlindorado, Waarland",
    adres: "Smeetsweg 12, 1738DK Waarland",
    gps_coordinaten: "Niet expliciet vermeld",
    beschrijving: "Stap in een magische overdekte tropische vlindertuin, de grootste vlinderboerderij van Europa. Wandel tussen exotische vlinders, vogels en tropische planten voor een bijzondere en leerzame ervaring. Naast de vlindertuin zijn er ook indoor adventure minigolf en een overdekt terras, waardoor het een uitstekende slechtweeroptie is.",
    prijsindicatie: "Entree Vlindorado: €10,95. Combiticket Vlindertuin & Indoor Adventure Minigolf: €18,50. Kinderen (2-12 jr) combiticket online €15,50, volw. €17,50.",
    openingstijden: "Ma t/m za: 10:00-17:00 uur; Zo: 11:00-17:00 uur",
    website: "www.vlindorado.nl",
  },
  {
    categorie: "Attracties",
    naam: "Landal Beach Resort Ooghduyne (Indoor Speeltuin)",
    adres: "Van Foreestweg 20, 1787 PS Julianadorp aan Zee",
    gps_coordinaten: "Niet expliciet vermeld",
    beschrijving: "Een indoor speeltuin, specifiek toegankelijk voor kinderen tot 10 jaar, die geen reservering vereist. Gelegen in het resort met een binnenzwembad met superglijbaan, peuterbad en bubbelbad. Dit biedt een spontane en laagdrempelige oplossing voor vermaak bij minder goed weer, direct in de buurt van Julianadorp.",
    prijsindicatie: "Toegangsprijzen voor niet-gasten niet direct beschikbaar; raadpleeg receptie voor dagtarieven",
    openingstijden: "Dagelijks 10:00-20:00 uur (afwijkende tijden tijdens feestdagen)",
    website: "ooghduyne.com",
  },
  {
    categorie: "Attracties",
    naam: "De Helderse Vallei",
    adres: "De Helderse Vallei 9-11, 1783 DA Den Helder",
    gps_coordinaten: "52.9458°N, 4.7694°E",
    beschrijving: "Een natuur- en milieucentrum met een gratis toegankelijke stadsboerderij waar kinderen geitjes kunnen aaien en leren koeien melken. Binnen is er een interactieve expositie over de lokale natuur. Buiten zijn er korte wandelroutes, een blote voetenpad en een uitkijktoren. Naast het centrum ligt de KlimVallei (klimpark vanaf 8 jaar).",
    prijsindicatie: "Gratis toegang en parkeren (kleine bijdrage voor optionele activiteiten)",
    openingstijden: "Di-zo 10:00-16:30/17:00 uur (maandag gesloten)",
    website: "https://www.deheldersevallei.nl",
  },
  {
    categorie: "Attracties",
    naam: "Monkey Town Schagen",
    adres: "Groeneweg 1, 1741 TZ Schagen",
    gps_coordinaten: "52.7856°N, 4.7983°E",
    beschrijving: "Een 100% overdekt speelparadijs met glijbanen, ballenbakken, klimtoestellen, trampolines en lasergame. Er is een speciale peuterzone (1-4 jaar) en ouders hebben gratis toegang. Deze plek is perfect bij slecht weer, en biedt urenlang veilig en passend vermaak voor jonge kinderen.",
    prijsindicatie: "Variërend, peuters €5,95 bij vroege binnenkomst doordeweeks",
    openingstijden: "Ma-vr 9:00-18:00 uur, Za-zo 10:00-18:00 uur",
    website: "https://monkeytown.eu/nl/schagen",
  },
  {
    categorie: "Wandelroutes",
    naam: "Helderse Valleiroute / Blote Voetenpad, Den Helder",
    adres: "Bezoekerscentrum De Helderse Vallei, Jan Verfailleweg 1, Den Helder",
    gps_coordinaten: "52.9354, 4.7345",
    beschrijving: "Een kindvriendelijke rondwandeling van circa 3 km door bos, duin en heide, met leuke stops onderweg. Ontdek de Helderse Vallei met haar natuurexpositie, beklim de uitkijktoren en loop blootsvoets over het zintuiglijke Blote Voetenpad. Combineer met een welverdiende pannenkoek bij De Pannenkoekenvallei. Gratis routekaartjes en kabouter-speurtochten beschikbaar.",
    prijsindicatie: "Toegang De Helderse Vallei en Blote Voetenpad is gratis. Ontdektas Blote Voetenpad €2,50 + €5 borg. Vossen Speurtocht €1. Parkeren €1,50/uur.",
    openingstijden: "Di t/m zo 10:00-16:30/17:00 uur; Blote Voetenpad gesloten 1 nov t/m 31 mrt",
    website: "www.deheldersevallei.nl",
  },
  {
    categorie: "Wandelroutes",
    naam: "Kabouterpad Schoorlse Duinen, Schoorl",
    adres: "Buitencentrum Schoorlse Duinen, Oorsprongweg 1, 1871 HA Schoorl",
    gps_coordinaten: "52.7065, 4.6891",
    beschrijving: "Een betoverende en sprookjesachtige wandelroute van 1 tot 1,5 km, speciaal ontworpen voor kinderen van 3 t/m 8 jaar. Kinderen krijgen een puntmuts en opdrachtenboekje, volgen kabouterpaaltjes en doen leuke natuur-opdrachten. De route loopt door het hoogste en breedste duingebied van Nederland, met een speelbos bij het buitencentrum.",
    prijsindicatie: "Volwassenen gratis. Kinderen €6,50 (incl. muts, opdrachtenboekje, stickervel, materialen mee naar huis). Parkeren €2,30.",
    openingstijden: "Dagelijks toegankelijk; Buitencentrum open 10:00-17:00 uur voor materiaalverhuur",
    website: "staatsbosbeheer.nl/uit-in-de-natuur/kabouterpad-schoorlse-duinen",
  },
  {
    categorie: "Wandelroutes",
    naam: "Kabouterpad Dijkgatbos, Wieringerwerf",
    adres: "Noorderdijkweg, Wieringerwerf",
    gps_coordinaten: "Niet expliciet vermeld",
    beschrijving: "Een leuke en leerzame route van ongeveer 2,2 kilometer, voorzien van kleurrijke kabouterpalen en interactieve opdrachten, geschikt voor kinderen vanaf circa 4 jaar. Onderweg vindt u borden met interessante natuurweetjes en seizoensgebonden opdrachten, wat de wandeling door het bos zowel vermakelijk als educatief maakt.",
    prijsindicatie: "Vaak gratis",
    openingstijden: "Altijd toegankelijk (natuurlijke omgeving)",
    website: "visitkopvanholland.nl",
  },
  {
    categorie: "Wandelroutes",
    naam: "Zwanenwater wandelroutes - Callantsoog",
    adres: "Parkeerplaats Zwanenwater, Zuidschinkeldijk, Callantsoog",
    gps_coordinaten: "52.8253, 4.6990",
    beschrijving: "Kies uit de Gele route (2,5 km, kinderwagenvriendelijk) of de Bruine route (5,8 km) door het grootste natuurlijke duinmerencomplex van West-Europa. Ontdek drie vogelkijkhutten en geniet van duizenden orchideeën (mei-juli) en paarse heide (augustus). Met een speciale kinderspeurtocht en rustpunten onderweg.",
    prijsindicatie: "€2 p.p. entree (kinderen t/m 12 gratis, Natuurmonumenten-leden gratis); speurtocht meestal gratis",
    openingstijden: "1 april-1 augustus 7:00-21:00 uur, overige periode zonsopgang-zonsondergang",
    website: "natuurmonumenten.nl/natuurgebieden/zwanenwater",
  },
  {
    categorie: "Leuke Horeca",
    naam: "IJssalon De Schepper, Julianadorp",
    adres: "Schoolweg 5 (Winkelcentrum De Riepel), 1787 AV Julianadorp",
    gps_coordinaten: "52.9056°N, 4.7250°E",
    beschrijving: "Een ambachtelijke ijssalon, bekroond als een van de beste ijssalons van Nederland. Dagelijks wordt vers ijs geproduceerd in de open ijskeuken met verse ingrediënten. Biedt lactosevrij sorbetijs en vrijwel alle smaken zijn glutenvrij. Geniet van 24 smaken vers bereid ijs, koffie, of ontspan op het terras met uitzicht op een klein speeltuintje.",
    prijsindicatie: "Bolletje €1,50-2,00, kindercoupes €3,50-5,50, grote coupes €6,50-8,50",
    openingstijden: "Zomervakantie: Ma t/m vr 10:00-22:00 uur (bij mooi weer eerder/langer open). Ma 12:30-21:00, di-zo 11:00-21:00 uur (algemeen).",
    website: "www.ijssalondeschepper.nl",
  },
  {
    categorie: "Leuke Horeca",
    naam: "Strandpaviljoen Zee van Tijd, Julianadorp aan Zee",
    adres: "Zanddijk 30, 1787 PP Julianadorp aan Zee (Strandopgang Zandloper, Paal 5)",
    gps_coordinaten: "52.8933, 4.7177",
    beschrijving: "Een gezellig familiepaviljoen direct aan het strand van Julianadorp aan Zee, ideaal voor lunch, diner of een borrelplank. Geniet van het prachtige uitzicht op zee en de zonsondergang. Het strand zelf fungeert als ultieme speelplek voor kinderen, waardoor ouders ontspannen kunnen tafelen in een moderne, ongedwongen sfeer.",
    prijsindicatie: "Hoofdgerechten ca. €17-€30, Kindermenu's ca. €7,50-€12,50, Pannenkoeken ~€6",
    openingstijden: "T/m half oktober 7 dagen per week open vanaf 10:00 uur (daarna aangepaste wintertijden). April-september dagelijks 10:00-22:00 uur.",
    website: "www.zeevantijd.com",
  },
  {
    categorie: "Leuke Horeca",
    naam: "De Pannenkoekenvallei, Den Helder",
    adres: "De Helderse Vallei 7, 1783 DA Den Helder",
    gps_coordinaten: "52.9358468, 4.7345038",
    beschrijving: "Een pannenkoekenrestaurant gelegen in het recreatiegebied De Helderse Vallei, met pannenkoeken bereid met gezonde, biologische ingrediënten. Zeer kindvriendelijk met een buitenspeeltuin, zandbak en indoor speelkamer. Ideaal te combineren met buitenactiviteiten in de Helderse Vallei. Specialiteit: IJspannenkoeken en 'Valleitjes' muntjes voor kinderen.",
    prijsindicatie: "Pannenkoeken ca. €6,95-€19,95, kindermenu €4,95, poffertjes €5,95, hoofdgerechten €16-24",
    openingstijden: "Wo t/m zo 12:00-20:00/21:00 uur (ma en di gesloten)",
    website: "www.pannenkoekenvallei.nl",
  },
  {
    categorie: "Leuke Horeca",
    naam: "De Holle Bolle Boom (Subtropisch Zwembad & Speelparadijs)",
    adres: "Bongerdlaan 3, 1741 MD Tuitjenhorn",
    gps_coordinaten: "52.7619°N, 4.8344°E",
    beschrijving: "De ultieme gezinsbestemming met een indoor speelparadijs (200m²), het subtropische zwembad \"Holle Bolle Plons\" en een grote buitenspeeltuin. Dit complex herbergt twee restaurants (Het Klokhuis en Pannenkoekenhuis Wafelien). Er is een minigaard voor peuters en een freefall-glijbaan voor ouderen, waardoor het een ideale overdekte optie is bij slecht weer.",
    prijsindicatie: "Kindermenu €8-12, volwassen maaltijden €14-22, entree spelen €8,75-15,50",
    openingstijden: "September-maart dagelijks; restaurants Het Klokhuis 9:30-20:00 uur",
    website: "www.hollebolleboom.nl",
  },
  {
    categorie: "Leuke Horeca",
    naam: "Lunchcafé Deugeniet",
    adres: "Beatrixstraat 36, 1781 EJ Den Helder",
    gps_coordinaten: "52.9565, 4.7597",
    beschrijving: "Een knus stadscafé in het centrum van Den Helder, bekend om zijn sociale concept en kindvriendelijkheid. Het menu omvat verse broodjes, tosti's, pannenkoekjes en huisgemaakt gebak. Er zijn twee aparte speelhoekjes vol speelgoed, kinderboeken en kleurspullen, waardoor ouders rustig kunnen koffiedrinken terwijl de kinderen spelen.",
    prijsindicatie: "Broodjes €5–€8, kindermenu ±€4",
    openingstijden: "Di–Za 09:30–17:00 uur (zo/ma gesloten)",
    website: "deugeniet-denhelder.nl",
  },
  {
    categorie: "Leuke Restaurants",
    naam: "Restaurant Kruimeltje, Julianadorp",
    adres: "Meester Tigchelaarstraat 6, 1787 BB Julianadorp",
    gps_coordinaten: "52.8872, 4.7492",
    beschrijving: "Een gezellig familierestaurant met een huiselijke sfeer en een grote buitenspeeltuin direct naast het terras. Het biedt smakelijke en betaalbare maaltijden, van saté tot pasta's, en een speciaal kindermenu. Kinderen vermaken zich uitstekend in de speeltuin, terwijl volwassenen rustig natafelen. Binnen is er ook ruimte om te kleuren.",
    prijsindicatie: "Kindermenu's ca. €6,50-€12,50, Pannenkoeken ca. €10,25-€14,25, Hoofdgerechten volw. ca. €15,95-€21,95",
    openingstijden: "Di & do t/m zo vanaf 17:00 uur (ma & wo gesloten, m.u.v. feestdagen). Do t/m di vanaf 16:00 uur.",
    website: "www.restaurantkruimeltje.nl",
  },
  {
    categorie: "Leuke Restaurants",
    naam: "Restaurant Honky Tonk, Schoorl",
    adres: "Duinvoetweg 11, 1871 EA Schoorl",
    gps_coordinaten: "Niet expliciet vermeld",
    beschrijving: "Gelegen aan het bekende Schoorlse klimduin, biedt dit restaurant een gezellige eetervaring met een uitgebreide lunch- en dinerkaart, inclusief broodjes, soepen, salades en pannenkoeken. Er zijn speciale kindermenu's. Geniet op het verwarmde terras met uitzicht op het klimduin, dat als een grote natuurlijke speeltuin fungeert voor kinderen.",
    prijsindicatie: "Kindermenu's beschikbaar, Hoofdgerechten volw. ca. €19,50-€28,50",
    openingstijden: "Di, wo, vr 10:30-22:00 uur. Do 16:00-22:00 uur. Za, zo 09:30-22:00 uur. Ma gesloten. Keuken sluit om 20:30 uur.",
    website: "www.honkytonk.nl",
  },
  {
    categorie: "Leuke Restaurants",
    naam: "De Holle Bolle Boom - Restaurant Het Klokhuis",
    adres: "Bongerdlaan 3, 1747 CA Tuitjenhorn",
    gps_coordinaten: "52.7542°N, 4.8089°E",
    beschrijving: "Het ultieme gezinsrestaurant waar kinderen na 18:00 uur gratis toegang hebben tot een grote speeltuin (200m²) en het subtropisch zwembad. Geniet van een gezellige sfeer met open haard, kinderstoelen, kleurplaten en een uitgebreid kindermenu. Ouders kunnen rustig dineren terwijl de kinderen zich vermaken.",
    prijsindicatie: "Hoofdgerechten €16-24, kindermenu €8-12",
    openingstijden: "Dagelijks vanaf 9:30 uur, keuken 11:00-21:00 uur",
    website: "www.hollebolleboom.nl/het-klokhuis",
  },
  {
    categorie: "Leuke Restaurants",
    naam: "Restaurant eFFe in 't Dorp",
    adres: "Loopuytpark 10, 1787 AE Julianadorp",
    gps_coordinaten: "52.8953°N, 4.7276°E",
    beschrijving: "Een modern restaurant gevestigd in een historisch gebouw aan het zonnige Loopuytpark. Het biedt een eigentijdse keuken met verse ingrediënten en kindvriendelijke menuopties. De centrale ligging maakt het ideaal voor gezinnen, waar kinderen voor en na het eten kunnen spelen in het park.",
    prijsindicatie: "Lunch €12-18, hoofdgerechten diner €18-26, kindermenu €10-14",
    openingstijden: "Dagelijks vanaf 10:00 uur, lunch vanaf 11:30 uur, diner vanaf 17:00 uur",
    website: "www.efferestaurants.nl",
  },
  {
    categorie: "Leuke Restaurants",
    naam: "Grand Café 1909",
    adres: "Centrum Julianadorp",
    gps_coordinaten: "52.8953°N, 4.7276°E (geschat)",
    beschrijving: "Een eigenwijs gezellig grand café dat uitblinkt in kindvriendelijkheid, met een automatische pannenkoeken-service voor kinderen (met siroop en poedersuiker). Geniet van de vriendelijke en snelle bediening en de ontspannen sfeer. Ideaal voor lunch, diner of gewoon een pannenkoek.",
    prijsindicatie: "Lunch €10-16, hoofdgerechten €16-24, kindermenu/pannenkoeken €6-10",
    openingstijden: "Dagelijks (exacte tijden opvragen)",
    website: "www.grandcafe1909.com",
  },
  {
    categorie: "Leuke Restaurants",
    naam: "Nogal Wiedus Eten & Drinken",
    adres: "Fortwachter 3, 1789 AS Huisduinen (Den Helder)",
    gps_coordinaten: "52.9539, 4.7189",
    beschrijving: "Dit prachtig gelegen restaurant bevindt zich pal achter de duinen bij Fort Kijkduin, met een panoramisch uitzicht op zee, Texel en de vuurtoren De Lange Jaap. Het menu biedt voor ieder wat wils, inclusief verse vis, steaks en een kindermenu. Hoewel er geen aparte speelkamer is, biedt de ruime opzet en het uitzicht genoeg om kinderen te boeien.",
    prijsindicatie: "Hoofdgerechten €18–€25; kindergerecht ~€8",
    openingstijden: "Wo–Zo vanaf 12:00 uur (hoogseizoen dagelijks)",
    website: "nogalwiedus.nl",
  },
  {
    categorie: "Lokale Retail",
    naam: "Koetshuysch Kaaswinkel Julianadorp",
    adres: "Schoolweg 37B (Winkelcentrum De Riepel), 1787 AV Julianadorp",
    gps_coordinaten: "52.8956°N, 4.7289°E",
    beschrijving: "Deze specialistische kaaswinkel, direct in Julianadorp, biedt een uitgebreid assortiment Hollandse en buitenlandse kazen, waaronder Noord-Hollandse ambachtelijke boerenkaas en diverse kruidenkazen. U kunt komen proeven en persoonlijk advies krijgen. Ook verkrijgbaar zijn verse noten en leuke cadeaupakketten met lokale delicatessen.",
    prijsindicatie: "Jong Gouda €8-12/kg, boerenkaas €12-16/kg, kruidenkazen €14-18/kg",
    openingstijden: "Ma 13:00-17:30 uur, Di-Vr 09:00-17:30 uur, Za 09:00-17:00 uur, Zo gesloten",
    website: "https://koetshuyschkaas.nl/",
  },
  {
    categorie: "Lokale Retail",
    naam: "Bakkerij Dunselman, Julianadorp",
    adres: "Drooghe Bol 1020, 1787 AE Julianadorp (Loopuytpark)",
    gps_coordinaten: "Niet expliciet vermeld",
    beschrijving: "Een ambachtelijke bakkerij die deel uitmaakt van een bakkersfamilie met ruim 160 jaar geschiedenis. Biedt een breed assortiment aan vers brood, gebak, koek en lokale specialiteiten. Ideaal voor verse broodjes voor het ontbijt of heerlijke lekkernijen voor onderweg, met vriendelijk personeel.",
    prijsindicatie: "Brood ca. €3,15-€3,99, Gebak ca. €3,10",
    openingstijden: "Ma t/m za 08:00-17:30 uur (za tot 16:30 uur), Zo gesloten",
    website: "www.bakkerijdunselman.nl",
  },
  {
    categorie: "Lokale Retail",
    naam: "Bakkerij Dunselman, Den Helder",
    adres: "Keizerstraat 94, 1781 GE Den Helder",
    gps_coordinaten: "52.9585, 4.7594",
    beschrijving: "De historische hoofdbakkerij, al 160 jaar een begrip, bekend om ambachtelijke brood- en banketproducten. Proef unieke Helderse specialiteiten zoals de Helderse Jodenkoek, Helderse Taai en Helderse Broeder, gebakken volgens 19e-eeuwse recepten. Het is een reis terug in de tijd, met een eigen chocolaterie en dagelijks vers brood en gebak.",
    prijsindicatie: "Brood ca. €3,15-€3,99, Gebak ca. €3,10",
    openingstijden: "Di–Vr 08:00–17:00 uur, Za 08:00–16:00 uur, Zo/ma gesloten",
    website: "www.bakkerijdunselman.nl",
  },
  {
    categorie: "Lokale Retail",
    naam: "Slagerij Jan Kater, Julianadorp",
    adres: "Drooghe Bol 1028, 1788 VB Julianadorp",
    gps_coordinaten: "Niet expliciet vermeld",
    beschrijving: "Een ambachtelijke slager bekend om zijn verse en kwaliteitsvolle vlees en vleeswaren. Het brede assortiment omvat Heydehoeve varkensvlees, boerderijkip, diverse specialiteiten en huisgemaakte salades. Ze kunnen ook saladeschotels op maat maken voor feesten of visite, wat gemak biedt voor kwaliteitsmaaltijden in uw vakantieverblijf.",
    prijsindicatie: "Niet gespecificeerd, nadruk op \"ambachtelijke kwaliteit\" en \"eerlijke prijs\"",
    openingstijden: "Ma t/m vr 08:00-18:00 uur, Za 08:00-17:00 uur, Zo gesloten",
    website: "www.slagerijkater.nl",
  },
  {
    categorie: "Lokale Retail",
    naam: "Kaatje's Deli Alkmaar",
    adres: "Ridderstraat 3, 1811 EX Alkmaar",
    gps_coordinaten: "52.6316°N, 4.7482°E",
    beschrijving: "Een hoogwaardige delicatessenwinkel met Oer-Hollandse Beemsterkaas en exclusieve producten. Hier vindt u ambachtelijke charcuterie, op maat gemaakte borrelplanken, gekoelde wijnen en speciale bieren. Ideaal voor fijnproevers die op zoek zijn naar unieke culinaire producten.",
    prijsindicatie: "Premium kazen €15-25/kg, charcuterie €20-35/100g, borrelplanken €25-50",
    openingstijden: "Reguliere winkeltijden (opvragen)",
    website: "https://kaatjesdeli.nl/",
  },
  {
    categorie: "Lokale Retail",
    naam: "Boerderijwinkel Boet32 Schagerbrug",
    adres: "Grote Sloot 274, 1751 LH Schagerbrug",
    gps_coordinaten: "52.7854°N, 4.9015°E",
    beschrijving: "Ervaar een echte boerderij-ervaring in deze zelfbedieningswinkel. Koop verse rauwe melk van eigen koeien, ambachtelijk boerenijs, eigen geitenkaas, Jersey zuivelproducten, lokale groenten, bakmixen en honing. Het is educatief voor kinderen en biedt authentieke streekproducten.",
    prijsindicatie: "Rauwe melk €1,50-2,00/l, geitenkaas €14-18/kg, boeren-ijs €3-5/bakje",
    openingstijden: "7 dagen 08:00-21:00 uur (vr/za 09:00-16:00 uur bemand)",
    website: "www.boet32.nl",
  },
  {
    categorie: "Lokale Retail",
    naam: "Zorgboerderij Tesselaar (zuivel & boerderijwinkel)",
    adres: "Badhuisstraat 53, 1789 AJ Huisduinen (bij Fort Kijkduin)",
    gps_coordinaten: "52.9544, 4.7195",
    beschrijving: "De enige melkvee- en zorgboerderij in Den Helder biedt dagverse zuivel (melk, yoghurt), ambachtelijke kazen van eigen koeien, huisgemaakte boerenworst, scharreleieren en zelfs pindakaas. Alles komt direct van het land. U kunt de koeien in de wei zien en de alpaca’s aaien. Probeer de “Nieuwedieper” kaas.",
    prijsindicatie: "Niet gespecificeerd",
    openingstijden: "Ma 15:00-18:00 uur; Wo 15:00-18:00 uur; Za 16:00-19:00 uur (di, do, vr, zo gesloten)",
    website: "boerderijtesselaar.nl",
  },
  {
    categorie: "Lokale Brouwerijen",
    naam: "Stadsbrouwerij Helderse Jongens (Fort Westoever)",
    adres: "Westoever 1, 1785 PB Den Helder",
    gps_coordinaten: "52.9703°N, 4.7644°E",
    beschrijving: "Gelegen in een historisch fort uit 1825, deze stadsbrouwerij brouwt \"echt Helders bier\" met namen als Napoleon Dubbelbock en Helders Goud. Er is een sfeervol proeflokaal en restaurant in de bierkelder. Geniet op het grote terras aan het water met waterspeelplek voor kinderen. Rondleidingen met proeverij zijn mogelijk in het weekend.",
    prijsindicatie: "Bieren €4-6, rondleiding €8 p.p. (incl. proefglas), burgers/bistro €12-18",
    openingstijden: "Wo t/m zo vanaf 11:00 uur (ma & di open in overleg/bij groepen); Proeflokaal: Woe-Zo 15:00-22:00 uur (rondleidingen alleen za/zo)",
    website: "https://fortwestoever.nl/",
  },
  {
    categorie: "Lokale Brouwerijen",
    naam: "Polder Brouwerij, Anna Paulowna",
    adres: "Niet expliciet vermeld, maar gelegen in Anna Paulowna",
    gps_coordinaten: "Niet expliciet vermeld",
    beschrijving: "Een lokale brouwerij gerund door drie vrienden met een passie voor het brouwen van \"unieke bieren uit de polder\". Ze bieden diverse smaken, waaronder Blond, Weisen, Kersen, Dunkel Weizen, NEIPA en Barley Wine. Ideaal om de lokale brouwcultuur te ontdekken en ambachtelijke bieren te proeven.",
    prijsindicatie: "Niet gespecificeerd",
    openingstijden: "Niet gespecificeerd",
    website: "www.polderbrouwerij.nl",
  },
  {
    categorie: "Lokale Brouwerijen",
    naam: "Moersleutel Craft Brewery",
    adres: "Diamantweg 9, 1811 MH Alkmaar",
    gps_coordinaten: "52.6297°N, 4.7480°E",
    beschrijving: "Een moderne craft brewery met een aanbod van meer dan 330 verschillende bieren, zoals de populaire Crank the Juice (New England IPA) en Motor Oil (Imperial Stout). Rondleidingen zijn mogelijk op de eerste zaterdag van de maand. Deze brouwerij is meer volwassen-gericht met beperkte kinderfaciliteiten.",
    prijsindicatie: "Bieren €5-8, rondleiding €25 (inclusief 3 bieren)",
    openingstijden: "Rondleidingen eerste zaterdag maand 14:00 uur (90 min)",
    website: "https://moersleutel.com/",
  },
  {
    categorie: "Lokale Brouwerijen",
    naam: "Alcmaersche Bierbrouwerij \"de Die\"",
    adres: "Alkmaar (exacte locatie niet publiek toegankelijk)",
    gps_coordinaten: "52.6297°N, 4.7480°E (Alkmaar centrum)",
    beschrijving: "Een microbrouwerij opgericht in 2015, die speciaalbieren met een Alkmaarse insteek brouwt, vernoemd naar het riviertje De Die. Er is geen eigen proeflokaal, maar proeverijen zijn op aanvraag mogelijk. De bieren zijn te koop in lokale cafés en winkels in Alkmaar.",
    prijsindicatie: "Prijzen op aanvraag voor proeverijen",
    openingstijden: "Op afspraak",
    website: "https://www.brouwerijdedie.nl/",
  },
  {
    categorie: "Lokale Brouwerijen",
    naam: "Texelse Bierbrouwerij",
    adres: "Schilderweg 214B, 1792 CK Oudeschild (Texel)",
    gps_coordinaten: "53.0391, 4.8480",
    beschrijving: "De bekende eilandbrouwerij van Texel, waar onder andere de beroemde Skuumkoppe (donker witbier) gebrouwen wordt. De rondleiding \"Texels Beleving\" neemt u mee door het brouwproces, gevolgd door een proeverij in het proeflokaal. De ferrytocht naar Texel is al een uitje op zich.",
    prijsindicatie: "Rondleiding + proeverij €15 p.p., Bieren per glas ~€3,50",
    openingstijden: "Proeflokaal in seizoen (apr-okt) Di-Vr 10:00-18:00 uur; Za 10:00-19:30 uur",
    website: "texels.nl",
  },
  {
    categorie: "Evenementen",
    naam: "Jutterhavendagen, Den Helder",
    adres: "Willemsoord en binnenstad Den Helder",
    gps_coordinaten: "52.9586, 4.7585",
    beschrijving: "Een grootschalig maritiem festival met activiteiten voor jong en oud. Geniet van livemuziek, mobiel straattheater, verrassende kinderactiviteiten en demonstraties. Bewonder museumschepen en marineschepen, doe mee aan workshops (knopen leggen) en laat kinderen gratis zeilen, suppen en kanoën bij \"Optimist on Tour\". Vaak afgesloten met een vuurwerkshow.",
    prijsindicatie: "Toegang waarschijnlijk gratis (specifieke activiteiten/workshops kunnen kosten met zich meebrengen)",
    openingstijden: "Vrijdag 25 juli t/m zondag 27 juli 2025 (activiteiten vanaf middaguur op zaterdag; ca. 10:00-23:00 uur vr/za, 10:00-17:00 uur zo)",
    website: "denhelder.online",
  },
  {
    categorie: "Evenementen",
    naam: "Natuurfotografie door de ogen van kinderen (De Helderse Vallei)",
    adres: "De Helderse Vallei 9-11, 1783 DA Den Helder",
    gps_coordinaten: "52.9562808, 4.7607972",
    beschrijving: "Een activiteit op het terrein van De Helderse Vallei waarbij kinderen op speelse wijze leren fotograferen in de natuur. Dit biedt een educatieve en actieve optie die past bij de leeftijd van de kinderen en de interesse in natuur.",
    prijsindicatie: "Toegang tot De Helderse Vallei is gratis. Prijs activiteit niet direct vermeld.",
    openingstijden: "2025-07-22 00:00:00",
    website: "www.deheldersevallei.nl",
  },
  {
    categorie: "Evenementen",
    naam: "Vroeg uit de veren (De Helderse Vallei)",
    adres: "De Helderse Vallei 9-11, 1783 DA Den Helder",
    gps_coordinaten: "52.9562808, 4.7607972",
    beschrijving: "Een vroege ochtendactiviteit die plaatsvindt op de stadsboerderij van De Helderse Vallei. Een leuke manier om de dag te starten en de boerderijdieren in actie te zien.",
    prijsindicatie: "Toegang tot De Helderse Vallei is gratis. Prijs activiteit niet direct vermeld.",
    openingstijden: "2025-07-25 00:00:00",
    website: "www.deheldersevallei.nl",
  },
  {
    categorie: "Evenementen",
    naam: "Voorstelling openluchttheater: 'Hakim op z’n best' (De Helderse Vallei)",
    adres: "Omgeving De Helderse Vallei",
    gps_coordinaten: "52.9562808, 4.7607972",
    beschrijving: "Een culturele voorstelling in de omgeving van De Helderse Vallei, met 'Hakim op z'n best'. Dit openluchttheater biedt culturele verrijking voor het hele gezin.",
    prijsindicatie: "Toegang tot De Helderse Vallei is gratis. Prijs voorstelling niet direct vermeld.",
    openingstijden: "2025-07-27 00:00:00",
    website: "www.deheldersevallei.nl",
  },
  {
    categorie: "Evenementen",
    naam: "Kofferbakmarkt Callantsogervaart Julianadorp",
    adres: "Callantsogervaart, 1787 PR Julianadorp",
    gps_coordinaten: "Niet expliciet vermeld",
    beschrijving: "Een gezellige rommelmarkt waar spullen vanuit auto's worden verkocht. Ideaal om rond te snuffelen, koopjes te jagen en de lokale sfeer te proeven. Biedt een authentieke en laagdrempelige ervaring van de lokale gemeenschap.",
    prijsindicatie: "Toegang waarschijnlijk gratis. Kraamhuur €15,-.",
    openingstijden: "Elke vrijdag 08:00-15:00 uur (28 maart t/m 26 september 2025)",
    website: "denhelder.online",
  },
  {
    categorie: "Evenementen",
    naam: "Kofferbakmarkt Loopuytpark Julianadorp",
    adres: "Loopuytpark 17, 1787 AC Julianadorp",
    gps_coordinaten: "Niet expliciet vermeld",
    beschrijving: "Een gezellige rommelmarkt in het historische centrum van Julianadorp. Verkopers bieden spullen aan vanuit hun auto's. Een leuke, informele gelegenheid om te \"schatzoeken\" en spontane ontdekkingen te doen.",
    prijsindicatie: "Toegang waarschijnlijk gratis",
    openingstijden: "Elke zondag 10:00-16:00 uur (4 mei t/m 17 augustus 2025)",
    website: "denhelder.online",
  },
  {
    categorie: "Evenementen",
    naam: "Westfriese Folklore Schagen - Dag van de Klederdracht",
    adres: "Centrum Schagen (Markt/Grote Kerk)",
    gps_coordinaten: "52.7878°N, 4.7966°E",
    beschrijving: "Een spectaculair cultureel hoogtepunt met een optocht (om 10:45 uur) van ruim 100 deelnemers in traditionele klederdrachten uit heel Nederland. Geniet van een folkloristische markt met oude ambachten, traditionele Westfriese kinderspelen (ringsteken), en live muziek. Kinderen zullen de koetsen, paarden en kleurrijke kleding fascinerend vinden.",
    prijsindicatie: "Gratis toegang en parkeren",
    openingstijden: "Donderdag 24 juli 2025, 09:00-15:00 uur",
    website: "www.westfriesefolklore.nl",
  },
  {
    categorie: "Evenementen",
    naam: "Juttersmarkt Den Helder",
    adres: "Beatrixstraat/Keizerstraat/Spoorstraat, Den Helder",
    gps_coordinaten: "52.9605°N, 4.7691°E",
    beschrijving: "Een wekelijkse braderie in de binnenstad met talloze kramen, sfeer, muziek en straattheater. Inclusief een kofferbakmarkt in het Stadspark en een gratis kinderrommelmarkt. Er zijn ook foodtrucks en terrassen voor een gezellige dag uit.",
    prijsindicatie: "Gratis toegang en parkeren",
    openingstijden: "Dinsdag 22 juli 2025, 10:00-16:30 uur",
    website: "heldersebinnenstad.nl",
  },
  {
    categorie: "Evenementen",
    naam: "Fort Kijkduin Zomeractiviteiten",
    adres: "Fort Kijkduin, Huisduinen",
    gps_coordinaten: "52.9597°N, 4.7319°E",
    beschrijving: "Dagelijks gedurende de week van 22 t/m 27 juli zijn er speciale zomeractiviteiten voor kinderen bij dit historische Napoleontische fort. Combineer een bezoek aan het Noordzeeaquarium met het verkennen van ondergrondse tunnels en haaien voeren, aangevuld met leuke activiteiten.",
    prijsindicatie: "€12,50 volwassenen, €10 kinderen 4-12 jaar, parkeren gratis",
    openingstijden: "Dagelijks 22-27 juli 2025, 10:00-17:00 uur",
    website: "fortkijkduin.nl",
  },
  {
    categorie: "Evenementen",
    naam: "Zomerbraderie Callantsoog",
    adres: "Dorpsplein Callantsoog",
    gps_coordinaten: "52.8295, 4.7034",
    beschrijving: "Een gezellige avondbraderie in het centrum van de badplaats. Het Dorpsplein transformeert elke woensdag in juli in een bruisende markt met zomerse artikelen, souvenirs en lokale lekkernijen. Er is live muziek, terrasjes en extraatjes voor kinderen zoals een draaimolen, suikerspinnenkraam en schminken. Op 26 juli is er een Duitse \"Braadworsten-Party\".",
    prijsindicatie: "Gratis entree",
    openingstijden: "Woensdag 23 juli 2025, 15:00-20:00 uur (muzikale avond op 26 juli vanaf 17:00 uur)",
    website: "callantsoog-info.nl",
  }
];

// LocationCard Component
const LocationCard = ({ location, favorites, toggleFavorite, getCategoryColor, getGoogleMapsUrl, setSelectedLocation }) => (
  <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
    <div className="p-5">
      <div className="flex justify-between items-start mb-3">
        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getCategoryColor(location.categorie)}`}>
          {location.categorie}
        </span>
        <button
          onClick={() => toggleFavorite(location.naam)}
          className={`p-1 rounded-full transition-colors ${
            favorites.has(location.naam)
              ? 'text-red-500 hover:text-red-600'
              : 'text-gray-400 hover:text-red-500'
          }`}
        >
          <Heart className={`w-5 h-5 ${favorites.has(location.naam) ? 'fill-current' : ''}`} />
        </button>
      </div>

      <h3 className="text-lg font-bold text-gray-900 mb-2">
        {location.naam}
      </h3>

      <div className="flex items-start gap-2 mb-3 text-sm text-gray-600">
        <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
        <span className="line-clamp-2">{location.adres}</span>
      </div>

      <p className="text-sm text-gray-700 mb-4 line-clamp-3">
        {location.beschrijving}
      </p>

      <div className="space-y-2 mb-4">
        <div className="flex items-center gap-2 text-sm">
          <Euro className="w-4 h-4 text-green-600" />
          <span className="text-gray-700 line-clamp-1">{location.prijsindicatie}</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Clock className="w-4 h-4 text-blue-600" />
          <span className="text-gray-700 line-clamp-1">{location.openingstijden}</span>
        </div>
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => setSelectedLocation(location)}
          className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
        >
          Details
        </button>
        <a
          href={getGoogleMapsUrl(location.gps_coordinaten, location.naam)}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
        >
          <MapPin className="w-4 h-4" />
        </a>
        {location.website && location.website !== "Niet gespecificeerd" && (
          <a
            href={location.website.startsWith('http') ? location.website : `https://${location.website}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
          >
            <Globe className="w-4 h-4" />
          </a>
        )}
      </div>
    </div>
  </div>
);

const FamilieReisApp = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Alle');
  const [favorites, setFavorites] = useState(new Set());
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [activeView, setActiveView] = useState('cards'); // 'cards', 'favorites', 'map'

  const categories = ['Alle', ...new Set(locaties.map(loc => loc.categorie))];

  const favoriteLocations = useMemo(() => {
    return locaties.filter(location => favorites.has(location.naam));
  }, [favorites]);

  const filteredLocations = useMemo(() => {
    return locaties.filter(location => {
      const matchesSearch = location.naam.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           location.beschrijving.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           location.adres.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'Alle' || location.categorie === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  const toggleFavorite = (locationName) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(locationName)) {
      newFavorites.delete(locationName);
    } else {
      newFavorites.add(locationName);
    }
    setFavorites(newFavorites);
  };

  const getCategoryColor = (category) => {
    const colors = {
      'Bezienswaardigheden': 'bg-blue-100 text-blue-800',
      'Attracties': 'bg-green-100 text-green-800',
      'Wandelroutes': 'bg-yellow-100 text-yellow-800',
      'Leuke Horeca': 'bg-purple-100 text-purple-800',
      'Leuke Restaurants': 'bg-red-100 text-red-800',
      'Lokale Retail': 'bg-indigo-100 text-indigo-800',
      'Lokale Brouwerijen': 'bg-orange-100 text-orange-800',
      'Evenementen': 'bg-pink-100 text-pink-800'
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  const getGoogleMapsUrl = (gps_coordinaten, naam) => {
    if (gps_coordinaten && gps_coordinaten !== "Niet expliciet vermeld") {
      const coords = gps_coordinaten.replace(/[°NSEO]/g, '').replace(',', ',');
      return `https://www.google.com/maps/search/?api=1&query=${coords}`;
    }
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(naam)}`;
  };

  return (
    <div className="max-w-6xl mx-auto p-4 bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-lg mb-6 p-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-2">
          <MapPin className="text-blue-600" />
          Familie Reisapp - Kop van Noord-Holland
        </h1>
        <p className="text-gray-600 mb-4">Ontdek de mooiste plekken voor jullie familievakantie!</p>
        
        {/* Search */}
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Zoek op naam, beschrijving of adres..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Filter className="w-5 h-5" />
            Filters
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex gap-2 mt-4 mb-4">
          <button
            onClick={() => setActiveView('cards')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
              activeView === 'cards' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            <Search className="w-4 h-4" />
            Alle locaties
          </button>
          <button
            onClick={() => setActiveView('favorites')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
              activeView === 'favorites' 
                ? 'bg-red-600 text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            <Heart className={`w-4 h-4 ${favorites.size > 0 ? 'fill-current' : ''}`} />
            Favorieten ({favorites.size})
          </button>
          <button
            onClick={() => setActiveView('map')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
              activeView === 'map' 
                ? 'bg-green-600 text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            <Map className="w-4 h-4" />
            Kaart
          </button>
        </div>

        {/* Filters */}
        {showFilters && (
          <div className="mb-4 p-4 bg-gray-50 rounded-lg">
            <label className="block text-sm font-medium text-gray-700 mb-2">Categorie:</label>
            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === category
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="text-sm text-gray-600">
          {activeView === 'cards' && `${filteredLocations.length} van ${locaties.length} locaties gevonden`}
          {activeView === 'favorites' && `${favoriteLocations.length} favoriet${favoriteLocations.length !== 1 ? 'en' : ''}`}
          {activeView === 'map' && `Kaart weergave`}
        </div>
      </div>

      {/* Content based on active view */}
      {activeView === 'cards' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredLocations.map((location, index) => (
            <LocationCard 
              key={index} 
              location={location} 
              favorites={favorites}
              toggleFavorite={toggleFavorite}
              getCategoryColor={getCategoryColor}
              getGoogleMapsUrl={getGoogleMapsUrl}
              setSelectedLocation={setSelectedLocation}
            />
          ))}
        </div>
      )}

      {activeView === 'favorites' && (
        <div>
          {favoriteLocations.length === 0 ? (
            <div className="bg-white rounded-xl shadow-lg p-8 text-center">
              <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">Geen favorieten</h3>
              <p className="text-gray-500">Voeg locaties toe aan je favorieten door op het hartje te klikken!</p>
            </div>
          ) : (
            <div>
              <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Heart className="text-red-500 fill-current" />
                  Mijn Favorieten
                </h2>
                <div className="flex gap-4 mb-4 flex-wrap">
                  <button
                    onClick={() => {
                      const favoriteCoords = favoriteLocations
                        .filter(loc => loc.gps_coordinaten !== "Niet expliciet vermeld")
                        .map(loc => loc.gps_coordinaten.replace(/[°NSEO]/g, '').replace(',', ','))
                        .join('/');
                      if (favoriteCoords) {
                        const mapsUrl = `https://www.google.com/maps/dir/${favoriteCoords}`;
                        window.open(mapsUrl, '_blank');
                      }
                    }}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    disabled={favoriteLocations.length < 2}
                  >
                    <Map className="w-4 h-4" />
                    Route langs favorieten
                  </button>
                  <button
                    onClick={() => setFavorites(new Set())}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                  >
                    <X className="w-4 h-4" />
                    Wis alle favorieten
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {favoriteLocations.map((location, index) => (
                  <LocationCard 
                    key={index} 
                    location={location} 
                    favorites={favorites}
                    toggleFavorite={toggleFavorite}
                    getCategoryColor={getCategoryColor}
                    getGoogleMapsUrl={getGoogleMapsUrl}
                    setSelectedLocation={setSelectedLocation}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {activeView === 'map' && (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-6 border-b">
            <h2 className="text-xl font-bold text-gray-900 mb-2 flex items-center gap-2">
              <Map className="text-green-600" />
              Kaart Weergave
            </h2>
            <p className="text-gray-600">Alle locaties in de Kop van Noord-Holland</p>
            <div className="mt-3 flex gap-2 flex-wrap">
              <button
                onClick={() => {
                  const allLocationsUrl = `https://www.google.com/maps/search/?api=1&query=Kop+van+Noord-Holland+attracties`;
                  window.open(allLocationsUrl, '_blank');
                }}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm"
              >
                Open in Google Maps
              </button>
              <button
                onClick={() => {
                  if (favoriteLocations.length > 0) {
                    const favoriteCoords = favoriteLocations
                      .filter(loc => loc.gps_coordinaten !== "Niet expliciet vermeld")
                      .map(loc => loc.gps_coordinaten.replace(/[°NSEO]/g, '').replace(',', ','))
                      .join('/');
                    if (favoriteCoords) {
                      const mapsUrl = `https://www.google.com/maps/dir/${favoriteCoords}`;
                      window.open(mapsUrl, '_blank');
                    }
                  }
                }}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors text-sm disabled:bg-gray-400"
                disabled={favoriteLocations.length < 2}
              >
                <Heart className="w-4 h-4 inline mr-1 fill-current" />
                Route favorieten ({favoriteLocations.length})
              </button>
            </div>
          </div>
          <div className="relative" style={{ height: '600px' }}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d100000!2d4.7717!3d52.8633!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47cf5a25c0000001%3A0x2e641cb616b7d132!2sDen%20Helder!5e0!3m2!1snl!2snl!4v1640995200000!5m2!1snl!2snl"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Familie Reisapp Kaart"
            ></iframe>
            <div className="absolute top-4 right-4 bg-white rounded-lg shadow-lg p-4 max-w-xs">
              <h3 className="font-semibold text-gray-900 mb-2">Kaart Info</h3>
              <p className="text-sm text-gray-600 mb-3">
                Klik op de markers om meer informatie te zien over elke locatie.
              </p>
              <div className="space-y-2">
                <p className="text-xs text-gray-500">
                  💡 Gebruik "Open in Google Maps" voor alle locaties
                </p>
                <p className="text-xs text-gray-500">
                  ❤️ Maak favorieten voor een persoonlijke route
                </p>
              </div>
            </div>
          </div>
          
          {/* Locatielijst onder de kaart */}
          <div className="p-6 bg-gray-50">
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-blue-600" />
              Snelle Navigatie naar alle {locaties.length} locaties
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {locaties.map((location, index) => (
                <div key={index} className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-all duration-200">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium text-gray-900 text-sm">
                      {location.naam}
                    </h4>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${getCategoryColor(location.categorie)}`}>
                      {location.categorie === 'Bezienswaardigheden' ? '🏛️' : 
                       location.categorie === 'Attracties' ? '🎡' : 
                       location.categorie === 'Wandelroutes' ? '🚶' : 
                       location.categorie === 'Leuke Horeca' ? '🍽️' : '📍'}
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 mb-3 line-clamp-1">
                    📍 {location.adres}
                  </p>
                  <div className="flex gap-2">
                    <a
                      href={getGoogleMapsUrl(location.gps_coordinaten, location.naam)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-blue-600 text-white px-3 py-2 rounded text-xs hover:bg-blue-700 transition-colors text-center font-medium"
                    >
                      <MapPin className="w-3 h-3 inline mr-1" />
                      Navigeer
                    </a>
                    <button
                      onClick={() => setSelectedLocation(location)}
                      className="flex-1 bg-gray-200 text-gray-700 px-3 py-2 rounded text-xs hover:bg-gray-300 transition-colors font-medium"
                    >
                      Details
                    </button>
                    <button
                      onClick={() => toggleFavorite(location.naam)}
                      className={`px-3 py-2 rounded text-xs transition-colors ${
                        favorites.has(location.naam)
                          ? 'bg-red-100 text-red-500 hover:bg-red-200'
                          : 'bg-gray-100 text-gray-400 hover:text-red-500 hover:bg-red-50'
                      }`}
                    >
                      <Heart className={`w-3 h-3 ${favorites.has(location.naam) ? 'fill-current' : ''}`} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Detail Modal */}
      {selectedLocation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getCategoryColor(selectedLocation.categorie)}`}>
                    {selectedLocation.categorie}
                  </span>
                  <h2 className="text-2xl font-bold text-gray-900 mt-2">
                    {selectedLocation.naam}
                  </h2>
                </div>
                <button
                  onClick={() => setSelectedLocation(null)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-2">
                  <MapPin className="w-5 h-5 text-gray-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-gray-900 font-medium">{selectedLocation.adres}</p>
                    {selectedLocation.gps_coordinaten !== "Niet expliciet vermeld" && (
                      <p className="text-sm text-gray-600">{selectedLocation.gps_coordinaten}</p>
                    )}
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">Beschrijving</h3>
                  <p className="text-gray-700 leading-relaxed">{selectedLocation.beschrijving}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-green-50 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Euro className="w-5 h-5 text-green-600" />
                      <h3 className="font-semibold text-green-900">Prijsindicatie</h3>
                    </div>
                    <p className="text-green-800">{selectedLocation.prijsindicatie}</p>
                  </div>

                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="w-5 h-5 text-blue-600" />
                      <h3 className="font-semibold text-blue-900">Openingstijden</h3>
                    </div>
                    <p className="text-blue-800">{selectedLocation.openingstijden}</p>
                  </div>
                </div>

                <div className="flex gap-3 pt-4 flex-wrap">
                  <button
                    onClick={() => toggleFavorite(selectedLocation.naam)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                      favorites.has(selectedLocation.naam)
                        ? 'bg-red-100 text-red-700 hover:bg-red-200'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <Heart className={`w-5 h-5 ${favorites.has(selectedLocation.naam) ? 'fill-current' : ''}`} />
                    {favorites.has(selectedLocation.naam) ? 'Favoriet' : 'Favoriet maken'}
                  </button>

                  <a
                    href={getGoogleMapsUrl(selectedLocation.gps_coordinaten, selectedLocation.naam)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <MapPin className="w-5 h-5" />
                    Bekijk op kaart
                  </a>

                  {selectedLocation.website && selectedLocation.website !== "Niet gespecificeerd" && (
                    <a
                      href={selectedLocation.website.startsWith('http') ? selectedLocation.website : `https://${selectedLocation.website}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                    >
                      <Globe className="w-5 h-5" />
                      Website
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Favorites Summary - alleen zichtbaar bij cards view */}
      {favorites.size > 0 && activeView === 'cards' && (
        <div className="fixed bottom-4 right-4 bg-white rounded-lg shadow-lg p-4 border-l-4 border-red-500 max-w-xs">
          <div className="flex items-center gap-2 mb-2">
            <Heart className="w-5 h-5 text-red-500 fill-current" />
            <span className="font-semibold text-gray-900">
              {favorites.size} favoriet{favorites.size !== 1 ? 'en' : ''}
            </span>
          </div>
          <div className="text-sm text-gray-600">
            {Array.from(favorites).slice(0, 2).join(', ')}
            {favorites.size > 2 && ` +${favorites.size - 2} meer`}
          </div>
        </div>
      )}
    </div>
  );
};

export default FamilieReisApp;