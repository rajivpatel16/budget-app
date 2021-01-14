import React from 'react';
import EmpForm from '../EmpForm';
import { connect } from 'react-redux';
import { addEmp } from '../../actions/emp'

const AddEmp = (props) => {
    return (
        <div>
    <h1>Add Employee form</h1>
     <EmpForm 
     onSubmit = {(test) => {
        props.dispatch(addEmp(test))
        props.history.push('/emp-dashboard')
     }}
     />
    </div>
    )
}
export default connect()(AddEmp);