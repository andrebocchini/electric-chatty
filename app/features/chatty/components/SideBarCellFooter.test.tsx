import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { faThumbtack } from '@fortawesome/free-solid-svg-icons';
import SideBarCellFooter from './SideBarCellFooter';

configure({ adapter: new Adapter() });

describe('SideBarCellFooter tests', () => {
  it('renders the number of replies passed in', () => {
    const wrapper = shallow(<SideBarCellFooter replies={10} />);
    expect(wrapper.find('.replies')).toHaveLength(1);
  });

  it('renders a pin icon if the thread is not pinned', () => {
    const wrapper = shallow(<SideBarCellFooter replies={10} />);
    const icon = wrapper.find('FontAwesomeIcon.pinIcon');
    expect(icon).toHaveLength(0);
  });

  it('renders a pin icon if the thread is pinned', () => {
    const wrapper = shallow(<SideBarCellFooter replies={10} isPinned />);
    const icon = wrapper.find('FontAwesomeIcon.pinIcon');
    expect(icon).toHaveLength(1);
    expect(icon.prop('icon')).toEqual(faThumbtack);
  });
});
