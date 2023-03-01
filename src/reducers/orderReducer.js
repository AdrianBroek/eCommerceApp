const initState = {
    orderStep: null,
    nextStep: null,
    prevStep: null
}

const orderReducer = ((state = initState, action) => {
    switch(action.type){
        case "SET_ORDER_STEP":
            return {
                ...state,
                orderStep: action.payload
            }
        case "SET_ORDER_NEXT_STEP":
            return {
                ...state,
                nextStep: action.payload
            }
        case "SET_ORDER_PREV_STEP":
            return {
                ...state,
                prevStep: action.payload
            }
        default:
            return {...state}
    }
})

export default orderReducer