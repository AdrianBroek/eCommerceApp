import React, {useEffect} from "react";
import {useDispatch, useSelector} from 'react-redux'
import './styles/app.scss'
import Cart from "./components/Cart";
import CartPage from './pages/CartPage'
import Navbar from "./components/Navbar";
import { Routes , Route, useLocation } from "react-router-dom";
import HomePage from "./pages/HomePage";
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
import Search from "./components/Search";
import SearchPage from "./pages/SearchPage";
import BlogPage from "./pages/BlogPage";
import Post from "./components/Post";
import Popup from './components/Popup'
import ThankYouPage from "./pages/ThankYouPage";
import TutorPage from "./pages/TutorPage";
import { AnimatePresence } from "framer-motion";
import RegisterPage from "./pages/RegiPage";

function App() {
  const queryClient = new QueryClient()
  const location = useLocation()
  const dispatch = useDispatch()
  const {popup} = useSelector(state => state.cart)
  const {popupList} = useSelector(state => state.popup)
  const {pathname} = useLocation()

  // check if order in local storage is on, 
  // if yes, now make one with empty array
  useEffect(()=> {
    let orders = localStorage.getItem('orders')
    if(orders === null){
      localStorage.setItem('orders', JSON.stringify([]))
    }else{
      // put to redux store what is inside localstorage
      dispatch({
        type: "SET_ORDERS",
        payload: JSON.parse(localStorage.getItem('orders'))
      })
    }
  }, [])

  useEffect(()=> {
    if(!pathname.includes("blog")){
      window.scrollTo(0,0);
    }
    
  }, [pathname])

  return (
    <QueryClientProvider client={queryClient}>
    <div className="App">
        <TutorPage />
        <Cart />
        <Navbar />
        {popupList.length > 0 ? 
        
        <div id="popup" className="flex">
          <AnimatePresence>
            {popupList.map((popupItem, index)=> (
              <Popup popup={popupItem} index={index} key={popupItem.id}/>
            ))}
          </AnimatePresence>
        </div>
        
        : ""
        }
        {popup.op ? <CartPopup props={popup.prop}/> : console.log()}
        <section className="content">
        <Routes location={location} key={location.pathname}>
          {/* <Route path="/register" element={<Register />}></Route> */}
          <Route path="/register" element={<RegisterPage />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/my_account" element={<AccountPage />}></Route>
          <Route path="/" element={<HomePage />} ></Route>
          <Route path="/product/:id" element={<ProductPage />}></Route>
          <Route path="/cart" element={<CartPage />} ></Route>
          <Route path="/category/" element={<CategoryPage />}>
            <Route path=":id" element={<CategoryPage />} />
          </Route>
          <Route path="/order/" element={<OrderPage />}>
            <Route path="/order/delivery" element={ <Delivery />} />
            <Route path="/order/products" element={ <OrderProducts />} />
            <Route path="/order/summary" element={ <Summary />} />
            <Route path="/order/pay" element={<ThankYouPage />} />
          </Route>
          <Route path="/search" element={<SearchPage />} ></Route>
          <Route path="/blog" element={<BlogPage />} >
              <Route path=":id" element={<Post />}></Route>
          </Route>
        </Routes>
        
        </section>
        <Overlay />
    </div>
    </QueryClientProvider>
  );
}

export default App;
