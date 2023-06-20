/* eslint-disable react/prop-types */
import { IonBadge, IonCard, IonCol, IonGrid, IonHeader, IonIcon, IonInput, IonItem, IonList, IonRow, IonSearchbar, IonText, IonTitle, IonToolbar } from '@ionic/react'
import { arrowBack, caretBackOutline, cartOutline, searchOutline } from 'ionicons/icons'
import React, { useContext } from 'react'
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { CartContext } from '../../contexts';

const HeaderSub = (props) => {
    const {Title}=props;
    const history=useHistory();
    const { cart } = useContext(CartContext);
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
                        <IonText color="danger" >{Title.slice(0,18)} {Title.length > 10 && "..."}</IonText>
                    </div>
                </IonCol>

                <IonCol size='2' >
                    <Link to={"/cart"} style={{textDecoration:"none"}}>
                    <div style={{display:"flex",justifyContent:"center",alignItems:"center"}} >
                <IonIcon style={{margin:"5px 10px 0px 0px"}} color='dark' size='large' slot="end"   icon={cartOutline}></IonIcon>
                <div style={{position:"absolute",top:"0",margin:"10px 0px 0px 20px"}}>
                <IonBadge style={{borderRadius:"50px"}}  slot="end">{cart && cart.length}</IonBadge>
                </div>
               
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
