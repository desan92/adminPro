import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styleUrls: ['./incrementador.component.css']
})
export class IncrementadorComponent {

  @Input() progress: number = 50;
  @Input() btnClass: string = 'btn-primary'

  @Output('valor') canviValor: EventEmitter<number> = new EventEmitter();

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.btnClass = `btn ${this.btnClass}`;
  }

  get getPercentatge(){
    return `${this.progress}%`
  }

  canviarValor(valor:number){
    //si el valor es superior a 100 sempre marcara 100 com a maxim.
    if(this.progress >= 100 && valor >= 0)
    {
      this.canviValor.emit(100);
      return this.progress = 100;
    }

    //si el valor es inferior a 0 sempre marcara 0 com a nota minima.
    if(this.progress <= 0 && valor < 0)
    {
      this.canviValor.emit(0);
      return this.progress = 0;
    }

    //si no cumpleix les condicions anteirors incrementa el valor al progres.
    this.canviValor.emit(this.progress + valor);
    return this.progress = this.progress + valor;
  }

  onChange(valor: number){
    console.log(valor);
    if(valor >= 100)
    {
      this.progress = 100;
    }
    else if(valor <= 0)
    {
      this.progress = 0;
    }
    else
    {
      this.progress = valor;
    }

    this.canviValor.emit(this.progress);
  }

}
