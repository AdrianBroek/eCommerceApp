const sendToCart = (props) => async (dispatch) => {
    const itemData = await props

    console.log(props)
    dispatch({
        type: "SEND_PRODUCTS",
        payload: {
          data: itemData,
        }
      })
    // console.log(itemData)
}

export default sendToCart