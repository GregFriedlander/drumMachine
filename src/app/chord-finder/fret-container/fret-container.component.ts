import { Component, Input, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import { ChordConstructorService } from '../../chord-constructor.service';

@Component({
  selector: 'app-fret-container',
  templateUrl: './fret-container.component.html',
  styleUrls: ['./fret-container.component.scss']
})
export class FretContainerComponent implements OnInit {

  @Input() indexOfString: number;
  @Input() indexOfFret: number;
  public isActive: boolean;
  public stringValue: any;
  public stringNoteMap: string[];
  public stringSet = {};

  constructor(private chordConstructorService: ChordConstructorService) { }

  ngOnInit(): void {
    this.chordConstructorService.stringSet$.subscribe(data => {
      this.stringSet = data;
      this.createStringNoteMap();
    });
  }

  private createStringNoteMap() {
    const key = this.indexOfString + 1;
    this.stringNoteMap = this.stringSet[key];
    this.createValue();
  }

  private createValue() {
    this.stringValue = this.stringNoteMap[this.indexOfFret].slice(0, -1);
  }

  public makeActive() {
    if (!this.isActive) {
      this.isActive = true;
    } else {
      this.isActive = false;
    }
  }

}
