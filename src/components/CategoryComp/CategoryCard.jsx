import { IonButton, IonCard, IonCardContent, IonCol, IonGrid, IonIcon, IonImg, IonRow, IonText } from '@ionic/react'
import { addCircleOutline, starOutline, timeOutline } from 'ionicons/icons'
import React from 'react'
import { Link } from 'react-router-dom'

const CategoryCard = () => {
  return (
    <IonCard style={{width:"100%",margin:"10px 0px",padding:"0px"}}>
     <IonCardContent style={{padding:"3px"}}>
        <IonGrid>
            <IonRow>
                <IonCol size='8'>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                        <IonText style={{fontSize:"22px",fontWeight:"bold"}}>AC Switch Box Installation</IonText>
                        
                    </div>

                    <div style={{color:"grey",fontSize:"14px"}}>
                        <div style={{margin:"10px 0px"}}>
                            <IonIcon style={{marginRight:"7px"}}color="warning" icon={starOutline}></IonIcon>
                            <IonText>0 (0 Ratings)</IonText>
                        </div>

                        <div>
                            <IonText style={{marginRight:"7px"}}>₹329 | </IonText>
                            <IonIcon style={{marginRight:"7px"}}color="warning" icon={timeOutline}></IonIcon>
                            <IonText>45 Min</IonText>
                        </div>
                    </div>
                    <div style={{borderTop:"0.5px dashed grey",marginTop:"10px"}}>
                        <div style={{fontSize:"12px",marginTop:"10px"}}>
                        <IonText >
                           {"Lorem ipsum dolor, sit amet consectetur adipisicing elit. Veritatis velit deserunt iusto obcaecati, laborum nemo quam eos aspernatur at similique vel suscipit sint dignissimos reiciendis dolor optio quia ex consequatur.".slice(0,40)}...
                        </IonText>
                        </div>
                       
                   
                        <div style={{marginTop:"10px"}}>
                        <Link to="/product-detail/:2" style={{color:"#21e3f1"}}>
                            <IonText>View Details</IonText>
                        </Link>
                        </div>
                        
                       
                    </div>
                </IonCol>

                <IonCol size="4" >
                    <div style={{display:"flex",justifyContent:"center",alignItems:"center",height:"100%"}}>
                    <IonImg src="https://mgktch.com/image/catalog/Products%20(Square)/AC%20Services/AC%20Switch%20Box%20Installation/AC%20Switch%20Box%20Installation%20(1).jpg" alt='img'></IonImg>
                    
                    </div>
                    <div style={{position:"absolute",top:"139px"}}>
                       
                        <IonButton color="light" style={{fontSize:"12px",height:"31px",width:"64px",fontWeight:"bold"}}><IonIcon size='small'  icon={addCircleOutline}></IonIcon>ADD</IonButton>
                        
                    </div>
                    
                </IonCol>
            </IonRow>
        </IonGrid>
     </IonCardContent>
    </IonCard>
  )
}

export default CategoryCard