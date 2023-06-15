import { IonButton, IonContent, IonIcon, IonItem, IonList, IonPage, IonSelect, IonSelectOption, IonText } from '@ionic/react'
import { buildOutline, buildSharp, businessOutline, locateOutline, locationOutline, personCircleOutline, podiumOutline, pricetagOutline, tabletLandscapeOutline } from 'ionicons/icons'
import React, { useContext, useEffect, useState } from 'react'
import HeaderSub from '../../../components/Header/HeaderSub'
import { CatalogContext, SessionContext, UserContext } from '../../../contexts'
import { useHistory, useParams } from 'react-router'
import { httpService } from '../../../services'
import "./AddAddress.scss"

const EditAddress = () => {
    const [editAddress, setEditAddress] = useState({});
    const [selectedCountrieValue, setselectedCountrieValue] = useState("");
    const [selectedzoneValue, setselectedzoneValue] = useState("");
  const { sessionId } = useContext(SessionContext);
  const { log ,EditedAddress,setEditedAddress} = useContext(UserContext);
  const [countries, setCountries] = useState([]);
  const [zones, setZones] = useState([]);
  const [buttonsDisabled, setButtonsDisabled] = useState(false);
  const { showToast } = useContext(CatalogContext);

  const history = useHistory();

  const params = useParams();

  useEffect(() => {
    console.log("i am inedit")
    const getAllCountries = async () => {
      try {
        const {
          data: { data: countriesData },
        } = await httpService.get(httpService.apiEndpointShort + "countries", {
          headers: httpService.headers,
        });
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
    const getAddress = async (address_id) => {
      try {
        let { data: singleAddress } = await httpService.get(
          httpService.apiEndpointShort + "account/address/" + address_id,
          { headers: { ...httpService.headers, "X-Oc-Session": sessionId } }
        );
        if (
          singleAddress &&
          "success" in singleAddress &&
          singleAddress.success === 1
        ) {
          singleAddress = singleAddress.data;
          const {
            data: {
              data: { zone: countriesZones },
            },
          } = await httpService.get(
            httpService.apiEndpointShort +
              "countries/" +
              singleAddress.country_id,
            { headers: httpService.headers }
          );
          console.log(countriesZones);
          setZones(
            countriesZones.map((zone, index) => {
              return { value: zone.zone_id, label: zone.name };
            })
          );
          console.log("singleAddress==>",singleAddress);
          setEditAddress({
            address_id: singleAddress.address_id,
            firstname: singleAddress.firstname,
            lastname: singleAddress.lastname,
            city: singleAddress.city,
            address_1: singleAddress.address_1,
            address_2: singleAddress.address_2,
            country_id: singleAddress.country_id,
            postcode: singleAddress.postcode,
            zone_id: singleAddress.zone_id,
            company: singleAddress.company,
            default: singleAddress.default,
          });
          setselectedCountrieValue(singleAddress.country_id);
          setselectedzoneValue(singleAddress.zone_id);
        } else {
          console.log(singleAddress.error);
          showToast("error", "Unable to fetch address", "");
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
      console.log("p id ", params.id);
      getAllCountries();
      getAddress(params.id);
    }
  }, [sessionId, log]);

  const handleCountryChange = async (e, obj, setObj) => {
    console.log("e in h country change",e);
    const Arry1=countries.filter(function (option) {
         return e.detail.value === option.value;
       })
       console.log("Array in country==>",Arry1);
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
         httpService.apiEndpointShort + "countries/" + Arry1[0].value,
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
    const ZoneArry=zones.filter(function (option) {
      return e.detail.value === option.value;
    })
    const form = { ...obj };
    console.log("zone e data",ZoneArry);
    form.zone_id = ZoneArry[0].value;
    setObj(form);
  };

  const handleChange = (e, obj, setObj) => {
    const form = { ...obj };
    form[e.target.name] = e.target.value;
    setObj(form);
  };

  const saveEditAddress = async (address_id) => {

    setButtonsDisabled(true);
    const keys = Object.keys(editAddress);
    let check = true;
    for (let i = 0; i < keys.length; i++) {
      if (editAddress[keys[i]] === "" || editAddress[keys[i]] === null) {
        showToast("error", `${keys[i]} is required!`, "");
        check = false;
        setButtonsDisabled(false);
        return false;
      }
    }
    if (check) {
      try {
        let response = await httpService.put(
          httpService.apiEndpointShort + "account/address/" + address_id,
          editAddress,
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
          console.log("address edited");
          showToast("success", "Address edited successfully!", "");
        //   navigate(-1);
        setEditedAddress(editAddress);
        setButtonsDisabled(false);
        history.goBack();
        console.log("navigate -1")
        } else if (
          response &&
          "success" in response &&
          response.success !== 1 &&
          "error" in response &&
          response.error.length !== 0
        ) {
          console.log(
            "edit address unsucessful due to errors!",
            response.error[0]
          );
          showToast("error", response.error[0], "");
          setButtonsDisabled(false);
        } else {
          console.log("edit address unsucessful due to unknown!");
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
          console.log("edit address failed!", error.response);
        } else {
          showToast("error", "Something went wrong!", "");
          console.log("edit address failed!", error);
        }
      }
    }
  };

  return (
    <IonPage>
        <HeaderSub Title={"Edit Address"} />
        <IonContent>
   
   { Object.keys(editAddress).length !== 0? 
       <IonList>
     <IonItem  lines="none" style={{border:"0.5px solid grey",borderRadius:"10px",margin:"15px 10px"}}>
     <IonIcon slot="start" size="small" icon={personCircleOutline}></IonIcon>
     <input
                      type="text"
                      className="custom-input"
                      id="c1"
                      placeholder="First Name"
                      onChange={(e) =>
                        handleChange(e, editAddress, setEditAddress)
                      }
                      value={editAddress.firstname}
                      name="firstname"
                    />
     

 <IonText style={{color:"grey",fontSize:"11px"}} slot="end">(required)</IonText>
     </IonItem>

     <IonItem  lines="none" style={{border:"0.5px solid grey",borderRadius:"10px",margin:"15px 10px"}}>
     <IonIcon slot="start" size="small" icon={personCircleOutline}></IonIcon>
     <input
                      type="text"
                      className="custom-input"
                      id="c1"
                      placeholder="Last Name"
                      onChange={(e) =>
                        handleChange(e, editAddress, setEditAddress)
                      }
                      value={editAddress.lastname}
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
                      onChange={(e) =>
                        handleChange(e, editAddress, setEditAddress)
                      }
                      value={editAddress.company}
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
                      onChange={(e) =>
                        handleChange(e, editAddress, setEditAddress)
                      }
                      value={editAddress.address_2}
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
                      onChange={(e) =>
                        handleChange(e, editAddress, setEditAddress)
                      }
                      value={editAddress.address_1}
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
                      onChange={(e) =>
                        handleChange(e, editAddress, setEditAddress)
                      }
                      value={editAddress.city}
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


<IonSelect
          aria-label="countries"
          placeholder="Select Country"
          name="country_id"
          
          onIonChange={(ev) => {
            setselectedCountrieValue(ev.detail.value)
            handleCountryChange(ev, editAddress, setEditAddress)
            let data =countries.filter(function (option) {
              return option.value === editAddress.country_id;
            })
            console.log("return Data ===>",data)
        }}
        
        value={selectedCountrieValue}
       
        >
          {countries.map((countrie) => (
            <IonSelectOption key={countrie.value} value={countrie.value} >
              {countrie.label}
            </IonSelectOption>

          ))}
        </IonSelect>
       
  
   
 <IonText style={{color:"grey",fontSize:"11px"}} slot="end">(required)</IonText>
     </IonItem>

     <IonItem  lines="none" style={{border:"0.5px solid grey",borderRadius:"10px",margin:"15px 10px"}}>
 

<IonSelect
          aria-label="zones"
          name="zone_id"
          placeholder={
            zones.length === 0
              ? "Please select country first"
              : "Select State"
          }
          
          onIonChange={(ev) => {
            setselectedzoneValue(ev.detail.value)
            handleZoneChange(ev, editAddress, setEditAddress)
            let data =zones.filter(function (option) {
              return option.value === editAddress.zone_id;
            })
            console.log("return Data ===>",data)
        }}
        
        value={selectedzoneValue}
        >
          {zones.map((zone) => (
            <IonSelectOption key={zone.value}  value={zone.value}>
              {zone.label}
            </IonSelectOption>

          ))}
        </IonSelect>
        
  
   
 <IonText style={{color:"grey",fontSize:"11px"}} slot="end">(required)</IonText>
     </IonItem>

     <IonItem  lines="none" style={{border:"0.5px solid grey",borderRadius:"10px",margin:"15px 10px"}}>
     
     <input
                      type="text"
                      className="custom-input"
                      id="c1"
                      placeholder="Pincode"
                      onChange={(e) =>
                        handleChange(e, editAddress, setEditAddress)
                      }
                      value={editAddress.postcode}
                      name="postcode"
                    />
  
   
 <IonText style={{color:"grey",fontSize:"11px"}} slot="end">(required)</IonText>
     </IonItem>

     <IonItem  lines="none" style={{border:"0.5px solid grey",borderRadius:"10px",margin:"15px 10px"}}>
    
     <input
                      type="checkbox"
                      onChange={() => {
                        setEditAddress({
                          ...editAddress,
                          default: !editAddress.default,
                        });
                      }}
                      name="default"
                      checked={editAddress.default}
                      value={editAddress.default}
                      className="form-check-input"
                    />
  
   
 <IonText style={{color:"grey",fontSize:"11px"}} slot="end">(Mark This default)</IonText>
     </IonItem>

    <IonButton
    onClick={() => saveEditAddress(params.id)}
    disabled={buttonsDisabled}
    expand='block'
    >
       {buttonsDisabled ? "Saving..." : "Save Address"}
    
    </IonButton>
 
        </IonList>
       :
       <h1>Edit page</h1>
      
      
      }
        
        </IonContent>
    </IonPage>
  )
}

export default EditAddress
