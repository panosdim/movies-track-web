import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterLink } from '@angular/router';
import { Authentication } from '../services/authentication';

@Component({
  selector: 'app-header',
  imports: [MatButtonModule, MatCardModule, MatIconModule, RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  constructor(private authService: Authentication, private router: Router) {}
  onLogout(): void {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }
}
