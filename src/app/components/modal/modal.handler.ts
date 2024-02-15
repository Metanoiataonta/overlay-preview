import {Overlay, OverlayRef} from "@angular/cdk/overlay";
import {ComponentPortal} from "@angular/cdk/portal";
import {ModalComponent} from "./modal.component";
import {merge} from "rxjs";
import {signal, WritableSignal} from "@angular/core";

export class ModalHandler {
    protected _overlayRef: OverlayRef | null = null;
    value: WritableSignal<boolean | null> = signal(null);


    constructor(protected _overlay: Overlay) {
    }

    showModal() {
        if (this._overlayRef != null) {
            return;
        }
        this._overlayRef = this._overlay.create({
            positionStrategy: this._overlay.position().global().centerVertically().centerHorizontally(),
            scrollStrategy: this._overlay.scrollStrategies.noop(),
            hasBackdrop: true
        });
        const componentPortal = new ComponentPortal(ModalComponent);

        const componentRef = this._overlayRef.attach(componentPortal);

        merge(this._overlayRef.outsidePointerEvents(), componentRef.instance.select).subscribe((v) => {
            this.value.set(v === true);
            this._overlayRef?.dispose();
            this._overlayRef = null;
        });

    }

}
