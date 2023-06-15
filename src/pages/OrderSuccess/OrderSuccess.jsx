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
     <IonGrid>
            <IonRow>
                {/* <IonCol>
                <IonButton  expand="block"   style={{borderRadius:"20px",height:"30px"}} color="danger">Book Now</IonButton>
                </IonCol> */}
                <IonCol>
                  <Link to={"/"} style={{textDecoration:"none"}}>
                  <IonButton expand="full"  fill="outline" color="danger"  style={{height:"30px",border:"1px solid crimson"}}>Shop More</IonButton>
                  </Link>
                
                </IonCol>
            </IonRow>
        </IonGrid>
     </IonFooter>

    </IonPage>
  )
}

export default OrderSuccess
