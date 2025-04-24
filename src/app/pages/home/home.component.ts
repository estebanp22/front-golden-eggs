import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductosComponent } from '../../components/products/products.component'; // Verifica la ruta

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, ProductosComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {}
