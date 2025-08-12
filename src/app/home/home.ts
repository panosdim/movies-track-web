import { Component } from '@angular/core';
import { Header } from '../header/header';
import { MobileToolbar } from '../mobile-toolbar/mobile-toolbar';
import { Suggestions } from '../suggestions/suggestions';
import { Watchlist } from '../watchlist/watchlist';

@Component({
  selector: 'app-home',
  imports: [Header, MobileToolbar, Suggestions, Watchlist],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  isMobile = window.innerWidth <= 768;
}
