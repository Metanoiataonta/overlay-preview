export const SEARCH_INPUT_TEMPLATE = '<div class="search-input" [ngClass]="{open: isListVisible()}" (click)="toggleList()" #input>\n' +
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
    'export class SearchInputComponent implements OnInit, ControlValueAccessor {\n' +
    '    value = signal(\'\');\n' +
    '    sourceList = Array(10).fill(\'\').map(() => Math.round(Math.random() * 100).toString());\n' +
    '    list = signal(this.sourceList);\n' +
    '    isListVisible = signal(false);\n' +
    '    disabled = signal(false);\n' +
    '    @ViewChild(\'input\') input!: ElementRef;\n' +
    '    @ViewChild(TemplateRef) template!: TemplateRef<any>;\n' +
    '    private _overlayRef!: OverlayRef | null;\n' +
    '    private _onChange?: (value: any) => {};\n' +
    '    private _onTouch?: (value: any) => {};\n' +
    '\n' +
    '    constructor(private _overlay: Overlay, private _view: ViewContainerRef) {\n' +
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
    '    ngOnInit() {\n' +
    '\n' +
    '    }\n' +
    '\n' +
    '    toggleList(event?: Event) {\n' +
    '        event?.preventDefault();\n' +
    '        if (this.list().length === 0) {\n' +
    '            this._dispatchOverlay();\n' +
    '            return;\n' +
    '        }\n' +
    '        if (this._overlayRef == null) {\n' +
    '            this.isListVisible.set(true);\n' +
    '            this._overlayRef = this._overlay.create({\n' +
    '                positionStrategy: this._overlay.position().flexibleConnectedTo(this.input).withPositions([{\n' +
    '                    originX: \'center\',\n' +
    '                    originY: \'bottom\',\n' +
    '                    overlayX: \'center\',\n' +
    '                    overlayY: \'top\',\n' +
    '                    offsetY: 8\n' +
    '                }]),\n' +
    '                width: \'320px\',\n' +
    '                scrollStrategy: this._overlay.scrollStrategies.reposition()\n' +
    '            });\n' +
    '            this._overlayRef.attach(new TemplatePortal(this.template, this._view));\n' +
    '            this._overlayRef.outsidePointerEvents().subscribe(() => this._dispatchOverlay());\n' +
    '            return;\n' +
    '        }\n' +
    '        this._dispatchOverlay();\n' +
    '\n' +
    '    }\n' +
    '\n' +
    '    private _dispatchOverlay() {\n' +
    '        this._overlayRef?.dispose();\n' +
    '        this.isListVisible.set(false);\n' +
    '        this._overlayRef = null;\n' +
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
    '        this._dispatchOverlay();\n' +
    '    }\n' +
    '}\n';
