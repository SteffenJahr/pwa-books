import {Component, Input, forwardRef} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

export const INPUT_FIELD_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => InputFieldComponent),
    multi: true
};


@Component({
    moduleId: __moduleName,
    selector: 'input-field',
    templateUrl: 'inputField.html',
    providers: [
        INPUT_FIELD_VALUE_ACCESSOR
    ]
})
export class InputFieldComponent implements ControlValueAccessor {

    public id: string;
    private hasFocus: boolean;

    @Input() public title: string;
    @Input() public valid: boolean;

    protected onTouchedCallback: () => void = () => void 0;
    protected onChangeCallback: (_: any) => void = () => void 0;

    constructor() {
        this.id = (new Date()).getTime().toString();
        this.valid = true;
    }

    private _value: any;
    protected get value(): any {
        return this._value;
    };

    protected set value(value: any) {
        this._value = value;
        this.onChangeCallback(this._value);
    }

    public onFocus() {
        this.hasFocus = true;
    }

    public onBlur() {
        if (!this.value) {
            this.hasFocus = false;
        }
        this.onTouchedCallback();
    }

    public writeValue(obj: any): void {
        this.value = obj;
    }

    public registerOnChange(fn: any): void {
        this.onChangeCallback = fn;
    }

    public registerOnTouched(fn: any): void {
        this.onTouchedCallback = fn;
    }
}
