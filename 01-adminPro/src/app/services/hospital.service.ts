import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Hospital } from '../models/hospital.model';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  constructor(private http: HttpClient) { }

  //un metode get que nomes retorna el token util per utilitzar quan nomes necesitem
  //el token i no volem fer mes operacions.
  get token():string{
    return localStorage.getItem('token') || '';
  }

  get headers(){
    return {
      headers: {
        //aqui es pasan les dades del token ja que es necesiten per fer la consulta a la db.
        //inicialment s'agafaba del const token comentat adalt pero ara s'agafa del get token.
        'x-token': this.token
      }
    }
  }


  cargarHospitales(){
    //http://localhost:3000/api/hospitales
    return this.http.get<{ ok: boolean, hospitales: Hospital[] }>(`http://localhost:3000/api/hospitales`, this.headers)
                .pipe(
                  map( ( resp: { ok: boolean, hospitales: Hospital[] } ) => resp.hospitales)
                )

  }

  crearHospitales(nombre: string){
    //http://localhost:3000/api/hospitales
    return this.http.post(`http://localhost:3000/api/hospitales`, { nombre }, this.headers);
                
  }

  actualizarHospitales(_id: string, nombre: string){
    //http://localhost:3000/api/hospitales
    return this.http.put(`http://localhost:3000/api/hospitales/${ _id }`, { nombre }, this.headers);
                
  }

  borrarHospitales(_id: string){
    //http://localhost:3000/api/hospitales
    return this.http.delete(`http://localhost:3000/api/hospitales/${ _id }`, this.headers);
                
  }

}
