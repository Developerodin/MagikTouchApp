/* eslint-disable react/prop-types */
import { IonButton, IonCard, IonCardContent, IonCol, IonGrid, IonIcon, IonRow, IonText } from '@ionic/react'
import { pencilOutline, trashOutline } from 'ionicons/icons'
import React from 'react'
import { useHistory } from 'react-router'
import { Link } from 'react-router-dom'

const AddressCard = ({Data,address, deleteAddress}) => {
  const history=useHistory();
  const handelClick=()=>{
    console.log("Edit click")
    history.push(`/edit-address/${address.address_id}`)
}
  
  return (
    <IonCard style={{borderRadius:"30px"}}>
    <IonCardContent>
    <IonGrid>
  <IonRow>
    <IonCol size='12'>
      <div style={{textAlign:"end",fontSize:"23px",fontWeight:"bold"}}>
        
        <IonText onClick={handelClick}> <IonIcon size='small' icon={pencilOutline}></IonIcon> Edit</IonText>
       
        
       
      </div>
    </IonCol>
  
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
      
      <IonButton shape='round' expand='block' onClick={() => deleteAddress(address.address_id)}>
        <IonIcon icon={trashOutline}></IonIcon>
        DELETE
        </IonButton>
    </IonCol>
  </IonRow>
  </IonGrid>
    </IonCardContent>
  </IonCard>
  )
}

export default AddressCard
