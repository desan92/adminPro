import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HospitalService } from '../../../services/hospital.service';
import { Hospital } from '../../../models/hospital.model';
import { MedicoService } from '../../../services/medico.service';
import { Medico } from '../../../models/medico.model';
import Swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { delay } from 'rxjs';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styleUrls: ['./medico.component.css']
})
export class MedicoComponent {

  public medicoForm: FormGroup;
  public hospitales: Hospital[] = [];
  public hospitalSeleccionado: Hospital;
  public medicoSeleccionado: Medico;

  constructor(private fb: FormBuilder,
              private HospitalService: HospitalService,
              private medicoService: MedicoService,
              private router: Router,
              private ActivatedRoute: ActivatedRoute){}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.ActivatedRoute.params.subscribe( ({id}) => {
      this.cargarMedico(id);
    })
    //this.medicoService.obtenerMedicoId().subscribe()

    this.medicoForm = this.fb.group({
      nombre: ['', Validators.required],
      hospital: ['', Validators.required]
    });

    this.cargarHospitales();
    this.medicoForm.get('hospital').valueChanges.subscribe( hospitalId => {
      //console.log(hospitalId);
      this.hospitalSeleccionado = this.hospitales.find(h => h._id === hospitalId)
      console.log(this.hospitalSeleccionado);
    })
  }

  guardarMedico(){
    const { nombre } = this.medicoForm.value;

    if(this.medicoSeleccionado)
    {
      //actualitzar
      const data = {
        ...this.medicoForm.value,
        _id: this.medicoSeleccionado._id
      }
      this.medicoService.actualizarMedico(data).subscribe( resp => {
        console.log(resp);
        Swal.fire('Creado', `${nombre} actualizado correctamente`, 'success');
      })
    }
    else
    {
      //crear
      //console.log(this.medicoForm.value);
      this.medicoService.crearMedico(this.medicoForm.value).subscribe((resp: any) => {
        console.log(resp);
        Swal.fire('Creado', `${nombre} creado correctamente`, 'success');
        this.router.navigateByUrl(`/dashboard/medico/${resp.medico._id}`);
      })
    }
    
  }

  cargarHospitales(){
    this.HospitalService.cargarHospitales().subscribe((hospitales:Hospital[]) => {
      //console.log(hospitales);
      this.hospitales = hospitales;
    })
  }

  cargarMedico(id:string){

    if(id === 'nuevo')
    {
      return;
    }

    this.medicoService.obtenerMedicoId(id).pipe(delay(100)).subscribe(medico => {

      if(!medico)
      {
        return this.router.navigateByUrl(`/dashboard/medicos`);
      }

      //console.log(medico);
      const {nombre, hospital:{_id}} = medico;
      //console.log(nombre, _id);
      this.medicoSeleccionado = medico;
      this.medicoForm.setValue({nombre, hospital: _id})
    })
  }


}
