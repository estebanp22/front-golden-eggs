import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {RouterLink, RouterLinkActive} from '@angular/router';
import { NgIf } from '@angular/common';
import {AuthService} from '../../core/auth.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  imports: [
    RouterLink,
    RouterLinkActive,
    NgIf
  ],
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{
  showAdmin = false;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.isAdmin$.subscribe((isAdmin) => {
      this.showAdmin = isAdmin;
    });
  }

  @Output() openLogin = new EventEmitter<void>();

  abrirLogin() {
    this.openLogin.emit();
  }
}
