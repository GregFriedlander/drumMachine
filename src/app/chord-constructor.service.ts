import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ChordScale } from './chord-scale.model';
import * as _ from 'lodash';
import ScaleProperties = ChordScale.ScaleProperties;
import ScaleTypes = ChordScale.ScaleTypes;
import majorScaleLabelArr = ChordScale.majorScaleLabelArr;
import ChordProperties = ChordScale.ChordProperties;

@Injectable({
  providedIn: 'root'
})
export class ChordConstructorService {

  public chromaticScale = ChordScale.chromaticScale;
  public currentScaleType = 'major';
  public currentRootNote = 'C';
  public scaleSteps = ChordScale.majorSteps;
  public gtrString: string[];
  public gtrString$ = new BehaviorSubject<string[]>(null);
  public stringSet = {};
  public stringSet$ = new BehaviorSubject({});
  public scale: ChordScale.Mode[];

  selectedScale;

  public rootNote$ = new BehaviorSubject<string>(this.currentRootNote);
  public scaleType$ = new BehaviorSubject<string>(this.currentScaleType);
  public selectedScale$ = new BehaviorSubject<any>(null); // Change to Obj with voices

  public voicesWithOctives;
  newDegrees;


  constructor() {
    this.createScale();
  }

  public returnAdjustChromatic(note: string) {
    let chromatic;
    let rotatedScale;
    let adjustedChromaticScale;

    this.currentRootNote = note;
    chromatic = [...this.chromaticScale];
    rotatedScale = chromatic.splice(0, chromatic.indexOf(this.currentRootNote));
    adjustedChromaticScale = chromatic.concat(rotatedScale);
    this.chromaticScale = adjustedChromaticScale;
    return this.chromaticScale;
  }

  public createGuitarString(scale: string, oct: number) {
    this.gtrString = [];
    const newScale = this.returnAdjustChromatic(scale);

    for (let x = 0; x < 16; x++) {
      if (newScale.indexOf(newScale[x]) < newScale.indexOf('C')) {
        this.gtrString.push(newScale[x % 12] + oct);
      } else {
        this.gtrString.push(newScale[x % 12] + (oct + 1 ));
      }
    }

    this.gtrString$.next(this.gtrString);
    return this.gtrString;
  }

  public createStringSet() {
    this.stringSet = {
      1: this.createGuitarString('E', 3),
      2: this.createGuitarString('A', 3),
      3: this.createGuitarString('D', 4),
      4: this.createGuitarString('G', 4),
      5: this.createGuitarString('B', 4),
      6: this.createGuitarString('E', 5),
    };
    this.stringSet$.next(this.stringSet);
  }

  // Shit from the ARP

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
    this.selectedScale = newScale;

    console.log('NEW SCALE: ', newScale);



    // TODO: commented out while i work out returnScaleBETA()
    // this.createVoices(newScale);
  }

  public returnScaleBETA() {
    let scaleObject: ScaleProperties = {};
    scaleObject.scaleRoot = this.selectedScale[0];
    scaleObject.degree = ScaleTypes.maj; // make dynamic
    // scaleObject.stepsNumber = this.scaleSteps;
    scaleObject.scale = this.createDegrees();
    console.log('---------------------------------------- ', scaleObject);
  }

  public createDegrees() {
    const labelArray = majorScaleLabelArr;
    let full = {};
    for (let x = 0; x < this.newDegrees.length; x++ ) {

      let chord: ChordProperties = {};
      chord.chordRoot = this.newDegrees[x].root;
      chord.degree = labelArray[x];
      chord.triad = this.newDegrees[x];
      full[ (x + 1 ) + '___' + chord.chordRoot + chord.degree] = chord;
    }
    return full;
  }

  // TODO: Bring Oct in dynamically
  public createVoices(scale: string[], oct = 3): void {
    const counter = _.range(1, 8);
    // console.log('COUNTER: ', counter);
    this.voicesWithOctives = {};

    this.newDegrees = [
      {
        root: scale[0],
        third: scale[2],
        fifth: scale[4],
      },
      {
        root: scale[1],
        third: scale[3],
        fifth: scale[5],
      },
      {
        root: scale[2],
        third: scale[4],
        fifth: scale[6],
      },
      {
        root: scale[3],
        third: scale[5],
        fifth: scale[0],
      },
      {
        root: scale[4],
        third: scale[6],
        fifth: scale[1],
      },
      {
        root: scale[5],
        third: scale[0],
        fifth: scale[2],
      },
      {
        root: scale[6],
        third: scale[1],
        fifth: scale[3],
      }
    ]

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
      // console.log('INDEX:', index);
      voiceObj[index].forEach(note => {
        // console.log('scale.indexOf(note) :', scale.indexOf(note));
        // console.log('scale.indexOf(voiceObj[index][0]) :', scale.indexOf(voiceObj[index][0]));
        if (scale.indexOf(note) < scale.indexOf(voiceObj[index][0])) {
          // console.log('VOICE: ', voiceObj[index]);
          // console.log('note: ', note + scale.indexOf(note));
          // console.log('test: ', voiceObj[index][0] + scale.indexOf(voiceObj[index][0]));
          newArr.push(note + (oct + 1) );
        } else {
          newArr.push(note + oct);
        }
        count++;
      });
      this.voicesWithOctives[index] = newArr;
    })
    // console.log('VOICES OBJ: ', this.voicesWithOctives);
    console.log('NEW DEGREES: ', this.newDegrees);
    this.selectedScale$.next(this.voicesWithOctives);
  }


}
