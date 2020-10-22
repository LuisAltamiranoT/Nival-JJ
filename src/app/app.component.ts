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

  //permite remover el navbar de algunas direcciones
  remove() {
    let title = this.location.prepareExternalUrl(this.location.path());
    title = title.slice(1).split("/")[0];
    if (title === "verification-email" || title === "forgot-password") {
      return true;
    } else {
      return false;
    }
  }

  removeFooter() {
    let title = this.location.prepareExternalUrl(this.location.path());
    title = title.slice(1).split("/")[0];
    if (title === "verification-email" || title === "forgot-password" || title === "vista-curso") {
      return true;
    } else {
      return false;
    }
  }

  onActivate(event) {
    window.scroll(0, 0);
  }
}
