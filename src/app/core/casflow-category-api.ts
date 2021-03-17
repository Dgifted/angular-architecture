import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../models/category';


Injectable({
  providedIn: 'root'
})

export class CashflowCategoryApi {

  readonly API = '/api/cashflowCategories';

  constructor(private httpClient: HttpClient) {}

  getCashflowCategories(): Observable<Category[]> {
    return this.httpClient.get<Category[]>(this.API);
  }

  createCashflowCategory(category: Category): Observable<any> {
    return this.httpClient.post(this.API, category);
  }

  updateCashflowCategory(category: Category): Observable<any> {
    return this.httpClient.put(`${this.API}/${category.id}`, category);
  }
}
