import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import { Players } from "../collections/Players.js";
import { Creations } from "../collections/Creations.js";

import World from './World';

export default createContainer(({params}) => {

  Meteor.subscribe("player", params.playerID);
  const player = Players.findOne({_id: params.playerID});
  console.log(player);

  Meteor.subscribe("creations", params.playerID);
  const creations = Creations.find({}).fetch();
  console.log(creations);

  return {
    player: player,
    creations: creations,
  };

}, World);
