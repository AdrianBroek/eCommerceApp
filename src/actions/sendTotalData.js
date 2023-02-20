import React from "react";

const sendTotalData = (item, totalSum) => async (dispatch) => {
    dispatch({
        type: "SEND_TOTAL_DATA",
        payload: {
            totalPrice: totalSum.toFixed(2),
            items: item
        }
    })

}

export default sendTotalData