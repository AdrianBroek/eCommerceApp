import React from "react";

const popupAction = (status) => (dispatch) => {
    console.log(status)

    dispatch({
        type: "GENERATE_POPUP",
        payload: status
    })
}

export default popupAction