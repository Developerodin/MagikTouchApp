import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import {
  IonTabs, IonRouterOutlet, IonTabBar, IonTabButton, IonIcon, IonText 
} from '@ionic/react';
import { timerOutline, personCircleOutline, homeOutline, clipboardOutline, gridOutline, personOutline, businessSharp } from 'ionicons/icons';
// import './Tabs.scss';
import Explore from '../Explore/Explore';
import Service from '../Services/Service';
import Profile from '../Profile/Profile';
import MagikGate from '../MagikGate/MagikGate';
import Category from '../Category/Category';

const Tabs = () => {
  return (
    <IonTabs className="tabs-top">
      <IonRouterOutlet>
        <Redirect exact path="/tabs" to="/tabs/explore" />
         <Route path="/tabs/explore" component={Explore} exact />
         <Route path="/tabs/services" component={Service} exact />
         <Route path="/tabs/profile" component={Profile} exact />
        <Route path="/tabs/magikgate" component={MagikGate} exact />
        <Route path="/tabs/category/:id" component={Category} exact />
        {/*<Route path="/tabs/discover" component={Discover} exact />
        
       
       
        
        {/* <Route path="/tabs/CardDetailed/:id" component={CardDetailed} exact /> */}
      </IonRouterOutlet>

      <IonTabBar slot="bottom" className="tabs-page tab-bar-no-border">
        <IonTabButton tab="explore" href="/tabs/explore">
          <IonIcon icon={ homeOutline } />
          <IonText className='profile-text'>HOME</IonText> 
        </IonTabButton>
        <IonTabButton tab="profile" href="/tabs/profile">
          <IonIcon icon={ personOutline } />
          <IonText className='profile-text'>PROFILE</IonText> 
        </IonTabButton>
        <IonTabButton tab="activities" href="/tabs/services" className="color-gold">
          <IonIcon icon={ gridOutline } />
          <IonText className='profile-text'>SERVICES</IonText> 
        </IonTabButton>
        <IonTabButton tab="magikgate" href="/tabs/magikgate">
          <IonIcon icon={ businessSharp} />
          <IonText className='profile-text'>MAGIK GATE</IonText> 
        </IonTabButton>
       
      </IonTabBar>
    </IonTabs>
  );
};

export default Tabs;
