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
                        popup: action.payload
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