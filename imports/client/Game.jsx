import React, { Component } from "react";
import Aframe from "aframe";
import {Animation, Entity, Scene} from "aframe-react";
import Combokeys from "combokeys";
import classNames from "classnames";
import ReactMixin from "react-mixin";
import ReactLocalStorage from "react-localstorage";
import { Random } from 'meteor/random';

import Variables from "../Variables";

import GameContainer from "./GameContainer";

export default class Game extends Component {

  constructor(props) {
    super();

    this.handleResize          = this.handleResize.bind(this);
    this.bindKeyboardShortcuts = this.bindKeyboardShortcuts.bind(this);
    this.toggleDevMode         = this.toggleDevMode.bind(this);
    this.startVR               = this.startVR.bind(this);
    this.stopVR                = this.stopVR.bind(this);

    let playerID;
    const localStorageData = JSON.parse( localStorage.getItem("Game") );

    if (localStorageData) {
      playerID = localStorageData.playerID;
    }
    else {
      playerID = Random.secret(43);
    }

    this.state = {
      playerID: playerID,
      inVR: false,
      devMode: false,
      width: 0,
      height: 0,
    };
  }

  getStateFilterKeys() {
    return [
      "playerID",
    ];
  }

  componentDidMount() {
    window.addEventListener("enter-vr", this.startVR);
    window.addEventListener("exit-vr", this.stopVR);
    window.addEventListener('resize', this.handleResize);
    this.handleResize();
    this.bindKeyboardShortcuts();
  }

  componentWillUnmount() {
    this.unbindKeyboardShortcuts();
    window.removeEventListener('resize', this.handleResize);
    window.removeEventListener("enter-vr", this.startVR);
    window.removeEventListener("exit-vr", this.stopVR);
  }

  componentDidUpdate() {
    console.log("game updated");
  }

  handleResize() {
    this.setState({
      width: this.react.getBoundingClientRect().width,
      height: this.react.getBoundingClientRect().height,
    });
  }

  bindKeyboardShortcuts() {
    const that = this;
    let combokeys = new Combokeys(document.documentElement);

    combokeys.bind("g", function() { that.toggleDevMode(); });
    // combokeys.bind(["a", "left"], function() { that.move("left"); });
    // combokeys.bind(["d", "right"], function() { that.move("right"); });
    // combokeys.bind(["w", "up"], function() { that.move("up"); });
    // combokeys.bind(["s", "down"], function() { that.move("down"); });
  }

  unbindKeyboardShortcuts() {
    combokeys.detach();
  }

  toggleDevMode() {
    this.setState({
      devMode: !this.state.devMode,
    });
    console.log("Setting devMode to " + this.state.devMode);
  }

  startVR() {
    this.setState({
      inVR: true,
    });
  }

  stopVR() {
    this.setState({
      inVR: false,
    });
  }

  render() {
    return (
      <div
        id="react"
        className={
          classNames({
            "dev-mode": this.state.devMode,
            "in-vr": this.state.inVR,
          })
        }
        ref={(ref) => this.react = ref}
      >

        <GameContainer
          params={{playerID: this.state.playerID}}
          gameState={this.state}
        />

      </div>
    );
  }

};

ReactMixin(Game.prototype, ReactLocalStorage);
