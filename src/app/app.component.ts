import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'easy-ac-nival';

  constructor(public location: Location,
    private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.spinner.show();
    this.loading();
  }

  loading() {
    setTimeout(() => {
      //Muestra imagen de carga durante 3 segundos
      this.spinner.hide();
    }, 3000);
  }

  //permite remover el navbar de algunas direcciones y activar vista del componente
  activar: boolean = false;
  remove() {
    let title = this.location.prepareExternalUrl(this.location.path());
    title = title.slice(1).split("/")[0];
    if (title === "verification-email" || title === "password-forgot") {
      this.activar = true;
      return true;
    } else {
      this.activar = false;
      return false;
    }
  }

  /*
  removeFooter() {
    let title = this.location.prepareExternalUrl(this.location.path());
    title = title.slice(1).split("/")[0];
    if (title === "verification-email" || title === "password-forgot" || title === "vista-curso" || 
    title === "edit-curso" || title === "reportes" || title === "reporte-general" || title === "reporte-individual" || title ==="horario" || title==="curso-group"|| title==="curso") {
      return true;
    } else {
      return false;
    }
  }
  */

  onActivate(event) {
    window.scroll(0, 0);
  }
}
