import { AfterViewInit, Component, EventEmitter, OnInit, Output } from '@angular/core';
import * as Tone from 'tone';

@Component({
  selector: 'app-synth',
  templateUrl: './synth.component.html',
  styleUrls: ['./synth.component.scss']
})
export class SynthComponent implements OnInit, AfterViewInit {

  @Output() newSynth = new EventEmitter();
  public synth: any;

  constructor() {
    this.synth = new Tone.Synth();
    this.synth.toMaster();
  }

  ngOnInit() {}

  ngAfterViewInit(): void {
    const comp = this;

    comp.newSynth.emit(this.synth);

  }

}
