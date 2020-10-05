import { AfterViewInit, Component, ElementRef, OnInit, QueryList, Renderer2, ViewChildren } from '@angular/core';
import { ChordConstructorService } from '../chord-constructor.service';

export interface FretObject {
  active: boolean;
  note: string;
  octive: number;
}

@Component({
  selector: 'app-chord-finder',
  templateUrl: './chord-finder.component.html',
  styleUrls: ['./chord-finder.component.scss']
})
export class ChordFinderComponent implements OnInit, AfterViewInit {

  private el: ElementRef;
  private input: ElementRef;
  public numberOfStrings: number[] = Array(6).fill(0).map((x, i) => i + 1);
  public numberOfFrets: number[] = Array(12).fill(0).map((x, i) => i + 1);

  chord; // Todo: type out
  @ViewChildren('frets') frets: QueryList<ElementRef>;
  @ViewChildren('inputs$') inputs$: QueryList<ElementRef>;

  constructor(private renderer: Renderer2, private chordService: ChordConstructorService) { }

  ngOnInit(): void {
    this.chordService.selectedScale$.subscribe(x => {
      this.chord = x;
    });
  }

  ngAfterViewInit(): void {
    this.inputs$.forEach(x => console.log(x));
  }

  public clickFret(fret: number): void {
    this.el = this.frets.find((x, i) => i === fret);
    this.input = this.inputs$.find((x, i) => i === fret);
    console.log('Input: ', this.input.nativeElement.checked);
    this.input.nativeElement.checked = !this.input.nativeElement.checked;
    console.log('Input: ', this.input.nativeElement.checked);
    console.log('EL: ', this.el);
    if (!this.el.nativeElement.classList.contains('shape')) {
      this.renderer.addClass(this.el.nativeElement, 'shape');
    } else {
      this.renderer.removeClass(this.el.nativeElement, 'shape');
    }
  }

  rotateScale() {
    this.chordService.rotateScale('E');
  }


}
