import {Component, Inject} from '@angular/core';
import {ToastService} from "./toast.service";
import {NgClass, NgForOf, NgIf, TitleCasePipe} from "@angular/common";

@Component({
    selector: 'app-toasts',
    standalone: true,
    imports: [
        NgForOf,
        NgClass,
        NgIf,
        TitleCasePipe,
    ],
    templateUrl: './toasts.component.html',
    styleUrl: './toasts.component.scss',
})
export class ToastsComponent {
    constructor(public toastService: ToastService) {
    }

}
