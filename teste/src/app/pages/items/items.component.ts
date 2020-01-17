import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material';
import { ItemsService } from '../../services/rest/items/items.service';
import { Items } from '../../interfaces/iitems';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../../components/modal/modal.component';
import { KeepCategorieService } from '../../services/others/keep-categorie/keep-categorie.service';
import { ViewsClass } from '../../common/views.class';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent extends ViewsClass implements OnInit {

  elementdata: Items[];

  displayedColumns: string[] = ['id', 'name', 'status', 'actions'];


  constructor(public itemsServices: ItemsService,
              public dialog: MatDialog,
              private router: Router,
              private keepCategorieService: KeepCategorieService) {
                super(dialog, null, null, itemsServices);
               }


  ngOnInit() {
    this.getItems(this.keepCategorieService.getDataCategorie().params.idCategorie,
      this.keepCategorieService.getDataCategorie().params.idList);
  }


  getIcon(status) {
    if (status === true) {
      return 'done';
    } else {
      return 'clear';
    }
  }

  getColorIcon(status) {
    if (status === true) {
      return 'accent';
    } else {
      return 'warn';
    }
  }

  openDialog(message, typeModal, idCategorie?, idList?, idItem?): void {
    this.switch = null;
    const dialogRef = this.dialog.open(ModalComponent, {
      data: { msg: message, type: typeModal, switch: this.switch }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.switch === true) {
        this.deleteItem(this.keepCategorieService.getDataCategorie().params.idCategorie,
          this.keepCategorieService.getDataCategorie().params.idList, idItem);
        this.dataSource = new MatTableDataSource(this.elementdata);
      }
    });
  }

  goTo(idItem, type: string) {
    if (type === 'view') {
      this.router.navigate([this.router.url + '/visualizar-item/' + idItem]);
    } else if (type === 'edit') {
      this.router.navigate([this.router.url + '/editar-item/' + idItem]);
    } else if (type === 'add') {
      this.router.navigate([this.router.url + '/adicionar-item']);
    }
  }

  goToList() {
    this.router.navigate(['categorias/visualizar-categoria/' + this.keepCategorieService.getDataCategorie().params.idCategorie +
                        '/listas/visualizar-lista/' + this.keepCategorieService.getDataCategorie().params.idList ]);
  }

  onDelete(idItem) {
    const msg = 'Tem certeza que gostaria de excluir?';
    this.openDialog(msg, 'switch', null, null, idItem);
  }

}
