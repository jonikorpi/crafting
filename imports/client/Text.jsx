import React, { Component } from "react";
import Aframe from "aframe";
import {Animation, Entity, Scene} from "aframe-react";
import "aframe-text-component";

import Variables from "../Variables";

export default class Text extends Component {

  constructor(props) {
    super();
  }

  componentDidUpdate() {
    console.log("text updated");
  }

  getLines(text, style, weight, size, height, color, doOnClick, lineHeight) {
    let texts;

    if (typeof text === "string") {
      texts = [text];
    }
    else {
      texts = text;
    }

    return texts.map(
      function(line, i) {
        return (
          <Entity
            class="text-line"
            key={i}
            text={{
              text: line,
              style: style || "normal",
              weight: weight || "normal",
              size: size,
              height: height || 0,
              font: "helvetiker",
              curveSegments: 12,
            }}
            material={{
              color: color || "black",
              shader: "flat",
            }}
            onClick={doOnClick}
            position={[
              0,
              -lineHeight * i,
              0,
            ]}
          />
        );
      }
    );
  }

  getPosition(position, size) {
    const offset = (size / 2);

    if (position) {
      return [
        position[0],
        position[1] - offset,
        position[2],
      ];
    }
    else {
      return [
        0,
        0 - offset,
        0,
      ];
    }
  }

  getLineHeight(lineHeight, size) {
    if (lineHeight) {
      return lineHeight * size;
    }
    else {
      return 1.382 * size;
    }
  }

  getSize(size) {
    return size || Variables.targetFontSize;
  }

  render() {
    return (
      <Entity
        class="text-block"
        position={
          this.getPosition(
            this.props.position,
            this.getSize(this.props.size)
          )
        }
        rotation={this.props.rotation || [0,0,0]}
        look-at={this.props.lookAtCamera ? "#camera" : ""}
      >

        {this.getLines(
          this.props.text,
          this.props.style,
          this.props.weight,
          this.getSize(this.props.size),
          this.props.height,
          this.props.color,
          this.props.doOnClick,
          this.getLineHeight(this.props.lineHeight, this.getSize(this.props.size)),
        )}

      </Entity>
    );
  }

}
