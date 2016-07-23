import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import { Players } from "../collections/Players.js";
import { Creations } from "../collections/Creations.js";
import { Parts } from "../collections/Parts.js";

import World from './World';

export default createContainer(({params}) => {

  Meteor.subscribe("player", params.playerID);
  const player = Players.findOne({_id: params.playerID});
  console.log(player);

  Meteor.subscribe("creations", params.playerID);
  const creations = Creations.find({}).fetch();
  console.log(creations);

  Meteor.subscribe("parts", params.playerID);
  const parts = Parts.find({}).fetch();
  console.log(parts);

  return {
    player: player,
    creations: creations,
    parts: parts,
  };

}, World);
