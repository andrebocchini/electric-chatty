import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import PreferenceContainer from './PreferenceContainer';

configure({ adapter: new Adapter() });

describe('PreferenceContainer tests', () => {
  it('applies className passed in', () => {
    const wrapper = shallow(<PreferenceContainer className="class" />);
    expect(wrapper.find('.class')).toHaveLength(1);
  });

  it('applies id passed in', () => {
    const wrapper = shallow(<PreferenceContainer id="id" />);
    expect(wrapper.find('#id')).toHaveLength(1);
  });

  it('renders a title', () => {
    const wrapper = shallow(<PreferenceContainer title="title" />);
    expect(wrapper.find('.title').text()).toEqual('title');
  });

  it('renders a description', () => {
    const wrapper = shallow(<PreferenceContainer description="description" />);
    expect(wrapper.find('.description').text()).toEqual('description');
  });

  it('renders children', () => {
    const wrapper = shallow(
      <PreferenceContainer>
        <h1>Hello</h1>
      </PreferenceContainer>
    );
    const container = wrapper.find('.container');
    expect(container.children()).toHaveLength(3);
    expect(container.children().find('.title')).toHaveLength(1);
    expect(container.children().find('.description')).toHaveLength(1);
    expect(container.children().find('.children')).toHaveLength(1);
  });
});
