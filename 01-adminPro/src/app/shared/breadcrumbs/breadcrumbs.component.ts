import { Component } from '@angular/core';
import { ActivatedRoute, ActivationEnd, Router } from '@angular/router';
import { filter, map, Subscription } from 'rxjs';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.css']
})
export class BreadcrumbsComponent {

  title: string = '';
  titleSubs$: Subscription; 

  constructor(private router: Router, 
              private route: ActivatedRoute){

    console.log(route.snapshot.children[0].data);
    
    this.titleSubs$ = this.getArgRoute().subscribe( ({ title }) => {
      console.log(title);
      this.title = title;
      document.title = title;
    });
    
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.titleSubs$.unsubscribe();
  }

  getArgRoute(){
    return this.router.events
    .pipe(
      filter( (event: any) => event instanceof ActivationEnd), //es filtra nomes el metode que ens interesa la resta no apareix. 
      filter( (event: ActivationEnd) => event.snapshot.firstChild === null),
      map( (event: ActivationEnd) => event.snapshot.data)
    );
  }

}
