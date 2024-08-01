import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    OnDestroy,
    TemplateRef,
    ViewChild,
    ViewContainerRef
} from '@angular/core';
import {AbstractOverlayedComponent} from "../abstract.overlayed.component";
import {Overlay} from "@angular/cdk/overlay";
import {TemplatePortal} from "@angular/cdk/portal";
import {fromEvent, tap, merge, debounceTime, Subscription} from "rxjs";

@Component({
    selector: 'app-tooltip',
    standalone: true,
    imports: [],
    templateUrl: './tooltip.component.html',
    styleUrl: './tooltip.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TooltipComponent extends AbstractOverlayedComponent implements OnDestroy {
    @ViewChild('anchor') protected anchor!: ElementRef;
    @ViewChild(TemplateRef) protected _overlayTemplate!: TemplateRef<any>;
    subscription?: Subscription;

    constructor(protected _overlay: Overlay, protected _view: ViewContainerRef) {
        super();
    }

    show(event: MouseEvent) {
        event?.preventDefault();
        if (this._overlayRef == null) {
            this.isOpen.set(true);
            this._overlayRef = this._overlay.create({
                positionStrategy: this._overlay.position()
                    .flexibleConnectedTo(this.anchor)
                    .withPositions([{
                        originX: 'center',
                        originY: 'bottom',
                        overlayX: 'center',
                        overlayY: 'top',
                        offsetY: 8
                    }]),
                scrollStrategy: this._overlay.scrollStrategies.reposition()
            });
            this._overlayRef.attach(new TemplatePortal(this._overlayTemplate, this._view));
            this.subscription = merge(
                // Курсор вышел за пределы иконки
                fromEvent(this.anchor.nativeElement as HTMLElement, 'mouseleave'),
                // Курсор на иконке
                fromEvent(this.anchor.nativeElement as HTMLElement, 'mouseenter'),
                // Курсор вышел за пределы Overlay
                fromEvent(this._overlayRef.overlayElement, 'mouseleave'),
                // Курсор на Overlay
                fromEvent(this._overlayRef.overlayElement,
                    'mouseenter')
            )
                .pipe(
                    // Допустим должен скрываться через секунду
                    debounceTime(1000),
                    // Если последним событием было выходом за пределы, и обратно курсор не возвращался, то скрываем Overlay
                    tap((event) => {
                        if (event.type === 'mouseleave') {
                            this._dispatchOverlay();
                            this.subscription?.unsubscribe();
                        }
                    }))
                .subscribe()
            return;
        }
    }
    ngOnDestroy(){
        this.subscription?.unsubscribe()
    }
}
