import {Component, OnInit, signal, WritableSignal} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {SelectComponent} from "./components/select/select.component";
import {OptionComponent} from "./components/select/option/option.component";
import {SearchInputComponent} from "./components/search-input/search-input.component";
import {FormsModule} from "@angular/forms";
import {SEARCH_INPUT_COMPONENT, SEARCH_INPUT_TEMPLATE} from "./constants/templates/search-input";
import {TemplateComponentComponent} from "./components/template-component/template-component.component";
import {ToastService} from "./components/toasts/toast.service";
import {ToastModel} from "./components/toasts/toast.model";
import {NgForOf, NgIf} from "@angular/common";

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, SelectComponent, OptionComponent, SearchInputComponent, FormsModule, TemplateComponentComponent, NgForOf, NgIf],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
    searchInputValue = signal('');
    toasts!: WritableSignal<ToastModel[]>;
    title = 'overlayStand';
    searchTemplate = SEARCH_INPUT_TEMPLATE;
    searchComponent = SEARCH_INPUT_COMPONENT;

    constructor(private _toastSrv: ToastService) {
        this.toasts = this._toastSrv.toasts;

    }

    ngOnInit() {
        this._toastSrv.appendOverlay();
    }

    makeToast() {
        this._toastSrv.showToast('success', 'success');
    }
}
