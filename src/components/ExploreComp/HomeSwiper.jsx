import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import '@ionic/react/css/ionic-swiper.css';
import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonText } from '@ionic/react';

const HomeSwiper = () => {
    const Data=[
        {title:"Bathroom Cleaning",subTitle:"Upto 5% Off",description:"No more smelly pot and sink",img:"https://mgktch.com/image/cache/catalog/home_banners/bathroom-100x100.png"},
        {title:"Car Cleaning",subTitle:"Upto 40% Off",description:"Pick-up and Delivery service available",img:"https://mgktch.com/image/cache/catalog/home_banners/car_cleaning-100x100.png"}, 
        {title:"Move-in Cleaning",subTitle:"Upto 30% Off",description:"Home and offices Deep Cleaning",img:"https://mgktch.com/image/cache/catalog/home_banners/cleaning-(2)-100x100.png"},
    ]
  return (
  

    
    <Swiper style={{height:"100%",padding:"0px"}} >
         {
        Data.map((el,index)=>{
            return <SwiperSlide key={index}  >
                     <div style={{height:"100%",color:"#FFF",fontWeight:"bold",fontSize:"24px",textAlign:"end",width:"100%",lineHeight:"34px",marginRight:"10px",display:"flex",justifyContent:"space-between"}}>
                      <div style={{display:"flex",alignItems:"flex-end"}}>
                      <img src={el.img} style={{width:"120px",height:"120px"}} alt="img"/>
                      </div>
                      
                       <div>
                       <IonText>{el.title}</IonText><br/>
                            <IonText >{el.subTitle}</IonText><br/>
                            
                            <span style={{fontSize:"14px",display:"flex",lineHeight:"1",width:"145px",margin:"10px 10px 0px auto"}}>{el.description}</span><br/>
                            
                            <div style={{marginTop:"-20px"}}>
                            <IonButton shape='round' color="light" size='small'>Boook Now</IonButton>
                            </div>
                       </div>
                            
                            
                      
                     </div>
       
                 
                 
                 </SwiperSlide>
        })
       }
    </Swiper>
  
      
  )
 
}

export default HomeSwiper
