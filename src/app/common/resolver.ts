import { ViewChild, ElementRef, Injectable, OnInit } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { KeepCategorieService } from '../services/others/keep-categorie/keep-categorie.service';
import { Route } from '@angular/compiler/src/core';

@Injectable({ providedIn: 'root' })

export class Resolver implements Resolve<any> {
    routCategorie;
    constructor(private keepCategorieService: KeepCategorieService, private route: Router) {

    }
    resolve(routeMap: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (!routeMap.params.typeList) {
            if (routeMap.params.idCategorie && (routeMap.params.typeCategorie === 'editar-categoria' ||
                routeMap.params.typeCategorie === 'visualizar-categoria')) {
                this.keepCategorieService.setDataCategorie({ params: routeMap.params });
            } else if (routeMap.params.typeCategorie === 'adicionar-categoria') {
                this.keepCategorieService.setDataCategorie({
                    params: {
                        typeCategorie: routeMap.params.typeCategorie, idCategorie: ''
                    }
                });

            } else {
                this.route.navigate(['categorias/']);
            }

        } else if (!routeMap.params.typeItem) {
            if (routeMap.params.idList && (routeMap.params.typeList === 'editar-lista' ||
                routeMap.params.typeList === 'visualizar-lista')) {
                this.keepCategorieService.setDataCategorie({ params: routeMap.params });
            } else if (routeMap.params.typeList === 'adicionar-lista') {
                this.keepCategorieService.setDataCategorie({
                    params: {
                        typeList: routeMap.params.typeList,
                        idList: '',
                        typeCategorie: routeMap.params.typeCategorie,
                        idCategorie: routeMap.params.idCategorie
                    }
                });

            } else {
                this.route.navigate(['categorias/visualizar-categoria/' + routeMap.params.idCategorie]);
            }
        } else if (routeMap.params.typeItem) {
            if (routeMap.params.idItem && (routeMap.params.typeItem === 'editar-item' ||
                routeMap.params.typeItem === 'visualizar-item')) {
                this.keepCategorieService.setDataCategorie({ params: routeMap.params });
            } else if (routeMap.params.typeItem === 'adicionar-item') {
                this.keepCategorieService.setDataCategorie({
                    params: {
                        typeItem: routeMap.params.typeItem,
                        idItem: '',
                        typeList: routeMap.params.typeList,
                        idList: routeMap.params.idList,
                        typeCategorie: routeMap.params.typeCategorie,
                        idCategorie: routeMap.params.idCategorie
                    }
                });

            } else {
                this.route.navigate(['categorias/visualizar-categoria/' + routeMap.params.idCategorie + 
                                                    '/visualizar-item/' + routeMap.params.idList]);
            }
        }






    }

}
