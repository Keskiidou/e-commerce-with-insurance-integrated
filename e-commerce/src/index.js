import React from 'react';
import ReactDOM from 'react-dom/client';
import '../node_modules/font-awesome/css/font-awesome.min.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';



import { Home, Product, Products, AboutPage, ContactPage, Cart,Computers, Login, Register,
   Checkout ,EmailVerify,ProfilePage,Phones,Updateprofile,FotgotPassword,Resetyoupassword, 
   PageNotFound, Hi, AddProduct, Upload,AddContract ,AddInsurance,Insurance, Claim , Confirm , 
   AboutINS,
   AboutRepair} from "./pages"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <Routes>

        <Route path='/addProduct' element={<AddProduct />} />
        <Route path='/addInsurance' element={<AddInsurance />} />
        <Route path='/claim' element={<Claim/>} />
        <Route path='/addContract' element={<AddContract/>} />
        <Route path='/confirm' element={<Confirm/>} />
        <Route path='/hi' element={<Hi /> }  />
        <Route path="/" element={<Home />} />
        <Route path="/upload" element ={<Upload/>}/>
        <Route path="/product" element={<Products />} />  
        <Route path="/Insurance" element={<Insurance/>} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/AboutINS" element={<AboutINS />} />
        <Route path="/aboutRepair" element={<AboutRepair />} />

        <Route path="/phones" element={<Phones />} />  
        <Route path="/computers" element={<Computers />} />  

        <Route path="/contact" element={<ContactPage />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="*" element={<PageNotFound />} />
        <Route path="/product/*" element={<PageNotFound />} />
        <Route path="/email_verify" element={<EmailVerify/>} />
        <Route path="/profile" element={<ProfilePage/>} />
        <Route path="/Updateprofile" element={<Updateprofile/>} />
        <Route path="/Forgotpassword" element={<FotgotPassword/>} />
        <Route path="/Resetyoupassword" element={<Resetyoupassword/>} />

      </Routes>
    </Provider>
  </BrowserRouter>
); 

