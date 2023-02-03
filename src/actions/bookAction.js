const booksAction = () => async( dispatch ) => {

    dispatch({
        type: "FETCH_BOOKS",
        payload: {
            author: {
                name: 'hAdrianej'
            },
            tytuł: {
                name: "Zielone Wzgórze"
            }
        }
    })
    
}

export default booksAction