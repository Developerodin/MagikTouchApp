import React from "react";
import "./Login.scss";
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
import { Link } from "react-router-dom";
import { phonePortraitOutline, starHalfOutline } from "ionicons/icons";
const Login = () => {
  return (
    <IonPage>
      <HeaderSub Title={"Account Login"} />
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
                <IonText>Sign In</IonText>
              </div>
              <div>Enter your Credentials</div>
            </div>
            <IonList>
                <IonItem lines="none" style={{border:"1px solid grey",borderRadius:"10px"}}>
                <IonIcon slot="start" size="small" icon={phonePortraitOutline}></IonIcon>
                <IonInput
                placeholder="Mobile Number"
             
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
                <Link to={"/tabs/signup"} style={{ textDecoration: "none" }}>
                  <div style={{ textAlign: "center" }}>
                    <IonText style={{ color: "grey", fontSize: "14px" }}>
                      Create Account
                    </IonText>
                  </div>
                </Link>
              </div>
            </div>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Login;
