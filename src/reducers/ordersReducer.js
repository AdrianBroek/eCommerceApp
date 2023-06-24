const initState = {
    orders: []
}

const ordersReducer = (state = initState, action) => {
    switch(action.type){
        case "SET_ORDER": 
            return {
                orders: [
                    ...state.orders,
                    action.payload
                ]
            }
        case "SET_ORDERS": 
            return {
                orders: action.payload
            }
        default: return {...state}
    }
}

export default ordersReducer


