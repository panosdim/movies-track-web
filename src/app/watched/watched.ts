import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Header } from '../header/header';
import { MobileToolbar } from '../mobile-toolbar/mobile-toolbar';
import { WatchListMovie } from '../models/watchlist';
import { Movies } from '../services/movies';
import { WatchedMovieCard } from '../watched-movie-card/watched-movie-card';

@Component({
  selector: 'app-watched',
  imports: [
    CommonModule,
    Header,
    MobileToolbar,
    MatProgressSpinnerModule,
    WatchedMovieCard,
  ],
  templateUrl: './watched.html',
  styleUrl: './watched.scss',
})
export class Watched {
  isMobile = window.innerWidth <= 768;
  readonly watched = signal<WatchListMovie[]>([]);

  constructor(private readonly moviesService: Movies) {
    this.moviesService.getWatchedMovies().subscribe((movies) => {
      this.watched.set(
        movies.sort((a, b) => {
          // Movies with no rating comes first
          if (a.rating !== null && b.rating === null) return 1;
          if (a.rating === null && b.rating !== null) return -1;
          return 0;
        })
      );
    });
  }
}
