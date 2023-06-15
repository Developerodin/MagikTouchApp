/* eslint-disable react/prop-types */
import { IonButton, IonCard, IonCardContent, IonCol, IonGrid, IonIcon, IonRow, IonText } from '@ionic/react'
import { checkmark, pencilOutline, pinOutline, trashOutline } from 'ionicons/icons'
import React, { useState } from 'react'


const CartAddressCard = (props) => {
  const address = props.address;
  const [Selected,setSelected]=useState(false)
  const [count,setcount]=useState(2)
   


  const handelSelect=()=>{
   
    console.log("Count",count);
    if(count % 2===0){
      setSelected(true);
      setcount((prev)=>prev+1)
    }
    else{
      setSelected(false);
      setcount((prev)=>prev-1)
    }
    
    console.log("Selected ",address.firstname);
  }
  return (
    <IonCard style={{borderRadius:"30px",marginBottom:"20px"}}  onClick={handelSelect}>
      
    <IonCardContent>
    <IonGrid>
  <IonRow  >
    {/* <IonCol size='12'>
      <div style={{textAlign:"end",fontSize:"23px",fontWeight:"bold"}}>
        
        <IonText> <IonIcon size='small' icon={pencilOutline}></IonIcon> Edit</IonText>
       
      </div>
    </IonCol> */}
  
    <IonCol size='12'>
      <div style={{width:"90%",fontSize:"16px",fontWeight:"bold"}}>
      <IonText>
      {address.firstname} {address.lastname}
        </IonText><br/>

        <IonText>
        {address.address_1}
        </IonText>
        <br />
        <IonText>
        {address.city}, {address.zone}, {address.country},{" "}
              {address.postcode}
        </IonText>
              
              <br />
      </div>
      
    </IonCol >
    <IonCol size='12' style={{marginTop:"20px"}}>
    {/* {props.selected ? (
              <button className="btn btn-main btn-xs shadow-bg shadow-bg-s cart-delete btn-primary">
                <i className="bi bi-check-circle"></i>
              </button>
            ) : (
              ""
            )} */}
      
      <IonButton shape='round' expand='block' onClick={props.onClick} color={props.selected ? "danger" : "light"}>
      {props.selected ? 
      "Selected" : 

      "Select"}
        {props.selected ? 
      <IonIcon icon={checkmark}  ></IonIcon> : 

      ""}
        
        </IonButton>
    </IonCol>
  </IonRow>
  </IonGrid>
    </IonCardContent>
  </IonCard>
    
  );
};

export default CartAddressCard;
