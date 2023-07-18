import React, { useEffect } from "react";
import { useSelector } from "react-redux";

const popupAction = (status, msg) => (dispatch) => {
    dispatch({
        type: "GENERATE_POPUP",
        payload: {
            status,
            msg
        }
    })
}

export default popupAction