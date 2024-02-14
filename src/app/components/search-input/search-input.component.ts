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
export class SearchInputComponent implements OnInit, ControlValueAccessor {
    value = signal('');
    sourceList = Array(10).fill('').map(() => Math.round(Math.random() * 100).toString());
    list = signal(this.sourceList);
    isListVisible = signal(false);
    disabled = signal(false);
    @ViewChild('input') input!: ElementRef;
    @ViewChild(TemplateRef) template!: TemplateRef<any>;
    private _overlayRef!: OverlayRef | null;
    private _onChange?: (value: any) => {};
    private _onTouch?: (value: any) => {};

    constructor(private _overlay: Overlay, private _view: ViewContainerRef) {
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

    ngOnInit() {

    }

    toggleList(event?: Event) {
        event?.preventDefault();
        if (this.list().length === 0) {
            this._dispatchOverlay();
            return;
        }
        if (this._overlayRef == null) {
            this.isListVisible.set(true);
            this._overlayRef = this._overlay.create({
                positionStrategy: this._overlay.position().flexibleConnectedTo(this.input).withPositions([{
                    originX: 'center',
                    originY: 'bottom',
                    overlayX: 'center',
                    overlayY: 'top',
                    offsetY: 8
                }]),
                width: '320px',
                scrollStrategy: this._overlay.scrollStrategies.reposition()
            });
            this._overlayRef.attach(new TemplatePortal(this.template, this._view));
            this._overlayRef.outsidePointerEvents().subscribe(() => this._dispatchOverlay());
            return;
        }
        this._dispatchOverlay();

    }

    private _dispatchOverlay() {
        this._overlayRef?.dispose();
        this.isListVisible.set(false);
        this._overlayRef = null;
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
        this._dispatchOverlay();
    }
}
