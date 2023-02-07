import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { Medico } from '../models/medico.model';

@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  constructor(private http:HttpClient) { }

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


  cargarMedicos(){
    //http://localhost:3000/api/hospitales
    return this.http.get(`http://localhost:3000/api/medicos`, this.headers)
                .pipe(
                  map( ( resp: { ok: boolean, medicos: Medico[] } ) => resp.medicos)
                )

  }

  obtenerMedicoId(id: string){
    return this.http.get(`http://localhost:3000/api/medicos/${id}`, this.headers)
                .pipe(
                  map( ( resp: { ok: boolean, medico: Medico } ) => resp.medico)
                )
  }

  crearMedico(medico: {nombre: string, hospital: string}){
    //http://localhost:3000/api/hospitales
    return this.http.post(`http://localhost:3000/api/medicos`, medico, this.headers);
                
  }

  actualizarMedico(medico: Medico){
    //http://localhost:3000/api/hospitales
    return this.http.put(`http://localhost:3000/api/medicos/${ medico._id }`, medico, this.headers);
                
  }

  borrarMedico(_id: string){
    //http://localhost:3000/api/hospitales
    return this.http.delete(`http://localhost:3000/api/medicos/${ _id }`, this.headers);
                
  }
}
