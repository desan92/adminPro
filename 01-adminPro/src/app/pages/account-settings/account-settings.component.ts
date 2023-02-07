import { Component } from '@angular/core';
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.css']
})
export class AccountSettingsComponent {

  public linkTheme = document.querySelector('#theme');

  constructor(private settings: SettingsService) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.settings.checkCurrentTheme();
  }

  //aquet changeTeme rebra el tema del quadre tocat i el pasara al service.
  changeTheme(theme: string){
    this.settings.changeTheme(theme);
  }

  

}
