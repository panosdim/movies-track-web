import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, Observable, of, retry, timer } from 'rxjs';
import { environment } from '../../environments/environment';
import { MovieType } from '../models/movie';

@Injectable({
  providedIn: 'root',
})
export class MoviesSuggestions {
  constructor(private http: HttpClient, private snackBar: MatSnackBar) {}

  getMoviesSuggestions(numMovies: number): Observable<MovieType[]> {
    return this.http
      .get<MovieType[]>(
        environment.suggestionUrl() + `?numOfMovies=${numMovies}`
      )
      .pipe(
        retry({
          count: 4,
          delay: (error, retryCount) => {
            if (error.status !== 503) {
              throw error;
            }
            console.warn(`Retry attempt #${retryCount}`);
            return timer(5000 * retryCount);
          },
        }),
        catchError((err) => {
          console.log(err);
          this.snackBar.open(
            `Error occurred while retrieving movies suggestions`,
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
