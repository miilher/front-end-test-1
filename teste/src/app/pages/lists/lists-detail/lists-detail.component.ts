import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { KeepCategorieService } from '../../../services/others/keep-categorie/keep-categorie.service';
import { CategoriesService } from '../../../services/rest/categories/categories.service';
import { ListsService } from '../../../services/rest/lists/lists.service';
import { Categories } from '../../../interfaces/icategories';
import { Lists } from '../../../interfaces/ilists';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModalComponent } from '../../../components/modal/modal.component';

@Component({
  selector: 'app-lists-detail',
  templateUrl: './lists-detail.component.html',
  styleUrls: ['./lists-detail.component.scss']
})
export class ListsDetailComponent implements OnInit {

  constructor(private keepCategorieService: KeepCategorieService,
              private categorieServices: CategoriesService,
              private lisServices: ListsService,
              public dialog: MatDialog,
              private router: Router,
              private addCategorie: FormBuilder) { }

  data;
  switch = null;
  nameList = null;
  listsForm: FormGroup;

  statusEdit = null;

  ngOnInit() {
    // this.getRoute();
    this.data = this.keepCategorieService.getDataCategorie().params;
    if (this.data.idList !== '') {
      this.getOnlyList(this.data.idCategorie, this.data.idList );
    }


    if (this.data.idList !== '' && this.data.typeList === 'visualizar-lista') {
      this.listsForm = new FormGroup({
        nameList: new FormControl({ value: this.nameList, disabled: true }, Validators.required),
      });
    } else {

      this.listsForm = new FormGroup({
        nameList: new FormControl(this.nameList, Validators.required),
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
        this.goToLists();
      }

    });
  }


  getOnlyList(idCategory, idList) {
    this.lisServices.getOnlyList(idCategory, idList).subscribe(
      (response: Lists) => {
        this.nameList = response.name;
      },
      (error) => {
        const msg = 'Erro de requisição! Voce será redirecionado';
        this.openDialog(msg, 'error');
      }
    );
  }

  goToLists() {
    this.router.navigate(['categorias/' + this.data.typeCategorie + '/' + this.data.idCategorie + '/listas']);
  }

  goToItems() {
    this.router.navigate([this.router.url + '/itens']);
  }

  submit(type) {
    if (type === 'editar-lista') {
      if (this.listsForm.valid) {
        this.editList(this.data.idCategorie, this.data.idList,  { name: this.listsForm.controls.nameList.value });
      }

    } else if (type === 'adicionar-lista') {
      if (this.listsForm.valid) {
        this.postList(this.data.idCategorie, { name: this.listsForm.controls.nameList.value });
      }

    }
  }

  editList(idCategory, idList, data) {
    this.lisServices.editList(idCategory, idList,  data).subscribe(
      (response: Lists) => {
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

  postList(idCategory, data) {
    this.lisServices.postList(idCategory, data).subscribe(
      (response: Lists) => {
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
