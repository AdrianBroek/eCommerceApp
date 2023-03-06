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
    delivery: deliveryReducer
})

export default rootReducer