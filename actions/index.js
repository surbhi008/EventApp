export const callLogin = (data) => ({
    type: "LOGIN_API",
    data: data
});

export const callSignUp = (data) => ({
    type: "SIGNUP_API",
    data: data
});

export const callUpdateProfile = (data) => ({
    type: "UPDATEPROFILE_API",
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

export const callForgotPassword = (data) => ({
    type: "FORGOTPASSWORD_API",
    data: data
});

export const callVerifyOtp = (data) => ({
    type: "CALL_VERIFY_OTP",
    data: data
});

export const callChangePassword = (data) => ({
    type: "CALL_CHANGE_PASSWORD",
    data: data
});

export const callEventListApi = (data) => ({
    type: "EVENT_LIST",
    data: data
});

export const callAddEventApi = (data) => ({
    type: "ADD_EVENT",
    data: data
});

export const callDeleteEventApi = (data) => ({
    type: "DELETE_EVENT",
    data: data
});

export const callUpdateEventApi = (data) => ({
    type: "UPDATE_EVENT",
    data: data
});

export const callUpdateImageApi = (data) => ({
    type: "UPLOAD_IMAGE",
    data: data
});

