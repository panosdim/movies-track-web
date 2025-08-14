import { Component } from '@angular/core';
import { MobileToolbar } from "../mobile-toolbar/mobile-toolbar";
import { Header } from "../header/header";

@Component({
  selector: 'app-add',
  imports: [MobileToolbar, Header],
  templateUrl: './add.html',
  styleUrl: './add.scss',
})
export class Add {
  isMobile = window.innerWidth <= 768;
}
