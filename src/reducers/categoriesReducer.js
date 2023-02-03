const initState = {
    dataCat: [],
    isLoadingCat: true,
    activeCategory: null,
}

const categoriesReducer = (state = initState, action) => {
    switch(action.type){
        case "FETCH_CATEGORIES":
            return {
                ...state,
                dataCat: action.payload.data,
                isLoadingCat: false
            }
        case "SET_ACTIVE_CATEGORY":
            return {
                ...state,
                activeCategory: action.payload,
            }
        default:
            return {
                ...state
            }
    }
}

export default categoriesReducer