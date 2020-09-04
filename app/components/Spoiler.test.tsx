import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Spoiler from './Spoiler';

configure({ adapter: new Adapter() });

describe('Spoiler tests', () => {
  it('should render spoiled text', () => {
    const wrapper = shallow(
      <Spoiler>
        <span>hello</span>
      </Spoiler>
    );
    expect(wrapper.hasClass('spoiler')).toBeTruthy();
    expect(wrapper.children().find('span').text()).toEqual('hello');
  });

  it('should unspoiler text on click', () => {
    const wrapper = shallow(<Spoiler />);
    wrapper.simulate('click');
    expect(wrapper.hasClass('spoiler')).toBeFalsy();
  });
});
