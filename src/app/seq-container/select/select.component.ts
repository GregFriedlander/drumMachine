import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  TemplateRef,
  ViewChild
} from '@angular/core';
import * as Nexus from '../../../assets/NexusUI.js';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent implements OnInit, AfterViewInit {
  @ViewChild('select', { static: false }) select: TemplateRef<any>;
  @Input() id: string;
  @Input() options: string[];
  @Input() value: string;
  @Output() change = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  ngAfterViewInit(): void {
    const comp = this;

    const newSelect = new Nexus.Select(this.id, {
      options: this.options,
    });

    this.select = newSelect;

    newSelect.on('change', (value?: any) => {
      console.log('select value: ', value);
      comp.change.emit(value.value);
    });
  }
}
