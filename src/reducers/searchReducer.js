const initState = {
    searchResult: [],
    searchPageResults: [],
    isLoading: true,
    query: null
}

const searchReducer = (state=initState, action) => {
    switch(action.type){
        case "GET_SEARCH_RESULT":
            return {
                ...state,
                searchResult: action.payload,
            }
        case "CLEAR_SEARCH_RESULT":
            return {
                ...state,
                searchResult: action.payload
            }
        case "PUT_SEARCHPAGE_RESULT":
            return {
                ...state,
                searchPageResults: action.payload,
                isLoading: false,
                query: action.query
            }
        case "LOADED_SEARCH_RESULT":
            return {
                ...state, 
                isLoading: true
            }
        default :
            return {...state}
    }
}

export default searchReducer