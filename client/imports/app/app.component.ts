import { Component, OnInit } from '@angular/core';
import template from './app.component.html';
import { Parties } from '../../../both/collections/parties.collection';
import { Observable } from 'rxjs/observable';
import { Party } from '../../../both/models/party.model';


@Component({
    selector: 'app',
    template,
    styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{
    parties : Observable<Party[]>;


    constructor(){}


    ngOnInit(){
        
    }
    
}