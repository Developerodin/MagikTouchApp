import { IonButton, IonCard, IonCardContent, IonCol, IonContent, IonGrid, IonIcon, IonItem, IonList, IonPage, IonRow, IonText } from '@ionic/react'
import React, { useContext, useEffect, useState } from 'react'
import Header from '../../components/Header/Header'
import "./ContactUs.scss"
import { callOutline, logoWhatsapp, mailOutline, pencilOutline } from 'ionicons/icons'
import { CatalogContext, SessionContext, UserContext } from '../../contexts'
import { httpService } from '../../services'
const ContactUs = () => {
    const { sessionId } = useContext(SessionContext);
  const { log, userDetails } = useContext(UserContext);
  const { showToast } = useContext(CatalogContext);
  const [contactForm, setContactForm] = useState({
    customer_id: "",
    username: "",
    mobile: "",
    subject: "",
    message: "",
  });
  const [buttonsDisabled, setButtonsDisabled] = useState(false);

  useEffect(() => {
    if (log === 1 && userDetails) {
      let form = {
        customer_id: userDetails.customer_id,
        username: userDetails.firstname + " " + userDetails.lastname,
        mobile: userDetails.telephone,
        subject: "",
        message: "",
      };
      setContactForm(form);
    }
  }, [log]);

  const handleChange = (e) => {
    const form = { ...contactForm };
    form[e.target.name] = e.target.value;
    setContactForm(form);
  };

  const sendMessage = () => {
    const sendMasg = async () => {
      let form_data = new FormData();

      for (let key in contactForm) {
        form_data.append(key, contactForm[key]);
      }
      try {
        const { data: response } = await httpService.post(
            httpService.apiEndpointLong + "feed/rest_api/send_msg",
          form_data,
          { headers: { ...httpService.headers, "X-Oc-Session": sessionId } }
        );
        console.log(response);
        if (response && "success" in response && response.success === 1) {
          showToast("success", "Message revieved!", "");
          setContactForm({
            username: "",
            mobile: "",
            subject: "",
            message: "",
          });
        } else if (
          response &&
          "success" in response &&
          response.success !== 1
        ) {
          showToast("error", "Message not sent!", "Please try again later");
        }
      } catch (error) {
        console.log("error", error);
        if (error.response) {
          showToast("error", "Message not sent!", "Please try again later");
        } else {
          showToast("error", "Message not sent!", "Please try again later");
        }
      }
    };
    const keys = Object.keys(contactForm);
    for (let i = 0; i < keys.length; i++) {
      if (contactForm[keys[i]] === "") {
        showToast("error", `${keys[i]} is required!`, "");
        setButtonsDisabled(false);
        return false;
      }
    }
    sendMasg();
    setButtonsDisabled(false);
  };

  return (
    <IonPage>
        <Header/>
        <IonContent
         className="explore-bg explore-page"
         forceOverscroll={false}
         style={{ backgroundColor: "#F1F1F1" }}>
       
       <IonCard>
          <IonCardContent>

            <IonGrid>


                <IonRow>
                   <IonCol size='12'>
                   <div>
                     <IonText style={{fontSize:"16px",fontWeight:"bold",color:"crimson"}}>Office Address</IonText><br/>
                     <IonText style={{fontSize:"24px",fontWeight:"bold",color:"black"}}>Postal Information</IonText>
                   </div>
                    </IonCol>
                    <IonCol size='12'>
                    <div>
                         <IonText style={{fontSize:"13px"}}>
                         5th floor 519, Shivalik Square, Nr. Adan CNG Pump, 132FT Ring Road, New Vadaj Ahmedabad GJ 380013 IN
                        </IonText>
                      </div>
                    </IonCol>
                </IonRow>


                <IonRow style={{marginTop:"20px"}}>
                <IonCol size='12'>
                   <div>
                     <IonText style={{fontSize:"16px",fontWeight:"bold",color:"crimson"}}>Get in Touch</IonText><br/>
                     <IonText style={{fontSize:"24px",fontWeight:"bold",color:"black"}}>Contact Information</IonText>
                   </div>
                    </IonCol>
                    <IonCol size='12'>
                        <IonList >
                            <IonItem >
                                <div style={{width:"40px",height:"100%",display:"flex",justifyContent:"start",alignItems:"center"}}>
                                <IonIcon style={{fontSize:"25px"}} color='danger' slot='start' icon={callOutline}></IonIcon>
                                </div>
                                
                                <div style={{fontSize:"14px",textAlign:"left"}}> 
                                <IonText>+91 74868 12181</IonText>
                                 </div>
                                

                                <IonButton slot="end" size='small' color="danger"  style={{width:"94px",height:"24px",padding:"3px"}}>Tap to Call</IonButton>

                            </IonItem>

                            <IonItem>
                                <div style={{width:"40px",height:"100%",display:"flex",justifyContent:"start",alignItems:"center"}}>
                                <IonIcon style={{fontSize:"25px"}} color='danger' slot='start' icon={mailOutline}></IonIcon>
                                </div>
                                
                                <div style={{fontSize:"14px",textAlign:"left"}}> 
                                <IonText>{"info@magiktouchservices.com".slice(0,15)}...</IonText>
                                 </div>
                                

                                <IonButton slot="end" size='small' color="danger"  style={{width:"94px",height:"24px",padding:"3px"}}>Tap to Mail</IonButton>

                            </IonItem>

                            <IonItem lines='none'>
                                <div style={{width:"40px",height:"100%",display:"flex",justifyContent:"start",alignItems:"center"}}>
                                <IonIcon style={{fontSize:"25px"}} color='success' slot='start' icon={logoWhatsapp}></IonIcon>
                                </div>
                                
                                <div style={{fontSize:"14px",textAlign:"left"}}> 
                                <IonText>+91 74868 12181</IonText>
                                 </div>
                                

                                <IonButton slot="end" size='small' color="danger"  style={{width:"94px",height:"24px",padding:"3px"}}>Tap to Chat</IonButton>

                            </IonItem>
                        </IonList>
                    </IonCol>
                </IonRow>



            </IonGrid>
                
            
          </IonCardContent>
       </IonCard>

       
       <IonCard style={{marginTop:"50px"}}>
        <IonCardContent>
            <IonGrid>
                <IonRow>
                <IonCol size='12'>
                   <div>
                     <IonText style={{fontSize:"16px",fontWeight:"bold",color:"crimson"}}>Feedback / Enquiries</IonText><br/>
                     <IonText style={{fontSize:"24px",fontWeight:"bold",color:"black"}}>Send A Message</IonText>
                   </div>
                    </IonCol>
                </IonRow>

                <IonRow>
                <IonList>
     <IonItem  lines="none" style={{border:"0.5px solid grey",borderRadius:"10px",margin:"10px 0px"}}>
     <IonIcon slot="start" size="small" icon={mailOutline}></IonIcon>
     <input
     className="custom-input"
     placeholder="Name"
     value={contactForm.username}
     onChange={(e) => handleChange(e)}
     name="username"
  
 >
     
 </input>
 <IonText style={{color:"grey",fontSize:"11px"}} slot="end">(required)</IonText>
     </IonItem>

     <IonItem lines="none" style={{border:"0.5px solid grey",borderRadius:"10px",margin:"20px 0px"}}>
     <IonIcon slot="start" size="small" icon={mailOutline}></IonIcon>
     <input
     className="custom-input"
     placeholder="Mobile"
     value={contactForm.mobile}
    onChange={(e) => handleChange(e)}
    name="mobile"
  
 >
     
 </input>
 <IonText style={{color:"grey",fontSize:"11px"}} slot="end">(required)</IonText>
     </IonItem>

     <IonItem lines="none" style={{border:"0.5px solid grey",borderRadius:"10px",margin:"20px 0px"}}>
     <IonIcon slot="start" size="small" icon={mailOutline}></IonIcon>
     <input
     className="custom-input"
     placeholder="Subject"
     value={contactForm.subject}
     onChange={(e) => handleChange(e)}
     name="subject"
  
 >
     
 </input>
 <IonText style={{color:"grey",fontSize:"11px"}} slot="end">(required)</IonText>
     </IonItem>

     <IonItem lines="none" style={{border:"0.5px solid grey",borderRadius:"10px",margin:"20px 0px",height:"100px"}}>
     <IonIcon slot="start" size="small" icon={pencilOutline} style={{marginTop:"-30px"}}></IonIcon>
     <textarea
     
     className="custom-input"
     placeholder="Message"
     rows="3"
     value={contactForm.message}
     onChange={(e) => handleChange(e)}
     name="message"
  
 >
     
 </textarea>
 <IonText style={{color:"grey",fontSize:"11px"}} slot="end">(required)</IonText>
     </IonItem>
 
 </IonList>

 <div style={{ marginTop: "20px",width:"100%" }}>
   <IonButton expand="full" shape="round" color="danger" disabled={buttonsDisabled}
                onClick={() => sendMessage()}
             >
     {buttonsDisabled ? "Sending..." : "Send Message"}
   </IonButton>
 </div>
                </IonRow>
            </IonGrid>
        </IonCardContent>
       </IonCard>





        </IonContent>
    </IonPage>
  )
}

export default ContactUs
