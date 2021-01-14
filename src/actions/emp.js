import {v1 as uuid} from "uuid"; 

export const addEmp = ({name ='', age = '', jobTitle ='', department = '', gender = '',phone = ''} = {}) => {
    return {
        type: 'ADD_EMP',
        employees: {
            id: uuid(),
            name,
            age,
            jobTitle,
            department,
            gender,
            phone
        } 
    }
};

export const editEmp = (id, update) => {
    return {
        type: 'EDIT_EMP',
        id,
        update
    }
};