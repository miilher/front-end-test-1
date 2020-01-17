import { Injectable, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from './../components/modal/modal.component';
import { CategoriesService } from './../services/rest/categories/categories.service';
import { ListsService } from './../services/rest/lists/lists.service';
import { ItemsService } from './../services/rest/items/items.service';
import { Categories } from './../interfaces/icategories';
import { Lists } from './../interfaces/ilists';
import { Items } from './../interfaces/iitems';

Injectable();

export class ViewsClass {

    constructor(public dialog: MatDialog,
                public categorieServices?: CategoriesService,
                public listsServices?: ListsService,
                public itemsServices?: ItemsService) {

    }

    public loading = false;

    private paginator: MatPaginator;
    private sort: MatSort;

    @ViewChild(MatSort, { static: false }) set matSort(ms: MatSort) {
        this.sort = ms;
        this.setDataSourceAttributes();
    }

    @ViewChild(MatPaginator, { static: false }) set matPaginator(mp: MatPaginator) {
        this.paginator = mp;
        this.setDataSourceAttributes();
    }
    elementdata: Categories[];

    displayedColumns: string[] = ['id', 'name', 'actions'];
    dataSource = null;
    switch = null;



    public setDataSourceAttributes() {
        if (this.paginator !== undefined) {
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
            if (this.paginator && this.sort) {
                this.applyFilter('');
            }

        }
    }

    public applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    openDialog(message, typeModal, id?): void {
        this.switch = null;
        const dialogRef = this.dialog.open(ModalComponent, {
            data: { msg: message, type: typeModal, switch: this.switch }
        });

        dialogRef.afterClosed().subscribe(result => {
            
            if (result.switch === true) {
                this.deleteCategories(id);
                this.getCategories();
                this.dataSource = new MatTableDataSource(this.elementdata);
                this.setDataSourceAttributes();
            }
        });
    }

    public getCategories() {
        this.categorieServices.getAllCategories().subscribe(
            (response: Categories[]) => {
                this.elementdata = response;
                this.dataSource = new MatTableDataSource(this.elementdata);
                this.setDataSourceAttributes();
            },
            (error) => {
                const msg = 'Erro de requisição! Voce será redirecionado';
                this.openDialog(msg, 'error');
            }
        );
    }


    public deleteCategories(idCategorie) {
        this.loading = true;

        this.categorieServices.deleteCategorie(idCategorie).subscribe(
            (response: Categories[]) => {
                this.getCategories();
                this.loading = false;
            },
            (error) => {
                const msg = 'Erro de requisição! Voce será redirecionado';
                this.openDialog(msg, 'error');
            }
        );
    }


    public getLists(idCategorie) {
        this.listsServices.getAllLists(idCategorie).subscribe(
            (response: Lists[]) => {
                this.elementdata = response;
                this.dataSource = new MatTableDataSource(this.elementdata);
            },
            (error) => {
                const msg = 'Erro de requisição! Voce será redirecionado Voce será redirecionado';
                this.openDialog(msg, 'error');
            }
        );
    }


    public deleteLists(idCategorie, idList) {
        this.loading = true;

        this.listsServices.deleteList(idCategorie, idList).subscribe(
            (response: Lists[]) => {
                this.getLists(idCategorie);
                this.loading = false;
            },
            (error) => {
                const msg = 'Erro de requisição! Voce será redirecionado';
                this.openDialog(msg, 'error');
                this.loading = false;
            }
        );
    }


    public getItems(idCategorie, idList) {
        this.itemsServices.getAllItems(idCategorie, idList).subscribe(
            (response: Items[]) => {
                this.elementdata = response;
                this.dataSource = new MatTableDataSource(this.elementdata);
            },
            (error) => {
                const msg = 'Erro de requisição! Voce será redirecionado';
                this.openDialog(msg, 'error');
            }
        );
    }


    public deleteItem(idCategorie, idList, idItem) {
        this.loading = true;

        this.itemsServices.deleteItem(idCategorie, idList, idItem).subscribe(
            (response: Items[]) => {
                this.getItems(idCategorie, idList);
                this.loading = false;
            },
            (error) => {
                const msg = 'Erro de requisição! Voce será redirecionado';
                this.openDialog(msg, 'error');
                this.loading = false;
            }
        );
    }


}
