import { Component, inject, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { ClickEvent, StarRatingModule } from 'angular-star-rating';
import { environment } from '../../environments/environment.prod';
import { WatchListMovie } from '../models/watchlist';
import { Movies } from '../services/movies';
import { Refresh } from '../services/refresh';
import { ConfirmationDialog } from '../shared/confirmation-dialog/confirmation-dialog';

@Component({
  selector: 'app-watched-movie-card',
  imports: [MatCardModule, MatButtonModule, StarRatingModule],
  templateUrl: './watched-movie-card.html',
  styleUrl: './watched-movie-card.scss',
})
export class WatchedMovieCard {
  @Input({ required: true }) movie!: WatchListMovie;
  private readonly dialog = inject(MatDialog);
  isMobile = window.innerWidth <= 768;
  imageBaseUrl = environment.imageBaseUrl;

  constructor(
    private readonly moviesService: Movies,
    private readonly refreshService: Refresh
  ) {}

  onDeleteClick() {
    const dialogRef = this.dialog.open(ConfirmationDialog, {
      data: {
        title: 'Delete Movie',
        message: `Are you sure you want to delete "${this.movie.title}" from your watched movies?`,
        confirmText: 'Delete',
        cancelText: 'Cancel',
      },
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.moviesService.deleteMovie(this.movie).subscribe(() => {
          this.refreshService.triggerRefresh();
        });
      }
    });
  }

  onRateChange(rating: ClickEvent) {
    this.moviesService.rateMovie(this.movie, rating.rating).subscribe();
  }
}
