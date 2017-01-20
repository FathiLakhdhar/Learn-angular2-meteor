import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';
import { MeteorObservable } from 'meteor-rxjs';
import { PaginationService } from 'ng2-pagination';
import { Counts } from 'meteor/tmeasday:publish-counts';
import {InjectUser} from 'angular2-meteor-accounts-ui';

import 'rxjs/add/operator/combineLatest';

import { Parties } from '../../../../both/collections/parties.collection';
import { Party } from '../../../../both/models/party.model';
import { Options } from '../../../../both/models/options';

import template from './parties-list.component.html';

@Component({
    selector: 'parties-list',
    template
})
@InjectUser('user')
export class PartiesListComponent implements OnInit, OnDestroy {
    parties: Observable<Party[]>;
    partiesSub: Subscription;
    pageSize: Subject<number> = new Subject<number>();
    curPage: Subject<number> = new Subject<number>();
    nameOrder: Subject<number> = new Subject<number>();
    location: Subject<string> = new Subject<string>();
    totalItems: number = 0;

    optionsSub: Subscription;
    autoSub: Subscription;


    constructor(private paginationService: PaginationService) { }


    ngOnInit() {
        this.optionsSub = Observable.combineLatest(
            this.pageSize,
            this.curPage,
            this.nameOrder,
            this.location
        ).subscribe(([pageSize, curPage, nameOrder, location]) => {
            const options: Options = {
                limit: pageSize as number,
                skip: ((curPage as number) - 1) * (pageSize as number),
                sort: { name: nameOrder as number }
            };

            this.paginationService.setCurrentPage(this.paginationService.defaultId(), curPage as number);

            if (this.partiesSub) {
                this.partiesSub.unsubscribe();
            }

            this.partiesSub = MeteorObservable.subscribe('parties', options, location).subscribe(() => {
                this.parties = Parties.find({}, {
                    sort: {
                        name: nameOrder
                    }
                }).zone();
            });
        });//end optionsSub

        this.autoSub = MeteorObservable.autorun().subscribe(() => {
            this.totalItems = Counts.get('numberOfParties');
            console.log('totalItems : ' + this.totalItems);
            this.paginationService.setTotalItems(this.paginationService.defaultId(), this.totalItems);
        });


        this.paginationService.register({
            id: this.paginationService.defaultId(),
            itemsPerPage: 3,
            currentPage: 1,
            totalItems: this.totalItems,
        })

        this.pageSize.next(3);
        this.curPage.next(1);
        this.nameOrder.next(1);
        this.location.next('');
    }
    ngOnDestroy() {
        this.partiesSub.unsubscribe();
        this.optionsSub.unsubscribe();
        this.autoSub.unsubscribe();

    }

    search(location: string) {
        this.curPage.next(1);
        this.location.next(location);
    }
    changeSortOrder(nameOrder: string) {
        this.nameOrder.next(parseInt(nameOrder));
    }
    remove(party: Party) {
        Parties.remove({ _id: party._id });
    }
    onPageChanged(page: number) {
        this.curPage.next(page);
    }
}