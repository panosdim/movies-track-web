import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Header } from '../header/header';
import { MobileToolbar } from '../mobile-toolbar/mobile-toolbar';

@Component({
  selector: 'app-watched',
  imports: [CommonModule, Header, MobileToolbar],
  templateUrl: './watched.html',
  styleUrl: './watched.scss',
})
export class Watched {
  isMobile = window.innerWidth <= 768;
}
