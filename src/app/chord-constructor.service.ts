import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ChordScale } from './chord-scale.model';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class ChordConstructorService {

  public chromaticScale = ChordScale.chromaticScale;
  public currentScaleType = 'major';
  public currentRootNote = 'C';
  public scaleSteps = ChordScale.majorSteps;

  public rootNote$ = new BehaviorSubject<string>(this.currentRootNote);
  public scaleType$ = new BehaviorSubject<string>(this.currentScaleType);
  public selectedScale$ = new BehaviorSubject<any>(null); // Change to Obj with voices

  public voicesWithOctives;

  constructor() {
    this.createScale();
  }

  public rotateScale(note: string) {
    this.currentRootNote = note;
    this.rootNote$.next(note);
    this.createScale();
  }

  public configureSteps(scaleType?: string) {
    this.currentScaleType = scaleType;
    this.scaleType$.next(scaleType);
    if (scaleType === 'major') {
      this.scaleSteps = ChordScale.majorSteps;
    } else if (scaleType === 'minor') {
      this.scaleSteps = ChordScale.minorSteps;
    }
    this.createScale();
  }

  public createScale() {
    let chromatic;
    let rotatedScale;
    let adjustedChromaticScale;
    let startingIdx = 0;
    const newScale = [];

    chromatic = [...this.chromaticScale];
    rotatedScale = chromatic.splice(0, chromatic.indexOf(this.currentRootNote));
    adjustedChromaticScale = chromatic.concat(rotatedScale);

    console.log('ADJUSTED CHROMATIC SCALE: ', adjustedChromaticScale);

    this.chromaticScale = adjustedChromaticScale;

    for (let x = 0; x < this.scaleSteps.length; x++) {
      newScale.push(this.chromaticScale[startingIdx]);
      startingIdx += parseInt(this.scaleSteps[x], 10);
    }

    this.selectedScale$.next(newScale);

    console.log('NEW SCALE: ', newScale);

    this.createVoices(newScale);
  }


  // TODO: Bring Oct in dynamically
  public createVoices(scale: string[], oct = 3): void {
    const counter = _.range(1, 8);
    this.voicesWithOctives = {};

    const voiceObj = {
      1: [
        scale[0],
        scale[2],
        scale[4]
      ],
      2: [
        scale[1],
        scale[3],
        scale[5],
      ],
      3: [
        scale[2],
        scale[4],
        scale[6],
      ],
      4: [
        scale[3],
        scale[5],
        scale[0],
      ],
      5: [
        scale[4],
        scale[6],
        scale[1],
      ],
      6: [
        scale[5],
        scale[0],
        scale[2],
      ],
      7: [
        scale[6],
        scale[1],
        scale[3],
      ],
    };
    counter.forEach(index => {
      let count = 0
      const newArr = [];
      // Add logic that skips the first step
      voiceObj[index].forEach(note => {
        if (scale.indexOf(note) < scale.indexOf(voiceObj[index][0])) {
          newArr.push(note + (oct + 1) );
        } else {
          newArr.push(note + oct);
        }
        count++;
      });
      this.voicesWithOctives[index] = newArr;
    })
    console.log('VOICES OBJ: ', this.voicesWithOctives);
    this.selectedScale$.next(this.voicesWithOctives);
  }

}
