import { IonContent, IonPage, IonText } from '@ionic/react'
import React from 'react'
import HeaderSub from '../../components/Header/HeaderSub'

const Orders = () => {
  return (
    <IonPage>
      <HeaderSub Title={"Orders"} />
        <IonContent>
         <div style={{display:"flex",fontSize:"25px",fontWeight:"bold",justifyContent:"center",alignItems:"center",height:"100%"}}>
          <IonText>No Orders Yet !</IonText>
         </div>
        </IonContent>
     
    </IonPage>
  )
}

export default Orders
