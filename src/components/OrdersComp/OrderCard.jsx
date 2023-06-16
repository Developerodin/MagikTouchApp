import { IonButton, IonCard, IonCardContent, IonCol, IonGrid, IonIcon, IonRow, IonText } from '@ionic/react'
import { calendarClearOutline, locationOutline, timeOutline } from 'ionicons/icons'
import React from 'react'

const OrderCard = () => {
  return (
    <IonCard style={{marginTop:"30px",boxShadow: "rgba(17, 17, 26, 0.05) 0px 1px 0px, rgba(17, 17, 26, 0.1) 0px 0px 8px"}}>
      <IonCardContent>
        <IonGrid>
        <IonRow>
            <IonCol size='8'>
              <div>
                <IonText style={{fontSize:"20px",fontWeight:"bold"}}>Order #2485</IonText>
              </div>
              <div style={{marginTop:"6px",fontSize:"14px"}}>
                <IonIcon icon={calendarClearOutline} style={{marginRight:"7px"}} ></IonIcon>
                <IonText>Placed On : <span style={{color:"crimson",fontWeight:"bold"}}>14 Jun 2023</span></IonText>
              </div>
            </IonCol>

            <IonCol size='4'>
                <div style={{height:"100%",display:"flex",justifyContent:"center",alignItems:"center"}}>
                    <IonIcon icon={timeOutline} style={{marginRight:"7px"}} ></IonIcon>
                    <IonText style={{fontWeight:"bold"}}> Pending</IonText>
                </div>
            </IonCol>
        </IonRow>

        <IonRow>
            <IonCol>
              <IonIcon icon={locationOutline} color="success" ></IonIcon>
                <IonText style={{fontSize:"14px",fontWeight:"bold",color:"#37c55b"}}> DELIVERED ON </IonText>
                <IonText>jivan vihar coloney parbatsar nagour</IonText>
            </IonCol>
        </IonRow>

        <IonRow>
            <IonCol size='12'>
                <div style={{border:"1px solid grey",display:"flex",justifyContent:"space-between",alignItems:"center",fontSize:"14px",fontWeight:"bold",padding:"10px 6px"}}>
                    <IonText>Order Value</IonText>

                    <IonText>$2,296</IonText>
                </div>
            </IonCol>
            <IonCol>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"left",fontSize:"14px",fontWeight:"bold",padding:"10px 6px"}}>
              <div>
              <IonText>Total Products</IonText>
              </div>
                    <div style={{width:"10%"}}>
                    <IonText>1</IonText>
                    </div>

                    
                </div>
            </IonCol>
        </IonRow>

        <IonRow>
            <IonCol>
                <div style={{display:"flex",justifyContent:"center"}}>
                    <IonButton>MORE INFO</IonButton>
                </div>
            </IonCol>
        </IonRow>
        </IonGrid>
      </IonCardContent>
    </IonCard>
  )
}

export default OrderCard
