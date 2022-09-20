import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'
import { cartPatch } from '../services/cartPatch'

export const cartPatchAction = createAsyncThunk('cartPatchAction/cartPatch', (options) => {
  const response = cartPatch(options)
  return response
})

export const cartPatchSlice = createSlice({
  name: 'cartPatch',
  initialState: { status: 'UNINIT', data: [], error: '' },
  reducers: {
    resetcartPatchReducer: (state) => {
      state.status = 'UNINIT'
      state.data = []
      state.error = ''
    }
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      if (action.payload.cartPatch.status !== 'UNINIT') {
        state.status = action.payload.cartPatch.status
        state.data = action.payload
      }
    },
    [cartPatchAction.pending]: (state, action) => {
      state.status = 'PENDING'
    },
    [cartPatchAction.fulfilled]: (state, action) => {
      state.status = 'SUCCESS'
      state.data = action.payload
      state.error = ''
    },
    [cartPatchAction.rejected]: (state, action) => {
      state.status = 'FAILURE'
      state.error = {
        name: 'cartPatch',
        displayedErrorHeading: '',
        statusCode: action.error.message || '500',
        stack: action.error.stack,
        action: 'Load',
        errorName: 'moves:service',
        details: `Cartpatch API ${action.error.message || '500'} | Unable to patch cart`,
        targetEndpoint: action.error.name
      }
    }
  }
})

export const { resetcartPatchReducer } = cartPatchSlice.actions
