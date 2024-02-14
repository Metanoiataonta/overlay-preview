import {Component, signal} from '@angular/core';
import {FormsModule} from "@angular/forms";

@Component({
    selector: 'app-search-input',
    standalone: true,
    imports: [
        FormsModule
    ],
    templateUrl: './search-input.component.html',
    styleUrl: './search-input.component.scss'
})
export class SearchInputComponent {
    value = signal('')
}
