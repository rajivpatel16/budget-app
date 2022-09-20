import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'
import { getHsSession } from '../services/hsSession'

export const getHSSession = createAsyncThunk('session/getHSSession', async (option) => {
  const response = await getHsSession(option)
  return response
})

export const hsSessionSlice = createSlice({
  name: 'hsSession',
  initialState: { status: 'UNINIT', data: {}, error: '' },
  reducers: {},
  extraReducers: {
    [HYDRATE]: (state, action) => {
      if (action.payload.hsSession.status !== 'UNINIT') {
        state.status = action.payload.hsSession.status
        state.data = action.payload.hsSession.data
      }
    },
    [getHSSession.pending]: (state, action) => {
      state.status = 'PENDING'
    },
    [getHSSession.fulfilled]: (state, action) => {
      state.status = 'SUCCESS'
      state.data = action.payload.hsSession
      state.error = ''
    },
    [getHSSession.rejected]: (state, action) => {
      state.status = 'FAILURE'
      state.error = {
        name: 'hsSession',
        displayedErrorHeading: '',
        statusCode: action.error.message || '500',
        action: 'Page Load',
        errorName: 'moves:sessionselector',
        details: `hsSession API ${action.error.message || '500'} | Unable to fetch session data`,
        stack: action.error.stack,
        targetEndpoint: action.error.name
      }
    }
  }
})
