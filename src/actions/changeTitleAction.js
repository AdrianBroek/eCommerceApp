const changeTitle = () => (dispatch) => {
    dispatch({
      type: "CHANGE_TITLE",
      payload: {
        tytuł: {
          name: 'KUTAS'
        }

      }
    })
  }

export default changeTitle