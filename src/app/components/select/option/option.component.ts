import {Component, ContentChild, TemplateRef} from '@angular/core';

@Component({
  selector: 'app-option',
  standalone: true,
  imports: [],
  templateUrl: './option.component.html',
  styleUrl: './option.component.scss'
})
export class OptionComponent {
@ContentChild(TemplateRef) template!: TemplateRef<any>
}
