import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ResultsType } from '../models/movie';

@Injectable({ providedIn: 'root' })
export class PopularMovies {
  constructor(private http: HttpClient) {}

  getPopularMovies(): Observable<ResultsType> {
    return this.http.get<ResultsType>(environment.popularUrl());
  }
}
