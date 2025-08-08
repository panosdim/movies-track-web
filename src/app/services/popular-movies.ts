import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { PopularMoviesType } from '../models/movie';

@Injectable({ providedIn: 'root' })
export class PopularMovies {
  constructor(private http: HttpClient) {}

  getPopularMovies() {
    return this.http.get<PopularMoviesType>(environment.popularUrl());
  }
}
