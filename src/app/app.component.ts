import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component'; // <-- importa tu login

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, LoginComponent], // <-- lo agregas aquí
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  showLogin = false;

  openLoginModal() {
    this.showLogin = true;
  }

  closeLoginModal() {
    this.showLogin = false;
  }
}
