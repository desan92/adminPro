import { Component } from '@angular/core';

@Component({
  selector: 'app-promeses',
  templateUrl: './promeses.component.html',
  styleUrls: ['./promeses.component.css']
})
export class PromesesComponent {

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

    //part comentada getUsuaris
    //this.getUsuaris();

    this.getUsuaris().then( usuaris => {
      console.log(usuaris);
    });

    //quan estenen d'executar a destemps, quan ja s'hagi executat alguna cosa per exemple.
    const promesa = new Promise( (resolve, reject) => {
      
      if(false)
      {
        //resolve quan la promesa es resolt
        resolve("Hola Mundo");
      }
      else
      {
        //reject quan alguna cosa no ha sortit com s'esperaba.
        reject("Algo salio mal")
      }
      
    });

    //amb el then es recull el valor si ha sortit be.
    promesa.then( (msg) => {
      console.log("Hey termine!", msg);
    })
    //amb el catch es recull l'error.
    .catch( err => console.log("Error promesa", err));

    console.log("Fi onInit");

  }

  getUsuaris(){
    /*fetch('https://reqres.in/api/users')
          .then( (resp) => {
            console.log(resp);
            resp.json().then( (body) => {
              console.log(body);
            });
          })*/
    const promesa = new Promise( resolve => {
      fetch('https://reqres.in/api/users')
            .then( resp => resp.json())
            .then( body => resolve(body.data));
    })

    return promesa;
  }

}
