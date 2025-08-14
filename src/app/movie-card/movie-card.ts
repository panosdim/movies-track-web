import { Component, Input, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { environment } from '../../environments/environment';
import { WatchListMovie } from '../models/watchlist';
import { Movies } from '../services/movies';
import { Refresh } from '../services/refresh';
import { ConfirmationDialog } from '../shared/confirmation-dialog/confirmation-dialog';
import { UsersScore } from '../users-score/users-score';

@Component({
  selector: 'app-movie-card',
  imports: [MatCardModule, MatButtonModule, UsersScore, MatDialogModule],
  templateUrl: './movie-card.html',
  styleUrl: './movie-card.scss',
})
export class MovieCard {
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
