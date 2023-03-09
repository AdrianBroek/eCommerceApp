const initState = {
    payment: false,
    courier: false,
    delivery: false,
    agreement: false,
}

const deliveryReducer = (state=initState, action) => {
    switch(action.type){
        case "CHANGE_DELIVERY_OPTION" : 
            return {
                ...state,
                delivery: action.payload,
            }
        case "CHANGE_COURIER_OPTION" : 
            return {
                ...state,
                courier: action.payload,
            }
        case "CHANGE_PAYMENT_OPTION" : 
            return {
                ...state,
                payment: action.payload,
            }
        case "CHANGE_AGREEMENT_OPTION" : 
            return {
                ...state,
                agreement: action.payload,
            }
        default:
            return {...state}
    }
}

export default deliveryReducer