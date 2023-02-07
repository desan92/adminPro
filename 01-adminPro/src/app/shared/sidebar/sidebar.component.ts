import { Component } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  //public img = '';
  //public name = '';
  //variable que emmagatzemara totes lesa dades del usuari.
  public usuario!: Usuario;

  //recull totes les dades del sidebar ul li.
  menuItems: any[] = [];

  constructor(public sidebarService: SidebarService,
              private usuarioService: UsuarioService) 
  {
    //aqui es carrega l'informacio del servei del sidevar.
    //this.menuItems = this.sidebarService.menu;
    //console.log(this.menuItems);

    //aqui es carrega l'usuari logejat.
    this.usuario = usuarioService.usuario;
    //this.img = usuarioService.usuario.getImagen!;
    //this.name = usuarioService.usuario.nombre;
  }



}
