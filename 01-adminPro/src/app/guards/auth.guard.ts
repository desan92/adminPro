import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router, CanLoad, Route, UrlSegment } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioService } from '../services/usuario.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

  constructor(private usuarioService: UsuarioService,
              private router: Router) {}

  canLoad(route: Route, segments: UrlSegment[]): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.usuarioService.validarToken().pipe(
      //es comprova que l'usuari existeix sino es treu del dashbord i s'envia al login
      tap(isAutenticate => {
        if(!isAutenticate)
        {
          this.router.navigateByUrl('/login');
        }
      })
    );
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot){
      console.log('paso por el guard (canActivate)');
    return this.usuarioService.validarToken().pipe(
      //es comprova que l'usuari existeix sino es treu del dashbord i s'envia al login
      tap(isAutenticate => {
        if(!isAutenticate)
        {
          this.router.navigateByUrl('/login');
        }
      })
    );
  }
  
}
