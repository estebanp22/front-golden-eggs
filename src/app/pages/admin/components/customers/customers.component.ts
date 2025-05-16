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
  currentPage: number = 1;
  itemsPerPage: number = 10;



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

    this.customersService.getOrderCountByCustomer(customer.id).subscribe({
      next: (count) => {
        this.orderCount = count;
      },
      error: (err) => {
        console.error('Error obteniendo recuento de órdenes:', err);
        this.orderCount = 0;
      }
    });
    this.customersService.getPaysByCustomer(customer.id).subscribe({
      next: (bills) => {
        this.pays = bills;
      },
      error: (err) => {
        console.error('Error obteniendo pagos:', err);
        this.pays = [];
      }
    });
  }
  get filteredCustomers(): Customer[] {
    return this.customers.filter(c =>
      c.username?.toLowerCase().includes(this.filtro.toLowerCase()) ||
      c.email?.toLowerCase().includes(this.filtro.toLowerCase()) ||
      c.address?.toLowerCase().includes(this.filtro.toLowerCase()) ||
      c.phoneNumber?.toLowerCase().includes(this.filtro.toLowerCase())
    );
  }

  get paginatedCustomers(): Customer[] {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredCustomers.slice(start, start + this.itemsPerPage);
  }

  get totalPages(): number {
    return Math.ceil(this.filteredCustomers.length / this.itemsPerPage);
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
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
