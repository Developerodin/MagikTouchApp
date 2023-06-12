import { IonButton, IonCard, IonCardContent, IonCol, IonContent, IonDatetime, IonFooter, IonGrid, IonIcon, IonInput, IonPage, IonRow, IonText } from '@ionic/react'
import React, { useContext } from 'react'
import { Link, useHistory } from 'react-router-dom'
import HeaderSub from '../../components/Header/HeaderSub'
import { pencilOutline, trashOutline } from 'ionicons/icons'
import { httpService } from '../../services'
import { CatalogContext, SessionContext, UserContext } from '../../contexts'
import AddressCard from '../../components/AddressComp/AddressCard'

const OrderBook = () => {
    const { sessionId } = useContext(SessionContext);
    const { showToast } = useContext(CatalogContext);
    const { log,UserAddress, setUserAddress } = useContext(UserContext);
    const history = useHistory();
    const placeOrder = () => {
        const orderPlacer = async () => {
          try {
            let response = await httpService.put(
              httpService.apiEndpoint + "confirm",
              {},
              { headers: { ...httpService.headers, "X-Oc-Session": sessionId } }
            );
            response = response.data;
            console.log("order place response-", response);
            if (
              response &&
              "success" in response &&
              response.success === 1 &&
              "error" in response &&
              response.error.length === 0
            ) {
              console.log("order successfullycreated!");
             
    
              showToast("success", "Order placed successfully!", "");
            //   navigate("/OrderSuccess");
            console.log("Order placed successfully")
            //   emptyCart();
            } else if (
              response &&
              "success" in response &&
              response.success !== 1 &&
              "error" in response &&
              response.error.length !== 0
            ) {
              console.log(
                "order place unsucessful due to errors!",
                response.error[0]
              );
              showToast("error", response.error[0], "");
            //   setButtonsDisabled(false);
            } else {
              console.log("order place unsucessful due to unknown!");
              showToast("error", "Something went wrong!", "");
            //   setButtonsDisabled(false);
            }
          } catch (error) {
            console.log("error", error);
            // setButtonsDisabled(false);
            const expectedError =
              error.response &&
              error.response.status >= 400 &&
              error.response.status < 500;
    
            if (expectedError) {
              showToast("error", error.response.data.error[0], "");
              console.log("order pace failed", error.response);
            } else {
              showToast("error", "Something went wrong!", "");
              console.log("order place failed", error);
            }
          }
        };
        // setButtonsDisabled(true);
        orderPlacer();
        history.push("/")
      };

      const handelAddAddress=()=>{
        history.push("/add-address")
      }
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

                {/* <IonRow style={{marginTop:"30px"}}>
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

            </IonRow> */}

            <IonRow style={{marginTop:"30px"}}>
                <IonCol size='12'>
                <div style={{display:"flex",justifyContent:"flex-end",margin:"20px 10px 0px 0px"}}>
                <IonButton onClick={handelAddAddress} shape='round' style={{width:"40%"}}>+ Add Address</IonButton>
               </div>
                </IonCol>


                <IonCol size='12'>
                    {UserAddress !== null &&  <AddressCard Data={UserAddress} />}
                      
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
                  
                  <IonButton expand="full"  fill="outline" color="danger" onClick={placeOrder}  style={{height:"30px",border:"1px solid crimson"}}>Book</IonButton>
               
                
                </IonCol>
            </IonRow>

           
        </IonGrid>
        
    </IonFooter>
    </IonPage>
  )
}

export default OrderBook
