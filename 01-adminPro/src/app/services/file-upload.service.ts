import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor() { }

  async actualizarFoto(
    archivo: File,
    tipo: 'usuarios'|'medicos'|'hospitales',
    id: string){

    try{

      //url que este d'enviar l'arxiu nou per canviar d'imatge.
      const url = `http://localhost:3000/api/upload/${tipo}/${id}`;
      
      //aqui es crea la data que se li enviara.
      //en el postman es el body.
      const formData = new FormData();
      formData.append('imagen', archivo);

      //fetch es on es fara la consulta a la db se li pasen les dades necesaries.
      const resp = await fetch(url, {
        method: 'PUT',
        headers: {
          'x-token': localStorage.getItem('token') || ''
        },
        body: formData
      });
      //console.log(resp);

      //aqui s'agafa les dades que retorna la consulta.
      const data = await resp.json();
      console.log(data);
      if(data)
      {
        return data.nombreArchivo;
      }
      else
      {
        console.log(data.msg);
        return false;
      }

    }catch(error){

      console.log(error);
      return false;

    }

  }


}
