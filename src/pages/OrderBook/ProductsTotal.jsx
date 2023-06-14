/* eslint-disable react/prop-types */
import React, { useContext } from 'react'
import { CartContext } from '../../contexts';
import { IonCard, IonCardContent, IonText } from '@ionic/react';

const options = { 
    minimumFractionDigits: 2,
    maximumFractionDigits: 2 
  };
const ProductsTotal = () => {
    const { total,subTotal,gst,discount, validateCoupon } = useContext(CartContext);
  return (
    <IonCard>
        <IonCardContent>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",fontWeight:"bold"}}>
                <div>
                    <IonText>SUB TOTAL</IonText>
                </div>
                <div>
                <IonText>{"₹" + subTotal.toLocaleString('en', options)}</IonText>
                </div>
            </div>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",fontWeight:"bold"}}>
                <div>
                    <IonText>DISCOUNT</IonText>
                </div>
                <div>
                <IonText>{"-₹ " + discount.toLocaleString('en', options)}</IonText>
                </div>
            </div>

            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",margin:"10px 0px",fontWeight:"bold"}}>
                <div>
                    <IonText>GST</IonText>
                </div>
                <div>
                <IonText>{"₹" + gst.toLocaleString('en', options)}</IonText>
                </div>
            </div>
            <div style={{borderTop:"0.5px dashed grey"}}>

            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginTop:"20px",fontWeight:"bold"}}>
                <div>
                    <IonText>TOTAL</IonText>
                </div>
                <div>
                <IonText> {"₹" + total.toLocaleString('en', options)}</IonText>
                </div>
            </div>

            </div>
        </IonCardContent>
     </IonCard>
  )
}

export default ProductsTotal
