import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalImagenService {

  private _ocultarModal: boolean = true;
  public tipo!: 'usuarios'|'medicos'|'hospitales';
  public id!: string;
  public img!: string;
  public nuevaImagen: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  get ocultarModal(){
    return this._ocultarModal;
  }

  abrirModal( tipo: 'usuarios'|'medicos'|'hospitales',
              id: string,
              img: string = 'no-image'){

    this._ocultarModal = false;
    this.tipo = tipo;
    this.id = id;
    //this.img = img;
    //console.log(this.img);

    if(img)
    {
      if(img.includes('https'))
      {
        this.img = img;
        console.log(this.img);
      }
      else
      {
        //url que este d'enviar l'arxiu nou per canviar d'imatge.
        this.img = `http://localhost:3000/api/upload/${tipo}/${img}`;
        console.log(this.img);
      }
    }
    else
    {
      this.img = `http://localhost:3000/api/upload/${tipo}/no-image`;
    }

    
  }

  cerrarModal(){
    this._ocultarModal = true;
  }


}
