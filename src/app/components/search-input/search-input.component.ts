import {
    ChangeDetectionStrategy,
    Component,
    ElementRef, forwardRef,
    OnInit,
    signal,
    TemplateRef,
    ViewChild,
    ViewContainerRef
} from '@angular/core';
import {ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR} from "@angular/forms";
import {Overlay, OverlayRef} from "@angular/cdk/overlay";
import {NgClass, NgForOf} from "@angular/common";
import {TemplatePortal} from "@angular/cdk/portal";
import {AbstractOverlayedComponent} from "../abstract.overlayed.component";

/**
 * @todo подумать над вложенностью и группировкой элементов списка
 */

@Component({
    selector: 'app-search-input',
    standalone: true,
    imports: [
        FormsModule,
        NgForOf,
        NgClass
    ],
    templateUrl: './search-input.component.html',
    styleUrl: './search-input.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => SearchInputComponent),
            multi: true
        }
    ]
})
export class SearchInputComponent extends AbstractOverlayedComponent implements ControlValueAccessor {
    value = signal('');
    sourceList = Array(10).fill('').map(() => Math.round(Math.random() * 10000).toString());
    list = signal(this.sourceList);
    disabled = signal(false);
    @ViewChild('input') protected anchor!: ElementRef;
    @ViewChild(TemplateRef) protected _overlayTemplate!: TemplateRef<any>;
    private _onChange?: (value: any) => {};
    private _onTouch?: (value: any) => {};

    constructor(protected _overlay: Overlay, protected _view: ViewContainerRef) {
        super();
    }

    writeValue(value: string): void {
        this.value.set(value);
        if (this._onChange) {
            this._onChange(value);
        }
    }

    registerOnChange(fn: any): void {
        this._onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this._onTouch = fn;
    }

    setDisabledState?(isDisabled: boolean): void {
        this.disabled.set(isDisabled);
    }

    toggleList(event?: Event) {
        if (this.list().length === 0) {
            this._dispatchOverlay();
            return;
        }
        if (this._overlayRef != null) {
            return;
        }
        this.toggleOverlay(event);
    }

    protected override _dispatchOverlay() {
        super._dispatchOverlay(() => this.isOpen.set(false));
    }

    valueChange(value: string) {
        this.value.set(value);
        this.list.set(this.sourceList.filter(item => item.includes(value)));
        this.toggleList();
        if (this._onChange != null) {
            this._onChange(value);
        }
    }

    pickItem(item: string) {
        this.value.set(item);
        if (this._onChange != null) {
            this._onChange(item);
        }
        this.list.set(this.sourceList);
        this._dispatchOverlay();
    }
}
