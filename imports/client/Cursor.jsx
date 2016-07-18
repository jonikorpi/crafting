import React, { Component } from "react";
import Aframe from "aframe";
import {Animation, Entity, Scene} from "aframe-react";

import Variables from "../Variables";

export default class Cursor extends Component {

  componentDidUpdate() {
    console.log("cursor updated");
  }

  render() {
    return (
      <Entity id="cursor">

          <Entity
            id="cursor-beam-rotator"
            rotation={[
              90 + 13.5,
              9.875,
              0,
            ]}
            position={[
              Variables.cursorSize * 0.618,
              -Variables.cursorSize * 0.618,
              -Variables.UIRadius,
            ]}
          >
            <Entity
              id="cursor-beam"
              geometry={{
                primitive: "cylinder",
                radius: Variables.cursorSize * Variables.cursorLineThickness / 2,
                height: Variables.gridRadius,
              }}
              material={{
                color: "red",
                shader: "flat",
              }}
              position={[
                0,
                Variables.gridRadius * 0.5,
                0,
              ]}
            />
          </Entity>

          <Entity
            id="cursor-point"
            cursor={{
              fuse: false,
              maxDistance: Variables.gridRadius + 1,
            }}
            geometry={{
              primitive: "circle",
              radius: Variables.cursorSize,
            }}
            position={[
              0,
              0,
              -Variables.UIRadius,
            ]}
            material={{
              color: "red",
              shader: "flat",
            }}
          >

            <Animation
              begin="mousedown"
              easing="ease-out"
              attribute="scale"
              fill="both"
              to={[Variables.cursorActive, Variables.cursorActive, Variables.cursorActive]}
              from="1 1 1"
              dur={Variables.shortTime(7)}
            />

            <Animation
              begin="mouseup"
              easing="ease-out"
              attribute="scale"
              fill="both"
              from={[Variables.cursorActive, Variables.cursorActive, Variables.cursorActive]}
              to="1 1 1"
              dur={Variables.shortTime(5)}
            />

          </Entity>

      </Entity>
    );
  }

}
