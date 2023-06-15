import { IonButton, IonCard, IonCardContent, IonCol, IonContent, IonDatetime, IonFooter, IonGrid, IonIcon, IonInput, IonPage, IonRow, IonText } from '@ionic/react'
import React, { useContext, useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import HeaderSub from '../../components/Header/HeaderSub'
import { pencilOutline, trashOutline } from 'ionicons/icons'
import { httpService } from '../../services'
import { CartContext, CatalogContext, SessionContext, UserContext } from '../../contexts'
import AddressCard from '../../components/AddressComp/AddressCard'
import CartAddressCard from './CartAddressCard'
import ProductsTotal from './ProductsTotal'
import EmptyAddress from './EmptyAddress'
const OrderBook = () => {
    const { sessionId } = useContext(SessionContext);
    const { showToast } = useContext(CatalogContext);
    const { log,UserAddress, setUserAddress,user } = useContext(UserContext);
    const history = useHistory();
  const { cart, emptyCart, validateCheckout } = useContext(CartContext);
   const [SelectedAddressCard,setSelectedAddressCard]=useState(false);
  const [checkoutStep, setCheckoutStep] = useState("pending");
  const [RefreshState,setRefreshState]=useState(false);
  // const navigate = useNavigate();

  const [addresses, setAddresses] = useState();
  const [checkout, setCheckout] = useState({});
  const [guestUser, setGuestUser] = useState({
    firstname: "",
    lastname: "",
    email: "",
    telephone: "",
    company: "",
    city: "",
    address_1: "",
    address_2: "",
    country_id: "",
    postcode: "",
    zone_id: null,
  });
  const [buttonsDisabled, setButtonsDisabled] = useState(false);
  const [shipping, setShipping] = useState({
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
  const [payment, setPayment] = useState({
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

  const [commentt, setComment] = useState("");

  const [existingPayment, setExistingPayment] = useState({ address_id: "" });
  const [existingShipping, setExistingShipping] = useState({ address_id: "" });

  const [selectedPaymentAddress, setSelectedPaymentAddress] = useState();
  const [countries, setCountries] = useState([]);
  const [zones, setZones] = useState([]);

useEffect(()=>{
console.log("checkout Step",checkoutStep)
},[checkoutStep])




  useEffect(() => {
    const handleCheckout = async () => {
      setButtonsDisabled(true);
      try {
        const checkout = await validateCheckout();
        console.log("validateCheckout",checkout);
        setButtonsDisabled(false);
        if (checkout && "error" in checkout && checkout.error.length !== 0) {
          showToast("error", checkout.error[0], "");
          // navigate(-1);
          console.log("navigate(-1)");
          return false;
        } else {
          const {
            data: { data: countriesData },
          } = await httpService.get(
            httpService.apiEndpointShort + "countries",
            {
              headers: httpService.headers,
            }
          );
          setCountries(
            countriesData.map((country, index) => {
              return { value: country.country_id, label: country.name };
            })
          );
          if (user) {
            try {
              const {
                data: { data: allAddresses },
              } = await httpService.get(
                httpService.apiEndpointShort + "account/address",
                {
                  headers: {
                    ...httpService.headers,
                    "X-Oc-Session": sessionId,
                  },
                }
              );
              console.log(allAddresses);
              setAddresses(allAddresses);
              if (allAddresses && allAddresses.addresses) {
                allAddresses.addresses.map((address) => {
                  if (address.default === true) {
                    setSelectedPaymentAddress(address.address_id);
                    setPayment({
                      firstname: address.firstname,
                      lastname: address.lastname,
                      city: address.city,
                      address_1: address.address_1,
                      address_2: address.address_2,
                      country_id: address.country_id,
                      postcode: address.postcode,
                      zone_id: address.zone_id,
                      company: address.company,
                    });

                    setShipping({
                      firstname: address.firstname,
                      lastname: address.lastname,
                      city: address.city,
                      address_1: address.address_1,
                      address_2: address.address_2,
                      country_id: address.country_id,
                      postcode: address.postcode,
                      zone_id: address.zone_id,
                      company: address.company,
                    });

                    setExistingPayment({ address_id: address.address_id });
                    setExistingShipping({ address_id: address.address_id });
                  }
                });
              }
            } catch (error) {
              console.log(error);
              if (error.response) {
                showToast("error", error.response.data.error[0], "");
              } else {
                showToast("error", "Unable to fetch your addresses!", "");
              }
            }
            setCheckoutStep("paymentaddress");
          } else {
            setCheckoutStep("createguest");
          }
        }
      } catch (error) {
        console.log("cart page checkout error", error);
        setButtonsDisabled(false);
        if (error.response) {
          showToast("error", error.response.data.error[0], "");
        } else {
          showToast("error", "An error occured!", "");
        }

        // navigate(-1);
        console.log("navigate(-1)");
        return false;
      }
    };
    console.log("log...", log);
    if (!cart || cart.length === 0) {
      // navigate("/cart");
      console.log("navigate cart");
    } else if (log === 0) {
      // navigate("/login");
      console.log("navigate login");
    } else if (log === 1 && user && cart && cart.length !== 0) {
      console.log("calling handel Checkout");
      handleCheckout();
    }
  }, [log, user, cart,UserAddress]);

  const handleCountryChange = async (e, obj, setObj) => {
    const form = { ...obj };
    form.country_id = e.value;
    form.zone_id = null;
    try {
      const {
        data: {
          data: { zone: countriesZones },
        },
      } = await httpService.get(
        httpService.apiEndpointShort + "countries/" + e.value,
        { headers: httpService.headers }
      );
      console.log(countriesZones);
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

  const replicateAddress = async () => {
    const details = { ...guestUser };
    let shipAddress = {
      firstname: details.firstname,
      lastname: details.lastname,
      company: details.company,
      address_1: details.address_1,
      address_2: details.address_2,
      city: details.city,
      postcode: details.postcode,
      country_id: details.country_id,
    };

    shipAddress.zone_id = null;
    try {
      const {
        data: {
          data: { zone: countriesZones },
        },
      } = await httpService.get(
        httpService.apiEndpointShort + "countries/" + details.country_id,
        { headers: httpService.headers }
      );
      console.log(countriesZones);
      setZones(
        countriesZones.map((zone, index) => {
          return { value: zone.zone_id, label: zone.name };
        })
      );
      shipAddress.zone_id = details.zone_id;
      setShipping(shipAddress);
    } catch (error) {
      console.log("zone select error", error);
    }
  };

  const placeOrder = () => {
    const orderPlacer = async () => {
      try {
        let response = await httpService.post(
          httpService.apiEndpointShort + "confirm",
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
          setButtonsDisabled(false);

          showToast("success", "Order placed successfully!", "");
          // navigate("/OrderSuccess");
          console.log("order Sucess")
          history.replace("/OrderSuccess")
          emptyCart();
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
          setButtonsDisabled(false);
        } else {
          console.log("order place unsucessful due to unknown!");
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
          console.log("order pace failed", error.response);
        } else {
          showToast("error", "Something went wrong!", "");
          console.log("order place failed", error);
        }
      }
    };
    setButtonsDisabled(true);
    orderPlacer();
  };

  const createGuestUser = async () => {
    setButtonsDisabled(true);
    const keys = Object.keys(guestUser);
    let check = true;
    for (let i = 0; i < keys.length; i++) {
      if (guestUser[keys[i]] === "" || guestUser[keys[i]] === null) {
        showToast("error", `${keys[i]} is required!`, "");
        check = false;
        setButtonsDisabled(false);
        return false;
      }
    }
    if (check) {
      try {
        let response = await httpService.post(
          httpService.apiEndpointShort + "guest",
          guestUser,
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
          console.log("guest user created");
          setCheckoutStep("guestshipping");
          setZones([]);
          setButtonsDisabled(false);
        } else if (
          response &&
          "success" in response &&
          response.success !== 1 &&
          "error" in response &&
          response.error.length !== 0
        ) {
          console.log(
            "create user unsucessful due to errors!",
            response.error[0]
          );
          showToast("error", response.error[0], "");
          setButtonsDisabled(false);
        } else {
          console.log("create user unsucessful due to unknown!");
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
          console.log("create user failed", error.response);
        } else {
          showToast("error", "Something went wrong!", "");
          console.log("create user failed", error);
        }
      }
    }
  };

  const createShipping = async () => {
    setButtonsDisabled(true);
    const keys = Object.keys(shipping);
    let check = true;
    for (let i = 0; i < keys.length; i++) {
      if (shipping[keys[i]] === "" || shipping[keys[i]] === null) {
        showToast("error", `${keys[i]} is required!`, "");
        check = false;
        setButtonsDisabled(false);
        return false;
      }
    }
    if (check) {
      try {
        let response = await httpService.post(
          httpService.apiEndpointShort + "guestshipping",
          shipping,
          { headers: { ...httpService.headers, "X-Oc-Session": sessionId } }
        );
        response = response.data;
        console.log("guest shipping response-", response);
        if (
          response &&
          "success" in response &&
          response.success === 1 &&
          "error" in response &&
          response.error.length === 0
        ) {
          console.log("guest shipping created");

          let { data: shippingMethods } = await httpService.get(
            httpService.apiEndpointShort + "shippingmethods",
            { headers: { ...httpService.headers, "X-Oc-Session": sessionId } }
          );

          if (
            "error" in shippingMethods &&
            shippingMethods.error.length !== 0
          ) {
            throw new Error(400, shippingMethods.error[0]);
          }

          let response = await httpService.post(
            httpService.apiEndpointShort + "shippingmethods",
            {
              shipping_method: "flat.flat",
              comment: "string1",
            },
            { headers: { ...httpService.headers, "X-Oc-Session": sessionId } }
          );
          response = response.data;
          if (
            response &&
            "success" in response &&
            response.success === 1 &&
            "error" in response &&
            response.error.length === 0
          ) {
            console.log("shipping method created");

            let { data: paymentMethods } = await httpService.get(
              httpService.apiEndpointShort + "paymentmethods",
              { headers: { ...httpService.headers, "X-Oc-Session": sessionId } }
            );

            if (
              "error" in paymentMethods &&
              paymentMethods.error.length !== 0
            ) {
              throw new Error(400, paymentMethods.error[0]);
            }

            let response = await httpService.post(
              httpService.apiEndpointShort + "paymentmethods",
              {
                payment_method: "cod",
                agree: 1,
                comment: "string2",
              },
              { headers: { ...httpService.headers, "X-Oc-Session": sessionId } }
            );
            response = response.data;
            if (
              response &&
              "success" in response &&
              response.success === 1 &&
              "error" in response &&
              response.error.length === 0
            ) {
              console.log("payment method created");

              let response = await httpService.post(
                httpService.apiEndpointShort + "confirm",
                {},
                {
                  headers: {
                    ...httpService.headers,
                    "X-Oc-Session": sessionId,
                  },
                }
              );
              response = response.data;
              if (
                response &&
                "success" in response &&
                response.success === 1 &&
                "error" in response &&
                response.error.length === 0
              ) {
                console.log("Order confirmation created");
                setCheckout(response.data);
                //setCheckoutStep("confirmorder");
                setButtonsDisabled(false);
              } else if (
                response &&
                "success" in response &&
                response.success !== 1 &&
                "error" in response &&
                response.error.length !== 0
              ) {
                console.log(
                  "confirm order unsuccessful due to errors!",
                  response.error[0]
                );
                showToast("error", response.error[0], "");
                setButtonsDisabled(false);
              } else {
                console.log("confirm order unsucessful due to unknown!");
                showToast("error", "Something went wrong!", "");
                setButtonsDisabled(false);
              }

              //setCheckoutStep("confirmorder");
              setButtonsDisabled(false);
            } else if (
              response &&
              "success" in response &&
              response.success !== 1 &&
              "error" in response &&
              response.error.length !== 0
            ) {
              console.log(
                "payment method unsuccessful due to errors!",
                response.error[0]
              );
              showToast("error", response.error[0], "");
              setButtonsDisabled(false);
            } else {
              console.log("payment method unsucessful due to unknown!");
              showToast("error", "Something went wrong!", "");
              setButtonsDisabled(false);
            }
          } else if (
            response &&
            "success" in response &&
            response.success !== 1 &&
            "error" in response &&
            response.error.length !== 0
          ) {
            console.log(
              "shipping method unsuccessful due to errors!",
              response.error[0]
            );
            showToast("error", response.error[0], "");
            setButtonsDisabled(false);
          } else {
            console.log("shipping method unsucessful due to unknown!");
            showToast("error", "Something went wrong!", "");
            setButtonsDisabled(false);
          }
        } else if (
          response &&
          "success" in response &&
          response.success !== 1 &&
          "error" in response &&
          response.error.length !== 0
        ) {
          console.log(
            "guest shipping unsucessful due to errors!",
            response.error[0]
          );
          showToast("error", response.error[0], "");
          setButtonsDisabled(false);
        } else {
          console.log("guest shipping unsucessful due to unknown!");
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
          console.log("create shipping failed", error.response);
        } else {
          showToast("error", "Something went wrong!", "");
          console.log("create shipping failed", error);
        }
      }
    }
  };

  const confirmPaymentAddress = async () => {
    setButtonsDisabled(true);
    const keys = Object.keys(existingPayment);
    let check = true;
    for (let i = 0; i < keys.length; i++) {
      if (
        existingPayment[keys[i]] === "" ||
        existingPayment[keys[i]] === null
      ) {
        showToast("error", `Please select an address`, "");
        check = false;
        setButtonsDisabled(false);
        return false;
      }
    }
    if (check) {
      try {
        let response = await httpService.post(
          httpService.apiEndpointShort + "paymentaddress/existing",
          existingPayment,
          { headers: { ...httpService.headers, "X-Oc-Session": sessionId } }
        );
        response = response.data;
        console.log("select paymet address response-", response);
        if (
          response &&
          "success" in response &&
          response.success === 1 &&
          "error" in response &&
          response.error.length === 0
        ) {
          console.log("select paymet address success");
          setCheckoutStep("shippingaddress");
          setZones([]);
          setButtonsDisabled(false);
        } else if (
          response &&
          "success" in response &&
          response.success !== 1 &&
          "error" in response &&
          response.error.length !== 0
        ) {
          console.log(
            "select paymet address unsucessful due to errors!",
            response.error[0]
          );
          showToast("error", response.error[0], "");
          setButtonsDisabled(false);
        } else {
          console.log("select paymet address unsucessful due to unknown!");
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
          console.log("select paymet address failed", error.response);
        } else {
          showToast("error", "Something went wrong!", "");
          console.log("select paymet address failed", error);
        }
      }
    }
  };

  const confirmShippingAddress = async () => {
    console.log("confirmShippingAddress=========>")
    setButtonsDisabled(true);
    const keys = Object.keys(existingShipping);
    let check = true;
    for (let i = 0; i < keys.length; i++) {
      if (
        existingShipping[keys[i]] === "" ||
        existingShipping[keys[i]] === null
      ) {
        showToast("error", `Please select a shiping address!`, "");
        check = false;
        setButtonsDisabled(false);
        return false;
      }
    }
    if (check) {
      try {
        let response = await httpService.post(
          httpService.apiEndpointShort + "shippingaddress/existing",
          existingShipping,
          { headers: { ...httpService.headers, "X-Oc-Session": sessionId } }
        );
        response = response.data;
        console.log("select shipping response-", response);
        if (
          response &&
          "success" in response &&
          response.success === 1 &&
          "error" in response &&
          response.error.length === 0
        ) {
          console.log("select shipping created");

          let { data: shippingMethods } = await httpService.get(
            httpService.apiEndpointShort + "shippingmethods",
            { headers: { ...httpService.headers, "X-Oc-Session": sessionId } }
          );

          if (
            "error" in shippingMethods &&
            shippingMethods.error.length !== 0
          ) {
            throw new Error(400, shippingMethods.error[0]);
          }

          let response = await httpService.post(
            httpService.apiEndpointShort + "shippingmethods",
            {
              shipping_method: "flat.flat",
              comment: "string3",
            },
            { headers: { ...httpService.headers, "X-Oc-Session": sessionId } }
          );
          response = response.data;
          if (
            response &&
            "success" in response &&
            response.success === 1 &&
            "error" in response &&
            response.error.length === 0
          ) {
            console.log("shipping method created");

            let { data: paymentMethods } = await httpService.get(
              httpService.apiEndpointShort + "paymentmethods",
              { headers: { ...httpService.headers, "X-Oc-Session": sessionId } }
            );

            if (
              "error" in paymentMethods &&
              paymentMethods.error.length !== 0
            ) {
              throw new Error(400, paymentMethods.error[0]);
            }

            let response = await httpService.post(
              httpService.apiEndpointShort + "paymentmethods",
              {
                payment_method: "cod",
                agree: 1,
                comment: commentt,
                seller_id:"",
              },
              { headers: { ...httpService.headers, "X-Oc-Session": sessionId } }
            );
            response = response.data;
            console.log("payment method created before",response);
            if (
              response &&
              "success" in response &&
              response.success === 1 &&
              "error" in response &&
              response.error.length === 0
            ) {
              console.log("payment method created");

              let response = await httpService.post(
                httpService.apiEndpointShort + "confirm",
                {},
                {
                  headers: {
                    ...httpService.headers,
                    "X-Oc-Session": sessionId,
                  },
                }
              );
              response = response.data;
              if (
                response &&
                "success" in response &&
                response.success === 1 &&
                "error" in response &&
                response.error.length === 0
              ) {
                console.log("Order confirmation created");
                setCheckout(response.data);
                //setCheckoutStep("confirmorder");
                setButtonsDisabled(false);
                placeOrder();
              } else if (
                response &&
                "success" in response &&
                response.success !== 1 &&
                "error" in response &&
                response.error.length !== 0
              ) {
                console.log(
                  "confirm order unsuccessful due to errors!",
                  response.error[0]
                );
                showToast("error", response.error[0], "");
                setButtonsDisabled(false);
              } else {
                console.log("confirm order unsucessful due to unknown!");
                showToast("error", "Something went wrong!", "");
                setButtonsDisabled(false);
              }

              //setCheckoutStep("confirmorder");
              setButtonsDisabled(false);
            } else if (
              response &&
              "success" in response &&
              response.success !== 1 &&
              "error" in response &&
              response.error.length !== 0
            ) {
              console.log(
                "payment method unsuccessful due to errors!",
                response.error[0]
              );
              showToast("error", response.error[0], "");
              setButtonsDisabled(false);
            } else {
              console.log("payment method unsucessful due to unknown!");
              showToast("error", "Something went wrong!", "");
              setButtonsDisabled(false);
            }
          } else if (
            response &&
            "success" in response &&
            response.success !== 1 &&
            "error" in response &&
            response.error.length !== 0
          ) {
            console.log(
              "shipping method unsuccessful due to errors!",
              response.error[0]
            );
            showToast("error", response.error[0], "");
            setButtonsDisabled(false);
          } else {
            console.log("shipping method unsucessful due to unknown!");
            showToast("error", "Something went wrong!", "");
            setButtonsDisabled(false);
          }
        } else if (
          response &&
          "success" in response &&
          response.success !== 1 &&
          "error" in response &&
          response.error.length !== 0
        ) {
          console.log(
            "guest shipping unsucessful due to errors!",
            response.error[0]
          );
          showToast("error", response.error[0], "");
          setButtonsDisabled(false);
        } else {
          console.log("guest shipping unsucessful due to unknown!");
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
          console.log("create shipping failed", error.response);
        } else {
          showToast("error", "Something went wrong!", "");
          console.log("create shipping failed", error);
        }
      }
    }
  };

  const selectAddress = (address) => {
    console.log("called");
    setSelectedPaymentAddress(address.address_id);
    setPayment({
      firstname: address.firstname,
      lastname: address.lastname,
      city: address.city,
      address_1: address.address_1,
      address_2: address.address_2,
      country_id: address.country_id,
      postcode: address.postcode,
      zone_id: address.zone_id,
      company: address.company,
    });

    setShipping({
      firstname: address.firstname,
      lastname: address.lastname,
      city: address.city,
      address_1: address.address_1,
      address_2: address.address_2,
      country_id: address.country_id,
      postcode: address.postcode,
      zone_id: address.zone_id,
      company: address.company,
    });

    setExistingPayment({ address_id: address.address_id });
    setExistingShipping({ address_id: address.address_id });
  };

      const handelAddAddress=()=>{
        history.push("/add-address")
      }
  return (
    <IonPage>
        {/* <HeaderSub Title={"Product"} /> */}
        {    checkoutStep === "paymentaddress" ? (
              addresses !== undefined ? (
                <>
                  <HeaderSub Title="Select Billing Address" />
                </>
              ) : (

                // <Loading />
                <HeaderSub Title="CHECKOUT" />
              )
            ) : null}

         {checkoutStep === "shippingaddress" ? (
              addresses !== undefined ? (
                <>
                  <HeaderSub Title="Select Shipping Address" />
                </>
              ) : (
                // <Loading />
                <HeaderSub Title="CHECKOUT" />
              )
            ) : null}
              
        <IonContent forceOverscroll={ false }>
            <IonGrid>

           <IonRow>
         
           
            {/*  Not in use  start */}
           {checkoutStep === "createguest" ? (
              <>
                <div style={{ padding: "20px 10px" }}>
                  <div className="d-flex align-items-center justify-content-between">
                    <h6 style={{ color: "#565656" }} className="m-0  p-0">
                      Customer Information
                    </h6>
                    {/* <Link to="/" className="m-0  p-0">change</Link> */}
                  </div>
                </div>

                <div
                  style={{
                    background: "#fff",
                    padding: "50px 20px 30px 20px",
                    margin: "0 5px",
                  }}
                >
                  <div className="form-group">
                    <label>First Name</label>
                    <input
                      onChange={(e) => handleChange(e, guestUser, setGuestUser)}
                      value={guestUser.firstname}
                      type="text"
                      name="firstname"
                      className="form-control"
                      data-label="First Name"
                      placeholder="Enter First Name"
                    />
                  </div>

                  <div className="form-group">
                    <label>Last Name</label>
                    <input
                      onChange={(e) => handleChange(e, guestUser, setGuestUser)}
                      value={guestUser.lastname}
                      type="text"
                      name="lastname"
                      className="form-control"
                      data-label="Last Name"
                      placeholder="Enter Last Name"
                    />
                  </div>

                  <div className="form-group">
                    <label>Email</label>
                    <input
                      onChange={(e) => handleChange(e, guestUser, setGuestUser)}
                      value={guestUser.email}
                      type="email"
                      name="email"
                      className="form-control"
                      data-label="Email"
                      placeholder="Enter email"
                    />
                  </div>

                  <div className="form-group">
                    <label>Phone Number</label>
                    <input
                      onChange={(e) => handleChange(e, guestUser, setGuestUser)}
                      value={guestUser.telephone}
                      type="text"
                      name="telephone"
                      className="form-control"
                      data-label="Phone Number"
                      placeholder="Enter Phone Number"
                    />
                  </div>

                  <div className="form-group">
                    <label>Company</label>
                    <input
                      onChange={(e) => handleChange(e, guestUser, setGuestUser)}
                      value={guestUser.company}
                      type="text"
                      name="company"
                      className="form-control"
                      data-label="Company"
                      placeholder="Enter company"
                    />
                  </div>

                  <div className="form-group">
                    <label>GST NO.</label>
                    <input
                      onChange={(e) => handleChange(e, guestUser, setGuestUser)}
                      value={guestUser.address_2}
                      type="text"
                      name="address_2"
                      className="form-control"
                      data-label="GST No."
                      placeholder="Enter GST NO."
                    />
                  </div>

                  <div className="form-group">
                    <label>City</label>
                    <input
                      onChange={(e) => handleChange(e, guestUser, setGuestUser)}
                      value={guestUser.city}
                      type="text"
                      name="city"
                      className="form-control"
                      data-label="City"
                      placeholder="Enter City"
                    />
                  </div>

                  <div className="form-group">
                    <label>Address </label>
                    <input
                      onChange={(e) => handleChange(e, guestUser, setGuestUser)}
                      value={guestUser.address_1}
                      type="text"
                      name="address_1"
                      className="form-control"
                      data-label="Address"
                      placeholder="Enter address"
                    />
                  </div>

                  <div className="form-group">
                    <label>Country </label>
                    {/* <Select
                      onChange={(e) =>
                        handleCountryChange(e, guestUser, setGuestUser)
                      }
                      options={countries}
                      placeholder="Select Country"
                      name="country_id"
                      value={countries.filter(function (option) {
                        return option.value === guestUser.country_id;
                      })}
                    /> */}
                    <input
                    type="text"
                    className="custom-input"
                    id="c1"
                    placeholder="Select Country"
                    onChange={(e) =>
                      handleCountryChange(e, guestUser, setGuestUser)
                    }
                    value={guestUser.country_id}
                   
                    name="country_id"
                  />
                  </div>

                  <div className="form-group">
                    <label>State </label>
                    {/* <Select
                      onChange={(e) =>
                        handleZoneChange(e, guestUser, setGuestUser)
                      }
                      options={zones}
                      placeholder={
                        zones.length === 0
                          ? "Please select country first"
                          : "Select State"
                      }
                      name="zone_id"
                      value={zones.filter(function (option) {
                        return option.value === guestUser.zone_id;
                      })}
                    /> */}
                    <input
                    type="text"
                    className="custom-input"
                    id="c1"
                    placeholder="zone_id"
                    onChange={(e) =>
                      handleZoneChange(e, guestUser, setGuestUser)
                    }
                    value={guestUser.zone_id}
                    name="zone_id"
                  />
                  </div>

                  <div className="form-group">
                    <label>Postcode</label>
                    <input
                      onChange={(e) => handleChange(e, guestUser, setGuestUser)}
                      value={guestUser.postcode}
                      type="text"
                      name="postcode"
                      className="form-control"
                      data-label="Postcode"
                      placeholder="Enter postcode"
                    />
                  </div>
                </div>

                <div style={{ margin: "0 5px" }}>
                  <button
                    onClick={(e) => createGuestUser(e)}
                    className="confirm-and-pay-btn"
                    disabled={buttonsDisabled}
                  >
                    {buttonsDisabled ? "Processing..." : "Confirm and Next"}
                  </button>
                </div>
              </>
            ) : null}

            { checkoutStep === "guestshipping" ? (
              <>
              <div style={{ padding: "20px 10px" }}>
                  <div className="d-flex align-items-center justify-content-between">
                    <h6 style={{ color: "#565656" }} className="m-0  p-0">
                      Shipping Information
                    </h6>
                    <span
                      onClick={(e) => replicateAddress(e)}
                      style={{ color: "#565656" }}
                    >
                      Same as Previous
                    </span>
                    {/* <Link to="/" className="m-0  p-0">change</Link> */}
                  </div>
                </div>
                <div style={{ padding: "20px 10px" }}>
                  <div className="d-flex align-items-center justify-content-between">
                    <h6 style={{ color: "#565656" }} className="m-0  p-0">
                      Customer Information
                    </h6>
                    {/* <Link to="/" className="m-0  p-0">change</Link> */}
                  </div>
                </div>

                <div
                  style={{
                    background: "#fff",
                    padding: "50px 20px 30px 20px",
                    margin: "0 5px",
                  }}
                >
                  <div className="form-group">
                    <label>First Name</label>
                    <input
                      onChange={(e) => handleChange(e, shipping, setShipping)}
                      value={shipping.firstname}
                      type="text"
                      name="firstname"
                      className="form-control"
                      data-label="First Name"
                      placeholder="Enter First Name"
                    />
                  </div>

                  <div className="form-group">
                    <label>Last Name</label>
                    <input
                      onChange={(e) => handleChange(e, shipping, setShipping)}
                      value={shipping.lastname}
                      type="text"
                      name="lastname"
                      className="form-control"
                      data-label="Last Name"
                      placeholder="Enter Last Name"
                    />
                  </div>

                  <div className="form-group">
                  <label>Company</label>
                    <input
                      onChange={(e) => handleChange(e, shipping, setShipping)}
                      value={shipping.company}
                      type="text"
                      name="company"
                      className="form-control"
                      data-label="Company"
                      placeholder="Enter company"
                    />
                  </div>

                  <div className="form-group">
                  <label>GST NO.</label>
                    <input
                      onChange={(e) => handleChange(e, shipping, setShipping)}
                      value={shipping.address_2}
                      type="text"
                      name="address_2"
                      className="form-control"
                      data-label="GST No."
                      placeholder="Enter GST NO."
                    />
                  </div>

                  <div className="form-group">
                  <label>City</label>
                    <input
                      onChange={(e) => handleChange(e, shipping, setShipping)}
                      value={shipping.city}
                      type="text"
                      name="city"
                      className="form-control"
                      data-label="City"
                      placeholder="Enter City"
                    />
                  </div>

                  <div className="form-group">
                  <label>Address </label>
                    <input
                      onChange={(e) => handleChange(e, shipping, setShipping)}
                      value={shipping.address_1}
                      type="text"
                      name="address_1"
                      className="form-control"
                      data-label="Address"
                      placeholder="Enter address"
                    />
                  </div>

                  <div className="form-group">
                    <label>City</label>
                    <input
                      onChange={(e) => handleChange(e, guestUser, setGuestUser)}
                      value={guestUser.city}
                      type="text"
                      name="city"
                      className="form-control"
                      data-label="City"
                      placeholder="Enter City"
                    />
                  </div>

                  <div className="form-group">
                    <label>Address </label>
                    <input
                      onChange={(e) => handleChange(e, guestUser, setGuestUser)}
                      value={guestUser.address_1}
                      type="text"
                      name="address_1"
                      className="form-control"
                      data-label="Address"
                      placeholder="Enter address"
                    />
                  </div>

                  <div className="form-group">
                    <label>Country </label>
                    {/* <Select
                      onChange={(e) =>
                        handleCountryChange(e, guestUser, setGuestUser)
                      }
                      options={countries}
                      placeholder="Select Country"
                      name="country_id"
                      value={countries.filter(function (option) {
                        return option.value === guestUser.country_id;
                      })}
                    /> */}
                    <input
                    type="text"
                    className="custom-input"
                    id="c1"
                    placeholder="Select Country"
                    onChange={(e) =>
                      handleCountryChange(e, shipping, setShipping)
                    }
                    value={shipping.country_id}
                   
                    name="country_id"
                  />
                  </div>

                  <div className="form-group">
                    <label>State </label>
                    {/* <Select
                      onChange={(e) =>
                        handleZoneChange(e, guestUser, setGuestUser)
                      }
                      options={zones}
                      placeholder={
                        zones.length === 0
                          ? "Please select country first"
                          : "Select State"
                      }
                      name="zone_id"
                      value={zones.filter(function (option) {
                        return option.value === guestUser.zone_id;
                      })}
                    /> */}
                    <input
                    type="text"
                    className="custom-input"
                    id="c1"
                    placeholder="zone_id"
                    onChange={(e) =>
                      handleZoneChange(e, shipping, setShipping)
                    }
                    value={guestUser.zone_id}
                    name="zone_id"
                  />
                  </div>

                  <div className="form-group">
                  <label>Postcode</label>
                    <input
                      onChange={(e) => handleChange(e, shipping, setShipping)}
                      value={shipping.postcode}
                      type="text"
                      name="postcode"
                      className="form-control"
                      data-label="Postcode"
                      placeholder="Enter postcode"
                    />
                  </div>

                  <div className="form-group">
                    <label>Comment (Optional)</label>
                    <textarea
                      onChange={(e) => setComment(e.target.value)}
                      value={commentt}
                      className="form-control"
                      data-label="Last Name"
                      placeholder="Comment (optional)"
                    ></textarea>
                  </div>
                  
                </div>

                <div style={{ margin: "0 5px" }}>
                  <button
                    onClick={(e) => createShipping(e)}
                    className="confirm-and-pay-btn"
                    disabled={buttonsDisabled}
                  >
                    {buttonsDisabled ? "Processing..." : "Confirm and Next"}
                  </button>
                </div>
              </>
            ) : null}
      {/*  Not in use end*/}



      
            {    checkoutStep === "paymentaddress" ? (
              addresses !== undefined ? (
                <>
                  
                  <div className="row">
                    <div className="col-12 mt-60">
                      {"addresses" in addresses &&
                      addresses.addresses.length !== 0 ? (
                        <>
                          {addresses.addresses.map((address) => {
                            return (
                              <CartAddressCard
                                key={address.address_id}
                                onClick={() => {
                                  console.log("clicked");
                                  selectAddress(address);
                                 
                                }}
                                selected={
                                  address.address_id === selectedPaymentAddress
                                }
                                address={address}
                               
                              />
                            );
                          })}
                          <div id="footer-bar" className="footer-bar">
                            <div className="row w-100 p-0 d-flex align-items-center">
                              <div className="col-12 pr-1">
                                {/* <button
                                style={{border:"1px solid red",margin:"40px "}}
                                  className="btn ptb-8 btn-main float-right mt-0 add-cart-botton w-100 shadow-bg shadow-bg-s"
                                  onClick={(e) => confirmPaymentAddress(e)}
                                >
                                  {buttonsDisabled ? (
                                    "Processing..."
                                  ) : (
                                    <>
                                      <i className="bi bi-arrow-right-circle font-16"></i> &nbsp;
                                      Continue
                                    </>
                                  )}
                                </button> */}
                              
                              </div>
                            </div>
                          </div>
                        </>
                      ) : (
                        <div style={{border:"1px solid red"}}>
                          <EmptyAddress />
                          </div>
                        
                        // <h1>Empty Address</h1>
                      )}
                       {"addresses" in addresses &&
                      addresses.addresses.length !== 0 ? (
                        <div style={{display:"flex",justifyContent:"flex-end",margin:"20px 10px 0px 0px"}}>
                <IonButton onClick={handelAddAddress} shape='round' style={{width:"40%"}}>+ Add Address</IonButton>
               </div>
                      ) : null}
                       
                       <ProductsTotal />
                      {/* <div className="card card-style total-card mt-10">
                        <div className="row">
                          <div className="col-6">
                            <p>Sub Total</p>
                          </div>
                          <div className="col-6 text-right">
                            <p>
                              {"₹" +
                               
                                  cart.map(
                                    (cartItem) => cartItem.total_excluding_tax
                                  )
                                
                                  .toString()
                                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                            </p>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-6">
                            <p>GST</p>
                          </div>
                          <div className="col-6 text-right">
                            <p>
                              {"₹" +
                                (
                                
                                    cart.map((cartItem) => cartItem.total)
                                  -
                                  
                                    cart.map(
                                      (cartItem) => cartItem.total_excluding_tax
                                    )
                                 
                                )
                                  .toString()
                                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                            </p>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-12">
                            <div className="divider mtb-10"></div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-6">
                            <p>
                              <b>Total</b>
                            </p>
                          </div>
                          <div className="col-6 text-right">
                            <p>
                              <b>
                                {"₹" +
                                  cart.map((cartItem) => cartItem.total)
                                    .toString()
                                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                              </b>
                            </p>
                          </div>
                        </div>
                      </div> */}
                    
                    </div>
                  </div>
               
                </>
              ) : (

                // <Loading />
                <h1>Loading</h1>
              )
            ) : null}


           {checkoutStep === "shippingaddress" ? (
              addresses !== undefined ? (
                <>
               
                  <div className="row">
                    <div className="col-12 mt-60">
                      {"addresses" in addresses &&
                      addresses.addresses.length !== 0 ? (
                        <>
                          {addresses.addresses.map((address) => {
                            return (
                              <CartAddressCard
                                key={address.address_id}
                                onClick={() => {
                                  console.log("clicked");
                                  selectAddress(address);
                                }}
                                selected={
                                  address.address_id === selectedPaymentAddress
                                }
                                address={address}
                              />
                            );
                          })}
                          {/* <div id="footer-bar" className="footer-bar">
                            <div className="row w-100 p-0 d-flex align-items-center">
                              <div className="col-12 pr-1">
                                <button
                                style={{border:"1px solid red",margin:"40px "}}
                                  className="btn ptb-8 btn-main float-right mt-0 add-cart-botton w-100 shadow-bg shadow-bg-s"
                                  onClick={(e) => confirmShippingAddress(e)}
                                >
                                  {buttonsDisabled ? (
                                    "Processing..."
                                  ) : (
                                    <>
                                      <i className="bi bi-arrow-right-circle font-16"></i>
                                      &nbsp;
                                      Place Order ak
                                    </>
                                  )}
                                </button>
                              </div>
                            </div>
                          </div> */}
                        </>
                      ) : (
                       
                        <EmptyAddress/>
                        // <EmptyAddress></EmptyAddress>
                        
                      )}
                      {"addresses" in addresses &&
                      addresses.addresses.length !== 0 ? (
                        <div style={{display:"flex",justifyContent:"flex-end",margin:"20px 10px 0px 0px"}}>
                        <IonButton onClick={handelAddAddress} shape='round' style={{width:"40%"}}>+ Add Address</IonButton>
                       </div>
                      ) : null}

                      {/* <div className="card card-style total-card mt-10">
                        <div className="row">
                          <div className="col-6">
                            <p>Sub Total</p>
                          </div>
                          <div className="col-6 text-right">
                            <p>
                              {"₹" +
                                
                                  cart.map(
                                    (cartItem) => cartItem.total_excluding_tax
                                  )
                              
                                  .toString()
                                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                            </p>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-6">
                            <p>GST</p>
                          </div>
                          <div className="col-6 text-right">
                            <p>
                              {"₹" +
                                (
                               
                                    cart.map((cartItem) => cartItem.total)
                                 -
                                 
                                    cart.map(
                                      (cartItem) => cartItem.total_excluding_tax
                                    )
                                 
                                )
                                  .toString()
                                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                            </p>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-12">
                            <div className="divider mtb-10"></div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-6">
                            <p>
                              <b>Total</b>
                            </p>
                          </div>
                          <div className="col-6 text-right">
                            <p>
                              <b>
                                {"₹" +
                                  cart.map((cartItem) => cartItem.total)
                                    .toString()
                                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                              </b>
                            </p>
                          </div>
                        </div>
                      </div> */}
                      <ProductsTotal />
                          
                          <div style={{display:"flex",justifyContent:"center",alignItem:"center",marginTop:"20px"}}>
                          <textarea
                            onChange={(e) => setComment(e.target.value)}
                            value={commentt}
                            className="form-control rounded-xs"
                            placeholder="Comments (optional)"
                            rows="6"
                            style={{width:"90%",borderRadius:"10px"}}
                          ></textarea>
                          </div>
                         
                   
                    </div>
                  </div>
          
                </>
              ) : (
                // <Loading />
                <h1>Loading</h1>
              )
            ) : null}




    {/*  Not in use start */}
               {checkoutStep === "paymentmethod" ? (
              <>
                <div style={{ padding: "20px 10px" }}>
                  <div className="d-flex align-items-center justify-content-between">
                    <h6 style={{ color: "#565656" }} className="m-0  p-0">
                      Payment Method
                    </h6>
                  </div>
                </div>

                <div
                  style={{
                    background: "#fff",
                    padding: "20px 20px 30px 20px",
                    margin: "0 5px",
                  }}
                >
                  <div className="form-check">
                    <input
                      onChange={(e) => handleChange(e)}
                      className="form-check-input"
                      type="radio"
                      name="payment-method"
                      id=""
                      defaultChecked={true}
                    ></input>
                    <label className="form-check-label" htmlFor="">
                      Cash on Delivery
                    </label>
                  </div>
                  {/* <div className="form-check">
                        <input onChange={(e) => handleChange(e)}  className="form-check-input" type="radio" name="payment-method" id=""></input>
                        <label className="form-check-label" htmlFor="">
                            UPI
                        </label>
                    </div> */}
                </div>
              </>
            ) : null}


               {checkoutStep === "confirandpay" ? (
              <>
                <div style={{ padding: "20px 10px" }}>
                  <div className="d-flex align-items-center justify-content-between">
                    <h5 style={{ color: "#565656" }} className="m-0  p-0">
                      Total
                    </h5>
                    <h4 style={{ color: "#5956E9" }} className="m-0  p-0">
                      {"₹" +
                        cart.map((cartItem) => cartItem.total)
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    </h4>
                  </div>
                </div>
                
              </>
            ) : null}
{/*  Not in use  end*/}



            {checkoutStep === "pending" ? (
              <div style={{display:"flex",justifyContent:"center",alignItems:"center",width:"100%",height:"100%"}}>
               <IonCard style={{marginTop:"100px",borderRadius:"20px"}}>
          <IonCardContent>
          <div >
          <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
          <img src='assets/images/logo.png' alt='logo' style={{width:"123px",height:"123px",borderRadius:"30px"}} />
        </div>
        <div style={{textAlign:"center",marginTop:"20px"}}>
          <IonText style={{fontSize:"28px",fontWeight:"bold",color:"crimson"}}> Loading.....</IonText>
        </div>
          </div>
          </IonCardContent>
               </IonCard> 
               
              </div>
            ) : null}

           </IonRow>


            </IonGrid>

            
        </IonContent>
        <IonFooter >
        {    checkoutStep === "paymentaddress" ? (
              addresses !== undefined ? (
                <>
                    
        
        <IonGrid>
       <IonRow>
          
           <IonCol>
             
             <IonButton expand="full"  fill="outline" color="danger" onClick={(e) => confirmPaymentAddress(e)}  style={{height:"30px",border:"1px solid crimson"}}>
             {buttonsDisabled ? (
                               "Processing..."
                             ) : (
                               <>
                                 <i className="bi bi-arrow-right-circle font-16"></i> &nbsp;
                                 Continue
                               </>
                             )}
               </IonButton>
          
           
           </IonCol>
          </IonRow>

      
        </IonGrid>
   
          
                </>
              ) : (

                // <Loading />
                <h4>Footer</h4>
              )
            ) : null}

        {checkoutStep === "shippingaddress" ? (
              addresses !== undefined ? (
               
                 
        
        <IonGrid>
       <IonRow>
          
           <IonCol>
             
             <IonButton expand="full"  fill="outline" color="danger" onClick={(e) => confirmShippingAddress(e)}  style={{height:"30px",border:"1px solid crimson"}}>
             {buttonsDisabled ? (
                                    "Processing..."
                                  ) : (
                                    <>
                                      <i className="bi bi-arrow-right-circle font-16"></i>
                                      &nbsp;
                                      Place Order
                                    </>
                                  )}
               </IonButton>
          
           
           </IonCol>
          </IonRow>

      
        </IonGrid>
   
              ) : (
                // <Loading />
                <h1>Loading</h1>
              )
            ) : null}


             {checkoutStep === "confirandpay" ? (
              addresses !== undefined ? (
               
                 
        
        <IonGrid>
       <IonRow>
          
           <IonCol>
             
             <IonButton expand="full"  fill="outline" color="danger" disabled={buttonsDisabled} onClick={(e) => placeOrder(e)}  style={{height:"30px",border:"1px solid crimson"}}>
             {buttonsDisabled ? "Order Placing..." : "Confirm and Pay"}
               </IonButton>
          
           
           </IonCol>
          </IonRow>

      
        </IonGrid>
   
              ) : (
                // <Loading />
                <h1>Loading</h1>
              )
            ) : null}
        </IonFooter>
     
    </IonPage>
  )
}

export default OrderBook
