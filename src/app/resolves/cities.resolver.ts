import { Injectable, inject } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';
import { DataService } from '../services/data.service';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class CitiesResolver implements Resolve<any> {


  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {
  }


  resolve(): Observable<any> {

    return this.http.get<any>(`${this.apiUrl}/cities`)    }

  }



