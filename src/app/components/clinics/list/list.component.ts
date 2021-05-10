import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Clinic } from 'src/app/models/clinic';
import { ClinicService } from 'src/app/services/clinic.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  clinics : Clinic[];
  dataStatus: boolean = false;
  constructor(private clinicService : ClinicService,
    private toastrService : ToastrService) { }

  ngOnInit() {
    this.getClinics();
  }

  getClinics(){
    this.clinicService.getClinics().subscribe((response) => {
      this.clinics = response.data;
      console.log(response);
      if (response.success) {
        this.dataStatus = true;
      }
    });
  }

  delete(clinic:Clinic){
    this.clinicService.getById(clinic.id).subscribe((response) => {
      console.log(response);
      this.clinicService.delete(response.data).subscribe((responseDelete) => {
        this.toastrService.warning("Klinik silindi.");
        setTimeout(() => {
          location.reload();
        }, 500);
      });
    });
  }
}
