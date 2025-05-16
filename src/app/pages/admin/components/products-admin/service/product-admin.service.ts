import { Injectable } from '@angular/core';
import {environment} from '../../../../../../enviroments/enviroment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Product} from '../../../../../components/product/services/product.service';



@Injectable({
  providedIn: 'root'
})
export class ProductAdminService {
  private apiUrl = `${environment.apiUrl}/eggs`;

  constructor(private http: HttpClient) {}

  getAllProducts(): Observable<Product[]>{
    return this.http.get<Product[]>(`${this.apiUrl}/getAll`);
  }

  saveProduct(product: Product){
    return this.http.post<Product>(`${this.apiUrl}/save`, product);
  }

  getProductById(id: number){
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }

  deleteProduct(id: number){
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
