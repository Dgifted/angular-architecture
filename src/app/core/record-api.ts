import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Record } from '../models/record';


Injectable({
  providedIn: 'root'
})

export class RecordApi {

  readonly API = '/api/records';

  constructor(private httpClient: HttpClient) {}

  getRecords(): Observable<Record[]> {
    return this.httpClient.get<Record[]>(this.API);
  }

  searchRecords(query: string): Observable<Record[]> {
    return this.httpClient.get<Record[]>(`${this.API}?query=${query}`);
  }

}
