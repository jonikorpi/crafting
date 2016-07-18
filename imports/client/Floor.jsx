import React, { Component } from "react";
import Aframe from "aframe";
import {Animation, Entity, Scene} from "aframe-react";

import Variables from "../Variables";

export default class Floor extends Component {
  render() {
    return (
      <Entity
        id="floor"
        geometry={{
          primitive: "plane",
          width: Variables.clipRange,
          height: Variables.clipRange,
        }}
        rotation={[
          -90,
          0,
          0,
        ]}
        material={{
          shader: "flat",
          color: "green",
        }}
      />
    );
  }
}
