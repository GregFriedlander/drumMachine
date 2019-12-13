import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { first } from 'rxjs/operators';
import * as Tone from 'tone';
import { ChordConstructorService } from '../chord-constructor.service';
import { ChordScale } from '../chord-scale.model';

@Component({
  selector: 'app-progression',
  templateUrl: './progression.component.html',
  styleUrls: ['./progression.component.scss'],
})
export class ProgressionComponent implements OnInit, AfterViewInit {

  @ViewChild('triggers', {static: false}) triggers;
  $inputs;
  synth;
  gain;
  chord;
  chords: any;
  note;
  chordIdx = 1;
  step = 0;
  onRepeat;
  playPauseBtn = 'play';
  bpmString = '80';

  rootNote$ = this.chordService.rootNote$;
  scaleType$ = this.chordService.scaleType$;

  chromaticScale = ChordScale.chromaticScale;
  scaleTypes = ChordScale.scaleTypes;

  constructor(private chordService: ChordConstructorService) {

    // Put this here to avoid 'changed since checked' error message
    Tone.Transport.bpm.value = 80;
    this.bpmString = Tone.Transport.bpm.value;

    // this.chords = [
    //   'A0 C5 E1',
    //   'F0 A0 C1',
    //   'G0 B0 D1',
    //   'D0 F0 A0',
    //   'E0 G0 B0'
    // ].map(this.formatChords);

    this.chordService.selectedScale$
      // .pipe(first(x => x !== null)) // if this is here the chord doesn't get updated
      .subscribe(x => {
       this.chords = x;
       console.log('CHORDS: ', this.chords);
      });
    this.synth = new Tone.Synth();
    this.gain = new Tone.Gain(0.4);

    this.gain.toMaster();
    this.synth.connect(this.gain);


    this.onRepeat = (time?: any) => {
      this.chord = this.chords[this.chordIdx];
      this.note = this.chord[this.step % this.chord.length];
      console.log('STEP: ', this.step);
      console.log('CHORD: ', this.chord);
      // console.log('NOTE: ', this.note);
      this.synth.triggerAttackRelease(this.note, '8n', time);
      this.step++;
    };
  }

  ngOnInit() {
    this.playPauseBtn = 'PLAY';
  }

  ngAfterViewInit(): void {
    this.$inputs = this.triggers.nativeElement.querySelectorAll('input');
    this.$inputs.forEach($input => {
      $input.addEventListener('change', () => {
        if ($input.checked) {
          this.step = 0;
          this.handleChord($input.value);
        }
      });
    });
    Tone.Transport.scheduleRepeat(this.onRepeat, '16n');
  }

  public playPause() {
    if (Tone.Transport.state === 'stopped') {
      this.playPauseBtn = 'STOP';
      Tone.Transport.start();
    } else {
      this.playPauseBtn = 'START';
      Tone.Transport.stop();
    }
  }

  // Handle chord change
  private handleChord(valueString) {
    this.chordIdx = parseInt(valueString, 10);
  }

  public changeChord(event) {
    switch (event.key) {
      // PLAY/PAUSE spacebar
      case ' ':
        this.$inputs[this.chordIdx].checked = true;
        this.playPause();
        break;
      case '1':
        this.chordIdx = 1;
        this.step = 0;
        this.$inputs[this.chordIdx - 1].checked = true;
        break;
      case '2':
        this.chordIdx = 2;
        this.step = 0;
        this.$inputs[this.chordIdx - 1].checked = true;
        break;
      case '3':
        this.chordIdx = 3;
        this.step = 0;
        this.$inputs[this.chordIdx - 1].checked = true;
        break;
      case '4':
        this.chordIdx = 4;
        this.step = 0;
        this.$inputs[this.chordIdx - 1].checked = true;
        break;
      case '5':
        this.chordIdx = 5;
        this.step = 0;
        this.$inputs[this.chordIdx - 1].checked = true;
        break;
      default:
        this.$inputs[this.chordIdx - 1].checked = true;
    }
  }

  public changeRootNote(note) {
    this.chordService.rotateScale(note);
  }

  public changeScaleType(scale) {
    this.chordService.configureSteps(scale);
  }

  // ORIGINAL TUTORIAL SOLUTION
  // private formatChords(chordString) {
  //   const chord = chordString.split(' ');
  //   const arr = [];
  //   // loop over each array 2x
  //   for (let i = 0; i < 2; i++) {
  //     // loop through each item in array
  //     for (let j = 0; j < chord.length; j++) {
  //       const noteOct = chord[j].split('');
  //       // console.log('NOTE OCT: ', noteOct)
  //       let note = noteOct[0];
  //       const oct = (noteOct[1] === '0') ? i + 4 : i + 5;
  //       note += oct;
  //       arr.push(note);
  //     }
  //   }
  //   console.log('ARR: ', arr);
  //   return arr;
  // }
}
