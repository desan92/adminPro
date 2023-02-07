import { Component } from '@angular/core';
import { Medico } from 'src/app/models/medico.model';
import { MedicoService } from '../../../services/medico.service';
import { ModalImagenService } from '../../../services/modal-imagen.service';
import { BusquedasService } from '../../../services/busquedas.service';
import { delay, Subscription } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styleUrls: ['./medicos.component.css']
})
export class MedicosComponent {

  public cargando: boolean = true;
  public medicos: Medico[] = [];
  public medicosTemp: Medico[] = [];
  private imgSubs!: Subscription;

  constructor(private medicoService:MedicoService,
              private modal: ModalImagenService,
              private busqueda: BusquedasService){}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.cargarMedicos();
    this.imgSubs = this.modal.nuevaImagen.pipe(
      //es posa el delay perque carrega tant rapid que no li dona temps de posar l'imatge al html.
      delay(100)
    ).subscribe(img => {
      //console.log(img);
      this.cargarMedicos();
    })
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.imgSubs.unsubscribe();
  }

  cargarMedicos(){
    this.cargando = true;
    this.medicoService.cargarMedicos()
        .subscribe(medicos => {
          this.cargando = false;
          this.medicos =  medicos;
          this.medicosTemp = medicos;
        })
  }

  abrirModal(medico: Medico){
    this.modal.abrirModal('medicos', medico._id!, medico.img);
  }

  buscar(termino: string){
    
    if(termino.length === 0)
    {
      return this.medicos = this.medicosTemp;
    }
    
    this.busqueda.buscar('medicos', termino)
        .subscribe( resp => {
          this.medicos = resp;
        });
      return this.medicos;
  }

  borrarMedico(medico:Medico){

    return Swal.fire({
      title: 'Estas seguro?',
      text: `Esta a punto de borrar a ${medico.nombre}`,
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
        this.medicoService.borrarMedico(medico._id)
                  .subscribe(resp => {

                    this.cargarMedicos();

                    Swal.fire(
                      'Deleted!',
                      `${medico.nombre} fue eliminado correctamente.`,
                      'success'
                    )

                  });
      }
    })
  }

}
