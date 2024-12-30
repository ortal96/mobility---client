import { Router, Routes } from '@angular/router';
import { AddressComponent } from './components/address/address.component';
import { HomeComponent } from './components/home/home.component';
import { DataService } from './services/data.service';
import { inject } from '@angular/core';
import { AddressResolver } from './resolves/address.resolver';
import { AddressDialogComponent } from './components/address-dialog/address-dialog.component';
import { CitiesResolver } from './resolves/cities.resolver';

function isUserGuard(): boolean {
  const isUser = inject(DataService).getUser()
  if (!isUser) {
    inject(Router).navigate(['/home']);
    return false;
  }
  return true
}

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'address', component: AddressComponent, canActivate: [isUserGuard], resolve: {data: AddressResolver} },
  { path: 'home', component: HomeComponent },
];

