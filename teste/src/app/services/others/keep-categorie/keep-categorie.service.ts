import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class KeepCategorieService {

  private dataCategorie = null;

  constructor() { }

  setDataCategorie(data) {
    this.dataCategorie = data;
  }

  getDataCategorie() {
    return this.dataCategorie;
  }

  cleartDataCategorie() {
    this.dataCategorie = null;
  }
}
