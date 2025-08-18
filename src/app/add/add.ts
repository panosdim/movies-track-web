import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { Header } from '../header/header';
import { MobileToolbar } from '../mobile-toolbar/mobile-toolbar';
import { WatchListMovie } from '../models/watchlist';
import { Movies } from '../services/movies';
import { Refresh } from '../services/refresh';
import { MoviesSearch } from '../services/search';
import { UsersScore } from '../users-score/users-score';
import { MovieType } from './../models/movie';

@Component({
  selector: 'app-add',
  imports: [
    MobileToolbar,
    Header,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    UsersScore,
  ],
  templateUrl: './add.html',
  styleUrl: './add.scss',
})
export class Add {
  isMobile = window.innerWidth <= 768;
  imageBaseUrl = environment.imageBaseUrl;

  searchTerm = '';
  searchResults = signal<MovieType[]>([]);
  watchlist = signal<WatchListMovie[]>([]);
  watched = signal<WatchListMovie[]>([]);
  protected readonly Math = Math;

  constructor(
    private readonly searchService: MoviesSearch,
    private readonly moviesService: Movies,
    private readonly refreshService: Refresh,
    private readonly router: Router
  ) {
    this.moviesService.getWatchlist().subscribe((movies) => {
      this.watchlist.set(movies);
    });
    this.moviesService.getWatchedMovies().subscribe((movies) => {
      this.watched.set(movies);
    });
  }

  onValueChange(newValue: string): void {
    if (newValue.length > 3) {
      this.searchService
        .searchMovies(newValue)
        .subscribe((searchResults: MovieType[]) => {
          this.searchResults.set(searchResults);
        });
    }
    if (newValue.length == 0) {
      this.searchResults.set([]);
    }
  }

  onClearSearchTerm(): void {
    this.searchTerm = '';
    this.searchResults.set([]);
  }

  isMovieAlreadyInWatchList(movieId: number): boolean {
    return (
      this.watchlist().some(
        (movie: WatchListMovie) => movie.movieId === movieId
      ) ||
      this.watched().some((movie: WatchListMovie) => movie.movieId === movieId)
    );
  }

  addMovieToWatchList(movie: MovieType) {
    this.moviesService.addToWatchList(movie).subscribe(() => {
      this.refreshService.triggerRefresh();
      this.router.navigateByUrl('/home');
    });
  }
}
