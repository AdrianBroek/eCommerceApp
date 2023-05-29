import {combineReducers} from 'redux'
import {productsReducer} from './productsReducer'
import booksReducer from './bookReducer'
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

const rootReducer = combineReducers({
    books: booksReducer,
    items: productsReducer,
    cart: cartReducer,
    categories: categoriesReducer,
    categoryProducts: categoryProductsReducer,
    productData: productReducer,
    loggedStatus: login,
    totalCart: totalReducer,
    order: orderReducer,
    delivery: deliveryReducer,
    overlay: overlayReducer,
    search: searchReducer,
    blog: blogReducer,
    popup: popupReducer
})

export default rootReducer