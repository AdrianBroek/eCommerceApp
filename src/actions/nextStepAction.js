const nextStepAction = (props) => async ( dispatch ) => {

    const step = await props

    switch(step){
        case "products":
            return    dispatch({
                type: "SET_ORDER_NEXT_STEP",
                payload: 
                    'delivery'
            })
        case "delivery":
            return dispatch({
                type: "SET_ORDER_NEXT_STEP",
                payload: 
                    'summary'
            })
        default :
            return step     
    }

    // console.log(step)


}

export default nextStepAction