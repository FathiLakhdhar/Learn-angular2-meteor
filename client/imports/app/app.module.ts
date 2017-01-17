import { NgModule } from '@angular/core';
import { RouterModule} from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { PARTIES_DECLARATIONS } from './parties';
import {routes} from './app.routes';


@NgModule({
    imports: [
        BrowserModule,
        FormsModule, ReactiveFormsModule,
        RouterModule.forRoot(routes)
    ],
    declarations: [
        AppComponent,
        PARTIES_DECLARATIONS,
    ],
    bootstrap: [AppComponent],
})

export class AppModule{}