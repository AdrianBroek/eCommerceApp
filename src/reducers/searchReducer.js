const initState = {
    searchResult: []
}

const searchReducer = (state=initState, action) => {
    switch(action.type){
        case "GET_SEARCH_RESULT":
            return {
                ...state,
                searchResult: action.payload
            }
        default :
            return {...state}
    }
}

export default searchReducer