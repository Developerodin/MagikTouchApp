import React from 'react'
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import '@ionic/react/css/ionic-swiper.css';
import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonText } from '@ionic/react';
import ProductCard from './ProductCard';

const ProductSwiper = () => {
    const Data=[
        {title:"Bathroom Cleaning",subTitle:"Upto 5% Off",description:"No more smelly pot and sink",img:"https://mgktch.com/image/cache/catalog/home_banners/bathroom-100x100.png"},
        {title:"Car Cleaning",subTitle:"Upto 40% Off",description:"Pick-up and Delivery service available",img:"https://mgktch.com/image/cache/catalog/home_banners/car_cleaning-100x100.png"}, 
        {title:"Move-in Cleaning",subTitle:"Upto 30% Off",description:"Home and offices Deep Cleaning",img:"https://mgktch.com/image/cache/catalog/home_banners/cleaning-(2)-100x100.png"},
    ]
  return (
    <div >
  <Swiper 
    modules={[Navigation, Pagination, Scrollbar, A11y]}
    slidesPerView={1.8}
    // navigation
    pagination={{ clickable: true }}
    scrollbar={{ draggable: true }}
    style={{height:"100%",padding:"0px"}} >
         {
        Data.map((el,index)=>{
            return <SwiperSlide key={index}  >
                     
                    <ProductCard/>
                 
                 
                 </SwiperSlide>
        })
       }
    </Swiper>
    </div>
  
  )
}

export default ProductSwiper
