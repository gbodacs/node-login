import React from 'react';
import './terms_cookies.scss';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Footer from '../../components/footer/footer';
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'


class Terms extends React.Component {
  dataTitle = `Adatvédelmi és Adatkezelési szabályzat`;
  dataText = `  
  Adatkezelő: Spuriga-Molnár Brigitta (székhely: 1048 Budapest. Bőröndös utca 12), amely önállóan az adatok kezelésének célját meghatározza, az adatkezelésre vonatkozó döntéseket meghozza, végrehajtja, vagy az általa megbízott adatfeldolgozóval végrehajtatja.
  Adatkezelés: az alkalmazott eljárástól függetlenül az adatokon végzett bármely művelet vagy a műveletek összessége, így különösen gyűjtése, felvétele, rögzítése, rendszerezése, tárolása, megváltoztatása, felhasználása, lekérdezése, továbbítása, nyilvánosságra hozatala, összehangolása vagy összekapcsolása, zárolása, törlése és megsemmisítése, valamint az adatok további felhasználásának megakadályozása.
  Adatfeldolgozó: Spuriga-Molnár Brigitta (székhely: 1048 Budapest. Bőröndös utca 12).
  Adatfeldolgozás: az adatkezelési műveletekhez kapcsolódó technikai feladatok elvégzése, függetlenül a műveletek végrehajtásához alkalmazott módszertől és eszköztől, valamint az alkalmazás helyétől, feltéve hogy a technikai feladatot az adatokon végzik;
  
  1. Milyen adatokat kezelünk?
  Az Adatkezelő a saját weboldalán (https://testtartasterapia.hu) regisztrációt nem biztosít, csak meghívás alapján csatlakozhatnak az oldalhoz. Ezt követően a kapott jelszóval beléphet a Felhasználó.
  Spuriga-Molnár Brigitta ev. nyilvántartási száma: 54050291
  A jelentkezés során az Adatkezelő a felhasználó alábbi adatait kezelheti:
    a) Felhasználó neve;
    b) Felhasználó e-mail címe;
    c) Felhasználó országa;
  A fenti adatokat az Adatkezelő elektronikus formában tárol el. Az adatokat csak a terápia céljából használja, hogy személyre szabott szolgáltatást biztosítson.
  
  2. Mi az adatkezelés célja, jogalapja?
    Az adatkezelés jogalapja: ************
    Az adatkezelés célja: a szolgáltatás biztosítása.
    A Felhasználó személyes adatait az Adatkezelő bizalmasan kezeli, a Felhasználó tudta és hozzájárulása nélkül információt nem továbbít illetéktelen harmadik személy részére.
  
  3. Hogyan és mennyi ideig kezeljük adatait?
    Jelen tájékoztató elfogadásával a Felhasználó kifejezetten hozzájárul ahhoz, hogy az általa megadott adatokat az Adatkezelő a Felhasználó napjától a Felhasználó törlési kérelméig kezelje (különösen gyűjtse, rögzítse, rendszerezze, tárolja, felhasználja, lekérdezze, törölje stb).
  *** A Felhasználó bármikor kérheti a személyes adatai törlését a testtartasterapia-kukac-gmail-pont-com e-mail címen.
  
  4. Kihez fordulhat személyes adatai kezelésével kapcsolatosan?
  A Felhasználó az Adatkezelő által kezelt személyes adatairól tájékoztatást, azok helyesbítését, törlését vagy zárolását kérheti, továbbá tiltakozhat a személyes adatainak kezelése ellen az alábbi elérhetőségek bármelyikén.
  Név: Spuriga-Molnár Brigitta
  Cím: 1048 Budapest Bőröndös utca 12
  E-mail: testtartasterapia-kukac-gmail-pont-com
  A Felhasználó kérelmére az Adatkezelő tájékoztatást ad az általa kezelt, illetve az Adatfeldolgozó által feldolgozott adatairól, az adatkezelés céljáról, jogalapjáról, időtartamáról, az Adatfeldolgozó adatkezeléssel összefüggő tevékenységéről. Az Adatkezelő köteles a kérelem benyújtásától számított legrövidebb idő alatt, legfeljebb azonban 30 napon belül közérthető formában, az érintett erre irányuló kérelmére írásban megadni a tájékoztatást.
  
  5. Milyen jogorvoslati lehetőséggel élhet a személyes adatai kezelésével kapcsolatosban?
  A Felhasználó a személyes adatainak kezelésével kapcsolatos jogainak megsértése vagy annak közvetlen veszélye esetén bejelentéssel élhet, illetve vizsgálatot kezdeményezhet a Nemzeti Adatvédelmi és Információszabadság Hatóságnál (postacím: 1530 Budapest Pf.: 5., ugyfelszolgalat@naih.hu), illetve az Info tv. 22.§- ának rendelkezései szerint bírósághoz fordulhat.
  
  6. Hogyan tároljuk személyes adatait, illetve hogyan biztosítjuk azok védelmét?
  Az Adatkezelő, illetve az Adatfeldolgozó a Felhasználó személyes adatait elektronikus formában tárolja. Az Adatkezelő az Infotv. hatályos előírásainak megfelelően gondoskodik a Felhasználó személyes adatainak biztonságáról, és megteszi mindazokat a technikai és szervezési intézkedéseket, kialakítja azokat az eljárási szabályokat, amelyek személyes adatai védelmének biztosításához szükségesek.
  
  Budapest, 2019.10.17.`;

  cookieTitle = `Cookie (süti) kezelési szabályzat`;
  cookieText = `  
  A cookie-k („sütik”) olyan rövid szöveges fájlok, amelyeket a megtekintett honlapok helyeznek el a számítógép böngészőjében. A cookie-k nem csatlakoznak az Ön rendszeréhez, és nem károsítják az Ön fájljait.

  A cookie-k lehetnek „állandó” vagy „ideiglenes” cookie-k. Az állandó cookie-t a böngésző egy meghatározott időpontig tárolja, feltéve, hogy azt a felhasználó korábban nem törli, az ideiglenes cookie-t azonban a böngésző nem tárolja, az a böngésző becsukásával automatikusan törlődik.

  Annak érdekében, hogy weboldalunk a lehető leghatékonyabban működjön, mi is cookie-kat használunk. A cookie-k által egy honlap felismeri a visszatérő felhasználókat. Személyes azonosításra alkalmas adatokat nem gyűjtünk.

  Amennyiben a süti (cookie) elhelyezéséhez Ön nem járul hozzá, azt a saját böngészőjében elvégzett beállítások (tiltás, visszavonás) útján teheti meg. Ebben az esetben ez bizonyos szolgáltatások igénybevételét korlátozhatja vagy megakadályozhatja.`;
  constructor(props) {
    super(props);
    this.redirectToHomePage = this.redirectToHomePage.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      text: this.dataText,
      title: this.dataTitle,
      value: "data"
    };
  }

  handleChange(event, newValue) {
  }

  redirectToHomePage() {
    this.props.history.push('/home');
  }

  render() {
    return (
      <div>
        <div className="Terms">
          <Card>
            <Card.Body 
              variant="primary"
              className="card-body">
                <Tabs defaultActiveKey="cookie" id="uncontrolled-tab">
                  <Tab eventKey="data" title="Adatvédelmi szabályzat">
                    <div className='title-line'>
                        <b>{this.dataTitle}</b>
                    </div>
                    <div className='new-line'>
                        {this.dataText}
                    </div>
                  </Tab>
                  <Tab eventKey="cookie" title="Sütikezelési szabályzat">
                    <div className='title-line'>
                        <b>{this.cookieTitle}</b>
                    </div>
                    <div className='new-line'>
                        {this.cookieText}
                    </div>
                  </Tab>
                </Tabs>
                <hr/>
            </Card.Body>
            <Card.Footer>
              <Button variant="primary" type="button" onClick={this.redirectToHomePage} className={`my-4 ml-4`}>Vissza a főoldalra</Button>
            </Card.Footer>
          </Card>
        </div>
        <Footer/>
      </div>
    )
  }
}

export default Terms;