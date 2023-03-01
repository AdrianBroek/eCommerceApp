const initState = {
    totalPrice: 0,
    items: [],
    edit: true
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
        default:
            return {...state}
    }
}

export default totalReducer