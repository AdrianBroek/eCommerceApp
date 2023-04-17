import React, {useEffect} from "react";
import {useDispatch, useSelector} from 'react-redux'
import './styles/app.scss'
import Cart from "./components/Cart";
import CartPage from './pages/CartPage'
import Navbar from "./components/Navbar";
import { Routes , Route, useLocation } from "react-router-dom";
import HomePage from "./components/HomePage";
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'
import OrderPage from "./pages/OrderPage";
import CategoryPage from "./pages/CategoryPage";
import CartPopup from "./components/CartPopup";
import Delivery from "./components/Delivery";
import Summary from "./components/Summary";
import OrderProducts from "./components/OrderProducts";
import ProductPage from "./pages/ProductPage";
import Login from "./pages/LoginPage";
import Register from "./pages/RegisterPage";
import AccountPage from "./pages/AccountPage";
import Overlay from "./components/Overlay";

function App() {
  const queryClient = new QueryClient()
  const location = useLocation()
  const dispatch = useDispatch()

  const {item, open, popup} = useSelector(state => state.cart)
  const {logged, userData} = useSelector(state => state.loggedStatus)

  useEffect(()=> {
    let timer = setTimeout(()=> {dispatch({type: "CLOSE_POPUP"})}, 5000)

    return () => {
      clearTimeout(timer)
    }

  }, [popup.op])

  return (
    <QueryClientProvider client={queryClient}>
    
    <div className="App">
        <Cart />
        <Navbar />
        <Overlay />
        {popup.op ? <CartPopup props={popup.prop}/> : console.log()}
        <Routes location={location} key={location.pathname}>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/my_account" element={<AccountPage />}></Route>
          <Route path="/" element={<HomePage />} ></Route>
          <Route path="/product/:id" element={<ProductPage />}></Route>
          <Route path="/cart" element={<CartPage />} ></Route>
          <Route path="/category/" element={<CategoryPage />}>
            <Route path="/category/:id" element={<CategoryPage />} />
          </Route>
          <Route path="/order/" element={<OrderPage />}>
            <Route path="/order/delivery" element={ <Delivery />} />
            <Route path="/order/products" element={ <OrderProducts />} />
            <Route path="/order/summary" element={ <Summary />} />
          </Route>
        </Routes>
    </div>
    </QueryClientProvider>
  );
}

export default App;
