const initState = {
    payment: {
        cost: false,
        type: false
    },
    courier: {
        type: false
    },
    delivery: {
        cost: false,
        type: false
    },
    agreement: {
        type: false
    },
    isSet: false
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
        case "ORDER_DELIVERY_SET" : 
            return {
                ...state,
                isSet: action.payload,
            }
        default:
            return {...state}
    }
}

export default deliveryReducer