import { Entity } from "./entity";

export interface Equipment extends Entity {
    id : number;
    name : string;
    procurementDate : Date;
    piece : number;
    unitPrice : number;
    usageRate : number;
    clinicId : number;
}