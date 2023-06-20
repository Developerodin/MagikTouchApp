import { IonButton, IonCard, IonCardContent, IonCol, IonContent, IonGrid, IonIcon, IonItem, IonList, IonPage, IonRow, IonText } from '@ionic/react'
import React, { useContext, useEffect, useState } from 'react'
import { CatalogContext, SessionContext, UserContext } from '../../contexts';
import { useHistory, useParams } from 'react-router';
import { httpService } from '../../services';
import HeaderSub from '../../components/Header/HeaderSub';
import { calendarClearOutline, checkboxOutline, locationOutline, timeOutline } from 'ionicons/icons';
import Loading from '../../components/LoadingComp/Loading';
import OrderTimeline from './OrderTimeline';

const OrderInfo = () => {

    const [order, setOrder] = useState();
    const { sessionId } = useContext(SessionContext);
    const { log } = useContext(UserContext);
    const params = useParams();
    const { getProductFromProductsList, showToast } = useContext(CatalogContext);
    const history =useHistory();

    useEffect(() => {
        const getOrderDetails = async () => {
          try {
            const { data: orderDetails } = await httpService.get(
              httpService.apiEndpointShort + "customerorders/" + params.id,
              { headers: { ...httpService.headers, "X-Oc-Session": sessionId } }
            );
            console.log(orderDetails);
            if (
              orderDetails &&
              "success" in orderDetails &&
              orderDetails.success === 1
            ) {
              setOrder(orderDetails.data);
            } else {
              showToast("error", orderDetails.error[0], "");
            }
          } catch (error) {
            console.log(error);
            if (error.response) {
              showToast("error", error.response.data.error[0], "");
            } else {
              showToast("error", "Unable to fetch your order details!", "");
            }
          }
        };
        console.log("order detail efc called", sessionId, params.status);
        if (sessionId && log === 1) {
          getOrderDetails();
        }
      }, [sessionId, log]);
  return (
    <IonPage>
        <HeaderSub Title={"Order Details"} />
        <IonContent className="explore-bg explore-page"
        forceOverscroll={false}
        style={{ backgroundColor: "#F1F1F1" }}>
            {
 order && log === 1  ?
<div>
<IonCard style={{marginTop:"30px",boxShadow: "rgba(17, 17, 26, 0.05) 0px 1px 0px, rgba(17, 17, 26, 0.1) 0px 0px 8px",borderRadius:"20px"}}>
<IonCardContent>
  <IonGrid>
  <IonRow>
      <IonCol size='7'>
        <div>
          <IonText style={{fontSize:"20px",fontWeight:"bold"}}>Order #{order.order_id}</IonText>
        </div>
        <div style={{marginTop:"6px",fontSize:"14px"}}>
          <IonIcon icon={calendarClearOutline} style={{marginRight:"7px"}} ></IonIcon>
          <IonText>Placed On : <span style={{color:"crimson",fontWeight:"bold",fontSize:"11px"}}>{order.date_added.substr(order.date_added.indexOf(",") + 1, 13)}</span></IonText>
        </div>
      </IonCol>

      <IonCol size='5'>
          <div style={{height:"100%"}}>
              
              
              
              {order.order_status_id === "5" ? (
                 <div style={{display:"flex",justifyContent:"space-around",alignItems:"center"}}>
                  
                    <IonText style={{fontWeight:"bold",color:"#37c55b"}}>{order.histories[order.histories.length - 1].status}</IonText>
                    <IonIcon icon={checkboxOutline}   style={{marginRight:"7px",color:"#37c55b",fontSize:"20px"}} ></IonIcon>
                 </div>
                 
                 
                ) : (
                    <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
                        <IonIcon icon={timeOutline} style={{marginRight:"7px",fontSize:"20px"}} ></IonIcon>
                        <IonText style={{fontWeight:"bold"}}>{order.histories[order.histories.length - 1].status}</IonText>
                    </div>
                    
                )}
              
          </div>

      </IonCol>
  </IonRow>

  <IonRow>
      <IonCol>
        
          <IonText style={{fontSize:"14px",fontWeight:"bold",color:"crimson"}}> Customer Info </IonText><br/>
          <IonText style={{fontSize:"14px"}}>{order.shipping_address_1}, {order.shipping_city},{" "}
      {order.shipping_zone},<br/> {order.shipping_country}  ,{" "}
       {order.shipping_postcode}</IonText><br/>
       {order.telephone}
      </IonCol>
  </IonRow>


 
  </IonGrid>
</IonCardContent>
</IonCard>


<IonCard>
    <IonCardContent>
        <div>
            <IonText style={{fonts:"14px",fontWeight:"bold",color:"crimson"}}>Order Product Info</IonText>
        </div>
        <table className="table color-theme mb-2" style={{width:"100%",marginTop:"20px"}}>
                      <thead style={{borderBottom:"1px solid red"}}>
                        <tr>
                          <th className="border-fade-blue" scope="col" >
                            Product
                          </th>
                          <th className="border-fade-blue" scope="col">
                            Qty
                          </th>
                          <th
                            className="border-fade-blue text-center"
                            scope="col"
                          >
                            Total
                          </th>
                        </tr>
                      </thead>
                      <br/>
                      <tbody>
                        {order.products.map((product, index) => {
                          return (
                            <tr key={index} className="border-fade-blue"  >
                              <td style={{display:"flex",justifyContent:"space-evenly",alignItems:"center"}}>
                                <img
                                style={{width:"40px",height:"40px"}}
                                  src={
                                    getProductFromProductsList(
                                      product.product_id
                                    ) &&
                                    getProductFromProductsList(
                                      product.product_id
                                    ).image
                                  }
                                  alt=""
                                  className="img-order-info"
                                />
                                <IonText>{product.name}{" "}</IonText> 
                              </td>
                              <td style={{textAlign:"center"}}>{product.quantity}</td>
                              <td style={{textAlign:"center"}} className="text-center">{product.price}</td>
                              <br/>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
    </IonCardContent>
</IonCard>

<IonCard>
    <IonCardContent>
        <div>
            <IonText style={{fonts:"14px",fontWeight:"bold",color:"crimson"}}>Order Total Info</IonText>
        </div>

        <IonList style={{fontSize:"14px",fontWeight:"bold"}}>
        {
         order.totals.map((total, index) => { 
    return (
            <IonItem key={index} lines={total.title === "Total" ? "none" : "true"}>
             <div style={{width:"100%",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
             <IonText style={{color:`${total.title === "Total" ? "crimson" : "black"}`}}>{total.title}</IonText>
             <IonText>₹{parseFloat(total.value).toFixed(2)}</IonText>
              </div>
    </IonItem>
    )
    })
        } 
         
            
          
        </IonList>
    </IonCardContent>
</IonCard>

<OrderTimeline histories={order.histories}
              statusId={order.order_status_id} />
</div>
:
<Loading/>
            }
      
        </IonContent>
    </IonPage>
  )
}

export default OrderInfo
