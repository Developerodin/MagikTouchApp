import { IonContent, IonPage } from '@ionic/react'
import React, { useContext, useEffect, useState } from 'react'
import Header from '../../components/Header/Header'
import ServicesCard from './ServicesCard'
import { CatalogContext, SessionContext } from '../../contexts'
import { httpService } from '../../services'



const Service = () => {
    const allCategories=[
        {id:"1",original_image:"https://mgktch.com/image/catalog/logo-1.png",name:"offers near you",description:""},
        {id:"2",original_image:"https://mgktch.com/image/catalog/Service%20Categories/Air%20Conditioner%20Repair.jpg",name:"AC Services",description:"hellow there"},
        {id:"3",original_image:"https://mgktch.com/image/catalog/Service%20Categories/Bathroom%20Cleaning.jpg",name:"Bathroom Cleaning",description:"hellow there"},
        {id:"4",original_image:"https://mgktch.com/image/catalog/Service%20Categories/car%20cleaning.jpg",name:"Car Cleaning Services",description:"hellow there"},
        {id:"5",original_image:"https://mgktch.com/image/catalog/Service%20Categories/Home%20cleaning.jpg",name:"Home Deep Services",description:"hellow there"},
        {id:"6",original_image:"https://mgktch.com/image/catalog/Service%20Categories/kitchen%20cleaning.jpg",name:"Kitchen Cleaning",description:"hellow there"},
        {id:"7",original_image:"https://mgktch.com/image/catalog/Service%20Categories/office%20cleaning.jpg",name:"Office & amp Retail Shops",description:"hellow there"},
        {id:"8",original_image:"https://mgktch.com/image/catalog/Service%20Categories/sofa%20cleaning.jpg",name:"Sofa & amp Carpet Cleaning",description:"hellow there"},
        {id:"9",original_image:"https://mgktch.com/image/catalog/Service%20Categories/Electrician.jpg",name:"Electrician",description:"hellow there"},
        {id:"10",original_image:"https://mgktch.com/image/catalog/Service%20Categories/Pest%20Control.jpg",name:"Pest control",description:"hellow there"},
        {id:"11",original_image:"https://mgktch.com/image/catalog/Service%20Categories/Plumber.jpg",name:"Plumbing Services",description:"hellow there"},
        {id:"12",original_image:"https://mgktch.com/image/catalog/Service%20Categories/RO%20Services%20&%20Repairs.jpg",name:"RO Services",description:"hellow there"},
    ]

    const {productsList,topBanners}=useContext(CatalogContext);
    const { sessionId } = useContext(SessionContext);
    const { showToast } = useContext(CatalogContext);
    const [allCategories1, setAllCategories] = useState([]);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const { data: allCats } = await httpService.get(
            httpService.apiEndpoint + "categories",
            { headers: httpService.headers }
          );
          console.log("allcats",allCats);
          if (allCats && "success" in allCats && allCats.success === 1) {
            setAllCategories(allCats.data);
          }
        } catch (error) {
          console.log("error");
          // showToast("error", "Somrthing went wrong!", "");
        }
      };
      console.log("Session id 2", sessionId);
      if (sessionId) {
        fetchData();
      }
    }, [sessionId]);


    useEffect(()=>{
    //  console.log("Product List",productsList);
     console.log("topBanners List",topBanners);
    console.log("In Services is it working")
    },[])
  return (
   <IonPage>
    <Header/>
    <IonContent className="explore-bg explore-page"
        forceOverscroll={false}
        style={{ backgroundColor: "#F1F1F1" }}>
        {
          sessionId &&  allCategories1.map((category,index) => {
              
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
