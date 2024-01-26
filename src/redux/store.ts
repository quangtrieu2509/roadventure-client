import { configureStore } from "@reduxjs/toolkit"
import { authSlice } from "./Auth"
import { headerSlice } from "./Header"
import { tripSlice } from "./Trip"


export default configureStore({
  reducer: {
    authReducer: authSlice.reducer,
    headerReducer: headerSlice.reducer,
    tripReducer: tripSlice.reducer
  }
})
