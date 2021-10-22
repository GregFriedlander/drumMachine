import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SelectComponent } from './seq-container/select/select.component';
import { SeqContainerComponent } from './seq-container/seq-container.component';
import { DialComponent } from './seq-container/dial/dial.component';
import { SynthComponent } from './seq-container/synth/synth.component';
import { ProgressionComponent } from './progression/progression.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSelectModule} from '@angular/material/select';
import { ChordFinderComponent } from './chord-finder/chord-finder.component';
import { FretContainerComponent } from './chord-finder/fret-container/fret-container.component';
import { ScalePickerComponent } from './scale-picker/scale-picker.component';
import { TheoryHelperComponent } from './theory-helper/theory-helper.component';

@NgModule({
  declarations: [
    AppComponent,
    SeqContainerComponent,
    DialComponent,
    SynthComponent,
    ProgressionComponent,
    ChordFinderComponent,
    FretContainerComponent,
    ScalePickerComponent,
    SelectComponent,
    TheoryHelperComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
