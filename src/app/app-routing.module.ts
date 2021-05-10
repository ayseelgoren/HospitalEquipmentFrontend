import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {path: "", loadChildren: ()=> import("./components/clinics/clinics.module").then(x => x.ClinicsModule)},
  {path: "clinics", loadChildren: ()=> import("./components/clinics/clinics.module").then(x => x.ClinicsModule)},
  {path: "equipments", loadChildren: ()=> import("./components/equipments/equipments.module").then(x => x.EquipmentsModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
