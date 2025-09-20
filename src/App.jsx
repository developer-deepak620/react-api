import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import "./App.css"

function App() {

    let [customers, setCustomers] = useState(null);

    useEffect(() => {
        load_data();
    }, []);

    let load_data = async () => {
        let resp = await fetch("https://api-deepak.vercel.app/customers");
        let res = await resp.json();
        setCustomers(res);
    };

    return (
        <>

            <div className="container-fluid">
                {customers != null ?
                    <table className='table table-bordered'>
                        <thead>
                            <tr>
                                <th>Customer Number</th>
                                <th>Customer Name</th>
                                <th>Country</th>
                                <th>View Detaills</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                customers.map((customer) =>
                                    <tr>
                                        <td>{customer.customerNumber}</td>
                                        <td>{customer.customerName}</td>
                                        <td>{customer.country}</td>
                                        <td><Link to={"/customer/" + customer.customerNumber}>View</Link></td>
                                    </tr>
                                )

                            }

                        </tbody>
                    </table>

                    :
                    <div className='loader-box d-flex justify-content-center align-items-center'>
                        <div class="loader">
                            <div class="face">
                                <div class="circle"></div>
                            </div>
                            <div class="face">
                                <div class="circle"></div>
                            </div>
                        </div>
                    </div>
                }
            </div>

        </>
    )
}

export default App