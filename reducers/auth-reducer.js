const reducer = (state = {}, action) => {
    switch (action.type) {
        case 'GET_CHEMICAL':
            return { ...state, chemicals: action.json, loading: false };
        case 'VIDEO_RECEIVED':
            return { ...state, video: action.json, loading: false }
        case 'SET_IMAGE':
            return { ...state, image: action.url, loading: false }
        default:
            return state;
    }
};
export default reducer;