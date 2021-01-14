import React from 'react';
import { connect } from 'react-redux'
import { DateRangePicker } from 'react-dates';
import { setTextFilter, sortByAmount, sortByDate, setStartDate, setEndDate } from '../../actions/filter';

class ExpenseListFilter extends React.Component {
  state = {
    candenderFocused: null,
  }

  onDatesChange = ({ startDate, endDate }) => {
    this.props.dispatch(setStartDate(startDate))
    this.props.dispatch(setEndDate(endDate))
  }

  onFocusChange = (candenderFocused) => {
    this.setState(() => ({ candenderFocused }));
  }

  render() {
    return (
      <div className="content-container">
        <div className="input-group">
          <div className="input-group__item">
            <input
            className="text-input"
              type="text"
              placeholder="Search Expenese"
              value={this.props.filters.text}
              onChange={(e) => {
                this.props.dispatch(setTextFilter(e.target.value))

              }}
            />
          </div>
          <div className="input-group__item">
            <select
            className="select"
              value={this.props.filters.sortBy}
              onChange={(e) => {
                if (e.target.value === 'amount') {
                  this.props.dispatch(sortByAmount())
                }
                else if (e.target.value === 'date') {
                  this.props.dispatch(sortByDate())
                }
              }}
            >
              <option value="date">Date</option>
              <option value="amount">Amount</option>
            </select>
          </div>
          <div className="input-group__item">
            <DateRangePicker
            className="text-input"
              startDate={this.props.filters.startDate}
              endDate={this.props.filters.endDate}
              onDatesChange={this.onDatesChange}
              focusedInput={this.state.candenderFocused}
              onFocusChange={this.onFocusChange}
              numberOfMonths={1}
              isOutsideRange={() => false}
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    filters: state.filters
  }
}

export default connect(mapStateToProps)(ExpenseListFilter);