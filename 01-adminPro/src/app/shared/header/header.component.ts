import { Component, SimpleChanges } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Router } from '@angular/router';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  //public img = '';
  //public name = '';
  public usuario!: Usuario;

  constructor(private usuarioService: UsuarioService,
              private router: Router) 
  {
    this.usuario = usuarioService.usuario;
    //this.img = usuarioService.usuario.getImagen!;
    //this.name = usuarioService.usuario.nombre;
  }
  
  logout(){
    this.usuarioService.logout();
    this.router.navigateByUrl('/login');
  }

  buscar(txtBuscar:string){
    //console.log(txtBuscar);
    if(txtBuscar.length === 0)
    {
      this.router.navigateByUrl(`/dashboard`);
    }
    this.router.navigateByUrl(`/dashboard/busquedas/${txtBuscar}`);
  }

}
