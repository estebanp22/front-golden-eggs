import { Component, OnInit } from '@angular/core';
import { CustomersService, Customer } from '../sales/services/customers.service';
import {CurrencyPipe, NgFor, NgIf} from '@angular/common';
import { FiltroClientesPipe } from './pipes/filtro-clientes.pipe';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [NgFor, NgIf, FormsModule, FiltroClientesPipe, CurrencyPipe],
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {
  customers: Customer[] = [];
  loading = true;
  errorMessage = '';
  filtro: string = '';
  mostrarDetalle = false;
  clienteSeleccionado: Customer | null = null;
  orders: any[] = [];
  pays: any[] = [];
  allOrders: any[] = [];
  orderCount: number = 0;



  constructor(private customersService: CustomersService) { }

  ngOnInit(): void {
    this.loadCustomers();
  }

  loadCustomers(): void {
    this.loading = true;
    this.customersService.getCustomers().subscribe({
      next: (customers) => {
        this.customers = customers;
        this.loading = false;
      },
      error: (error) => {
        this.errorMessage = 'Error cargando clientes';
        console.error('Hubo un error:', error);
        this.loading = false;
      }
    });
  }


  verDetalle(customer: Customer): void {
    this.clienteSeleccionado = customer;
    this.mostrarDetalle = true;

    this.orders = this.allOrders.filter(order => order.customer_id === customer.id);
    this.customersService.getOrderCountByCustomer(customer.id).subscribe({
      next: (count) => {
        this.orderCount = count;
      },
      error: (err) => {
        console.error('Error obteniendo recuento de órdenes:', err);
        this.orderCount = 0;
      }
    });
  }




  cerrarDetalle() {
    this.mostrarDetalle = false;
    this.clienteSeleccionado = null;
    this.orders = [];
    this.pays = [];
  }


  deleteCustomer(id: number): void {
    if(confirm('¿Estás seguro que quieres eliminar este cliente?')) {
      this.customersService.deleteCustomer(id).subscribe({
        next: () => this.customers = this.customers.filter(c => c.id !== id),
        error: (error) => console.error('Error eliminando cliente:', error)
      });
    }
  }
}
