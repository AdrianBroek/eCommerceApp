const initState = {
    data: {
        username: '',
        email: '',
        firstname: '',
        lastname: '',
        password: '',
        address: '',
        id: '',
    }
}

const orderUserDataReducer = (state = initState, action) => {
    switch(action.type){
        case "CHANGE_DELIVERY_INPUTS_DATA" : 
            return {
                ...state,
                data: action.payload,
            }
        default:
            return {...state}
    }
}

export default orderUserDataReducer