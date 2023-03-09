const initState = {
    totalPrice: 0,
    items: [],
    edit: true,
    delivery: false,
    personalData: false
}

const totalReducer = (state=initState, action) => {
    switch(action.type){
        case "SEND_TOTAL_DATA" : 
            return {
                ...state,
                totalPrice: action.payload.totalPrice,
                items: action.payload.items
            }
        case "EDIT_TOTAL_DATA" : 
            return {
                ...state,
                edit: action.payload
            }
        case "SET_DELIVERY_DATA" : 
            return {
                ...state,
                delivery: action.payload
            }
        case "SET_PERSONAL_DATA" : 
            return {
                ...state,
                personalData: action.payload
            }
        default:
            return {...state}
    }
}

export default totalReducer