import React from "react";
import "./Cart.scss";
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCol,
  IonContent,
  IonFooter,
  IonGrid,
  IonIcon,
  IonInput,
  IonItem,
  IonList,
  IonPage,
  IonRow,
  IonText,
  IonTitle,
} from "@ionic/react";
import HeaderSub from "../../components/Header/HeaderSub";
import { Link } from "react-router-dom";
import { phonePortraitOutline, starHalfOutline } from "ionicons/icons";
import CartCard from "../../components/CartComp/CartCard";
const Cart = () => {

const CartData=[
        {id:"2",Img:"https://mgktch.com/image/catalog/Service%20Categories/Air%20Conditioner%20Repair.jpg",title:"AC Services",price:"2,302"},
        {id:"3",Img:"https://mgktch.com/image/catalog/Service%20Categories/Bathroom%20Cleaning.jpg",title:"Bathroom Cleaning",price:"2,302"},
        {id:"4",Img:"https://mgktch.com/image/catalog/Service%20Categories/car%20cleaning.jpg",title:"Car Cleaning Services",price:"2,302"},
        {id:"5",Img:"https://mgktch.com/image/catalog/Service%20Categories/Home%20cleaning.jpg",title:"Home Deep Services",price:"2,302"},
        {id:"6",Img:"https://mgktch.com/image/catalog/Service%20Categories/kitchen%20cleaning.jpg",title:"Kitchen Cleaning",price:"2,302"},
        {id:"7",Img:"https://mgktch.com/image/catalog/Service%20Categories/office%20cleaning.jpg",title:"Office & amp Retail Shops",price:"2,302"},
        {id:"8",Img:"https://mgktch.com/image/catalog/Service%20Categories/sofa%20cleaning.jpg",title:"Sofa & amp Carpet Cleaning",price:"2,302"},
        {id:"9",Img:"https://mgktch.com/image/catalog/Service%20Categories/Electrician.jpg",title:"Electrician",price:"2,302"},
        {id:"10",Img:"https://mgktch.com/image/catalog/Service%20Categories/Pest%20Control.jpg",title:"Pest control",price:"2,302"},
        {id:"11",Img:"https://mgktch.com/image/catalog/Service%20Categories/Plumber.jpg",title:"Plumbing Services",price:"2,302"},
        {id:"12",Img:"https://mgktch.com/image/catalog/Service%20Categories/RO%20Services%20&%20Repairs.jpg",title:"RO Services",price:"2,302"},
]

  return (
    <IonPage>
      <HeaderSub Title={"My Cart"} />
      <IonContent
        className="explore-bg explore-page"
        forceOverscroll={false}
        style={{ backgroundColor: "#F1F1F1" }}
      >
     
        {
        CartData.map((el,index)=>{
            return  <CartCard key={index}  Data={el}/>
           
        })
      }
     
     <IonCard>
        <IonCardContent>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",fontWeight:"bold"}}>
                <div>
                    <IonText>SUB TOTAL</IonText>
                </div>
                <div>
                <IonText>₹ 2,302</IonText>
                </div>
            </div>

            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",margin:"10px 0px",fontWeight:"bold"}}>
                <div>
                    <IonText>GST</IonText>
                </div>
                <div>
                <IonText>₹ 30</IonText>
                </div>
            </div>
            <div style={{borderTop:"0.5px dashed grey"}}>

            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginTop:"20px",fontWeight:"bold"}}>
                <div>
                    <IonText>TOTAL</IonText>
                </div>
                <div>
                <IonText>₹ 2,332</IonText>
                </div>
            </div>

            </div>
        </IonCardContent>
     </IonCard>
     
      </IonContent>
      <IonFooter>
      <IonGrid>
            <IonRow>
                {/* <IonCol>
                <IonButton  expand="block"   style={{borderRadius:"20px",height:"30px"}} color="danger">Book Now</IonButton>
                </IonCol> */}
                <IonCol>
                  <Link to={"/book"} style={{textDecoration:"none"}}>
                  <IonButton expand="full"  fill="outline" color="danger"  style={{height:"30px",border:"1px solid crimson"}}>CHECKOUT NOW</IonButton>
                  </Link>
                
                </IonCol>
            </IonRow>
        </IonGrid>
      </IonFooter>
    </IonPage>
  );
};

export default Cart;
