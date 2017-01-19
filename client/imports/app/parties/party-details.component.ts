import { Component, OnInit, OnDestroy } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import template from './party-details.component.html';
import 'rxjs/add/operator/map';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { MeteorObservable } from 'meteor-rxjs';

import { Parties } from '../../../../both/collections/parties.collection';
import { Party } from '../../../../both/models/party.model';
import { Users } from '../../../../both/collections/users.collection';
import { User } from '../../../../both/models/user.model';



@Component({
    selector: 'party-details',
    template
})
export class PartyDetailsComponent implements OnInit, OnDestroy, CanActivate {
    partyId: string;
    paramsSub: Subscription;
    party: Party;
    partySub: Subscription;
    users: Observable<User[]>;
    uninvitedSub: Subscription;

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

                this.partySub = MeteorObservable.subscribe('party', this.partyId).subscribe(() => {

                    this.party = Parties.findOne(this.partyId);
                });
            });// end paramsSub

        if (this.uninvitedSub) {
            this.uninvitedSub.unsubscribe();
        }

        this.uninvitedSub = MeteorObservable.subscribe('uninvited', this.partyId).subscribe(() => {
            this.users = Users.find({
                _id: {
                    $ne: Meteor.userId()
                }
            }).zone();
        });

    }

    ngOnDestroy() {
        this.paramsSub.unsubscribe();
        this.partySub.unsubscribe();
        this.uninvitedSub.unsubscribe();
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
                location: this.party.location
            }
        });
    }


    goBack() {
        this.location.back();
    }
}