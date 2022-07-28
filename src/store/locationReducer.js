import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'
import { fetchServiceLocation } from '../services/service-location'

export const serviceLocationAction = createAsyncThunk('serviceLocationAction/fetchServiceLocation', async (options) => {
  const response = await fetchServiceLocation(options)
  return response
})

const serviceLocationErrorHandling = (statusCode) => {
  const mappedData = {
    name: 'serviceLocation',
    displayedErrorHeading: 'GENERIC_ERROR_MSG',
    action: 'click',
    errorName: 'moves:eligibility'
  }
  switch (statusCode) {
    case '500':
    case '429':
    case '400':
      return {
        ...mappedData,
        details: `Service Location API ${statusCode}| Unable to validate MI address due to environment instability`
      }
    case '503':
      return {
        ...mappedData,
        details: `[monitor] Service Location API ${statusCode} | Service Unavailable - Service Location API down for maintenance`
      }
    default:
      return {
        ...mappedData,
        details: `Service Location API ${statusCode} | Unable to fetch information`
      }
  }
}

export const serviceLocationSlice = createSlice({
  name: 'serviceLocation',
  initialState: { status: 'UNINIT', data: {}, error: '' },
  reducers: {
    resetServiceLocationReducer: (state) => {
      state.status = 'UNINIT'
      state.data = {}
    }
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      if (action.payload.serviceLocation.status !== 'UNINIT') {
        state.status = action.payload.serviceLocation.status
        state.data = action.payload
      }
    },
    [serviceLocationAction.pending]: (state, action) => {
      state.status = 'PENDING'
    },
    [serviceLocationAction.fulfilled]: (state, action) => {
      state.status = 'SUCCESS'
      state.data = action.payload
    },
    [serviceLocationAction.rejected]: (state, action) => {
      state.status = 'FAILURE'
      state.error = {
        ...serviceLocationErrorHandling(action.error.message || '500'),
        stack: action.error.stack,
        targetEndpoint: action.error.name
      }
    }
  }
})

export const { resetServiceLocationReducer } = serviceLocationSlice.actions
