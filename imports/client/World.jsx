import React, { Component } from "react";
import Aframe from "aframe";
import {Animation, Entity, Scene} from "aframe-react";

import Variables from "../Variables";

import Camera from "./Camera";
import Sky from "./Sky";
import AmbientLight from "./AmbientLight";

import PreLife from "./PreLife";
import Life from "./Life";

export default class World extends Component {

  constructor(props) {
    super();
  }

  componentDidMount() {

  }

  componentDidUpdate() {
    console.log("world updated");
  }

  getComponentByState(player) {
    if (player) {
      return (
        <Life player={player}/>
      );
    }
    else {
      return (
        <PreLife/>
      );
    }
  }

  getCameraCenter(playerLocation) {
    return [
      0,
      -Variables.cameraHeight,
      0,
    ];
  }

  render() {
    return (
      <Scene
        id="scene"
        vr-mode-ui={{
          enabled: true,
        }}
      >

        <Camera
          id="camera"
          width={this.props.gameState.width}
          height={this.props.gameState.height}
          inVR={this.props.gameState.inVR}
          devMode={this.props.gameState.devMode}
        />

        <Sky/>
        <AmbientLight/>

        <Entity
          id="outside-camera"
          position={this.getCameraCenter()}
        >

          {this.getComponentByState(this.props.player)}

        </Entity>

      </Scene>
    );
  }

}
