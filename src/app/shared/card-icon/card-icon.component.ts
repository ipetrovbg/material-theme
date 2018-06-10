import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-card-icon',
  templateUrl: './card-icon.component.html',
  styleUrls: ['./card-icon.component.scss']
})
export class CardIconComponent implements OnInit {

  @Input() icon: string;

  @Input() value: number;

  @Input() message: string;

  constructor() { }

  ngOnInit() {
  }

}
