import { IonButton, IonCard, IonCardContent, IonCol, IonContent, IonGrid, IonIcon, IonPage, IonRow, IonText } from '@ionic/react'
import React, { useContext } from 'react'
import HeaderSub from '../../../components/Header/HeaderSub'
import "./ProfileTabs.scss"
import { pencilOutline, trashOutline } from 'ionicons/icons'
import AddressCard from '../../../components/AddressComp/AddressCard'
import { UserContext } from '../../../contexts'
import { useHistory } from 'react-router'
const ManageAddress = () => {
  const { log,UserAddress, setUserAddress } = useContext(UserContext);
const history =useHistory();
  const handelAddAddress=()=>{
    history.push("/add-address")
  }
  return (
    <IonPage>
      <HeaderSub Title="Adderss Book"/>
<IonContent
className="explore-bg explore-page"
forceOverscroll={false}
style={{ backgroundColor: "#F1F1F1" }}>


<div style={{display:"flex",justifyContent:"flex-end",margin:"20px 10px 0px 0px"}}>
  <IonButton shape='round' onClick={handelAddAddress} style={{width:"40%"}}>+ Add Address</IonButton>
</div>

{UserAddress !== null &&  <AddressCard Data={UserAddress} />}




</IonContent>
    </IonPage>
   
  )
}

export default ManageAddress
