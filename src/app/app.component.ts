import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {SelectComponent} from "./components/select/select.component";
import {OptionComponent} from "./components/select/option/option.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SelectComponent, OptionComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'overlayStand';
}
