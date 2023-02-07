import { Component } from '@angular/core';
import { SettingsService } from 'src/app/services/settings.service';
import { SidebarService } from '../../services/sidebar.service';


//es una constant creada al custom.js i com que es creaba al principi i no ho tornaba a fer
//el menu fallaba i aixi es torna a cridar al pages.
declare function customInitFunctions(): void;

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent {

  constructor(private settings: SettingsService,
              private SidebarService: SidebarService){}

  ngOnInit(): void {
    customInitFunctions();
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.SidebarService.cargarMenu();

  }

}
