/* eslint-disable react/prop-types */
import { IonButton, IonCard, IonCardContent, IonCol, IonGrid, IonIcon, IonRow, IonText } from '@ionic/react'
import { trashOutline } from 'ionicons/icons';
import React, { useContext, useEffect, useState } from 'react'
import { CartContext, CatalogContext } from '../../contexts';
import QuantityInputButton from '../QuantityInputButton/QuantityInputButton';

const CartCard = ({Data}) => {
    const { cart, deleteFromCart, updateQuantity } = useContext(CartContext);
  const { getProductFromProductsList } = useContext(CatalogContext);
    const [Quantity,setQuantity] =useState(0);

    useEffect(()=>{
      const value=  getProductFromProductsList(Data.product_id);
      console.log("VALUE",value)
    },[])
  return (
    <IonCard style={{marginTop:"20px"}}>
     <IonCardContent>
        <IonGrid>
            <IonRow>
                <IonCol size='3'>
                    <img 
                    src={
                        getProductFromProductsList(Data.product_id) &&
                        getProductFromProductsList(Data.product_id)
                          .image
                      }
                    
                    alt="img"/>
                </IonCol>
                <IonCol size='5'>
                    <div style={{marginLeft:"10px"}}>
                        <div>
                            <IonText style={{fontSize:"15px",fontWeight:"bold",color:"black"}}>{Data.name}</IonText>
                        </div>
                        <div>
                            <IonText>₹{Data.price}</IonText>
                        </div>
                    </div>
                </IonCol>
                <IonCol size='4' >
                    <div style={{height:"100%"}}>
                        <div style={{position:"absolute",top:"-14px",right:"0"}}>
                        <IonIcon size='large' onClick={() => deleteFromCart(Data)} color='danger' icon={trashOutline}></IonIcon>
                        </div>
                        
                    {/* <div style={{display:"flex",justifyContent:"end",alignItems:"flex-end",marginRight:"20px",width:"100%",height:"100%"}}>
                            <IonButton size='small' style={{height:"20px"}} color="light" disabled={Quantity===0 ? true : false}  onClick={()=>{setQuantity((prev)=>prev-1)}}>-</IonButton>
                            <IonText style={{margin:"0px 5px"}}>{Quantity}</IonText>
                            <IonButton size='small' style={{height:"20px"}} color="light" onClick={()=>{setQuantity((prev)=>prev+1)}}>+</IonButton>
                        </div> */}
                        <QuantityInputButton
                        quantity={Data.quantity}
                        handleIncrement={() =>
                          updateQuantity(Data, "increment")
                        }
                        handleDecrement={() =>
                          updateQuantity(Data, "decrement")
                        }
                        handleCustomQuantityInput={() => {
                          console.log("custom");
                        }}
                        />
                    </div>
                </IonCol>
            </IonRow>
        </IonGrid>
     </IonCardContent>
    </IonCard>
  )
}

export default CartCard
