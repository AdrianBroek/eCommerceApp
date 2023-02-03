const initState = {
    data: [],
    isLoading: true
}

const productReducer = ((state = initState, action) => {

    switch(action.type){
        case "FETCH_PRODUCT":
            return {
                ...state,
                data: action.payload.data.data,
                isLoading: false
            }
        case "PRODUCT_RESET":
            return {
                ...state,
                isLoading: true
            }
        default:
            return {...state}
    }

})

export default productReducer