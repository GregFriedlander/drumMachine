import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import * as Tone from 'tone';

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
  chords;
  chordIdx = 0;
  step = 0;
  onRepeat;
  playPauseBtn: string;
  bpmString: string;
  constructor() {

    this.chords = [
      'A0 C5 E1',
      'F0 A0 C1',
      'G0 B0 D1',
      'D0 F0 A0',
      'E0 G0 B0'
    ].map(this.formatChords);
    this.synth = new Tone.Synth();
    this.gain = new Tone.Gain(0.4);

    this.gain.toMaster();
    this.synth.connect(this.gain);


    this.onRepeat = (time?: any) => {
      const chord = this.chords[this.chordIdx];
      const note = chord[this.step % chord.length];
      this.synth.triggerAttackRelease(note, '8n', time);
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
          this.handleChord($input.value);
        }
      });
    });
    this.bpmString = Tone.Transport.bpm.value;
    Tone.Transport.scheduleRepeat(this.onRepeat, '8n');
    Tone.Transport.start();
  }

  // Handle chord change
  private handleChord(valueString) {
    this.chordIdx = parseInt(valueString, 10) - 1;
  }

  private formatChords(chordString) {
    const chord = chordString.split(' ');
    const arr = [];
    // loop over each array 2x
    for (let i = 0; i < 2; i++) {
      // loop through each item in array
      for (let j = 0; j < chord.length; j++) {
        const noteOct = chord[j].split('');
        let note = noteOct[0];
        const oct = (noteOct[1] === '0') ? i + 4 : i + 5;
        note += oct;
        arr.push(note);
      }
    }
    return arr;
  }

}
