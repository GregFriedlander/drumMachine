import { Component, OnInit } from '@angular/core';
import { ChordConstructorService } from '../chord-constructor.service';

@Component({
  selector: 'app-chord-finder',
  templateUrl: './chord-finder.component.html',
  styleUrls: ['./chord-finder.component.scss']
})
export class ChordFinderComponent implements OnInit {

  public numberOfStrings: number[] = Array(6).fill(0).map((x, i) => i + 1);
  chordsInScale = {};

  // Change this to change number of frets in the UI
  public numberOfFrets: number[] = Array(5).fill(0).map((x, i) => i + 1);

  constructor(private chordConstructorService: ChordConstructorService) { }

  ngOnInit(): void {
    this.chordConstructorService.createStringSet();
    this.chordConstructorService.selectedScale$.subscribe(data => {
      this.chordsInScale = data;
      console.log('DATA:           ', this.chordsInScale);
    });
  }
}
