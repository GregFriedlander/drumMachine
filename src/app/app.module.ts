import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SeqContainerComponent } from './seq-container/seq-container.component';
import { DialComponent } from './seq-container/dial/dial.component';
import { SynthComponent } from './seq-container/synth/synth.component';

@NgModule({
  declarations: [
    AppComponent,
    SeqContainerComponent,
    DialComponent,
    SynthComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
