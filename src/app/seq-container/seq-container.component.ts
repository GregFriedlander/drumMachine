import { DOCUMENT } from '@angular/common';
import { AfterViewInit, Component, ElementRef, Inject, NgZone, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import * as _ from 'lodash';
import * as Tone from 'tone';

@Component({
  selector: 'app-seq-container',
  templateUrl: './seq-container.component.html',
  styleUrls: ['./seq-container.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SeqContainerComponent implements OnInit, AfterViewInit {
  @ViewChild('container') container: ElementRef;
  @ViewChild('button') button: ElementRef;
  // @ViewChild('synthTest', {static: false}) synthTest;

  synthTest;
  public synth: any;
  public sampler1: any;
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
  ) {
    this.synth = new Tone.Synth();
    this.sampler1 = new Tone.Sampler({
      C3 : '../../assets/temp-audio/indst_kick_4.wav',
      D3 : '../../assets/temp-audio/hip_sn_7.wav'
    });
    this.configureSequence();
    this.synth.toMaster();
    this.sampler1.toMaster();
    Tone.Transport.start();
    Tone.context.latencyHint = 'fastest';
    Tone.context.lookAhead = 0.01;
  }

  ngOnInit() {
    this.boxes = _.fill(_.range(16), false);
    this.boxes2 = _.fill(_.range(16), false);
    this.boxes3 = _.fill(_.range(16), false);
    this.bpm = Tone.Transport.bpm.value;
  }

  ngAfterViewInit(): void {

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
          this.sampler1.triggerAttack(
            'C3',
            // this.noteLengths[this.currentPeriod],
            // time
          );
        }
        if (this.boxes2[step]) {
          this.sampler1.triggerAttack(
            'D3',
            // this.noteLengths[this.currentPeriod],
            // time
          );
        }
        if (this.boxes3[step]) {
          this.synthTest.triggerAttackRelease(
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

  public changeBPM(v) {
    console.log('v: ', v);
    Tone.Transport.bpm.value = v;
    this.bpm = v;
  }

  public setSynth(value) {
    this.synthTest = value;
  }
}
