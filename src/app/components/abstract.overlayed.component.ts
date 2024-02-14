import {Overlay, OverlayRef} from "@angular/cdk/overlay";
import {TemplatePortal} from "@angular/cdk/portal";
import {ElementRef, signal, TemplateRef, ViewContainerRef, WritableSignal} from "@angular/core";

export abstract class AbstractOverlayedComponent {
    public isOpen = signal(false);
    protected abstract anchor: ElementRef;
    protected abstract _overlay: Overlay;
    protected abstract _view: ViewContainerRef;
    protected abstract _overlayTemplate: TemplateRef<any>;
    protected _overlayRef: OverlayRef | null = null;

    protected _dispatchOverlay(cb?: () => void): void {
        if (cb != null) {
            cb();
        }
        this._overlayRef?.dispose();
        this._overlayRef = null;

    }

    public toggleOverlay(event?: Event): void {
        event?.preventDefault();
        if (this._overlayRef == null) {
            this.isOpen.set(true);
            this._overlayRef = this._overlay.create({
                positionStrategy: this._overlay.position().flexibleConnectedTo(this.anchor).withPositions([{
                    originX: 'center',
                    originY: 'bottom',
                    overlayX: 'center',
                    overlayY: 'top',
                    offsetY: 8
                }]),
                width: '320px',
                scrollStrategy: this._overlay.scrollStrategies.reposition()
            });
            this._overlayRef.attach(new TemplatePortal(this._overlayTemplate, this._view));
            this._overlayRef.outsidePointerEvents().subscribe(() => this._dispatchOverlay());
            return;
        }
        this._dispatchOverlay();
    }
}
