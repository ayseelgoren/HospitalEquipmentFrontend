import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddComponent } from './add/add.component';
import { ListComponent } from './list/list.component';
import { RouterModule } from '@angular/router';

import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations"
import { ToastrModule } from 'ngx-toastr';


@NgModule({
  declarations: [AddComponent, ListComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path:"add", component:AddComponent },
      { path:"update/:id", component:AddComponent },
      { path:"list", component:ListComponent },
      { path:"", component:ListComponent },

    ]),
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    ToastrModule.forRoot({
      positionClass: "toastr-bottom-right"
    }),
  
  ]
})
export class EquipmentsModule { }
