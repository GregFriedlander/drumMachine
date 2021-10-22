import { Component, OnInit } from '@angular/core';
import { ChordConstructorService } from '../chord-constructor.service';
import { ChordScale } from '../chord-scale.model';
import { TheoryService } from '../theory.service';
import ScaleTypes = ChordScale.ScaleTypes;

@Component({
  selector: 'app-theory-helper',
  templateUrl: './theory-helper.component.html',
  styleUrls: ['./theory-helper.component.scss']
})
export class TheoryHelperComponent implements OnInit {

  public rootNote: string;
  public third: string;
  public answer: string = '';
  public intervalType: string = 'Major'
  public selectedScale: string[];
  public answerArray: string[];
  public correctChoice: boolean;

  // todo: move this into a service?
  intervalArray: string[] = [ScaleTypes.maj, ScaleTypes.min]

  constructor(private ccService: ChordConstructorService, private theoryService: TheoryService) { }

  ngOnInit(): void {
    this.selectedScale = this.ccService.returnAdjustChromatic('C');
    console.log('Selected: ', this.selectedScale);
    this.rootNote = 'C';
    this.getChoices();
    this.third = this.selectedScale[4]; // two whole steps
  }

  getChoices() {
    this.answerArray = this.ccService.chromaticScale.filter(e => e !== this.rootNote);
  }

  selectChoice(note: string) {
    if (note === this.third) {
      this.correctChoice = true;
      this.answer = note;
      setTimeout(() => {
        this.nextQuestion();
      }, 500);
    } else {
      this.correctChoice = false;
      this.answer = note;
    }
  }

  getInterval() {

  }

  nextQuestion() {
    this.answer = '';
    this.intervalType = this.intervalArray[Math.floor(Math.random() * 2)];
    this.rootNote = this.selectedScale[Math.floor(Math.random() * 12)];
    this.getChoices();
    this.selectedScale = this.ccService.returnAdjustChromatic(this.rootNote);

    if (this.intervalType === ScaleTypes.maj) {
      this.third = this.selectedScale[4];
    } else {
      this.third = this.selectedScale[3];
    }
  }

}
