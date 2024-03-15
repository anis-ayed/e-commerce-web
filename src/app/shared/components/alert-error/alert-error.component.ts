import { Component, input, InputSignal } from '@angular/core';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-alert-error',
  standalone: true,
  imports: [MatIcon],
  templateUrl: './alert-error.component.html',
  styleUrl: './alert-error.component.scss',
})
export class AlertErrorComponent {
  message: InputSignal<string> = input.required();
}
