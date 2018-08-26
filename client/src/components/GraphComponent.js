import React, { Component } from 'react';
// import { Chart, Axis, Series, Tooltip, Cursor, Line } from "react-charts";
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';

class GraphComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const data = [
      {date: 'Aug 16', sentiment: 0.3},
      {date: 'Aug 17', sentiment: 0.22},
      {date: 'Aug 18', sentiment: 0.3},
      {date: 'Aug 19', sentiment: 0.28},
      {date: 'Aug 20', sentiment: 0.18},
      {date: 'Aug 21', sentiment: -0.2},
      {date: 'Aug 22', sentiment: -0.12},
      {date: 'Aug 23', sentiment: 0.24},
      {date: 'Aug 24', sentiment: 0.42},
      {date: 'Aug 25', sentiment: 0.23},
      {date: 'Aug 26', sentiment: 0.25},
    ];

    const chart = (
      // <Chart
      //   data={[
      //     {
      //       label: "Sentiment",
      //       data: [[0, 0.3], [1, 0.22], [2, 0.3], [3, 0.28], [4, 0.18], [5, -0.2], [6, -0.12], [7, 0.24], [8, 0.42], [9, 0.23]],
      //     }
      //   ]}
      // >
      //   <Axis primary type="utc" />
      //   <Axis type="linear" />
      //   <Series type={Line} />
      // </Chart>
      <LineChart width={550} height={450} data={data}
            margin={{top: 5, right: 5, left: 20, bottom: 5}}>
       <XAxis dataKey="date"/>
       <YAxis/>
       <CartesianGrid strokeDasharray="3 3"/>
       <Tooltip/>
       <Legend />
       <Line type="monotone" dataKey="sentiment" stroke="#eee" activeDot={{r: 8}}/>
      </LineChart>
    );

    return (
      <div className="graph-inner">
        {chart}
      </div>
    );
  }
}

export default GraphComponent;