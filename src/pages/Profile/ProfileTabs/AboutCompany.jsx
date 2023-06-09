import { IonCard, IonCardContent, IonContent, IonPage, IonText } from '@ionic/react'
import React from 'react'
import HeaderSub from '../../../components/Header/HeaderSub'
import "./ProfileTabs.scss"
const AboutCompany = () => {
  return (
    <IonPage>
      <HeaderSub Title="About Company"/>
    <IonContent className="explore-bg explore-page"
        forceOverscroll={false}
        style={{ backgroundColor: "#F1F1F1" }}
        >
        <IonCard style={{marginTop:"50px",borderRadius:"20px"}}>
          <IonCardContent>
          <div >
          <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
          <img src='assets/images/logo.png' alt='logo' style={{width:"123px",height:"123px",borderRadius:"30px"}} />
        </div>
        <div style={{textAlign:"center",marginTop:"20px"}}>
          <IonText style={{fontSize:"28px",fontWeight:"bold",color:"crimson"}}>About Us</IonText>
        </div>
          </div>
          </IonCardContent>
          </IonCard>  
         
       
        
        </IonContent>
  </IonPage>
  )
}

export default AboutCompany
