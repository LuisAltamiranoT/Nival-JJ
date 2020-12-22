import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'easy-ac-nival';

  constructor(
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

  onActivate(event) {
    window.scroll(0, 0);
  }
}
