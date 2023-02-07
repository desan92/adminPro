//https://reactivex.io/documentation/operators.html
import { Component } from '@angular/core';
import { Observable, retry, interval, take, map, filter, Subscription } from 'rxjs';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styleUrls: ['./rxjs.component.css']
})
export class RxjsComponent {

  public intervalSubs: Subscription;

  constructor() {

    //observable no s'executa si no hi ha alguna cosa subscrita.
    /*const obs$ = new Observable( observer => {
      setInterval( () => {
        console.log('tick');
      }, 1000)
    });

    //per si sol no s'emet un valor no surt el subs: valor
    obs$.subscribe( valor => console.log('Subs:', valor));*/

    let i = -1;
    const obs$ = new Observable<number>( observer => {

      const interval = setInterval( () => {
        //aixo ho rep el subscribe perque se li pasa cada vegada
        //el nou observer que es i.
        i++;
        observer.next(i);

         if( i === 4)
         {
          clearInterval(interval);
          observer.complete(); //s'acaba l'observable.
         }

         if( i === 2)
         {
          i= 0;
          observer.error('Arriba al valor de 2'); //s'envia l'error
          //un cop salta l'error no s'executa el complete perque a saltat abans aquet.
         }

      }, 1000)
    });

    //per si sol no s'emet un valor
    //obs$.pipe
    this.retornaObservable().pipe(
      //forma de transformar l'informacio del observable.
      retry(1) 
      //intenta fer l'observable fins que surti be
      //en cas de posar un numero dintre del retry li dones un nombre d'intents.
    )
    .subscribe( valor => console.log('Subs:', valor),
      err => console.warn('Error:', err),
      () => console.info('Obs acabat')
    );

    //el pipe es pot posar directament al interval o quan es crida la funcio.
    this.intervalSubs = this.retornInterval()/*.pipe(
      take(4), //quantes emisions del observable i es completa l'observable.
      map((valor) => {
        return 'HolaMundo' + (valor + 1);
      }) //serveix per mutar l'informacio del observable. I aiix tenir el que es vol.
    )*/
    .subscribe(
      (valor) => console.log('Interval: ', valor)
    )

  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.intervalSubs.unsubscribe();
  }

  retornInterval(): Observable<number>{
    const interval$ = interval(1000)
                        .pipe(
                          map((valor) => {
                            return valor + 1; //'HolaMundo' + (valor + 1)
                          }), //serveix per mutar l'informacio del observable. I aiix tenir el que es vol.
                          filter(valor => ( valor % 2 === 0) ? true : false), //filtre el resultat que es vol obtenir.
                          take(10), //quantes emisions del observable i es completa l'observable.
                        );

    return interval$;
  }

  retornaObservable(): Observable<number>{
    let i = -1;
    const obs$ = new Observable<number>( observer => {

      const interval = setInterval( () => {
        //aixo ho rep el subscribe perque se li pasa cada vegada
        //el nou observer que es i.
        i++;
        observer.next(i);

         if( i === 4)
         {
          clearInterval(interval);
          observer.complete(); //s'acaba l'observable.
         }

         if( i === 2)
         {
          observer.error('Arriba al valor de 2'); //s'envia l'error
          //un cop salta l'error no s'executa el complete perque a saltat abans aquet.
         }

      }, 1000)
    });

    return obs$;
  }

}
