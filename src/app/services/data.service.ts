import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { IUser } from '../interfaces/user.interface';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  private apiUrl = 'http://localhost:3000/api';
  private userIdSubject = new BehaviorSubject<any>(null);
  private cityIdSubject = new BehaviorSubject<any>(null);
  cityId$ = this.userIdSubject.asObservable();
  userId$ = this.userIdSubject.asObservable();
  cityId: number = 0;
  userId: Number = 1;



  constructor(private http: HttpClient) { }

  updateData(data: any) {
    this.userIdSubject.next(data);
    this.userId = data;
  }

  updataCityId(data: any){
    this.cityIdSubject.next(data);
    this.cityId = data;
  }

  getAllUsers(): Observable<IUser[]> {
    return this.http.get<any>(`${this.apiUrl}/users`);

  }

  getProdUser(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/user/${this.userId}`)
  }

  getUser(): IUser | null {
    try {
      const user = localStorage.getItem('user');
      return user ? JSON.parse(user) : null;
    } catch (e) {
      console.warn('localStorage is not available', e);
      return null;
    }
  }


  getAddress(): Observable<any> {
    const cityId = this.getUser()?.city_id;
    const streetId = this.getUser()?.street_id;

    if(!cityId || !streetId){
      console.error('missing city or street');
      return of()
    }

    return this.http.get<any>(`${this.apiUrl}/address/${cityId}/${streetId}`)
  }

  getAllCities(): Observable<any> | undefined {
    return this.http.get<any>(`${this.apiUrl}/cities`)
  }

  getStreets() : Observable<any> | undefined {
    return this.http.get<any>(`${this.apiUrl}/street/${this.cityId}`)
  }

  editAddress(id: number, city_id: number, street_id: number, number: string): Observable<any> {
    const body = {
      id,
      city_id,
      street_id,
      number
    };

    return this.http.post(`${this.apiUrl}/edit_address`, body);
  }
}


