import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, map, Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { MovieType, ResultsType } from '../models/movie';

@Injectable({
  providedIn: 'root',
})
export class MoviesSearch {
  constructor(private http: HttpClient, private snackBar: MatSnackBar) {}

  searchMovies(term: string): Observable<MovieType[]> {
    return this.http
      .post<ResultsType>(environment.searchUrl(), {
        term: term,
      })
      .pipe(
        map((res) => {
          return res.results;
        })
      )
      .pipe(
        catchError((err) => {
          console.log(err);
          this.snackBar.open(
            `Error occurred while searching for movies`,
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
