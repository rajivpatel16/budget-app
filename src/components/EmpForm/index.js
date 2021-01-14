import React from 'react';

class EmpForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: props.employee ? props.employee.name : '',
            age: props.employee ? props.employee.age : '',
            jobTitle: props.employee ? props.employee.jobTitle : '',
            department: props.employee ? props.employee.department : '',
            phone: props.employee ? props.employee.phone : '',
        }
    }


    onNameChange = (e) => {
        this.setState(() => ({name: e.target.value}))
    }

    onAgeChange = (e) => {
        this.setState(() => ({age: e.target.value}))
    }

    onJobChange = (e) => {
        this.setState(() => ({jobTitle: e.target.value}))
    }

    onDepartmentChange = (e) => {
        this.setState(() => ({department: e.target.value}))
    }

    onPhoneChange = (e) => {
        this.setState(() => ({phone: e.target.value}))
    }

    onSubmitForm = (e) => {
        e.preventDefault();
        if (!this.state.name || !this.state.age) {
            this.setState(() => ({ error: 'Please provide the require value' }))
        }
        else {
            this.props.onSubmit({
                name: this.state.name,
                age: this.state.age,
                jobTitle: this.state.jobTitle,
                department: this.state.department,
                phone: this.state.phone
            });
        }

    }

    render() {
        console.log(this.props)
        return(
            <div>              
                <form onSubmit={this.onSubmitForm}>
                    <input
                        type="text"
                        placeholder="Name"
                        autoFocus
                        value={this.state.name}
                        onChange={this.onNameChange}
                    />
                    <input
                        type="number"
                        placeholder="Age"
                        autoFocus
                        value={this.state.age}
                        onChange={this.onAgeChange}
                    />
                    <input
                        type="text"
                        placeholder="Job Title"
                        autoFocus
                        value={this.state.jobTitle}
                        onChange={this.onJobChange}
                    />
                    <input
                        type="text"
                        placeholder="Department"
                        autoFocus
                        value={this.state.department}
                        onChange={this.onDepartmentChange}
                    />
                    <input
                        type="number"
                        placeholder="Phone"
                        autoFocus
                        value={this.state.phone}
                        onChange={this.onPhoneChange}
                    />
                    <button>Add Employee</button>
                </form>
            </div>
        );
    }
}

export default EmpForm;