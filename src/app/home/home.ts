import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { Header } from '../header/header';
import { MobileToolbar } from '../mobile-toolbar/mobile-toolbar';
import { Suggestions } from '../suggestions/suggestions';
import { Watchlist } from '../watchlist/watchlist';

@Component({
  selector: 'app-home',
  imports: [
    Header,
    MobileToolbar,
    Suggestions,
    Watchlist,
    MatIconModule,
    MatButtonModule,
    RouterLink,
  ],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  isMobile = window.innerWidth <= 768;
}
