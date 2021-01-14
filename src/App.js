import logo from './logo.svg';
import './app.scss';
import { Router, Route, Switch } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import ExpenseDashboardPage from "./components/ExpensiveDashboardPage";
import AddExpensePage from "./components/AddExpensePage";
import EditExpensePage from "./components/EditExpensePage";
import NotFoundPage from "./components/NotFoundPage";
import EmpDashboardPage from "./components/EmpDashboardPage";
import AddEmp from './components/AddEmp';
import EditEmp from './components/EditEmp';
import LoginPage from './components/LoginPage';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

export let history = createHistory();

const AppRouter = () => {
  return (
    <Router history={history}>
      <div>
        <Switch>
        <PublicRoute path="/" component={LoginPage} exact={true} />
          <PrivateRoute path="/dashboard" component={ExpenseDashboardPage} />
          <PrivateRoute path="/create" component={AddExpensePage} />
          <PrivateRoute path="/edit/:id" component={EditExpensePage} />
          <PrivateRoute path="/emp-dashboard" component={EmpDashboardPage} />
          <PrivateRoute path="/add-emp" component={AddEmp} />
          <PrivateRoute path="/edit-emp/:id" component={EditEmp} />
          <Route component={NotFoundPage} />
        </Switch>
      </div>
    </Router>
  );
}
export default AppRouter;
