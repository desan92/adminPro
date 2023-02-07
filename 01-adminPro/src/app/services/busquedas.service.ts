import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { Usuario } from '../models/usuario.model';
import { Hospital } from '../models/hospital.model';
import { Medico } from '../models/medico.model';

@Injectable({
  providedIn: 'root'
})
export class BusquedasService {

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

  private transformarUsuarios(resultados: any[]):Usuario[]{
    return resultados.map(
      user => new Usuario(user.nombre, user.email, '', user.google, user.img, user.role, user.uid)
    );
  }

  private transformarHospitales(resultados: any[]): Hospital[]{
    return resultados;
  }

  private transformarMedicos(resultados: any[]): Medico[]{
    return resultados;
  }

  buscar(
    tipo: 'usuarios'|'medicos'|'hospitales',
    termino: string = ''
    ){
      console.log(tipo);
    return this.http.get<any[]>(`http://localhost:3000/api/todo/coleccion/${tipo}/${termino}`, this.headers)
                .pipe(
                  map( (resp:any) => {
                    console.log('service ',resp.resultados);
                    switch(tipo){
                      case 'usuarios':
                        return this.transformarUsuarios(resp.resultados);
                        break;
                      case 'hospitales':
                        return this.transformarHospitales(resp.resultados);
                        break;
                      case 'medicos':
                        return this.transformarMedicos(resp.resultados);
                        break;
                      default:
                        return [];
                    }
                  })
                )
  }

  buscarGlobal(termino: string){
    return this.http.get<any[]>(`http://localhost:3000/api/todo/${termino}`, this.headers)
  }

}
