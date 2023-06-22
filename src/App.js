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


function App() {
  const queryClient = new QueryClient()
  const location = useLocation()
  const dispatch = useDispatch()
  const {popup} = useSelector(state => state.cart)
  const {popupList} = useSelector(state => state.popup)

  return (
    <QueryClientProvider client={queryClient}>
    <div className="App">
        <Cart />
        <Navbar />
        {popupList.length > 0 ? 
        <div id="popup" className="flex">
          {popupList.map((popupItem, index)=> (
            <Popup popup={popupItem} index={index}/>
          ))
        }
        </div>
        : ""
        }
        {popup.op ? <CartPopup props={popup.prop}/> : console.log()}
        <section className="content">
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
          <Route path="/search" element={<SearchPage />} ></Route>
          <Route path="/blog" element={<BlogPage />} >
              <Route path="/blog/:id" element={<Post />}></Route>
          </Route>
        </Routes>
        
        </section>
        <Overlay />
    </div>
    </QueryClientProvider>
  );
}

export default App;
