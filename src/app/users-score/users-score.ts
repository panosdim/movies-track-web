import { Component, Input } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-users-score',
  imports: [MatProgressBarModule],
  templateUrl: './users-score.html',
  styleUrl: './users-score.scss',
})
export class UsersScore {
  @Input() score: number = 0; // 0 to 100
}
