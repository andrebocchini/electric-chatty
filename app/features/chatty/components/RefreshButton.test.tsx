import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import RefreshButton from './RefreshButton';

configure({ adapter: new Adapter() });

describe('RefreshButton tests', () => {
  it('applies className passed in', () => {
    const wrapper = shallow(<RefreshButton className="class" />);
    expect(wrapper.find('FontAwesomeIcon.class')).toHaveLength(1);
  });

  it('applies id passed in', () => {
    const wrapper = shallow(<RefreshButton id="id" />);
    expect(wrapper.find('FontAwesomeIcon#id')).toHaveLength(1);
  });

  it('does not apply the refreshing style when not refreshing', () => {
    const wrapper = shallow(<RefreshButton />);
    expect(wrapper.find('.refreshing')).toHaveLength(0);
  });

  it('applies the refreshing style when refreshing', () => {
    const wrapper = shallow(<RefreshButton isRefreshing />);
    expect(wrapper.find('.refreshing')).toHaveLength(1);
  });

  it('executes the click callback when clicked', () => {
    const mockCallback = jest.fn();
    const wrapper = shallow(<RefreshButton onClick={mockCallback} />);
    wrapper.find('FontAwesomeIcon').simulate('click');
    expect(mockCallback).toHaveBeenCalledTimes(1);
  });
});
