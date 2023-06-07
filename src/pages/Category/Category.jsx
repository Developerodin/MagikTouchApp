/* eslint-disable no-undef */
/* eslint-disable no-redeclare */
import { IonButton, IonCol, IonContent, IonGrid, IonIcon, IonImg, IonPage, IonRow, IonText } from '@ionic/react'
import { bagAddOutline, starOutline } from 'ionicons/icons'
import React, { useContext, useEffect, useState } from 'react'
import CategoryCard from '../../components/CategoryComp/CategoryCard'
import './Category.scss';
import HeaderSub from '../../components/Header/HeaderSub';
import { useLocation, useParams } from 'react-router';
import { httpService } from '../../services';
import { CatalogContext, SessionContext } from '../../contexts';
const Category = () => {
    const[ProductData,setProductData]=useState([]);
    const { sessionId } = useContext(SessionContext);
    const { showToast } = useContext(CatalogContext);
    const [allCategories1, setAllCategories] = useState([]);
    const [categoryProducts, setCategoryProducts] = useState([]);
    const {id}=useParams();
    const { state } = useLocation();
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
   const Data=[
        {},{},{},{},{}
    ]
   
    useEffect(() => {
      const fetchData = async () => {
        try {
          const { data: catDetails } = await httpService.get(
            httpService.apiEndpoint + "products&category=" +id,
            { headers: httpService.headers }
          );
          if (catDetails && "success" in catDetails && catDetails.success === 1) {
            console.log("Data",catDetails.data);
            setCategoryProducts(catDetails.data);
          }
        } catch (error) {
          console.log("Error in productlist page", error);
        }
      };
      if (sessionId) {
        fetchData();
      }
    }, [sessionId]);

    useEffect(()=>{
        console.log("state",state)
       const Data= allCategories.filter((el)=>{
    
            return el.id===id
        })
     
        setProductData(Data)
    },[])
  return (
    <IonPage>
        <HeaderSub Title={state ? state.name : "Category"}/>
        <IonContent className="explore-bg explore-page" forceOverscroll={ false } style={{backgroundColor:"#F1F1F1"}}>
            <IonGrid>
                <IonRow>
                  <IonCol size='12'>
               {state && <IonImg  src={state.original_image} alt='Image'></IonImg>}  
               
                  </IonCol>
                  <IonCol size='12'>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                    {state &&
                        <IonText style={{fontSize:"22px",fontWeight:"bold"}}>{state.name}</IonText>}
                        <IonButton size='small'>MTS VERIFIED</IonButton>
                    </div>

                    <div style={{color:"grey",fontSize:"14px"}}>
                        <div style={{margin:"10px 0px"}}>
                            <IonIcon style={{marginRight:"7px"}}color="warning" icon={starOutline}></IonIcon>
                            <IonText>4.5 (5k Ratings)</IonText>
                        </div>

                        <div>
                            <IonIcon style={{marginRight:"7px"}} icon={bagAddOutline}></IonIcon>
                            <IonText>123 Booking done in Surya Nagar</IonText>
                        </div>
                    </div>
                  </IonCol>
                </IonRow>

                <IonRow>
                    {
                       categoryProducts.length >0 && categoryProducts.map((el,index)=>{
                            return  <IonCol  key={index} size='12'>
                            <CategoryCard Data={el}/>
                            </IonCol>
                        })
                    }
                   
                    
                </IonRow>
            </IonGrid>
        
        
        </IonContent>
    </IonPage>
  )
}

export default Category
