
Matopelissä on sekä frontend että backend. Päälogiikka itse matopeliin tehdään asiakaspuolella
käyttäen Javascriptiä. Matopeli sijoittuu itsessään JavaSciptissä kanvaasin (canvas) sisään.
Kanvaasin alapuolella näkyy nykyinen pistemäärä. Aina madon syötyä omenan, pistemäärä kasvaa yhdellä.
Frontendin puolella kanvaasi on jaettu 30 yhtä suuren laatikkoon, niin pituus- kuin leveyssuunnassa.
Yhden laatikon leveys ja pituus on 20 yksikköä. Koko peli perustuu näihin laatikoihin ja niiden
x- ja y-koordinaatteihin, joissa mato liikkuu. Myös omenat ilmestyvät näiden näkymättömien laatikoiden sisään.
Matopelin seinien rajoina ovat kanvaasin seinät. Frontendin dokumentointi on toteutettu JSDoc:lla.

Backend eli palvelinpuoli toteutettu käyttäen JavaScriptin kirjastoa, Nodejs:ää. Lisäksi tähän JavaScriptin kirjastoon
sisältyy monia eri riippuvuuksia (dependences), joita on mahdollista liittää Nodejs:ään. Nämä riippuuvuudet
ovat kuin minikirjastoja itse pääkirjaston eli Nodejs sisällä. Frontend taulukoi aiempien käyttäjien tuloksia backendin
kautta. Palvelin toteuttaa osittain REST-apin mukaista reititystekniikkaa. Lyhyesti dataa liikkuu frontendin, backendin ja
sen tietokannan välillä näin: frontend ← palvelin ← → tietokanta.

Käyttöohjeet:

1. Mene haluamaasi kansioon, johon projekti tulee ja suorita käsky git clone https://github.com/Pjavah/Matopeli.git
   Nyt kaikki projektin ajamiseen tiedostot pitäisivät olla kansiossa Matopeli.
   Tässä kohtaa matopeliä voi jo pelata, mutta käyttäjänimet ja tulokset eivät tallennu.
2. Katso Moodlessa olevan työn raportin palautuksen yhteydessä olevasta tekstitiedostosta
   tarvittava muutos, joka tulee tehdä koodiin, jotta palvelin ja tietokanta toimii oikein.
3. Käynnistetään palvelin tulosten hakemiseksi  ja tallentamiseksi tietokantaan käskyllä npm run watch.
4. Profit

PS. Laita äänet päälle matopeliä pelatessa, niin pelikokemus parantuu.    
