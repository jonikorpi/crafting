import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import { Players } from "../collections/Players.js";

import World from './World';

export default createContainer(({params}) => {

  Meteor.subscribe("player", params.playerID);
  const player = Players.findOne({_id: params.playerID});

  return {
    player: player,
  };

}, World);
