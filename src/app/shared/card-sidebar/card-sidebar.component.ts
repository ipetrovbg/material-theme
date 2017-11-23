import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material';

@Component({
  selector: 'app-card-sidebar',
  templateUrl: './card-sidebar.component.html',
  styleUrls: ['./card-sidebar.component.scss']
})
export class CardSidebarComponent implements OnInit, OnChanges {

  @Input('open') public readonly open: boolean;
  @Output('backDrop') public readonly backDrop: EventEmitter<boolean> = new EventEmitter();

  @ViewChild(MatSidenav) public readonly sidebar;

  constructor() { }

  ngOnInit() {
    (this.open) ?
      this.sidebar.open() :
      this.sidebar.close();
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { open } = changes;
    if ( open && open )
      (open.currentValue) ?
        this.sidebar.open() :
        this.sidebar.close();
  }

}
