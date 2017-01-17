import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import template from './parties-form.component.html';
import { Parties } from '../../../../both/collections/parties.collection';

@Component({
    selector: 'parties-form',
    template,
})
export class PartiesFormComponent implements OnInit {
    addForm: FormGroup;

    //
    constructor(private formBuilder: FormBuilder) { }

    //
    ngOnInit() {
        this.addForm = this.formBuilder.group({
            name: [null, Validators.required],
            description: [],
            location: [null, Validators.required],
        });
    }

    addParty() {
        if (this.addForm.valid) {
            Parties.insert(this.addForm.value);

            this.addForm.reset();
        }
    }

}