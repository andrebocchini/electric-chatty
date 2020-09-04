import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import CommentFilterPreferencesEditor from './CommentFilterPreferencesEditor';

configure({ adapter: new Adapter() });

describe('CommentFilterPreferencesEditor tests', () => {
  it('applies className passed in', () => {
    const wrapper = shallow(
      <CommentFilterPreferencesEditor className="class" />
    );
    expect(wrapper.find('.class')).toHaveLength(1);
  });

  it('applies an id to the container element', () => {
    const wrapper = shallow(<CommentFilterPreferencesEditor id="id" />);
    expect(wrapper.find('#id')).toHaveLength(1);
  });

  it('renders a preferences container with the right description', () => {
    const wrapper = shallow(<CommentFilterPreferencesEditor />);
    expect(wrapper.find('PreferenceContainer').prop('description')).toEqual(
      'Check the thread categories you wish to see. Categories not checked here will not show in your list of threads.'
    );
  });

  it('renders a preferences container with the right title', () => {
    const wrapper = shallow(<CommentFilterPreferencesEditor />);
    expect(wrapper.find('PreferenceContainer').prop('title')).toEqual(
      'Thread Options'
    );
  });

  it('renders a checkbox for every comment type passed in', () => {
    const wrapper = shallow(
      <CommentFilterPreferencesEditor
        options={[
          { category: 'stupid', checked: true },
          { category: 'nws', checked: false },
        ]}
      />
    );
    const container = wrapper.find('PreferenceContainer');
    const checkboxes = container.children().find('input');
    const labels = container.children().find('label');
    expect(checkboxes).toHaveLength(2);
    expect(checkboxes.at(0).prop('checked')).toBeTruthy();
    expect(checkboxes.at(1).prop('checked')).toBeFalsy();
    expect(labels).toHaveLength(2);
    expect(labels.at(0).text()).toEqual('stupid');
    expect(labels.at(1).text()).toEqual('nws');
  });

  it('executes the onChange callback', () => {
    const mockCallback = jest.fn();
    const wrapper = shallow(
      <CommentFilterPreferencesEditor
        options={[{ category: 'stupid', checked: true }]}
        onChange={mockCallback}
      />
    );
    const container = wrapper.find('PreferenceContainer');
    const checkbox = container.children().find('input');
    checkbox.simulate('change', {
      currentTarget: { name: 'stupid', checked: false },
    });
    expect(mockCallback).toHaveBeenCalledTimes(1);
    expect(mockCallback.mock.calls[0]).toEqual([
      { category: 'stupid', checked: false },
    ]);
  });
});
