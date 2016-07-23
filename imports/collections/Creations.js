import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import { Match } from 'meteor/check';
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

});
