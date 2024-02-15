export const SEARCH_INPUT_TEMPLATE = '<div class="search-input" [ngClass]="{open: isOpen()}" (click)="toggleList()" #input>\n' +
    '    <input type="text" class="search-input__input" [ngModel]="value()"\n' +
    '           (ngModelChange)="valueChange($event)">\n' +
    '    <svg (click)=" toggleList($event)" [style.color]="list().length > 0 ? \'#A2A9B8\' : \'red\'"\n' +
    '         width="24" height="24"\n' +
    '         viewBox="0 0 24 24" stroke="currentColor" fill="none"\n' +
    '         xmlns="http://www.w3.org/2000/svg"\n' +
    '         class="search-input__chevron">\n' +
    '        <path d="M9 13L12 10L15 13" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>\n' +
    '    </svg>\n' +
    '\n' +
    '</div>\n' +
    '<ng-template>\n' +
    '    <div class="search-input__wrapper">\n' +
    '        <div *ngFor="let item of list()" class="search-input__item" (click)="pickItem(item)">\n' +
    '            <div class="search-input__item-inner">\n' +
    '                {{ item }}\n' +
    '\n' +
    '            </div>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '</ng-template>\n';

export const SEARCH_INPUT_COMPONENT = 'import {\n' +
    '    ChangeDetectionStrategy,\n' +
    '    Component,\n' +
    '    ElementRef, forwardRef,\n' +
    '    OnInit,\n' +
    '    signal,\n' +
    '    TemplateRef,\n' +
    '    ViewChild,\n' +
    '    ViewContainerRef\n' +
    '} from \'@angular/core\';\n' +
    'import {ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR} from "@angular/forms";\n' +
    'import {Overlay, OverlayRef} from "@angular/cdk/overlay";\n' +
    'import {NgClass, NgForOf} from "@angular/common";\n' +
    'import {TemplatePortal} from "@angular/cdk/portal";\n' +
    'import {AbstractOverlayedComponent} from "../abstract.overlayed.component";\n' +
    '\n' +
    '/**\n' +
    ' * @todo подумать над вложенностью и группировкой элементов списка\n' +
    ' */\n' +
    '\n' +
    '@Component({\n' +
    '    selector: \'app-search-input\',\n' +
    '    standalone: true,\n' +
    '    imports: [\n' +
    '        FormsModule,\n' +
    '        NgForOf,\n' +
    '        NgClass\n' +
    '    ],\n' +
    '    templateUrl: \'./search-input.component.html\',\n' +
    '    styleUrl: \'./search-input.component.scss\',\n' +
    '    changeDetection: ChangeDetectionStrategy.OnPush,\n' +
    '    providers: [\n' +
    '        {\n' +
    '            provide: NG_VALUE_ACCESSOR,\n' +
    '            useExisting: forwardRef(() => SearchInputComponent),\n' +
    '            multi: true\n' +
    '        }\n' +
    '    ]\n' +
    '})\n' +
    'export class SearchInputComponent extends AbstractOverlayedComponent implements ControlValueAccessor {\n' +
    '    value = signal(\'\');\n' +
    '    sourceList = Array(10).fill(\'\').map(() => Math.round(Math.random() * 10000).toString());\n' +
    '    list = signal(this.sourceList);\n' +
    '    disabled = signal(false);\n' +
    '    @ViewChild(\'input\') protected anchor!: ElementRef;\n' +
    '    @ViewChild(TemplateRef) protected _overlayTemplate!: TemplateRef<any>;\n' +
    '    private _onChange?: (value: any) => {};\n' +
    '    private _onTouch?: (value: any) => {};\n' +
    '\n' +
    '    constructor(protected _overlay: Overlay, protected _view: ViewContainerRef) {\n' +
    '        super();\n' +
    '    }\n' +
    '\n' +
    '    writeValue(value: string): void {\n' +
    '        this.value.set(value);\n' +
    '        if (this._onChange) {\n' +
    '            this._onChange(value);\n' +
    '        }\n' +
    '    }\n' +
    '\n' +
    '    registerOnChange(fn: any): void {\n' +
    '        this._onChange = fn;\n' +
    '    }\n' +
    '\n' +
    '    registerOnTouched(fn: any): void {\n' +
    '        this._onTouch = fn;\n' +
    '    }\n' +
    '\n' +
    '    setDisabledState?(isDisabled: boolean): void {\n' +
    '        this.disabled.set(isDisabled);\n' +
    '    }\n' +
    '\n' +
    '    toggleList(event?: Event) {\n' +
    '        if (this.list().length === 0) {\n' +
    '            this._dispatchOverlay();\n' +
    '            return;\n' +
    '        }\n' +
    '        if (this._overlayRef != null) {\n' +
    '            return;\n' +
    '        }\n' +
    '        this.toggleOverlay(event);\n' +
    '    }\n' +
    '\n' +
    '    protected override _dispatchOverlay() {\n' +
    '        super._dispatchOverlay(() => this.isOpen.set(false));\n' +
    '    }\n' +
    '\n' +
    '    valueChange(value: string) {\n' +
    '        this.value.set(value);\n' +
    '        this.list.set(this.sourceList.filter(item => item.includes(value)));\n' +
    '        this.toggleList();\n' +
    '        if (this._onChange != null) {\n' +
    '            this._onChange(value);\n' +
    '        }\n' +
    '    }\n' +
    '\n' +
    '    pickItem(item: string) {\n' +
    '        this.value.set(item);\n' +
    '        if (this._onChange != null) {\n' +
    '            this._onChange(item);\n' +
    '        }\n' +
    '        this.list.set(this.sourceList);\n' +
    '        this._dispatchOverlay();\n' +
    '    }\n' +
    '}\n';
