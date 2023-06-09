import { IonButton, IonCard, IonCardContent, IonCol, IonContent, IonGrid, IonIcon, IonPage, IonRow, IonText } from '@ionic/react'
import React from 'react'
import HeaderSub from '../../../components/Header/HeaderSub'
import "./ProfileTabs.scss"
import { pencilOutline, trashOutline } from 'ionicons/icons'
const ManageAddress = () => {
  return (
    <IonPage>
      <HeaderSub Title="Adderss Book"/>
<IonContent
className="explore-bg explore-page"
forceOverscroll={false}
style={{ backgroundColor: "#F1F1F1" }}>


<div style={{display:"flex",justifyContent:"flex-end",margin:"20px 10px 0px 0px"}}>
  <IonButton shape='round' style={{width:"40%"}}>+ Add Address</IonButton>
</div>

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
    <IonText>Lorem ipsum dolor sit amet, consectetur adipisicing elit. 
      Deleniti alias</IonText>
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




</IonContent>
    </IonPage>
   
  )
}

export default ManageAddress
