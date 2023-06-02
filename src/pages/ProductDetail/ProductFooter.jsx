import { IonButton, IonCol, IonFooter, IonGrid, IonRow } from '@ionic/react'
import React from 'react'
import { Link } from 'react-router-dom'

const ProductFooter = () => {
  return (
    <IonFooter >
        {/* <div style={{display:"flex",justifyContent:"space-around",alignAitem:"center",margin:"10px 0px"}}>
        
        
        </div> */}
        <IonGrid>
            <IonRow>
                {/* <IonCol>
                <IonButton  expand="block"   style={{borderRadius:"20px",height:"30px"}} color="danger">Book Now</IonButton>
                </IonCol> */}
                <IonCol>
                  <Link to={"/book"} style={{textDecoration:"none"}}>
                  <IonButton expand="full"  fill="outline" color="danger"  style={{height:"30px",border:"1px solid crimson"}}>BOOK NOW</IonButton>
                  </Link>
                
                </IonCol>
            </IonRow>
        </IonGrid>
        
    </IonFooter>
  )
}

export default ProductFooter
