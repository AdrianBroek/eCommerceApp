const prevStepAction = (props) => async ( dispatch ) => {

    const step = await props

    switch(step){
        case "summary":
            return    dispatch({
                type: "SET_ORDER_PREV_STEP",
                payload: 
                    'delivery'
            })
        case "delivery":
            return dispatch({
                type: "SET_ORDER_PREV_STEP",
                payload: 
                    'products'
            })
        default :
            return step     
    }

    // console.log(step)


}

export default prevStepAction