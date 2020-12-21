import { Injectable } from '@angular/core';
import { CanActivate, CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

export interface ComponentCanDeactivate{
  canDeactivate:()=> boolean | Observable<boolean>;
}

@Injectable({
  providedIn: 'root'
})
export class CanDeactivateRefeshGuard implements CanDeactivate<ComponentCanDeactivate> {
  canDeactivate(component:ComponentCanDeactivate):boolean | Observable<boolean>{
    return component.canDeactivate ? component.canDeactivate():true;
  }
}
