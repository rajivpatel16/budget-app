import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'
import { outageServices } from '../services/outage'

export const fetchOutage = createAsyncThunk('outage/fetchOutage', async (options) => {
  const response = await outageServices(options)
  return response
})

export const outageSlice = createSlice({
  name: 'outage',
  initialState: { status: 'UNINIT', data: [], error: '' },
  reducers: {},
  extraReducers: {
    [HYDRATE]: (state, action) => {
      if (action.payload.outage.status !== 'UNINIT') {
        state.status = action.payload.outage.status
        state.data = action.payload.outage.data
      }
    },
    [fetchOutage.pending]: (state, action) => {
      state.status = 'PENDING'
    },
    [fetchOutage.fulfilled]: (state, action) => {
      state.status = 'SUCCESS'
      state.data = action.payload
      state.error = ''
    },
    [fetchOutage.rejected]: (state, action) => {
      state.status = 'FAILURE'
      state.error = {
        name: 'outage',
        displayedErrorHeading: '',
        statusCode: action.error.message || '500',
        stack: action.error.stack,
        targetEndpoint: action.error.name
      }
    }
  }
})
