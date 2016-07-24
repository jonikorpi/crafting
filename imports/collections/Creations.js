import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import { Match } from 'meteor/check';
import { Random } from 'meteor/random'
import { DDPRateLimiter } from 'meteor/ddp-rate-limiter';

import Variables from "../Variables.js";

export const Creations = new Mongo.Collection('creations');

//
// Publications

if (Meteor.isServer) {

  Meteor.startup(
    function(){
      if (!Creations.find({}).fetch()) {
        console.log("creating initial creation");
        Meteor.call(
          "creation.create",
          "admin",
          [0,0,1],
        );
      }
    }
  );

  Meteor.publish(
    "creations",
    function creationsPublication(playerID) {
      check(playerID, Match.Maybe(String));

      return Creations.find(
        {
          // _id: playerID,
        },
      );
    }
  );

}

//
// Methods

Meteor.methods({

  "creation.create"(playerID, position, parts) {
    check(playerID, Match.Maybe(String));
    check(position, Array);

    creation = {
      owner: playerID,
      position: position,
      parts: parts || [],
    };

    return Creations.insert(
      creation,
      function (error, result) {
        return error || result;
      }
    );
  },

  "creation.addPart"(playerID, creationID, partType, partPosition) {
    check(playerID, Match.Maybe(string));
    check(part, Object);
    check(partType, Number);
    check(partPosition, Array);
    Match.test(
      partPosition,
      [[Match.Integer]]
    );

    const creation = Creations.findOne(creationID);

    // TODO: build creation graph
    // TODO: Decide whether part can be added here

    Creations.update(
      creationID,
      {
        $push: {
          parts: {
            _id: Random.id,
            type: partType,
            position: partPosition,
          },
        },
      },
    );
  },

});
