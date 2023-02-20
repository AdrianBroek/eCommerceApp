const initState = {
    totalPrice: 0,
    items: [],
}

const totalReducer = (state=initState, action) => {
    switch(action.type){
        case "SEND_TOTAL_DATA" : 
            return {
                ...state,
                totalPrice: action.payload.totalPrice,
                items: action.payload.items
            }
        default:
            return {...state}
    }
}

export default totalReducer