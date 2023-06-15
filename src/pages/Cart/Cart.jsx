import React, { useContext, useState } from "react";
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
import { CartContext, CatalogContext } from "../../contexts";
import CartTotal from "../../components/CartComp/CartTotal";
import EmptyCart from "./EmptyCart";
const Cart = () => {
  const { cart, deleteFromCart, updateQuantity } = useContext(CartContext);
  const { getProductFromProductsList } = useContext(CatalogContext);
  const [buttonsDisabled, setButtonsDisabled] = useState(false);
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
      {cart && cart.length !== 0 ? <HeaderSub Title={"My Cart"} /> : <HeaderSub Title={"Cart Is Empty"} />}
      
      
      <IonContent
        className="explore-bg explore-page"
        forceOverscroll={false}
        style={{ backgroundColor: "#F1F1F1" }}
      >
        {cart && cart.length !== 0 ? 
        <>
        {
        cart.length!==0 && cart.map((el,index)=>{
            return  <CartCard key={index}  Data={el}/>
           
        })
      }
     
     <CartTotal/>
        </>
       
        : 
        <EmptyCart/>

        }
     
        
     
      </IonContent>
      <IonFooter>

      {cart && cart.length !== 0 ? 
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
      : 
      <IonGrid>
            <IonRow>
                {/* <IonCol>
                <IonButton  expand="block"   style={{borderRadius:"20px",height:"30px"}} color="danger">Book Now</IonButton>
                </IonCol> */}
                <IonCol>
                  <Link to={"/"} style={{textDecoration:"none"}}>
                  <IonButton expand="full"  fill="outline" color="danger"  style={{height:"30px",border:"1px solid crimson"}}>SHOP NOW</IonButton>
                  </Link>
                
                </IonCol>
            </IonRow>
        </IonGrid>
      }

      


      </IonFooter>
    </IonPage>
  );
};

export default Cart;
