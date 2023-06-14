/* eslint-disable react/prop-types */
import { IonButton, IonCard, IonCardContent, IonCol, IonGrid, IonIcon, IonRow, IonText } from '@ionic/react'
import { pencilOutline, trashOutline } from 'ionicons/icons'
import React from 'react'

const AddressCard = ({Data,address, deleteAddress}) => {
  
  return (
    <IonCard style={{borderRadius:"30px"}}>
    <IonCardContent>
    <IonGrid>
  <IonRow>
    <IonCol size='12'>
      <div style={{textAlign:"end",fontSize:"23px",fontWeight:"bold"}}>
        
        <IonText> <IonIcon size='small' icon={pencilOutline}></IonIcon> Edit</IonText>
       
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
        {address.city}, {address.zone_id}, {address.country_id},{" "}
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
