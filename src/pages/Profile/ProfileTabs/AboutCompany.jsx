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
        <IonCard style={{marginTop:"100px",borderRadius:"20px"}}>
          <IonCardContent>
          <div >
          <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
          <img src='assets/images/logo.png' alt='logo' style={{width:"123px",height:"123px",borderRadius:"30px"}} />
        </div>
        <div style={{textAlign:"center",marginTop:"20px"}}>
          <IonText style={{fontSize:"28px",fontWeight:"bold",color:"crimson"}}>About Us</IonText>
        </div>
          </div>

          <div style={{textAlign:"left",fontSize:"18px",fontWeight:"500",marginTop:"20px"}}>
            <div>
              <IonText style={{fontSize:"25px",fontWeight:"bold",marginTop:"20px"}}>Our Journey</IonText>
            </div>
            <IonText>
              We put people in touch with trained professionals when they need them. We are not in the business of taking commissions for other’s work but in the business of creating jobs.

              Just wish for it, and Magik Touch will provide it. Sit back and don’t worry about paying premium charges as we are your one-stop economical solution for all your home & other service needs
            </IonText>
          </div>
          </IonCardContent>
          </IonCard>  
         
       
        
        </IonContent>
  </IonPage>
  )
}

export default AboutCompany
