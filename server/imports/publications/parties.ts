import { Parties } from '../../../both/collections/parties.collection';
import { Options } from '../../../both/models/options';
import { Counts } from 'meteor/tmeasday:publish-counts';


//Publish function
Meteor.publish('parties', function (options: Options, location?: string) {
  const selector = buildQuery.call(this, null, location);
  Counts.publish(this, 'numberOfParties', Parties.collection.find(selector), { noReady: true });
  return Parties.find(selector, options);
});
//Publish party function
Meteor.publish('party', function (partyId: string) {
  return Parties.find(buildQuery.call(this, partyId));
});

function buildQuery(partyId?: string, location?: string) {
  const isAvailable = {
    $or: [{
      // party is public
      public: true
    },
    // or
    {
      // current user is the owner
      $and: [{
        owner: this.userId
      }, {
        owner: {
          $exists: true
        }
      }]
    }]
  };

  

  if (partyId) {
    return {
      $and: [{ _id: partyId }, isAvailable]
    };
  }


  const searchRegEx = { "$regex": '.*' + (location || '') + '.*', "$options": 'i' };
  return {
    $and: [{
      location: searchRegEx
    },
      isAvailable
    ]
  };
}