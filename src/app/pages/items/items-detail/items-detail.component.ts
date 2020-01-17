import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { KeepCategorieService } from '../../../services/others/keep-categorie/keep-categorie.service';
import { ItemsService } from '../../../services/rest/items/items.service';
import { Items } from '../../../interfaces/iitems';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../../../components/modal/modal.component';

@Component({
  selector: 'app-items-detail',
  templateUrl: './items-detail.component.html',
  styleUrls: ['./items-detail.component.scss']
})
export class ItemsDetailComponent implements OnInit {

  constructor(private keepCategorieService: KeepCategorieService,
              private itemsService: ItemsService,
              public dialog: MatDialog,
              private router: Router) { }

  data;
  switch = null;
  nameItem = null;
  doneItem = null;
  itemsForm: FormGroup;

  statusEdit = null;

  ngOnInit() {
    this.data = this.keepCategorieService.getDataCategorie().params;
    if (this.data.idItem !== '') {
      this.getOnlyItem(this.data.idCategorie, this.data.idList, this.data.idItem);
    }


    if (this.data.idItem !== '' && this.data.typeItem === 'visualizar-item') {
      this.itemsForm = new FormGroup({
        nameItem: new FormControl({ value: this.nameItem, disabled: true }, Validators.required),
        doneItem: new FormControl({ value: this.doneItem, disabled: true }),
      });
    } else {

      this.itemsForm = new FormGroup({
        nameItem: new FormControl(this.nameItem, Validators.required),
        doneItem: new FormControl(this.doneItem),
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
        this.goToItems();
      }

    });
  }


  getOnlyItem(idCategory, idList, idItem) {
    this.itemsService.getOnlyItem(idCategory, idList, idItem).subscribe(
      (response: Items) => {
        this.nameItem = response.name;
        this.doneItem = response.done;
      },
      (error) => {
        const msg = 'Erro de requisição! Voce será redirecionado';
        this.openDialog(msg, 'error');
      }
    );
  }

  goToItems() {
    this.router.navigate(['categorias/' + this.data.typeCategorie + '/' + this.data.idCategorie +
      '/listas/' + this.data.typeList + '/' + this.data.idList + '/itens']);
  }


  submit(type) {
    if (type === 'editar-item') {
      if (this.itemsForm.valid) {
        this.editItem(this.data.idCategorie, this.data.idList, this.data.idItem,
          {
            name: this.itemsForm.controls.nameItem.value,
            done: this.itemsForm.controls.doneItem.value
          });
      }

    } else if (type === 'adicionar-item') {
      if (this.itemsForm.valid) {
        this.postItem(this.data.idCategorie, this.data.idList,
          {
            name: this.itemsForm.controls.nameItem.value,
            done: this.itemsForm.controls.doneItem.value
          });
      }

    }
  }

  editItem(idCategory, idList, idItem, data) {
    this.itemsService.editItem(idCategory, idList, idItem, data).subscribe(
      (response: Items) => {
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

  postItem(idCategory, idList, data) {
    this.itemsService.postItem(idCategory, idList, data).subscribe(
      (response: Items) => {
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
