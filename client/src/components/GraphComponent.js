import React, { Component } from 'react';
import { Chart, Axis, Series, Tooltip, Cursor, Line } from "react-charts";

class GraphComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {

    const chart = (
      <Chart
        data={[
          {
            label: "Series 1",
            data: [[0, 1], [1, 2], [2, 4], [3, 2], [4, 7]]
          },
          {
            label: "Series 2",
            data: [[0, 3], [1, 1], [2, 5], [3, 6], [4, 4]]
          }
        ]}
      >
        <Axis primary type="time" />
        <Axis type="linear" />
        <Series type={Line} />
      </Chart>
    );

    return (
      <div>
        {this.lineChart}
      </div>
    );
  }
}

export default GraphComponent;