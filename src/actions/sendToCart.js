
const sendToCart = (props, count, item) => async (dispatch) => {
    const itemData = await props

    // lista itemów
    let items= [] 
    item.forEach((el) => {
      items.push(el)
    })

    // suma quantity
    let array = []
    // sprawdzenie czy item sie powtarza
    let sameItem = item.filter((el) => el.product.id == props.id)
    sameItem.forEach(element => {
      array.push(element.quantity)
    });
    array.push(count)
    const sum = array.reduce((partialSum, a) => partialSum + a, 0);

    // itemy bez tego który jest wybrany (bez tego który się powtórzył)
    const withoutItem = item.filter((el) => el.product.id != props.id)

    if(sameItem.length > 0){
      // console.log('zastąpiono')
      dispatch({
        type: "UPDATE_CART",
        payload: {
          data: withoutItem
        }
      })
      // console.log('i dodano')
      dispatch({
        type: "SEND_PRODUCTS",
        payload: {
          product: itemData,
          quantity: sum
        }
      })
    }else {
      // console.log('dodano normalnie')
      dispatch({
        type: "SEND_PRODUCTS",
        payload: {
          product: itemData,
          quantity: count
        }
      })
    }
  }

export default sendToCart