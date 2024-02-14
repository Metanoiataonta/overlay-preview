import {Component, signal} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {SelectComponent} from "./components/select/select.component";
import {OptionComponent} from "./components/select/option/option.component";
import {SearchInputComponent} from "./components/search-input/search-input.component";
import {FormsModule} from "@angular/forms";
import {SEARCH_INPUT_COMPONENT, SEARCH_INPUT_TEMPLATE} from "./constants/templates/search-input";
import {TemplateComponentComponent} from "./components/template-component/template-component.component";

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, SelectComponent, OptionComponent, SearchInputComponent, FormsModule, TemplateComponentComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent {
    searchInputValue = signal('');
    title = 'overlayStand';
    searchTemplate = SEARCH_INPUT_TEMPLATE;
    searchComponent = SEARCH_INPUT_COMPONENT;
}
