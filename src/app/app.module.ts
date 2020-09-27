import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SeqContainerComponent } from './seq-container/seq-container.component';
import { DialComponent } from './seq-container/dial/dial.component';
import { SynthComponent } from './seq-container/synth/synth.component';
import { ProgressionComponent } from './progression/progression.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSelectModule} from '@angular/material/select';

@NgModule({
  declarations: [
    AppComponent,
    SeqContainerComponent,
    DialComponent,
    SynthComponent,
    ProgressionComponent
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
