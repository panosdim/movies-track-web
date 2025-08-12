import { Component, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { environment } from '../../environments/environment';
import { MovieType } from '../models/movie';
import { MoviesSuggestions } from '../services/suggestions';

@Component({
  selector: 'app-suggestions',
  imports: [
    MatCardModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatButtonModule,
  ],
  templateUrl: './suggestions.html',
  styleUrl: './suggestions.scss',
})
export class Suggestions {
  readonly movies = signal<MovieType[]>([]);
  imageBaseUrl = environment.imageBaseUrl + 'w185';

  constructor(private readonly suggestions: MoviesSuggestions) {
    this.suggestions.getMoviesSuggestions(20).subscribe((movies) => {
      this.movies.set(movies);
    });
  }
}
