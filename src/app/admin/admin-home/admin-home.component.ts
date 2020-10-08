import { Component, OnInit } from '@angular/core';

import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {
  nombre="";

  constructor(
    private authService:AuthService
  ) { }

  ngOnInit(): void {
    this.dataUser();
  }

  dataUser(){
    this.authService.getDataUser().subscribe((data)=>{
      this.nombre=data.nombre;
    })
  }

}
