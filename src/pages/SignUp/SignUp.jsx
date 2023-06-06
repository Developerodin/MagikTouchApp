import React from "react";
import "./SignUp.scss";
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonContent,
  IonIcon,
  IonInput,
  IonItem,
  IonList,
  IonPage,
  IonText,
  IonTitle,
} from "@ionic/react";
import HeaderSub from "../../components/Header/HeaderSub";
import { Link, useHistory } from "react-router-dom";
import { atOutline, personCircleOutline, phonePortraitOutline } from "ionicons/icons";
const SignUp = () => {
    const history=useHistory();
    const handelBack=()=>{
        history.goBack();
    }
  return (
    <IonPage>
      <HeaderSub Title={"Account Registeration"} />
      <IonContent
        className="explore-bg explore-page"
        forceOverscroll={false}
        style={{ backgroundColor: "#F1F1F1" }}
      >
        <IonCard style={{ marginTop: "40px" }}>
          <IonCardContent>
            <div style={{ textAlign: "center", margin: "20px" }}>
              <div
                style={{ fontSize: "26px", fontWeight: "bold", color: "black" }}
              >
                <IonText>Sign Up</IonText>
              </div>
              <div>Enter your Credentials</div>
            </div>
            <IonList>
                <IonItem  lines="none" style={{border:"0.5px solid grey",borderRadius:"10px",margin:"10px 0px"}}>
                <IonIcon slot="start" size="small" icon={personCircleOutline}></IonIcon>
                <IonInput
                placeholder="First Name"
             
            >
                
            </IonInput>
            <IonText style={{color:"grey",fontSize:"11px"}} slot="end">(required)</IonText>
                </IonItem>

                <IonItem lines="none" style={{border:"0.5px solid grey",borderRadius:"10px",margin:"20px 0px"}}>
                <IonIcon slot="start" size="small" icon={personCircleOutline}></IonIcon>
                <IonInput
                placeholder="Last Name"
             
            >
                
            </IonInput>
            <IonText style={{color:"grey",fontSize:"11px"}} slot="end">(required)</IonText>
                </IonItem>

                <IonItem lines="none" style={{border:"0.5px solid grey",borderRadius:"10px",margin:"20px 0px"}}>
                <IonIcon slot="start" size="small" icon={atOutline}></IonIcon>
                <IonInput
                placeholder="Email Address"
             
            >
                
            </IonInput>
            <IonText style={{color:"grey",fontSize:"11px"}} slot="end">(required)</IonText>
                </IonItem>

                <IonItem lines="none" style={{border:"0.5px solid grey",borderRadius:"10px",margin:"20px 0px"}}>
                <IonIcon slot="start" size="small" icon={personCircleOutline}></IonIcon>
                <IonInput
                placeholder="Phone Number"
             
            >
                
            </IonInput>
            <IonText style={{color:"grey",fontSize:"11px"}} slot="end">(required)</IonText>
                </IonItem>

                <IonItem lines="none" style={{border:"0.5px solid grey",borderRadius:"10px",margin:"20px 0px"}}>
                <IonIcon slot="start" size="small" icon={personCircleOutline}></IonIcon>
                <IonInput
                placeholder="Reference ID"
             
            >
                
            </IonInput>
            <IonText style={{color:"grey",fontSize:"11px"}} slot="end">(required)</IonText>
                </IonItem>
            
            </IonList>

            <div style={{ marginTop: "20px" }}>
              <IonButton expand="block" shape="round" color="danger">
                Send OTP
              </IonButton>
              <div style={{ marginTop: "10px" }}>
                
                  <div style={{ textAlign: "center" }} onClick={handelBack}>
                    <IonText style={{ color: "grey", fontSize: "14px" }}>
                      Login Account
                    </IonText>
                  </div>
               
              </div>
            </div>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default SignUp;

