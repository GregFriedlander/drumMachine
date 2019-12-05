import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ChordScale } from './chord-scale.model';

@Injectable({
  providedIn: 'root'
})
export class ChordConstructorService {

  public rootNote$ = new BehaviorSubject<string>('C');
  public scaleType$ = new BehaviorSubject<string>('major');

  constructor() { }

  public rotateRootNote(note: string) {
    this.rootNote$.next(note);
  }

  public changeScaleType(scale: string) {
    this.scaleType$.next(scale);
  }


}
