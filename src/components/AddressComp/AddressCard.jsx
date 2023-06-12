/* eslint-disable react/prop-types */
import { IonButton, IonCard, IonCardContent, IonCol, IonGrid, IonIcon, IonRow, IonText } from '@ionic/react'
import { pencilOutline, trashOutline } from 'ionicons/icons'
import React from 'react'

const AddressCard = ({Data}) => {
  console.log("Data",Data);
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
      {Data.firstname} {Data.lastname}
        </IonText><br/>

        <IonText>
        {Data.address_1}
        </IonText>
        <br />
        <IonText>
        {Data.city}, {Data.zone_id}, {Data.country_id},{" "}
              {Data.postcode}
        </IonText>
              
              <br />
      </div>
      
    </IonCol >
    <IonCol size='12' style={{marginTop:"20px"}}>
      
      <IonButton shape='round' expand='block'>
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
