import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.scss';
import AppRouter, { history } from './App';
import reportWebVitals from './reportWebVitals';
import configureStore from './store/configureStore';
import { startSetExpenses } from './actions/expenses';
import { addEmp } from './actions/emp';
import { login, logout } from './actions/auth';
import getVisibleExpense from './selectors/expenses';
import   { firebase } from './firebase/firebase';

const store = configureStore();
// store.dispatch(addExpense({ description: 'Water bill', amount: 500, createdAt: 30000 }))
// store.dispatch(addExpense({ description: 'Gas bill',createdAt:1000}))
// store.dispatch(addExpense({ description: 'Rent bill', amount: 400, createdAt: 109500}))
store.dispatch(addEmp({name: 'Rajiv', age:30, jobTitle: 'Drupal developer', department: 'development', gender: 'Male', phone: 9205297412}))
store.dispatch(addEmp({name: 'Sidhart', age:28, jobTitle: 'Drupal developer', department: 'development', gender: 'Male', phone: 2222222222}))
// store.dispatch(setTextFilter('water'))
// setTimeout( () => {
//   store.dispatch(setTextFilter('bill'))
// },3000)

const state = store.getState();
const visibleExpense = getVisibleExpense(state.expenses, state.filters)
//console.log(visibleExpense)
//console.log(store.getState())


let hasRendered = false;
const renderApp = () => {
  if(!hasRendered) {
    ReactDOM.render(
      <React.StrictMode>
      <Provider store={store}>
        <AppRouter />
        </Provider>
      </React.StrictMode>,
      document.getElementById('root')
    );
    hasRendered = true;
  }
}
ReactDOM.render( 
  <p>Loading.....</p>
  ,
  document.getElementById('root')
);

firebase.auth().onAuthStateChanged((user) => {
  if(user) {
    store.dispatch(login(user.uid));
    store.dispatch(startSetExpenses()).then(() => {
      renderApp();
      if(history.location.pathname === '/') {
        history.push('/dashboard');
      }
    })  
  }
  else {
    store.dispatch(logout({}))
    renderApp();
    history.push('/');
  }
})



// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
