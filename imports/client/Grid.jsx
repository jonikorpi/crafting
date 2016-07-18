import React, { Component } from "react";
import {Motion, spring} from "react-motion";
import Aframe from "aframe";
import {Animation, Entity, Scene} from "aframe-react";

import Variables from "../Variables";

export default class Grid extends Component {

  constructor(props) {
    super();
  }

  componentDidMount() {

  }

  getGridLines() {
    let gridLines = [];

    for (let i = 0; i < 360; i = i + 22.5) {
      gridLines.push(
        [0, i, 0]
      );
    }

    gridLines.push(
      [90, 0, 0]
    );

    return gridLines.map(
      function(rotation, i) {
        return (
          <Entity
            geometry={{
              primitive: "torus",
              radius: Variables.gridRadius,
              radiusTubular: Variables.gridThickness,
              segmentsRadial: 4,
              segmentsTubular: 48,
            }}
            material={{
              shader: "flat",
              color: "white",
            }}
            rotation={rotation}
            key={i}
          />
        );
      }
    );
  }

  render() {
    return (
      <Entity id="grid">

        {this.getGridLines()}

      </Entity>
    );
  }

}
