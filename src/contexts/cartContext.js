/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import { createContext, useState, useEffect, useContext } from "react";

import _ from "lodash";
import httpService from "../services/httpService";
import SessionContext from "./sessionContext";
import CatalogContext from "./catalogContext";

const CartContext = createContext();

const CartProvider = (props) => {
  const { sessionId } = useContext(SessionContext);
  const {showToast} = useContext(CatalogContext);
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem("cart")));
  const [checkout, setcheckout] = useState([]);
  
  //totals
  const [validateCoupon, setvalidateCoupon] = useState(false);
  const [couponData, setcouponData] = useState([]);
  const [subTotal, setsubTotal ] = useState(0);
  const [total, setTotal ] = useState(0);
  const [gst, setGst ] = useState(0);
  const [discount, setDiscount] = useState(0);
 
  useEffect(() => {
    if (!cart) {
      localStorage.setItem("cart", "[]");
      setCart([]);
    }else{
      setsubTotal(_.sum(cart.map((cartItem) => cartItem.total_excluding_tax)));
     
      setGst((
        _.sum(cart.map((cartItem) => cartItem.total)) -
        _.sum(
          cart.map((cartItem) => cartItem.total_excluding_tax)
        )));
       
       setTotal(_.sum(cart.map((cartItem) => cartItem.total)));    
        }
    
  }, [cart]);

  const updateCart = (newCart) => {
    localStorage.setItem("cart", JSON.stringify(newCart));
    setCart(newCart);
  };


  const addCoupon = async (code) =>{
    try {
   
       const coupon = await httpService.post(
         "https://admin.ndfurnituremart.com/index.php?route=rest/cart/coupon",{"coupon":code},
        { headers: { ...httpService.headers, "X-Oc-Session": sessionId, "X-Oc-Currency": "INR"} }
      );
         
        if(coupon && coupon.data.success){
          let coupon_data = coupon.data.info;
          
          console.log(parseInt(coupon_data.total));
          console.log(total);

          if(parseInt(coupon_data.total)!==0){
            if(total < parseInt(coupon_data.total)){
              showToast("error", `Cart Total Must be More than ${_.round(coupon_data.total,2)}`);
              setvalidateCoupon(false);
              return false;
            }
          }
          

          console.log(coupon_data);
          if(coupon_data.type==="P"){
            let tem_discount = subTotal * (parseFloat(coupon_data.discount)/100);
            let tem_total = subTotal - tem_discount;
            let tem_gst = tem_total * 0.18;
            
            setDiscount(tem_discount);
            setTotal(tem_total+tem_gst);
            setGst(tem_gst);
          }else{
            let tem_discount =  parseFloat(coupon_data.discount);
            let tem_total = subTotal - tem_discount;
            let tem_gst = tem_total * 0.18;
            
            setDiscount(tem_discount);
            setTotal(tem_total+tem_gst);
            setGst(tem_gst);
          }
          showToast("success", "Coupon Applied!");
          setvalidateCoupon(true);
          setcouponData(coupon.data.info);
        }else{
          showToast("error", "Invalid Coupon!");
          setvalidateCoupon(false);
          setcouponData([]);
        }
          
        }catch(error){
          console.log(error);
          setsubTotal(_.sum(cart.map((cartItem) => cartItem.total_excluding_tax)));
     
          setGst((
            _.sum(cart.map((cartItem) => cartItem.total)) -
            _.sum(
              cart.map((cartItem) => cartItem.total_excluding_tax)
            )));
           
          setTotal(_.sum(cart.map((cartItem) => cartItem.total)));
          showToast("error", "Invalid Coupon!");
          setvalidateCoupon(false);
          setcouponData([]);
          return Promise.reject(error);
        }
  }

  const addToCart = (product) => {
    let message = "Item added to cart!";
    let alreadyExist = false;
    const newCart = cart.map((cartItem, index) => {
      if (cartItem.product_id == product.product_id) {
        if (
          cartItem.option_details.length == 0 &&
          product.option_details.length == 0
        ) {
          const updatedItem = { ...cartItem };
          updatedItem.quantity =
            Number(cartItem.quantity) + Number(product.quantity);
          updatedItem.total = cartItem.total + product.total;
          updatedItem.total_excluding_tax =
            cartItem.total_excluding_tax + product.total_excluding_tax;
          message = "Item updated in cart!";
          alreadyExist = true;
          return updatedItem;
        } else {
          if (
            _(cartItem.option_details)
              .differenceWith(product.option_details, _.isEqual)
              .isEmpty()
          ) {
            const updatedItem = { ...cartItem };
            updatedItem.quantity =
              Number(cartItem.quantity) + Number(product.quantity);
            updatedItem.total = cartItem.total + product.total;
            updatedItem.total_excluding_tax =
              cartItem.total_excluding_tax + product.total_excluding_tax;
            message = "Item updated in cart!";
            alreadyExist = true;
            return updatedItem;
          }
        }
      }
      return cartItem;
    });
    if (!alreadyExist) {
      newCart.push(product);
    }
    updateCart(newCart);
    showToast("success", message, "");
  };

  const deleteFromCart = (product) => {
    const newCart = cart.filter((cartItem, index) => {
      if (cartItem === product) {
        return false;
      } else {
        return true;
      }
    });
    updateCart(newCart);
    showToast("success", "Item removed from cart!", "");
  };

  const updateQuantity = (product, action) => {
    const newCart = [...cart];
    if (action === "increment") {
      newCart[cart.indexOf(product)].quantity =
        Number(newCart[cart.indexOf(product)].quantity) +
        Number(product.minimum);
    } else {
      if (product.quantity > product.minimum) {
        newCart[cart.indexOf(product)].quantity -= Number(product.minimum);
      }
    }
    newCart[cart.indexOf(product)].total =
      newCart[cart.indexOf(product)].quantity *
      newCart[cart.indexOf(product)].price;
    newCart[cart.indexOf(product)].total_excluding_tax =
      newCart[cart.indexOf(product)].quantity *
      newCart[cart.indexOf(product)].price_excluding_tax;
    updateCart(newCart);
  };

  const emptyCart = () => {
    setCart([]);
    localStorage.setItem("cart", "[]");
  };

  const validateCheckout = async () => {
    console.log("in validateCheckout function ==> ")
    try {
      let deleteCart = await httpService.delete(
        httpService.apiEndpointShort + "cart/empty",
        { headers: { ...httpService.headers, "X-Oc-Session": sessionId } }
      );
      deleteCart = deleteCart.data;
    //  let deleteCart = {
    //     success : 1
    //   }
      console.log("Delete Cart",deleteCart)
      if (deleteCart && "success" in deleteCart && deleteCart.success === 1) {
        const allItems = cart.map((item, index) => {
          return {
            product_id: item.product_id,
            quantity: item.quantity,
            option: item.option,
          };
        });
        let addCart = await httpService.post(
          httpService.apiEndpointShort + "cart_bulk",
          allItems,
          { headers: { ...httpService.headers, "X-Oc-Session": sessionId } }
        );
        addCart = addCart.data;
        if (addCart && "success" in addCart && addCart.success === 1) {
          const cart = await httpService.get(
            httpService.apiEndpointShort + "cart",
            { headers: { ...httpService.headers, "X-Oc-Session": sessionId } }
          );
          console.log(cart.data);
          return cart.data;
        }
      }
    } catch (error) {
      console.log("cart context validate checout error", error);
      return Promise.reject(error);
    }
  };

  return (
    
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        deleteFromCart,
        updateQuantity,
        emptyCart,
        addCoupon,
        subTotal,
        total,
        gst,
        discount,
        validateCoupon,
        couponData,
        validateCheckout,
      }}
    >
      {/* {console.log("cart context", cart,
        addToCart,
        deleteFromCart,
        updateQuantity,
        emptyCart,
        addCoupon,
        subTotal,
        total,
        gst,
        discount,
        validateCoupon,
        couponData,
        validateCheckout,)} */}
      {props.children}
    </CartContext.Provider>
  );
};

export default CartContext;
export { CartProvider };
