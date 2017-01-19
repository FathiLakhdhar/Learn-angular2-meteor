import { NgModule } from '@angular/core';
import { RouterModule} from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { PARTIES_DECLARATIONS } from './parties';
import {routes, ROUTES_PROVIDERS} from './app.routes';
import { AccountsModule } from 'angular2-meteor-accounts-ui';
import {Ng2PaginationModule} from 'ng2-pagination';


@NgModule({
    imports: [
        BrowserModule,
        FormsModule, ReactiveFormsModule,
        RouterModule.forRoot(routes),
        AccountsModule,
        Ng2PaginationModule
    ],
    declarations: [
        AppComponent,
        PARTIES_DECLARATIONS,
    ],
    providers: [
        ROUTES_PROVIDERS
    ],
    bootstrap: [AppComponent],
})

export class AppModule{}