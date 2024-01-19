import { useGoogleLogin } from "@react-oauth/google"
import { useDispatch } from "react-redux"

import "./index.style.scss"
import "../index.style.scss"
import { apiCaller } from "../../../api"
import { authApi } from "../../../api"
import { IMAGE_PATH } from "../../../constants"
import { setView, setUser, setGoogleToken } from "../../../redux/Auth"
import { messages } from "../../../constants/message"
import { APIResponse } from "../../../types/response"
import { AuthView } from "../../../redux/Auth/types"
import { setAuthStorage } from "../../../utils/Auth"

export default function SignIn() {
  const dispatch = useDispatch()

  const signInByGoogle = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      const GoogleToken = tokenResponse.access_token
      dispatch(setGoogleToken(GoogleToken))
      const res = await apiCaller(authApi.signInByGoogle(GoogleToken))

      if (res !== null) {
        const apiResponse = res as APIResponse

        if (apiResponse.ec === messages.CONTINUE_SIGN_IN.ec) {
          dispatch(setView(AuthView.GOOGLE_SIGNUP))
          dispatch(setUser(apiResponse.data))
        } else if (apiResponse.ec === messages.CONNECT_GOOGLE_ACCOUNT.ec) {
          dispatch(setView(AuthView.CONNECT_GG_ACCOUNT))
          dispatch(setUser(apiResponse.data.user))

          setAuthStorage(res.data)
        } else {
          setAuthStorage(res.data)
          window.location.reload() // fix here
          //dispatch(setState(false))
        }
      }
    },
  })

  const signInByEmail = () => {
    dispatch(setView(AuthView.EMAIL_SIGNIN))
  }

  return (
    <div className="auth-page">
      <div className="signin-header">
        <div className="w-full flex justify-center">
          <div className="w-12">
            <img alt="#" src={IMAGE_PATH.LOGO} className="image w-full" />
          </div>
        </div>
        <p className="text-2xl font-semibold mt-2 mb-12">
          Discover more interesting things of
          <span className=" text-main font-bold"> road</span>
          <span className="font-bold">venture</span> by:
        </p>
      </div>
      <div className="signin-body flex-col pb-2">
        <div>
          <div
            className="signin-btn hover:bg-buttonHover"
            onClick={() => signInByGoogle()}
          >
            <div className="signin-btn-icon">
              <img
                alt="#"
                src={IMAGE_PATH.GOOGLE_ICON}
                className="image w-full"
              />
            </div>
            <span className="w-full text-center">Continue with Google</span>
          </div>
        </div>
        <div>
          <div
            className="signin-btn hover:bg-buttonHover"
            onClick={signInByEmail}
          >
            <div className="signin-btn-icon">
              <img
                alt="#"
                src={IMAGE_PATH.EMAIL_ICON}
                className="image w-full"
              />
            </div>
            <span className="w-full text-center">Continue with email</span>
          </div>
        </div>
      </div>
    </div>
  )
}
