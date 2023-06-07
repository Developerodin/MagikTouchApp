/* eslint-disable react/prop-types */
import React, { useContext } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import '@ionic/react/css/ionic-swiper.css';
import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonText } from '@ionic/react';
import { CatalogContext } from '../../contexts';

const HomeSwiper = () => {
    const {topBanners}=useContext(CatalogContext);
  return (
  

    
    <Swiper style={{height:"100%",padding:"0px"}} >
         {
        topBanners.map((el,index)=>{
            return <SwiperSlide key={index} >
                    
                      
                      <img src={el.image} style={{width:"100%",height:"100%",borderRadius:"30px"}} alt="img"/>
                     
                   
       
                 
                 
                 </SwiperSlide>
        })
       }
    </Swiper>
  
      
  )
 
}

export default HomeSwiper
