import { Component, EventEmitter, Output } from '@angular/core';
import {RouterLink, RouterLinkActive} from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  imports: [
    RouterLink,
    RouterLinkActive
  ],
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  @Output() openLogin = new EventEmitter<void>();

  abrirLogin() {
    this.openLogin.emit();
  }
}
