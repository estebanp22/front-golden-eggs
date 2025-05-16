import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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

  private baseUrl = '/api/v1/users/getAll';

  constructor(private http: HttpClient) { }

  getCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(this.baseUrl);
  }

  getOrderCountByCustomer(id: number): Observable<number> {
    return this.http.get<number>(`/api/v1/orders/countByCustomer/${id}`);
  }


  getPaysByCustomer(id: number): Observable<any[]> {
    return this.http.get<any[]>(`/api/v1/pays/byCustomer/${id}`);
  }


  deleteCustomer(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  addCustomer(customer: Customer): Observable<Customer> {
    return this.http.post<Customer>(this.baseUrl, customer);
  }

  updateCustomer(id: number, customer: Customer): Observable<Customer> {
    return this.http.put<Customer>(`${this.baseUrl}/${id}`, customer);
  }
}
