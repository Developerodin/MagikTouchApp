/* eslint-disable react/prop-types */
import React, { useEffect } from 'react'
import HeaderSub from '../../components/Header/HeaderSub'

const PaymentForm = ({ payUForm }) => {
 

  useEffect(()=>{
  console.log("Form Data", payUForm)
  },[])
  return (
    
    <div>
      {/* <HeaderSub Title={"Payment"} /> */}
    <form
      method="post"
      action="https://secure.payu.in/_payment"
      id="payment_form"
      style={{ display: "none" }}
    >
      <div id="leftContainerFormValue">
        <label htmlFor="formkey">key:</label>
        <input
          type="text"
          id="s2sformkeyNonSeamless"
          name="key"
          value={payUForm.payUForm.key}
          className="inputformModifiedLeft"
          required="required"
          readOnly
        />
      </div>
      <div id="rightContainerFormValue">
        <label htmlFor="txnid">txnid:</label>
        <input
          type="text"
          id="txnidNonSeamless"
          name="txnid"
          value={payUForm.payUForm.txnid}
          className="inputformModifiedRight"
          required="required"
          readOnly
        />
        <br />
      </div>
      <div id="leftContainerFormValue">
        <label htmlFor="amount">amount:</label>
        <input
          type="text"
          id="amountNonSeamless"
          name="amount"
          value={payUForm.payUForm.amount}
          className="inputformModifiedLeft"
          required="required"
          readOnly
        />
      </div>
      <div id="rightContainerFormValue">
        <label htmlFor="fname">firstname:</label>
        <input
          type="text"
          id="fnameNonSeamless"
          name="firstname"
          value={payUForm.payUForm.firstname}
          className="inputformModifiedRight"
          required="required"
          readOnly
        />
        <br />
      </div>
      <div id="leftContainerFormValue">
        <label htmlFor="email">email:</label>
        <input
          type="text"
          id="emailNonSeamless"
          name="email"
          value={payUForm.payUForm.email}
          className="inputformModifiedLeft"
          required="required"
          readOnly
        />
      </div>
      <div id="rightContainerFormValue">
        <label htmlFor="phone">phone:</label>
        <input
          type="phone"
          id="phoneNonSeamless"
          name="phone"
          value={payUForm.payUForm.phone}
          className="inputformModifiedRight"
        />
        <br />
      </div>
      <div id="leftContainerFormValue">
        <label htmlFor="productinfo">productinfo:</label>
        <input
          type="text"
          id="productinfoNonSeamless"
          name="productinfo"
          value={payUForm.payUForm.productinfo}
          className="inputformModifiedLeft"
          required="required"
          readOnly
        />
      </div>
      <div id="rightContainerFormValue">
        <label htmlFor="surl">surl:</label>
        <input
          type="text"
          id="surlNonSeamless"
          name="surl"
          className="inputformModifiedRight"
          value="https://mgktch.com/index.php?route=extension/payment/confirmpayu"
          required="required"
          readOnly
        />
        <br />
      </div>
      <div id="leftContainerFormValue">
        <label htmlFor="furl">furl:</label>
        <input
          type="text"
          id="furlNonSeamless"
          name="furl"
          value="https://mgktch.com/index.php?route=extension/payment/confirmpayu"
          className="inputformModifiedLeft"
          required="required"
          readOnly
        />
      </div>
      <div id="rightContainerFormValue">
        <label htmlFor="hash">hash:</label>
        <input
          type="text"
          id="hashforNonSeamless"
          name="hash"
          value={payUForm.payUForm.hash}
          className="inputformModifiedRight"
          required="required"
          readOnly
        />
        <br />
        <br />
      </div>
      {/* <div id="rightContainerFormValue">
        <label htmlFor="hash">hash:</label>
        <input
          type="text"
          id="hashforNonSeamless"
          name="udf5"
          value={payUForm.payUForm.udf5}
          className="inputformModifiedRight"
          required="required"
          readOnly
        />
        <br />
        <br />
      </div> */}
      <input type="text" name="Pg" value={payUForm.payUForm.Pg} />
      <input type="text" name="udf5" value={payUForm.payUForm.udf5} />
      <input type="submit" defaultValue="Submit" id="formsubmitbtn" />
     
      <br />
      <br />
    </form>
  </div>
  )
}

export default PaymentForm
