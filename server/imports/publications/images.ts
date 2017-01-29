import {Images, Thumbs} from '../../../both/collections/images.collection';



Meteor.publish('thumbs', function(imagesId: string[]){
    return Thumbs.collection.find({
        originalStore: 'images',
        originalId: {
            $in: imagesId || []
        }
    });
});

Meteor.publish('images', function(){
    return Images.find();
});