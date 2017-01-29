import { UploadFS } from 'meteor/jalik:ufs';
import { ImagesStore, Images } from '../collections/images.collection';
import { Parties } from '../collections/parties.collection';


export function upload(data: File): Promise<any> {
  return new Promise((resolve, reject) => {
    // pick from an object only: name, type and size
    const file = {
      name: data.name,
      type: data.type,
      size: data.size,
    };

    const upload = new UploadFS.Uploader({
      data,
      file,
      store: ImagesStore,
      onError: reject,
      onComplete: resolve,
    });

    upload.start();
  });
}


function loggedIn() {
  return !!Meteor.user();
}


Meteor.methods({
  removeImage: function (partyId: string, imageId: string) {
    check(partyId, String);
    check(imageId, String);

    if (!Meteor.user()) {
      throw new Meteor.Error('500', 'You are not loggedIn');
    }

    let party = Parties.collection.findOne(partyId);
    if (!party) throw new Meteor.Error('404', 'No such party');

    if (party.owner !== this.userId)
      throw new Meteor.Error('403', 'No permissions!');


    if (party.images) {
      let indexImg = party.images.indexOf(imageId);
      if (indexImg === -1) {//img not found in this party
        throw new Meteor.Error('404','No such image in party');
      }else{

        let ids= party.images.splice(indexImg, 1);

        Parties.update({
          _id: partyId
        },
        {
          $set: { images: ids }
        }).subscribe(()=>{
          Images.remove({
            _id: imageId
          })
        })

        
      }//end else
    }
  },


});


function ren(element) {
  return element >= 10;
}