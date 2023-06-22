const initState = {
        active: false,
        popupList: []
    }

const popupReducer = ((state=initState, action) => {
   switch(action.type){
        case "GENERATE_POPUP" :
            return {
                active: true,
                popupList: [
                    ...state.popupList,
                    {
                        status: action.payload,
                        timeout: 5
                    }
                ]
            }
        case "DELETE_POPUP" :
            return {
                ...state,
                popupList: [...action.payload]
            }
        default : return {...state}
   } 
})

export default popupReducer