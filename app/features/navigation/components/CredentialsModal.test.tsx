import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import CredentialsModal from './CredentialsModal';

configure({ adapter: new Adapter() });

describe('CredentialsModal tests', () => {
  it('applies className passed in', () => {
    const wrapper = shallow(<CredentialsModal className="class" />);
    expect(wrapper.find('Modal.class')).toHaveLength(1);
  });

  it('applies an id to the container element', () => {
    const wrapper = shallow(<CredentialsModal id="id" />);
    expect(wrapper.find('Modal#id')).toHaveLength(1);
  });

  it('renders the correct title', () => {
    const wrapper = shallow(<CredentialsModal id="id" />);
    expect(wrapper.find('ModalTitle').text()).toEqual('Shacknews Account');
  });

  it('renders a credentials editor in the body', () => {
    const wrapper = shallow(<CredentialsModal id="id" />);
    expect(
      wrapper.find('ModalBody').children().find('CredentialsEditor')
    ).toHaveLength(1);
  });
});
