import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, delay, tap } from 'rxjs/operators';

import { RegisterForm } from '../interfaces/register.interface';
import { LoginForm } from '../interfaces/login.interface';
import { map, Observable, of } from 'rxjs';
import { Usuario } from '../models/usuario.model';
import { cargarUsuario } from '../interfaces/cargar-usuarios.interface';

declare const google: any;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  //aqui es crea una nova variable que tindra el valor de l'instancia de Usuario.
  //vigilar en posar ! o ?.
  public usuario!: Usuario;

  //constructor es criden o s'importen els "moduls" necesaris per a aquesta pagina.
  //s'exporta el httpclient per poder interactuar amb l'informacio del backend.
  constructor(private http: HttpClient) { }

  //un metode get que nomes retorna el token util per utilitzar quan nomes necesitem
  //el token i no volem fer mes operacions.
  get token(): string{
    return localStorage.getItem('token') || '';
  }

  get role(): string{
    return this.usuario.role;
  }

  get uid(){
    return this.usuario.uid || '';
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

  guardarLocalstorage(token: string, menu: any){
        //es guarda el nou token generat.
        localStorage.setItem('token', token);
        //es guarda al localstorage el menu de l'app.
        localStorage.setItem('menu', JSON.stringify(menu));
  }

  //logout metode es el metode que es crida quan l'usuari de la pagina apreta el boto logout del header.
  logout(){
    //quan s'apreta al boto es remou del localstorage la variable token.
    localStorage.removeItem('token');

    //borrar menu
    localStorage.removeItem('menu');

    //en cas d'entrar per una conta de google quedaba predefinit que sempre entres el mateix usuari 
    //i quedaba com fixat per tant es revoke per si es te mes d'una compte i es vol entrar per un altre.
    google.accounts.id.revoke('jordi.a.h@gmail.com', () => {
      console.log('consent revoked');
    })
  }

  //metode que es crida al guard per comprovar si l'usuari te token i si esta permesa o no l'entrada.
  //retorna un observable boolean
  validarToken(): Observable<boolean>{
    //es crea una constant que recull l'informacio del localstorage de la variable token si existeix, sino es buit.
    //const token = localStorage.getItem('token') || '';

    //aqui es fa una consulta a la db aquesta consulta retorna el token nou renovat +`les dades del usuari.
    return this.http.get(`http://localhost:3000/api/login/renew`, {
      headers: {
        //aqui es pasan les dades del token ja que es necesiten per fer la consulta a la db.
        //inicialment s'agafaba del const token comentat adalt pero ara s'agafa del get token.
        'x-token': this.token
      }//pipe es un metode d'observables que permet encadenar diferents operadors rxjs
    }).pipe(
      //l'operador map transforma les dades que li arriban del observable i les retorna amb el que ens interesa.
      //en aquet cas un true ja que aquesta funcio es crida al canActivate del guard i si arriba al map vol dir
      //que tot ha enat be. 
      map( (resp: any) => {
        //es fa un console log per veure el que arriba a la resposta de la consulta.
        console.log(resp);
        //es desestructura la resposta 
        const { email, google, nombre, role, img= '', uid } = resp.usuario;
        //1- es guarden les dades delm usuari al model. Amb la desestructuracio anterior.
        this.usuario = new Usuario(nombre, email, '', google, img, role, uid);
        //aixo es un metode prova que es troba al model usuari nomes retorna el nom d'aquest.
        this.usuario?.imprimirUsuario();
        //2- es guarda el nou token generat i el menu
        this.guardarLocalstorage(resp.token, resp.menu);
        return true;
      }), 
      //en cas que alguna cosa hagi sortit malament es crida al catchError que en aquet cas no s'imprimeix aquest
      //si no que es crea un observable amb of() i es pasa unicament un false.
      //aquesta informacio anira al canActivate del guard i el retornara al login.
      catchError(error => of(false))
    )

  }

  //aquest metode es crida al component register i es per quan es vol registrar un nou usuari a la web.
  //es pasa una variable amb l'interface RegisterForm
  crearUsuario(formdata: RegisterForm){
    //console.log('creando usuario');
    //es fa la consulta a la db per metode POST pn se li pasan les dades entrades al formulari del registre.
    return this.http.post(`http://localhost:3000/api/usuarios`, formdata)
                    .pipe(
                      //aqui el tap rep tota la resposta de la consulta a la db.
                      tap( (resp: any) => {
                        console.log(resp);
                        //i es crea la variable token o es modifica al localstorage.
                        this.guardarLocalstorage(resp.token, resp.menu);
                      })
                    )
  }

  actualizarPerfil(data: {nombre: string, email: string, role: string}){
    
    data = {
      ...data,
      role: this.usuario.role!
    }
    
    //http://localhost:3000/api/usuarios/63b992acdb2f3f0cca1e26d0
    return this.http.put(`http://localhost:3000/api/usuarios/${this.uid}`, data, {
      headers: {
        //aqui es pasan les dades del token ja que es necesiten per fer la consulta a la db.
        //inicialment s'agafaba del const token comentat adalt pero ara s'agafa del get token.
        'x-token': this.token
      }
    })

  }

  //aquest metode es crida al component login i es per quan es vol entrar a la web.
  //es pasa una variable amb l'interface LoginForm
  login(formdata: LoginForm){
    //es fa una consulta per metode POST a la db i se li pasan les dades del formulari del login.
    return this.http.post(`http://localhost:3000/api/login`, formdata)
                    .pipe(
                      tap( (resp: any) => {
                        console.log(resp);
                        //i es crea la variable token o es modifica al localstorage.
                        this.guardarLocalstorage(resp.token, resp.menu);
                      })
                    )
  }

  //login per els usuaris que entran apartir de l'api de google.
  //se li pasa un string que es el token generat apartir de l'api de google.
  loginGoogle(token: string){
    return this.http.post(`http://localhost:3000/api/login/google`, { token })
                    .pipe(
                      tap( (resp: any) => {
                        console.log(resp);
                        //el token generat es guarda al localstorage.
                        this.guardarLocalstorage(resp.token, resp.menu);
                      })
                    )
  }

  cargarUsuarios(desde: number = 0){
    //http://localhost:3000/api/usuarios?desde=0
    //return this.http.get(`http://localhost:3000/api/usuarios?desde=${desde}`, this.headers);
    //return this.http.get<{total:number, usuarios:Usuario[]}>(`http://localhost:3000/api/usuarios?desde=${desde}`, this.headers);
    return this.http.get<cargarUsuario>(`http://localhost:3000/api/usuarios?desde=${desde}`, this.headers)
                .pipe(
                  //per veure  que el cargando va be del componet usuarios.
                  //delay(5000),
                  map(resp =>{
                    const usuarios = resp.usuario.map(
                      user => new Usuario(user.nombre, user.email, '', user.google, user.img, user.role, user.uid));

                    return {
                      total: resp.total,
                      usuario: usuarios
                    };
                  })
                );

  }

  eliminarUsuario(usuario: Usuario){
    //http://localhost:3000/api/usuarios/63b983df7a007493b9931058
    return this.http.delete<cargarUsuario>(`http://localhost:3000/api/usuarios/${usuario.uid}`, this.headers);
  }

  actualizarUsuario(usuario: Usuario){
    
    //http://localhost:3000/api/usuarios/63b992acdb2f3f0cca1e26d0
    return this.http.put(`http://localhost:3000/api/usuarios/${usuario.uid}`, usuario, this.headers)

  }

}
