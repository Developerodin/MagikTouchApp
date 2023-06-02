import { IonButton, IonCol, IonContent, IonDatetime, IonFooter, IonGrid, IonInput, IonPage, IonRow } from '@ionic/react'
import React from 'react'
import { Link } from 'react-router-dom'
import HeaderSub from '../../components/Header/HeaderSub'

const OrderBook = () => {
  return (
    <IonPage>
        <HeaderSub Title={"Product"} />
        <IonContent forceOverscroll={ false }>
            <IonGrid>
                <IonRow>
                    <IonCol size='12'>
                        <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
                        <IonDatetime style={{width:"100%"}} ></IonDatetime>
                        </div>
                    
                    </IonCol>
                
                </IonRow>

                <IonRow style={{marginTop:"30px"}}>
                <IonCol size='6'>
                <IonInput  label="First Name" labelPlacement="floating" fill="outline" ></IonInput>
                </IonCol>

                <IonCol size='6'>
                <IonInput label="Last Name" labelPlacement="floating" fill="outline" ></IonInput>
                </IonCol>

                <IonCol size='6'>
                <IonInput  label="State" labelPlacement="floating" fill="outline" ></IonInput>
                </IonCol>

                <IonCol size='6'>
                <IonInput label="City" labelPlacement="floating" fill="outline" ></IonInput>
                </IonCol>


                <IonCol size='6'>
                <IonInput label="Mobile Number" labelPlacement="floating" fill="outline" ></IonInput>
                </IonCol>
                <IonCol size='6'>
                <IonInput label="House No." labelPlacement="floating" fill="outline" ></IonInput>
                </IonCol>
                <IonCol size='12'>
                <IonInput label="Address" labelPlacement="floating" fill="outline" ></IonInput>
                </IonCol>
                
                <IonCol size='12'>
                <IonInput label="Landmark" labelPlacement="floating" fill="outline" ></IonInput>
                </IonCol>

            </IonRow>
            </IonGrid>
        
        </IonContent>
        <IonFooter >
        {/* <div style={{display:"flex",justifyContent:"space-around",alignAitem:"center",margin:"10px 0px"}}>
        
        
        </div> */}
        <IonGrid>
            <IonRow>
                {/* <IonCol>
                <IonButton  expand="block"   style={{borderRadius:"20px",height:"30px"}} color="danger">Book Now</IonButton>
                </IonCol> */}
                <IonCol>
                  <Link to={"/tabs/explore"} style={{textDecoration:"none"}}>
                  <IonButton expand="full"  fill="outline" color="danger"  style={{height:"30px",border:"1px solid crimson"}}>CHECKOUT</IonButton>
                  </Link>
                
                </IonCol>
            </IonRow>

           
        </IonGrid>
        
    </IonFooter>
    </IonPage>
  )
}

export default OrderBook
