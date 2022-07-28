import { serviceLocationAction, serviceLocationSlice, resetServiceLocationReducer } from '../serviceLocationReducer'
import { HYDRATE } from 'next-redux-wrapper'

import { configureStore } from '@reduxjs/toolkit'

const mockGet = jest.fn()
jest.mock('../../utils/fetchClient', () => {
  return jest.fn().mockImplementation(() => {
    return { get: mockGet }
  })
})

describe('serviceLocationSlice Reducer', () => {
  const initialState = { status: 'UNINIT', data: {}, error: '' }
  const tokens = {
    SessionTokenStage: 'fake-session-token',
    OAuth2TokenStage: 'fake-token'
  }

  it('should test HYDRATE state', () => {
    const initialStates = { status: undefined, data: {}, error: '' }
    const action = { type: HYDRATE, payload: { serviceLocation: { status: undefined } } }
    const state = serviceLocationSlice.reducer(initialStates, action)
    expect(state).toEqual({ status: undefined, data: { serviceLocation: { status: undefined } }, error: '' })
  })

  it('should test pending state', () => {
    const action = { type: serviceLocationAction.pending.type }
    const state = serviceLocationSlice.reducer(initialState, action)
    expect(state).toEqual({ status: 'PENDING', data: {}, error: '' })
  })

  it('should test fulfilled state', () => {
    const initialStates = { status: 'SUCCESS', data: {}, error: '' }
    const action = { type: serviceLocationAction.fulfilled.type, payload: { data: {} } }
    const state = serviceLocationSlice.reducer(initialStates, action)
    expect(state).toEqual({ status: 'SUCCESS', data: { data: {} }, error: '' })
  })

  it('should test rejected state', () => {
    const action = {
      type: serviceLocationAction.rejected.type,
      error: {
        message: 'some message',
        name: 'some name',
        stack: 'some stack'
      }
    }
    const state = serviceLocationSlice.reducer(initialState, action)
    expect(state).toEqual({
      status: 'FAILURE',
      data: {},
      error: {
        displayedErrorHeading: 'GENERIC_ERROR_MSG',
        name: 'serviceLocation',
        action: 'click',
        details: 'Service Location API some message | Unable to fetch information',
        errorName: 'moves:eligibility',
        stack: action.error.stack,
        targetEndpoint: 'some name'
      }
    })
  })

  it('should test UNINIT status', () => {
    const initialStates = { status: undefined, data: { data: 'fake-data' }, error: '' }
    const action = { type: resetServiceLocationReducer.type }
    const nextState = serviceLocationSlice.reducer(initialStates, action)
    expect(nextState).toEqual({ status: 'UNINIT', data: {}, error: '' })
  })

  it('should test fetchServiceLocation inside serviceLocationAction', async () => {
    mockGet.mockResolvedValue({ serviceLocation: { data: 'mock-get' } })

    const store = configureStore({
      reducer: (state = {}, action) => {
        switch (action.type) {
          case serviceLocationAction.fulfilled.type:
            return action.payload
          default:
            return state
        }
      }
    })

    await store.dispatch(serviceLocationAction(tokens))

    const state = store.getState()
    expect(state).toEqual({ serviceLocation: { data: 'mock-get' } })
  })
})
