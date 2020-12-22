import { Component, OnInit, Inject } from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-ver-image',
  templateUrl: './ver-image.component.html',
  styleUrls: ['./ver-image.component.css']
})
export class VerImageComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<VerImageComponent>,
    @Inject(MAT_DIALOG_DATA) public infoUser: any
  ) { }

  ngOnInit(): void {
  }


}
