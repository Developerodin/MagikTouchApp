import { IonContent, IonPage } from "@ionic/react";
import React from "react";
import HeaderSub from "../../../components/Header/HeaderSub";
import "./ProfileTabs.scss"
const TermConditions = () => {
  return (
    <IonPage>
      <HeaderSub Title="Term & Conditions"/>
      <IonContent
      className="explore-bg explore-page"
      forceOverscroll={false}
      style={{ backgroundColor: "#F1F1F1" }}>
        TermConditions</IonContent>
    </IonPage>
  );
};

export default TermConditions;
