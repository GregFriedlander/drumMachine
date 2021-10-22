import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ChordConstructorService } from './chord-constructor.service';

@Injectable({
  providedIn: 'root'
})
export class TheoryService {

  public third: string;

  constructor(private ccService: ChordConstructorService) { }

  getThird() {
    let adjustScale = this.ccService.chromaticScale;
    this.third = adjustScale[4];
    console.log('Third: ', this.third);
  }

}
