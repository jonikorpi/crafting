import React, { Component } from "react";
import Aframe from "aframe";
import {Animation, Entity, Scene} from "aframe-react";

import Variables from "../Variables";

export default class Rotator extends Component {

  componentDidUpdate() {
    console.log("rotator updated");
  }

  render() {
    return (
      <Entity
        class="rotator"
        rotation={this.props.rotation || [0,0,0]}
      >

        <Entity
          class="locator"
          position={[
            0,
            0,
            -this.props.distance || -Variables.UIRadius - Variables.UISpace * 0.5,
          ]}
        >

          {this.props.children}

        </Entity>

      </Entity>
    );
  }

}
