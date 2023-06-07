/* eslint-disable react/prop-types */
import { IonCard, IonCol, IonGrid, IonHeader, IonIcon, IonInput, IonItem, IonList, IonRow, IonSearchbar, IonText, IonTitle, IonToolbar } from '@ionic/react'
import { arrowBack, caretBackOutline, cartOutline, searchOutline } from 'ionicons/icons'
import React from 'react'
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';

const HeaderSub = (props) => {
    const {Title}=props;
    const history=useHistory();
    const handelBack=()=>{
        history.goBack();
    }
    const handelHome=()=>{
        history.replace("/")
    }
  return (
    <IonHeader collapse="fade"  >
    <IonToolbar style={{borderColor:"transparent"}}>
        <IonGrid>
            <IonRow>
                <IonCol size='2' onClick={handelHome}>
                <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
                <img style={{height:"40px",width:"40px"}} src="assets/images/logo.png" alt="logo"/>
                </div>
                    
                </IonCol>

                <IonCol size='8' >
                    <div onClick={handelBack} style={{display:"flex",justifyContent:"center",alignItems:"center",fontSize:"17px",fontWeight:"bold",height:"100%"}}>
                        <IonIcon style={{marginRight:"10px"}}  color="danger" icon={caretBackOutline}></IonIcon>
                        <IonText color="danger" >{Title.slice(0,18)}...</IonText>
                    </div>
                </IonCol>

                <IonCol size='2' >
                    <Link to={"/cart"} style={{textDecoration:"none"}}>
                    <div style={{display:"flex",justifyContent:"center",alignItems:"center",height:"100%"}}>
                    <IonIcon  size='large' color='dark' icon={cartOutline}></IonIcon>
                    </div>
                    </Link>
                   
                
                </IonCol>
            </IonRow>
        </IonGrid>
    
            
           
          
    </IonToolbar>
        
  </IonHeader>
  )
}

export default HeaderSub
