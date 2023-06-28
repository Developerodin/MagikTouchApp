import React, { useContext, useEffect, useState } from 'react';


import {
  IonPage, IonContent, IonRow, IonCol, IonHeader, IonTitle, IonToolbar, IonGrid, IonCard, IonCardContent, IonText, IonIcon, IonCardHeader, IonCardTitle, IonCardSubtitle, useIonViewDidEnter
} from '@ionic/react';

// import * as swing from 'swing';
// import ReactSwing from 'react-swing';
import './Explore.scss';
import RippleLoader from '../../components/RippleLoader/RippleLoader';
import USERS from './users.dummy';
import { RouteComponentProps, useHistory } from 'react-router';
import { calendarClearOutline, linkOutline, listOutline, shieldCheckmarkOutline, thumbsUpOutline } from 'ionicons/icons';

import Header from '../../components/Header/Header';
import HomeSwiper from '../../components/ExploreComp/HomeSwiper';
import { Link } from 'react-router-dom';
import { CatalogContext } from '../../contexts';
import { App as MainApp } from '@capacitor/app';


const ServicesData=[
  {icon:"https://mgktch.com/image/catalog/home_banners/bunglow.png",title:"Bunglow Cleaning",url:"/category/78"},
  {icon:"https://mgktch.com/image/catalog/home_banners/car_cleaning.png",title:"Car Cleaning",url:"/category/81"},
  {icon:"https://mgktch.com/image/catalog/home_banners/bathroom.png",title:"Toilet Cleaning",url:"/category/77"},
  {icon:"https://mgktch.com/image/catalog/home_banners/cleaning-(2).png",title:"Deep Cleaning",url:"/category/78"},
  {icon:"https://mgktch.com/image/catalog/home_banners/kitchen.png",title:"Kitchen Cleaning",url:"/category/80"},
  {icon:"https://mgktch.com/image/catalog/home_banners/office.png",title:"Office Cleaning",url:"/category/83"},
]


const OtherServicesData=[
  {img:"https://mgktch.com/image/catalog/Service%20Categories/Electrician.jpg",title:"Electrician",url:"/category/117"},
  {img:"https://mgktch.com/image/catalog/Service%20Categories/Pest%20Control.jpg",title:"Pest control",url:"/category/116"},
  {img:"https://mgktch.com/image/catalog/Service%20Categories/Plumber.jpg",title:"Plumbing Services",url:"/category/118"},
  {img:"https://mgktch.com/image/catalog/Service%20Categories/RO%20Services%20&%20Repairs.jpg",title:"Ro Services",url:"/category/119"},
  
]


const Explore=()=> {
  const [backPressCount, setBackPressCount] = useState(0);
const history=useHistory();
  useEffect(() => {
    

    const backButtonHandler = async () => {
      if (backPressCount < 1) {
        setBackPressCount(1);
        setTimeout(() => {
          setBackPressCount(0);
        }, 2000); // Reset the counter after 2 seconds
      } else {
        await MainApp.exitApp(); // Exit the app using the App plugin
      }
    };

    MainApp.addListener('backButton', backButtonHandler);

    return () => {
      MainApp.removeAllListeners('backButton');
    };
  }, [backPressCount]);
    



    
    return (
      <IonPage>
      <Header/>
      
        <IonContent className="explore-bg explore-page" forceOverscroll={ false } style={{backgroundColor:"#F1F1F1"}}>
            <IonGrid >
              
              <IonRow style={{padding:"10px"}} >
                
                <IonCol size='12' style={{borderRadius:"40px",padding:"0px"}}>
                <HomeSwiper/>
                </IonCol>
         
              </IonRow>

              <div style={{textAlign:"center",marginTop:"30px",fontWeight:"bold"}}>
              <IonText>Featured Cleaning Services</IonText>
              </div>
              
              <IonRow style={{marginTop:"30px"}}>
                {
                  ServicesData.map((el,index)=>{
                    return (
                 <IonCol key={index} size='4' >
                  <Link  to={el.url}>
                  
                  <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
                  <img style={{width:"60px",height:"60px"}}  src={el.icon} alt='img'/>
                 
                  </div>
                  </Link>
                  <IonText style={{display:"flex",fontSize:"12px",justifyContent:"center",alignItems:"center",marginTop:"10px"}}>{el.title}</IonText>
                  
                </IonCol>
                    )
                  })
                }
                
              </IonRow>


             

              <IonRow >
                <IonCol style={{padding:"0px"}}>
                <IonCard   style={{backgroundColor:"#193568",margin:"20px 0px 0px",fontWeight:"bold",textAlign:"center",borderRadius:"40px 40px 0px 0px"}}>
              <IonCardContent style={{margin:"0px",padding:"0px"}}>
                <div style={{marginTop:"20px",lineHeight:"34px"}}>
                <IonText color="light">Other Essential Services</IonText><br/>
                    <IonText style={{fontWeight:"300",fontSize:"16px"}} color="light">Choose from the selected deals near you</IonText>
                </div>
                    




                    <IonGrid>
                      <IonRow >

                        {
                          OtherServicesData.map((el,index)=>{
                                 return (
                                  <IonCol size='6' key={index}  >
                                    <IonCard style={{margin:"0px",padding:"0px"}}>
                                      <div style={{width:"100%",height:"150px"}}>
                                      <img style={{width:"100%",height:"100%"}} alt="Silhouette of mountains" src={el.img} />
                                      </div>
                                    

                                    <div style={{marginTop:"10px",padding:"0px"}}>
                                      
                                      <p>{el.title}</p>
                                      <Link to={el.url} style={{color:"grey",fontSize:"12px"}}>View Details</Link>
                                      
                                      </div>
                                      </IonCard>
                                  {/* <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
                                  <img  src={el.img} alt='img'/>
                                 
                                  </div>
                                  <IonText style={{display:"flex",fontSize:"12px",justifyContent:"center",alignItems:"center",marginTop:"10px"}}>{el.title}</IonText> */}
                                  
                                </IonCol>
                                 )
                          })
                        }
                      </IonRow>
                   

                      <IonRow style={{marginTop:"20px"}}>
                        <IonCol >
                          <IonIcon color='light' size="large" icon={thumbsUpOutline}></IonIcon>
                          <div style={{fontSize:"10px",fontWeight:"bold"}}>
                          <IonText color='light'>Expert Workers</IonText>
                          </div>
                          
                          
                          </IonCol>
                        <IonCol>
                          
                          <IonIcon color='light' size="large" icon={calendarClearOutline}></IonIcon>
                          <div style={{fontSize:"10px",fontWeight:"bold"}}>
                          <IonText color='light'>Timely Delivered</IonText>
                          </div>
                          </IonCol>
                        <IonCol>
                          
                          <IonIcon color='light' size="large" icon={shieldCheckmarkOutline}></IonIcon>
                          <div style={{fontSize:"10px",fontWeight:"bold"}}>
                          <IonText color='light'>Verified Services</IonText>
                          </div>
                          </IonCol>
                      </IonRow>
                    </IonGrid>


              </IonCardContent>
            </IonCard>
                </IonCol>
              </IonRow>

            </IonGrid>


          




           
       
         


         
          
        </IonContent>

       

       
      </IonPage>
    );
  }



export default (Explore);
