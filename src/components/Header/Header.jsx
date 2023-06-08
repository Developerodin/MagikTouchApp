import { IonBadge, IonCard, IonCol, IonGrid, IonHeader, IonIcon, IonInput, IonItem, IonList, IonRow, IonSearchbar, IonTitle, IonToolbar } from '@ionic/react'
import { cartOutline, searchOutline } from 'ionicons/icons'
import React, { useContext } from 'react'
import"./Header.scss"
import { Link } from 'react-router-dom'
import { CartContext } from '../../contexts'

const Header = () => {
  const { cart } = useContext(CartContext);
  return (

    <IonHeader collapse="fade"  >
      <IonToolbar style={{borderColor:"transparent"}}>
      
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
      <IonSearchbar style={{marginTop:"7px",width:"90%"}}>
              
              </IonSearchbar>
              <Link to={"/cart"} style={{textDecoration:"none"}}>
                <div >
                <IonIcon style={{margin:"10px 10px 0px 0px"}} color='dark' size='large' slot="end"   icon={cartOutline}></IonIcon>
                <div style={{position:"absolute",top:"0",right:"0",marginTop:"10px"}}>
                <IonBadge style={{borderRadius:"50px"}}  slot="end">{cart && cart.length}</IonBadge>
                </div>
               
                </div>
              
              </Link>
      </div>
              
              
             
            
      </IonToolbar>
          
    </IonHeader>
  
  )
}

export default Header

{/* // <IonHeader translucent={true} style={{padding:"0px",marginTop:"20px"}}>
    //         <IonList style={{borderRadius:"40px",height:"50px",boxShadow: "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px"}}>
    //           <IonItem>
    //           <IonIcon  icon={searchOutline} slot='start'></IonIcon>
    //             <IonInput placeholder='Search for services'>
                
    //             </IonInput>
    //             <IonIcon  slot="end"  icon={cartOutline}></IonIcon>
    //           </IonItem>
    //         </IonList>
    
            
            
       
           
       
        
    // </IonHeader> */}