import React from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import expenseSummary from  '../../selectors/expenseSummary';

const ExpenseSummary = (props) => {
    return (
        <div className="page-header">
        {console.log(props.expense, "hello I aam here")}
            <div className="content-container">
                <h1 className="page-header__title">Viewing {props.expense.totalCount}<span></span> expense Totaling <span>{props.expense.amount}</span></h1>
                <div>
                <div className="page-header__actions">
                <Link className="button" to="/create"> Add Expense</Link>
                </div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        expense: expenseSummary(state.expenses)
    }
}

export default connect(mapStateToProps) (ExpenseSummary);