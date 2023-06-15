import React from 'react'
import HeaderSub from '../../components/Header/HeaderSub'
import empty from "./empty-cart.png";
import { IonCol, IonGrid, IonRow } from '@ionic/react';
const EmptyCart = () => {
  return (
    <div>
      
      <IonGrid>
        <IonRow>
          <IonCol size='12'>
          <div style={{textAlign:"center"}}>
          <img src={empty} alt="" className="img-fluid" />
          <h4>Your Cart is Empty</h4>
          <p>Please Add Items To Your Cart </p>
        </div>
          </IonCol>
        </IonRow>
      </IonGrid>
   

      
    </div>
  )
}

export default EmptyCart
