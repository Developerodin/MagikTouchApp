/* eslint-disable react/prop-types */
import React from 'react'
import OrderCard from '../../components/OrdersComp/OrderCard';
import noOrders from "./noorders.jpeg"
const PendingOrders = ({ orders }) => {
  return (
    // <div>
    //   {orders && orders.length !== 0 ? (
    //     orders.map((order) => {
    //       return (
    //         <OrderCard status="pending" order={order} key={order.order_id} />
    //       );
    //     })
    //   ) : (
    //     <img src={noOrders} alt="" style={{ width: "100%" }} />
    //   )}

    //   <br />
    //   <br />
    //   <br />
    // </div>
    <OrderCard status="pending"   />
  )
}

export default PendingOrders
