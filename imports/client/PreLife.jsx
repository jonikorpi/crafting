import React, { Component } from "react";
import { browserHistory } from "react-router";
import Aframe from "aframe";
import {Animation, Entity, Scene} from "aframe-react";

import Variables from "../Variables";

import Text from "./Text";
import Rotator from "./Rotator";

export default class PreLife extends Component {

  constructor(props) {
    super();

    this.createPlayer = this.createPlayer.bind(this);

    this.state = {
      state: "initial",
    };
  }

  componentDidUpdate() {
    console.log("prelife updated");
  }

  createPlayer() {
    const that = this;
    const localStorageData = JSON.parse( localStorage.getItem("Game") );

    that.setState({state: "creating"});

    Meteor.call(
      "players.create",
      localStorageData.playerID,
      function (error, matchID) {
        if (error) {
          that.setState({state: "error"});
          console.log(error);
        }
        else if (matchID) {
          that.setState({state: "redirecting"});
        }
      }
    );
  }

  getPlayTextOffset(state) {
    if (state == "initial") {
      return Variables.tileSize * 0.375 * 0.5;
    }
    else {
      return Variables.tileSize * 0.375 * 0.333;
    }
  }

  getSmallText(state) {
    switch (state) {
      case "initial":
        return "";
      case "creating":
        return "Creating a game…";
      case "redirecting":
        return "Redirecting to game…";
      case "error":
        return "Error! Try again?";
    }
  }

  render() {
    return (
      <Entity id="pre-life">

        <Text
          class="logo"
          text="CRAFTING"
          size={30}
          position={[
            -30 * 4,
            -30 / 2,
            -Variables.gridRadius * 20,
          ]}
        />

        <Rotator rotation={[20,0,0]}>
          <Entity
            class="start-playing-button"
            geometry={{
              primitive: "box",
              width: Variables.tileSize * 2,
              height: Variables.tileThickness,
              depth: Variables.tileSize,
            }}
            material={{
              color: "green",
              shader: "flat",
            }}
            rotation={[
              90,
              0,
              0,
            ]}
            onClick={this.createPlayer}
          >

            <Text
              text="PLAY"
              size={Variables.tileSize * 0.375}
              height={Variables.tileThickness}
              rotation={[
                -90,
                0,
                0,
              ]}
              position={[
                -Variables.tileSize * 0.375 * 1.6,
                Variables.tileThickness * 0.5 * 0.5,
                this.getPlayTextOffset(this.state.state),
              ]}
              onClick={this.createPlayer}
            />

            <Text
              text={this.getSmallText(this.state.state)}
              size={Variables.tileSize * 0.125}
              height={Variables.tileThickness}
              rotation={[
                -90,
                0,
                0,
              ]}
              position={[
                -Variables.tileSize * 0.375 * 1.6,
                Variables.tileThickness * 0.5 * 0.5,
                Variables.tileSize * 0.375,
              ]}
              onClick={this.createPlayer}
            />

          </Entity>
        </Rotator>

      </Entity>
    );
  }

}
