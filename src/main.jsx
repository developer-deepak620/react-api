import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Customers from './Customers.jsx'
import Order_Details from './Order_Details.jsx'

createRoot(document.getElementById('root')).render(
 <BrowserRouter>
    <Routes>
      <Route path='/' element={<App/>} />
      <Route path='/customer/:id' element={<Customers/>} />
      <Route path='/orderdetails/:id/:ordernumber'element={<Order_Details/>}/>
    </Routes>
 </BrowserRouter>
)
