import React from 'react';
import { shallow } from 'enzyme';
import Header  from '../Header';

test('should render header curreclty', () => {
    const wrapper = shallow(<Header startLogout={() => {}}/>);
    expect(wrapper).toMatchSnapshot();
});