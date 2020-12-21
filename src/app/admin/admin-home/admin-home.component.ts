import { Component, OnInit } from '@angular/core';

import { AuthService } from 'src/app/services/auth.service';

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {
  //valida la ceacion de la tabla
  validate: boolean = false;

  private suscripcion1: Subscription;
  nombre="";

  constructor(
    private authService:AuthService
  ) { }

  ngOnInit(): void {
    this.dataUser();
  }

  
  ngOnDestroy() {
    if(this.suscripcion1){
      this.suscripcion1.unsubscribe();
    }
  }

  dataUser() {
    this.suscripcion1 = this.authService.getDataUser().subscribe((data) => {
      let dataUser: any = [data.payload.data()];
      this.nombre =dataUser[0].nombre;
    });
    this.validate=true;
  }

}
