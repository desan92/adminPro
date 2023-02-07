import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { ModalImagenService } from '../../services/modal-imagen.service';
import { FileUploadService } from '../../services/file-upload.service';

@Component({
  selector: 'app-modal-imagen',
  templateUrl: './modal-imagen.component.html',
  styleUrls: ['./modal-imagen.component.css']
})
export class ModalImagenComponent {

  public imgSubir!: File;
  public imgTemp: any = '';

  constructor(public modal: ModalImagenService,
              private file: FileUploadService){}

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

  cerrarModal(){
    this.imgTemp = null;
    this.modal.cerrarModal();
  }

  subirImagen(){

    const id = this.modal.id;
    const tipo = this.modal.tipo;

    //s'envia l'imatge amb el tipus i id del ususari
    this.file.actualizarFoto(this.imgSubir, tipo, id)
              .then(img => {
                //es posa la nova img al model de usuari i s'envia un missatge positiu
                
                Swal.fire('Guardado', 'Los cambios fueron guardados', 'success');
                //es crea un observable amb l'imatge.
                this.modal.nuevaImagen.emit(img);
                this.cerrarModal();
              }).catch(err =>{
                //si surt algu malament dona error i salta un missatge.
                console.log(err);
                Swal.fire('Error', 'No se puedo subir la imagen', 'error');
              });
              
  }

}
