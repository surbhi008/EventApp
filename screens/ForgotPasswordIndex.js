import { callChangePassword, callForgotPassword, callVerifyOtp } from '../actions';
import { connect } from 'react-redux'
import withLoadingScreen from '../HOC/spinner';
import { compose } from "recompose"

const mapDispatchToProps = (dispatch) => ({
  callForgotPasswordApi: (data) => dispatch(callForgotPassword(data)),
  callVerifyOtp: (data) => dispatch(callVerifyOtp(data)),
  callChangePassword: (data) => dispatch(callChangePassword(data))
})

const mapStateToProps = (state) => ({
  isLoading: state.isLoading,
})

export const container = compose(
  connect(
      mapStateToProps,
      mapDispatchToProps
  ),
  // withLoadingScreen
)