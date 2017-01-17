import {Component, OnInit, OnDestroy  } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import template from './party-details.component.html';
import 'rxjs/add/operator/map';
import { Subscription } from 'rxjs/Subscription';
import {Parties} from '../../../../both/collections/parties.collection';
import {Party} from '../../../../both/models/party.model';


@Component({
    selector: 'party-details',
    template
})
export class PartyDetailsComponent implements OnInit, OnDestroy{ 
    partyId: string;
    paramsSub: Subscription;
    party: Party;

    constructor(private route: ActivatedRoute){}

    //
    ngOnInit(){
        this.paramsSub=this.route.params
        .map(params=> params['_id'])
        .subscribe(partyId=> {
            this.partyId= partyId;
            this.party = Parties.findOne(this.partyId);
        });
    }

    ngOnDestroy(){
        this.paramsSub.unsubscribe();
    }
}