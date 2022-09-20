import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'
import { fifaInventory } from '../services/fifaInventory'

export const fifaInventoryAction = createAsyncThunk('fifaInventory/fetchFifaInventory', (options) => {
  const response = fifaInventory(options)
  return response
})

const fifaInventoryErrorHandling = (statusCode) => {
  const mappedData = {
    name: 'fifaInventory',
    displayedErrorHeading: 'GENERIC_ERROR_MSG',
    action: 'Page load',
    errorName: 'moves:Eligibility'
  }
  switch (statusCode) {
    case '503':
      return {
        ...mappedData,
        statusCode,
        details: `[monitor] FIFA Inventory API ${statusCode} | FIFA down for maintenance`
      }
    default:
      return {
        ...mappedData,
        statusCode,
        details: `FIFA Inventory API ${statusCode} | Unable to fetch customer information`
      }
  }
}

export const fifaInventorySlice = createSlice({
  name: 'fifaInventory',
  initialState: { status: 'UNINIT', data: [], error: '' },
  reducers: {
    resetfifaInventoryReducer: (state) => {
      state.status = 'UNINIT'
      state.data = []
      state.error = ''
    }
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      if (action.payload.fifaInventory.status !== 'UNINIT') {
        state.status = action.payload.fifaInventory.status
        state.data = action.payload.fifaInventory.data
        if (action.payload.fifaInventory.status === 'FAILURE') {
          state.error = action.payload.fifaInventory.error
        }
      }
    },
    [fifaInventoryAction.pending]: (state) => {
      state.status = 'PENDING'
    },
    [fifaInventoryAction.fulfilled]: (state, action) => {
      state.status = 'SUCCESS'
      state.data = action.payload
      state.error = ''
    },
    [fifaInventoryAction.rejected]: (state, action) => {
      state.status = 'FAILURE'
      state.error = {
        name: 'fifaInventory',
        ...fifaInventoryErrorHandling(action.error.message || '500'),
        stack: action.error.stack,
        targetEndpoint: action.error.name
      }
    }
  }
})

export const { resetfifaInventoryReducer } = fifaInventorySlice.actions
