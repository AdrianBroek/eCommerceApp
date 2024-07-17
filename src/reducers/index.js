import {combineReducers} from 'redux'
import {productsReducer} from './productsReducer'
import cartReducer from './cartReducer'
import categoriesReducer from './categoriesReducer'
import categoryProductsReducer from './categoryProductsReducer'
import productReducer from './productReducer'
import totalReducer from './totalReducer'
import login from './loginReducer'
import orderReducer from './orderReducer'
import deliveryReducer from './deliveryReducer'
import overlayReducer from './overlayReducer'
import searchReducer from './searchReducer'
import blogReducer from './blogReducer'
import popupReducer from './popupReducer'
import ordersReducer from './ordersReducer'

const rootReducer = combineReducers({
    items: productsReducer,
    cart: cartReducer,
    categories: categoriesReducer,
    categoryProducts: categoryProductsReducer,
    productData: productReducer,
    loggedStatus: login,
    totalCart: totalReducer,
    orderSteps: orderReducer,
    delivery: deliveryReducer,
    overlay: overlayReducer,
    search: searchReducer,
    blog: blogReducer,
    popup: popupReducer,
    orders: ordersReducer, 
})

export default rootReducer