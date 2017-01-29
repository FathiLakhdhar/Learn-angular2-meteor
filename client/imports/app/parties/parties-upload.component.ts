import { Component, Output, EventEmitter } from '@angular/core';
import { upload } from '../../../../both/methods/images.methods';

import template from './parties-upload.component.html';
import style from './parties-upload.component.scss';
import { default as swal } from 'sweetalert2';

@Component({
    selector: 'parties-upload',
    template,
    styles: [style]
})
export class PartiesUploadComponent {
    fileIsOver: Boolean = false;
    uploading: boolean = false;
    @Output() onFileAdd: EventEmitter<string> = new EventEmitter<string>();

    constructor() { }

    fileOver(fileIsOver: boolean): void {
        this.fileIsOver = fileIsOver;
    }

    onFileDrop(file: File): void {
        console.log('Got file!', file);
        this.uploading = true;

        upload(file)
                .then((result) => {
                    this.uploading = false;
                    this.onFileAdd.emit(result._id);
                    console.log('result: : ', result._id);
                    swal(
                        'Add!',
                        'Your file has been Add.',
                        'success'
                    );
                    
                })
                .catch((error) => {
                    this.uploading = false;
                    console.log(`Something went wrong!`, error);
                    swal(
                        'Error!',
                        'Your file has not Add.',
                        'error'
                    );
                    return null;
                });
        
    }



}