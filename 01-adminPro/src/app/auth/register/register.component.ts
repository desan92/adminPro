import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  public formSubmitted = false;

  public registerForm = this.fb.group({

    nombre: ['Jordi', Validators.required],
    email: ['test@test.com', [Validators.required, Validators.email]],
    password: ['12345', Validators.required],
    password2: ['12345', Validators.required],
    terminos: [true, Validators.required],

  }, {
    validators: this.passEquals('password', 'password2')
  });

  constructor(private fb: FormBuilder,
              private usuario: UsuarioService,
              private router: Router){}

  crearUsuario(){
    this.formSubmitted = true;
    console.log(this.registerForm.value);
    console.log(this.registerForm);

    if(this.registerForm.invalid)
    {
      return;
    }
    
    this.usuario.crearUsuario(this.registerForm.value).subscribe( resp =>{
      console.log('usuario creado');
      console.log(resp);
      this.router.navigateByUrl('/');
    }, (err) => {
      Swal.fire('Error', err.error.msg, 'error');
    });

  }

  campoNoValido(camp: string): boolean{
    
    if(this.registerForm.get(camp)?.invalid && this.formSubmitted)
    {
      return true;
    }
    else
    {
      return false;
    }

  }

  aceptaTerminos(){
    return !this.registerForm.get('terminos')?.value && this.formSubmitted;
  }

  contrasenaNoValidas(){

    const pas1 = this.registerForm.get('password')?.value;
    const pas2 = this.registerForm.get('password2')?.value;

    if( (pas1 !== pas2) && this.formSubmitted)
    {
      return true;
    }
    else
    {
      return false;
    }

  }


  passEquals(password: string, password2: string){
    return (formGroup: FormGroup) => {

      const passcontrol = formGroup.get(password);
      const passcontrol2 = formGroup.get(password2);

      if(passcontrol?.value === passcontrol2?.value)
      {
        passcontrol2?.setErrors(null);
      }
      else
      {
        passcontrol2?.setErrors({noEsIgual: true});
        //noEsIgual: true --> aixo surt a controls -> password2 -> errors
      }

    }
  }
}



