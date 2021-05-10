import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Clinic } from 'src/app/models/clinic';
import { ClinicService } from 'src/app/services/clinic.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  clinicForm: FormGroup;
  clinicId = -1;
  clinic : Clinic;

  constructor(
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private clinicService : ClinicService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['id']) {
        this.clinicId = params['id'];
        this.getByClinic();
      } else {
        this.createClinicForm();
      }
    });
  }

  createClinicForm() {
    this.clinicForm = this.formBuilder.group({
      name: ['', Validators.required],
    });
  }

  add() {
    if (this.clinicForm.valid) {
      console.log(this.clinicForm.value);
      let clinicModel = Object.assign({}, this.clinicForm.value);
      console.log(clinicModel);
       if (this.clinicId === -1) {
        this.clinicService.add(clinicModel).subscribe(
          (response) => {
            this.toastrService.success(response.message, 'Başarılı');
            setTimeout(() => {
              this.router.navigate(['/clinics/list']);
            }, 100);
          },
          (errorResponse) => {
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
        clinicModel.id = Number(this.clinicId);
        this.clinicService.update(clinicModel).subscribe(
          (response) => {
            this.toastrService.success(response.message, 'Başarılı');
            setTimeout(() => {
              this.router.navigate(['/clinics/list']);
            }, 100);
          },
          (errorResponse) => {
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
      this.toastrService.error('Formunuz eksik', 'Dikkat');
    }
  }

  getByClinic() {
    this.clinicService.getById(this.clinicId).subscribe(
      (response) => {
        this.clinic = response.data;
        if (response.success) {
          this.clinicForm = this.formBuilder.group({
            name: [this.clinic.name, Validators.required],
          });
        } else {
          this.createClinicForm();
        }
      },
      (errorResponse) => {
        console.log(errorResponse)
        this.toastrService.error('Bir hata meydana geldi.', 'Dikkat');
      }
    );
  }
}
