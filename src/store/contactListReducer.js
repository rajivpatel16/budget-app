import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'
import { getContactList } from '../services/contact-list'

export const contactListAction = createAsyncThunk('contactListAction/getContactList', async (options) => {
  const response = await getContactList(options)
  return response
})

export const contactListSlice = createSlice({
  name: 'contactList',
  initialState: { status: 'UNINIT', data: {}, error: '' },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      if (action.payload.contactList.status !== 'UNINIT') {
        state.status = action.payload.contactList.status
        state.data = action.payload
        if (action.payload.contactList.status === 'FAILURE') {
          state.error = {
            displayedErrorHeading: '',
            statusCode: action.payload.contactList.error.statusCode,
            name: action.payload.contactList.error.name,
            stack: action.payload.contactList.error.stack
          }
        }
      }
    },
    [contactListAction.pending]: (state) => {
      state.status = 'PENDING'
    },
    [contactListAction.fulfilled]: (state, action) => {
      state.status = 'SUCCESS'
      state.data = action.payload
    },
    [contactListAction.rejected]: (state, action) => {
      state.status = 'FAILURE'
      state.error = {
        name: 'contactList',
        displayedErrorHeading: '',
        statusCode: action.error.message || '500',
        stack: action.error.stack,
        targetEndpoint: action.error.name,
        action: 'Page Load',
        errorName: 'moves:eligibility',
        details: `Contact List API ${action.error.message || '500'} | Can’t fetch customer’s contact list`
      }
    }
  }
})

export const { contactListReducer } = contactListSlice.actions
