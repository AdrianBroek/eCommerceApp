const initState = {
    active: false,
    status: ""
}

const popupReducer = ((state=initState, action) => {
   switch(action.type){
        case "LOAD_POPUP" :
            return {
                ...state,
                active: true,
                status: action.payload
            }
        case "OFF_POPUP" :
            return {
                ...state,
                active: false,
            }
        default : return {...state}
   } 
})

export default popupReducer