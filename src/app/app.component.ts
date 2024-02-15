import {Component, OnInit, signal, ViewChild, WritableSignal} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {SelectComponent} from "./components/select/select.component";
import {OptionComponent} from "./components/select/option/option.component";
import {SearchInputComponent} from "./components/search-input/search-input.component";
import {FormsModule} from "@angular/forms";
import {TemplateComponentComponent} from "./components/template-component/template-component.component";
import {ToastService} from "./components/toasts/toast.service";
import {ToastModel, ToastType} from "./components/toasts/toast.model";
import {NgForOf, NgIf, NgTemplateOutlet} from "@angular/common";

import {ModalHandler} from "./components/modal/modal.handler";
import {Overlay} from "@angular/cdk/overlay";

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
