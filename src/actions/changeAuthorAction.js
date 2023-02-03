const changeAuthor = () => (dispatch) => {
    dispatch({
      type: "CHANGE_AUTHOR",
      payload: {
        author: 
          'adrian'
      }
    })
  }

export default changeAuthor