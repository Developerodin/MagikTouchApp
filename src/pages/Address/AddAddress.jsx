import { IonButton, IonContent, IonIcon, IonItem, IonList, IonPage, IonSelect, IonSelectOption, IonText } from '@ionic/react'
import { buildOutline, buildSharp, businessOutline, locateOutline, locationOutline, personCircleOutline, podiumOutline, pricetagOutline, tabletLandscapeOutline } from 'ionicons/icons'
import React, { useContext, useEffect, useState } from 'react'
import { CatalogContext, SessionContext, UserContext } from '../../contexts';
import { httpService } from '../../services';
import HeaderSub from '../../components/Header/HeaderSub';
import "./AddAddress.scss"
import { useHistory } from 'react-router';
const AddAddress = () => {
    const [newAddress, setNewAddress] = useState({
        firstname: "",
        lastname: "",
        city: "",
        address_1: "",
        address_2: "",
        country_id: "",
        postcode: "",
        zone_id: "",
        company: "",
        default: false,
      });
      const { sessionId } = useContext(SessionContext);
      const { log,UserAddress, setUserAddress } = useContext(UserContext);
      const [countries, setCountries] = useState([]);
      const [zones, setZones] = useState([]);
      const [buttonsDisabled, setButtonsDisabled] = useState(false);
      const { showToast } = useContext(CatalogContext);
      const [Selectedcountrie, setSelectedcountrie] = useState('');
      const history=useHistory();
      useEffect(() => {
        const getAllCountries = async () => {
          try {
            const {
              data: { data: countriesData },
            } = await httpService.get(httpService.apiEndpoint + "countries", {
              headers: httpService.headers,
            });
            console.log("countriesData",countriesData);
            setCountries(
              countriesData.map((country, index) => {
                return {
                  value: country.country_id.toString(),
                  label: country.name,
                };
              })
            );
          } catch (error) {
            console.log(error);
          }
        };
    
        console.log("efc called", sessionId);
        if ((sessionId, log)) {
            console.log("calling getAllCountries")
          getAllCountries();
        }
      }, [sessionId]);

      useEffect(()=>{
        console.log("Selected Countory",Selectedcountrie)
      },[Selectedcountrie]);

      const handleCountryChange = async (e, obj, setObj) => {
       const Arry1=countries.filter(function (option) {
            return e.detail.value === option.label;
          })

        const form = { ...obj };
        form.country_id = Arry1[0].value;
        form.zone_id = null;
        try {
            console.log("Inside zhone",Arry1)
          const {
            data: {
              data: { zone: countriesZones },
            },
          } = await httpService.get(
            httpService.apiEndpoint + "countries/" + Arry1[0].value,
            { headers: httpService.headers }
          );
          console.log("countriesZones===>",countriesZones);
          setZones(
            countriesZones.map((zone, index) => {
              return { value: zone.zone_id, label: zone.name };
            })
          );
          setObj(form);
        } catch (error) {
          console.log("zone select error", error);
        }
      };

      const handleZoneChange = async (e, obj, setObj) => {
        const form = { ...obj };
        console.log(e);
        form.zone_id = e.value;
        setObj(form);
      };
    
      const handleChange = (e, obj, setObj) => {
        const form = { ...obj };
        form[e.target.name] = e.target.value;
        setObj(form);
      };

      const addNewAddress = async () => {
        setButtonsDisabled(true);
        const keys = Object.keys(newAddress);
        let check = true;
        for (let i = 0; i < keys.length; i++) {
          if (newAddress[keys[i]] === "" || newAddress[keys[i]] === null) {
            showToast("error", `${keys[i]} is required!`, "");
            check = false;
            setButtonsDisabled(false);
            return false;
          }
        }
        if (check) {
          try {
            let response = await httpService.post(
              httpService.apiEndpoint + "account/address",
              newAddress,
              { headers: { ...httpService.headers, "X-Oc-Session": sessionId } }
            );
            response = response.data;
            console.log("create user response-", response);
            if (
              response &&
              "success" in response &&
              response.success === 1 &&
              "error" in response &&
              response.error.length === 0
            ) {
              console.log("new address added");
              showToast("success", "New Address Added successfully!", "");
              setZones([]);
              setNewAddress({
                firstname: "",
                lastname: "",
                city: "",
                address_1: "",
                address_2: "",
                country_id: "",
                postcode: "",
                zone_id: "",
                company: "",
              });
            //   navigate(-1);
              console.log("navigate -1")
            } else if (
              response &&
              "success" in response &&
              response.success !== 1 &&
              "error" in response &&
              response.error.length !== 0
            ) {
              console.log(
                "add new address unsucessful due to errors!",
                response.error[0]
              );
              showToast("error", response.error[0], "");
              setButtonsDisabled(false);
            } else {
              console.log("add address unsucessful due to unknown!");
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
              console.log("address add failed!", error.response);
            } else {
              showToast("error", "Something went wrong!", "");
              console.log("address add failed!", error);
            }
            setButtonsDisabled(false);
          }
        }
      };
      const addNewAddressCheck=()=>{
           console.log("ADDRESS CHECK",newAddress)
           localStorage.setItem("userAddress",JSON.stringify(newAddress));
           setUserAddress(newAddress);
           history.goBack();

      }

  return (
    <IonPage>
        <HeaderSub Title={"Add Address"} />
        <IonContent>
        <IonList>
     <IonItem  lines="none" style={{border:"0.5px solid grey",borderRadius:"10px",margin:"15px 10px"}}>
     <IonIcon slot="start" size="small" icon={personCircleOutline}></IonIcon>
     <input
     className="custom-input"
    
     placeholder="First Name"
    onChange={(e) => handleChange(e, newAddress, setNewAddress)}
    value={newAddress.firstname}
    name="firstname"
  
     >
     
 </input>
 <IonText style={{color:"grey",fontSize:"11px"}} slot="end">(required)</IonText>
     </IonItem>

     <IonItem  lines="none" style={{border:"0.5px solid grey",borderRadius:"10px",margin:"15px 10px"}}>
     <IonIcon slot="start" size="small" icon={personCircleOutline}></IonIcon>
     <input
     type="text"
     className="custom-input"
     id="c1"
     placeholder="Last Name"
     onChange={(e) => handleChange(e, newAddress, setNewAddress)}
     value={newAddress.lastname}
     name="lastname"
   />
  
   
 <IonText style={{color:"grey",fontSize:"11px"}} slot="end">(required)</IonText>
     </IonItem>

     <IonItem  lines="none" style={{border:"0.5px solid grey",borderRadius:"10px",margin:"15px 10px"}}>
     <IonIcon slot="start" size="small" icon={podiumOutline}></IonIcon>
     <input
                    type="text"
                    className="custom-input"
                    id="c1"
                    placeholder="Company Name"
                    onChange={(e) => handleChange(e, newAddress, setNewAddress)}
                    value={newAddress.company}
                    name="company"
                  />
  
   
 <IonText style={{color:"grey",fontSize:"11px"}} slot="end">(required)</IonText>
     </IonItem>

     <IonItem  lines="none" style={{border:"0.5px solid grey",borderRadius:"10px",margin:"15px 10px"}}>
     <IonIcon slot="start" size="small" icon={pricetagOutline}></IonIcon>
     <input
                    type="text"
                    className="custom-input"
                    id="c1"
                    placeholder="GST Number"
                    onChange={(e) => handleChange(e, newAddress, setNewAddress)}
                    value={newAddress.address_2}
                    name="address_2"
                  />
  
   
 <IonText style={{color:"grey",fontSize:"11px"}} slot="end">(required)</IonText>
     </IonItem>

     <IonItem  lines="none" style={{border:"0.5px solid grey",borderRadius:"10px",margin:"15px 10px"}}>
     <IonIcon slot="start" size="small" icon={locationOutline}></IonIcon>
     <input
                    type="text"
                    className="custom-input"
                    id="c1"
                    placeholder="Address"
                    onChange={(e) => handleChange(e, newAddress, setNewAddress)}
                    value={newAddress.address_1}
                    name="address_1"
                  />
  
   
 <IonText style={{color:"grey",fontSize:"11px"}} slot="end">(required)</IonText>
     </IonItem>

     <IonItem  lines="none" style={{border:"0.5px solid grey",borderRadius:"10px",margin:"15px 10px"}}>
     <IonIcon slot="start" size="small" icon={businessOutline}></IonIcon>
     <input
                    type="text"
                    className="custom-input"
                    id="c1"
                    placeholder="City"
                    onChange={(e) => handleChange(e, newAddress, setNewAddress)}
                    value={newAddress.city}
                    name="city"
                  />
  
   
 <IonText style={{color:"grey",fontSize:"11px"}} slot="end">(required)</IonText>
     </IonItem>

     <IonItem  lines="none" style={{border:"0.5px solid grey",borderRadius:"10px",margin:"15px 10px"}}>
    
     {/* <Select
                    onChange={(e) =>
                      handleCountryChange(e, newAddress, setNewAddress)
                    }
                    options={countries}
                    placeholder="Select Country"
                    name="country_id"
                    value={countries.filter(function (option) {
                      return option.value === newAddress.country_id;
                    })}
                  /> */}

                  {/* <IonSelect
          aria-label="countries"
          placeholder="Select Country"
          
          onIonChange={(ev) => {
            setSelectedcountrie(JSON.stringify(ev.detail.value))
            handleCountryChange(ev, newAddress, setNewAddress,)
        }}
        >
          {countries.map((countrie) => (
            <IonSelectOption key={countrie.value} >
              {countrie.label}
            </IonSelectOption>

          ))}
        </IonSelect> */}
        <input
                    type="text"
                    className="custom-input"
                    id="c1"
                    placeholder="country_id"
                    onChange={(e) => handleChange(e, newAddress, setNewAddress)}
                    value={newAddress.country_id}
                    name="country_id"
                  />
  
   
 <IonText style={{color:"grey",fontSize:"11px"}} slot="end">(required)</IonText>
     </IonItem>

     <IonItem  lines="none" style={{border:"0.5px solid grey",borderRadius:"10px",margin:"15px 10px"}}>
 
     {/* <Select
                    onChange={(e) =>
                      handleZoneChange(e, newAddress, setNewAddress)
                    }
                    options={zones}
                    placeholder={
                      zones.length === 0
                        ? "Please select country first"
                        : "Select State"
                    }
                    name="zone_id"
                    value={zones.filter(function (option) {
                      return option.value === newAddress.zone_id;
                    })}
                  /> */}
                 {/* <IonSelect
          aria-label="Food"
          placeholder={
            zones.length === 0
              ? "Please select country first"
              : "Select State"
          }
          
        //   onIonChange={(ev) => setCurrentFood(JSON.stringify(ev.detail.value))}
        >
          {zones.length > 0 && zones.map((zone) => (
            <IonSelectOption key={zone.value}>
              {zone.label}
            </IonSelectOption>
          ))}
        </IonSelect> */}

<input
                    type="text"
                    className="custom-input"
                    id="c1"
                    placeholder="zone_id"
                    onChange={(e) => handleChange(e, newAddress, setNewAddress)}
                    value={newAddress.zone_id}
                    name="zone_id"
                  />
  
   
 <IonText style={{color:"grey",fontSize:"11px"}} slot="end">(required)</IonText>
     </IonItem>

     <IonItem  lines="none" style={{border:"0.5px solid grey",borderRadius:"10px",margin:"15px 10px"}}>
     
     <input
                    type="text"
                    className="custom-input"
                    id="c1"
                    placeholder="Pincode"
                    onChange={(e) => handleChange(e, newAddress, setNewAddress)}
                    value={newAddress.postcode}
                    name="postcode"
                  />
  
   
 <IonText style={{color:"grey",fontSize:"11px"}} slot="end">(required)</IonText>
     </IonItem>

     <IonItem  lines="none" style={{border:"0.5px solid grey",borderRadius:"10px",margin:"15px 10px"}}>
    
     <input
                    type="checkbox"
                    className="custom-input"
                    onChange={() => {
                      setNewAddress({
                        ...newAddress,
                        default: !newAddress.default,
                      });
                    }}
                    name="default"
                    checked={newAddress.default}
                    value={newAddress.default}
                   
                  />
  
   
 <IonText style={{color:"grey",fontSize:"11px"}} slot="end">(Mark This default)</IonText>
     </IonItem>

    <IonButton
    onClick={(e) => addNewAddressCheck(e)}
    disabled={buttonsDisabled}
    expand='block'
    >{buttonsDisabled ? "Adding..." : "Add Address"}</IonButton>
 
 </IonList>
        </IonContent>
    </IonPage>
  )
}

export default AddAddress
