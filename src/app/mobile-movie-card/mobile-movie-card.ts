import { Component, inject, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { environment } from '../../environments/environment';
import { WatchListMovie } from '../models/watchlist';
import { Movies } from '../services/movies';
import { Refresh } from '../services/refresh';
import { ConfirmationDialog } from '../shared/confirmation-dialog/confirmation-dialog';
import { UsersScore } from '../users-score/users-score';

@Component({
  selector: 'app-mobile-movie-card',
  imports: [MatCardModule, UsersScore, MatButtonModule, MatIconModule],
  templateUrl: './mobile-movie-card.html',
  styleUrl: './mobile-movie-card.scss',
})
export class MobileMovieCard {
  @Input({ required: true }) movie!: WatchListMovie;
  imageBaseUrl = environment.imageBaseUrl;
  protected readonly Math = Math;

  private dialog = inject(MatDialog);

  constructor(
    private readonly moviesService: Movies,
    private readonly refreshService: Refresh
  ) {}

  onDeleteClick() {
    const dialogRef = this.dialog.open(ConfirmationDialog, {
      data: {
        title: 'Delete Movie',
        message: `Are you sure you want to delete "${this.movie.title}" from your watchlist?`,
        confirmText: 'Delete',
        cancelText: 'Cancel',
      },
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.moviesService.deleteMovie(this.movie).subscribe({
          next: () => {
            this.refreshService.triggerRefresh();
          },
          error: (err) => {
            console.error('Error deleting movie:', err);
          },
        });
      }
    });
  }
}
