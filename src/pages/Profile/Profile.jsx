import { IonActionSheet, IonButton, IonCard, IonCardContent, IonCol, IonContent, IonGrid, IonIcon, IonItem, IonLabel, IonList, IonModal, IonPage, IonRow, IonText, IonTitle } from '@ionic/react'
import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../contexts';
import { useHistory } from 'react-router';
import "./Profile.scss"
import HeaderSub from '../../components/Header/HeaderSub';
import { calendarOutline, caretForwardOutline, earthOutline, informationCircle, locationOutline, logOutOutline, personOutline, refreshOutline, shareSocialOutline, star, starOutline, trashOutline } from 'ionicons/icons';
import ProfileListItem from './ProfileListItem';
const Profile = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const ProfileTabs=[
    {icon:locationOutline,title:"Manage Address",link:"/manage-address",color:"success"},
    {icon:refreshOutline,title:"Order History",link:"/tabs/orders",color:"dark"},
    {icon:calendarOutline,title:"Pending Orders",link:"/tabs/orders",color:"tertiary"},
    {icon:personOutline,title:"About Company",link:"/about-us",color:"warning"},
    {icon:earthOutline,title:"Terms & Conditions",link:"/terms-conditions",color:"danger"},
  ]
  const { log, userDetails } = useContext(UserContext);
  const history=useHistory();
  useEffect(() => {
    console.log("Log in profile",log)
    if (log === 0) {
      history.push("/tabs/login");
    }
    else if (log === 1 ) {
      
      history.push("/tabs/profile");
    }
    
  }, [log]);

  const handelLogout =()=>{
// console.log("Logged out")
localStorage.clear();
history.push("/");
window.location.reload();
  }

  const handelDeleteAccount=()=>{
    console.log("Delete Account");
  }

  return (
    <IonPage>
      <HeaderSub Title="Profile"/>
        <IonContent
        className="explore-bg explore-page"
        forceOverscroll={false}
        style={{ backgroundColor: "#F1F1F1" }}
        >
          <div style={{display:"flex",justifyContent:"center",alignItems:"center",marginBottom:"-190px",position:"relative",zIndex:"2",marginTop:"30px"}} >
      <img style={{width:"150px",height:"150px",aspectRatio:"auto 150 / 150",borderRadius:"50%",boxShadow:"0 12px 15px 0 rgba(0, 0, 0, 0.18)"}} src='assets/images/User_Logo.jpeg' alt='user Image'/>
    </div>
        <IonCard style={{marginTop:"90px",borderRadius:"20px"}}>
   <IonCardContent >
    <IonGrid style={{marginTop:"110px"}}>
      <IonRow >
        <IonCol>
          
         <div style={{fontSize:"20px",fontWeight:"bold",textAlign:"center"}}>
          {
            userDetails && <IonText>{userDetails.firstname} {userDetails.lastname}</IonText>
          }
          
         </div>
         <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
          <IonButton style={{width:"70%"}} color="tertiary" shape='round'>Edit</IonButton>
         </div>
          </IonCol>
      </IonRow>

       <IonRow>
        <IonCol size='12'>
        <IonList>


                {
                  ProfileTabs.map((el,index)=>{
                    return <ProfileListItem key={index} Data={el} />
                  })
                }

                <IonItem button style={{marginTop:"10px"}}>
                  <IonIcon icon={shareSocialOutline} color='dark' slot="start"></IonIcon>
                  <IonLabel>Share App</IonLabel>
                  {/* <IonIcon icon={caretForwardOutline}  slot="end"></IonIcon> */}
                </IonItem>

                <IonItem button style={{marginTop:"10px"}} onClick={() => setIsDeleteOpen(true)}>
                  <IonIcon icon={trashOutline}  slot="start"></IonIcon>
                  <IonLabel>Delete Account</IonLabel>
                  {/* <IonIcon icon={caretForwardOutline} slot="end"></IonIcon> */}
                </IonItem>

                <IonItem button style={{marginTop:"10px"}}>
                  <IonIcon icon={starOutline} color="success" slot="start"></IonIcon>
                  <IonLabel>Rate Magik Touch</IonLabel>
                  {/* <IonIcon icon={caretForwardOutline} slot="end"></IonIcon> */}
                </IonItem>

                <IonItem  lines='none' style={{marginTop:"10px"}} onClick={() => setIsOpen(true)}>
                  <IonIcon icon={logOutOutline} color="danger" slot="start"></IonIcon>
                  <IonLabel>Logout</IonLabel>
                  {/* <IonIcon icon={caretForwardOutline} slot="end"></IonIcon> */}
                </IonItem>
        
      
        </IonList>
        </IonCol>
        
       </IonRow>

    </IonGrid>
    
   </IonCardContent>
        </IonCard>

        <IonActionSheet
        isOpen={isOpen}
        header="MagikTouch"
        buttons={[
          {
            text: 'Logout',
            role: 'destructive',
            data: {
              action: 'logout',
            },
          },
         
          {
            text: 'Cancel',
            role: 'cancel',
            data: {
              action: 'cancel',
            },
          },
        ]}
        onDidDismiss={() => {
        const action = event.detail.data?.action;

              if (action === 'logout') {
             // Call your logout function here
                   handelLogout();
    }
          setIsOpen(false)
        
        }}
      ></IonActionSheet>


      <IonModal isOpen={isDeleteOpen} onDidDismiss={()=>setIsDeleteOpen(false)}   initialBreakpoint={0.25} breakpoints={[0.25]}>
          <IonContent className="ion-padding">
            
            <IonList>
              <IonItem>
                <IonButton expand='block' style={{width:"100%",height:"50px"}} onClick={handelDeleteAccount} color="danger">Delete</IonButton>
              </IonItem>

              <IonItem lines='none' style={{marginTop:"20px"}}>
                <IonButton expand='block' style={{width:"100%",height:"50px"}} color="light" onClick={()=>setIsDeleteOpen(false)}>Cancel</IonButton>
              </IonItem>
              
            </IonList>
          </IonContent>
        </IonModal>
        </IonContent>
    </IonPage>
  )
}

export default Profile