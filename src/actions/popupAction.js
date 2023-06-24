import React, { useEffect } from "react";
import { useSelector } from "react-redux";

const popupAction = (status, popupList) => (dispatch) => {
    dispatch({
        type: "GENERATE_POPUP",
        payload: status
    })
}

export default popupAction