import React from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';

const EmpList = (props) => {
    return (
        <div>
            {props.employees.map((employe) => (
                <div key={employe.id}>
                    <p><Link to={`edit-emp/${employe.id}`}>{employe.name}</Link></p>
                    <p>Age: {employe.age}</p>
                    <p>Job Title: {employe.jobTitle}</p>
                    <p>Department: {employe.department}</p>
                    <p>Gender: {employe.gender}</p>
                    <p>Phone: {employe.phone}</p>
                    <button>EDIT</button>
                </div>
            ))
            }
        </div>
    )
}
const mapStateToProps = (state) => {
    return {
        employees: state.employees
    }
}

export default connect(mapStateToProps)(EmpList);