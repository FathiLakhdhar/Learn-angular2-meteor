import {NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PartiesFormComponent } from './parties-form.component';



@NgModule({
    imports:[
        CommonModule,
        FormsModule, ReactiveFormsModule
    ],
    declarations:[PartiesFormComponent],
})

export class PartiesModule{}