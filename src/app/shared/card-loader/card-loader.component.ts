import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

export type CardLoaderMode = 'query' | 'determinate' | 'indeterminate' | 'buffer';

@Component({
  selector: 'app-card-loader',
  templateUrl: './card-loader.component.html',
  styleUrls: ['./card-loader.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardLoaderComponent implements OnInit {
  @Input() public readonly color: string;
  @Input() public readonly mode: CardLoaderMode;
  @Input() public readonly bufferValue: number;
  @Input() public readonly value: number;
  constructor() { }

  ngOnInit() { }

}
