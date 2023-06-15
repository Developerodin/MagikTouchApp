import { IonButton, IonCard, IonCardContent, IonCol, IonContent, IonGrid, IonIcon, IonModal, IonPage, IonRow, IonText } from '@ionic/react'
import React, { useContext, useEffect, useState } from 'react'
import HeaderSub from '../../../components/Header/HeaderSub'
import "./ProfileTabs.scss"
import { pencilOutline, trashOutline } from 'ionicons/icons'
import AddressCard from '../../../components/AddressComp/AddressCard'
import { CatalogContext, SessionContext, UserContext } from '../../../contexts'
import { useHistory } from 'react-router'
import { httpService } from '../../../services'
import EmptyAddress from '../../OrderBook/EmptyAddress'
const ManageAddress = () => {
  const { log,UserAddress, setUserAddress,EditedAddress } = useContext(UserContext);
  const [addresses, setAddresses] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const { sessionId } = useContext(SessionContext);
  const [buttonsDisabled, setButtonsDisabled] = useState(false);
  
  const { showToast } = useContext(CatalogContext);
const history =useHistory();
  const handelAddAddress=()=>{
    history.push("/add-address")
  }
  useEffect(() => {
    if (log === 0) {
      // navigate("/");
      console.log("navigate to /",log)
    }
    const getAllAddresses = async () => {
      try {
        const {
          data: { data: allAddresses },
        } = await httpService.get(
          httpService.apiEndpointLong +"rest/account/address" ,
          { headers: { ...httpService.headers, "X-Oc-Session": sessionId } }
        );
        console.log("allAddresses",allAddresses);
        if (allAddresses && allAddresses.length != 0) {
          setAddresses(allAddresses.addresses);
        } else {
          setAddresses([]);
        }
      } catch (error) {
        console.log(error);
        if (error.response) {
          showToast("error", error.response.data.error[0], "");
        } else {
          showToast("error", "Unable to fetch your addresses!", "");
        }
      }
    };
    console.log("efc called", sessionId);
    if (sessionId && log === 1) {
      getAllAddresses();
    }
  }, [sessionId, log,EditedAddress,UserAddress]);
  const deleteAddress = async (address_id) => {
    setButtonsDisabled(true);

    try {
      let response = await httpService.delete(
        httpService.apiEndpointLong + "rest/account/address&id=" + address_id,
        { headers: { ...httpService.headers, "X-Oc-Session": sessionId } }
      );
      response = response.data;
      console.log("edit address-", response);
      if (
        response &&
        "success" in response &&
        response.success === 1 &&
        "error" in response &&
        response.error.length === 0
      ) {
        const getAllAddresses = async () => {
          try {
            const {
              data: { data: allAddresses },
            } = await httpService.get(
              httpService.apiEndpointLong + "rest/account/address",
              { headers: { ...httpService.headers, "X-Oc-Session": sessionId } }
            );
            console.log(allAddresses);
            if (allAddresses && allAddresses.addresses) {
              setAddresses(allAddresses.addresses);
            } else {
              setAddresses([]);
            }
          } catch (error) {
            console.log(error);
            if (error.response) {
              showToast("error", error.response.data.error[0], "");
            } else {
              showToast("error", "Unable to fetch your addresses!", "");
            }
          }
        };

        await getAllAddresses();

        console.log("address deleted");
        showToast("success", "Address deleted successfully!", "");
        setButtonsDisabled(false);
      } else if (
        response &&
        "success" in response &&
        response.success !== 1 &&
        "error" in response &&
        response.error.length !== 0
      ) {
        console.log(
          "delete address unsucessful due to errors!",
          response.error[0]
        );
        showToast("error", response.error[0], "");
        setButtonsDisabled(false);
      } else {
        console.log("delete address unsucessful due to unknown!");
        showToast("error", "Something went wrong!", "");
        setButtonsDisabled(false);
      }
    } catch (error) {
      console.log("error", error);
      setButtonsDisabled(false);
      const expectedError =
        error.response &&
        error.response.status >= 400 &&
        error.response.status < 500;

      if (expectedError) {
        showToast("error", error.response.data.error[0], "");
        console.log("delete address failed!", error.response);
      } else {
        showToast("error", "Something went wrong!", "");
        console.log("delete address failed!", error);
      }
    }
  };
  return (
    <IonPage>
      <HeaderSub Title="Adderss Book"/>
<IonContent
className="explore-bg explore-page"
forceOverscroll={false}
style={{ backgroundColor: "#F1F1F1" }}>


{/* <div style={{display:"flex",justifyContent:"flex-end",margin:"20px 10px 0px 0px"}}>
  <IonButton shape='round' onClick={handelAddAddress} style={{width:"40%"}}>+ Add Address</IonButton>
</div> */}


{log === 1 ? (
        <div className="p-10 mt-55">
          <div className="row">
            <div className="col-12">
              {addresses ? (
                addresses.length !== 0 ? (
                  <>
                    <div className="row" style={{margin:"20px 0px"}}>
                      <div style={{display:"flex",justifyContent:"end",alignItem:"center"}}>
                        <IonButton onClick={handelAddAddress} shape='round' style={{width:"40%"}}>+ Add Address</IonButton>
                       </div>
                    </div>
                    {addresses.map((address) => {
                      return (
                        <AddressCard
                          key={address.address_id}
                          address={address}
                          deleteAddress={deleteAddress}
                        />
                      );
                    })}
                  </>
                ) : (
                  <EmptyAddress />
                )
              ) : (
               
                <h1>Loading...</h1>
              )}
            </div>
          </div>
        </div>
      ) : (
        <h1>Loading...</h1>
      )}



</IonContent>
    </IonPage>
   
  )
}

export default ManageAddress
