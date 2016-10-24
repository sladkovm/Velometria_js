/** @file - Component to define the App level main container */

import React, { Component } from 'react';
import { Panel } from 'react-bootstrap';
import { connect } from 'react-redux';


class DefaultView extends Component {
  constructor(props) {
    super(props);
    this.defText = 'DefaultText';
  }

  render() {
    return (
      <Panel>
        App Main Container
        <p>{this.defText}</p>
      </Panel>
    );
  }
}

const mapStateToProps = (state) => ({
  activities: state.activities,
});
export default connect(mapStateToProps)(DefaultView);
