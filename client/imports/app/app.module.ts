import { NgModule } from '@angular/core';
import { RouterModule} from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { PARTIES_DECLARATIONS } from './parties';
import { SHARED_DECLARATIONS } from './shared';
import { AUTH_DECLARATIONS } from './authentication';
import {routes, ROUTES_PROVIDERS} from './app.routes';
import { AccountsModule } from 'angular2-meteor-accounts-ui';
import {Ng2PaginationModule} from 'ng2-pagination';
import {FileDropModule} from 'angular2-file-drop';


@NgModule({
    imports: [
        BrowserModule,
        FormsModule, ReactiveFormsModule,
        RouterModule.forRoot(routes),
        AccountsModule,
        Ng2PaginationModule,
        FileDropModule
    ],
    declarations: [
        AppComponent,
        PARTIES_DECLARATIONS,
        SHARED_DECLARATIONS,
        AUTH_DECLARATIONS
    ],
    providers: [
        ROUTES_PROVIDERS
    ],
    bootstrap: [AppComponent],
})

export class AppModule{}