import React from 'react';


import {
  IonPage, IonContent, IonRow, IonCol, IonHeader, IonTitle, IonToolbar, IonGrid, IonCard, IonCardContent, IonText, IonIcon, IonCardHeader, IonCardTitle, IonCardSubtitle
} from '@ionic/react';

// import * as swing from 'swing';
// import ReactSwing from 'react-swing';
import './Explore.scss';
import RippleLoader from '../../components/RippleLoader/RippleLoader';
import USERS from './users.dummy';
import { RouteComponentProps } from 'react-router';
import { calendarClearOutline, linkOutline, listOutline, shieldCheckmarkOutline, thumbsUpOutline } from 'ionicons/icons';

import Header from '../../components/Header/Header';
import HomeSwiper from '../../components/ExploreComp/HomeSwiper';
import { Link } from 'react-router-dom';



const ServicesData=[
  {icon:"https://mgktch.com/image/cache/catalog/home_banners/bunglow-100x100.png",title:"Bunglow Cleaning"},
  {icon:"https://mgktch.com/image/cache/catalog/home_banners/car_cleaning-100x100.png",title:"Car Cleaning"},
  {icon:"https://mgktch.com/image/cache/catalog/home_banners/bathroom-100x100.png",title:"Toilet Cleaning"},
  {icon:"https://mgktch.com/image/cache/catalog/home_banners/cleaning-(2)-100x100.png",title:"Deep Cleaning"},
  {icon:"https://mgktch.com/image/cache/catalog/home_banners/kitchen-100x100.png",title:"Kitchen Cleaning"},
  {icon:"https://mgktch.com/image/cache/catalog/home_banners/office-100x100.png",title:"Office Cleaning"},
]


const OtherServicesData=[
  {img:"https://mgktch.com/image/cache/catalog/Service%20Categories/Electrician-100x100.jpg",title:"Electrician"},
  {img:"https://mgktch.com/image/cache/catalog/Service%20Categories/Pest%20Control-100x100.jpg",title:"Pest control"},
  {img:"https://mgktch.com/image/cache/catalog/Service%20Categories/Plumber-100x100.jpg",title:"Plumbing Services"},
  {img:"https://mgktch.com/image/cache/catalog/Service%20Categories/RO%20Services%20&%20Repairs-100x100.jpg",title:"Ro Services"},
  
]


const Explore=()=> {
  
  

    
    
    return (
      <IonPage>
      <Header/>
      
        <IonContent className="explore-bg explore-page" forceOverscroll={ false } style={{backgroundColor:"#F1F1F1"}}>
            <IonGrid >
              
              <IonRow style={{padding:"10px"}} >
                
                <IonCol size='12' style={{border:"1px solid blue",borderRadius:"40px",height:"210px",backgroundColor:"#193568"}}>
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
                  <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
                  <img style={{width:"60px",height:"60px"}}  src={el.icon} alt='img'/>
                 
                  </div>
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
                                      <div style={{height:"80%"}}>
                                      <img style={{width:"100%"}} alt="Silhouette of mountains" src={el.img} />
                                      </div>
                                    

                                    <div style={{marginTop:"-30px",padding:"0px"}}>
                                      
                                      <p>{el.title}</p>
                                      <Link to="#" style={{color:"grey",fontSize:"12px"}}>View Details</Link>
                                      
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
