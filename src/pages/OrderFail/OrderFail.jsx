import { IonButton, IonCol, IonContent, IonFooter, IonGrid, IonPage, IonRow } from '@ionic/react'
import React from 'react'
import Fail from "./Fail.webp"
import HeaderSub from '../../components/Header/HeaderSub'
import { Link } from 'react-router-dom'
const OrderFail = () => {
  return (
    <IonPage>
        <HeaderSub Title={"Order Success"} />
        <IonContent>
        <div>
      
      <IonGrid>
        <IonRow>
          <IonCol size='12'>
          <div style={{textAlign:"center",marginTop:"100px"}}>
          <img src={Fail} alt="" className="img-fluid" />
          <h4>Order Failed</h4>
          
        </div>
          </IonCol>
        </IonRow>
      </IonGrid>
   

      
    </div>
        </IonContent>
     <IonFooter>
     
                  <Link to={"/cart"} style={{textDecoration:"none"}}>
                  <IonButton expand="full"   color="danger"  >Try Again</IonButton>
                  </Link>
         
     </IonFooter>

    </IonPage>
  )
}

export default OrderFail
