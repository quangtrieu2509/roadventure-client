import ConnectGoogle from "../../pages/Auth/ConnectGoogle"
import EmailSignIn from "../../pages/Auth/EmailSignIn"
import GoogleSignUp from "../../pages/Auth/GoogleSignUp"
import SignIn from "../../pages/Auth/SignIn"
import SingUp from "../../pages/Auth/SignUp"

export const AuthView = {
  SIGNIN: <SignIn/>,
  EMAIL_SIGNIN: <EmailSignIn/>,
  SIGNUP: <SingUp/>,
  GOOGLE_SIGNUP: <GoogleSignUp/>,
  CONNECT_GG_ACCOUNT: <ConnectGoogle/>
}

export interface IUser {
  givenName: string
  familyName: string
  email: string
}
