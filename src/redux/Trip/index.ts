import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { privacies } from "../../constants/privacies"

type DestInfo = {
  text: string
  placeName: string
  coordinates: number[]
}

// Define a type for the slice state
interface TripState {
  create: {
    privacy: string
    destinations: object[]
    initerary: object[]
  }
  edit: {
    privacy: string
    destinations: object[]
    initerary: object[]
  }
  destInfo: DestInfo | null
  addedDest: {
    info: DestInfo | null
    position: number
  }
}

// Define the initial state using that type
const initialState: TripState = {
  create: {
    privacy: privacies.PUBLIC,
    destinations: [],
    initerary: [],
  },
  edit: {
    privacy: privacies.PUBLIC,
    destinations: [],
    initerary: [],
  },
  destInfo: null,
  addedDest: {
    info: null,
    position: 0,
  },
}

export const tripSlice = createSlice({
  name: "trip",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setCreatePrivacy: (state, action: PayloadAction<string>) => {
      state.create.privacy = action.payload
    },
    setEditPrivacy: (state, action: PayloadAction<string>) => {
      state.edit.privacy = action.payload
    },
    setCreateDestinations: (state, action: PayloadAction<object[]>) => {
      state.create.destinations = action.payload
    },
    setEditDestinations: (state, action: PayloadAction<object[]>) => {
      state.edit.destinations = action.payload
    },
    setCreateItinerary: (state, action: PayloadAction<object[]>) => {
      state.create.initerary = action.payload
    },
    setEditItinerary: (state, action: PayloadAction<object[]>) => {
      state.edit.initerary = action.payload
    },
    setDestInfo: (state, action: PayloadAction<DestInfo | null>) => {
      state.destInfo = action.payload
    },
    setAddedDest: (
      state,
      action: PayloadAction<{ info: DestInfo | null; position: number }>,
    ) => {
      state.addedDest = action.payload
    },
  },
})

export const {
  setEditPrivacy,
  setEditItinerary,
  setCreateDestinations,
  setEditDestinations,
  setCreatePrivacy,
  setCreateItinerary,
  setDestInfo,
  setAddedDest
} = tripSlice.actions

// // Other code such as selectors can use the imported `RootState` type
export const getState = (state: any) => state.tripReducer

export default tripSlice.reducer
