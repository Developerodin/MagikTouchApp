/* eslint-disable react/prop-types */
import React, { useEffect } from 'react'
import PaymentForm from './PaymentForm'
import { IonCard, IonCardContent, IonCol, IonGrid, IonRow, IonText } from '@ionic/react'

const PaymentMethod = (props) => {
    const {payPalForm,payUForm,handlePaymentChange,setPayUForm,payment,setCod,Cod} = props;

    useEffect(()=>{
      console.log("Form Data", payUForm)
    },[])
  return (
    <div className="paymentbox ">

        <IonGrid>
            <IonRow>
                <IonCol>
                    <div style={{width:"100%",textAlign:"center",fontSize:"20px",fontWeight:"bold"}}>
                        <IonText>Choose Payment Method</IonText>
                    </div>
                </IonCol>
            </IonRow>


            <IonRow>
                <IonCol>
                    <IonCard  onClick={(e) => {
                       setCod(false);
              handlePaymentChange("DC", payUForm, setPayUForm);
              
            }}
            style={{borderRadius:"10px",border:`${payUForm.Pg === "DC" ? "1px solid blue" : "1px solid grey"}`}}
            className={`btn btn-border payment-btn w-100 ${
              payUForm.Pg === "DC" ? "payment-active" : ""
            }`}>
                        <IonCardContent style={{padding:"15px 8px"}}>
                            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                               <IonText >Debit Card</IonText>
                               <div className="form-check">
                                   <input
                                     className="form-check-input"
                                     type="radio"
                                        name="Pg"
                                        id="Pg1"
                                       value="DC"
                                    checked={payUForm.Pg === "DC"}
                                    onChange={(e) => {
                                        handlePaymentChange(e, payUForm, setPayUForm);
                                        setCod(false);
                                      }}
                                      />
                                   </div>
                            </div>
                        </IonCardContent>
                    </IonCard>
                </IonCol>
                <IonCol>
                <IonCard onClick={(e) => {
                   setCod(false);
              handlePaymentChange("CC", payUForm, setPayUForm);
            }}
            style={{borderRadius:"10px",border:`${payUForm.Pg === "CC" ? "1px solid blue" : "1px solid grey"}`}}
            className={`btn btn-border payment-btn w-100 ${
              payUForm.Pg === "CC" ? "payment-active" : ""
            }`}>
                        <IonCardContent style={{padding:"15px 8px"}}>
                            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                               <IonText >Credit Card</IonText>
                               <div className="form-check">
                               <input
                className="form-check-input"
                type="radio"
                name="Pg"
                id="Pg1"
                value="CC"
                checked={payUForm.Pg === "CC"}
                onChange={(e) => {
                  handlePaymentChange(e, payUForm, setPayUForm);
                  setCod(false);
                }}
              />
                                   </div>
                            </div>
                        </IonCardContent>
                    </IonCard>
                </IonCol>
            </IonRow>

            <IonRow>
                <IonCol>
                    <IonCard  onClick={(e) => {
                       setCod(false);
              handlePaymentChange("NB", payUForm, setPayUForm);
            }}
            style={{borderRadius:"10px",border:`${payUForm.Pg === "NB" ? "1px solid blue" : "1px solid grey"}`}}
            className={`btn btn-border payment-btn w-100 ${
              payUForm.Pg === "NB" ? "payment-active" : ""
            }`}>
                        <IonCardContent style={{padding:"15px 8px"}}>
                            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                               <IonText >Net Banking</IonText>
                               <div className="form-check">
                               <input
                className="form-check-input"
                type="radio"
                name="Pg"
                id="Pg1"
                value="NB"
                checked={payUForm.Pg === "NB"}
                onChange={(e) => {
                  handlePaymentChange(e, payUForm, setPayUForm);
                  setCod(false);
                }}
              />
                                   </div>
                            </div>
                        </IonCardContent>
                    </IonCard>
                </IonCol>

                <IonCol>
                <IonCard onClick={(e) => {
                   setCod(false);
              handlePaymentChange("UPI", payUForm, setPayUForm);
            }}
            style={{borderRadius:"10px",border:`${payUForm.Pg === "UPI" ? "1px solid blue" : "1px solid grey"}`}}
            className={`btn btn-border payment-btn w-100 ${
              payUForm.Pg === "UPI" ? "payment-active" : ""
            }`}>
                        <IonCardContent style={{padding:"15px 8px"}}>
                            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                               <IonText >UPI</IonText>
                               <div className="form-check">
                               <input
                className="form-check-input"
                type="radio"
                name="Pg"
                id="Pg1"
                value="UPI"
                checked={payUForm.Pg === "UPI"}
                onChange={(e) => {
                  handlePaymentChange(e, payUForm, setPayUForm);
                  setCod(false);
                }}
              />
                                   </div>
                            </div>
                        </IonCardContent>
                    </IonCard>
                </IonCol>
            </IonRow>


            <IonRow>
                <IonCol>
                    <IonCard  onClick={(e) => {
                       setCod(false);
              handlePaymentChange("OT", payUForm, setPayUForm);
            }}
            style={{borderRadius:"10px",border:`${payUForm.Pg === "OT" ? "1px solid blue" : "1px solid grey"}`}}
            className={`btn btn-border payment-btn w-100 ${
              payUForm.Pg === "OT" ? "payment-active" : ""
            }`}>
                        <IonCardContent style={{padding:"15px 8px"}}>
                            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                               <IonText >Others</IonText>
                               <div className="form-check">
                               <input
                className="form-check-input"
                type="radio"
                name="Pg"
                id="Pg1"
                value="OT"
                checked={payUForm.Pg === "OT"}
                onChange={(e) => {
                  handlePaymentChange(e, payUForm, setPayUForm);
                  setCod(false);
                }}
              />
                                   </div>
                            </div>
                        </IonCardContent>
                    </IonCard>
                </IonCol>

                <IonCol>
                <IonCard onClick={(e)=>{ setCod(true)}}  style={{borderRadius:"10px",border:`${Cod ? "1px solid blue" : "1px solid grey"}`}}>
                        <IonCardContent style={{padding:"15px 8px"}}>
                            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                               <IonText >COD</IonText>
                               <div className="form-check">
                               <input
                className="form-check-input"
                type="radio"
                name="Pg"
                id="Pg1"
                
                checked={Cod}
                onChange={(e) => {
                  console.log("COD",e.target.checked);
                  setCod(e.target.checked);
                }}
              />
                                   </div>
                            </div>
                        </IonCardContent>
                    </IonCard>
                </IonCol>
            </IonRow>




        </IonGrid>

    {/* <div className="row">
      <div className="col-12">
       
      </div>
      <div className="row">
        <div className="col-6">
          <div
            onClick={(e) => {
              handlePaymentChange("DC", payUForm, setPayUForm);
            }}
            className={`btn btn-border payment-btn w-100 ${
              payUForm.Pg === "DC" ? "payment-active" : ""
            }`}
          >
            <p className="text-description font-600 font-16 mb-0">
              <i className="bi bi-credit-card-2-back"></i> &nbsp; Debit Card 
            </p>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="Pg"
                id="Pg1"
                value="DC"
                checked={payUForm.Pg === "DC"}
              />
            </div>
          </div>
        </div>
        <div className="col-6">
          <div
            onClick={(e) => {
              handlePaymentChange("CC", payUForm, setPayUForm);
            }}
            className={`btn btn-border payment-btn w-100 ${
              payUForm.Pg === "CC" ? "payment-active" : ""
            }`}
          >
            <p className="text-description font-600 font-16 mb-0">
              <i className="bi bi-credit-card-fill"></i> &nbsp; Credit Card
            </p>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="Pg"
                id="Pg1"
                value="CC"
                checked={payUForm.Pg === "CC"}
                onChange={(e) => {
                  handlePaymentChange(e, payUForm, setPayUForm);
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-6 mt-20">
          <div
            onClick={(e) => {
              handlePaymentChange("NB", payUForm, setPayUForm);
            }}
            className={`btn btn-border payment-btn w-100 ${
              payUForm.Pg === "NB" ? "payment-active" : ""
            }`}
          >
            <p className="text-description font-600 font-16 mb-0">
              <i className="bi bi-bank"></i> &nbsp; Net Banking
            </p>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="Pg"
                id="Pg1"
                value="NB"
                checked={payUForm.Pg === "NB"}
                onChange={(e) => {
                  handlePaymentChange(e, payUForm, setPayUForm);
                }}
              />
            </div>
          </div>
        </div>
        <div className="col-6 mt-20">
          <div
            onClick={(e) => {
              handlePaymentChange("UPI", payUForm, setPayUForm);
            }}
            className={`btn btn-border payment-btn w-100 ${
              payUForm.Pg === "UPI" ? "payment-active" : ""
            }`}
          >
            <p className="text-description font-600 font-16 mb-0">
              
            </p>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="Pg"
                id="Pg1"
                value="UPI"
                checked={payUForm.Pg === "UPI"}
                onChange={(e) => {
                  handlePaymentChange(e, payUForm, setPayUForm);
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-6 mt-20">
          <div
            onClick={(e) => {
              if (isUS) {
                handlePaymentChange("OT", payUForm, setPayUForm);
              }
            }}
            className={`btn btn-border payment-btn w-100 ${
              payUForm.Pg === "PP" ? "payment-active" : ""
            }`}
          >
            <p className="text-description font-600 font-16 mb-0">
              <i className="bi bi-cash"></i> &nbsp; PayPal
            </p>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="Pg"
                id="Pg1"
                value="PP"
                checked={payUForm.Pg === "PP"}
                disabled={!isUS}
                onChange={(e) => {
                  if (isUS) {
                    handlePaymentChange(e, payUForm, setPayUForm);
                  }
                }}
              />
            </div>
          </div>
        </div>
        <div className="col-6 mt-20">
          <div
            onClick={(e) => {
              handlePaymentChange("OT", payUForm, setPayUForm);
            }}
            className={`btn btn-border payment-btn w-100 ${
              payUForm.Pg === "OT" ? "payment-active" : ""
            }`}
          >
            <p className="text-description font-600 font-16 mb-0">
              <i className="bi bi-wallet2"></i> &nbsp; Others
            </p>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="Pg"
                id="Pg1"
                value="OT"
                checked={payUForm.Pg === "OT"}
                onChange={(e) => {
                  handlePaymentChange(e, payUForm, setPayUForm);
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div> */}
    {/* {isUS ? <PayPalForm payPalForm={payPalForm} /> : null} */}
    <PaymentForm payUForm={{ payUForm }} />
    
  </div>
  )
}

export default PaymentMethod
