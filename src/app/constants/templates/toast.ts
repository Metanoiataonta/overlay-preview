export const TOAST_COMPONENT_TEMPLATE = '<div *ngFor="let toast of toastService.toasts()" class="toast" [ngClass]="\'toast_\'+ toast.type">\n' +
    '    <div class="toast__icon">\n' +
    '        @switch (toast.type) {\n' +
    '            @case (\'success\') {\n' +
    '                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">\n' +
    '                    <path\n' +
    '                        d="M15 10L11 14L9 12M12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21Z"\n' +
    '                        stroke="#28C75D" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>\n' +
    '                </svg>\n' +
    '            }\n' +
    '            @case (\'error\') {\n' +
    '                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">\n' +
    '                    <path\n' +
    '                        d="M15 15L12 12M12 12L9 9M12 12L15 9M12 12L9 15M12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21Z"\n' +
    '                        stroke="#FF564E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>\n' +
    '                </svg>\n' +
    '            }\n' +
    '            @case (\'info\') {\n' +
    '                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">\n' +
    '                    <path\n' +
    '                        d="M12 16V12M12 8H12.01M12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21Z"\n' +
    '                        stroke="#0095FF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>\n' +
    '                </svg>\n' +
    '            }\n' +
    '            @case (\'warning\') {\n' +
    '                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">\n' +
    '                    <path\n' +
    '                        d="M12 9V13M12 17H12.01M10.29 3.86L1.82002 18C1.64539 18.3024 1.55299 18.6453 1.55201 18.9945C1.55103 19.3437 1.64151 19.6871 1.81445 19.9905C1.98738 20.2939 2.23675 20.5467 2.53773 20.7239C2.83871 20.901 3.18082 20.9962 3.53002 21H20.47C20.8192 20.9962 21.1613 20.901 21.4623 20.7239C21.7633 20.5467 22.0127 20.2939 22.1856 19.9905C22.3585 19.6871 22.449 19.3437 22.448 18.9945C22.4471 18.6453 22.3547 18.3024 22.18 18L13.71 3.86C13.5318 3.56611 13.2807 3.32312 12.9812 3.15448C12.6817 2.98585 12.3438 2.89725 12 2.89725C11.6563 2.89725 11.3184 2.98585 11.0188 3.15448C10.7193 3.32312 10.4683 3.56611 10.29 3.86Z"\n' +
    '                        stroke="#F8B73F" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>\n' +
    '                </svg>\n' +
    '            }\n' +
    '        }\n' +
    '\n' +
    '    </div>\n' +
    '    <div>\n' +
    '        {{ toast.type |  titlecase }}\n' +
    '\n' +
    '    </div>\n' +
    '</div>\n' +
    '<div *ngIf="toastService.toasts().length > 0" class="toast__hide" (click)="toastService.hideAll()">mr Hide</div>\n';
export const TOAST_COMPONENT_CODE = 'import {Component, Inject} from \'@angular/core\';\n' +
    'import {ToastService} from "./toast.service";\n' +
    'import {NgClass, NgForOf, NgIf, TitleCasePipe} from "@angular/common";\n' +
    '\n' +
    '@Component({\n' +
    '    selector: \'app-toasts\',\n' +
    '    standalone: true,\n' +
    '    imports: [\n' +
    '        NgForOf,\n' +
    '        NgClass,\n' +
    '        NgIf,\n' +
    '        TitleCasePipe,\n' +
    '    ],\n' +
    '    templateUrl: \'./toasts.component.html\',\n' +
    '    styleUrl: \'./toasts.component.scss\',\n' +
    '})\n' +
    'export class ToastsComponent {\n' +
    '    constructor(public toastService: ToastService) {\n' +
    '    }\n' +
    '\n' +
    '}\n';
export const TOAST_SERVICE_CODE = 'import {Injectable, signal, WritableSignal} from "@angular/core";\n' +
    'import {Overlay} from "@angular/cdk/overlay";\n' +
    'import {ToastsComponent} from "./toasts.component";\n' +
    'import {ComponentPortal} from "@angular/cdk/portal";\n' +
    'import {debounceTime, Subject} from "rxjs";\n' +
    'import {ToastType, ToastModel} from "./toast.model";\n' +
    '\n' +
    '@Injectable({providedIn: \'root\'})\n' +
    'export class ToastService {\n' +
    '    toasts: WritableSignal<ToastModel[]> = signal([]);\n' +
    '    lastToastReceived$ = new Subject();\n' +
    '\n' +
    '    constructor(private _overlay: Overlay) {\n' +
    '        this.lastToastReceived$.pipe(debounceTime(5000)).subscribe(() => {\n' +
    '            this.toasts.set([]);\n' +
    '        });\n' +
    '    }\n' +
    '\n' +
    '    appendOverlay() {\n' +
    '        const ref = this._overlay.create({\n' +
    '            positionStrategy: this._overlay.position()\n' +
    '                .global()\n' +
    '                .top(\'16px\')\n' +
    '                .right(\'16px\'),\n' +
    '        });\n' +
    '        ref.attach(new ComponentPortal(ToastsComponent));\n' +
    '\n' +
    '    }\n' +
    '\n' +
    '    showToast(text: string, type: ToastType) {\n' +
    '        this.toasts.set([...this.toasts(), new ToastModel(text, type)]);\n' +
    '        this.lastToastReceived$.next(null);\n' +
    '\n' +
    '    }\n' +
    '\n' +
    '    hideAll() {\n' +
    '        this.toasts.set([]);\n' +
    '    }\n' +
    '}\n';
