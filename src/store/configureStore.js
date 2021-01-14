import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk  from 'redux-thunk';
import expenseReducer  from '../reducers/expenses';
import filterReducer from '../reducers/filter';
import empReducer from '../reducers/emp';
import authReducer from '../reducers/auth'


const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

export default () => {
const store = createStore(
    combineReducers({
        expenses: expenseReducer,
        filters: filterReducer,
        employees: empReducer,
        auth: authReducer,
    }),
    composeEnhancers(applyMiddleware(thunk))
);
return store;
}