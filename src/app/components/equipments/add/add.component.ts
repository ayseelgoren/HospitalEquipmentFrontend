import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Clinic } from 'src/app/models/clinic';
import { Equipment } from 'src/app/models/equipment';
import { ClinicService } from 'src/app/services/clinic.service';
import { EquipmentService } from 'src/app/services/equipment.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  equipmentForm : FormGroup;
  equipment: Equipment;
  equipmentId = -1;
  clinics: Clinic[] = [];
  
  constructor(
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private clinicService: ClinicService,
    private equipmentService: EquipmentService,
  ) { }

  ngOnInit() {
    this.getClinics();
    this.activatedRoute.params.subscribe((params) => {
      if (params['id']) {
        this.equipmentId = params['id'];
        this.bringEquiment();
      } else {
        this.createEquipmentForm();
      }
    });
  }

  createEquipmentForm(){
      this.equipmentForm = this.formBuilder.group({
        name: ['', Validators.required],
        procurementDate: [''],
        piece: ['', [Validators.required,Validators.min(1)]],
        unitPrice: ['', [Validators.required,Validators.min(0.01)]],
        usageRate: ['', [Validators.min(0.0),Validators.max(100.0)]],
        clinicId: ['', Validators.required],
      });
    
  }

  getClinics(){
    this.clinicService.getClinics().subscribe((response) => {
      this.clinics = response.data;
    });
  }

  bringEquiment(){
    this.equipmentService.getById(this.equipmentId).subscribe(
      (response) => {
        this.equipment = response.data;
        if (response.success) {
          this.equipmentForm = this.formBuilder.group({
            name: [this.equipment.name, Validators.required],
            procurementDate: [this.equipment.procurementDate ],
            piece: [this.equipment.piece, [Validators.required,Validators.min(1)]],
            unitPrice: [this.equipment.unitPrice,[Validators.required,Validators.min(0.01)]],
            usageRate: [this.equipment.usageRate, [Validators.min(0.0),Validators.max(100.0)]],
            clinicId: [this.equipment.clinicId, Validators.required],
          });
        } else {
          this.createEquipmentForm();
        }
      },
      (errorResponse) => {
        this.toastrService.error('Bir hata meydana geldi.', 'Dikkat');
      }
    );
  }

  add() {
    if (this.equipmentForm.valid) {
      let equipmentModel = Object.assign({}, this.equipmentForm.value);
      equipmentModel.clinicId = Number(equipmentModel.clinicId);
      equipmentModel.piece = Number(equipmentModel.piece);
      equipmentModel.usageRate = Number(equipmentModel.usageRate);
      equipmentModel.unitPrice = Number(equipmentModel.unitPrice);
      //console.log(carModel);
      if (this.equipmentId === -1) {
        this.equipmentService.add(equipmentModel).subscribe(
          (response) => {
            this.toastrService.success(response.message, 'Başarılı');
            setTimeout(() => {
              this.router.navigate(['/equipments/list']);
            }, 2000);
          },
          (errorResponse) => {
            console.log(errorResponse);
            if (errorResponse.error.Errors.length > 0) {
              for (let i = 0; i < errorResponse.error.Errors.length; i++) {
                this.toastrService.error(
                  errorResponse.error.Errors[i].ErrorMessage,
                  'Doğrulama hatası'
                );
              }
            }
          }
        );
      } else {
        equipmentModel.id = Number(this.equipmentId);
        this.equipmentService.update(equipmentModel).subscribe(
          (response) => {
            this.toastrService.success(response.message, 'Başarılı');
            setTimeout(() => {
              this.router.navigate(['/equipments/list']);
            }, 2000);
          },
          (errorResponse) => {
           console.log(errorResponse);
           if (errorResponse.error.Errors.length > 0) {
            for (let i = 0; i < errorResponse.error.Errors.length; i++) {
              this.toastrService.error(
                errorResponse.error.Errors[i].ErrorMessage,
                'Doğrulama hatası'
              );
            }
          }
          }
        );
      }
    } else {
      this.toastrService.error('Formunuz eksik ', 'Dikkat');
    }
  }

}
