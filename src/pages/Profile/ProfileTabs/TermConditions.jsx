import { IonButton, IonCard, IonCardContent, IonContent, IonPage, IonText } from "@ionic/react";
import React from "react";
import HeaderSub from "../../../components/Header/HeaderSub";
import "./ProfileTabs.scss"
const TermConditions = () => {
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
          <IonText style={{fontSize:"28px",fontWeight:"bold",color:"crimson"}}>Term & Conditions</IonText>
        </div>
          </div>

          <div style={{textAlign:"center",fontSize:"20px",fontWeight:"500"}}>

            <IonButton>VIEW OUR PRODUCTS</IonButton>
          </div>
          </IonCardContent>
          </IonCard>  
         
       
        
        </IonContent>
  </IonPage>
  );
};

export default TermConditions;
