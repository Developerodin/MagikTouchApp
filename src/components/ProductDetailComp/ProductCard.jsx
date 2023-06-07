/* eslint-disable react/prop-types */
import { IonButton, IonCard, IonCardContent, IonCol, IonGrid, IonImg, IonRow, IonText } from '@ionic/react'
import React from 'react'
import { Link } from 'react-router-dom'

const ProductCard = ({Data}) => {
  return (
    <IonCard style={{padding:"0px",height:"350px",width:"200px"}}>
        <IonCardContent style={{padding:"0px",margin:"0px"}}>
        <Link to={{pathname:`/product-detail/${Data.product_id}`,state:Data}} style={{textDecoration:"none"}}>
        <IonGrid>
                <IonRow style={{height:"26vh"}}>
                    <IonCol>
                        
                        <div style={{display:"flex",justifyContent:"center",alignItems:"center",height:"100%"}}> 
                        <IonImg style={{height:"100%"}} src={Data.thumb}></IonImg>
                        </div>

                        <div style={{position:"absolute",top:'0',margin:"-2px 0px 0px -10px"}}>
                            <IonButton color="danger" size='small' style={{borderRadius:"0px"}}>Trending Now</IonButton>
                        </div>
                   
                    </IonCol>
                
                </IonRow>

                <IonRow>
                    <IonCol>
                        <div style={{textAlign:"left",color:"grey"}}>
                        <div >
                        <IonText style={{fontSize:"13px",fontWeight:"bold"}}>{Data.name}</IonText>
                        </div>

                        <div style={{marginTop:"5px"}}>
                            <IonText style={{fontSize:"12px",fontWeight:"bold"}}>Trending now</IonText>
                        </div>
                        <div style={{marginTop:"5px"}}>
                        ₹{Data.price}
                        </div>
                        </div>
                        
                   
                    </IonCol>
                    
                </IonRow>
            </IonGrid>
        </Link>
            
            
        </IonCardContent>
    </IonCard>
  )
}

export default ProductCard
