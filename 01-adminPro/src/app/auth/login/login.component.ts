import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

declare const google: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  @ViewChild('googleBtn') googleBtn!: ElementRef;

  public loginForm: FormGroup = this.fb.group({
    email: [localStorage.getItem('email') || '', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    remember: [false]
  });

  constructor(private router: Router,
              private fb: FormBuilder,
              private usuarioService: UsuarioService){}

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    this.googleInit();
    
  }

  googleInit(){
    google.accounts.id.initialize({
      client_id: "477476836541-4il2ok8nr0nlq4ebj61ptiigmducj6s0.apps.googleusercontent.com",
      callback: (response: any) => this.handleCredentialResponse(response)
    });
    google.accounts.id.renderButton(
      this.googleBtn.nativeElement,
      { theme: "outline", size: "large" }  // customization attributes
    );
  }

  handleCredentialResponse(response: any){
    console.log("Encoded JWT ID token: " + response.credential);
    this.usuarioService.loginGoogle(response.credential).subscribe( resp => {
      console.log('login: ',resp);
      this.router.navigateByUrl('/');
    });
  }

  login(){
    console.log(this.loginForm.value);

    this.usuarioService.login(this.loginForm.value).subscribe(resp => {
      console.log(resp);
      if(this.loginForm.get('remember')?.value)
      {
        localStorage.setItem('email', this.loginForm.get('email')?.value);
      }
      else
      {
        localStorage.removeItem('email');
      }
      this.router.navigateByUrl('/');
    }, (err) => {
      Swal.fire('Error', err.error.msg, 'error');
    });

    //this.router.navigateByUrl('/');
  }

}
