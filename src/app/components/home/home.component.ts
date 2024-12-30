import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { IUser } from '../../interfaces/user.interface';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { IProduct } from '../../interfaces/product.interface';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';



@Component({
  selector: 'app-home',
  imports: [MatSelectModule, MatFormFieldModule, MatInputModule, CommonModule, MatCardModule, MatButtonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{
  constructor(private dataService: DataService, private router: Router){}

  allUsers: IUser[] | [] | undefined;
  user: IUser | undefined;
  userId: number = 0 ;
  products: IProduct[] = [];

  ngOnInit(): void {
   this.dataService.getAllUsers().subscribe(users => this.allUsers = users);
  }

  onSelectItem(event: MatSelectChange): void {
    this.userId = event.value;
    this.sendUserIdToService()
    this.dataService.getProdUser().subscribe(data => {
      this.products = data.products;
      this.user = data.user;
      this.setUsers(data.user);
    })

  }

  sendUserIdToService() {
    this.dataService.updateData(this.userId);
  }

  goToAddress() {
    this.router.navigate(['/address']);
  }

  setUsers(user: IUser): void {
    localStorage.setItem('user', JSON.stringify(user));
  }

}
