import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import SideBarFilter from './SideBarFilter';

configure({ adapter: new Adapter() });

describe('SideBarFilter tests', () => {
  it('applies className passed in', () => {
    const wrapper = shallow(<SideBarFilter className="class" />);
    expect(wrapper.find('.container.class')).toHaveLength(1);
  });

  it('applies the id passed in', () => {
    const wrapper = shallow(<SideBarFilter id="id" />);
    expect(wrapper.find('#id.container')).toHaveLength(1);
  });

  it('renders the filter text field', () => {
    const wrapper = shallow(<SideBarFilter />);
    const field = wrapper.find('.filter');
    expect(field.prop('type')).toEqual('search');
  });

  it('executes the filter callback when changed', () => {
    const mockCallback = jest.fn();
    const event = { currentTarget: { name: 'input', value: 'text' } };
    const wrapper = shallow(<SideBarFilter onFilter={mockCallback} />);
    const field = wrapper.find('.filter');
    field.simulate('change', event);
    expect(mockCallback).toHaveBeenCalledTimes(1);
  });
});
