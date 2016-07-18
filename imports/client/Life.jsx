import React, { Component } from "react";
import Aframe from "aframe";
import {Animation, Entity, Scene} from "aframe-react";

import Variables from "../Variables";

import Floor from "./Floor";
import Grid from "./Grid";

import Text from "./Text";

export default class Life extends Component {

  constructor(props) {
    super();
  }

  componentDidUpdate() {
    console.log("life updated");
  }

  render() {
    return (
      <Entity id="life">

        <Floor/>
        <Grid/>

      </Entity>
    );
  }

}
