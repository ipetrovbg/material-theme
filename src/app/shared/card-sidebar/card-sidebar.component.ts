import {
  AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, TemplateRef,
  ViewChild
} from '@angular/core';
import { MatSidenav } from '@angular/material';

@Component({
  selector: 'app-card-sidebar',
  templateUrl: './card-sidebar.component.html',
  styleUrls: ['./card-sidebar.component.scss']
})
export class CardSidebarComponent implements OnInit, OnChanges, AfterViewInit {

  @Input() public readonly open: boolean;
  @Input() public readonly sidenav: any;
  @Output() public readonly backDrop: EventEmitter<boolean> = new EventEmitter();

  @ViewChild(MatSidenav) public readonly sidebar: MatSidenav;

  constructor() { }

  ngOnInit() {

  }

  ngAfterViewInit() {
    (this.open) ?
      this.sidebar.open() :
      this.sidebar.close();
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { open } = changes;
    if ( open && open )
      (open.currentValue && this.sidenav) ?
        this.sidebar.open() :
        this.sidebar.close();
  }

}
