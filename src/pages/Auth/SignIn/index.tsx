import { useGoogleLogin } from "@react-oauth/google";
import { useDispatch } from "react-redux";

import './index.style.scss'
import { apiCaller } from "../../../api";
import { authApi } from "../../../api";
import { BASE_URL } from "../../../configs";
import { ENDPOINTS, IMAGE_PATH } from "../../../constants";
import axios from "axios";
import { RRError } from "../../../types";
import { setEmailSignInView } from "../../../redux/Auth";

export default function SignIn() {
  const dispatch = useDispatch();

  const signInByGoogle = useGoogleLogin({
    onSuccess: async tokenResponse => {
      const response = await apiCaller(
        {
          request: authApi.signinByGoogle(tokenResponse.access_token)
        }
      )
      // const response = await axios.get(
      //   BASE_URL + ENDPOINTS.GOOGLE_AUTH, 
      //   { 
      //     headers:
      //       { 
      //         Authorization: `Bearer a${tokenResponse.access_token}` 
      //       } 
      //   }
      // )
      // .catch((error) => {
      //   console.log(error.response.data)
      // })

      if (response !== null) {
        const responseJSON = response as unknown as RRError
        if (responseJSON.ec === 210) {
          alert(responseJSON.msg)
        }
        else {
          localStorage.setItem('token', response.data.accessToken)
          window.location.reload()
        }
      }
    },
  });

  const signInByEmail = () => {
    dispatch(setEmailSignInView())
  }

  return (
    <div className="signin-page w-96 px-10 pt-6 pb-10" style={{ fontFamily: "Poppins" }}>
      <div className="signin-header">
        <div className="w-full flex justify-center">
          <div className="w-12">
            <img
              alt="#"
              src={IMAGE_PATH.LOGO}
              className="image w-full"
            />
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
          <div className="signin-btn hover:bg-buttonHover"
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
          <div className="signin-btn hover:bg-buttonHover"
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
      {/* <div className="signin-footer">
        <p className="px-7 mt-24 mb-0 text-xs text-subText text-center">
          By proceeding, you agree to our <u className="cursor-pointer">Terms of Use</u> and confirm 
          you have read our <u className="cursor-pointer">Privacy and Cookie Statement</u>.
        </p>
      </div> */}
      
    </div>
  );
}