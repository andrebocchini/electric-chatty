import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ChattyThreadLink from './ChattyThreadLink';

configure({ adapter: new Adapter() });

describe('ChattyThreadLink tests', () => {
  it('should render the link', () => {
    const wrapper = shallow(
      <ChattyThreadLink threadId={1234567} postId={12345} />
    );
    const link = wrapper.find('a');
    expect(link.prop('href')).toEqual(
      'https://www.shacknews.com/chatty?id=1234567#item_12345'
    );
  });

  it('should execute the onClick callback', () => {
    const mockCallback = jest.fn();
    const wrapper = shallow(
      <ChattyThreadLink
        onChattyThreadClicked={mockCallback}
        postId={12345}
        threadId={1234567}
      />
    );
    const link = wrapper.find('a');
    const event = { preventDefault: jest.fn() };
    link.simulate('click', event);
    expect(mockCallback).toHaveBeenCalledTimes(1);
    expect(mockCallback.mock.calls[0][0]).toEqual(1234567);
    expect(mockCallback.mock.calls[0][1]).toEqual(12345);
  });
});
