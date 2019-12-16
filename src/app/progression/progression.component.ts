import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
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

  // TODO: The chords need to come into this component as an input
  chords: any;
  note;
  chordIdx = 1;
  step = 0;
  onRepeat;
  playPauseBtn = 'play';
  bpmString = '80';

  // TODO: MOVE ONCE IT WORKS
  direction = ['up', 'down'];
  selectedDirection = 'up';

  rootNote$ = this.chordService.rootNote$;
  scaleType$ = this.chordService.scaleType$;

  chromaticScale = ChordScale.chromaticScale;
  scaleTypes = ChordScale.scaleTypes;

  constructor(private chordService: ChordConstructorService, private cdr: ChangeDetectorRef) {

    // Put this here to avoid 'changed since checked' error message
    Tone.Transport.bpm.value = 80;
    this.bpmString = Tone.Transport.bpm.value;

    this.chordService.selectedScale$
      // .pipe(take(1)) // if this is here the chord doesn't get updated
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
      this.playArp(time);
    };
  }

  ngOnInit() {
    this.playPauseBtn = 'PLAY';
  }

  ngAfterViewInit(): void {
    this.handleInputs();
    Tone.Transport.scheduleRepeat(this.onRepeat, '8n');
  }

  public playArp(time) {
    if (this.selectedDirection === 'up') {
      this.note = this.chord[this.step % this.chord.length];
      // console.log('CHORD: ', this.chord);
      console.log('STEP: ', this.step);
      console.log('NOTE: ', this.note);
      this.synth.triggerAttackRelease(this.note, '8n', time);
      this.step++;
    } else if (this.selectedDirection === 'down') {
      this.note = this.chord[this.step % this.chord.length];
      // console.log('CHORD: ', this.chord);
      console.log('STEP: ', this.step);
      console.log('NOTE: ', this.note);
      this.synth.triggerAttackRelease(this.note, '8n', time);
      this.step--;
      if (this.step < 0) {
        this.step = this.chord.length - 1;
      }
    }
  }

  // FIND A BETTER WAY CAUSE THIS SUCKS
  public handleInputs(): void {
    this.$inputs = this.triggers.nativeElement.querySelectorAll('input');
    this.$inputs[0].checked = true;
    this.$inputs.forEach($input => {
      $input.addEventListener('change', () => {
        console.log('*******');
        if ($input.checked) {
          this.step = 0;
          this.handleChord($input.value);
        }
      });
    });
    this.triggers.nativeElement.focus();
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

  // Move this functionality out of component
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
      case '6':
        this.chordIdx = 6;
        this.step = 0;
        this.$inputs[this.chordIdx - 1].checked = true;
        break;
      case '7':
        this.chordIdx = 7;
        this.step = 0;
        this.$inputs[this.chordIdx - 1].checked = true;
        break;
      default:
        this.$inputs[this.chordIdx - 1].checked = true;
    }
  }

  public changeRootNote(note): void {
    this.chordService.rotateScale(note);
    this.cdr.detectChanges();
    this.handleInputs();
  }

  public changeScaleType(scale): void {
    this.chordService.configureSteps(scale);
  }

  public changeArpDirection(direction): void {
    this.selectedDirection = direction;
    console.log('-----------------------', this.selectedDirection);
    if (this.selectedDirection === 'down') {
      this.step = this.chord.length - 1;
    } else if (this.selectedDirection === 'up') {
      this.step = 0;
    }
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
