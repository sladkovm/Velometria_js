import { Meteor } from 'meteor/meteor';
import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import ActivityPanelItem from './activity-panel-item';


describe('ActivityPanelItem', function () {
  if (Meteor.isServer) return;

  describe('will render and ', function () {
    // setup: create test data
    const activity = {
      id: 123456789,
      name: 'TestActivity',
    };
    // shallow render
    const actual = shallow(<ActivityPanelItem activity={activity} />);
    // verify that the rendered DOM values are as expected
    it('will render a <Link> node', function () {
      const expected = 1;
      expect(actual.nodes.length).to.be.equal(expected);
      expect(actual.nodes[0].type.displayName).to.be.equal('Link');
    });
    it('<Link> node will have children <ListGroupItem>', function () {
      const expected = 'ListGroupItem';
      expect(actual.nodes[0].props.children.type.name).to.be.equal(expected);
    });
    it('will pass a "to" prop to the <Link>', function () {
      const expected = `/activity/${activity.id}`;
      expect(actual.nodes[0].props.to).to.be.equal(expected);
    });
    it('will have an activeStyle prop', function () {
      const expected = {
        textDecoration: 'none',
        color: 'red',
      };
      expect(actual.nodes[0].props.activeStyle).be.deep.equal(expected);
    });
  });
});
