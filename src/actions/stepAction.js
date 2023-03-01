const stepAction = (props) => async ( dispatch ) => {

    const link = await props

    dispatch({
        type: "SET_ORDER_STEP",
        payload: 
            link
        
    })
}

export default stepAction