export enum AuthView {
  SIGNIN_VIEW = "signin-view",
  EMAIL_SIGNIN_VIEW = "email-signin-view",
  SIGNUP_VIEW = "signup-view",
  GOOGLE_SIGNUP_VIEW = "google-signup-view",
  CONNECT_GG_ACCOUNT_VIEW = "connect-google-account-view"
}

export interface IUser {
  givenName: string
  familyName: string
  email: string
}
