import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, catchError, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { WatchListMovie } from '../models/watchlist';

@Injectable({
  providedIn: 'root',
})
export class Movies {
  constructor(private http: HttpClient, private snackBar: MatSnackBar) {}

  getWatchedMovies(): Observable<WatchListMovie[]> {
    return this.http.get<WatchListMovie[]>(environment.watchedMoviesUrl()).pipe(
      catchError((err) => {
        console.log(err);
        this.snackBar.open(
          'Error occurred while retrieving watched movies list',
          'Close',
          {
            duration: 4000,
          }
        );
        return of([]);
      })
    );
  }

  getWatchlist(): Observable<WatchListMovie[]> {
    return this.http.get<WatchListMovie[]>(environment.watchlistUrl()).pipe(
      catchError((err) => {
        console.error('Error loading watchlist:', err);
        this.snackBar.open(
          `Error occurred while retrieving movies watch list`,
          'Close',
          {
            duration: 4000,
          }
        );
        return of([]);
      })
    );
  }
}
