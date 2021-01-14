import React from 'react';
import EmpForm from '../EmpForm';
import { connect } from 'react-redux';
import { editEmp } from '../../actions/emp'

const EditEmp = (props) => {
    return (
        <div>
        {console.log(props.match.params.id,props.employe)}
    <h1>Edit Employee form</h1>
     <EmpForm 
     onSubmit = {(test) => {
        props.dispatch(editEmp(props.match.params.id, test));
        props.history.push('/emp-dashboard');
     }}
     employee={props.employe}
     />
    </div>
    );
};
const mapStateToProps = (state, props) => {
    return {
        employe: state.employees.find((singleEmp) => {
            return singleEmp.id === props.match.params.id
        })
  }
}

export default connect(mapStateToProps)(EditEmp);