import { IonButton, IonCol, IonContent, IonGrid, IonIcon, IonImg, IonPage, IonRow, IonText } from '@ionic/react'
import { bagAddOutline, starOutline } from 'ionicons/icons'
import React from 'react'
import CategoryCard from '../../components/CategoryComp/CategoryCard'
import './Category.scss';
import HeaderSub from '../../components/Header/HeaderSub';
const Category = () => {
   const Data=[
        {},{},{},{},{}
    ]
  return (
    <IonPage>
        <HeaderSub Title={"Category"}/>
        <IonContent className="explore-bg explore-page" forceOverscroll={ false } style={{backgroundColor:"#F1F1F1"}}>
            <IonGrid>
                <IonRow>
                  <IonCol size='12'>
                  <IonImg src='https://mgktch.com/image/cache/catalog/Service%20Categories/Air%20Conditioner%20Repair-100x100.jpg' alt='Image'></IonImg>
                  </IonCol>
                  <IonCol size='12'>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                        <IonText style={{fontSize:"22px",fontWeight:"bold"}}>AC Services</IonText>
                        <IonButton size='small'>MTS VERIFIED</IonButton>
                    </div>

                    <div style={{color:"grey",fontSize:"14px"}}>
                        <div style={{margin:"10px 0px"}}>
                            <IonIcon style={{marginRight:"7px"}}color="warning" icon={starOutline}></IonIcon>
                            <IonText>4.5 (5k Ratings)</IonText>
                        </div>

                        <div>
                            <IonIcon style={{marginRight:"7px"}} icon={bagAddOutline}></IonIcon>
                            <IonText>123 Booking done in Surya Nagar</IonText>
                        </div>
                    </div>
                  </IonCol>
                </IonRow>

                <IonRow>
                    {
                        Data.map((el,index)=>{
                            return  <IonCol  key={index} size='12'>
                            <CategoryCard/>
                            </IonCol>
                        })
                    }
                   
                    
                </IonRow>
            </IonGrid>
        
        
        </IonContent>
    </IonPage>
  )
}

export default Category
