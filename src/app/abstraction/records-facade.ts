import { RecordApi } from './../core/record-api';
import { Observable } from 'rxjs';
// import { map, shareReplay } from 'rxjs/Operator';
import { Injectable } from '@angular/core';
import { Record } from '../models/record';

Injectable({
  providedIn: 'root'
})

export class RecordsFacade {

  private records$: Observable<Record[]>;

  constructor(private recordApi: RecordApi) {
    this.records$ = this.recordApi.getRecords()
    .pipe(shareReplay(1));
  }

  getRecords() {
    return this.records$;
  }

  getRecordsFromPeriod(period?: any): Observable<Record[]> {
    return this.records$
      .pipe(map(records => records.filter(record => record.inPeriod(period))));
  }

  searchRecords(search: string): Observable<Record[]> {
    return this.recordApi.searchRecords(search);
  }
}
