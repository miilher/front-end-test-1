import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoriesComponent } from './categories/categories.component';
import { CategoriesDetailComponent } from './categories/categories-detail/categories-detail.component';
import { ListsComponent } from './lists/lists.component';
import { ListsDetailComponent } from './lists/lists-detail/lists-detail.component';
import { ItemsComponent } from './items/items.component';
import { ItemsDetailComponent } from './items/items-detail/items-detail.component';
import { Resolver } from '../common/resolver';


const routes: Routes = [

  { path: '', redirectTo: '/categorias', pathMatch: 'full' },
  { path: 'categorias', component: CategoriesComponent },
  { path: 'categorias/:typeCategorie', component: CategoriesDetailComponent, resolve: { categorie: Resolver }},
  { path: 'categorias/:typeCategorie/:idCategorie', component: CategoriesDetailComponent, resolve: { categorie: Resolver }},
  { path: 'categorias/:typeCategorie/:idCategorie/listas', component: ListsComponent, resolve: { list: Resolver }},
  { path: 'categorias/:typeCategorie/:idCategorie/listas/:typeList', component: ListsDetailComponent, resolve: { list: Resolver }},
  { path: 'categorias/:typeCategorie/:idCategorie/listas/:typeList/:idList', component: ListsDetailComponent, resolve: { list: Resolver }},
  { path: 'categorias/:typeCategorie/:idCategorie/listas/:typeList/:idList/itens', component: ItemsComponent, resolve: { items: Resolver }},
  { path: 'categorias/:typeCategorie/:idCategorie/listas/:typeList/:idList/itens/:typeItem',
    component: ItemsDetailComponent, resolve: { items: Resolver } },
  { path: 'categorias/:typeCategorie/:idCategorie/listas/:typeList/:idList/itens/:typeItem/:idItem',
    component: ItemsDetailComponent, resolve: { items: Resolver } },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
