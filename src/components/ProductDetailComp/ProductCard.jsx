import { IonButton, IonCard, IonCardContent, IonCol, IonGrid, IonImg, IonRow, IonText } from '@ionic/react'
import React from 'react'

const ProductCard = () => {
  return (
    <IonCard style={{padding:"0px",height:"350px",width:"200px"}}>
        <IonCardContent style={{padding:"0px",margin:"0px"}}>
            <IonGrid>
                <IonRow style={{height:"26vh"}}>
                    <IonCol>
                        
                        <div style={{display:"flex",justifyContent:"center",alignItems:"center",height:"100%"}}> 
                        <IonImg style={{height:"100%"}} src="https://mgktch.com/image/catalog/Products%20(Square)/AC%20Services/AC%20Switch%20Box%20Installation/AC%20Switch%20Box%20Installation%20(1).jpg"></IonImg>
                        </div>

                        <div style={{position:"absolute",top:'0',margin:"-2px 0px 0px -10px"}}>
                            <IonButton color="danger" size='small' style={{borderRadius:"0px"}}>Trending Now</IonButton>
                        </div>
                   
                    </IonCol>
                
                </IonRow>

                <IonRow>
                    <IonCol>
                        <div style={{textAlign:"left"}}>
                        <div >
                        <IonText style={{fontSize:"13px",fontWeight:"bold"}}>Decorative celling fan install</IonText>
                        </div>

                        <div style={{marginTop:"5px"}}>
                            <IonText style={{fontSize:"12px",fontWeight:"bold"}}>Trending now</IonText>
                        </div>
                        <div style={{marginTop:"5px"}}>
                        ₹429 
                        </div>
                        </div>
                        
                   
                    </IonCol>
                    
                </IonRow>
            </IonGrid>
            
        </IonCardContent>
    </IonCard>
  )
}

export default ProductCard
