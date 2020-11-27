export const callLogin = (data) => ({
    type: "LOGIN_API",
    data: data
});

export const callSignUp = (data) => ({
    type: "SIGNUP_API",
    data: data
});

export const loginDataAction = (data) => ({
    type: "AUTH_DATA",
    data: data
});

export const profileApiCall = (data) => ({
    type: "PROFILE_API",
    data: data
});
