import React from 'react';
import { shallow } from 'enzyme';
import  LoginPage  from '../LoginPage';

test('should correclty render login page',()=> {
    const wrapper = shallow(<LoginPage />)
    expect(wrapper).toMatchSnapshot();
})
