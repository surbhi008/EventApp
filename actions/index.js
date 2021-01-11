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

