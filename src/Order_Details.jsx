import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import "./Order_Details.css"

function Order_Details() {

    let data = useParams();


    let [customer, setCustomer] = useState(null);
    let [order_Details, setOrder_Details] = useState([]);

    useEffect(() => {
        load_orderDetails();
    }, [data.id]);

    let load_orderDetails = async () => {
        let resp = await fetch("https://api-deepak.vercel.app/customers/" + data.id);
        let res = await resp.json();
        setCustomer(res);


        for (let i = 0; i < res.orders.length; i++) {
            if (parseInt(res.orders[i].orderNumber) == parseInt(data.ordernumber)) {
                setOrder_Details(res.orders[i].OrderDetails)
            }
        }

    };

    console.log(data.ordernumber);


    return (
        <>

            <div className="container-fluid">
                {customer != null ?
                    <>

                        <div className="customer">
                            <h1>{customer.customerName}</h1>
                            <h6>{customer.country}</h6>
                        </div>

                        <div className="row">
                            {order_Details.map((item) =>
                                <div className="col-md-3">
                                    <div className="card shadow mt-5 p-3">
                                        <h3>{item.productDetails[0].productName}</h3>
                                        <p><b>Description: </b>{item.productDetails[0].productDescription}</p>
                                        <p><b>Quantity: </b>{item.quantityOrdered}</p>
                                    </div>
                                </div>
                            )}
                        </div>

                    </>
                    :
                    <div className="loader-div">
                        <div class="loader">
                            <div class="circle"></div>
                        </div>
                    </div>
                }
            </div>

        </>
    )
}

export default Order_Details