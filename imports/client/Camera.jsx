import React, { Component } from "react";
import Aframe from "aframe";
import {Animation, Entity, Scene} from "aframe-react";
import Extras from "aframe-extras";
Extras.controls.registerAll();

import Variables from "../Variables";

import Cursor from "./Cursor";

export default class Camera extends Component {

  componentDidUpdate() {
    console.log("camera updated");
  }

  render() {
    return (
      <Entity
        id="camera-container"
      >

        <Entity
          id="camera"
          camera={{
            far: Variables.clipRange * 1.5,
            near: this.props.near || 0.001,
            fov: this.props.inVR ? Variables.VRFOV : Variables.screenFOV,
          }}
          universal-controls={{
            movementEnabled: this.props.devMode,
            // movementSpeed:        5,
            // movementEasing:       15,
            // movementAcceleration: 80,
            // rotationSensitivity:  0.05,
          }}
        >

          {this.props.children}

          <Cursor/>

        </Entity>

      </Entity>
    );
  }

}
