import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Toolbar from './Toolbar';

configure({ adapter: new Adapter() });

describe('Toolbar tests', () => {
  it('applies className passed in', () => {
    const wrapper = shallow(<Toolbar title="title" className="class" />);
    expect(wrapper.find('div.class.container')).toHaveLength(1);
  });

  it('applies the id passed in', () => {
    const wrapper = shallow(<Toolbar title="title" id="id" />);
    expect(wrapper.find('#id.container')).toHaveLength(1);
  });

  it('renders a title', () => {
    const wrapper = shallow(<Toolbar title="title" />);
    expect(wrapper.find('.title')).toHaveLength(1);
  });

  it('renders the buttons passed in', () => {
    const buttons = [<h1 key={1}>hello</h1>, <h1 key={2}>world</h1>];
    const wrapper = shallow(<Toolbar title="title" buttons={buttons} />);
    expect(wrapper.find('.buttons').children()).toHaveLength(2);
  });
});
