/* eslint-disable no-undef */
import { IonButton, IonCol, IonContent, IonFooter, IonGrid, IonIcon, IonImg, IonPage, IonRow, IonText } from '@ionic/react'
import { alertCircleOutline, chatbubble } from 'ionicons/icons';
import React, { useContext, useEffect, useState } from 'react'
import ProductFooter from './ProductFooter';
import ProductSwiper from '../../components/ProductDetailComp/ProductSwiper';
import HeaderSub from '../../components/Header/HeaderSub';
import { CartContext, CatalogContext, SessionContext } from '../../contexts';
import { useLocation, useParams } from 'react-router';
import { httpService } from '../../services';
import { Link } from 'react-router-dom';

const ProductDetail = () => {
    // const [QuantityProduct,setQuantityProduct] =useState(1);
    // const [Quantity,setQuantity] =useState(1);
    const [productDetails, setProductDetails] = useState({});
    const [productForm, setProductForm] = useState();
    const [productPrice, setProductPrice] = useState("");
    const [productPriceWithTax, setProductPriceWithTax] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [buttonsDisabled, setButtonsDisabled] = useState(false);
    const { addToCart } = useContext(CartContext);
    const { sessionId } = useContext(SessionContext);
    const { showToast } = useContext(CatalogContext);
    const [redirect, setRedirect] = useState(false);
    
  
    const {id} = useParams();
    const location = useLocation();
const { state } = location
const handleAddToCart = (redirect) => {
  if (quantity < productDetails.minimum) {
    showToast("error", "Minimum quantity is " + productDetails.minimum, "");
    return;
  }
  if (quantity % productDetails.minimum !== 0) {
    showToast(
      "error",
      "Quantity must be multiple of " + productDetails.minimum,
      ""
    );
    return;
  }
  for (let option of productDetails.options) {
    if (
      Number(option.required) === 1 &&
      !(String(option.product_option_id) in productForm.option)
    ) {
      showToast("error", "Please choose a " + option.name, "");
      return;
    }
  }

  for (let key in productForm.option) {
    let thatOption = productDetails.options.find((opt) => {
      return opt.product_option_id == key;
    });
    console.log("taht option", thatOption);
    let thatOptionValue = thatOption.option_value.find((optVal) => {
      return optVal.product_option_value_id == productForm.option[key];
    });
    if (thatOptionValue.quantity < quantity) {
      showToast(
        "error",
        "Only " +
          thatOptionValue.quantity +
          " " +
          thatOption.name +
          " " +
          thatOptionValue.name +
          " avialable",
        ""
      );
      return;
    }
  }
 
  const updatedProductForm = { ...productForm };
  updatedProductForm.total = productForm.price * quantity;
  updatedProductForm.total_excluding_tax =
    productForm.price_excluding_tax * quantity;
  updatedProductForm.quantity = quantity;
  addToCart(updatedProductForm);
  setProductForm(updatedProductForm);
  if (redirect) {
    navigate("/cart");
  } else {
    setTimeout(() => {
      setButtonsDisabled(false);
    }, 3000);
  }
};
    useEffect(() => {
      console.log("State aki",state)
        const fetchData = async () => {
          try {
            let product = await httpService.get(
              httpService.apiEndpoint + `products&id=${id}`,
              { headers: httpService.headers }
            );
            product = product.data.data;
            console.log("PRODUCT",product);
            setProductDetails(product);
            setQuantity(product.minimum);
    
            let initialProductPrice = product.price;
            let initialProductPriceExcludingTax = product.price_excluding_tax;
            let option_details = [];
            let option = {};
            if (product.options && product.options.length !== 0) {
              product.options.map((opt, index) => {
                if (
                  Number(opt.parent_id) === 0 &&
                  opt.option_value &&
                  opt.option_value.length > 0
                ) {
                  initialProductPrice =
                    initialProductPrice + opt.option_value[0].price;
                  initialProductPriceExcludingTax =
                    initialProductPriceExcludingTax +
                    opt.option_value[0].price_excluding_tax;
    
                  option_details.push({
                    product_option_id: opt.product_option_id,
                    product_option_value_id:
                      opt.option_value[0].product_option_value_id,
                    option_id: opt.option_id,
                    option_value_id: opt.option_value[0].option_value_id,
                    name: opt.name,
                    value: opt.option_value[0].name,
                    type: opt.type,
                    price: opt.option_value[0].price,
                    price_excluding_tax: opt.option_value[0].price_excluding_tax,
                    parent_id: opt.parent_id,
                  });
    
                  option[opt.product_option_id] =
                    opt.option_value[0].product_option_value_id;
                }
              });
            }
    
            if (product.options && product.options.length !== 0) {
              product.options.map((opt, index) => {
                if (Number(opt.parent_id) !== 0) {
                  let put = false;
                  opt.option_value.map((ov) => {
                    if (put === false) {
                      if (
                        ov.parent_option_values.split(", ").includes(
                          String(
                            option_details.filter((op) => {
                              return Number(op.option_id) === Number(opt.parent_id);
                            })[0].option_value_id
                          )
                        )
                      ) {
                        console.log("in here");
                        put = true;
    
                        initialProductPrice = initialProductPrice + ov.price;
                        initialProductPriceExcludingTax =
                          initialProductPriceExcludingTax + ov.price_excluding_tax;
    
                        option_details.push({
                          product_option_id: opt.product_option_id,
                          product_option_value_id: ov.product_option_value_id,
                          option_id: opt.option_id,
                          option_value_id: ov.option_value_id,
                          name: opt.name,
                          value: ov.name,
                          type: opt.type,
                          price: ov.price,
                          price_excluding_tax: ov.price_excluding_tax,
                          parent_id: opt.parent_id,
                        });
    
                        option[opt.product_option_id] = ov.product_option_value_id;
                      }
                    }
                  });
                }
              });
            }
    
            setProductPrice(initialProductPriceExcludingTax);
            setProductPriceWithTax(initialProductPrice);
            const form = {
              product_id: product.product_id,
              name: product.name,
              model: product.model,
              quantity: product.minimum,
              price: initialProductPrice,
              price_excluding_tax: initialProductPriceExcludingTax,
              total: initialProductPrice * product.minimum,
              total_excluding_tax:
                initialProductPriceExcludingTax * product.minimum,
              option_details: option_details,
              option: option,
              minimum: product.minimum,
            };
            setProductForm(form);
            console.log("REleted Products 1")
            const { data: relProducts } = await httpService.get(
              httpService.apiEndpoint + `related&id=${id}`,
              { headers: httpService.headers }
            );
            console.log("REleted Products",relProducts.data)
            if ("success" in relProducts && relProducts.success === 1) {
              setRelatedProducts(relProducts.data);
            } else {
              setRelatedProducts([]);
            }
          } catch (error) {
            console.log("product page error", error);
          }
        };
        console.log("SEssion Id",sessionId)
        if (sessionId) {
          fetchData();
        }
      }, [sessionId, id]);
  return (
    <IonPage>
        <HeaderSub Title={ state ? state.name : "Product"}/>
        <IonContent className="explore-bg explore-page"  style={{backgroundColor:"#F1F1F1"}}>
            {
Object.keys(productDetails).length>0 && 
<IonGrid>
<IonRow style={{backgroundColor:"#FFF",padding:"5px"}}>
 <IonCol size='12'>
   <IonImg src={productDetails.original_image}></IonImg>
 </IonCol>
 <IonCol size='12'>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <div>
        <IonText style={{fontSize:"18px",fontWeight:"bold"}}>{productDetails.name}</IonText><br/>
        <IonText style={{fontSize:"18px",fontWeight:"bold"}}>₹{productDetails.price}/</IonText>
        </div>
       
        {/* <div style={{display:"flex",justifyContent:"center",alignItems:"center",marginRight:"20px"}}>
            <IonButton size='small' style={{height:"20px"}} color="light" disabled={QuantityProduct===1 ? true : false}  onClick={()=>{setQuantityProduct((prev)=>prev-1)}}>-</IonButton>
            <IonText style={{margin:"0px 5px"}}>{QuantityProduct}</IonText>
            <IonButton size='small' style={{height:"20px"}} color="light" onClick={()=>{setQuantityProduct((prev)=>prev+1)}}>+</IonButton>
        </div> */}
        
    </div>

    <div style={{color:"grey",fontSize:"12px"}}>
        <div style={{margin:"10px 0px"}}>
            
            <IonText>GST @18% inclsive price ₹329</IonText>
        </div>

        <div style={{display:"flex",justifyContent:'left',alignItems:"center"}}>
            
            <IonText style={{fontSize:"14px",fontWeight:"bold"}}>AVAILABILITY : </IonText>
            <IonButton size='small' color="success">IN STOCK</IonButton>
        </div>
    </div>
  </IonCol>
</IonRow>



<IonRow style={{margin:"20px 0px",backgroundColor:"#FFF",padding:"5px"}}>
    <IonCol>
        <div style={{margin:"10px 0px"}}>
        <IonText style={{fontSize:"14px",fontWeight:"bold"}}>About Product</IonText>
        </div>

        <div style={{borderTop:"0.5px dashed grey"}}>
            <IonText style={{fontSize:"12px",color:"grey"}}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima nesciunt quas dignissimos dolorum, alias aliquam natus, minus consectetur quam aperiam esse rerum architecto voluptas vitae odio deserunt hic beatae eum.</IonText>
        </div>
        
    </IonCol>
</IonRow>

<IonRow style={{margin:"20px 0px",backgroundColor:"#FFF",padding:"5px"}}>
    <IonCol>
       <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <div style={{marginRight:"3px"}}>
            <IonIcon color="success" size='large' icon={alertCircleOutline}></IonIcon>
        </div>

        <div>
            <IonText style={{fontSize:"13px",fontWeight:"bold"}}>WE ARE HERE TO HELP</IonText> <br/>
            <IonText style={{fontSize:"10px",color:"grey"}}>In case of any enquiries get in touch with us.</IonText>
        </div>
       </div>
    </IonCol>
    <IonCol size='3'>
        <IonButton size='small' color="light" >CONTACT</IonButton>
    </IonCol>
</IonRow>

<IonRow style={{margin:"20px 0px",backgroundColor:"#FFF",padding:"5px"}}>
    <IonCol size='12'>
        <IonText style={{fontSize:"16px",fontWeight:"bold"}}>You May Also Like</IonText>
    </IonCol>
    <IonCol>
        <ProductSwiper Data={relatedProducts}/>
    </IonCol>
</IonRow>
</IonGrid>
            }
           
        </IonContent>
        <IonFooter >
        {/* <div style={{display:"flex",justifyContent:"space-around",alignAitem:"center",margin:"10px 0px"}}>
        
        
        </div> */}
        <IonGrid>
            <IonRow>
                <IonCol>
                <IonButton  expand="block"  onClick={() => handleAddToCart()} style={{borderRadius:"20px",height:"30px"}} color="danger">Add To Cart</IonButton>
                </IonCol>
                <IonCol>
                  <Link to={"/book"} style={{textDecoration:"none"}}>
                  <IonButton expand="full"  fill="outline" color="danger"  style={{height:"30px",border:"1px solid crimson"}}>BOOK NOW</IonButton>
                  </Link>
                
                </IonCol>
            </IonRow>
        </IonGrid>
        
    </IonFooter>
    </IonPage>
  )
}

export default ProductDetail
