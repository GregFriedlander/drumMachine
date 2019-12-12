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
  public selectedScale$ = new BehaviorSubject<string[]>(this.chromaticScale); // Change to Obj with voices

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

  public createVoices(scale: string[]) {
    const counter = _.range(1, 8);
    const oct = 3;

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
    // console.log('VOICES OBJ: ', voiceObj);
    counter.forEach(index => {
      const idx = index.toString();
      let num = 0;
      let count = 0
      voiceObj[idx].forEach(x => {
        const newNote = `${x}${num}`;
        console.log('X ', x);
        console.log('NEW NOTE ', newNote);
        console.log('******** ', scale.indexOf(x));
        if (scale.indexOf(x) < scale.indexOf(voiceObj[idx][count])) {
          console.log('!!!!!! ', scale.indexOf(voiceObj[idx][0]));
        }
        // console.log('^^^^^^ ', count);
        voiceObj[idx][count] = newNote;
        count++;
      });
      console.log('--------------');
    })
    console.log('VOICES OBJ: ', voiceObj);
    return voiceObj;
  }

}
