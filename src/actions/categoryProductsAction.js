import axios from "axios";

const categoryProductsAction = (category) => async (dispatch) => {

    console.log(category + ' to ja')

    if(category){
        const options = {
            method: "GET",
            url: 'https://dummyjson.com/products/category' + category
        }
        // console.log(options.url)
        const data = await axios.request(options)
        .then(dispatch({type:"LOADED_CATEGORY_PRODUCTS"}))
        // console.log(data.data.products)
        dispatch({
            type: "GET_CATEGORY_PRODUCTS",
            payload: {
                data: data.data.products
            }
        })
    }
}

export default categoryProductsAction