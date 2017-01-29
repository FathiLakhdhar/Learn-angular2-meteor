import { Component, OnInit, OnDestroy } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import template from './party-details.component.html';
import 'rxjs/add/operator/map';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { MeteorObservable, ObservableCursor } from 'meteor-rxjs';
import { InjectUser } from 'angular2-meteor-accounts-ui';

import { Parties } from '../../../../both/collections/parties.collection';
import { Party } from '../../../../both/models/party.model';
import { Users } from '../../../../both/collections/users.collection';
import { User } from '../../../../both/models/user.model';
import { Images, Thumbs } from '../../../../both/collections/images.collection';
import { Image, Thumb } from '../../../../both/models/image.model';

import { default as swal } from 'sweetalert2';



@Component({
    selector: 'party-details',
    template
})
@InjectUser('user')
export class PartyDetailsComponent implements OnInit, OnDestroy, CanActivate {
    partyId: string;
    paramsSub: Subscription;
    party: Party;
    partySub: Subscription;
    users: Observable<User[]>;
    uninvitedSub: Subscription;

    thumbs: Observable<Thumb[]>;
    imagesSub: Subscription;
    user: Meteor.User;
    partyAutoSub: Subscription;

    constructor(private route: ActivatedRoute, private location: Location) { }

    //
    ngOnInit() {

        this.paramsSub = this.route.params
            .map(params => params['_id'])
            .subscribe(partyId => {
                this.partyId = partyId;

                if (this.partySub) {
                    this.partySub.unsubscribe();
                }

                this.partySub = MeteorObservable.subscribe('party', this.partyId).subscribe((success) => {

                    this.partyAutoSub = MeteorObservable.autorun().subscribe(() => {
                        this.party = Parties.findOne(this.partyId);
                        this.getUsers(this.party);
                        this.getImages(this.party);
                    });
                });
            });// end paramsSub

        if (this.uninvitedSub) {
            this.uninvitedSub.unsubscribe();
        }

        this.uninvitedSub = MeteorObservable.subscribe('uninvited', this.partyId).subscribe(() => {
            this.getUsers(this.party);
        });

        if (this.imagesSub) {
            this.imagesSub.unsubscribe();
        }

    }

    getUsers(party: Party) {
        if (party) {
            let partyInvited = party.invited || [];
            this.users = Users.find({
                _id: {
                    $nin: partyInvited.concat([this.user._id,]),
                    $ne: party.owner
                }
            }).zone();
        }
    }


    getImages(party: Party) {
        if (party) {

            this.imagesSub = MeteorObservable.subscribe<Image[]>('thumbs', party.images).subscribe(() => {

                this.thumbs = Thumbs.find().zone();

            });
        }


    }

    removeImage(imageId) {
        console.log(imageId);
        MeteorObservable.call('removeImage', this.partyId, imageId).subscribe(
            () => {
                swal(
                    'Delete!',
                    'Your file has been deleted.',
                    'success'
                );
            }, (error) => {
                console.log(error.reason);
            });
    }

    ngOnDestroy() {
        this.paramsSub.unsubscribe();
        this.partySub.unsubscribe();
        this.partyAutoSub.unsubscribe();
        this.uninvitedSub.unsubscribe();
        this.imagesSub.unsubscribe();
    }
    canActivate() {
        console.log('canactivate : ');
        const party = Parties.findOne(this.partyId);
        return (party && party.owner == Meteor.userId());
    }
    saveParty() {
        if (!Meteor.userId()) {
            alert('Please log in to change this party');
            return;
        }
        Parties.update(this.party._id, {
            $set: {
                name: this.party.name,
                description: this.party.description,
                location: this.party.location,
                public: this.party.public
            }
        });
    }

    invite(user: Meteor.User): void {
        MeteorObservable.call('invite', this.partyId, user._id).subscribe(() => {
            //success
            alert('User successfully invited.');
        }, (error) => {
            alert(`Failed to invite due to ${error}`);
        });
    }
    reply(rsvp: string) {
        MeteorObservable.call('reply', this.partyId, rsvp).subscribe(
            () => {
                alert('You successfully replied.');
            },
            (error) => {
                alert(`Failed to reply due to ${error}`);
            }
        );
    }

    get isInvited(): boolean {
        if (this.party && this.user) {
            const invited = this.party.invited || [];

            return invited.indexOf(this.user._id) !== -1;
        }

        return false;
    }


    onFileAdd(imageId: string) {
        console.log('party-details : onFileAdd event :', imageId);
        if (!Meteor.userId()) {
            alert('Please log in to change this party');
            return;
        }


        Parties.update(this.party._id, {
            $addToSet: {
                images: imageId
            }
        });
    }

    goBack() {
        this.location.back();
    }
}