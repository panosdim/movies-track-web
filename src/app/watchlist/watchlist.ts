import { Component, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { environment } from '../../environments/environment';
import { WatchListMovie } from '../models/watchlist';
import { Movies } from '../services/movies';
import { MovieCard } from "../movie-card/movie-card";

@Component({
  selector: 'app-watchlist',
  imports: [MatProgressSpinnerModule, MatCardModule, MovieCard],
  templateUrl: './watchlist.html',
  styleUrl: './watchlist.scss',
})
export class Watchlist {
  readonly watchlist = signal<WatchListMovie[]>([]);
  imageBaseUrl = environment.imageBaseUrl + 'w185';

  constructor(private readonly moviesService: Movies) {
    this.moviesService.getWatchlist().subscribe((movies) => {
      this.watchlist.set(movies);
    });
  }
}
