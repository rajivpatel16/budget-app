
const empReducerDefaultValue = [];

const empReducer = (state = empReducerDefaultValue, action) => {
    switch (action.type) {
        case 'ADD_EMP':
            return [
                ...state,
                action.employees
            ];
            case 'EDIT_EMP':
                return state.map((employee) => {
                    if (employee.id === action.id) {
                        return {
                          ...employee,
                          ...action.update,  
                        }
                    }
                    else {
                        return employee;
                    }
                });
        default:
            return state;
    }
}

export default empReducer;