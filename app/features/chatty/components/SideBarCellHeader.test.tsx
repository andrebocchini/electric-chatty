import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import moment from 'moment';
import SideBarCellHeader from './SideBarCellHeader';

configure({ adapter: new Adapter() });

describe('SideBarCellHeader tests', () => {
  it('renders the author name passed in', () => {
    const wrapper = shallow(
      <SideBarCellHeader
        author="author"
        date="2020-07-18T00:00:00Z"
        lols={[]}
      />
    );
    expect(wrapper.find('.author').text()).toEqual('author');
  });

  it('it renders a header with the thread author name and date', () => {
    const displayDate = moment(Date.parse('2020-07-18T00:00:00Z')).fromNow();
    const wrapper = shallow(
      <SideBarCellHeader
        author="author"
        date="2020-07-18T00:00:00Z"
        lols={[]}
      />
    );
    expect(wrapper.find('.header').children().find('.author').text()).toEqual(
      'author'
    );
    expect(wrapper.find('.header').children().find('.date').text()).toEqual(
      displayDate
    );
  });

  it('it renders the right style if the author is the logged in user', () => {
    const wrapper = shallow(
      <SideBarCellHeader
        author="author"
        date="2020-07-18T00:00:00Z"
        loggedInUser="author"
        lols={[]}
      />
    );
    expect(wrapper.find('.author').hasClass('loggedInAuthor')).toBeTruthy();
  });

  it('it renders the right style if the author is Shacknews', () => {
    const wrapper = shallow(
      <SideBarCellHeader
        author="Shacknews"
        date="2020-07-18T00:00:00Z"
        loggedInUser="author"
        lols={[]}
      />
    );
    expect(wrapper.find('.author').hasClass('shacknews')).toBeTruthy();
  });

  it('it renders a sub header with a lol bar and progress bar', () => {
    const wrapper = shallow(
      <SideBarCellHeader
        author="author"
        date="2020-07-18T00:00:00Z"
        lols={[]}
      />
    );
    expect(wrapper.find('.subHeader').children().find('LOLBar')).toHaveLength(
      1
    );
    expect(
      wrapper.find('.subHeader').children().find('ProgressBar')
    ).toHaveLength(1);
  });
});
