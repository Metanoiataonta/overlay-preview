import {
    AfterContentInit,
    Component,
    ContentChildren, ElementRef,
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
    selected: WritableSignal<T | null> = signal(null);
    isDisabled = false;
    selectedTemplate: WritableSignal<TemplateRef<any> | null> = signal(null);
    private _onChange?: (value: T | null) => {};
    private _onTouch?: (value: T | null) => {};
    private _overlayRef: OverlayRef | null = null;
    @ViewChild('body') body!: ElementRef;
    @ViewChild('template') private _template!: TemplateRef<any>;

    constructor(private _overlay: Overlay, private _viewContainer: ViewContainerRef) {
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

    toggle() {
        if (this._overlayRef == null) {
            this._overlayRef = this._overlay.create({
                positionStrategy: this._overlay.position().flexibleConnectedTo(this.body).withPositions([{
                    originX: 'center',
                    originY: 'bottom',
                    overlayX: 'center',
                    overlayY: 'top',
                    offsetY: 8
                }]),
                width: '320px',
                scrollStrategy: this._overlay.scrollStrategies.reposition()
            });
            this._overlayRef.attach(new TemplatePortal(this._template, this._viewContainer));
        }
    }

    pickItem(item: TemplateRef<any>) {
        this.selectedTemplate.set(item);
    }
}
