import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { environment } from '../../environments/environment';
import { WatchListMovie } from '../models/watchlist';
import { UsersScore } from '../users-score/users-score';
import { MatIconModule } from "@angular/material/icon";

@Component({
  selector: 'app-mobile-movie-card',
  imports: [MatCardModule, UsersScore, MatButtonModule, MatIconModule],
  templateUrl: './mobile-movie-card.html',
  styleUrl: './mobile-movie-card.scss',
})
export class MobileMovieCard {
  @Input({ required: true }) movie!: WatchListMovie;
  imageBaseUrl = environment.imageBaseUrl;
  protected readonly Math = Math;
}
