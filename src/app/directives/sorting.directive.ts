import { Directive, EventEmitter, Input, Output } from '@angular/core';
import { Entity } from '../models/entity';

export type SortColumn = keyof Entity | '';
export type SortDirection = 'asc' | 'desc' | '';
const rotate: { [key: string]: SortDirection } = { 'asc': 'desc', 'desc': '',
 '': 'asc'};


export interface SortEvent {
  column: SortColumn;
  direction: SortDirection;
}


@Directive({
  selector: 'th[sorting]',
  host: {
    '[class.asc]' : 'direction === "asc"',
    '[class.desc]' : 'direction === "desc"',
    '(class)' : 'rotate()'
  }
})
export class SortingDirective {

  @Input() sorting: SortColumn = '';
  @Input() direction: SortDirection = '';
  @Output() sort = new EventEmitter<SortEvent>();
 
  rotate(){
    this.direction = rotate[this.direction];
    this.sort.emit({column: this.sorting, direction: this.direction});
  }
}
