import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductDetail from './pages/ProductDetail';
import { useState } from 'react';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cart from './pages/Cart';
import CustomCursor from './components/CustomCursor';
import "./Home.css";
import "./cart.css"


function App() {
  const [cartItems , setCartItems] = useState([]);

  return (
    
   <div className="page-container">
   <main className="content-wrap">
    <Router>
    
      <div>
      <CustomCursor/> 
        <ToastContainer theme='dark' position='bottom-right' />
        
      <Header cartItems={cartItems}/>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/search' element={<Home/>} />
        <Route path='/product/:id' element={<ProductDetail cartItems={cartItems} setCartItems={setCartItems}/>} />
        <Route path='/cart' element={<Cart cartItems={cartItems} setCartItems={setCartItems}/>} />
      </Routes>
      
      </div>
     
    </Router>
    
    </main>
    <Footer/>
    
   </div>
  
  )
}

export default App
