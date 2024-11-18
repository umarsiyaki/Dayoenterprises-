
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as d3 from 'd3-array';

const UserBehaviorInsights = () => {
  const insights = useSelector((state) => state.insights);
  const dispatch = useDispatch();

  const visualizeData = () => {
    const chart = d3.select('#chart')
      .append('svg')
      .attr('width', 500)
      .attr('height', 300);

    chart.selectAll('rect')
      .data(insights)
      .enter()
      .append('rect')
      .attr('x', (d, i) => i * 50)
      .attr('y', (d) => d.value * 10)
      .attr('width', 40)
      .attr('height', (d) => 300 - d.value * 10);
  };

  return (
    <div>
      <h2>User Behavior Insights</h2>
      <button onClick={visualizeData}>Visualize Data</button>
      <div id="chart"></div>
    </div>
  );
};