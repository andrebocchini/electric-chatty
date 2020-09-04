import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import LOLButton from './LOLButton';
import LOL from '../../../types/LOL';

configure({ adapter: new Adapter() });

const lol: LOL = {
  tag: 'lol',
  count: 10,
};

describe('LOLButton tests', () => {
  it('applies the classname passed in', () => {
    const wrapper = shallow(
      <LOLButton className="class" tag={lol.tag} count={lol.count} />
    );
    expect(wrapper.find('.class')).toHaveLength(1);
  });

  it('applies the id passed in', () => {
    const wrapper = shallow(
      <LOLButton id="id" tag={lol.tag} count={lol.count} />
    );
    expect(wrapper.find('#id')).toHaveLength(1);
  });

  it('renders a badge with a non-plural lol count and name', () => {
    const nonPlural: LOL = {
      tag: 'lol',
      count: 1,
    };
    const wrapper = shallow(
      <LOLButton tag={nonPlural.tag} count={nonPlural.count} />
    );
    expect(wrapper.find('Badge').text()).toEqual(
      `${nonPlural.count} ${nonPlural.tag}`
    );
  });

  it('renders a badge with a plural lol count and name', () => {
    const wrapper = shallow(<LOLButton tag={lol.tag} count={lol.count} />);
    expect(wrapper.find('Badge').text()).toEqual(`${lol.count} ${lol.tag}s`);
  });

  it('renders a badge with no count', () => {
    const wrapper = shallow(<LOLButton tag={lol.tag} />);
    expect(wrapper.find('Badge').text()).toEqual(`${lol.tag}`);
  });

  it('executes the click callback', () => {
    const mockCallback = jest.fn();
    const wrapper = shallow(<LOLButton tag={lol.tag} onClick={mockCallback} />);
    const badge = wrapper.find('Badge');
    expect(badge).toHaveLength(1);
    badge.simulate('click');
    expect(mockCallback).toHaveBeenCalledTimes(1);
    expect(mockCallback.mock.calls[0]).toEqual(['lol']);
  });
});
