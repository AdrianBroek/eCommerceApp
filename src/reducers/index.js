import {combineReducers} from 'redux'
import {productsReducer} from './productsReducer'
import booksReducer from './bookReducer'
import cartReducer from './cartReducer'
import categoriesReducer from './categoriesReducer'
import categoryProductsReducer from './categoryProductsReducer'
import productReducer from './productReducer'
import login from './loginReducer'

const rootReducer = combineReducers({
    books: booksReducer,
    items: productsReducer,
    cart: cartReducer,
    categories: categoriesReducer,
    categoryProducts: categoryProductsReducer,
    productData: productReducer,
    loggedStatus: login  
})

export default rootReducer