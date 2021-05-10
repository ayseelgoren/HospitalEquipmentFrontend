import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Equipment } from 'src/app/models/equipment';
import { EquipmentService } from 'src/app/services/equipment.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  equipments : Equipment[];
  dataStatus: boolean = false;
  constructor(private equipmentService : EquipmentService,
    private toastrService : ToastrService) { }

  ngOnInit() {
    this.getEquipments();
  }

  getEquipments(){
    this.equipmentService.getEquipments().subscribe((response) => {
      this.equipments = response.data;
      console.log(response);
      if (response.success) {
        this.dataStatus = true;
      }
    });
  }

  delete(equipment:Equipment){
    this.equipmentService.getById(equipment.id).subscribe((response) => {
      this.equipmentService.delete(response.data).subscribe((responseDelete) => {
        this.toastrService.warning("Ekipman silindi.");
        setTimeout(() => {
          location.reload();
        }, 500);
      });
    });
  }
}
