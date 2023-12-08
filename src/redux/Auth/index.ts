import { createSlice } from '@reduxjs/toolkit'
import { AuthView } from './types'
// import { SignInActionTypes, SignInProps, SignInState } from "./actionTypes"

// Define a type for the slice state
interface AuthState {
  currentView: AuthView
}

// Define the initial state using that type
const initialState: AuthState = {
  currentView: AuthView.SIGNIN_VIEW,
}

export const authSlice = createSlice({
  name: 'auth',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setSignInView: (state) => {
      state.currentView = AuthView.SIGNIN_VIEW
    },
    setEmailSignInView: (state) => {
      state.currentView = AuthView.EMAIL_SIGNIN_VIEW
    },
    setSignUpView: (state) => {
      state.currentView = AuthView.SIGNUP_VIEW
    }
  },
})

export const { 
  setEmailSignInView, 
  setSignInView, 
  setSignUpView 
} = authSlice.actions

// // Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.counter.value
export const getCurrentView = (state: any) => state.authReducer.currentView;

export default authSlice.reducer