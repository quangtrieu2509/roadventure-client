import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./Auth";

export default configureStore({
  reducer: {
    authReducer: authSlice.reducer
  }
})