/* eslint-disable react/prop-types */
import { IonButton, IonCard, IonCardContent, IonCol, IonGrid, IonIcon, IonRow, IonText } from '@ionic/react'
import { calendarClearOutline, locationOutline, timeOutline } from 'ionicons/icons'
import React from 'react'

const OrderCard = (props) => {
  const {order} = props;
  // console.log('OrderCard', order)
  return (
    <IonCard style={{marginTop:"30px",boxShadow: "rgba(17, 17, 26, 0.05) 0px 1px 0px, rgba(17, 17, 26, 0.1) 0px 0px 8px",borderRadius:"20px"}}>
      <IonCardContent>
        <IonGrid>
        <IonRow>
            <IonCol size='8'>
              <div>
                <IonText style={{fontSize:"20px",fontWeight:"bold"}}>Order #{order.order_id}</IonText>
              </div>
              <div style={{marginTop:"6px",fontSize:"14px"}}>
                <IonIcon icon={calendarClearOutline} style={{marginRight:"7px"}} ></IonIcon>
                <IonText>Placed On : <span style={{color:"crimson",fontWeight:"bold",fontSize:"12px"}}>{order.date_added.substr(order.date_added.indexOf(",") + 1, 13)}</span></IonText>
              </div>
            </IonCol>

            <IonCol size='4'>
                <div style={{height:"100%",display:"flex",justifyContent:"center"}}>
                    <IonIcon icon={timeOutline} style={{marginRight:"7px",marginTop:"3px"}} ></IonIcon>
                    {props.status === "completed" && <IonText style={{fontWeight:"bold"}}> Completed</IonText>}
                    {props.status !== "completed" && <IonText style={{fontWeight:"bold"}}> {order.status}</IonText>}
                    
                </div>
            </IonCol>
        </IonRow>

        <IonRow>
            <IonCol>
              <IonIcon icon={locationOutline} color="success" ></IonIcon>
                <IonText style={{fontSize:"14px",fontWeight:"bold",color:"#37c55b"}}> DELIVERED ON </IonText>
                <IonText>{order.address.shipping_address_1}, {order.address.shipping_city},{" "}
            {order.address.shipping_zone}, {order.address.shipping_country} Pin
            - {order.address.shipping_postcode}</IonText>
            </IonCol>
        </IonRow>

        <IonRow>
            <IonCol size='12'>
                <div style={{border:"1px solid grey",display:"flex",justifyContent:"space-between",alignItems:"center",fontSize:"14px",fontWeight:"bold",padding:"10px 6px"}}>
                    <IonText>Order Value</IonText>

                    <IonText>{order.total}</IonText>
                </div>
            </IonCol>
            <IonCol>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"left",fontSize:"14px",fontWeight:"bold",padding:"10px 6px"}}>
              <div>
              <IonText>Total Products</IonText>
              </div>
                    <div style={{width:"10%"}}>
                    <IonText>{order.products}</IonText>
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
