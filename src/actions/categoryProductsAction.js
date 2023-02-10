import axios from "axios";

const categoryProductsAction = (category) => async (dispatch) => {

    // console.log(category + ' to ja')

    if(category){
        const options = {
            method: "GET",
            url: 'https://fakestoreapi.com/products/category' + category
        }
        const data = await axios.request(options)
        .then(dispatch({type:"LOADED_CATEGORY_PRODUCTS"}))

        dispatch({
            type: "GET_CATEGORY_PRODUCTS",
            payload: data
        })
    }
}

export default categoryProductsAction