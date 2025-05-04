import { Component } from '@angular/core';
import {SidebarComponent} from '../../components/sidebar/sidebar.component';
import {NavbarComponent} from '../../components/navbar/navbar.component';
import {RouterOutlet} from '@angular/router';
import {FooterComponent} from '../../components/footer/footer.component';

@Component({
  selector: 'app-admin',
  imports: [
    SidebarComponent,
    RouterOutlet,

  ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {
  areaSeleccionada = 'Dashboard';  // Área por defecto

  mostrarArea(area: string): void {
    this.areaSeleccionada = area;
  }
}
