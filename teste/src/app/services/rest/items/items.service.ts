import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Items } from '../../../interfaces/iitems';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  constructor(private http: HttpClient) { }

  getAllItems(idCategorie, idList) {
    return this.http.get<Items[]>(environment.urlApi + 'categories/' + idCategorie + '/lists/' + idList + '/items');
  }

  getOnlyItem(idCategorie, idList, idItem) {
    return this.http.get<Items>(environment.urlApi + 'categories/' + idCategorie + '/lists/' + idList + '/items/' + idItem);
  }

  postItem(idCategorie, idList, data) {
    return this.http.post<any>(environment.urlApi + 'categories/' + idCategorie + '/lists/' + idList + '/items/', data);
  }

  editItem(idCategorie, idList, idItem , data) {
    return this.http.put<any>(environment.urlApi + 'categories/' + idCategorie + '/lists/' + idList + '/items/' + idItem, data);
  }

  deleteItem(idCategorie, idList, idItem) {
    return this.http.delete<any>(environment.urlApi + 'categories/' + idCategorie + '/lists/' + idList + '/items/' + idItem);
  }
}
