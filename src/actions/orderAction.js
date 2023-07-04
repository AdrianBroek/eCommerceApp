import uuid from "react-uuid";

const orderAction = (order) => (dispatch) => {
    // console.log(order)
    dispatch({
        type: "SET_ORDER",
        payload: {
            user: {
                userData: order.orderUser.userData,
                registered: order.orderUser.registered
            },
            products: order.orderProduct.products,
            totalPrice: order.orderPrice,
            delivery: order.orderDelivery,
            deliveryStatus: 'pending',
            id: uuid()
        }
    })

    dispatch({
        type: "CLEAR_ALL_PROD"
    })
}

export default orderAction