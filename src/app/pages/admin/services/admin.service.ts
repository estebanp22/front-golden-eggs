import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../enviroments/enviroment.prod';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private api = environment.apiUrl;

  constructor(private http: HttpClient) {}

  registerVisit() {
    return this.http.post(`${this.api}/visit`, {}).subscribe();
  }

  getVisitCount() {
    return this.http.get<number>(`${this.api}/visit/count`);
  }
}
