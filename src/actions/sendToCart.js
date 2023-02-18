const sendToCart = (props, count) => async (dispatch) => {
    const itemData = await props

    console.log(props, count)
    dispatch({
        type: "SEND_PRODUCTS",
        payload: {
          product: itemData,
          quantity: count
        }
      })
    // console.log(itemData)
}

export default sendToCart