/* eslint-disable react/prop-types */
import { IonButton, IonText } from '@ionic/react'
import React, { useState } from 'react'

const QuantityInputButton = (props) => {
    const [Quantity,setQuantity] =useState(1);
  return (
    <div style={{display:"flex",justifyContent:"end",alignItems:"flex-end",marginRight:"20px",width:"100%",height:"100%"}}>
                            <IonButton size='small' style={{height:"20px"}} color="light" disabled={props.quantity===1 ? true : false}  onClick={(e) => props.handleDecrement(e)}>-</IonButton>
                            <IonText style={{margin:"0px 5px"}}>{Number(props.quantity).toString()}</IonText>
                            <IonButton size='small' style={{height:"20px"}} color="light" onClick={(e) => props.handleIncrement(e)}>+</IonButton>
                        </div>
  )
}

export default QuantityInputButton
