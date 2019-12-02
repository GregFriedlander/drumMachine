import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ChordScale } from './chord-scale.model';

@Injectable({
  providedIn: 'root'
})
export class ChordConstructorService {

  public rootNote$ = new BehaviorSubject<string>('C');
  public scale$ = new BehaviorSubject<string>('maj');

  constructor() { }

  public rotateRootNote(note: string) {

  }


}
