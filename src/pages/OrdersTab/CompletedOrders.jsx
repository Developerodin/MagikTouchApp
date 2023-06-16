/* eslint-disable react/prop-types */
import React from 'react'
import noOrders from "./noorders.jpeg"
import OrderCard from '../../components/OrdersComp/OrderCard';
const CompletedOrders = ({ orders }) => {
  return (
     <div>
    {orders && orders.length !== 0 ? (
      orders.map((order) => {
        return (
          <OrderCard status="completed" order={order} key={order.order_id} />
        );
      })
    ) : (
      <img src={noOrders} alt="" style={{ width: "100%" }} />
    )}

    <br />
    <br />
    <br />
  </div>
  )
}

export default CompletedOrders
