import {Injectable, signal, WritableSignal} from "@angular/core";
import {Overlay} from "@angular/cdk/overlay";
import {ToastsComponent} from "./toasts.component";
import {ComponentPortal} from "@angular/cdk/portal";
import {delay, Subject, timer} from "rxjs";
import {IToastType, ToastModel} from "./toast.model";

@Injectable({providedIn: 'root'})
export class ToastService {
    toasts: WritableSignal<ToastModel[]> = signal([]);
    lastToastReceived$ = new Subject();

    constructor(private _overlay: Overlay) {
        this.lastToastReceived$.pipe(delay(5000)).subscribe(() => {
            this.toasts.set([]);
        });
    }

    appendOverlay() {
        const ref = this._overlay.create({
            positionStrategy: this._overlay.position()
                .global()
                .bottom('10%')
                .right('10%'),
        });
        ref.attach(new ComponentPortal(ToastsComponent));

    }

    showToast(text: string, type: IToastType) {
        this.toasts.set([...this.toasts(), new ToastModel(text, type)]);
        this.lastToastReceived$.next(null);

    }
}
