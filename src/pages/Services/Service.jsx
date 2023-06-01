import { IonContent, IonPage } from '@ionic/react'
import React from 'react'
import Header from '../../components/Header/Header'
import ServicesCard from './ServicesCard'



const Service = () => {
    const allCategories=[
        {original_image:"https://mgktch.com/image/cache/catalog/logo-1-100x100.png",name:"offers near you",description:""},
        {original_image:"https://mgktch.com/image/cache/catalog/Service%20Categories/Air%20Conditioner%20Repair-100x100.jpg",name:"AC Services",description:"hellow there"},
        {original_image:"https://mgktch.com/image/cache/catalog/Service%20Categories/Bathroom%20Cleaning-100x100.jpg",name:"Bathroom Cleaning",description:"hellow there"},
        {original_image:"https://mgktch.com/image/cache/catalog/Service%20Categories/car%20cleaning-100x100.jpg",name:"Car Cleaning Services",description:"hellow there"},
        {original_image:"https://mgktch.com/image/cache/catalog/Service%20Categories/Home%20cleaning-100x100.jpg",name:"Home Deep Services",description:"hellow there"},
        {original_image:"https://mgktch.com/image/cache/catalog/Service%20Categories/kitchen%20cleaning-100x100.jpg",name:"Kitchen Cleaning",description:"hellow there"},
        {original_image:"https://mgktch.com/image/cache/catalog/Service%20Categories/office%20cleaning-100x100.jpg",name:"Office & amp Retail Shops",description:"hellow there"},
        {original_image:"https://mgktch.com/image/cache/catalog/Service%20Categories/sofa%20cleaning-100x100.jpg",name:"Sofa & amp Carpet Cleaning",description:"hellow there"},
        {original_image:"https://mgktch.com/image/cache/catalog/Service%20Categories/Electrician-100x100.jpg",name:"Electrician",description:"hellow there"},
        {original_image:"https://mgktch.com/image/cache/catalog/Service%20Categories/Pest%20Control-100x100.jpg",name:"Pest control",description:"hellow there"},
        {original_image:"https://mgktch.com/image/cache/catalog/Service%20Categories/Plumber-100x100.jpg",name:"Plumbing Services",description:"hellow there"},
        {original_image:"https://mgktch.com/image/cache/catalog/Service%20Categories/RO%20Services%20&%20Repairs-100x100.jpg",name:"RO Services",description:"hellow there"},
    ]
  return (
   <IonPage>
    <Header/>
    <IonContent style={{backgroundColor:"#F1F1F1"}}>
        {
            allCategories.map((category,index) => {
              
                  return (
                    <div key={index}>
                         <ServicesCard  Data={category}/>
                    </div>
                   
                  );
             
              })
        }
    </IonContent>
   </IonPage>
  )
}

export default Service
