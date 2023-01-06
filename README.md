# Project 4 - React Native application representing database content

Applikasjonen henter inn en anime data og presenterer tittel, score og episodenummeret. Det er mulig å sortere episodene etter score og tittel og man kan velge å søke på tittel eller score høyere eller lik søkeresultatet.  Det er også mulig, slik som i prosjekt 3, å registrere en egen anime basert på forskjellig data som presenteres i listevisninga, f.eks. tittel og score.
Det var utfordrende å gjøre om frontend til React Native, og vi tok beslutninger som kanskje fjernet litt funksjonalitet slik at det skulle fungere fint på mobile enheter, så ta forbehold om dette. Likevel skal appen tilfredsstille kravene for innhold og funksjonalitet, og appen fungerer i stor grad slik den gjorde i prosjekt 3.

## Fra react til react native

Når vi skulle gjøre om appen til en react-native app oppsto det mange problemer da ui biblioteket vi hadde brukt ikke var støttet av react-native. Vi mistet derfor noe av funksjonaliteten fra prosjekt 3, blandt annet accordian komponenten. Vi har lagt mest fokus på å få over funksjonaliteten fra prosjekt 3, og har derfor ikke implementert noe nytt i prosjekt 4. Når vi skulle initialisere appen så initialiserte vi appen fra en template. Dette gjorde vi så vi kunne få forståelse av oppbyggningen og kunne bruke noen deler av koden som allerede var der. Slik som bottom navigtor. Vi har valgt å bruke backend fra prosjekt 3.

## Kjør applikasjonen lokalt

Bytt path til project4\frontend og skriv `npm i`. Deretter skriver man `npm start` eller `expo start` for å starte appen. 
Logg på cisco vpn på den enheten man øsnker å prøve ut appen på. Deretter bytter man fra **LAN** til **Tunnel** og scanner qr koden. Grunnet vedvarende problemer med internettet på skolen merket vi til tider at backenden som blir hostet av NTNU's server ikke alltid ville koble seg til, så ta forbehold om dette. Som et alternativ går det an å bytte Apollo Client URI'en i **App.tsx** til **"localhost:5000/graphql"**, for så å kjøre backend slik man gjorde i prosjekt 3. Appen er for det meste testet på ios da android emulatoren ikke alltid ville virke, og hverken av gruppemedlemmene har Android enheter.

## Generelt om applikasjonen

Dette prosjektet er en løsning for listevisning av omtrent 1500 av de mest populære filmene/tv-seriene av den japanske sorten "Anime". Her kan man søke blant alle disse og få resultatene fremvist med tittel, type anime, antall episoder, score og beskrivelse. I tillegg kan man sortere dem basert på tittel eller poengsum gitt av seerne. Man har også mulighet for å legge inn sin egen anime ved hjelp av undersiden for registrering av anime i navbaren. Utover dette kan man bla gjennom titlene ved å gå videre til neste side, gitt at der er nok resultater, samt se de totale søketreffene, og hvilke resultater du foreløpig ser på, på bunnen av siden. Når det kommer til filtrering, tenkte vi at søking i seg selv er en form for filtrering, men det kan jo diskuteres. Uansett ville en filterfunksjon innebært å endre på spørringer i backend, for så å deploye på nytt, mens denne innleveringen omhandlet å fikse frontend. Vi har derfor valgt å ikke implementere dette, og ta i bruk backenden fra prosjekt 3 - noe som fungerer utmerket.
For å teste appen kan du prøve å registrere en anime med tilstrekkelig med informasjon, for så å søke etter den og se at den dukker opp med oppgitt informasjon.

## Pagination

Ved skalering av datasett, ønsker vi å kunne hente ut litt og litt data fra databasen. Dette gjør vi ved bruk av "offset based pagination" i backend, med et fast antall resultater per side, som er satt av en grense, f.eks. 10 elementer av gangen. Gitt at der finnes nok elementer, og man deretter trykker "Next page", lastes det inn 10 nye elementer med et offset på 10, altså element 11-20 som matcher søkekriteriene osv. Når brukeren trykker seg inn på en ny side, vil det skje en spørring som henter nye resultater basert på parametrene som er relevante (søkeord og sorteringsmåte). Spørringene blir sendt til databasen ved hjelp av GraphQL som er koblet opp mot MongoDB.

## Apollo Client

For å håndtere dataen i prosjektet har vi valgt å bruke **Apollo Client** grunnet dens gode cache-løsning, deklarativ data-fetching og utrolig god GraphQL implementasjon. Dette har gjort at vi ikke trengte å bruke Redux, nenvt i avsnittet om **State management**.

## MongoDB

Vi har valgt å bruke den collection-baserte teknologien MongoDB som databaseløsning. Måten den fungerer er at den lagrer data i formen av dokumenter som minner om JSON-dokumenter med dynamisk schema. Dette gjorde at vi lett kunne importere informasjonen med over 1500 film/serie-titler som var tiltenkt databasen med en lett konversjon fra JSON-format til MongoDB sin dokumentstruktur. Den har høy kapasitet på data, og gjør at spørringene på vår skala går lynraskt med metoder som **find** og **insert**, og tilbyr gode og enkle løsninger for vår "offset based pagination".


## Komponenter

Vi har en rekke ulike komponenter for å hente/presentere data, blant annet en som står for rendering av "Anime" titler og informasjon om disse, i tillegg til en egen komponent for navbaren i bunnen av siden, samt en for GraphQL spørringer for å koble backend med frontend.


## Testing

Ettersom tester ikke var et krav har vi har ikke skrevet noen tester men har heller gjennomført brukertester på web app og ios. Vi har testet ut at søk, sortering og form fungerer som det skal og har lagt inn begrensninger til input i registermovie.

## Design

Ettersom mange av **Chakra UI** komponentene vi bruke i prosjekt 3 ikke er komplementære med react-native har vi valgt å bruke et annet bibliotek. Vi brukte **Native base** fordi biblioteket hadde noen av komponentene vi bruke. Vi har også hentet inn **react-native-dropdown-picker** for å få en dropdown meny. 

## Dokumentasjon (kommentarer)

I dette prosjektet har vi kun kommentert kode i filer vi faktisk la til eller endret i denne omgang, som f.eks. **MovieForm.tsx* og **Animes.tsx**. Dette er fordi vi følte det var mest logisk og relevant for denne innleveringen å kommentere på kodebiter som utgjorde en forskjell fra forrige prosjektet, samt kodebiter som kanskje er litt vanskelige å forstå.

