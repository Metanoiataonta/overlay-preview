export const SELECT_COMPONENT_TEMPLATE = '<div class="body select" (click)="toggleOverlay()" #body>\n' +
    '    <ng-container *ngTemplateOutlet="selectedTemplate()"></ng-container>\n' +
    '    <svg\n' +
    '        width="24" height="24" color="#A2A9B8"\n' +
    '        viewBox="0 0 24 24" stroke="currentColor" fill="none"\n' +
    '        xmlns="http://www.w3.org/2000/svg"\n' +
    '        class="select__chevron">\n' +
    '        <path d="M9 13L12 10L15 13" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>\n' +
    '    </svg>\n' +
    '</div>\n' +
    '<ng-content></ng-content>\n' +
    '<ng-template #template>\n' +
    '    <div class="select__wrapper">\n' +
    '        <div *ngFor="let option of options" class="select__item" (click)="pickItem(option.template)">\n' +
    '            <div class="select__item-inner">\n' +
    '                <ng-container *ngTemplateOutlet="option.template"></ng-container>\n' +
    '\n' +
    '            </div>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '    <ng-container>\n' +
    '    </ng-container>\n' +
    '\n' +
    '</ng-template>\n';

export const SELECT_COMPONENT_CODE = 'import {\n' +
    '    AfterContentInit,\n' +
    '    Component,\n' +
    '    ContentChildren, ElementRef, OnInit,\n' +
    '    QueryList,\n' +
    '    signal, TemplateRef, ViewChild,\n' +
    '    ViewChildren, ViewContainerRef,\n' +
    '    WritableSignal\n' +
    '} from \'@angular/core\';\n' +
    'import {OptionComponent} from "./option/option.component";\n' +
    'import {NgForOf, NgTemplateOutlet} from "@angular/common";\n' +
    'import {ControlValueAccessor} from "@angular/forms";\n' +
    'import {Overlay, OverlayRef} from "@angular/cdk/overlay";\n' +
    'import {TemplatePortal} from "@angular/cdk/portal";\n' +
    'import {AbstractOverlayedComponent} from "../abstract.overlayed.component";\n' +
    '\n' +
    '@Component({\n' +
    '    selector: \'app-select\',\n' +
    '    standalone: true,\n' +
    '    imports: [\n' +
    '        NgForOf,\n' +
    '        NgTemplateOutlet\n' +
    '    ],\n' +
    '    templateUrl: \'./select.component.html\',\n' +
    '    styleUrl: \'./select.component.scss\'\n' +
    '})\n' +
    'export class SelectComponent<T> extends AbstractOverlayedComponent implements AfterContentInit, ControlValueAccessor {\n' +
    '    selected: WritableSignal<T | null> = signal(null);\n' +
    '    isDisabled = false;\n' +
    '    selectedTemplate: WritableSignal<TemplateRef<any> | null> = signal(null);\n' +
    '    private _onChange?: (value: T | null) => {};\n' +
    '    private _onTouch?: (value: T | null) => {};\n' +
    '    @ViewChild(\'body\') anchor!: ElementRef;\n' +
    '    @ViewChild(\'template\') protected _overlayTemplate!: TemplateRef<any>;\n' +
    '\n' +
    '    constructor(protected _overlay: Overlay, protected _view: ViewContainerRef) {\n' +
    '        super();\n' +
    '    }\n' +
    '\n' +
    '    writeValue(value: T | null): void {\n' +
    '        this.selected.set(value);\n' +
    '        if (this._onChange != null) {\n' +
    '            this._onChange(value);\n' +
    '        }\n' +
    '    }\n' +
    '\n' +
    '    registerOnChange(fn: (value: T | null) => {}): void {\n' +
    '        this._onChange = fn;\n' +
    '    }\n' +
    '\n' +
    '    registerOnTouched(fn: () => {}): void {\n' +
    '        this._onTouch = fn;\n' +
    '    }\n' +
    '\n' +
    '    setDisabledState?(isDisabled: boolean): void {\n' +
    '        this.isDisabled = isDisabled;\n' +
    '    }\n' +
    '\n' +
    '    @ContentChildren(OptionComponent) options?: QueryList<OptionComponent>;\n' +
    '\n' +
    '    ngAfterContentInit() {\n' +
    '        console.warn(this.options?.length);\n' +
    '        if (this.options != null)\n' +
    '            this.selectedTemplate.set(this.options.get(0)?.template!);\n' +
    '    }\n' +
    '\n' +
    '\n' +
    '    pickItem(item: TemplateRef<any>) {\n' +
    '        this.selectedTemplate.set(item);\n' +
    '        this._dispatchOverlay();\n' +
    '    }\n' +
    '}\n';

export const OPTION_COMPONENT_TEMPLATE = '  <ng-content></ng-content>\n';
export const OPTION_COMPONENT_CODE = 'import {Component, ContentChild, TemplateRef} from \'@angular/core\';\n' +
    '\n' +
    '@Component({\n' +
    '  selector: \'app-option\',\n' +
    '  standalone: true,\n' +
    '  imports: [],\n' +
    '  templateUrl: \'./option.component.html\',\n' +
    '  styleUrl: \'./option.component.scss\'\n' +
    '})\n' +
    'export class OptionComponent {\n' +
    '@ContentChild(TemplateRef) template!: TemplateRef<any>\n' +
    '}\n';
