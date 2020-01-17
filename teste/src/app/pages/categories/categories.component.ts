import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoriesService } from '../../services/rest/categories/categories.service';
import { MatDialog} from '@angular/material/dialog';
import { ViewsClass } from '../../common/views.class';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})


export class CategoriesComponent extends ViewsClass implements OnInit {

  constructor(public categorieServices: CategoriesService,
              public dialog: MatDialog,
              private router: Router) {
    super(dialog, categorieServices);
  }


  ngOnInit() {
    this.getCategories();

  }


  goTo(idCategorie, type: string) {
    if (type === 'view') {
      this.router.navigate(['categorias/visualizar-categoria/' + idCategorie]);
    } else if (type === 'edit') {
      this.router.navigate(['categorias/editar-categoria/' + idCategorie]);
    } else if (type === 'add') {
      this.router.navigate(['categorias/adicionar-categoria']);
    }
  }

  onDelete(idCategorie) {
    const msg = 'Tem certeza que gostaria de excluir?';
    this.openDialog(msg, 'switch', idCategorie);
  }

}
