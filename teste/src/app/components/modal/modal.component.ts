import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  constructor(private route: Router,
              public dialogRef: MatDialogRef<ModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data) { }

  ngOnInit() {

  }


  onNoClick(variable?): void {
    this.dialogRef.close();
  }

  goTo(type) {
    if (type === 'warning') {
      this.onNoClick();
    } else if (type === 'error') {
      this.onNoClick();
      this.route.navigate(['/categorias']);
    }
  }

  setYes() {
    this.data.switch = true;
    this.dialogRef.close(this.data);
  }

}
