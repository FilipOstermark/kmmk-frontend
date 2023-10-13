import { Link } from "react-router-dom"
import { FRONTEND_TITLE, FRONTEND_URL_BASE, SUPPORT_EMAIL_ADDRESS } from "src/util/constants"
import "src/view/Privacy/PrivacyPolicy.css"

export const PrivacyPolicy: () => JSX.Element = () => (
  <div className="privacy-policy-container">
    <h2>Integritetspolicy</h2>
    <p className="valid-from-date">Giltigt från och med: 2023-10-13</p>
    <p>
      Välkommen till {FRONTEND_TITLE}! Denna integritetspolicy förklarar 
      hur vi samlar in, använder, delar och skyddar din personliga information 
      när du använder vår webbplats, <a href={FRONTEND_URL_BASE}
      >{FRONTEND_URL_BASE}</a> ("webbplatsen"), och de tjänster som 
      tillhandahålls genom den. Vi är ett privat projekt skapat av Klagomurens 
      Musikklubb, och vi är engagerade i att skydda din integritet.
    </p>

    <h3>Information som vi samlar in</h3>
    <p>
      När du använder vår webbplats kan vi samla in följande personlig 
      information från dig:
    </p>
    <ul>
      <li>
        <p>
          Förnamn och Efternamn: Vi samlar in ditt förnamn och efternamn 
          enbart för att identifiera dig inom vårt system med avseende på 
          betygsättning av musikalbum.
        </p>
      </li>
      <li>
        <p>
          E-postadress: Vi samlar in din e-postadress för att skapa en unik 
          användaridentifierare för ditt konto.
        </p>
      </li>
    </ul>

    <h3>Hur vi använder din information</h3>
    <p>
      Vi använder den personliga information vi samlar in för följande 
      ändamål:
    </p>
    <ul>
      <li>
        <p>
          Att identifiera dig inom vårt system för betygsättning av 
          musikalbum.
        </p>
      </li>
      <li>
        <p>
          Att skapa en unik användaridentifierare med din e-postadress.
        </p>
      </li>
      <li>
        <p>
          Att kommunicera med dig angående ditt konto, såsom kontorelaterade 
          meddelanden.
        </p>
      </li>
    </ul>

    <h3>Utlämnande av din information</h3>
    <p>
      Vi delar din personliga information med följande tredje parter för 
      ändamålen med vårt projekt:
    </p>
    <ul>
      <li>
        <p>
          Google Cloud Platform (Cloud Run): Vår backend körs på Google Cloud 
          Platform (Cloud Run) för hosting och databehandling.
        </p>
        <a href="https://cloud.google.com/run" hrefLang="en" />
      </li>
      <li>
        <p>
          Supabase: Vi använder Supabase som vår databastjänstleverantör för 
          att säkert lagra användarinformation.
        </p>
        <a href="https://supabase.com/" />
      </li>
    </ul>

    <h3>Dina val</h3>
    <p>
      Du har följande valmöjligheter när det gäller din personliga 
      information:
    </p>
    <ul>
      <li>
        <p>
          Du kan komma åt och uppdatera din personliga information genom att 
          logga in och besöka <Link to="/account">Mitt konto</Link>.
        </p>
      </li>
      <li>
        <p>
          Du kan dra tillbaka ditt samtycke till behandlingen av dina data 
          genom att besöka <Link to="/account">Mitt konto</Link>, 
          scrolla till 'Danger zone', klicka 'Visa alternativ', och klicka 'Ta 
          bort användardata'.
        </p>
      </li>
    </ul>

    <h3>Dataskydd</h3>
    <p>
      Vi implementerar rimliga säkerhetsåtgärder för att skydda din personliga 
      information mot obehörig åtkomst, avslöjande, ändring och förstöring. 
      Vänligen notera att ingen metod för dataöverföring över internet eller 
      elektronisk lagring är helt säker, och vi kan inte garantera absolut 
      säkerhet.
    </p>

    <h3>Dataskyddspolicy</h3>
    <p>
      Vi kommer att behålla din personliga information så länge som det är 
      nödvändigt för ändamålen som beskrivs i denna integritetspolicy eller 
      enligt tillämplig lag. Om du tar bort ditt konto kommer vi att behålla 
      dina data under en rimlig tid eller enligt lag för att uppfylla våra 
      legitima affärsändamål.
    </p>

    <h3>Kontakta oss</h3>
    <p>
      Om du har några frågor om denna integritetspolicy eller vår 
      databehandlingspraxis, vänligen kontakta <a 
      href={`mailto:${SUPPORT_EMAIL_ADDRESS}`}>{SUPPORT_EMAIL_ADDRESS}</a>.
    </p>

    <h3>Ändringar i denna integritetspolicy</h3>
    <p>
      Vi kan uppdatera denna integritetspolicy med jämna mellanrum för att 
      återspegla ändringar i våra databehandlingspraxis eller lagkrav. Den 
      uppdaterade integritetspolicyn kommer att publiceras på denna sida med 
      det effektiva datumet.
    </p>
  </div>
)