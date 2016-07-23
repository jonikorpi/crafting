import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import { Match } from 'meteor/check';
import { DDPRateLimiter } from 'meteor/ddp-rate-limiter';

import Variables from "../Variables.js";
import PartTypes from "../PartTypes.js";

export const Parts = new Mongo.Collection('parts');

//
// Publications

if (Meteor.isServer) {

  Meteor.publish(
    "parts",
    function partsPublication(playerID) {
      check(playerID, Match.Maybe(String));

      return Parts.find(
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

  "part.add"(playerID, creationID, type, position) {
    check(playerID, Match.Maybe(String));
    check(position, Array);

    part = {
      creation: creationID,
      type: type,
      position: position,
    };

    return Parts.insert(
      part,
      function (error, result) {
        return error || result;
      }
    );
  },

});
