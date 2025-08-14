import { Component, effect, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { environment } from '../../environments/environment';
import { MobileMovieCard } from '../mobile-movie-card/mobile-movie-card';
import { WatchListMovie } from '../models/watchlist';
import { MovieCard } from '../movie-card/movie-card';
import { Movies } from '../services/movies';
import { Refresh } from '../services/refresh';

@Component({
  selector: 'app-watchlist',
  imports: [
    MatProgressSpinnerModule,
    MatCardModule,
    MovieCard,
    MobileMovieCard,
  ],
  templateUrl: './watchlist.html',
  styleUrl: './watchlist.scss',
})
export class Watchlist {
  readonly watchlist = signal<WatchListMovie[]>([]);
  imageBaseUrl = environment.imageBaseUrl + 'w185';
  isMobile = window.innerWidth <= 768;

  fetchData() {
    this.moviesService.getWatchlist().subscribe((movies) => {
      this.watchlist.set(
        movies.sort((a, b) => {
          // Movies with watchInfo (not null) come first
          if (a.watchInfo !== null && b.watchInfo === null) return -1;
          if (a.watchInfo === null && b.watchInfo !== null) return 1;
          return 0;
        })
      );
    });
  }

  constructor(
    private readonly moviesService: Movies,
    private readonly refreshService: Refresh
  ) {
    effect(() => {
      this.refreshService.refreshSignal();
      this.watchlist.set([]);
      this.fetchData();
    });

    // Initial load
    this.fetchData();
  }
}
