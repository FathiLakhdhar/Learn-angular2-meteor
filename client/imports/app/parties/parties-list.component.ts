import {Component , OnInit} from '@angular/core';
import template from './parties-list.component.html';
import { Parties } from '../../../../both/collections/parties.collection';
import { Observable } from 'rxjs/observable';
import { Party } from '../../../../both/models/party.model';
@Component({
    selector: 'parties-list',
    template
})
export class PartiesListComponent implements OnInit{
    parties : Observable<Party[]>;


    constructor(){}


    ngOnInit(){
        this.parties = Parties.find({}).zone();
    }
    remove(party: Party){
        Parties.remove({_id:party._id});
    }
}