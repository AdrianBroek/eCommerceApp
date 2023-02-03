
const initState = {
    data: [],
    isLoading: true
}

const categoryProductsReducer = (state=initState, action) => {
    switch(action.type){
        case "GET_CATEGORY_PRODUCTS":
            return {
                ...state,
                data: action.payload.data,
                isLoading: false
            }
        case "LOADED_CATEGORY_PRODUCTS":
            return {
                ...state, 
                isLoading: true
            }
        default:
            return {...state}
    }

}

export default categoryProductsReducer