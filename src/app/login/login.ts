import { Component, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { MovieType } from '../models/movie';
import { User } from '../models/user';
import { Authentication } from '../services/authentication';
import { PopularMovies } from '../services/popular-movies';

@Component({
  selector: 'app-login',
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './login.html',
  styleUrl: './login.scss',
  providers: [PopularMovies],
})
export class Login implements OnInit {
  loginForm: FormGroup;
  hide = true;
  posters = signal<MovieType[]>([]);
  imageBaseUrl = environment.imageBaseUrl + 'w500';
  // loginError signal removed, snackbar will be used

  constructor(
    private fb: FormBuilder,
    private popularService: PopularMovies,
    private authService: Authentication,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.popularService.getPopularMovies().subscribe((data) => {
      this.posters.set(data.results);
    });
  }

  onLogin() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.authService
        .login(email, password)
        .subscribe((user: User | null | undefined) => {
          if (user != undefined) {
            this.router.navigate(['home']);
          } else {
            if (user === null) {
              this.snackBar.open(
                'Login failed: Invalid email or password.',
                'Close',
                {
                  duration: 4000,
                }
              );
            } else {
              this.snackBar.open(
                'Login failed: An unexpected error occurred.',
                'Close',
                {
                  duration: 4000,
                }
              );
            }
          }
        });
    }
  }
}
