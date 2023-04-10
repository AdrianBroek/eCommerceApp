const initState = {
    open: false
}

const overlayReducer = ((state = initState, action) => {
    switch(action.type){
        case "OVERLAY_ON":
            return {
                open: true
            }
        case "OVERLAY_OFF":
            return {
                open: false
            }
        default:
            return {...state}
    }
})

export default overlayReducer