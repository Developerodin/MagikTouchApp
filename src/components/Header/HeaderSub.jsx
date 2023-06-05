/* eslint-disable react/prop-types */
import { IonCard, IonCol, IonGrid, IonHeader, IonIcon, IonInput, IonItem, IonList, IonRow, IonSearchbar, IonText, IonTitle, IonToolbar } from '@ionic/react'
import { arrowBack, caretBackOutline, cartOutline, searchOutline } from 'ionicons/icons'
import React from 'react'
import { useHistory } from 'react-router';

const HeaderSub = (props) => {
    const {Title}=props;
    const history=useHistory();
    const handelBack=()=>{
        history.goBack();
    }
  return (
    <IonHeader collapse="fade"  >
    <IonToolbar style={{borderColor:"transparent"}}>
        <IonGrid>
            <IonRow>
                <IonCol size='2'>
                <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
                <img style={{height:"40px",width:"40px"}} src="assets/images/logo.png" alt="logo"/>
                </div>
                    
                </IonCol>

                <IonCol size='8' >
                    <div onClick={handelBack} style={{display:"flex",justifyContent:"center",alignItems:"center",fontSize:"17px",fontWeight:"bold",height:"100%"}}>
                        <IonIcon style={{marginRight:"10px"}}  color="danger" icon={caretBackOutline}></IonIcon>
                        <IonText color="danger" >{Title}</IonText>
                    </div>
                </IonCol>

                <IonCol size='2' >
                    <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
                    <IonIcon  size='large' icon={cartOutline}></IonIcon>
                    </div>
                
                </IonCol>
            </IonRow>
        </IonGrid>
    
            
           
          
    </IonToolbar>
        
  </IonHeader>
  )
}

export default HeaderSub