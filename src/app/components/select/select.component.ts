import {AfterContentInit, Component, ContentChildren, QueryList, ViewChildren} from '@angular/core';
import {OptionComponent} from "./option/option.component";
import {NgForOf, NgTemplateOutlet} from "@angular/common";
import {ControlValueAccessor} from "@angular/forms";

@Component({
    selector: 'app-select',
    standalone: true,
    imports: [
        NgForOf,
        NgTemplateOutlet
    ],
    templateUrl: './select.component.html',
    styleUrl: './select.component.scss'
})
export class SelectComponent<T> implements AfterContentInit, ControlValueAccessor {
    selected: T | null = null
    isDisabled = false
    private _onChange?: (value: T | null) => {}
    private _onTouch?: (value: T | null) => {}

    writeValue(value: T | null): void {
        this.selected = value;
        if (this._onChange != null) {
            this._onChange(value)
        }
    }

    registerOnChange(fn: (value: T | null) => {}): void {
        this._onChange = fn;
    }

    registerOnTouched(fn: () => {}): void {
        this._onTouch = fn;
    }

    setDisabledState?(isDisabled: boolean): void {
        this.isDisabled = isDisabled;
    }

    @ContentChildren(OptionComponent) options?: QueryList<OptionComponent>

    ngAfterContentInit() {
        console.warn(this)
    }
}
