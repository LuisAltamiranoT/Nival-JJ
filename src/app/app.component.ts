import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'easy-ac-nival';

  constructor(public location: Location) { }


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

  onActivate(event) {
    window.scroll(0,0);
  }
}
