import { AfterViewInit, Component, ElementRef, OnInit, QueryList, Renderer2, ViewChildren } from '@angular/core';

@Component({
  selector: 'app-chord-finder',
  templateUrl: './chord-finder.component.html',
  styleUrls: ['./chord-finder.component.scss']
})
export class ChordFinderComponent implements OnInit, AfterViewInit {

  public numberOfStrings: number[] = Array(6).fill(0).map((x, i) => i + 1);
  public numberOfFrets: number[] = Array(12).fill(0).map((x, i) => i + 1);
  @ViewChildren('frets') frets: QueryList<ElementRef>;
  fretsToArray;
  el;

  constructor(private renderer: Renderer2) { }

  ngOnInit(): void {
    console.log('***** ', this.numberOfStrings );
  }

  ngAfterViewInit(): void {
    // this.fretsToArray = this.frets.fretsToArray();
    console.log('FRETS TO ARRAY ', this.frets);
  }

  public addActive(event): void {


    this.el = this.frets.find((x, i) => i === event);
    // const elem: ElementRef = this.fretsToArray[event];
    this.renderer.addClass(this.el.nativeElement, 'shape')

    // this.frets.forEach(x => {
    //   console.log('^^^^^^: ', x);
    // })
    console.log('*&*&*&   ', this.el);
    // console.log('FRET: ', this.frets[event]);

    // const target = event.target;
    // const isActive: boolean = target['classList'].value.includes('shape');
    // console.log('target: ', event.target);

    // if (!isActive) {
    //   this.renderer.addClass(event.target, 'shape');
    // } else {
    //   this.renderer.removeClass(event.target, 'shape');
    // }

    // if (event.target['classList'].value.includes('fret')) {
    //   console.log('*****')
    // }

  }


}
