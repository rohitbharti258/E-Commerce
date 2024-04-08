import React from "react"
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Product from "./pages/Product";
import ProductList from "./pages/ProductList";
import Cart from "./pages/Cart";
import Success from "./pages/Success"
import { useSelector } from "react-redux";
// import {Redirect} from "react-router"
import {
    BrowserRouter,
    Routes,
    Route,
    Navigate
  } from 'react-router-dom'


const App = () => {
  const user = useSelector((state) => state.user.currentUser);
    return (
        <>
        <BrowserRouter>
        <Routes>
          <Route exact path='/' element={<Home />}></Route>
          <Route path='/login' element={user? <Navigate to="/" />:<Login />}></Route>
          <Route path='/register' element={user? <Navigate to="/" />:<Register />}></Route>
          <Route path='/cart' element={<Cart/>}></Route>
          <Route path="/products/:category" element={<ProductList/>}></Route>
          <Route path="/product/:id" element={<Product/>}></Route>
          <Route path="/success" element={<Success/>}></Route>

        </Routes>
        </BrowserRouter>
        </>
    )
};

export default App;