import { MongoObservable } from 'meteor-rxjs';
import { Image, Thumb } from '../models/image.model';

import { UploadFS } from 'meteor/jalik:ufs';


//  Collection //

export const Images = new MongoObservable.Collection<Image>('images');
export const Thumbs = new MongoObservable.Collection<Thumb>('thumbs');




// UploadFS //

function loggedIn(userId) {
    return !!userId;
}


export const ThumbsStore = new UploadFS.store.GridFS({
    collection: Thumbs.collection,
    name: 'thumbs',
    path: '/uploads/thumbs',
    permissions: new UploadFS.StorePermissions({
        insert: loggedIn,
        update: function (userId, doc) {
            return userId === doc.userId;
        },
        remove: function (userId, doc) {
            return userId === doc.userId;
        }
    }),
    transformWrite(from, to, fileId, file) {
        // Resize to 32x32
        const gm = require('gm');

        gm(from, file.name)
            .resize(80, 80)
            .gravity('Center')
            .extent(80, 80)
            .quality(75)
            .stream()
            .pipe(to);
    }
});


export const ImagesStore = new UploadFS.store.GridFS({
    collection: Images.collection,
    name: 'images',
    path: '/uploads/photos',
    filter: new UploadFS.Filter({
        minSize: 1,
        maxSize: 1024 * 1000,// 1MB
        contentTypes: ['image/*'],
        extensions: ['jpg', 'png']
    }),
    copyTo: [
        ThumbsStore
    ],
    permissions: new UploadFS.StorePermissions({
        insert: loggedIn,
        update: function (userId, doc) {
            return userId === doc.userId;
        },
        remove: function (userId, doc) {
            return userId === doc.userId;
        }
    })
});