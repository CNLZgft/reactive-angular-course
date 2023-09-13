import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, of } from "rxjs";
import { concatMap, finalize, tap } from "rxjs/operators";

@Injectable() //{
//providedIn: 'root' --> significa que sólo hay una instancia del servicio que
//se puede usar en toda la aplicación
//providedIn: "root",
//}
//quitándolo siginifica que puede tener múltiples instancias usándose a la vez
//de esta forma hay que decirle a la aplicación donde estará disponible el servicio en
//el árbol de dependecias del "INjectable"
//Se declara como provider en el app.component.ts para que sólo este disponible desde ahí
//hacia los componentes hijos
export class LoadingService {
  private loadingSubject = new BehaviorSubject<boolean>(false);

  loading$: Observable<boolean> = this.loadingSubject.asObservable();


  showLoaderUntilCompleted<T>(observable$: Observable<T>): Observable<T> {
    return of(null).pipe(
      tap(() => this.loadingOn()),
      concatMap(() => observable$),
      finalize(() => this.loadingOff())
    );
  }

  loadingOn() {
    this.loadingSubject.next(true);
  }
  loadingOff() {
    this.loadingSubject.next(false);
  }
}
