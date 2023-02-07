import { Component } from '@angular/core';
import { Hospital } from 'src/app/models/hospital.model';
import { HospitalService } from '../../../services/hospital.service';
import Swal from 'sweetalert2';
import { ModalImagenComponent } from '../../../components/modal-imagen/modal-imagen.component';
import { ModalImagenService } from '../../../services/modal-imagen.service';
import { delay, Subscription } from 'rxjs';
import { BusquedasService } from 'src/app/services/busquedas.service';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styleUrls: ['./hospitales.component.css']
})
export class HospitalesComponent {
  public hospitales: Hospital[] = [];
  public hospitalesTemp: Hospital[] = [];
  public cargando: boolean = true;
  private imgSubs!: Subscription;

  constructor(private hospitalService: HospitalService,
              private busqueda: BusquedasService,
              private modal: ModalImagenService){}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.cargarHospitales();
    this.imgSubs = this.modal.nuevaImagen.pipe(
      //es posa el delay perque carrega tant rapid que no li dona temps de posar l'imatge al html.
      delay(100)
    ).subscribe(img => {
      //console.log(img);
      this.cargarHospitales();
    })
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.imgSubs.unsubscribe()
  }

  cargarHospitales(){
    this.cargando = true;
    this.hospitalService.cargarHospitales()
          .subscribe( hospitales => {
            //console.log(hospitales);
            this.cargando = false;
            this.hospitales = hospitales;
            this.hospitalesTemp = hospitales;
          })
  }

  guardarCambios(hospital: Hospital){
    console.log(hospital);
    this.hospitalService.actualizarHospitales(hospital._id!, hospital.nombre)
          .subscribe( resp => {
            Swal.fire('Actualizado', hospital.nombre, 'success');
          })
  }

  eliminarHospital(hospital: Hospital){
    console.log(hospital);
    this.hospitalService.borrarHospitales(hospital._id!)
          .subscribe( resp => {
            this.cargarHospitales();
            Swal.fire('Borrado', hospital.nombre, 'success');
          })
  }

  async abrirSweetAlert(){
    const { value = '' } = await Swal.fire<string>({
      title: 'Crear Hospital',
      text: 'Ingrese el nombre del nuevo hospital',
      input: 'text',
      showCancelButton: true,
      inputPlaceholder: 'Nombre Hospital'
    })

    //console.log(value);
    if(value!.trim().length > 0)
    {
      this.hospitalService.crearHospitales(value!)
            .subscribe( resp => {
              this.cargarHospitales();
              Swal.fire('Creado', value, 'success');
            });
    }
    
  }

  abrirModal(hospital: Hospital){
    this.modal.abrirModal('hospitales', hospital._id!, hospital.img);
    
  }

  buscar(txtBuscar: string){
    if(txtBuscar.length === 0)
    {
      return this.hospitales = this.hospitalesTemp;
    }
    
    this.busqueda.buscar('hospitales', txtBuscar)
        .subscribe( resp => {
          this.hospitales = resp;
        });
      return this.hospitales;
    
  }

}
