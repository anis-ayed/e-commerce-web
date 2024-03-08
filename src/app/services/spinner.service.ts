import { Injectable, signal, WritableSignal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SpinnerService {
  public loading$: WritableSignal<boolean> = signal(false);
  show = () => this.loading$.set(true);
  hide = () => this.loading$.set(false);
}
