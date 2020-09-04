import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import EmbedPreferencesEditor from './EmbedPreferencesEditor';

configure({ adapter: new Adapter() });

describe('EmbedPreferencesEditor tests', () => {
  it('applies the class passed in', () => {
    const wrapper = shallow(<EmbedPreferencesEditor className="class" />);
    expect(wrapper.find('.class')).toHaveLength(1);
  });

  it('renders a preferences container with the right description', () => {
    const wrapper = shallow(<EmbedPreferencesEditor />);
    expect(wrapper.find('PreferenceContainer').prop('description')).toEqual(
      'Choose what kind of content you would like automatically embedded in posts you are viewing.'
    );
  });

  it('renders a preferences container with the right title', () => {
    const wrapper = shallow(<EmbedPreferencesEditor />);
    expect(wrapper.find('PreferenceContainer').prop('title')).toEqual(
      'Embed Options'
    );
  });

  it('renders a checkbox for image embedding', () => {
    const wrapper = shallow(<EmbedPreferencesEditor />);
    const container = wrapper.find('PreferenceContainer');
    const label = container.children().find('#imagesLabel');
    const checkbox = label.children().find('#imagesCheckbox');
    expect(label).toHaveLength(1);
    expect(checkbox).toHaveLength(1);
  });

  it('renders a checkbox for youtube embedding', () => {
    const wrapper = shallow(<EmbedPreferencesEditor />);
    const container = wrapper.find('PreferenceContainer');
    const label = container.children().find('#youtubeLabel');
    const checkbox = label.children().find('#youtubeCheckbox');
    expect(label).toHaveLength(1);
    expect(checkbox).toHaveLength(1);
  });

  it('renders the checkboxes checked/unchecked based on props passed in', () => {
    const wrapper = shallow(
      <EmbedPreferencesEditor
        preferences={{
          images: true,
          youtube: true,
          video: true,
          twitter: true,
        }}
      />
    );
    const container = wrapper.find('PreferenceContainer');
    const imagesCheckbox = container.children().find('#imagesCheckbox');
    const youtubeCheckbox = container.children().find('#youtubeCheckbox');
    const videoCheckbox = container.children().find('#videoCheckbox');
    const twitterCheckbox = container.children().find('#twitterCheckbox');
    expect(imagesCheckbox.prop('checked')).toBeTruthy();
    expect(youtubeCheckbox.prop('checked')).toBeTruthy();
    expect(videoCheckbox.prop('checked')).toBeTruthy();
    expect(twitterCheckbox.prop('checked')).toBeTruthy();
  });

  it('executes the onchange callback when clicking a checkbox', () => {
    const mockCallback = jest.fn();
    const wrapper = shallow(
      <EmbedPreferencesEditor
        onChange={mockCallback}
        preferences={{ images: true, youtube: true }}
      />
    );
    const container = wrapper.find('PreferenceContainer');
    const imagesCheckbox = container.children().find('#imagesCheckbox');
    expect(imagesCheckbox).toHaveLength(1);
    imagesCheckbox.simulate('change', {
      currentTarget: { name: 'images', checked: true },
    });
    expect(mockCallback).toHaveBeenCalledTimes(1);
    expect(mockCallback.mock.calls[0][0]).toEqual({
      images: true,
      youtube: true,
    });
  });
});
