import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { PopularMoviesType } from '../models/movie';

@Injectable({ providedIn: 'root' })
export class PopularMovies {
  constructor(private http: HttpClient) {}

  getPopularMovies(): Observable<PopularMoviesType> {
    return this.http.get<PopularMoviesType>(environment.popularUrl());
  }
}
