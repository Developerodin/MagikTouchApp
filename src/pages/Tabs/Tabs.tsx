import React, { useContext, useEffect, useState } from 'react';
import { Redirect, Route } from 'react-router-dom';
import {
  IonTabs, IonRouterOutlet, IonTabBar, IonTabButton, IonIcon, IonText 
} from '@ionic/react';
import { timerOutline, personCircleOutline, homeOutline, clipboardOutline, gridOutline, personOutline, businessSharp, callOutline, timeOutline } from 'ionicons/icons';
// import './Tabs.scss';
import Explore from '../Explore/Explore';
import Service from '../Services/Service';
import Profile from '../Profile/Profile';
import MagikGate from '../MagikGate/MagikGate';
import Category from '../Category/Category';
import Login from '../Login/Login';
import SignUp from '../SignUp/SignUp';
import Cart from '../Cart/Cart';
import SubServices from '../Services/SubServices';
import { UserContext } from '../../contexts';
import ContactUs from '../Contact Us/ContactUs';
import Orders from '../OrdersTab/Orders';
import EditProfile from '../Profile/EditProfile';

const Tabs = () => {
 
  const[ProfilePath,setProfilePath]=useState("");
  const { log, userDetails } = useContext(UserContext);
  
  useEffect(() => {
    console.log("Log in profile",log)
    if (log === 0) {
      setProfilePath("/tabs/login")
    }
    else{
      setProfilePath("/tabs/profile")
    }
    
  }, [log]);

  return (
    <IonTabs className="tabs-top">
      <IonRouterOutlet>
        <Redirect exact path="/tabs" to="/tabs/explore" />
         <Route path="/tabs/explore" component={Explore} exact />
         <Route path="/tabs/services" component={Service} exact />
         <Route path="/tabs/orders" component={Orders} exact />
        
              <Route path="/tabs/login" component={Login} exact />
              <Route path="/tabs/profile" component={Profile} exact />
         {/* <Route path="/tabs/profile" component={Auth ? Profile : Login} exact /> */}
         <Route path="/tabs/signup" component={SignUp} exact />
        
        <Route path="/tabs/contactus" component={ContactUs} exact />
        <Route path="/tabs/editprofile" component={EditProfile} exact />
        
        {/*<Route path="/tabs/discover" component={Discover} exact />
        
       
       
        
        {/* <Route path="/tabs/CardDetailed/:id" component={CardDetailed} exact /> */}
      </IonRouterOutlet>

      <IonTabBar slot="bottom" className="tabs-page tab-bar-no-border">
        <IonTabButton tab="explore" href="/tabs/explore">
          <IonIcon icon={ homeOutline } />
          <IonText className='profile-text' style={{fontSize:"11px",fontWeight:"bold"}}>HOME</IonText> 
        </IonTabButton>
        <IonTabButton tab="profile" href={ProfilePath}>
          <IonIcon icon={ personOutline } />
          <IonText className='profile-text' style={{fontSize:"11px",fontWeight:"bold"}}>PROFILE</IonText> 
        </IonTabButton>
        <IonTabButton tab="activities" href="/services/71" className="color-gold">
          <IonIcon icon={ gridOutline } />
          <IonText className='profile-text' style={{fontSize:"11px",fontWeight:"bold"}} >SERVICES</IonText> 
        </IonTabButton>
        <IonTabButton tab="orders" href="/tabs/orders">
          <IonIcon icon={ timeOutline } />
          <IonText className='profile-text' style={{fontSize:"11px",fontWeight:"bold"}}>ORDERS</IonText> 
        </IonTabButton>
        <IonTabButton tab="contactus" href="/tabs/contactus">
          <IonIcon icon={ callOutline} />
          <IonText className='profile-text' style={{fontSize:"8px",fontWeight:"bold"}}>CONTACT US</IonText> 
        </IonTabButton>
       
      </IonTabBar>
    </IonTabs>
  );
};

export default Tabs;
