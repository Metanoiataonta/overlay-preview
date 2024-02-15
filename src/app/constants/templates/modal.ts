export const MODAL_COMPONENT_TEMPLATE = '<div class="modal">\n' +
    '    <p>Вы действительно хотите нажать кнопку "Да"?</p>\n' +
    '    <div class="modal__controls">\n' +
    '        <button class="modal__button" (click)="select.emit(false)">Нет</button>\n' +
    '        <button class="modal__button modal__button_primary" (click)="select.emit(true)">Да</button>\n' +
    '    </div>\n' +
    '</div>\n';

export const MODAL_COMPONENT_CODE = 'import {Component, EventEmitter, Output} from \'@angular/core\';\n' +
    '\n' +
    '@Component({\n' +
    '    selector: \'app-modal\',\n' +
    '    standalone: true,\n' +
    '    imports: [],\n' +
    '    templateUrl: \'./modal.component.html\',\n' +
    '    styleUrl: \'./modal.component.scss\'\n' +
    '})\n' +
    'export class ModalComponent {\n' +
    '    @Output() select = new EventEmitter<boolean>();\n' +
    '}\n';
export const MODAL_HANDLER = '    showModal() {\n' +
    '        if (this._overlayRef != null) {\n' +
    '            return;\n' +
    '        }\n' +
    '        this._overlayRef = this._overlay.create({\n' +
    '            positionStrategy: this._overlay.position().global().centerVertically().centerHorizontally(),\n' +
    '            scrollStrategy: this._overlay.scrollStrategies.noop(),\n' +
    '            hasBackdrop: true\n' +
    '        });\n' +
    '        const componentPortal = new ComponentPortal(ModalComponent);\n' +
    '\n' +
    '        const componentRef = this._overlayRef.attach(componentPortal);\n' +
    '\n' +
    '        merge(this._overlayRef.outsidePointerEvents(), componentRef.instance.select).subscribe((v) => {\n' +
    '            this.lastYes.set(v === true);\n' +
    '            this._overlayRef?.dispose();\n' +
    '            this._overlayRef = null;\n' +
    '        });\n' +
    '\n' +
    '    }';
