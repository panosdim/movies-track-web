import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { environment } from '../../environments/environment';
import { WatchListMovie } from '../models/watchlist';
import { UsersScore } from '../users-score/users-score';

@Component({
  selector: 'app-movie-card',
  imports: [MatCardModule, MatButtonModule, UsersScore],
  templateUrl: './movie-card.html',
  styleUrl: './movie-card.scss',
})
export class MovieCard {
  @Input({ required: true }) movie!: WatchListMovie;
  imageBaseUrl = environment.imageBaseUrl + 'w300';
  protected readonly Math = Math;
}
