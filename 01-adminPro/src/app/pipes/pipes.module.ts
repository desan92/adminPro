import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImagenPipe } from './imagen.pipe';


//module per centralitzar tots els pipes.
@NgModule({
  declarations: [
    ImagenPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ImagenPipe
  ]
})
export class PipesModule { }
