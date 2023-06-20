import { IonButton, IonCard, IonCardContent, IonContent, IonIcon, IonItem, IonList, IonPage, IonText } from '@ionic/react'
import React, { useContext, useEffect, useState } from 'react'
import { CatalogContext, UserContext } from '../../contexts';
import HeaderSub from '../../components/Header/HeaderSub';
import { Link, useHistory } from 'react-router-dom';
import { atOutline, personCircleOutline } from 'ionicons/icons';
import Loading from '../../components/LoadingComp/Loading';
import "./Profile.scss"
const EditProfile = () => {
    const { userDetails, log, user, updateProfile } = useContext(UserContext);
  const [userForm, setUserForm] = useState();
  const [buttonsDisabled, setButtonsDisabled] = useState(false);
  const { showToast } = useContext(CatalogContext);
  const handleChange = (e) => {
    const form = { ...userForm };
    form[e.target.name] = e.target.value;
    setUserForm(form);
  };
const history=useHistory()
  const updateUser = async () => {
    setButtonsDisabled(true);

    const keys = Object.keys(userForm);
    for (let i = 0; i < keys.length; i++) {
      if (userForm[keys[i]] === "") {
        showToast("error", `${keys[i]} is required!`, "");
        setButtonsDisabled(false);
        return false;
      }
    }

    const response = await updateProfile(userForm);
    console.log("response", response);
    if (response && "success" in response && response.success === 1) {
      console.log("user profile updated", userForm);
      showToast("success", "Profile updated successfully!", "");
      history.goBack();
    } else {
      setButtonsDisabled(false);
      console.log("update failed!", response);
      showToast("error", response.error[0], "");
    }
  };

  useEffect(() => {
    if (log === 1 && user && userDetails) {
      console.log(userDetails);
      setUserForm({
        firstname: userDetails.firstname,
        lastname: userDetails.lastname,
        email: userDetails.email.includes("@ndmail.com")
          ? ""
          : userDetails.email,
      });
    }
  }, [log, user, userDetails]);
  return (
    <IonPage>
        <HeaderSub Title={"Edit Profile"} />
        <IonContent
        className="explore-bg explore-page"
        forceOverscroll={false}
        style={{ backgroundColor: "#F1F1F1" }}
      >
        
        
        
        {userForm ? (
        <IonCard style={{ marginTop: "40px" }}>
          <IonCardContent>

          
 <div>
 <div style={{ textAlign: "center", margin: "20px" }}>
   <div
     style={{ fontSize: "26px", fontWeight: "bold", color: "black" }}
   >
     <IonText>Account info</IonText>
   </div>
   <div> Edit your Account</div>
 </div>
 <IonList>
     <IonItem  lines="none" style={{border:"0.5px solid grey",borderRadius:"10px",margin:"10px 0px"}}>
     <IonIcon slot="start" size="small" icon={personCircleOutline}></IonIcon>
     <input
                    type="text"
                    className="custom-input"
                    id="c1"
                    placeholder="Your Name"
                    value={userForm.firstname}
                    name="firstname"
                    onChange={(e) => handleChange(e)}
                  />
 <IonText style={{color:"grey",fontSize:"11px"}} slot="end">(required)</IonText>
     </IonItem>

     <IonItem lines="none" style={{border:"0.5px solid grey",borderRadius:"10px",margin:"20px 0px"}}>
     <IonIcon slot="start" size="small" icon={personCircleOutline}></IonIcon>
     <input
                    type="text"
                    className="custom-input"
                    id="c1"
                    placeholder="Your Name"
                    value={userForm.lastname}
                    name="lastname"
                    onChange={(e) => handleChange(e)}
                  />
 <IonText style={{color:"grey",fontSize:"11px"}} slot="end">(required)</IonText>
     </IonItem>

     <IonItem lines="none" style={{border:"0.5px solid grey",borderRadius:"10px",margin:"20px 0px"}}>
     <IonIcon slot="start" size="small" icon={atOutline}></IonIcon>
     <input
                    type="text"
                    className="custom-input"
                    id="c1a"
                    placeholder="Email Address"
                    value={userForm.email}
                    name="email"
                    onChange={(e) => handleChange(e)}
                  />
 <IonText style={{color:"grey",fontSize:"11px"}} slot="end">(required)</IonText>
     </IonItem>

    
 
 </IonList>

 <div style={{ marginTop: "20px" }}>
   <IonButton expand="block" shape="round" color="danger" onClick={updateUser}
             disabled={buttonsDisabled}>
     {buttonsDisabled ? "Updating" : "Update Profile"}
   </IonButton>
   
 </div>
 </div>
         
           

          </IonCardContent>
        </IonCard>
        )
        :
        <Loading />
}
     
      

      </IonContent>
    </IonPage>
  )
}

export default EditProfile
