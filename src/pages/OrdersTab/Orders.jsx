import { IonContent, IonLabel, IonPage, IonSegment, IonSegmentButton, IonText, IonToolbar } from '@ionic/react'
import React, { useContext, useEffect, useState } from 'react'
import HeaderSub from '../../components/Header/HeaderSub'
import { CatalogContext, SessionContext, UserContext } from '../../contexts';
import { useHistory, useParams } from 'react-router';
import { httpService } from '../../services';
import CompletedOrders from './CompletedOrders';
import PendingOrders from './PendingOrders';

const Orders = () => {
  const [orders, setOrders] = useState();

  const { sessionId } = useContext(SessionContext);

  const { orderStatuses, showToast } = useContext(CatalogContext);

  const { log } = useContext(UserContext);

  const [buttonsDisabled, setButtonsDisabled] = useState(false);
  const [selectedTab, setSelectedTab] = useState('CompletedOrders');

  const params = useParams();

  const history=useHistory();
  useEffect(() => {
    const getAllOrders = async () => {
      try {
        const {
          data: { data: allOrders },
        } = await httpService.get(
          httpService.apiEndpointShort + "customerorders",
          { headers: { ...httpService.headers, "X-Oc-Session": sessionId } }
        );
        console.log(allOrders);
        setOrders(allOrders);
      } catch (error) {
        console.log(error);
        if (error.response) {
          showToast("error", error.response.data.error[0], "");
        } else {
          showToast("error", "Unable to fetch your orders!", "");
        }
      }
    };
    console.log("order efc called", sessionId, params.status);
    if (sessionId && log === 1) {
      getAllOrders();
    } else if (log === 0) {
      // navigate("/login");
      history.push("/login");
    }
  }, [sessionId, log]);
  const renderComponent = () => {
    switch (selectedTab) {
      case 'CompletedOrders':
        return <CompletedOrders
        orders={orders.filter(
          (order) =>
            Number(
              orderStatuses[
                order.status.replace(/[^A-Z0-9]/gi, "").toLowerCase()
              ]
            ) === 5
        )}
      />;
      case 'PendingOrders':
        return <PendingOrders
        orders={orders.filter(
          (order) =>
            Number(
              orderStatuses[
                order.status.replace(/[^A-Z0-9]/gi, "").toLowerCase()
              ]
            ) !== 5
        )}
      />;
      
      default:
        return null;
    }
  };
  return (
    <IonPage>
      <HeaderSub Title={"Orders"} />
        <IonContent className="explore-bg explore-page"
        forceOverscroll={false}
        style={{ backgroundColor: "#F1F1F1" }}>
        {/* <div>
      {orders && orderStatuses ? (
       
         <div>
       


           <div>
            <IonToolbar>
        <IonSegment  value={selectedTab} onIonChange={(e) => setSelectedTab(e.detail.value)}>
          <IonSegmentButton value="CompletedOrders" >
            <IonLabel style={{color:"#2D3F65",fontSize:"15px",fontWeight:"500"}} >Completed Orders</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="PendingOrders" >
            <IonLabel style={{color:"#2D3F65",fontSize:"15px",fontWeight:"500"}} >Pending Orders</IonLabel>
          </IonSegmentButton>
         
        </IonSegment>
      </IonToolbar>
            </div>

          <div style={{marginTop:"10px",width:"95%",margin:"auto"}}>

            {
                renderComponent()
            }
            
          </div>
              </div>
         
      ) : (
       
        <h1>Loding</h1>
      )}

      
    </div> */}
    <PendingOrders/>
        </IonContent>
     
    </IonPage>
  )
}

export default Orders
