import {Component, Input, Output, EventEmitter} from '@angular/core';

@Component({
    moduleId: __moduleName,
    selector: 'input-field',
    templateUrl: 'inputField.html'
})
export class InputFieldComponent {
    private hasFocus: boolean;

    constructor() {
        this.id = (new Date()).getTime().toString();
    }

    public id: string;
    @Input() public title: string;
    @Input() public model: any;
    @Output() public modelChange: EventEmitter<any> = new EventEmitter<any>();

    public changeValue(value: any) {
        this.modelChange.emit(value);
    }

    public focus() {
        this.hasFocus = true;
    }

    public blur() {
        if(!this.model){
            this.hasFocus = false;
        }
    }
}
