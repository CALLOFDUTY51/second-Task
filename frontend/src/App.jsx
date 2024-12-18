import React from 'react';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import ProductList from './components/ProductList';
import Layout from './Layout';
import HomePage from './Pages/HomePage';
import CartPage from './Pages/CartPage';
import CheckOut from './components/CheckOut';
import Check from './Pages/Check';
import PaymentFailed from './components/PaymentFailed';
import PaymentSuccess from "./components/PaymentSuccess"
const App = () => {
  

  return (
    <BrowserRouter>
       <Routes>
        <Route path='/' element={<Layout/>}>
        <Route index element={<HomePage/>}></Route>
        <Route path='Home' element={<HomePage/>}></Route>
       <Route path='/Cart' element={<CartPage/>}></Route>
       <Route path='/Checkout' element={<CheckOut/>}></Route>
       <Route path='/Check' element={<Check/>}></Route>
       <Route path='/cancel' element={<PaymentFailed/>}></Route>
       <Route path='/success' element={<PaymentSuccess/>}></Route>

        </Route>
       </Routes>
     </BrowserRouter>
  );
};

export default App;
