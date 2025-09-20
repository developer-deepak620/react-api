import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import "./Customer.css"

function Customers() {

  let data = useParams();

  let [customer, setCustomers] = useState(null);
  let [payments, setPayments] = useState([]);
  let [orders, setOrders] = useState([]);

  useEffect(() => {
    load_data();
  }, [data.id]);

  let load_data = async () => {
    let resp = await fetch("https://api-deepak.vercel.app/customers/" + data.id);
    let res = await resp.json();
    setCustomers(res);
    setPayments(res.payments);
    setOrders(res.orders);
  }

  return (
    <>

      <div className="container-fluid">

        {customer != null ?

          <>
            <div className="customer">
              <h1>{customer.customerName}</h1>
              <h6>{customer.country}</h6>
            </div>


            <div className="row mt-3">
              <h2 className='text-center'>Payments Details</h2>
              <hr />
              {payments.map((payment) =>
                <div className='col-md-3'>
                  <div className="card shadow p-3">
                    <p>Amount: <b>{payment.amount}</b></p>
                    <p>Check number: <b>{payment.checkNumber}</b></p>
                    <p>Payment Date: <b>{payment.paymentDate}</b></p>
                  </div>
                </div>
              )}
            </div>


            <div className="row mt-3">
              <h2 className='text-center'>Order Details</h2>
              <hr />
              {orders.map((order) =>
                <div className='col-md-3'>
                  <div className="card shadow p-3 mb-5">
                    <p>Order Number: <b><Link to={"/orderdetails/"+data.id+"/"+order.orderNumber}>{order.orderNumber}</Link></b></p>
                    <p>Order date: <b>{order.orderDate}</b></p>
                    <p>Order Status: <b>{order.status}</b></p>
                  </div>
                </div>
              )}
            </div>

          </>
          :
          <div id="page">
            <div id="container">
              <div id="ring"></div>
              <div id="ring"></div>
              <div id="ring"></div>
              <div id="ring"></div>
              <div id="h3">loading</div>
            </div>
          </div>

        }
      </div>

    </>
  )
}

export default Customers