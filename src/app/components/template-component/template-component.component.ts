import {Component, Input, signal} from '@angular/core';
import {NgIf} from "@angular/common";

@Component({
    selector: 'app-template-component',
    standalone: true,
    imports: [
        NgIf
    ],
    templateUrl: './template-component.component.html',
    styleUrl: './template-component.component.scss'
})
export class TemplateComponentComponent {
    private _template = signal('');
    visible = signal(false);

    get template() {
        return this._template();
    }

    @Input() set template(value: string) {
        this._template.set(value);
    }
}
