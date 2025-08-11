import { Component } from '@angular/core';
import { Header } from '../header/header';
import { MobileToolbar } from '../mobile-toolbar/mobile-toolbar';

@Component({
  selector: 'app-home',
  imports: [Header, MobileToolbar],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  isMobile = window.innerWidth <= 768;
}
