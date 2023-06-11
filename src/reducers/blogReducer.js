const initState = {
    blogList: [],
    isLoading: true,
    activePost: null,
    activeTag: null
}

const blogReducer = (state=initState, action) => {
    switch(action.type){
        case "GET_BLOGS" : 
            return {
                ...state,
                blogList: action.payload,
                isLoading: true
            }
        case "LOADED_BLOG_LIST" :
            return {
                ...state,
                isLoading: false
            }
        case "SET_ACTIVE_POST" :
            return {
                ...state,
                activePost: action.payload
            }
        case "SET_ACTIVE_TAG_POSTS":
            return {
                ...state,
                activeTag: action.payload
            }
        default: return {...state}
    }
}

export default blogReducer