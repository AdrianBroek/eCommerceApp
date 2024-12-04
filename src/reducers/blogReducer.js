const initState = {
    blogList: [],
    isLoading: true,
    activePost: null,
    activeTag: null,
    tagList: [],
    tagsLoading: true
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
        case "SET_TAG_LIST" :
            return {
                ...state,
                tagList: action.payload,
                tagsLoading: true
            }
        case "SET_ACTIVE_TAG" :
            return {
                ...state,
                activeTag: action.payload,
            }
        case "LOADED_TAG_LIST" :
            return {
                ...state,
                tagsLoading: false
            }
        default: return {...state}
    }
}

export default blogReducer