import { createStore } from 'redux'

// Reducer
// 1: Reducers are pure functions.
// 2: Never change state are action.


const countReducer = (state = {count: 0}, action) => {
    switch(action.type) {
        case 'INCREMENT' :
        return {
            count: state.count + action.incrementBy
        }
        case 'DECREMENT' :
        return {
            count: state.count - action.decrementBy
        }
        default:
            return state;
    }
}

const store = createStore(countReducer);

const incrementCount = ({ incrementBy = 1 } = {}) => ({
    type: 'INCREMENT',
    incrementBy
});

const decrementCount = ({ decrementBy = 10 } = {}) => ({
    type: 'DECREMENT',
    decrementBy
})

store.dispatch(incrementCount);

store.dispatch(decrementCount);

console.log(store.getState());
