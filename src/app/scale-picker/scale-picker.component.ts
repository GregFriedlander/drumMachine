import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ChordConstructorService } from '../chord-constructor.service';
import { ChordScale } from '../chord-scale.model';

@Component({
  selector: 'app-scale-picker',
  templateUrl: './scale-picker.component.html',
  styleUrls: ['./scale-picker.component.scss']
})
export class ScalePickerComponent implements OnInit {

  direction = ['up', 'down'];
  selectedDirection = 'up';
  step = 0;
  chord;

  // playPauseBtn = 'play';
  bpmString = '80';

  rootNote$ = this.chordService.rootNote$;
  scaleType$ = this.chordService.scaleType$;

  chromaticScale = ChordScale.chromaticScale;
  scaleTypes = ChordScale.majorStepsObj;

  constructor(private chordService: ChordConstructorService, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
  }

  public changeRootNote(note): void {
    this.chordService.rotateScale(note);
    this.cdr.detectChanges();
  }

  public changeScaleType(scale): void {
    this.chordService.configureSteps(scale);
  }

  public getScale(): void {
    this.chordService.returnScaleBETA();
  }

  // public changeArpDirection(direction): void {
  //   this.selectedDirection = direction;
  //   console.log('-----------------------', this.selectedDirection);
  //   if (this.selectedDirection === 'down') {
  //     this.step = this.chord.length - 1;
  //   } else if (this.selectedDirection === 'up') {
  //     this.step = 0;
  //   }
  // }

}
