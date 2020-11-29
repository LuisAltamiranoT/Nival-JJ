import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { take, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GuardGuard implements CanActivate {

  constructor(
    private authService:AuthService,
    private router:Router
    ){}

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    return this.authService.user$.pipe(
      take(1),
      map((user)=> user && this.authService.isAdmin(user)),
      tap(canEdit => {
        if(!canEdit){
          this.router.navigate(['/home']);
          this.authService.showWarning('Acceso denegado. No tiene permisos para usar el sistema');
          this.authService.logout();
        }
      })
    );
  }
  
}
