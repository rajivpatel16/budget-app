import React from 'react';
import { Link } from 'react-router-dom'

const ExpenseSummary = () => {
    return (
        <div className="page-header">
            <div className="content-container">
                <h1 className="page-header__title">Viewing <span>2</span> expense Totaling <span>$1.26</span></h1>
                <div>
                <div className="page-header__actions">
                <Link className="button" to="/create"> Add Expense</Link>
                </div>
                </div>
            </div>
        </div>
    )
}

export default ExpenseSummary;