/* eslint-disable react/prop-types */
import { IonCard, IonCardContent, IonCol, IonGrid, IonIcon, IonRow, IonText } from '@ionic/react';
import { cartOutline, checkboxOutline, timeOutline } from 'ionicons/icons';
import React from 'react'
// import {Browser} from '@capacitor/browser';
const OrderTimeline = ({ histories, statusId }) => {
    const rev_history = [...histories].reverse();
    // const openPdf = (link)=>{
    //      Browser.open({ url: link});
    //   }
  return (
   <IonGrid>
     {
            histories && <IonRow>
       
            <IonCol size='3'>
                <div style={{display:"flex",justifyContent:"center",alignItems:"center",height:"100%"}}>
                    <IonIcon icon={cartOutline} color='danger' style={{fontSize:"54px"}} />
                </div>
            </IonCol>
            <IonCol >
                <IonCard style={{margin:"0px"}}>
                    <IonCardContent>
                        <IonText style={{fontSize:"20px",fontWeight:"bold",color:"black"}}>Order Placed</IonText><br/>
                        <IonText style={{fontSize:"14px"}}> Your Order placed on {" "} <b>{histories[0].date_added.substr(
                  histories[0].date_added.indexOf(",") + 1,
                  13
                )}</b></IonText>
    
                    </IonCardContent>
                </IonCard>
            </IonCol>
         </IonRow>
        }


{histories
        ? rev_history.map((history,index) => {
            if (history.status !== "Complete") {
              return (
               
                    <IonRow key={index}>
       
       <IonCol size='3'>
       <div style={{display:"flex",justifyContent:"center",alignItems:"center",height:"100%"}}>
                    <IonIcon icon={timeOutline} color="warning"  style={{fontSize:"54px"}} />
                </div>
       </IonCol>
       <IonCol>
           <IonCard style={{margin:"0px"}}>
               <IonCardContent>
                   <IonText style={{fontSize:"20px",fontWeight:"bold",color:"black"}}>{history.status}</IonText><br/>
                   <IonText style={{fontSize:"14px"}}> Your Order status was changed to {history.status} on{" "}  <b>
                            {history.date_added.substr(
                              history.date_added.indexOf(",") + 1,
                              13
                            )}
                          </b></IonText>
                          .<hr />{" "}
                          <p
                            dangerouslySetInnerHTML={{
                              __html: history.comment,
                            }}
                          ></p>
                          {history.link && history.link != "" ? (
                            <button 
                            className="btn btn-main btn-primary" 
                            onClick={(e)=>console.log("open pdf")}
                            >
                              View attachment
                            </button>
                          ) : null}

               </IonCardContent>
           </IonCard>
       </IonCol>
                    </IonRow>
                  
              );
            } else {
              return (
               
                    <IonRow key={index}>
       
       <IonCol size='3'>
       <div style={{display:"flex",justifyContent:"center",alignItems:"center",height:"100%"}}>
                    <IonIcon icon={checkboxOutline}  style={{fontSize:"54px"}}  color='success'/>
                </div>
       </IonCol>
       <IonCol>
           <IonCard style={{margin:"0px"}}>
               <IonCardContent>
                   <IonText style={{fontSize:"20px",fontWeight:"bold",color:"black"}}>Completed</IonText><br/>
                   <IonText style={{fontSize:"14px"}}> Your Order status was changed to {history.status} on{" "}  <b>
                            {history.date_added.substr(
                              history.date_added.indexOf(",") + 1,
                              13
                            )}
                          </b></IonText>
                          .<hr />{" "}
                          <p
                            dangerouslySetInnerHTML={{
                              __html: history.comment,
                            }}
                          ></p>
                          {history.link && history.link != "" ? (
                            <button 
                            className="btn btn-main btn-primary" 
                            onClick={(e)=>console.log("open pdf")}
                            >
                              View attachment
                            </button>
                          ) : null}

               </IonCardContent>
           </IonCard>
       </IonCol>
                    </IonRow>
              
              );
            }
          })
        : null}
     
   </IonGrid>
  )
}

export default OrderTimeline
