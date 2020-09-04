import { shallow, configure } from 'enzyme';
import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ComposePostLegend from './ComposePostLegend';

configure({ adapter: new Adapter() });

describe('ComposePostLegend tests', () => {
  it('should render a dropdown', () => {
    const wrapper = shallow(<ComposePostLegend />);
    const dropdown = wrapper.find('Dropdown');
    expect(dropdown).toHaveLength(1);
    expect(dropdown.prop('as')).toEqual(ButtonGroup);
  });

  it('should render a dropdown toggle', () => {
    const wrapper = shallow(<ComposePostLegend />);
    const dropdown = wrapper.find('DropdownToggle');
    expect(dropdown).toHaveLength(1);
    expect(dropdown.text()).toEqual('Shack Tags Legend');
  });

  it('should render a dropdown menu', () => {
    const wrapper = shallow(<ComposePostLegend />);
    const dropdown = wrapper.find('DropdownMenu');
    expect(dropdown).toHaveLength(1);
  });

  it('should the on select callback', () => {
    const mockCallback = jest.fn();
    const wrapper = shallow(<ComposePostLegend onSelect={mockCallback} />);
    const dropdown = wrapper.find('Dropdown');
    expect(dropdown.prop('onSelect')).toEqual(mockCallback);
  });

  it('should render an entry for the red tag', () => {
    const tag = 'r{...}r';
    const wrapper = shallow(<ComposePostLegend />);
    const dropdown = wrapper.find('DropdownItem#red');

    expect(dropdown.prop('eventKey')).toEqual(tag);
    expect(dropdown.find('.item').childAt(0).hasClass('jt_red')).toBeTruthy();
    expect(dropdown.find('.item').childAt(0).text()).toEqual('red');
    expect(dropdown.find('.item').childAt(1).text()).toEqual(tag);
  });

  it('should render an entry for the green tag', () => {
    const tag = 'g{...}g';
    const wrapper = shallow(<ComposePostLegend />);
    const dropdown = wrapper.find('DropdownItem#green');

    expect(dropdown.prop('eventKey')).toEqual(tag);
    expect(dropdown.find('.item').childAt(0).hasClass('jt_green')).toBeTruthy();
    expect(dropdown.find('.item').childAt(0).text()).toEqual('green');
    expect(dropdown.find('.item').childAt(1).text()).toEqual(tag);
  });

  it('should render an entry for the blue tag', () => {
    const tag = 'b{...}b';
    const wrapper = shallow(<ComposePostLegend />);
    const dropdown = wrapper.find('DropdownItem#blue');

    expect(dropdown.prop('eventKey')).toEqual(tag);
    expect(dropdown.find('.item').childAt(0).hasClass('jt_blue')).toBeTruthy();
    expect(dropdown.find('.item').childAt(0).text()).toEqual('blue');
    expect(dropdown.find('.item').childAt(1).text()).toEqual(tag);
  });

  it('should render an entry for the yellow tag', () => {
    const tag = 'y{...}y';
    const wrapper = shallow(<ComposePostLegend />);
    const dropdown = wrapper.find('DropdownItem#yellow');

    expect(dropdown.prop('eventKey')).toEqual(tag);
    expect(
      dropdown.find('.item').childAt(0).hasClass('jt_yellow')
    ).toBeTruthy();
    expect(dropdown.find('.item').childAt(0).text()).toEqual('yellow');
    expect(dropdown.find('.item').childAt(1).text()).toEqual(tag);
  });

  it('should render an entry for the limegreen tag', () => {
    const tag = 'l{...}l';
    const wrapper = shallow(<ComposePostLegend />);
    const dropdown = wrapper.find('DropdownItem#limegreen');

    expect(dropdown.prop('eventKey')).toEqual(tag);
    expect(dropdown.find('.item').childAt(0).hasClass('jt_lime')).toBeTruthy();
    expect(dropdown.find('.item').childAt(0).text()).toEqual('limegreen');
    expect(dropdown.find('.item').childAt(1).text()).toEqual(tag);
  });

  it('should render an entry for the orange tag', () => {
    const tag = 'n{...}n';
    const wrapper = shallow(<ComposePostLegend />);
    const dropdown = wrapper.find('DropdownItem#orange');

    expect(dropdown.prop('eventKey')).toEqual(tag);
    expect(
      dropdown.find('.item').childAt(0).hasClass('jt_orange')
    ).toBeTruthy();
    expect(dropdown.find('.item').childAt(0).text()).toEqual('orange');
    expect(dropdown.find('.item').childAt(1).text()).toEqual(tag);
  });

  it('should render an entry for the multisync tag', () => {
    const tag = 'p{...}p';
    const wrapper = shallow(<ComposePostLegend />);
    const dropdown = wrapper.find('DropdownItem#multisync');

    expect(dropdown.prop('eventKey')).toEqual(tag);
    expect(dropdown.find('.item').childAt(0).hasClass('jt_pink')).toBeTruthy();
    expect(dropdown.find('.item').childAt(0).text()).toEqual('multisync');
    expect(dropdown.find('.item').childAt(1).text()).toEqual(tag);
  });

  it('should render an entry for the olive tag', () => {
    const tag = 'e{...}e';
    const wrapper = shallow(<ComposePostLegend />);
    const dropdown = wrapper.find('DropdownItem#olive');

    expect(dropdown.prop('eventKey')).toEqual(tag);
    expect(dropdown.find('.item').childAt(0).hasClass('jt_olive')).toBeTruthy();
    expect(dropdown.find('.item').childAt(0).text()).toEqual('olive');
    expect(dropdown.find('.item').childAt(1).text()).toEqual(tag);
  });

  it('should render an entry for the italics tag', () => {
    const tag = '/[...]/';
    const wrapper = shallow(<ComposePostLegend />);
    const dropdown = wrapper.find('DropdownItem#italics');

    expect(dropdown.prop('eventKey')).toEqual(tag);
    expect(
      dropdown.find('.item').childAt(0).hasClass('jt_italic')
    ).toBeTruthy();
    expect(dropdown.find('.item').childAt(0).text()).toEqual('italics');
    expect(dropdown.find('.item').childAt(1).text()).toEqual(tag);
  });

  it('should render an entry for the bold tag', () => {
    const tag = 'b[...]b';
    const wrapper = shallow(<ComposePostLegend />);
    const dropdown = wrapper.find('DropdownItem#bold');

    expect(dropdown.prop('eventKey')).toEqual(tag);
    expect(dropdown.find('.item').childAt(0).hasClass('jt_bold')).toBeTruthy();
    expect(dropdown.find('.item').childAt(0).text()).toEqual('bold');
    expect(dropdown.find('.item').childAt(1).text()).toEqual(tag);
  });

  it('should render an entry for the quote tag', () => {
    const tag = 'q[...]q';
    const wrapper = shallow(<ComposePostLegend />);
    const dropdown = wrapper.find('DropdownItem#quote');

    expect(dropdown.prop('eventKey')).toEqual(tag);
    expect(dropdown.find('.item').childAt(0).hasClass('jt_quote')).toBeTruthy();
    expect(dropdown.find('.item').childAt(0).text()).toEqual('quote');
    expect(dropdown.find('.item').childAt(1).text()).toEqual(tag);
  });

  it('should render an entry for the sample tag', () => {
    const tag = 's[...]s';
    const wrapper = shallow(<ComposePostLegend />);
    const dropdown = wrapper.find('DropdownItem#sample');

    expect(dropdown.prop('eventKey')).toEqual(tag);
    expect(
      dropdown.find('.item').childAt(0).hasClass('jt_sample')
    ).toBeTruthy();
    expect(dropdown.find('.item').childAt(0).text()).toEqual('sample');
    expect(dropdown.find('.item').childAt(1).text()).toEqual(tag);
  });

  it('should render an entry for the underline tag', () => {
    const tag = '_[...]_';
    const wrapper = shallow(<ComposePostLegend />);
    const dropdown = wrapper.find('DropdownItem#underline');

    expect(dropdown.prop('eventKey')).toEqual(tag);
    expect(
      dropdown.find('.item').childAt(0).hasClass('jt_underline')
    ).toBeTruthy();
    expect(dropdown.find('.item').childAt(0).text()).toEqual('underline');
    expect(dropdown.find('.item').childAt(1).text()).toEqual(tag);
  });

  it('should render an entry for the strike tag', () => {
    const tag = '-[...]-';
    const wrapper = shallow(<ComposePostLegend />);
    const dropdown = wrapper.find('DropdownItem#strike');

    expect(dropdown.prop('eventKey')).toEqual(tag);
    expect(
      dropdown.find('.item').childAt(0).hasClass('jt_strike')
    ).toBeTruthy();
    expect(dropdown.find('.item').childAt(0).text()).toEqual('strike');
    expect(dropdown.find('.item').childAt(1).text()).toEqual(tag);
  });

  it('should render an entry for the spoiler tag', () => {
    const tag = 'o[...]o';
    const wrapper = shallow(<ComposePostLegend />);
    const dropdown = wrapper.find('DropdownItem#spoiler');

    expect(dropdown.prop('eventKey')).toEqual(tag);
    expect(dropdown.find('.item').childAt(0).text()).toEqual('s');
    expect(dropdown.find('.item').childAt(1).text()).toEqual('poiler');
    expect(
      dropdown.find('.item').childAt(1).hasClass('jt_spoiler')
    ).toBeTruthy();
    expect(dropdown.find('.item').childAt(2).text()).toEqual(tag);
  });

  it('should render an entry for the code tag', () => {
    const tag = '/{{...}}/';
    const wrapper = shallow(<ComposePostLegend />);
    const dropdown = wrapper.find('DropdownItem#code');

    expect(dropdown.prop('eventKey')).toEqual(tag);
    expect(dropdown.find('.item').childAt(0).hasClass('jt_code')).toBeTruthy();
    expect(dropdown.find('.item').childAt(0).text()).toEqual('code');
    expect(dropdown.find('.item').childAt(1).text()).toEqual(tag);
  });
});
