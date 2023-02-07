import { Component } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from '../../../services/usuario.service';
import { BusquedasService } from '../../../services/busquedas.service';
import Swal from 'sweetalert2';
import { ModalImagenService } from '../../../services/modal-imagen.service';
import { delay } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent {

  public imgSubs!: Subscription;
  public totalUsuarios: number = 0;
  public usuarios!: Usuario[];
  public usuariosTemp!: Usuario[];
  public desde: number = 0;
  public cargando: boolean = true;

  constructor(private usuarioService: UsuarioService,
              private busqueda: BusquedasService,
              private modal: ModalImagenService){}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.cargarUsuarios();
    //aixo crida l'emit del modalservice que es crea al subirimagen del modal-imagen.component.
    this.imgSubs = this.modal.nuevaImagen.pipe(
      //es posa el delay perque carrega tant rapid que no li dona temps de posar l'imatge al html.
      delay(100)
    ).subscribe(img => {
      //console.log(img);
      this.cargarUsuarios();
    })
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    
    //per evitar que hi hagui fuga de memoria
    this.imgSubs.unsubscribe;
  }

  cargarUsuarios(){
    this.cargando = true;
    this.usuarioService.cargarUsuarios(this.desde)
        .subscribe( ({ total, usuario })  => {
          this.totalUsuarios = total;
          if(usuario.length !== 0)
          {
            this.usuarios = usuario;
            this.usuariosTemp = usuario;
          }
          this.cargando = false;
        });
  }

  cambiarPagina(valor: number){
    this.desde += valor;

    if(this.desde < 0)
    {
      this.desde = 0;
    }
    else if(this.desde > this.totalUsuarios)
    {
      const differencia = this.totalUsuarios - this.desde
      this.desde += differencia;
    }

    this.cargarUsuarios();
  }

  buscar(termino: string){
    if(termino.length === 0)
    {
      return this.usuarios = this.usuariosTemp;
    }

    this.busqueda.buscar('usuarios', termino)
        .subscribe( (resp:Usuario[]) => {
          this.usuarios = resp;
        });
    return this.usuarios;
  }

  eliminarUsuario(usuario: Usuario){
    
    if(usuario.uid === this.usuarioService.uid)
    {
      return Swal.fire('Error', 'No puede borrarse asi mismo', 'error');
    }

    return Swal.fire({
      title: 'Estas seguro?',
      text: `Esta a punto de borrar a ${usuario.nombre}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borralo!'
    }).then((result) => {
      if (result.isConfirmed) {
        /*Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )*/
        this.usuarioService.eliminarUsuario(usuario)
                  .subscribe(resp => {

                    this.cargarUsuarios();

                    Swal.fire(
                      'Deleted!',
                      `${usuario.nombre} fue eliminado correctamente.`,
                      'success'
                    )

                  });
      }
    })

    //console.log(usuario);
  }

  cambiarRole(usuario: Usuario){
    this.usuarioService.actualizarUsuario(usuario)
                .subscribe(resp => {
                  console.log(resp);
                });
  }

  abrirModal(usuario: Usuario){
    //console.log(usuario);

    const { uid, img } = usuario;
    console.log(img);
    console.log(uid);
    this.modal.abrirModal('usuarios', uid!, img );
  }

}
