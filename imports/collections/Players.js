import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import { Match } from 'meteor/check';
import { DDPRateLimiter } from 'meteor/ddp-rate-limiter'
import { Random } from 'meteor/random';

import Variables from "../Variables.js";

export const Players = new Mongo.Collection('players');

//
// Publications

if (Meteor.isServer) {

  Meteor.publish(
    "player",
    function playerPublication(playerID) {
      check(playerID, Match.Maybe(String));

      // let restrictedFields = {
      //   "_id": 0,
      // };

      return Players.find(
        {
          _id: playerID,
        },
        // {
        //   fields: restrictedFields,
        // }
      );
    }
  );

}

//
// Methods

Meteor.methods({

  "players.create"(playerID) {
    check(playerID, String);
    // Match.test(
    //   heroItems,
    //   [[Match.Integer]]
    // );

    player = {
      _id: playerID,
      created: new Date(),
    };

    // for (let i = 0; i < Variables.heroesPerParty; i++) {
    //   match.leftParty.heroes.push(
    //     {
    //       mana: 0,
    //       position: [0, 0, Variables.tilesPerColumn-1-i],
    //       rotation: [0, 0, 0],
    //       lastItemUsed: undefined,
    //       items: heroItems[i],
    //       effects: [],
    //     },
    //   )
    // };

    return Players.insert(
      player,
      function (error, result) {
        return error || result;
      }
    );
  },

  // "matches.controlTeam"(matchID, playerID, heroes) {
  //   check(playerID, String);
  //   // TODO: check heroes
  //
  //   // Matches.update(matchID, { $set: { checked: setChecked } });
  // },

  // "matches.releaseTeam"(matchID, playerID, teamID) {
  //   check(playerID, String);
  //   check(teamID, Number);
  //
  //   // TODO: fetch match and check the playerID matches its playerID
  // },

  // "matches.remove"(matchID) {
  //   check(matchID, String);
  //
  //   Matches.remove(matchID);
  // },

  // 'tasks.setPrivate'(taskId, setToPrivate) {
  //   check(taskId, String);
  //   check(setToPrivate, Boolean);
  //
  //   const task = Tasks.findOne(taskId);
  //
  //   // Make sure only the task owner can make a task private
  //   if (task.owner !== this.userId) {
  //     throw new Meteor.Error('not-authorized');
  //   }
  //
  //   Tasks.update(taskId, { $set: { private: setToPrivate } });
  // },

});

//
// Rate-limiting rules

// if (Meteor.isServer) {
//
//   DDPRateLimiter.addRule(
//     {
//       type: "method",
//       name: "matches.create",
//       connectionId: function(connectionId) {
//         return connectionId;
//       },
//     },
//     4,
//     10000
//   );
//
// }
