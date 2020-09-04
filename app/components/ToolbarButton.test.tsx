import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import ToolbarButton from './ToolbarButton';

configure({ adapter: new Adapter() });

describe('CredentialsButton tests', () => {
  it('applies className passed in', () => {
    const wrapper = shallow(<ToolbarButton className="class" />);
    expect(wrapper.find('.container.class')).toHaveLength(1);
  });

  it('applies an id passed in', () => {
    const wrapper = shallow(<ToolbarButton id="id" />);
    expect(wrapper.find('#id')).toHaveLength(1);
  });

  it('does not render an icon if not passed in', () => {
    const wrapper = shallow(<ToolbarButton />);
    expect(wrapper.find('FontAwesomeIcon')).toHaveLength(0);
  });

  it('renders an icon if passed in', () => {
    const wrapper = shallow(<ToolbarButton icon={faUserCircle} />);
    expect(wrapper.find('FontAwesomeIcon').prop('icon')).toEqual(faUserCircle);
  });

  it('does not render text by default', () => {
    const wrapper = shallow(<ToolbarButton />);
    expect(wrapper.find('span.title')).toHaveLength(0);
  });

  it('renders the title passed in', () => {
    const wrapper = shallow(<ToolbarButton title="Title" />);
    expect(wrapper.find('span.title').text()).toEqual('Title');
  });

  it('executes the click callback passed in', () => {
    const mockCallback = jest.fn();
    const wrapper = shallow(<ToolbarButton onClick={mockCallback} />);
    wrapper.find('.container').simulate('click');
    expect(mockCallback).toHaveBeenCalledTimes(1);
  });
});
