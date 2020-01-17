import { Component, OnInit , ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material';
import { ListsService } from '../../services/rest/lists/lists.service';
import { Lists } from '../../interfaces/ilists';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../../components/modal/modal.component';
import { KeepCategorieService } from '../../services/others/keep-categorie/keep-categorie.service';
import { ViewsClass } from '../../common/views.class';


@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.scss']
})
export class ListsComponent extends ViewsClass implements OnInit {

  elementdata: Lists[];


  constructor(public listsServices: ListsService,
              public dialog: MatDialog,
              private router: Router,
              private keepCategorieService: KeepCategorieService) {
                super(dialog, null, listsServices );
              }


  ngOnInit() {
    this.getLists(this.keepCategorieService.getDataCategorie().params.idCategorie);
  }


  openDialog(message, typeModal, idCategorie?, idList?): void {
    this.switch = null;
    const dialogRef = this.dialog.open(ModalComponent, {
      data: { msg: message, type: typeModal, switch: this.switch }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.switch === true) {
        this.deleteLists(this.keepCategorieService.getDataCategorie().params.idCategorie, idList);
        this.dataSource = new MatTableDataSource(this.elementdata);
      }
    });
  }

  goTo(idList, type: string) {
    if (type === 'view') {
      this.router.navigate([this.router.url + '/visualizar-lista/' + idList]);
    } else if (type === 'edit') {
      this.router.navigate([this.router.url + '/editar-lista/' + idList]);
    } else if (type === 'add') {
      this.router.navigate([this.router.url + '/adicionar-lista']);
    }
  }

  goToCategory() {
    this.router.navigate(['categorias/visualizar-categoria/' + this.keepCategorieService.getDataCategorie().params.idCategorie]);
  }

  onDelete(idList) {
    const msg = 'Tem certeza que gostaria de excluir?';
    this.openDialog(msg, 'switch', null, idList);
  }

}
