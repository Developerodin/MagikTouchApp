import React, { useContext, useEffect, useState } from "react";
import "./SignUp.scss";
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonContent,
  IonIcon,
  IonInput,
  IonItem,
  IonList,
  IonPage,
  IonText,
  IonTitle,
} from "@ionic/react";
import HeaderSub from "../../components/Header/HeaderSub";
import { Link, useHistory } from "react-router-dom";
import { arrowBackOutline, atOutline, personCircleOutline, phonePortraitOutline } from "ionicons/icons";
import { CatalogContext, UserContext } from "../../contexts";
import { httpService } from "../../services";
const SignUp = () => {
  const [otp, setOtp] = useState();
  const { signup, user, log } = useContext(UserContext);
  const [registration, setRegistration] = useState({
    firstname: "",
    lastname: "",
    email: "",
    telephone: "",
    agree: 1,
    fax: "",
    password: "",
  });
  const [buttonsDisabled, setButtonsDisabled] = useState(false);
  const { showToast } = useContext(CatalogContext);
    const history=useHistory();
    const handelBack=()=>{
        history.goBack();
    }
    useEffect(() => {
      if (log === 1 && user) {
        // navigate("/profile");
        console.log("To Profile >>>")
      }
    }, [log]);

    const handleChange = (e) => {
      const form = { ...registration };
      form[e.target.name] = e.target.value;
      console.log(e.target.name, e.target.value);
      setRegistration(form);
    };
  
    const register = async () => {
      console.log("Register>>>>>>>")
      setButtonsDisabled(true);
      if (Number(registration.password) !== Number(otp)) {
        showToast("error", "Incorrect Otp", "");
        setButtonsDisabled(false);
        return;
      }
      const keys = Object.keys(registration);
      let check = true;
      for (let i = 0; i < keys.length; i++) {
        if (
          registration[keys[i]] === "" &&
          keys[i] !== "fax" &&
          keys[i] !== "email"
        ) {
          showToast("error", `${keys[i]} is required!`, "");
          setButtonsDisabled(false);
          return false;
        }
      }
  
      let registerForm = { ...registration };
      if (registerForm.fax === "") {
        delete registerForm.fax;
      }
  
      delete registerForm.password;
  
      const response = await signup(registerForm);
      console.log("response", response);
      if (response && "success" in response && response.success === 1) {
        console.log("Account created", registration);
        showToast("success", "Account Created Successfully!", "");
        // navigate("/home");
        history.push("/");
        console.log("To Home>>>>>")
      } else {
        setButtonsDisabled(false);
        console.log("Sign up failed!", response);
        showToast("error", response.error[0], "");
      }
    };
  
    const getOtp = () => {
      setButtonsDisabled(true);
      const fetchData = async () => {
        try {
          const formData = new FormData();
          formData.append("mobile_number", registration.telephone);
          const { data: response } = await httpService.post(
            httpService.apiEndpoint + "get_otp",
            formData,
            { headers: { ...httpService.headers } }
          );
          if (response && "success" in response && response.success === 1) {
            console.log(response.otp);
            setOtp(response.otp);
            setButtonsDisabled(false);
          } else {
            showToast("error", "Please try again later!", "");
            setButtonsDisabled(false);
          }
        } catch (error) {
          showToast("error", "Please try again later!", "");
          setButtonsDisabled(false);
        }
      };
      if (registration.telephone && registration.telephone.length >= 10) {
        if (registration.firstname.length < 3 || registration.lastname < 3) {
          showToast("error", "Invalid First ot last name", "");
        } else {
          fetchData();
        }
      } else {
        showToast("error", "Invalid mobile number", "");
      }
      setButtonsDisabled(false);
    };
  return (
    <IonPage>
      <HeaderSub Title={"Account Registeration"} />
      <IonContent
        className="explore-bg explore-page"
        forceOverscroll={false}
        style={{ backgroundColor: "#F1F1F1" }}
      >
        
        
        
      
        <IonCard style={{ marginTop: "40px" }}>
          <IonCardContent>

            {!otp ? (
 <div>
 <div style={{ textAlign: "center", margin: "20px" }}>
   <div
     style={{ fontSize: "26px", fontWeight: "bold", color: "black" }}
   >
     <IonText>Sign Up</IonText>
   </div>
   <div>Enter your Credentials</div>
 </div>
 <IonList>
     <IonItem  lines="none" style={{border:"0.5px solid grey",borderRadius:"10px",margin:"10px 0px"}}>
     <IonIcon slot="start" size="small" icon={personCircleOutline}></IonIcon>
     <input
     className="custom-input"
     placeholder="First Name"
     value={registration.firstname}
     onChange={(e) => handleChange(e)}
     name="firstname"
  
 >
     
 </input>
 <IonText style={{color:"grey",fontSize:"11px"}} slot="end">(required)</IonText>
     </IonItem>

     <IonItem lines="none" style={{border:"0.5px solid grey",borderRadius:"10px",margin:"20px 0px"}}>
     <IonIcon slot="start" size="small" icon={personCircleOutline}></IonIcon>
     <input
     className="custom-input"
     placeholder="Last Name"
     value={registration.lastname}
     onChange={(e) => handleChange(e)}
     name="lastname"
  
 >
     
 </input>
 <IonText style={{color:"grey",fontSize:"11px"}} slot="end">(required)</IonText>
     </IonItem>

     <IonItem lines="none" style={{border:"0.5px solid grey",borderRadius:"10px",margin:"20px 0px"}}>
     <IonIcon slot="start" size="small" icon={atOutline}></IonIcon>
     <input
     className="custom-input"
      placeholder="Email Address"
      value={registration.email}
      onChange={(e) => handleChange(e)}
      name="email"
  
 >
     
 </input>
 <IonText style={{color:"grey",fontSize:"11px"}} slot="end">(required)</IonText>
     </IonItem>

     <IonItem lines="none" style={{border:"0.5px solid grey",borderRadius:"10px",margin:"20px 0px"}}>
     <IonIcon slot="start" size="small" icon={personCircleOutline}></IonIcon>
     <input
     className="custom-input"
      placeholder="Phone Number"
      value={registration.telephone}
      onChange={(e) => handleChange(e)}
      name="telephone"
  
 >
     
 </input>
 <IonText style={{color:"grey",fontSize:"11px"}} slot="end">(required)</IonText>
     </IonItem>

     <IonItem lines="none" style={{border:"0.5px solid grey",borderRadius:"10px",margin:"20px 0px"}}>
     <IonIcon slot="start" size="small" icon={personCircleOutline}></IonIcon>
     <input
     className="custom-input"
      placeholder="Reference ID"
      value={registration.fax}
      onChange={(e) => handleChange(e)}
      name="fax"
      
  
 >
     
 </input>
 <IonText style={{color:"grey",fontSize:"11px"}} slot="end">(required)</IonText>
     </IonItem>
 
 </IonList>

 <div style={{ marginTop: "20px" }}>
   <IonButton expand="block" shape="round" color="danger" onClick={getOtp}
             disabled={buttonsDisabled}>
     Send OTP
   </IonButton>
   <div style={{ marginTop: "10px" }}>
     
       <div style={{ textAlign: "center" }} onClick={handelBack}>
         <IonText style={{ color: "grey", fontSize: "14px" }}>
           Login Account
         </IonText>
       </div>
    
   </div>
 </div>
 </div>
            )
          :
          (
            <div>
            <IonIcon icon={arrowBackOutline} onClick={() => {
                    setOtp(undefined);
                    setRegistration({ ...registration, password: "" });
                  }}
            ></IonIcon>
       <div style={{ textAlign: "center", margin: "20px" }}>
        <div
          style={{ fontSize: "26px", fontWeight: "bold", color: "black" }}
        >
          <IonText>Enter OTP</IonText>
        </div>
        <div>Enter your Credentials</div>
      </div>
      <IonList>
          <IonItem lines="none" style={{border:"1px solid grey",borderRadius:"10px"}}>
          <IonIcon slot="start" size="small" icon={phonePortraitOutline}></IonIcon>
          <input
          className="custom-input"
          placeholder="OTP"
          name="password"
          value={registration.password}
          onChange={(e) => handleChange(e)}
       
      >
          
      </input>
      <IonText style={{color:"grey",fontSize:"11px"}} slot="end">(required)</IonText>
          </IonItem>
      
      </IonList>
     

      <div style={{ marginTop: "20px" }}>
        <IonButton expand="block" shape="round" color="danger" onClick={register}>
          Sign Up
        </IonButton>
        <div style={{ marginTop: "10px" }}>
          <Link to={"/tabs/signup"} style={{ textDecoration: "none" }}>
            <div style={{ textAlign: "center" }} onClick={handelBack}>
              <IonText style={{ color: "grey", fontSize: "14px" }} >
                Log in
              </IonText>
            </div>
          </Link>
        </div>
      </div>
    </div>
          )}
           
           

          </IonCardContent>
        </IonCard>
       
     
      

      </IonContent>
    </IonPage>
  );
};

export default SignUp;

