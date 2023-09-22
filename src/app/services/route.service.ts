import { Injectable } from "@angular/core";
import { ActivationEnd, Params, Router } from "@angular/router";
import { Observable, filter, map } from "rxjs";

@Injectable({
    providedIn: 'root'
  })
  
  export class RouteService {
  
    constructor(private _router: Router) {}

    getRouteParams(): Observable<Params> {
  
      return this._router.events.pipe(
  
        filter(
          (e) =>
            e instanceof ActivationEnd &&
            Object.keys(e.snapshot.params).length > 0
        ),
        map((e) => (e instanceof ActivationEnd ? e.snapshot.params : {}))
      );
    }
  }