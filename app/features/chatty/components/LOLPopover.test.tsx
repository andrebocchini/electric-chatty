import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import LOLPopover from './LOLPopover';

configure({ adapter: new Adapter() });

describe('LOLPopover tests', () => {
  it('renders an overlay', () => {
    const wrapper = shallow(<LOLPopover target={<h1>hello</h1>} show />);
    const overlay = wrapper.find('Overlay');
    expect(overlay).toHaveLength(1);
    expect(overlay.prop('flip')).toBeTruthy();
    expect(overlay.prop('target')).toEqual(<h1>hello</h1>);
    expect(overlay.prop('placement')).toEqual('auto');
    expect(overlay.prop('show')).toBeTruthy();
    expect(overlay.prop('rootClose')).toBeTruthy();
    expect(overlay.prop('rootCloseEvent')).toEqual('click');
  });

  it('renders a popover', () => {
    const wrapper = shallow(<LOLPopover target={<h1>hello</h1>} />);
    const popover = wrapper.find('Overlay').children().find('#tagPopover');
    expect(popover).toHaveLength(1);
  });

  it('renders lol buttons in the popover', () => {
    const wrapper = shallow(<LOLPopover target={<h1>hello</h1>} />);
    const popover = wrapper.find('#tagPopover');
    expect(popover.children().find('LOLButton')).toHaveLength(7);
  });

  it('lol buttons should executed the tag click callback', () => {
    const mockCallback = jest.fn();
    const wrapper = shallow(
      <LOLPopover target={<h1>hello</h1>} onTagClick={mockCallback} />
    );
    const popover = wrapper.find('#tagPopover');
    const button = popover.children().find('LOLButton').at(0);
    button.simulate('click');
    expect(mockCallback).toHaveBeenCalledTimes(1);
    expect(mockCallback.mock.calls[0]).toEqual(['lol']);
  });
});
