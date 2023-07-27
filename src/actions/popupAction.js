

const popupAction = (status, msg, id) => (dispatch) => {
    dispatch({
        type: "GENERATE_POPUP",
        payload: {
            status,
            msg,
            id
        }
    })
}

export default popupAction