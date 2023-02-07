import { Component, Input, SimpleChanges } from '@angular/core';
import { ChartData, ChartEvent, ChartType } from 'chart.js';


@Component({
  selector: 'app-dona',
  templateUrl: './dona.component.html',
  styleUrls: ['./dona.component.css']
})
export class DonaComponent {

  @Input() title: string = 'Sense Titol.';
  @Input('labels') labels: string[] = [ 'Download Sales', 'In-Store Sales', 'Mail-Order Sales' ];
  @Input('data') data: number[] = [ 350, 450, 100 ];

  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.

    //aqui s'actualitzen les dades que arriben de la grafica via input.
    this.doughnutChartData = {
      labels: this.labels,
      datasets: [
        { 
          data: this.data,
          backgroundColor: [ '#6857E6', '#009FEE', '#F02059' ]
        }
      ]
    }
  }

  //es crea tota la grafica inicialment.
  public doughnutChartLabels: string[] = [ 'Download Sales', 'In-Store Sales', 'Mail-Order Sales' ];
  public doughnutChartData: ChartData<'doughnut'> = {
    labels: this.doughnutChartLabels,
    datasets: [
      { 
        data: [ 350, 450, 100 ],
        backgroundColor: [ '#6857E6', '#009FEE', '#F02059' ]
      }
    ]
  };
  public doughnutChartType: ChartType = 'doughnut';


}
