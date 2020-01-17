import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { KeepCategorieService } from '../../../services/others/keep-categorie/keep-categorie.service';
import { CategoriesService } from '../../../services/rest/categories/categories.service';
import { Categories } from '../../../interfaces/icategories';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../../../components/modal/modal.component';

@Component({
  selector: 'app-categories-detail',
  templateUrl: './categories-detail.component.html',
  styleUrls: ['./categories-detail.component.scss']
})
export class CategoriesDetailComponent implements OnInit {

  constructor(private keepCategorieService: KeepCategorieService,
              private categorieServices: CategoriesService,
              public dialog: MatDialog,
              private router: Router,
              private addCategorie: FormBuilder) {

  }
  dataCategorie;
  switch = null;
  nameCategorie = null;
  categorieForm: FormGroup;

  statusEdit = null;

  ngOnInit() {
    this.dataCategorie = this.keepCategorieService.getDataCategorie().params;
    if (this.dataCategorie.idCategorie !== '') {
      this.getOnlyCategories(this.dataCategorie.idCategorie);
    }


    if (this.dataCategorie.idCategorie !== '' && this.dataCategorie.typeCategorie === 'visualizar-categoria') {
      this.categorieForm = new FormGroup({
        nameCategorie: new FormControl({ value: this.nameCategorie, disabled: true }, Validators.required),
      });
    } else {

      this.categorieForm = new FormGroup({
        nameCategorie: new FormControl(this.nameCategorie, Validators.required),
      });
    }

  }

  getTitle(type) {
    return type.replace('-', ' ');
  }

  openDialog(message, typeModal, id?): void {
    this.switch = null;
    const dialogRef = this.dialog.open(ModalComponent, {
      data: { msg: message, type: typeModal, switch: this.switch }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (this.statusEdit === 'sucess') {
        this.goToCategories();
      }

    });
  }


  getOnlyCategories(idCategory) {
    this.categorieServices.getOnlyCategorie(idCategory).subscribe(
      (response: Categories) => {
        this.nameCategorie = response.name;
      },
      (error) => {
        const msg = 'Erro de requisição! Voce será redirecionado';
        this.openDialog(msg, 'error');
      }
    );
  }

  goToCategories() {
    this.router.navigate(['/categorias']);
  }

  goToListas() {
    this.router.navigate([this.router.url + '/listas']);
  }

  submit(type) {
    if (type === 'editar-categoria') {
      if (this.categorieForm.valid) {
        this.editCategories(this.dataCategorie.idCategorie, { name: this.categorieForm.controls.nameCategorie.value });
      }

    } else if (type === 'adicionar-categoria') {
      if (this.categorieForm.valid) {
        this.postCategories({ name: this.categorieForm.controls.nameCategorie.value });
      }

    }
  }

  editCategories(idCategory, data) {
    this.categorieServices.editCategorie(idCategory, data).subscribe(
      (response: Categories) => {
        this.statusEdit = 'sucess';
        const msg = 'Alteração efetuada com sucesso!';
        this.openDialog(msg, 'warning');
      },
      (error) => {
        this.statusEdit = 'error';
        const msg = 'Erro de requisição! Voce será redirecionado';
        this.openDialog(msg, 'error');
      }
    );
  }

  postCategories(data) {
    this.categorieServices.postCategorie(data).subscribe(
      (response: Categories) => {
        this.statusEdit = 'sucess';
        const msg = 'Adição efetuada com sucesso!';
        this.openDialog(msg, 'warning');
      },
      (error) => {
        this.statusEdit = 'error';
        const msg = 'Erro de requisição! Voce será redirecionado';
        this.openDialog(msg, 'error');
      }
    );
  }

}
