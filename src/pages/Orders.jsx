import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { assets } from "../assets/assets";
const backendUrl = import.meta.env.VITE_BACKEND_URL;
const Orders = ({ token }) => {

  const [orders, setOrders] = useState([]);
  const currency = '₹';

  const fetchAllOrders = async () => {
    if (!token) {
      return null;
    }
    try {
      const response = await axios.post(backendUrl + '/api/order/list', {}, { headers: { token } });
      //console.log(response.data);
      if (response.data.success) {
        setOrders(response.data.orders);
        console.log("Orders:", response.data.orders);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }

  }

  //update Order status for Admin Panel
  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(backendUrl + '/api/order/status', { orderId, status: event.target.value }, { headers: { token } });
      if (response.data.success) {
        await fetchAllOrders();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }

  }

  useEffect(() => {
    fetchAllOrders();
  }, [token])

  return (
    <>
      <div className="orders-container">
        <h1 className="orders-title">CUSTOMER ORDERS</h1>
        <div className="orders-list">
          {
            orders.map((order, index) => (
              <div key={index} className="order-card">
                <img src={assets.parcel_icon} alt="" className="order-icon" />
                {/* ✅ ORDER ITEMS */}
                <div className="order-items">
                  {
                    order.item.map((item, i) => (
                      <p key={i} className="order-item">
                        {item.name}  {" "} × {" "} {item.quantity}<span className="order-size"> {item.size}</span></p>
                    ))
                  }
                </div>
                {/* USER DETAILS */}
                <div className="order-user">
                  <p className="user-name"> {order.address.firstname} {order.address.lastname}</p>
                  <p>{order.address.email}</p>
                  <p>{order.address.phone}</p>
                  <p>{order.address.street}, {order.address.city}</p>
                  <p>{order.address.state}, {order.address.country} - {order.address.zipcode}</p>
                </div>
                {/*ORDER DETAILS*/}
                <div className="order-details">
                  <p>Items:{order.item.length}</p>
                  <p>PaymentMethod:{order.paymentMethod}</p>
                  <p>Payment:{order.payment ? "Done" : 'Pending'}</p>
                  <p>{new Date(order.date).toLocaleDateString()}</p>
                  <p className="order-amount">{currency}{order.amount}</p>
                  <select className="order-status-select" value={order.status} 
                  onChange={(event)=>statusHandler(event,order._id)}>
                    <option value="OrderPlaced">OrderPlaced</option>
                    <option value="Packing">Packing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="OutForDelivery">OutForDelivery</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </>
  )
}

export default Orders;
