import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card-toolbar',
  templateUrl: './card-toolbar.component.html',
  styleUrls: ['./card-toolbar.component.scss']
})
export class CardToolbarComponent implements OnInit {
  @Input() public readonly color: string;
  @Input() public readonly title: string;
  constructor() { }

  ngOnInit() {
  }

}
