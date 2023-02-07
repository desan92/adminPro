import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(img: string | undefined, tipo: 'usuarios'|'medicos'|'hospitales'): string {
    //opcions per si l'usari te una imatge.
    if(img)
    {
        //seria mes per si ve de google. Com que vindra amb una url doncs es clasifica amb un if.
        if(img!.includes('https'))
        {
            //si ve de google
            return img;
        }
        else
        {
            //si ve de la nostre db no vindra amb la url nomes vindra el nom de l'imatge per tant es posa a la url.
            return `http://localhost:3000/api/upload/${tipo}/${img}`;
        }
    }
    else
    {
        //en cas de que l'usuari no tingui imatge es posara una imatge predifinida.
        return `http://localhost:3000/api/upload/${tipo}/no-image`;
    }
  }

}
