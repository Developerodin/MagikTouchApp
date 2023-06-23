import React, { useContext, useEffect, useState } from "react";
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
  IonToolbar,
} from "@ionic/react";
import HeaderSub from "../../components/Header/HeaderSub";
import { Link } from "react-router-dom";
import { phonePortraitOutline, starHalfOutline } from "ionicons/icons";
import CartCard from "../../components/CartComp/CartCard";
import { CartContext, CatalogContext, UserContext } from "../../contexts";
import CartTotal from "../../components/CartComp/CartTotal";
import EmptyCart from "./EmptyCart";
const Cart = () => {
  const { cart, deleteFromCart, updateQuantity } = useContext(CartContext);
  const { getProductFromProductsList } = useContext(CatalogContext);
  const [buttonsDisabled, setButtonsDisabled] = useState(false);
  const { log,UserAddress, setUserAddress,user } = useContext(UserContext);
  const [Path,setPath]=useState("login");
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
useEffect(() => {
 
  console.log("log...", log);
  if (!cart || cart.length === 0) {
    // navigate("/cart");
    console.log("navigate cart");
  } else if (log === 0) {
    // navigate("/login");
    setPath("login");
    console.log("navigate login");
  } else if (log === 1 && user && cart && cart.length !== 0) {
    console.log("calling handel Checkout");
    setPath("checkout");
  }
}, [log, user, cart]);

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

      <div>
 {
              Path==="checkout" && <Link to={"/book"} style={{textDecoration:"none"}}>
              <IonButton expand="full"   color="danger"  >BOOK NOW</IonButton>
              </Link>
            }
            {
              Path==="login" && <Link to={"/tabs/login"} style={{textDecoration:"none"}}>
              <IonButton expand="full"  color="danger"  >Login In</IonButton>
              </Link>
            }
     </div>
   
      : 
     
 <Link to={"/"} style={{textDecoration:"none"}}>
                  <IonButton expand="full"   color="danger"  >SHOP NOW</IonButton>
                  </Link>
    
      
      }

      


      </IonFooter>
    </IonPage>
  );
};

export default Cart;