import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  //service per modificar coses a nivell visual.
  public linkTheme = document.querySelector('#theme');

  constructor() {
    //aqui es crea la variable tema amb l'informacio que hi ha al localstorage en cas de no tenir res
    //es posa com a predefinit el purple-dark.css.
    const theme = localStorage.getItem('theme') || './assets/css/colors/purple-dark.css';
    this.linkTheme = document.querySelector('#theme');
    this.linkTheme?.setAttribute('href', theme);
  }

  //aquet rebra el tema del account-theme i el posara a totes les variabels per canviar-lo
  changeTheme(theme: string){

    
    const url = `./assets/css/colors/${theme}.css`;
    //console.log(url);
    this.linkTheme?.setAttribute('href', url);

    localStorage.setItem('theme', url);
    
    this.checkCurrentTheme();

  }

  //aquest metode el que fa es que mantingui stick en la clase seleccionada.
  checkCurrentTheme(){

    const selector = document.querySelectorAll('.selector');
    selector.forEach( element => {
      //remou stick del theme que estaba selecionat
      element.classList.remove('working');

      //agafa el nou theme
      const btnTheme = element.getAttribute('data-theme');
      //li posa a la variable.
      const btnThemeUrl = `./assets/css/colors/${btnTheme}.css`;
      //aqui es crida amb el getatribut per fer una comprovacio posterior
      const currentTheme = this.linkTheme?.getAttribute('href');

      //el que coincideixi es el que tindra stick ja que sera el them actiu.
      if(btnThemeUrl === currentTheme)
      {
        element.classList.add('working');
      }

    });

  }
}
