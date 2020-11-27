const authReducer = (state = {}, action) => {
    switch (action.type) {
        case 'IS_LOADING':
            return { ...state, isLoading: action.data };
        case 'AUTH_DATA':
        return { ...state, authData: action.data };
        case 'PROFILE_DATA':
        return { ...state, profileData: action.data };
        default:
            return state;
    }
};
export default authReducer;

export const getAuthData = (state) => state.authData
