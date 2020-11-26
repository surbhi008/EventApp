const authReducer = (state = {}, action, loading) => {
    switch (action.type) {
        case 'IS_LOADING':
            return { ...state, isLoading: action.data };
        case 'AUTH_DATA':
        return { ...state, authData: action.data };
        default:
            return state;
    }
};
export default authReducer;