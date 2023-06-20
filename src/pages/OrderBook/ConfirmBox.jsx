/* eslint-disable react/prop-types */
import React, { useContext } from 'react'
import { SessionContext } from '../../contexts';
import { IonButton } from '@ionic/react';
import CartTotal from '../../components/CartComp/CartTotal';

const ConfirmBox = ({ checkout, placeOrder, buttonsDisabled, payUForm }) => {
    const { currency } = useContext(SessionContext);

    function submitPayment() {
        if (payUForm.Pg === "PP") {
          document.getElementById("paypal_form").submit();
        } else {
          document.getElementById("payment_form").submit();
        }
      }
  return (
    <>
    {/* <div className="confrimBox">
      <div className="row">
        <div className="col-12 p-0">
          <div className="box-header text-center">
            <p className="text-gold font-18 font-600 mb-0">Your Order</p>
          </div>
          <div className="box-body">
            {checkout && checkout.products && checkout.products.length != 0
              ? checkout.products.map((cartItem, index) => {
                  return (
                    <div
                      className="row"
                      key={
                        cartItem.product_id +
                        cartItem.price +
                        cartItem.quantity +
                        cartItem.total +
                        index
                      }
                    >
                      <div className="col-4 mt-10">
                        <img
                          className="cart-img"
                        //   src={
                        //     getProductFromProductsList(cartItem.product_id) &&
                        //     getProductFromProductsList(cartItem.product_id)
                        //       .original_image
                        //   }
                          alt={cartItem.name}
                          title={cartItem.name}
                        />
                      </div>
                      <div className="col-8 mt-10">
                        <p className="font-18 mb-0 text-description pt-10">
                          {cartItem.name} x {cartItem.quantity}
                          <br></br>
                          <span>
                            {cartItem.option && cartItem.option !== 0
                              ? cartItem.option.map((option) => {
                                  return (
                                    <p
                                      key={option.option_id}
                                      style={{
                                        color: "#B0A9A9",
                                        margin: "0",
                                      }}
                                    >
                                      {option.name}:&nbsp;{option.value}
                                    </p>
                                  );
                                })
                              : null}
                          </span>
                        </p>
                        <p className="text-description">{cartItem.total}</p>
                      </div>
                      <hr className="hr-prod" />
                    </div>
                  );
                })
              : null}

            {checkout.totals.map((total, index) => {
              if (!["Total"].includes(total.title)) {
                return (
                  <div className="row" key={index}>
                    <div className="col-6 text-center">
                      <p className="font-16 text-gold mb-0">{total.title}:</p>
                    </div>
                    <div className="col-6 text-center">
                      <p className="font-16 text-gold mb-0"> {total.text}</p>
                    </div>
                  </div>
                );
              }
            })}

            {checkout.totals.map((total, index) => {
              if (["Total"].includes(total.title)) {
                return (
                  <div className="row">
                    <div className="col-6 text-center">
                      <p className="font-16 text-gold mb-0 font-600">
                        {total.title}:
                      </p>
                    </div>
                    <div className="col-6 text-center">
                      <p className="font-16 text-gold mb-0 font-600">
                        {" "}
                        {total.text}
                      </p>
                    </div>
                  </div>
                );
              }
            })}
          </div>
        </div>
      </div>
    </div> */}
    <CartTotal/>
    {/* <div className="row text-center">
      <div className="col-12 mt-20">
        <IonButton
          onClick={(e) => submitPayment()}
             onClick={(e) => placeOrder(e)}
          disabled={buttonsDisabled}
          className="btn btn-primary btn-gold "
        >
          {buttonsDisabled ? "Order Placing..." : "Confirm and Pay"}
          Confirm and Pay
        </IonButton>
      </div>
    </div> */}
  </>
  )
}

export default ConfirmBox
