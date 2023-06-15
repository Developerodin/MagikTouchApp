import React, { useContext } from 'react';
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
import SubServices from './pages/Services/SubServices';
import Category from './pages/Category/Category';
import Profile from './pages/Profile/Profile';
import ManageAddress from './pages/Profile/ProfileTabs/ManageAddress';
import AboutCompany from './pages/Profile/ProfileTabs/AboutCompany';
import TermConditions from './pages/Profile/ProfileTabs/TermConditions';
import AddAddress from './pages/Address/AddAddress';
import Toast from './pages/Toast/Toast';
import { CatalogContext } from './contexts';
import EditAddress from './pages/Profile/ProfileTabs/EditAddress';
import OrderSuccess from './pages/OrderSuccess/OrderSuccess';

setupIonicReact();

const App = () => {
  const {toastStatus} = useContext(CatalogContext);
  return (
  <IonApp>
    <Toast props={toastStatus}/>
    <IonReactRouter>
      <IonRouterOutlet>
        <Route path="/tabs" component={Tabs} />
        <Route path="/product-detail/:id" component={ProductDetail} />
        <Route path="/book" component={OrderBook}  />
        <Route path="/add-address" component={AddAddress} exact/>
       
        <Route path="/cart" component={Cart} exact />
        <Route path="/manage-address" component={ManageAddress} exact />
        <Route path="/about-us" component={AboutCompany} exact />
        <Route path="/terms-conditions" component={TermConditions} exact />
        <Route path="/services/:id" component={SubServices} exact />
        <Route path="/category/:id" component={Category} exact />
        {/* <Route path='/OrderSuccess' element={OrderSuccess} exact />  */}
        <Route path="/edit-address/:id" component={EditAddress} exact />
        <Route path="/OrderSuccess" component={OrderSuccess} exact />
        <Route exact path="/">
          <Redirect to="/tabs" />
        </Route>
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
  )
  };

export default App;
