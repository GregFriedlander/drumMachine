import { DOCUMENT } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy, ChangeDetectorRef,
  Component,
  ElementRef,
  Inject,
  NgZone,
  OnChanges,
  OnInit,
  Renderer2,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import * as _ from 'lodash';
import * as Tone from 'tone';
import * as Nexus from '../../assets/NexusUI.js';

@Component({
  selector: 'app-seq-container',
  templateUrl: './seq-container.component.html',
  styleUrls: ['./seq-container.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SeqContainerComponent implements OnInit, AfterViewInit {
  @ViewChild('container', { static: false }) container: ElementRef;
  @ViewChild('button', { static: false }) button: ElementRef;


  public synth: any;
  public boxes: boolean[];
  public boxes2: boolean[];
  public boxes3: boolean[];
  public isPlaying = false;
  public currentPeriod = 4;
  public noteLengths = ['64n', '32n', '16n', '8n', '4n'];
  public notes = ['E4', 'G3'];
  public pulse = false;
  public loop;
  public activeBox = 0;
  public bpm;
  hitStop = false;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private zone: NgZone,
    private renderer: Renderer2,
    private el: ElementRef,
    private cdRef: ChangeDetectorRef
  ) {
    this.synth = new Tone.Synth();
    this.configureSequence();
    this.synth.toMaster();
    Tone.Transport.start();
    Tone.context.latencyHint = 'fastest';
    Tone.context.lookAhead = 0.01;
  }

  ngOnInit() {
    this.boxes = _.fill(_.range(16), false);
    this.boxes2 = _.fill(_.range(16), false);
    this.boxes3 = _.fill(_.range(16), false);
    // Tone.Transport.bpm.value = 50;
    this.bpm = Tone.Transport.bpm.value;

    // const newbutton = new Nexus.Dial('button');
    // this.button = newbutton;
  }

  ngAfterViewInit(): void {

    // Tone.Transport.bpm.value = 50;
    // this.bpm = Tone.Transport.bpm.value;

    const newbutton = new Nexus.Dial('button', {
      min: 50,
      max: 200,
      step: 1,
      value: 85
    } );

    newbutton.on('change', function(value?: any) {
      // comp.signal.setValueAtTime(value, 0.1);
      // comp.change.emit(value);
      console.log('value: ', value);
      Tone.Transport.bpm.value = value;
    });
    this.button = newbutton;
    this.bpm = Tone.Transport.bpm.value;
    this.cdRef.detectChanges();

    // this.cdRef.detectChanges();
  }

  private configureSequence() {
    let wasPlaying = false;
    if (this.loop) {
      wasPlaying = this.loop.state === 'started';
      this.loop.dispose();
    }
    this.loop = new Tone.Sequence(
      (time, i) => {
        if (this.hitStop === true) {
          i = 0;
          this.hitStop = false;
        }
        const step = i % 16;
        if (this.boxes[step]) {
          this.synth.triggerAttackRelease(
            'E4',
            this.noteLengths[this.currentPeriod],
            time
          );
        }
        if (this.boxes2[step]) {
          this.synth.triggerAttackRelease(
            'G3',
            this.noteLengths[this.currentPeriod],
            time
          );
        }
        if (this.boxes3[step]) {
          this.synth.triggerAttackRelease(
            'A2',
            this.noteLengths[this.currentPeriod],
            time
          );
        }
        Tone.Draw.schedule(() => {
          this.activeBox = i;
          this.zone.run(() => (this.pulse = !this.pulse));
        }, time);
      },
      _.range(16),
      this.noteLengths[2]
    );
    if (wasPlaying) {
      this.pulse = false;
      this.loop.start();
    }
  }

  public activateStep(i, n: number) {
    if (n === 1) {
      this.boxes[i] = !this.boxes[i];
    } else if (n === 2) {
      this.boxes2[i] = !this.boxes2[i];
    } else if (n === 3) {
      this.boxes3[i] = !this.boxes3[i];
    }
  }

  public play() {
    this.loop.start();
    this.pulse = true;
    this.isPlaying = true;
  }

  public stop() {
    this.loop.stop();
    this.pulse = false;
    this.isPlaying = false;
    this.hitStop = true;
  }

  public reset() {
    for (let x = 0; x < this.boxes2.length; x++) {
      this.boxes[x] = false;
      this.boxes2[x] = false;
      this.boxes3[x] = false;
    }
    this.activeBox = 0;
  }

  // get bpm() {
  //   return Tone.Transport.bpm.value;
  // }
}
