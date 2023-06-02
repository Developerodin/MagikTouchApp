import { IonButton, IonCol, IonContent, IonGrid, IonIcon, IonImg, IonPage, IonRow, IonText } from '@ionic/react'
import { alertCircleOutline, chatbubble } from 'ionicons/icons';
import React, { useState } from 'react'
import ProductFooter from './ProductFooter';
import ProductSwiper from '../../components/ProductDetailComp/ProductSwiper';
import HeaderSub from '../../components/Header/HeaderSub';

const ProductDetail = () => {
    const [Quantity,setQuantity] =useState(0);
  return (
    <IonPage>
        <HeaderSub Title={"Ac Switch Box Installation"}/>
        <IonContent className="explore-bg explore-page"  style={{backgroundColor:"#F1F1F1"}}>
            <IonGrid>
                <IonRow style={{backgroundColor:"#FFF",padding:"5px"}}>
                 <IonCol size='12'>
                   <IonImg src="https://mgktch.com/image/cache/catalog/Products%20(Square)/AC%20Services/AC%20Switch%20Box%20Installation/AC%20Switch%20Box%20Installation%20(1)-100x100.jpg"></IonImg>
                 </IonCol>
                 <IonCol size='12'>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                        <div>
                        <IonText style={{fontSize:"18px",fontWeight:"bold"}}>AC Switch Box Installation</IonText><br/>
                        <IonText style={{fontSize:"18px",fontWeight:"bold"}}>₹329 /</IonText>
                        </div>
                       
                        <div style={{display:"flex",justifyContent:"center",alignItems:"center",marginRight:"20px"}}>
                            <IonButton size='small' style={{height:"20px"}} color="light" disabled={Quantity===0 ? true : false}  onClick={()=>{setQuantity((prev)=>prev-1)}}>-</IonButton>
                            <IonText style={{margin:"0px 5px"}}>{Quantity}</IonText>
                            <IonButton size='small' style={{height:"20px"}} color="light" onClick={()=>{setQuantity((prev)=>prev+1)}}>+</IonButton>
                        </div>
                        
                    </div>

                    <div style={{color:"grey",fontSize:"12px"}}>
                        <div style={{margin:"10px 0px"}}>
                            
                            <IonText>GST @18% inclsive price ₹329</IonText>
                        </div>

                        <div style={{display:"flex",justifyContent:'left',alignItems:"center"}}>
                            
                            <IonText style={{fontSize:"14px",fontWeight:"bold"}}>AVAILABILITY : </IonText>
                            <IonButton size='small' color="success">IN STOCK</IonButton>
                        </div>
                    </div>
                  </IonCol>
                </IonRow>

                

                <IonRow style={{margin:"20px 0px",backgroundColor:"#FFF",padding:"5px"}}>
                    <IonCol>
                        <div style={{margin:"10px 0px"}}>
                        <IonText style={{fontSize:"14px",fontWeight:"bold"}}>About Product</IonText>
                        </div>

                        <div style={{borderTop:"0.5px dashed grey"}}>
                            <IonText style={{fontSize:"12px",color:"grey"}}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima nesciunt quas dignissimos dolorum, alias aliquam natus, minus consectetur quam aperiam esse rerum architecto voluptas vitae odio deserunt hic beatae eum.</IonText>
                        </div>
                        
                    </IonCol>
                </IonRow>

                <IonRow style={{margin:"20px 0px",backgroundColor:"#FFF",padding:"5px"}}>
                    <IonCol>
                       <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                        <div style={{marginRight:"3px"}}>
                            <IonIcon color="success" size='large' icon={alertCircleOutline}></IonIcon>
                        </div>

                        <div>
                            <IonText style={{fontSize:"13px",fontWeight:"bold"}}>WE ARE HERE TO HELP</IonText> <br/>
                            <IonText style={{fontSize:"10px",color:"grey"}}>In case of any enquiries get in touch with us.</IonText>
                        </div>
                       </div>
                    </IonCol>
                    <IonCol size='3'>
                        <IonButton size='small' color="light" >CONTACT</IonButton>
                    </IonCol>
                </IonRow>

                <IonRow style={{margin:"20px 0px",backgroundColor:"#FFF",padding:"5px"}}>
                    <IonCol size='12'>
                        <IonText style={{fontSize:"16px",fontWeight:"bold"}}>You May Also Like</IonText>
                    </IonCol>
                    <IonCol>
                        <ProductSwiper/>
                    </IonCol>
                </IonRow>
            </IonGrid>
        </IonContent>
        <ProductFooter/>
    </IonPage>
  )
}

export default ProductDetail
