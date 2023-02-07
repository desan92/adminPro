import { Component } from '@angular/core';

@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styleUrls: ['./grafica1.component.css']
})
export class Grafica1Component {

  labels1: string[] = [ 'Platans', 'Mandarinas', 'Peres' ];
  data1: number[] = [ 100, 550, 350 ];

  labels2: string[] = [ 'Entrecot', 'Costelles', 'Hamburguesa' ];
  data2: number[] = [ 200, 150, 650 ];

  labels3: string[] = [ 'Orada', 'Llenguado', 'Gambas' ];
  data3: number[] = [ 400, 300, 300 ];

  labels4: string[] = [ 'Pilota', 'Roda', 'Ordinador' ];
  data4: number[] = [ 100, 200, 700 ];
  
}
