import CanvasJSReact from "./canvasjs.react";

import React, { Component } from "react";

var CanvasJS = CanvasJSReact.CanvasJS;

var CanvasJSChart = CanvasJSReact.CanvasJSChart;

var dataPoints = [];

export default class GraphView extends Component {
  constructor() {
    super();

    this.state = { workouts: [] };
  }

  render() {
    const options = {
      title: {
        text: "Graph for Calories Burn",
      },

      data: [
        {
          type: "column",

          dataPoints: this.state.workouts,

          //  [

          //     { label: "Pull Ups", y: 10 },

          //     { label: "Leg Extension", y: 15 },

          //     { label: "Push Ups", y: 25 },

          //     { label: "Biceps Curl", y: 30 },

          //     { label: "Squats", y: 28 }

          // ]
        },
      ],
    };

    return (
      <div>
        <CanvasJSChart
          options={options}

          /* onRef = {ref => this.chart = ref} */
        />
      </div>
    );
  }

  componentDidMount() {
    console.log(this.state.workouts);

    var chart = this.chart;

    fetch("http://localhost:4000/workouts")
      .then((response) => {
        return response.json();
      })

      .then((data) => {
        console.log(data);

        let formattedData = data.map((d) => {
          return { label: d.workouts, y: d.TotalCalories };
        });

        console.log(formattedData);

        this.setState({ workouts: formattedData });

        chart.render();
      });
  }
}