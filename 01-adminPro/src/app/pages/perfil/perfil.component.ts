import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario.model';
import { map } from 'rxjs';
import { FileUploadService } from '../../services/file-upload.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent {

  public perfilForm!: FormGroup;
  public usuario:Usuario;
  public imgSubir!: File;
  public imgTemp: any = '';

  constructor(private fb: FormBuilder,
              private usuarioService: UsuarioService,
              private file: FileUploadService){
    this.usuario = usuarioService.usuario;
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    //aqui es crea el formulari del perfil amb el nom i l'email.
    this.perfilForm = this.fb.group({
      nombre: [this.usuario.nombre, Validators.required],
      email: [this.usuario.email, [Validators.required, Validators.email]]
    });
  }

  actualitzarPerfil(){
    console.log(this.perfilForm.value);
    this.usuarioService.actualizarPerfil(this.perfilForm.value).subscribe( () => {
          //console.log(resp);
          //si l'actualitzacio es positiva el nom i l'email canviaran de valor
          const { nombre, email } = this.perfilForm.value;
          this.usuario.nombre = nombre;
          this.usuario.email = email;
          //s'enviara un missatge de guardat
          Swal.fire('Guardado', 'Los cambios fueron guardados', 'success');
        }, (err) =>{
          console.log(err.error.msg);
          //en cas contrari s'enviara un error.
          Swal.fire('Error', err.error.msg, 'error');
        });
  }

  cambiarImagen(file: File){
    console.log(file);
    //es guarda l'imatge al imgSubir.
    this.imgSubir = file;
    //es comprova que existeix el file
    if(!file){
      //si no existeix tindra un valor de null.
      return this.imgTemp = null;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);

    //
    return reader.onloadend = () => {
      this.imgTemp = reader.result;
      console.log(reader.result);
    }
    
  }

  subirImagen(){
    //s'envia l'imatge amb el tipus i id del ususari
    this.file.actualizarFoto(this.imgSubir, 'usuarios', this.usuario.uid!)
              .then(img => {
                //es posa la nova img al model de usuari i s'envia un missatge positiu
                this.usuario.img = img;
                Swal.fire('Guardado', 'Los cambios fueron guardados', 'success');
              }).catch(err =>{
                //si surt algu malament dona error i salta un missatge.
                console.log(err);
                Swal.fire('Error', 'No se puedo subir la imagen', 'error');
              });
              
  }

}
