import {Component, OnInit, signal, ViewChild, WritableSignal} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {SelectComponent} from "./components/select/select.component";
import {OptionComponent} from "./components/select/option/option.component";
import {SearchInputComponent} from "./components/search-input/search-input.component";
import {FormsModule} from "@angular/forms";
import {SEARCH_INPUT_COMPONENT, SEARCH_INPUT_TEMPLATE} from "./constants/templates/search-input";
import {TemplateComponentComponent} from "./components/template-component/template-component.component";
import {ToastService} from "./components/toasts/toast.service";
import {ToastModel, ToastType} from "./components/toasts/toast.model";
import {NgForOf, NgIf, NgTemplateOutlet} from "@angular/common";
import {
    OPTION_COMPONENT_CODE,
    OPTION_COMPONENT_TEMPLATE,
    SELECT_COMPONENT_CODE,
    SELECT_COMPONENT_TEMPLATE
} from "./constants/templates/select";
import {TOAST_COMPONENT_CODE, TOAST_COMPONENT_TEMPLATE, TOAST_SERVICE_CODE} from "./constants/templates/toast";
import {Overlay} from "@angular/cdk/overlay";

import {MODAL_COMPONENT_CODE, MODAL_COMPONENT_TEMPLATE, MODAL_HANDLER} from "./constants/templates/modal";
import {ModalHandler} from "./components/modal/modal.handler";

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, SelectComponent, OptionComponent, SearchInputComponent, FormsModule, TemplateComponentComponent, NgForOf, NgIf, NgTemplateOutlet],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
})
export class AppComponent extends ModalHandler implements OnInit {
    searchInputValue = signal('');
    toasts!: WritableSignal<ToastModel[]>;
    title = 'overlayStand';
    searchTemplate = SEARCH_INPUT_TEMPLATE;
    searchComponent = SEARCH_INPUT_COMPONENT;
    selectTemplate = SELECT_COMPONENT_TEMPLATE;
    selectCode = SELECT_COMPONENT_CODE;
    optionTemplate = OPTION_COMPONENT_TEMPLATE;
    optionCode = OPTION_COMPONENT_CODE;
    toastTemplate = TOAST_COMPONENT_TEMPLATE;
    toastCode = TOAST_COMPONENT_CODE;
    toastService = TOAST_SERVICE_CODE;
    modalTemplate = MODAL_COMPONENT_TEMPLATE;
    modalCode = MODAL_COMPONENT_CODE;
    modalHandler = MODAL_HANDLER;
    @ViewChild(SelectComponent) selectedComponent!: SelectComponent<any>;

    constructor(private _toastSrv: ToastService, _overlay: Overlay) {
        super(_overlay);
        this.toasts = this._toastSrv.toasts;

    }

    ngOnInit() {
        this._toastSrv.appendOverlay();
    }

    makeToast() {
        const randomToastType = ['success', 'error', 'warning', 'info'].at(Math.round(Math.random() * 3)) as ToastType;
        this._toastSrv.showToast(randomToastType, randomToastType);
    }

}
