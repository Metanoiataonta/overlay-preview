import {
    AfterContentInit,
    Component,
    ContentChildren, ElementRef, OnInit,
    QueryList,
    signal, TemplateRef, ViewChild,
    ViewChildren, ViewContainerRef,
    WritableSignal
} from '@angular/core';
import {OptionComponent} from "./option/option.component";
import {NgForOf, NgTemplateOutlet} from "@angular/common";
import {ControlValueAccessor} from "@angular/forms";
import {Overlay, OverlayRef} from "@angular/cdk/overlay";
import {TemplatePortal} from "@angular/cdk/portal";
import {AbstractOverlayedComponent} from "../abstract.overlayed.component";

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
export class SelectComponent<T> extends AbstractOverlayedComponent implements AfterContentInit, ControlValueAccessor {
    selected: WritableSignal<T | null> = signal(null);
    isDisabled = false;
    selectedTemplate: WritableSignal<TemplateRef<any> | null> = signal(null);
    private _onChange?: (value: T | null) => {};
    private _onTouch?: (value: T | null) => {};
    @ViewChild('body') anchor!: ElementRef;
    @ViewChild('template') protected _overlayTemplate!: TemplateRef<any>;

    constructor(protected _overlay: Overlay, protected _view: ViewContainerRef) {
        super();
    }

    writeValue(value: T | null): void {
        this.selected.set(value);
        if (this._onChange != null) {
            this._onChange(value);
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

    @ContentChildren(OptionComponent) options?: QueryList<OptionComponent>;

    ngAfterContentInit() {
        console.warn(this.options?.length);
        if (this.options != null)
            this.selectedTemplate.set(this.options.get(0)?.template!);
    }


    pickItem(item: TemplateRef<any>) {
        this.selectedTemplate.set(item);
        this._dispatchOverlay();
    }
}
