import { Component, Inject, OnInit, inject } from '@angular/core';
import { DataService } from '../../services/data.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatOption } from '@angular/material/core';
import { ActivatedRoute } from '@angular/router';
import { MatSelect } from '@angular/material/select';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-address-dialog',
  imports: [MatCardModule, MatButtonModule, MatDialogModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, FormsModule, MatOption, MatSelect, CommonModule],
  templateUrl: './address-dialog.component.html',
  styleUrl: './address-dialog.component.scss'
})
export class AddressDialogComponent  implements OnInit{

  addressForm: FormGroup;
  allCities: { id: number, city_name: string}[];
  streets: any;
  currentAddress: any;
  private user = inject(DataService).getUser()


  constructor(
    private dialogRef: MatDialogRef<AddressDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { cities: { id: number, city_name: string}[], currentAddress: any },
    private dataService : DataService,
    private route: ActivatedRoute,
    private fb: FormBuilder,

   ){

      this.allCities = data.cities;
      this.currentAddress = data.currentAddress;
      this.addressForm = this.fb.group({
        city: [+this.user!.city_id, [Validators.required]],
        street: [+this.user!.street_id, [Validators.required]],
      });
    }



  ngOnInit(): void {
    this.dataService.updataCityId(+this.user!.city_id);
    this.getStreets();

  }

  getStreetsOnChange(cityId : number){
    this.dataService.updataCityId(cityId);
    this.addressForm.get('street')?.reset();
    this.getStreets();
  }

  getStreets(){
    this.dataService.getStreets()?.subscribe(data => {
    this.streets = data

    })
  }

    onSubmit(): void {
      const id = this.user!.id;
      const city_id = this.addressForm.get('city')?.value;
      const street_id = this.addressForm.get('street')?.value;
      const number = '10';

      this.dataService.editAddress(id, city_id, street_id, number)
        .subscribe(
          response => {
            localStorage.setItem('user', JSON.stringify(response.user));
            this.dialogRef.close();
          },
          error => {
            console.error('error', error);
          }
        );

    }

    close(): void {
      this.dialogRef.close();
    }


}
