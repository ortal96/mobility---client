import { Injectable, inject } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';
import { DataService } from '../services/data.service';
import { HttpClient } from '@angular/common/http';




@Injectable({
  providedIn: 'root'
})
export class AddressResolver implements Resolve<any> {


  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {
  }

  private user = inject(DataService).getUser()


  resolve(): Observable<any> {

      const cityId = this.user?.city_id;
      const streetId = this.user?.street_id;

      if(!cityId || !streetId){
        console.error('missing city or street');
        return of()
      }

      return this.http.get<any>(`${this.apiUrl}/address/${cityId}/${streetId}`)
    }

  }



