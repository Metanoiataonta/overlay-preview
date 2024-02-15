import {Component, Inject} from '@angular/core';
import {ToastService} from "./toast.service";
import {NgForOf} from "@angular/common";

@Component({
    selector: 'app-toasts',
    standalone: true,
    imports: [
        NgForOf,
    ],
    templateUrl: './toasts.component.html',
    styleUrl: './toasts.component.scss',
})
export class ToastsComponent {
    constructor(public toastService: ToastService) {
        console.warn(this.toastService);
    }

}
