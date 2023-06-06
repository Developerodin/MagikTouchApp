import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';


/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import Tabs from './pages/Tabs/Tabs';
import ProductDetail from './pages/ProductDetail/ProductDetail';
import OrderBook from './pages/OrderBook/OrderBook';
import Cart from './pages/Cart/Cart';

setupIonicReact();

const App = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        <Route path="/tabs" component={Tabs} />
        <Route path="/product-detail/:id" component={ProductDetail} />
        <Route path="/book" component={OrderBook} />
        <Route path="/cart" component={Cart} exact />
       
        <Route exact path="/">
          <Redirect to="/tabs" />
        </Route>
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;
