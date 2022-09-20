import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'
import { fetchCartInitializeInfo } from '../services/cart-initialize'

export const getCartInitialize = createAsyncThunk('cartInitialize/getCartInitialize', (options) => {
  const response = fetchCartInitializeInfo(options)
  return response
})

const cartInitailzeErrorHandling = (name, statusCode) => {
  const mappedData = {
    redirectToEligiblity: false,
    name: 'cartInitialize',
    displayedErrorHeading: 'GENERIC_ERROR_MSG',
    action: 'Load',
    errorName: 'moves:services'

  }
  switch (statusCode) {
    case '503':
      return {
        ...mappedData,
        details: `[monitor] SIAPI API ${statusCode} | SIAPI is down for maintenance`
      }
    case '500':
    case '502':
      return {
        ...mappedData,
        redirectToEligiblity: true,
        details: `SIAPI API ${statusCode} | Unable to create cart due to environment instability`
      }
    case '404':
      return {
        ...mappedData,
        redirectToEligiblity: true,
        details: `SIAPI API ${statusCode} | ADDRESS ADDRESS_NOT_FOUND`,
        displayedErrorHeading: 'USER_REDIRECTED_TO_MANUAL_ADDRESS_PAGE'
      }
    case '400':
      return {
        ...mappedData,
        details: `SIAPI API ${statusCode} | ${name}`,
        displayedErrorHeading: 'USER_REDIRECTED_TO_MANUAL_ADDRESS_PAGE'
      }
    default:
      return {
        ...mappedData,
        details: `SIAPI API ${statusCode} | Failure`,
        displayedErrorHeading: 'GENERIC_ERROR_MSG'
      }
  }
}
export const cartInitializeSlice = createSlice({
  name: 'cartInitialize',
  initialState: { status: 'UNINIT', data: [], error: '' },
  reducers: {
    resetCartInitializeReducer: (state) => {
      state.status = 'UNINIT'
      state.data = []
      state.error = ''
    },
    setCartPatchData: (state, cartPatchData) => {
      state.data = cartPatchData.payload
    }
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      if (action.payload.cartInitialize.status !== 'UNINIT') {
        state.status = action.payload.cartInitialize.status
        state.data = action.payload
      }
    },
    [getCartInitialize.pending]: (state, action) => {
      state.status = 'PENDING'
    },
    [getCartInitialize.fulfilled]: (state, action) => {
      state.status = 'SUCCESS'
      state.data = action.payload
      state.error = ''
    },
    [getCartInitialize.rejected]: (state, action) => {
      state.status = 'FAILURE'
      state.error = {
        ...cartInitailzeErrorHandling(action.error.name, action.error.message || '500'),
        statusCode: action.error.message || '500',
        stack: action.error.stack,
        targetEndpoint: action.error.name
      }
    }
  }
})

export const { resetCartInitializeReducer, setCartPatchData } = cartInitializeSlice.actions
