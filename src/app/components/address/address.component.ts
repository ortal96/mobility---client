import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { MatCardModule } from '@angular/material/card'; // כרטיס מידע
import { MatButtonModule } from '@angular/material/button'; // כפתורים
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog'; // דיאלוגים (פופאפ)
import { MatFormFieldModule } from '@angular/material/form-field'; // שדות טופס
import { MatInputModule } from '@angular/material/input'; // שדות קלט
import { ReactiveFormsModule, FormsModule } from '@angular/forms'; // טפסים וולידציה
import { IAddress } from '../../interfaces/address.interface';
import { ActivatedRoute } from '@angular/router';
import { AddressDialogComponent } from '../address-dialog/address-dialog.component';


@Component({
  selector: 'app-address',
  imports: [MatCardModule, MatButtonModule, MatDialogModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, FormsModule],
  templateUrl: './address.component.html',
  styleUrl: './address.component.scss'
})
export class AddressComponent implements OnInit{

  constructor(private route: ActivatedRoute, private dialog: MatDialog, private dataService: DataService){}

  addressDeatails!: IAddress;
  allCities = [];



  ngOnInit(): void {

    this.addressDeatails = this.route.snapshot.data['data'];
    this.dataService.getAllCities()?.subscribe(data => {
      this.allCities = data;
    })

  }

  openEditDialog(){
          this.dialog.open(AddressDialogComponent, {
            width: '800px',
            height: '800px',
            data: { cities: this.allCities, currentAddress: this.addressDeatails}
          }).afterClosed().subscribe(result => {
            this.dataService.getAddress().subscribe(data => this.addressDeatails = data);
          });
  }

}
