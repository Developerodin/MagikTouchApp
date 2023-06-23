import { IonButton, IonCol, IonContent, IonFooter, IonGrid, IonPage, IonRow } from '@ionic/react'
import React from 'react'
import check from "./check.gif"
import HeaderSub from '../../components/Header/HeaderSub'
import { Link } from 'react-router-dom'
const OrderSuccess = () => {
  return (
    <IonPage>
        <HeaderSub Title={"Order Success"} />
        <IonContent>
        <div>
      
      <IonGrid>
        <IonRow>
          <IonCol size='12'>
          <div style={{textAlign:"center",marginTop:"100px"}}>
          <img src={check} alt="" className="img-fluid" />
          <h4>Order Placed Successfully</h4>
          
        </div>
          </IonCol>
        </IonRow>
      </IonGrid>
   

      
    </div>
        </IonContent>
     <IonFooter>
     
                  <Link to={"/"} style={{textDecoration:"none"}}>
                  <IonButton expand="full"   color="danger"  >Shop More</IonButton>
                  </Link>
         
     </IonFooter>

    </IonPage>
  )
}

export default OrderSuccess
