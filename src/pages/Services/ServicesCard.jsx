/* eslint-disable react/prop-types */
import { IonCard, IonCardContent, IonCol, IonGrid, IonIcon, IonImg, IonRow, IonText } from '@ionic/react'
import { arrowForwardCircleOutline } from 'ionicons/icons'
import React from 'react'

const ServicesCard= ({Data}) => {
  // const {Data}=props
  return (
    <IonCard style={{padding:"0px",margin:"10px"}}>
      <IonCardContent style={{padding:"0px",margin:"0px"}}>
        <IonGrid >
          <IonRow>
            <IonCol size="4">
              <IonImg src={Data.original_image}></IonImg>
            </IonCol>

            <IonCol size="8" style={{marginTop:"15px"}}>
              <div style={{fontSize:"20px",fontWeight:"bold"}}>
              <IonText>{Data.name}</IonText>
              </div>
                  
                <div style={{fontSize:"13px",color:"grey"}}>
                <IonText >
                {"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cum perferendis natus veritatis, ad atque molestias ex, officiis sit quasi, mollitia eos explicabo reprehenderit ab minima voluptatem assumenda dolor soluta veniam"
                .slice(0, 60)}
                  
                  ... </IonText>
                </div>

                <div style={{display:"flex",justifyContent:"flex-end"}}>
                  <IonIcon size='large' color='primary'  icon={arrowForwardCircleOutline}></IonIcon>
                </div>
                  

            </IonCol>
          </IonRow>
        </IonGrid>
      </IonCardContent>
    </IonCard>
  )
}

export default ServicesCard

