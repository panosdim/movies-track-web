import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Refresh {
  refreshSignal = signal<number>(0);

  triggerRefresh() {
    // Increment the value to notify listeners
    this.refreshSignal.update((v) => v + 1);
  }
}
