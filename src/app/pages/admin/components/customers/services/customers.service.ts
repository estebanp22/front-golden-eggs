import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Bill} from '../../sales/services/sales.service';

export interface Customer {
  id: number;
  username: string;
  email: string;
  address?: string;
  phoneNumber?: string;
}

@Injectable({
  providedIn: 'root'
})
export class CustomersService {

  private baseUrl = '/api/v1/users';

  constructor(private http: HttpClient) { }

  getCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(`${this.baseUrl}/getAll`);
  }

  getOrderCountByCustomer(id: number): Observable<number> {
    return this.http.get<number>(`/api/v1/orders/countByCustomer/${id}`);
  }

  getPaysByCustomer(id: number): Observable<Bill[]> {
    return this.http.get<Bill[]>(`/api/v1/bills/byCustomer/${id}`);
  }

  deleteCustomer(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/delete/${id}`);
  }

  addCustomer(customer: Customer): Observable<Customer> {
    return this.http.post<Customer>(`${this.baseUrl}/register`, customer);
  }

  updateCustomer(id: number, customer: Customer): Observable<Customer> {
    return this.http.put<Customer>(`${this.baseUrl}/update/${id}`, customer);
  }
}
