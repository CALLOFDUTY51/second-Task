import React from 'react';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Layout from './Layout';
import HomePage from './Pages/HomePage';
import CartPage from './Pages/CartPage';
import Success from './Pages/Success';
import Cancel from './Pages/Cancel';
import TransactionsPage from './Pages/transactionPage';

const App = () => {
  

  return (
    <BrowserRouter>
       <Routes>
        <Route path='/' element={<Layout/>}>
        <Route index element={<HomePage/>}></Route>
        <Route path='Home' element={<HomePage/>}></Route>
        <Route path='Cart' element={<CartPage/>}></Route>
         <Route path='success' element={<Success/>}></Route>
         <Route path='cancel' element={<Cancel/>}></Route>
         <Route path='transactionPage' element={<TransactionsPage/>}></Route>

        </Route>
       </Routes>
     </BrowserRouter>
  );
};

export default App;
