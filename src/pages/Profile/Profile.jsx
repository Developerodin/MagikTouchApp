import { IonCard, IonCardContent, IonContent, IonPage } from '@ionic/react'
import React, { useContext, useEffect } from 'react'
import { UserContext } from '../../contexts';
import { useHistory } from 'react-router';
import "./Profile.scss"
import HeaderSub from '../../components/Header/HeaderSub';
const Profile = () => {
  const { log, userDetails } = useContext(UserContext);
  const history=useHistory();
  useEffect(() => {
    console.log("Log in profile",log)
    if (log === 0) {
      history.push("/tabs/login");
    }
    
  }, [log]);
  return (
    <IonPage>
      <HeaderSub Title="Profile"/>
        <IonContent
        className="explore-bg explore-page"
        forceOverscroll={false}
        style={{ backgroundColor: "#F1F1F1" }}
        >
        <IonCard style={{marginTop:"30px"}}>
   <IonCardContent>
    profile
   </IonCardContent>
        </IonCard>
        </IonContent>
    </IonPage>
  )
}

export default Profile
