import { IonCard, IonCol, IonGrid, IonHeader, IonIcon, IonInput, IonItem, IonList, IonRow, IonSearchbar, IonTitle, IonToolbar } from '@ionic/react'
import { cartOutline, searchOutline } from 'ionicons/icons'
import React from 'react'
import"./Header.scss"

const Header = () => {
  return (

    <IonHeader collapse="fade"  >
      <IonToolbar style={{borderColor:"transparent"}}>
      
              <IonSearchbar style={{marginTop:"7px"}}>
              
              </IonSearchbar>
              <IonIcon style={{marginTop:"10px"}} size='large' slot="end"  icon={cartOutline}></IonIcon>
             
            
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