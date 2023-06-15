/* eslint-disable no-undef */
import React, { useContext, useEffect, useState } from "react";
import "./Login.scss";
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
import { arrowBackOutline, phonePortraitOutline, starHalfOutline } from "ionicons/icons";
import { CatalogContext, UserContext } from "../../contexts";
import { httpService } from "../../services";
const Login = () => {
  const [otp, setOtp] = useState();
  const { login, log, user } = useContext(UserContext);
  const { showToast } = useContext(CatalogContext);
  const [buttonsDisabled, setButtonsDisabled] = useState(false);
  const [resendOtp, setResendOtp] = useState(true);

  const history=useHistory();
  const [loginForm, setLoginForm] = useState({
    telephone: "",
    password: "",
  });

  const handleChange = (e) => {
    const form = { ...loginForm };
    form[e.target.name] = e.target.value;
    console.log(e.target.name,e.target.value)
    setLoginForm(form);
  };
  const loginUser = async () => {
    console.log("Login user")
    setButtonsDisabled(true);
    if (Number(loginForm.password) !== Number(otp)) {
      showToast("error", "Incorrect Otp", "");
      console.log("Incorrect Otp",otp,"loginForm.password",loginForm);
      setButtonsDisabled(false);
      return false;
    }
    const keys = Object.keys(loginForm);
    for (let i = 0; i < keys.length; i++) {
      if (loginForm[keys[i]] === "") {
        showToast("error", `${keys[i]} is required!`, "");
        setButtonsDisabled(false);
        return false;
      }
    }

    const response = await login({ telephone: loginForm.telephone });
    console.log("response", response);
    if (response && "success" in response && response.success === 1) {
      console.log("user logged in", loginForm);
      showToast("success", "user logged in Successfully!", "");
      // navigate("/home");
      localStorage.setItem("auth",true);
      history.push("/tabs/profile");
      console.log("Going to home====>")
    } else {
      setButtonsDisabled(false);
      console.log("login failed!", response);
      showToast("error", response.error[0], "");
    }
  };

  const getOtp = () => {
    console.log("Send otp click")
    setButtonsDisabled(true);
    const fetchData = async () => {
      try {
        const formData = new FormData();
        console.log("loginForm.telephone",loginForm.telephone);
        formData.append("mobile_number", loginForm.telephone);
        const { data: response } = await httpService.post(
          httpService.apiEndpoint + "get_otp",
          formData,
          { headers: { ...httpService.headers } }
        );
        if (response && "success" in response && response.success === 1) {
          showToast("success", "OTP Sent Successfully", "");
          console.log("OTP Sent Successfully",response.otp)
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
    console.log("Condition",loginForm);
    if (loginForm.telephone && loginForm.telephone.length >= 10) {
      console.log("Valid",loginForm.telephone);
      fetchData();
    } else {
      console.log("Not Valid",loginForm.telephone);
      showToast("error", "Invalid mobile number", "");
    }
    setButtonsDisabled(false);
  };

  useEffect(() => {
    if (log === 1 ) {
     console.log("Going to profile====>")
     history.push("/tabs/profile");
    }
  }, [log]);

  return (
    <IonPage>
      <HeaderSub Title={"Account Login"} />
      <IonContent
        className="explore-bg explore-page"
        forceOverscroll={false}
        style={{ backgroundColor: "#F1F1F1" }}
      >
        <IonCard style={{ marginTop: "40px" }}>
          <IonCardContent>

          
           
            <div>
              {!otp ? 
              (
                <div>
          <div style={{ textAlign: "center", margin: "20px" }}>
              <div
                style={{ fontSize: "26px", fontWeight: "bold", color: "black" }}
              >
                <IonText>Sign In</IonText>
              </div>
              <div>Enter your Credentials</div>
            </div>
            <IonList>
                <IonItem lines="none" style={{border:"1px solid grey",borderRadius:"10px"}}>
                <IonIcon slot="start" size="small" icon={phonePortraitOutline}></IonIcon>
                <input
                className="custom-input"
                placeholder="Mobile Number"
                name="telephone"
                value={loginForm.telephone}
                onChange={(e) => handleChange(e)}
             
            >
                
            </input>
            <IonText style={{color:"grey",fontSize:"11px"}} slot="end">(required)</IonText>
                </IonItem>
            
            </IonList>
           

            <div style={{ marginTop: "20px" }}>
              <IonButton expand="block" shape="round" color="danger" onClick={getOtp} disabled={buttonsDisabled}>
                Send OTP
              </IonButton>
              <div style={{ marginTop: "10px" }}>
                <Link to={"/tabs/signup"} style={{ textDecoration: "none" }}>
                  <div style={{ textAlign: "center" }}>
                    <IonText style={{ color: "grey", fontSize: "14px" }}>
                      Create Account
                    </IonText>
                  </div>
                </Link>
              </div>
            </div>
          </div>
              ) 
              : 
              (
                <div>
                  <IonIcon icon={arrowBackOutline} onClick={() => {
                          setOtp(undefined);
                          setLoginForm({ ...loginForm, password: "" });
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
                value={loginForm.password}
                onChange={(e) => handleChange(e)}
             
            >
                
            </input>
            <IonText style={{color:"grey",fontSize:"11px"}} slot="end">(required)</IonText>
                </IonItem>
            
            </IonList>
           

            <div style={{ marginTop: "20px" }}>
              <IonButton expand="block" shape="round" color="danger" onClick={loginUser}>
                Sign In
              </IonButton>
              <div style={{ marginTop: "10px" }}>
                <Link to={"/tabs/signup"} style={{ textDecoration: "none" }}>
                  <div style={{ textAlign: "center" }}>
                    <IonText style={{ color: "grey", fontSize: "14px" }}>
                      Create Account
                    </IonText>
                  </div>
                </Link>
              </div>
            </div>
          </div>
              )
              }
            </div>


          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Login;
