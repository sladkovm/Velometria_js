import React, { Component } from 'react';
import d3 from 'd3';


export class SimpleStreamsPlot extends Component {
  constructor (props) {
    super(props)
  }

  render() {
    return (
      <div>
        <svg>
          <rect width="100" height="200" />
        </svg>
      </div>
    );
  }
}
