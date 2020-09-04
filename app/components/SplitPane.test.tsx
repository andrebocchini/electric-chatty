import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import SplitPane from './SplitPane';

configure({ adapter: new Adapter() });

describe('SplitPane tests', () => {
  it('applies className passed in', () => {
    const wrapper = shallow(<SplitPane className="class" />);
    expect(wrapper.find('.container.class')).toHaveLength(1);
  });

  it('applies an id to the container element', () => {
    const wrapper = shallow(<SplitPane id="id" />);
    expect(wrapper.find('#id.container')).toHaveLength(1);
  });

  it('should render the left element', () => {
    const element = <h1>Hello</h1>;
    const wrapper = shallow(<SplitPane left={element} />);
    expect(wrapper.find('#left').children()).toContainEqual(element);
  });

  it('should render the right element', () => {
    const element = <h1>Hello</h1>;
    const wrapper = shallow(<SplitPane right={element} />);
    expect(wrapper.find('#right').children()).toContainEqual(element);
  });
});
